/**
 * Pad a number with leading zeros to a certain length.
 *
 * @param {number} num - the number to pad
 * @param {number} len - the length of the string
 * @returns {string} - the padded string
 */
function padZero(num, len) {
	return num.toString().padStart(len, "0");
}

/**
 * Format a time in milliseconds or seconds as a string.
 *
 * @param {number} time - the time to format
 * @param {"ms"|"s"} [unit="ms"] - the unit of the input time
 * @returns {string} - the formatted string in the form "hh:mm:ss"
 */
export function formatTimer(time, unit = "ms") {
	let seconds;
	if (unit == "ms") seconds = time / 1000;
	else seconds = time;
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${padZero(hours, 2)}:${padZero(minutes, 2)}:${padZero(secs, 2)}`;
}

/**
 * Format a time in milliseconds as a string.
 *
 * @param {number} milliseconds - the time to format
 * @returns {string} - the formatted string
 *
 * Format string is of the form "hh:mm:ss.mmm" where:
 * - "hh" is the number of hours
 * - "mm" is the number of minutes
 * - "ss" is the number of seconds
 * - "mmm" is the number of milliseconds
 */
export function formatStopwatch(milliseconds) {
	const hours = Math.floor(milliseconds / 3600000);
	const minutes = Math.floor((milliseconds % 3600000) / 60000);
	const seconds = Math.floor((milliseconds % 60000) / 1000);
	const ms = (milliseconds % 1000) / 10;
	return `${padZero(hours, 2)}:${padZero(minutes, 2)}:${padZero(
		seconds,
		2
	)}.${padZero(ms, 2)}`;
}

/**
 * Format a Date object as a string.
 *
 * @param {number} [timeZone=0] - offset in hours from UTC
 * @param {string} [timeFomat="hh:mm/24"] - format string
 * @returns {string} - formated time string
 *
 * Format string is of the form "hh:mm/24" where:
 * - "hh:mm" is the format for the time (hours, minutes, seconds)
 * - "24" is the format for the hour (either 24 hour or 12 hour)
 */
export function formatClock(timeZone = 0, timeFomat = "hh:mm/24") {
	let GMToffset = new Date().getTimezoneOffset() / 60;
	console.log(GMToffset);
	GMToffset += timeZone;
	const date = new Date(Date.now() + GMToffset * 60 * 60 * 1000);

	const [strFormat, numFormat] = timeFomat.split("/");

	const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];

	if (numFormat == "12") h -= 12;

	let formatedTime = "";

	switch (strFormat) {
		case "hh:mm":
			formatedTime = `${padZero(h, 2)}:${padZero(m, 2)}`;
			break;

		case "hh:mm:ss":
			formatedTime = `${padZero(h, 2)}:${padZero(m, 2)}:${padZero(s, 2)}`;
			break;

		default:
			break;
	}

	return formatedTime;
}
