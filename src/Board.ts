import { sampleCircleRadius, SVGNS } from "./global";
import { BoardConfig } from "./interfaces/BoardConfig";
import { $, drawLine, getPointFromIndex, setAttribute } from "./misc";

export class Board {
  config: BoardConfig = {
    multiplier: 2,
    sampleNbr: 10,
  };

  constructor(config?: Partial<BoardConfig>) {
    config && this.setConfig(config);
  }

  clean() {
    $("svg g.samples").innerHTML = "";
    $("svg g.lines").innerHTML = "";
  }

  draw() {
    this.drawSamples();
    this.drawLines();
  }

  drawLine(i: number) {
    const startIndex = i;
    const endIndex = i * this.config.multiplier;

    const startPoint = getPointFromIndex(startIndex, this.config.sampleNbr);
    const endPoint = getPointFromIndex(endIndex, this.config.sampleNbr);

    drawLine(startPoint, endPoint);
  }

  drawLines() {
    for (let i = 0; i < this.config.sampleNbr; i++) {
      this.drawLine(i);
    }
  }

  drawSamples() {
    for (let i = 0; i < this.config.sampleNbr; i++) {
      const { x, y } = getPointFromIndex(i, this.config.sampleNbr);

      const circle = document.createElementNS(SVGNS, "circle");
      setAttribute(circle, "cx", x);
      setAttribute(circle, "cy", y);
      setAttribute(circle, "r", sampleCircleRadius);
      $("svg g.samples").appendChild(circle);
    }
  }

  redraw() {
    this.clean();
    this.draw();
  }

  setConfig(config: Partial<BoardConfig>) {
    Object.assign(this.config, config);
    // immutable version
    // this.config = { ...this.config, ...config };
  }
}
