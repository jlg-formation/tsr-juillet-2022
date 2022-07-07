import { r0, SVGNS, x0, y0 } from "./global";
import { Angle } from "./interfaces/Angle";
import { Point } from "./interfaces/Point";

export const getPointFromAngle = (angle: number): Point => {
  const x = x0 + r0 * Math.cos(angle);
  const y = y0 + r0 * Math.sin(angle);
  return { x, y };
};

export const getAngleFromIndex = (i: number, sampleNbr: number): Angle => {
  const angle = (i * 2 * Math.PI) / sampleNbr;
  return angle;
};

export const drawLine = (start: Point, end: Point) => {
  const group = document.querySelector("g.lines");
  if (group === null) {
    throw new Error("Cannot find g.lines element");
  }

  const line = document.createElementNS(SVGNS, "line");
  line.setAttributeNS(null, "x1", String(start.x));
  line.setAttributeNS(null, "y1", String(start.y));
  line.setAttributeNS(null, "x2", String(end.x));
  line.setAttributeNS(null, "y2", String(end.y));
  group.appendChild(line);
};
