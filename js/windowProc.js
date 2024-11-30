import { formatClock, formatTimer, formatStopwatch } from "./format.js";
let config = window.config;
export function decodeFrontendConfig() {
	if (config.frontend == undefined) return;
}

//const of clock
const timeZone = config?.frontend?.clock?.timeZone;
const timeFomat = config?.frontend?.clock?.timeFomat;
const clockText = document.getElementById("clockText");

//const of timer

//const of stopwatch
const stopwatchText = document.getElementById("stopwatchText");

const clockBtn = document.getElementById("clockIcon");
const timerBtn = document.getElementById("timerIcon");
const stopwatchBtn = document.getElementById("stopwatchIcon");
const settingsBtn = document.getElementById("settingsIcon");
clockBtn.addEventListener("click", () => {});
timerBtn.addEventListener("click", () => {});
stopwatchBtn.addEventListener("click", () => {});
settingsBtn.addEventListener("click", () => {});

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

function registerStopwatchLogic() {}

function cancelStopwatchLogic() {}
