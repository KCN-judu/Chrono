import { formatClock, formatTimer, formatStopwatch } from "./format.js";
import { Button } from "./classes/Button.js";
import { Content } from "./classes/Content.js";
import { Text } from "./classes/Text.js";

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
	button.registerClickListener(() => moduleSwitch(content))
);

function moduleSwitch(content) {
	if (currentModule == content) return;
	content.setDisplay("flex");
	currentModule.setDisplay("none");
	currentModule = content;
}

function logicDisable(intervalIds) {
	if (Array.isArray(intervalIds)) {
		intervalIds.forEach((id) => clearInterval(id));
	} else clearInterval(intervalIds);
}

//clock
const clockConfig = config?.frontend?.clock;
const timeZone = clockConfig?.timeZone;
const timeFomat = clockConfig?.timeFomat;

const clockText = new Text("clockText");

export function clockEnable() {
	clockText.replaceText(formatClock(timeZone, timeFomat));
	return (intervalId = setInterval(() => {
		clockText.replaceText(formatClock(timeZone, timeFomat));
	}, 1));
}

//timer
export function timerEnable() {}

//stopwatch
let msTimeCounter = 0;
const stopwatchText = new Text("stopwatchText");
const stopwatchButtonPin = new Button("pin");
const stopwatchButtonStartPause = new Button("start&pause_at_stopwatch");
const stopwatchButtonReset = new Button("reset");
let stopwatchIntervalId,
	stopwatchRenderIntervalId,
	stopwatchIsRunning = false;

function stopwatchButtonStartPauseOnClick() {
	stopwatchButtonStartPause.replaceIcon(
		`../svg/${stopwatchIsRunning ? "pause" : "start"}.svg`
	);
	if (stopwatchIsRunning) {
		stopwatchIsRunning = false;
		logicDisable([stopwatchIntervalId, stopwatchRenderIntervalId]);
		stopwatchText.replaceText(formatStopwatch(msTimeCounter));
		stopwatchButtonPin.removeClickListener(stopwatchButtonPinOnClick);
	} else {
		stopwatchIsRunning = true;
		stopwatchIntervalId = setInterval(() => {
			msTimeCounter += 10;
		}, 10);
		stopwatchRenderIntervalId = setInterval(() => {
			stopwatchText.replaceText(formatStopwatch(msTimeCounter));
		}, 15);
		stopwatchButtonPin.addClickListener(stopwatchButtonPinOnClick);
		stopwatchButtonReset.addClickListener(stopwatchButtonResetOnClick, true);
	}
}

function stopwatchButtonPinOnClick() {}

function stopwatchButtonResetOnClick() {
	logicDisable([stopwatchIntervalId, stopwatchRenderIntervalId]);
	if (stopwatchIsRunning)
		stopwatchButtonPin.removeClickListener(stopwatchButtonPinOnClick);
	stopwatchButtonStartPause.replaceIcon("../svg/start.svg");
	stopwatchIsRunning = false;
	msTimeCounter = 0;
	stopwatchText.replaceText(formatStopwatch(msTimeCounter));
	stopwatchButtonReset.removeClickListener(stopwatchButtonResetOnClick);
}

export function stopwatchEnable() {
	stopwatchText.replaceText(formatStopwatch(msTimeCounter));
	stopwatchButtonStartPause.addClickListener(stopwatchButtonStartPauseOnClick);
}
