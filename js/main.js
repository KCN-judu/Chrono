import { app, BrowserWindow, WebContentsView } from "electron";
let win, view;

function createWindow() {
	win = new BrowserWindow({
		width: 300,
		height: 500,
		webPreferences: {
			nodeIntegration: true,
		},
		//frame: false,
		transparent: true,
	});

	win.loadFile("html/index.html");
	win.resizable = false;
	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});
