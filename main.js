const {app, BrowserWindow, ipcMain, dialog} = require("electron");

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 450,
        frame: false,
        backgroundColor: "#222222",
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/dom/index.html`);

    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, (files) => {
        if (files) {
            event.sender.send('selected-directory', files);
        }
    });
});

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});