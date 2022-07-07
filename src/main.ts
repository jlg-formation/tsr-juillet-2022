import "./style.scss";

import { Board } from "./Board";

const board = new Board();
console.log("board: ", board);
board.setConfig({
  sampleNbr: 10,
});
board.draw();

[1, 2, 3].includes(2);
