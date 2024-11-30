import fs from "fs";
import config from "../config.json" assert { type: "json" };

global.config = config;

export function writeConfig(config) {
	if (fs.existsSync())
		fs.writeFileSync("../config.json", JSON.stringify(config));
}

export function decodeBackendConfig() {
	if (global.config.backend == undefined) return;
}
