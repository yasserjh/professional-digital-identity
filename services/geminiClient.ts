/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import { AppConfig } from '../config';
import { GEMINI_MAIN_PROMPT } from '../lib/prompts';

const API_KEY = (process.env.API_KEY ?? '').trim();

if (!API_KEY) {
  const errorMessage = "CRITICAL: GEMINI_API_KEY environment variable is not set.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * A timeout utility that rejects a promise after a specified duration.
 * @param ms The duration in milliseconds.
 * @returns A promise that rejects after the timeout.
 */
function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('API call timed out')), ms));
}

/**
 * Processes the Gemini API response to extract the image data URL.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 * @throws An error if the API did not return a valid image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }

    const textResponse = response.text;
    console.error("API Error: Did not return an image. Response:", textResponse);
    throw new Error(`The AI model responded with text instead of an image.`);
}

/**
 * Generates a styled image from a source image and a style description.
 * Implements retry logic with exponential backoff and a timeout.
 * @param imageDataUrl A data URL string of the source image.
 * @param style A style object containing descriptions for the prompt.
 * @returns A promise that resolves to the data URL of the generated image.
 */
export async function generateStyledImage(
    imageDataUrl: string, 
    style: { styleDescription: string; backgroundDescription: string }
): Promise<string> {
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) {
        throw new Error("Invalid image data URL format.");
    }
    const [, mimeType, base64Data] = match;

    const imagePart = { inlineData: { mimeType, data: base64Data } };
    const prompt = GEMINI_MAIN_PROMPT
        .replace('{styleDescription}', style.styleDescription)
        .replace('{backgroundDescription}', style.backgroundDescription);
    const textPart = { text: prompt };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= AppConfig.GEMINI_API_MAX_RETRIES; attempt++) {
        try {
            const apiCall = ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
            });
            
            const response = await Promise.race([
                apiCall,
                timeout(AppConfig.GEMINI_API_TIMEOUT_MS)
            ]) as GenerateContentResponse;
            
            return processGeminiResponse(response);

        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            console.error(`Gemini API call failed (Attempt ${attempt}/${AppConfig.GEMINI_API_MAX_RETRIES}):`, lastError.message);

            const isInternalError = lastError.message.includes('500') || lastError.message.includes('INTERNAL');

            if (isInternalError && attempt < AppConfig.GEMINI_API_MAX_RETRIES) {
                const delay = 1000 * Math.pow(2, attempt - 1);
                console.log(`Internal error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // For non-retriable errors or after max retries, break the loop.
                break;
            }
        }
    }

    console.error("An unrecoverable error occurred during image generation.", lastError);
    throw new Error(`The AI model failed to generate an image. ${lastError?.message || 'Unknown error.'}`);
}
