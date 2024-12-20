export function checkImageSize(src: string, minWidth: number, minHeight: number): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            console.log(`image actual ${img.width}x${img.height}`);
            console.log(`image min set ${minWidth}x${minHeight}`);
            const isValid = img.width >= minWidth && img.height >= minHeight;
            resolve(isValid);
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            resolve(false);
        };

        img.src = src;
    });
}
