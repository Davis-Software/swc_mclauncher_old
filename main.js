const electron = require('electron')
const { ipcMain } = require("electron")
const {autoUpdater} = require('electron-updater');
const sethandle = require("./settingshandler.js");
const menuhandle = require("./renderer/menu.js");
const launcher = require("./static/js/launcher.js")
const app = electron.app;
const BrowserWindow = electron.BrowserWindow

const iswin32 = process.platform === "win32"

sethandle.init_settings()

let win

app.allowRendererProcessReuse = true

function createWindow () {
    if(app.requestSingleInstanceLock()){
        win = new BrowserWindow({
            width: 1280,
            height: 720,
            minWidth: 1280,
            minHeight: 720,
            darkTheme: true,
            resizable: false,
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true,
                contextIsolation: false
            },
            frame: sethandle.getVal("devMode")
        });
        exports.window = win;
        app.allowRendererProcessReuse = true;
        if(sethandle.getVal("devMode")){
            menuhandle.buildMenu();
        }else{
            win.setMenuBarVisibility(false)
        }
        win.once('focus', () => win.flashFrame(false))
        if(iswin32){
            win.setIcon(__dirname + '/static/logos/logo.ico');
        }else{
            win.setIcon(__dirname + '/static/logos/256x256.png')
        }
        require("dns").lookup("software-city.org", function(err, addr) {
            if (err) {
                win.loadFile('templates/offline.html');
            } else {
                require('dns').lookupService(addr, 80, function(err) {
                    if (err) {
                        win.loadFile('templates/offline.html');
                    } else {
                        win.loadFile("templates/login.html");
                    }
                });
            }
        });
        win.loadFile('templates/pageload.html');
        if(!sethandle.getVal("devMode")) {
            autoUpdater.checkForUpdates();
        }
    }else{
        app.quit()
    }
}
app.whenReady().then(createWindow)

app.on('window-all-closed', (ev) => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = (text) => {
    if (win) {
        win.webContents.send('updatemessage', text);
    }
};

autoUpdater.on('update-available', info => {
    win.loadFile('templates/update.html');
});
autoUpdater.on('error', err => {
    sendStatusToWindow(["error", `Error in auto-updater: ${err.toString()}`]);
});
autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(
        ["downloading", {"speed": progressObj.bytesPerSecond, "progress": progressObj.percent, "transferred": progressObj.transferred, "total": progressObj.total}]
    );
});

autoUpdater.on('update-downloaded', info => {
    autoUpdater.quitAndInstall();
});

app.requestSingleInstanceLock()


const sendToWindow = (event, data="") => {
    if (win) {
        win.webContents.send(event, data);
    }
};
ipcMain.on("startmc", function(ev, args){
    launcher.launch(sendToWindow, args)
})