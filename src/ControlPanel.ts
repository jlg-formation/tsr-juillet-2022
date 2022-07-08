import { BoardConfig } from "./interfaces/BoardConfig";
import { $, $$ } from "./misc";

type CallBackFn = (config: BoardConfig) => void;

const STEP = 0.01;

export class ControlPanel {
  #config: BoardConfig = {
    multiplier: 0,
    sampleNbr: 0,
  };
  #isPlaying = false;
  callback: CallBackFn = () => {};

  subscription?: number;

  constructor(config: BoardConfig) {
    this.config = config;
    this.#addActionOnSliders();
    this.#addActionOnPlayButton();
    this.redraw();
  }

  get config() {
    return this.#config;
  }

  set config(val: BoardConfig) {
    this.#config = val;
    this.redraw();
    this.callback(this.config);
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  set isPlaying(val: boolean) {
    this.#isPlaying = val;
    this.#isPlaying ? this.play() : this.stop();
    this.redraw();
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

  play() {
    const callback = () => {
      this.config = {
        ...this.config,
        multiplier: this.config.multiplier + STEP,
      };
    };
    callback();
    this.subscription = setInterval(callback, 50) as unknown as number;
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

  stop() {
    if (this.subscription) {
      clearInterval(this.subscription);
    }
  }

  subscribe(callback: CallBackFn) {
    this.callback = callback;
  }
}
