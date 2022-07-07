import { BoardConfig } from "./interfaces/BoardConfig";

const SVGNS = "http://www.w3.org/2000/svg";
const r0 = 45;
const x0 = 50;
const y0 = 50;

export class Board {
  config: BoardConfig;

  constructor() {}

  draw() {
    const sampleGroup = document.querySelector("svg g.samples");
    if (sampleGroup === null) {
      throw new Error("element with selector 'svg g.samples' not found.");
    }

    for (let i = 0; i < this.config.sampleNbr; i++) {
      const angle = (i * 2 * Math.PI) / this.config.sampleNbr;
      const r = 1;
      const x = x0 + r0 * Math.cos(angle);
      const y = y0 + r0 * Math.sin(angle);

      const circle = document.createElementNS(SVGNS, "circle");
      circle.setAttributeNS(null, "cx", String(x));
      circle.setAttributeNS(null, "cy", y.toString());
      circle.setAttributeNS(null, "r", r + "");
      sampleGroup.appendChild(circle);
    }
  }

  setConfig(config: BoardConfig) {
    this.config = config;
  }
}
