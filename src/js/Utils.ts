/**
 * Load Image
 * @param url The image path
 * @returns HTML image element
 */

export function loadImage(url: any) {
  return new Promise((resolve) => {
    let image: any = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

/**
 * Generate random number
 * @param min
 * @param max
 * @returns number
 */

export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
