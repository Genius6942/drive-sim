import { ControllerManager } from "./controller";
import { switchScreen } from "./lib/screens";
import { $ } from "./lib/utils";

const controllerManager = new ControllerManager();

const updateFunc = () => {
  const controllersContainer = <HTMLDivElement>$("#controllers");

  controllersContainer.innerHTML = "";
  controllerManager.controllers.forEach((controller) => {
    const div = document.createElement("div");

    const parenthesesIndex = controller.indexOf("(");
    const text = document.createTextNode(
      parenthesesIndex >= 0 ? controller.slice(0, parenthesesIndex) : controller
    );

    const icon = document.createElement("div");
    icon.innerText = "🎮";
    icon.className = "text-3xl";
    div.appendChild(icon);

    div.appendChild(text);

    div.className =
      "flex items-center gap-3 hover:bg-neutral-100 bg-white transition-colors rounded-lg cursor-pointer";
    controllersContainer.appendChild(div);

    div.title = "Select " + controller;
    div.addEventListener("click", () => {
      controllerManager.selectController(controller);
      switchScreen("test");
    });
  });

  if (controllerManager.controllers.length === 0) {
    controllersContainer.innerText =
      "Connect your controller (you may have to press any button to connect it).";
  }
};

controllerManager.on("add", updateFunc);
controllerManager.on("remove", updateFunc);

updateFunc();

const updateTestScreen = () => {
  if (controllerManager.controller) {
    const c = controllerManager.controller;
    const leftValue = c.axes[1];
    const leftSlider = $("#test-1");
    if (leftValue > 0) {
      leftSlider.style.top = "50%";
      leftSlider.style.height = (0.5 * leftValue * 100).toString() + "%";
    } else {
      leftSlider.style.top = ((1 + leftValue) * 50).toString() + "%";
      leftSlider.style.height = (-leftValue * 50).toString() + "%";
    }

    const rightValue = c.axes[3];
    const rightSlider = $("#test-2");
    if (rightValue > 0) {
      rightSlider.style.top = "50%";
      rightSlider.style.height = (0.5 * rightValue * 100).toString() + "%";
    } else {
      rightSlider.style.top = ((1 + rightValue) * 50).toString() + "%";
      rightSlider.style.height = (-rightValue * 50).toString() + "%";
    }

    const leftHorizontalValue = c.axes[0];
    const leftHorizontalSlider = $("#test-3");
    if (leftHorizontalValue > 0) {
      leftHorizontalSlider.style.left = "50%";
      leftHorizontalSlider.style.width =
        (0.5 * leftHorizontalValue * 100).toString() + "%";
    } else {
      leftHorizontalSlider.style.left =
        ((1 + leftHorizontalValue) * 50).toString() + "%";
      leftHorizontalSlider.style.width =
        (-leftHorizontalValue * 50).toString() + "%";
    }

    const rightHorizontalValue = c.axes[2];
    const rightHorizontalSlider = $("#test-4");
    if (rightHorizontalValue > 0) {
      rightHorizontalSlider.style.left = "50%";
      rightHorizontalSlider.style.width =
        (0.5 * rightHorizontalValue * 100).toString() + "%";
    } else {
      rightHorizontalSlider.style.left =
        ((1 + rightHorizontalValue) * 50).toString() + "%";
      rightHorizontalSlider.style.width =
        (-rightHorizontalValue * 50).toString() + "%";
    }
  }

  requestAnimationFrame(updateTestScreen);
};

requestAnimationFrame(updateTestScreen);
