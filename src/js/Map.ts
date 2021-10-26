import Room from "./Room.js";
import { randomRange } from "./Utils.js";

/* Class for the main Map */
export default class Map {
  public width: number;
  public height: number;
  public cellSize: number;
  public value: Room[];
  public roomSize: number;

  public roomCount: number;
  private cellStart: number[];
  private images: any;
  private matrix: number[];

  /**
   * Create the main map
   * @param width The width of the map
   * @param height The height of the map
   * @param cellSize The size of a room
   * @param roomSize Total amount of rooms
   * @param images The sprite sheet of the rooms
   */
  constructor(
    width: number,
    height: number,
    cellSize: number,
    roomSize: number,
    images: any
  ) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.roomSize = roomSize;
    this.images = images;
    this.matrix = Array(this.width * this.height).fill(0);
    this.value = [];
    this.cellStart = [this.width / 2, this.height / 2];
    this.roomCount = 0;
  }

  /**
   * Re-define the map properties to create a new map
   * @param width The width of the map
   * @param height The height of the map
   * @param roomSize Total amount of rooms
   */
  define(width: number, height: number, roomSize: number): void {
    this.width = width;
    this.height = height;
    this.roomSize = roomSize;

    this.matrix = Array(this.width * this.height).fill(0);
    this.value = [];
    this.cellStart = [this.width / 2, this.height / 2];
    this.roomCount = 0;
  }

  /**
   * The main update method
   */
  update(): void {
    if (this.roomCount >= this.roomSize) return;
    this.roomCount++;

    let freePositions: any = [];

    if (this.value.length > 0) {
      // 1. Find free rooms in the map
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          if (this.matrix[this.toIndex(x, y)] == 1) {
            let add = true;
            // If no doors are available
            if (
              !this.freeMatrix(x, y - 1) &&
              !this.freeMatrix(x + 1, y) &&
              !this.freeMatrix(x, y + 1) &&
              !this.freeMatrix(x - 1, y)
            ) {
              add = false;
            }
            // Add the position to the array
            if (add) freePositions.push([x, y]);
          }
        }
      }
      // 2. Choose a random room based on the free rooms list
      const randomRoomIndex = randomRange(1, freePositions.length) - 1;
      const randomRoom = freePositions[randomRoomIndex];

      const [randomRoomX, randomRoomY] = randomRoom;

      // 3. Choose a random direction
      const freeDirections: number[][] = [];

      if (this.freeMatrix(randomRoomX, randomRoomY - 1))
        freeDirections.push([0, -1]);
      if (this.freeMatrix(randomRoomX + 1, randomRoomY))
        freeDirections.push([1, 0]);
      if (this.freeMatrix(randomRoomX, randomRoomY + 1))
        freeDirections.push([0, 1]);
      if (this.freeMatrix(randomRoomX - 1, randomRoomY))
        freeDirections.push([-1, 0]);

      const randomDirectionIndex = randomRange(1, freeDirections.length) - 1;
      const randomDirection = freeDirections[randomDirectionIndex];

      // 4. Generate a cell
      let cell = this.generateCell(
        randomRoomX + 1 * randomDirection[0],
        randomRoomY + 1 * randomDirection[1]
      );

      // 5. Modify the room doors
      let choosen: any;
      for (let cell of this.value) {
        if (cell.x == randomRoom[0] && cell.y == randomRoom[1]) {
          choosen = cell;
          break;
        }
      }

      // Top
      if (randomDirection[0] == 0 && randomDirection[1] == -1) {
        cell.doors[2] = true;
        choosen.doors[0] = true;
      }
      // Right
      if (randomDirection[0] == 1 && randomDirection[1] == 0) {
        cell.doors[3] = true;
        choosen.doors[1] = true;
      }
      // Bottom
      if (randomDirection[0] == 0 && randomDirection[1] == 1) {
        cell.doors[0] = true;
        choosen.doors[2] = true;
      }
      // Left
      if (randomDirection[0] == -1 && randomDirection[1] == 0) {
        cell.doors[1] = true;
        choosen.doors[3] = true;
      }
    } else {
      // Generate the first room
      this.generateCell(this.cellStart[0], this.cellStart[1]);
    }
  }

  /**
   * If there is a free space in the matrix
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns a boolean with the result
   */
  freeMatrix(x: number, y: number): boolean {
    return this.matrix[this.toIndex(x, y)] == 0;
  }
  /**
   * Get the index of an array with coordinates
   * @param x The x position of the array
   * @param y The y position of the array
   * @returns The current index of the array based on a vector
   */
  toIndex(x: number, y: number): number {
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) return -1;
    return x + y * this.width;
  }

  /**
   * Generate a cell and return it
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns a Room object
   */
  generateCell(x: number, y: number): Room {
    let cell = new Room(x, y, this.cellSize, this.images);
    this.value.push(cell);
    this.matrix[this.toIndex(x, y)] = 1;
    return cell;
  }

  /**
   * Draw the main grid of the map
   * @param ctx The graphic context of the canvas
   */
  drawGrid(ctx: any): void {
    ctx.strokeStyle = "black";
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        ctx.rect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        ctx.stroke();
      }
    }
  }
}
