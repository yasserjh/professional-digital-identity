/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Helper function to load an image and return it as an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${src.substring(0, 50)}...`));
        img.src = src;
    });
}

/**
 * Creates a single "photo album" page image from a collection of images.
 * @param imageData A record mapping style names to their image data URLs.
 * @param title The main title for the album page.
 * @param subtitle The subtitle for the album page.
 * @returns A promise that resolves to a data URL of the generated album page (JPEG format).
 */
export async function createAlbumPage(
    imageData: Record<string, string>,
    title: string,
    subtitle: string
): Promise<string> {
    const canvas = document.createElement('canvas');
    // A4 ratio, high-resolution
    const canvasWidth = 2480;
    const canvasHeight = 3508;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D canvas context');
    }

    // 1. Draw the background
    ctx.fillStyle = '#F5F5DC'; // Beige/off-white background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Draw the title
    ctx.fillStyle = '#0B3D2C'; // Deep green text
    ctx.textAlign = 'center';

    ctx.font = `bold 120px 'Tajawal', sans-serif`;
    ctx.fillText(title, canvasWidth / 2, 200);

    ctx.font = `60px 'Tajawal', sans-serif`;
    ctx.fillStyle = '#333333';
    ctx.fillText(subtitle, canvasWidth / 2, 300);

    // 3. Load all the images concurrently
    const styles = Object.keys(imageData);
    const loadedImages = await Promise.all(
        Object.values(imageData).map(url => loadImage(url))
    );

    const imagesWithStyles = styles.map((style, index) => ({
        style,
        img: loadedImages[index],
    }));

    // 4. Define grid layout and draw each image
    const grid = { cols: 2, rows: 3, padding: 120 };
    const contentTopMargin = 400;
    const contentHeight = canvasHeight - contentTopMargin;
    const cellWidth = (canvasWidth - grid.padding * (grid.cols + 1)) / grid.cols;
    const cellHeight = (contentHeight - grid.padding * (grid.rows + 1)) / grid.rows;

    imagesWithStyles.forEach(({ style, img }, index) => {
        const row = Math.floor(index / grid.cols);
        const col = index % grid.cols;

        const x = grid.padding * (col + 1) + cellWidth * col;
        const y = contentTopMargin + grid.padding * (row + 1) + cellHeight * row;
        
        ctx.save();
        
        // Translate to the cell's top-left for easier calculations
        ctx.translate(x, y);

        // Draw a soft shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        
        // Draw the white border frame for the image
        const framePadding = 30;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, cellWidth, cellHeight);
        
        ctx.shadowColor = 'transparent';

        // Calculate image dimensions to fit inside the frame while maintaining aspect ratio
        const imageContainerWidth = cellWidth - framePadding * 2;
        const imageContainerHeight = cellHeight - framePadding * 2 - 100; // Reserve space for caption
        
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth = imageContainerWidth;
        let drawHeight = drawWidth / aspectRatio;

        if (drawHeight > imageContainerHeight) {
            drawHeight = imageContainerHeight;
            drawWidth = drawHeight * aspectRatio;
        }

        const imgX = framePadding + (imageContainerWidth - drawWidth) / 2;
        const imgY = framePadding + (imageContainerHeight - drawHeight) / 2;
        
        ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
        
        // Draw the caption
        ctx.fillStyle = '#0B3D2C';
        ctx.font = `bold 60px 'Tajawal', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const captionY = framePadding + imageContainerHeight + 60;
        ctx.fillText(style, cellWidth / 2, captionY);
        
        ctx.restore();
    });

    return canvas.toDataURL('image/jpeg', 0.95);
}
