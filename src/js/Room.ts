/* Class for the room */
export default class Room {
  public x: number;
  public y: number;
  public size: number;
  public doors: boolean[];

  private spriteSheet: any;
  private imagePosition: any;

  /**
   * Create a room
   * @param x The x coordinate of the room
   * @param y The y coordinate of the room
   * @param size The Size of the room
   * @param spriteSheet The spritesheet with the rooms
   */
  constructor(x: number, y: number, size: number, spriteSheet: any) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.spriteSheet = spriteSheet;
    this.doors = [false, false, false, false];
    this.imagePosition = [];
  }

  /**
   * Find the correct image for the room based on its available doors
   */
  setup(): void {
    // Full
    if (this.doors[0] && this.doors[1] && this.doors[2] && this.doors[3]) {
      this.imagePosition = [0, 0];
    } else if (
      this.doors[0] &&
      !this.doors[1] &&
      !this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [1, 0]; // TOP
    } else if (
      !this.doors[0] &&
      this.doors[1] &&
      !this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [2, 0]; // RIGHT
    } else if (
      !this.doors[0] &&
      !this.doors[1] &&
      this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [3, 0]; // BOTTOM
    } else if (
      !this.doors[0] &&
      !this.doors[1] &&
      !this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [4, 0]; // LEFT
    } else if (
      this.doors[0] &&
      !this.doors[1] &&
      this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [5, 0]; // TB
    } else if (
      !this.doors[0] &&
      this.doors[1] &&
      !this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [6, 0]; // RL
    } else if (
      this.doors[0] &&
      this.doors[1] &&
      !this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [7, 0]; // TR
    } else if (
      this.doors[0] &&
      !this.doors[1] &&
      !this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [0, 1]; // TL
    } else if (
      !this.doors[0] &&
      this.doors[1] &&
      this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [1, 1]; // RB
    } else if (
      !this.doors[0] &&
      !this.doors[1] &&
      this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [2, 1]; // BL
    } else if (
      this.doors[0] &&
      this.doors[1] &&
      !this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [3, 1]; // TRL
    } else if (
      this.doors[0] &&
      !this.doors[1] &&
      this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [4, 1]; // TBL
    } else if (
      this.doors[0] &&
      this.doors[1] &&
      this.doors[2] &&
      !this.doors[3]
    ) {
      this.imagePosition = [5, 1]; // TRB
    } else if (
      !this.doors[0] &&
      this.doors[1] &&
      this.doors[2] &&
      this.doors[3]
    ) {
      this.imagePosition = [6, 1]; // RBL
    } else {
      this.imagePosition = [7, 1];
    }
  }

  /**
   * Draw the room
   * @param ctx The graphic context of the canvas
   */
  draw(ctx: any): void {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.spriteSheet,
      this.imagePosition[0] * 16,
      this.imagePosition[1] * 16,
      16,
      16,
      this.size * this.x,
      this.size * this.y,
      32,
      32
    );
  }
}
