var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Map from "./Map.js";
import { loadImage } from "./Utils.js";
/**
 * Control panel input
 */
const inputRoom = document.getElementById("input-room");
inputRoom.addEventListener("input", () => {
    document.getElementById("roomValue").innerHTML = `(${inputRoom.value})`;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const pathsImg = (yield loadImage("./img/rooms.png"));
    /**
     * The Map object
     * @type {Map}
     */
    const map = new Map(16, 16, 32, 10, pathsImg);
    /**
     * Generate a new map with the control panel
     */
    (_a = document.getElementById("btn-generate")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        map.define(16, 16, inputRoom.value);
        generateMap();
    });
    /**
     * Generate the map
     */
    function generateMap() {
        map.drawGrid(ctx);
        const timer = setInterval(() => {
            map.update();
            for (let cell of map.value) {
                cell.setup();
                cell.draw(ctx);
            }
            if (map.roomCount >= map.roomSize)
                clearTimeout(timer);
        }, 10);
    }
    generateMap();
}))();
