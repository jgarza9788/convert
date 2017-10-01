const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')
const _ = require('lodash');
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
    //console.log(videos);
    const promises = _.map(videos,video =>
    {
        return new Promise((resolve,reject)=>
        {
            ffmpeg.ffprobe(video.path,(err, metadata) =>
            {
                //console.log('All Metadata:', metadata);
                video.duration = metadata.format.duration;
                video.format = 'avi';

                resolve(video);
            });
        });
    });

    Promise.all(promises).then((results)=> 
    {

        console.log("video(s) added");
        console.log(results);
        console.log("\n");
        mainWindow.webContents.send('metadata:complete',results);
    });


    /*
    const promise = new Promise((resolve, reject)=>
    {
        ffmpeg.ffprobe(videos[0].path,(err, metadata) =>
        {
            console.log('All Metadata:', metadata);
            resolve(metadata);
        });
    });

    promise.then((metadata)=>{console.log(metadata);})
    */

	//i have ffmpeg installed in two paths
    //ffmpeg.setFfprobePath('C:\\ProgramData\\chocolatey\\lib\\ffmpeg\\tools\\ffmpeg\\bin\\ffprobe.exe');
    

    /*
    ffmpeg.setFfprobePath('C:\\ffmpeg\\bin\\ffprobe.exe');

    for (i = 0; i < videos.length; i++) 
    { 
        ffmpeg.ffprobe(videos[i].path,function(err, metadata) 
        {
            //show all data
            //console.log(require('util').inspect(metadata, false, null));
            
            // console.log('duration is:', metadata.format.duration);

            console.log('All Metadata:', metadata);
            //mainWindow.webContents.send('video:duration',metadata.format.duration);
        });
    }
    */
});

ipcMain.on('conversion:start', (event, videos) => 
{
    console.log(videos[0]);
    // console.log("video.path: "+  videos[0].path);
    // console.log("video.name: "+  videos[0].name);
    // console.log("video.format: "+  videos[0].format);

    // _.each(videos, video => 
    // {
    //     console.log("video.path: "+  video.path);
    //     console.log("video.name: "+  video.name);
    //     console.log("video.format: "+  video.format);

    //     const outputDirectory = video.path.split(video.name)[0];
    //     const outputName = video.name.split('.')[0]
    //     const outputPath = `${outputDirectory}${outputName}.${video.format}`;
        

    //     ffmpeg(video.path)
    //     .output(outputPath)
    //     .on('progress', ({ timemark }) =>
    //         mainWindow.webContents.send('conversion:progress', { video, timemark })
    //     )
    //     .on('end', () =>
    //         mainWindow.webContents.send('conversion:end', { video, outputPath })
    //     )
    //     .run();
    // });
  });
  
  ipcMain.on('folder:open', (event, outputPath) => {
    shell.showItemInFolder(outputPath);
  });