import Map from "./Map.js";
import { loadImage } from "./Utils.js";

/**
 * Control panel input
 */
const inputRoom = document.getElementById("input-room") as HTMLFormElement;
inputRoom.addEventListener("input", () => {
  document.getElementById("roomValue")!.innerHTML = `(${inputRoom.value})`;
});

(async () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const pathsImg = (await loadImage("./img/rooms.png")) as HTMLImageElement;

  /**
   * The Map object
   * @type {Map}
   */
  const map: Map = new Map(16, 16, 32, 10, pathsImg);

  /**
   * Generate a new map with the control panel
   */
  document.getElementById("btn-generate")?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.define(16, 16, inputRoom.value);
    generateMap();
  });

  /**
   * Generate the map
   */
  function generateMap(): void {
    map.drawGrid(ctx);

    const timer: any = setInterval(() => {
      map.update();
      for (let cell of map.value) {
        cell.setup();
        cell.draw(ctx);
      }
      if (map.roomCount >= map.roomSize) clearTimeout(timer);
    }, 10);
  }

  generateMap();
})();
