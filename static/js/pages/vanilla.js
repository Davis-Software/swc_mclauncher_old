var { ipcRenderer } = require('electron')
var remote = require("electron").remote

function launch(){
    version = $( "#version-select option:selected" ).val().split(",")
    console.log(version)
    ipcRenderer.send('startmc', {
        credentials : getVal("credentials"),
        mcPath : getGameVal("gameOptions").mcPath,
        XmxRam : getGameVal("gameOptions").XmxRam,
        version: version[0],
        type: version[1]
    })
}

var launchbtn = document.getElementById("startbtn")
var progress = document.getElementById("start-progress")
var pr_bar = document.getElementById("progress-bar")


ipcRenderer.on("mc-init", function(ev){
    launchbtn.hidden = true
    progress.innerText = ``
    progress.style.width = "0%"
    pr_bar.style.height = "20px"
    progress.classList.remove("progress-bar-striped", "progress-bar-animated")
})
ipcRenderer.on("mc-download-status", function(ev, data){
    progress.innerText = `Download: ${Math.round((data.current/data.total)*100)}%`
    progress.style.width = `${Math.round((data.current/data.total)*100)}%`
})
ipcRenderer.on("mc-download", function(ev, data){
    progress.innerText = `Downloading file: ${data}`
    progress.style.width = `100%`
    progress.classList.add("progress-bar-striped", "progress-bar-animated")
})
ipcRenderer.on("mc-progress", function(ev, data){
    progress.innerText = `Extracting: ${data.task}/${data.total}`
    progress.style.width = `100%`
    if(!progress.classList.contains("progress-bar-striped")){
        progress.classList.add("progress-bar-striped", "progress-bar-animated")
    }
})
ipcRenderer.on("mc-debug", function(ev, data){
    if(String(data).includes("--userType")){
        progress.innerText = "Launching..."
        setTimeout(function(){pr_bar.style.height = "0"; launchbtn.hidden = false; if(getGameVal("hideOnGamestart")){remote.getCurrentWindow().hide()}}, 5000)
    }
    // console.log(data)
})
ipcRenderer.on("mc-data", function(ev, data){
    // console.log(data)
})
ipcRenderer.on("mc-end", function(){
    remote.getCurrentWindow().show()
})
