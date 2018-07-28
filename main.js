const {app, BrowserWindow} = require('electron');
const config = require('./package.json').config;

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    frame: false,
    resizable: true,
    center: true
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  if (config.debugmode) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setMenu(null);
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
