import { BoardConfig } from "./interfaces/BoardConfig";
import { $, $$ } from "./misc";

type CallBackFn = (config: BoardConfig) => void;

export class ControlPanel {
  #isPlaying = false;
  #config: BoardConfig = {
    multiplier: 0,
    sampleNbr: 0,
  };
  callback: CallBackFn = () => {};

  constructor(config: BoardConfig) {
    this.config = config;
    this.#addActionOnSliders();
    this.#addActionOnPlayButton();
    this.redraw();
  }

  set isPlaying(val: boolean) {
    this.#isPlaying = val;
    this.redraw();
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  set config(val: BoardConfig) {
    this.#config = val;
    this.redraw();
    this.callback(this.config);
  }

  get config() {
    return this.#config;
  }

  #addActionOnPlayButton() {
    const btn = $(`div.control-panel button[title="Play"]`);
    btn.addEventListener("click", () => {
      this.isPlaying = !this.isPlaying;
    });
  }

  #addActionOnSliders() {
    const array: (keyof BoardConfig)[] = ["sampleNbr", "multiplier"];
    array.forEach((key) => {
      const input = $$(
        `div.control-panel label.${key} input`,
        HTMLInputElement
      );

      input.addEventListener("input", () => {
        this.config = { ...this.config, [key]: +input.value };
      });
    });
  }

  redraw() {
    const btn = $(`div.control-panel button[title="Play"]`);
    btn.innerHTML = this.isPlaying ? "Stop" : "Play";

    const array: (keyof BoardConfig)[] = ["sampleNbr", "multiplier"];
    array.forEach((key) => {
      const span = $(`div.control-panel label.${key} span`);
      span.innerHTML = String(this.config[key]);

      const input = $$(
        `div.control-panel label.${key} input`,
        HTMLInputElement
      );
      input.value = String(this.config[key]);
    });
  }

  subscribe(callback: CallBackFn) {
    this.callback = callback;
  }
}
