import "./style.scss";

import { Board } from "./Board";
import { ControlPanel } from "./ControlPanel";
import { exampleObs } from "./obs";

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

const subscription = exampleObs(123).subscribe({
  next: (data) => {
    console.log("next data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});
console.log("subscription: ", subscription);
