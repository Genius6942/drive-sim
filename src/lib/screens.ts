/// <reference types="view-transitions-api-types" />

export let screen = "controllers";
import { $ } from "./utils";

export const switchScreen = (screenName: string) => {
  if (screen === screenName) return;
  const update = () => {
    $("#screen-" + screen).style.display = "none";
    $("#screen-" + screenName).style.display = "";
  };
  if (!document.startViewTransition) {
    update();
    screen = screenName;
  } else {
    const transition = document.startViewTransition(async () => update());
    transition.finished.then(() => {
      screen = screenName;
    });
  }
};
