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

export const getPointFromIndex = (i: number, sampleNbr: number): Point => {
  return getPointFromAngle(getAngleFromIndex(i, sampleNbr));
};

export const drawLine = (start: Point, end: Point) => {
  const line = document.createElementNS(SVGNS, "line");
  setAttribute(line, "x1", start.x);
  setAttribute(line, "y1", start.y);
  setAttribute(line, "x2", end.x);
  setAttribute(line, "y2", end.y);
  $("g.lines").appendChild(line);
};

export const $ = (cssSelector: string): Element => {
  const result = document.querySelector(cssSelector);
  if (result === null) {
    throw new Error(`Element not found: ${cssSelector}`);
  }
  return result;
};

export const $$ = <T extends Element>(
  cssSelector: string,
  Type: new () => T
): T => {
  const result = document.querySelector(cssSelector);
  if (result === null) {
    throw new Error(`Element not found: ${cssSelector}`);
  }
  if (!(result instanceof Type)) {
    throw new Error(`Element is not instance of ${Type.name}`);
  }
  return result;
};

export const setAttribute = (
  elt: Element,
  attrName: string,
  attrValue: number
) => {
  elt.setAttributeNS(null, attrName, String(attrValue));
};
