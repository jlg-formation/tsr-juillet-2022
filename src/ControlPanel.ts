import { BoardConfig } from "./interfaces/BoardConfig";
import { $, $$ } from "./misc";

type CallBackFn = (config: BoardConfig) => void;

export class ControlPanel {
  _isPlaying = false;
  callback: CallBackFn = () => {};

  constructor(private config: BoardConfig) {
    this.manageSliders();
    this.managePlayButton();
    this.redraw();
  }

  set isPlaying(val: boolean) {
    this._isPlaying = val;
    this.redraw();
  }

  get isPlaying() {
    return this._isPlaying;
  }

  managePlayButton() {
    const btn = $(`div.control-panel button[title="Play"]`);
    btn.addEventListener("click", () => {
      this.isPlaying = !this.isPlaying;
    });
  }

  manageSliders() {
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

  redraw() {
    const btn = $(`div.control-panel button[title="Play"]`);
    btn.innerHTML = this.isPlaying ? "Stop" : "Play";
  }

  subscribe(callback: CallBackFn) {
    this.callback = callback;
  }
}
