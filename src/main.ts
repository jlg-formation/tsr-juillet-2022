import "./style.scss";

import { Board } from "./Board";

const board = new Board({
  sampleNbr: 50,
});
console.log("board: ", board);
board.draw();

[1, 2, 3].includes(2);
