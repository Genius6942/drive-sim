import EventEmitter from "eventemitter3";

export type Events = {
  add: { id: string };
  remove: { remove: string };
};

export class ControllerManager {
  private controllerIDs: string[];

  private selectedController: string | null = null;

  private events: EventEmitter<Events>;
  on: typeof this.events.on;
  off: typeof this.events.off;
  once: typeof this.events.once;
  constructor() {
    window.addEventListener("gamepadconnected", (e) => {
      this.onControllerConnect(e.gamepad);
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      this.onControllerDisconnect(e.gamepad);
    });

    this.controllerIDs = [];

    this.events = new EventEmitter();
    this.once = this.events.once.bind(this.events);
    this.on = this.events.on.bind(this.events);
    this.off = this.events.off.bind(this.events);
  }

  private onControllerConnect(controller: Gamepad) {
    this.controllerIDs.push(controller.id);

    this.events.emit("add", controller.id);
  }

  private onControllerDisconnect(controller: Gamepad) {
    const idx = this.controllerIDs.indexOf(controller.id);
    if (idx >= 0) {
      this.controllerIDs.splice(idx, 1);
    }

    if (controller.id === this.selectedController) {
      this.selectedController = null;
    }
    this.events.emit("remove", controller.id);
  }

  selectController(id: string) {
    if (this.controllerIDs.includes(id)) {
      this.selectedController = id;
    } else {
      throw new Error("Controller with id " + id + " not found");
    }
  }

  get controller() {
    const controllers = navigator.getGamepads();
    if (!controllers) return null;
    const controller = controllers.find(
      (controller) => controller && controller.id === this.selectedController
    );
    return controller;
  }

  get controllers() {
    return this.controllerIDs;
  }
}
