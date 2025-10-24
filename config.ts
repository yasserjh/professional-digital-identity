/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Simulates environment variables for app configuration.
// In a real build system, these would come from a .env file.
export const AppConfig = {
    // URL of the deployed application, used for metadata.
    URL: 'https://egal-app.com', // Replace with actual domain
    
    // API client configuration
    GEMINI_API_TIMEOUT_MS: 30000, // 30 seconds
    GEMINI_API_MAX_RETRIES: 3,

    // File upload validation rules
    VALIDATION: {
        MAX_FILE_SIZE_MB: 10,
        get MAX_FILE_SIZE_BYTES() { return this.MAX_FILE_SIZE_MB * 1024 * 1024; },
        SUPPORTED_FORMATS: ['image/jpeg', 'image/png'],
    },

    // Client-side image processing settings
    IMAGE_PROCESSING: {
        // Downscale images if their longest edge exceeds this value before uploading.
        MAX_DIMENSION_PX: 2048,
    },

    // Payment stub configuration
    PAYMENT: {
        INITIAL_CREDITS: 5, // Default credits for a new user/session
    }
};
