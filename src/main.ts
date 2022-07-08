import "./style.scss";

import { Board } from "./Board";
import { ControlPanel } from "./ControlPanel";

const cfg = {
  sampleNbr: 50,
  multiplier: 2,
};
const board = new Board(cfg);
console.log("board: ", board);
board.draw();

const controlPanel = new ControlPanel(cfg);
controlPanel.subscribe((config) => {
  board.setConfig(config);
  board.redraw();
});
