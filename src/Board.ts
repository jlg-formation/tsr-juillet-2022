import { SVGNS, sampleCircleRadius } from "./global";
import { BoardConfig } from "./interfaces/BoardConfig";
import { getPointFromAngle, getAngleFromIndex, drawLine } from "./misc";

export class Board {
  config: BoardConfig = {
    multiplier: 2,
    sampleNbr: 10,
  };

  constructor(config?: Partial<BoardConfig>) {
    config && this.setConfig(config);
  }

  draw() {
    this.drawSamples();
    this.drawLines();
  }

  drawLines() {
    for (let i = 0; i < this.config.sampleNbr; i++) {
      this.drawLine(i);
    }
  }
  drawLine(i: number) {
    const startIndex = i;
    const endIndex = i * this.config.multiplier;

    const startPoint = getPointFromAngle(
      getAngleFromIndex(startIndex, this.config.sampleNbr)
    );

    const endPoint = getPointFromAngle(
      getAngleFromIndex(endIndex, this.config.sampleNbr)
    );

    drawLine(startPoint, endPoint);
  }

  drawSamples() {
    const sampleGroup = document.querySelector("svg g.samples");
    if (sampleGroup === null) {
      throw new Error("element with selector 'svg g.samples' not found.");
    }

    for (let i = 0; i < this.config.sampleNbr; i++) {
      const { x, y } = getPointFromAngle(
        getAngleFromIndex(i, this.config.sampleNbr)
      );

      const circle = document.createElementNS(SVGNS, "circle");
      circle.setAttributeNS(null, "cx", String(x));
      circle.setAttributeNS(null, "cy", y.toString());
      circle.setAttributeNS(null, "r", sampleCircleRadius + "");
      sampleGroup.appendChild(circle);
    }
  }

  setConfig(config: Partial<BoardConfig>) {
    Object.assign(this.config, config);
    // immutable version
    // this.config = { ...this.config, ...config };
  }
}
