const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
var fs = require('fs');
const cors = require('cors')
const express = require('express')
const appEx = express()

https://cloudinfrastructureservices.co.uk/sqlite-nodejs-tutorial-install-and-create-basic-nodejs-api/



let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1240,
    height: 800,
    backgroundColor: "#ffffff",

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.maximize();
  //win.loadURL(path.join(__dirname,'./dist/dsadmin/index.html'));
  win.loadURL("http://localhost:3000");
  win.on("closed", function () {
    win = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

var corsOptions =
{
    origin:'http://localhost:4200',
    optionsSuccessStatus:200
}


appEx.use(express.static(path.join(__dirname, './dist/dsadmin')))

appEx.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/dsadmin/index.html'));
  });

appEx.use(cors(corsOptions))

appEx.listen(3000, ()=>
{
    console.log('Server is live on port 3000')
})
/* ipcMain.on('uploads', (event, paths) => {

  let name = path.parse(paths).name
  saveUploads(name, paths)
}) */

/* function saveUploads(name, paths)
{
  let extension = path.extname(paths)
  let writePath = app.getAppPath() + "\\src\\assets\\voices\\" + name + `${extension}`

  fs.createReadStream(paths).pipe(fs.createWriteStream(writePath)).on('close', () => {
    console.log("Upload Successfull!")
  });
 
}
 */
app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
