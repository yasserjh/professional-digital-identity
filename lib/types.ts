/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type ImageStatus = 'pending' | 'done' | 'error';

export interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
}
