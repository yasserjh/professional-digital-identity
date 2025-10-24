/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 prose prose-neutral">
            <h1>Privacy Policy for Egal | عقال</h1>
            <p><strong>Last Updated:</strong> October 26, 2023</p>

            <p>
                Welcome to Egal ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our web application.
            </p>

            <h2>1. Information We Process</h2>
            <p>
                To provide our service, we process the following data:
            </p>
            <ul>
                <li><strong>Photos You Upload:</strong> When you upload a photo, it is sent directly to a third-party AI service (Google Gemini API) for processing. We do not store, save, or collect your original photo or the generated images on our servers. The entire process is transactional.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
                The photo you upload is used for the sole purpose of generating an AI-enhanced portrait in professional Saudi attire.
            </p>
            <ul>
                <li><strong>One-Time Processing:</strong> Your photo is transmitted securely to the Google Gemini API for immediate processing. Once the AI-generated image is returned to you, both the original and the generated images are not retained by us.</li>
                <li><strong>No Training Data:</strong> Your images are not used to train our or any third-party AI models.</li>
            </ul>

            <h2>3. Third-Party Services</h2>
            <p>
                We use the Google Gemini API to power our image generation feature. When you upload a photo, it is subject to Google's privacy policy and terms. We encourage you to review them to understand how Google handles data.
            </p>

            <h2>4. Data Security</h2>
            <p>
                We implement reasonable security measures to protect your information during transmission. All data is sent over a secure (HTTPS) connection.
            </p>

            <h2>5. Your Rights</h2>
            <p>
                As we do not store your personal data, requests for access, correction, or deletion are not applicable. The data you provide is processed and immediately discarded after use.
            </p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>7. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:contact@egal-app.com">contact@egal-app.com</a>.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
