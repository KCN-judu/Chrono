import { formatClock, formatTimer, formatStopwatch } from "./format.js";
import { Button } from "./Classes/Button.js";
import { Content } from "./Classes/Content.js";
import { Text } from "./Classes/Text.js";

let config = window.config;
export function decodeFrontendConfig() {
	if (config.frontend == undefined) return;
}

const [clockButton, timerButton, stopwatchButton, settingsButton] = [
	"clockButton",
	"timerButton",
	"stopwatchButton",
	"settingsButton",
].map((id) => new Button(id));

const [clockContent, timerContent, stopwatchContent, settingsContent] = [
	"clockContent",
	"timerContent",
	"stopwatchContent",
	"settingsContent",
].map((id) => new Content(id));

let currentModule = clockContent;

[
	[clockButton, clockContent],
	[timerButton, timerContent],
	[stopwatchButton, stopwatchContent],
	[settingsButton, settingsContent],
].forEach(([button, content]) =>
	button.registerClickEvent(() => moduleSwitch(content))
);

function moduleSwitch(content) {
	if (currentModule == content) return;
	content.setDisplay("flex");
	currentModule.setDisplay("none");
	currentModule = content;
}

//clock
const clockConfig = config?.frontend?.clock;
const timeZone = clockConfig?.timeZone;
const timeFomat = clockConfig?.timeFomat;
const clockText = document.getElementById("clockText");
function registerClockLogic() {
	clockText.textContent = formatClock(timeZone, timeFomat);
	return (intervalId = setInterval(() => {
		clockText.textContent = formatClock(timeZone, timeFomat);
	}, 1));
}

function cancelClockLogic(intervalId) {
	clearInterval(intervalId);
}

function registerTimerLogic() {}

function cancelTimerLogic() {}

//stopwatch
let stopwatchTimeMs = 0;
let stopwatchIntervalId,
	stopwatchRenderIntervalId,
	stopwatchIsRunning = false;
const stopwatchText = document.getElementById("stopwatchText");
const swPinBtn = document.getElementById("swPinBtn");
const swSPBtn = document.getElementById("swS/PBtn");
const swSPBtnSVG = swSPBtn.querySelector("img");
const swResetBtn = document.getElementById("swResetBtn");
swPinBtn.addEventListener("click", () => {});
swSPBtn.addEventListener("click", () => {});
swResetBtn.addEventListener("click", () => {});
export function registerStopwatchLogic() {
	stopwatchText.textContent = formatStopwatch(stopwatchTimeMs);
	swSPBtn.addEventListener("click", swHandleSP);
}

function swHandleSP() {
	if (stopwatchIsRunning) pauseSw();
	else startSw();
}

function startSw() {
	swSPBtnSVG.src = "../svg/pause.svg";
	stopwatchIsRunning = true;
	stopwatchIntervalId = setInterval(() => {
		stopwatchTimeMs += 10;
	}, 10);

	stopwatchRenderIntervalId = setInterval(() => {
		stopwatchText.textContent = formatStopwatch(stopwatchTimeMs);
	}, 15);
	swPinBtn.addEventListener("click", swHandlePin);
	swResetBtn.addEventListener("click", swHandleReset);
}

function pauseSw() {
	swSPBtnSVG.src = "../svg/start.svg";
	stopwatchIsRunning = false;
	clearInterval(stopwatchIntervalId);
	clearInterval(stopwatchRenderIntervalId);
	stopwatchText.textContent = formatStopwatch(stopwatchTimeMs);
	swPinBtn.removeEventListener("click", swHandlePin);
}

function swHandlePin() {}

function swHandleReset() {
	swSPBtnSVG.src = "../svg/start.svg";
	clearInterval(stopwatchIntervalId);
	clearInterval(stopwatchRenderIntervalId);
	swPinBtn.removeEventListener("click", swHandlePin);
	stopwatchTimeMs = 0;
	stopwatchIsRunning = false;
	stopwatchText.textContent = formatStopwatch(stopwatchTimeMs);
	swResetBtn.removeEventListener("click", swHandleReset);
}

function cancelStopwatchLogic() {
	swSPBtnSVG.src = "../svg/start.svg";
	clearInterval(stopwatchIntervalId);
	clearInterval(stopwatchRenderIntervalId);
	stopwatchTimeMs = 0;
	stopwatchText.textContent = formatStopwatch(stopwatchTimeMs);
	stopwatchIsRunning = false;
	swSPBtn.removeEventListener("click", swHandleSP);
	swPinBtn.removeEventListener("click", swHandlePin);
	swResetBtn.removeEventListener("click", swHandleReset);
}
