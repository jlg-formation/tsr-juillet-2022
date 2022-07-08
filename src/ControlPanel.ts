import { BoardConfig } from "./interfaces/BoardConfig";
import { $, $$ } from "./misc";

type CallBackFn = (config: BoardConfig) => void;

export class ControlPanel {
  callback: CallBackFn = () => {};
  constructor(private config: BoardConfig) {
    const array: (keyof BoardConfig)[] = ["sampleNbr", "multiplier"];
    array.forEach((key) => {
      const span = $(`div.control-panel label.${key} span`);
      span.innerHTML = String(this.config[key]);

      const input = $$(
        `div.control-panel label.${key} input`,
        HTMLInputElement
      );
      input.value = String(this.config[key]);

      input.addEventListener("input", () => {
        this.config[key] = +input.value;
        span.innerHTML = String(this.config[key]);
        this.callback(this.config);
      });
    });
  }

  subscribe(callback: CallBackFn) {
    this.callback = callback;
  }
}
