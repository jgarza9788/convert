const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')
const {app, BrowserWindow, ipcMain} = electron;

const path = require('path');

let mainWindow;

app.on('ready',()=>
{
	console.log('app is ready');

	mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {backgroundThrottling: false},
    });

	/*code given by instructor that did not work*/
	// mainWindow.loadURL('file://${__dirname}\index.html');
    
	mainWindow.loadURL(path.join(__dirname,`./src/index.html`));

});




ipcMain.on('videos:added', (event, videos)=>
{
    console.log(videos);

	//i have ffmpeg installed in two paths
	//ffmpeg.setFfprobePath('C:\\ProgramData\\chocolatey\\lib\\ffmpeg\\tools\\ffmpeg\\bin\\ffprobe.exe');
	// ffmpeg.setFfprobePath('C:\\ffmpeg\\bin\\ffprobe.exe');
	// ffmpeg.ffprobe(path,function(err, metadata) 
	// {
	// 	/*show all data*/
	// 	//console.log(require('util').inspect(metadata, false, null));
		
	// 	console.log('duration is:', metadata.format.duration);
	// 	mainWindow.webContents.send('video:metadata',metadata.format.duration);
	// });
}
);
