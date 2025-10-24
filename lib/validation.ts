/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { AppConfig } from '../config';

/**
 * Validates a file based on size and supported formats.
 * @param file The file to validate.
 * @returns An object with a boolean `isValid` and an optional `error` message key.
 */
export function validateFile(file: File): { isValid: boolean; error?: 'size' | 'format' } {
    if (file.size > AppConfig.VALIDATION.MAX_FILE_SIZE_BYTES) {
        return { isValid: false, error: 'size' };
    }
    if (!AppConfig.VALIDATION.SUPPORTED_FORMATS.includes(file.type)) {
        return { isValid: false, error: 'format' };
    }
    return { isValid: true };
}

/**
 * Downscales an image if it exceeds the maximum dimension, preserving aspect ratio.
 * @param dataUrl The data URL of the image to process.
 * @returns A promise that resolves to the data URL of the processed (or original) image.
 */
export function processImageBeforeUpload(dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const { width, height } = img;
            const maxDimension = AppConfig.IMAGE_PROCESSING.MAX_DIMENSION_PX;

            if (width <= maxDimension && height <= maxDimension) {
                // No scaling needed
                return resolve(dataUrl);
            }

            let newWidth, newHeight;

            if (width > height) {
                newWidth = maxDimension;
                newHeight = (height * maxDimension) / width;
            } else {
                newHeight = maxDimension;
                newWidth = (width * maxDimension) / height;
            }

            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return reject(new Error('Could not create canvas context for image processing.'));
            }

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            // Assuming original type was JPEG for simplicity, or could extract from dataUrl
            const mimeType = dataUrl.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
            resolve(canvas.toDataURL(mimeType, 0.9));
        };
        img.onerror = () => {
            reject(new Error('Failed to load image for processing.'));
        };
        img.src = dataUrl;
    });
}
