function makeReleaseSelPart(name, version){
    var template = `<option value="{{version}},release" class="text-success">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeSnaoshotSelPart(name, version){
    var template = `<option value="{{version}},snapshot" class="text-warning">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeInvalidSelPart(name){
    var template = `<option class="text-danger" disabled>{{name}}</option>`
    return template.replace("{{name}}", name)
}
$.get("https://launchermeta.mojang.com/mc/game/version_manifest.json",function(data){
    var latestLI = document.getElementById("opt-latest")
    var releasesLI = document.getElementById("opt-releases")
    var snapchotLI = document.getElementById("opt-snapshot")

    latestLI.innerHTML += makeReleaseSelPart(`Release: ${data.latest.release}`, data.latest.release)
    latestLI.innerHTML += makeSnaoshotSelPart(`Snapshot: ${data.latest.snapshot}`, data.latest.snapshot)

    var count = 0
    for(let version of data.versions){
        if(version.type == "release"){
            if(version.id.includes("1.8") || version.id.includes("1.7.")){
                releasesLI.innerHTML += makeInvalidSelPart(version.id)
            }else{
                releasesLI.innerHTML += makeReleaseSelPart(version.id, version.id)
            }
        }
        if(version.type == "snapshot" && count < 50){
            snapchotLI.innerHTML += makeSnaoshotSelPart(version.id, version.id)
            count += 1
        }
    }
})




var { ipcRenderer } = require('electron')
var remote = require("electron").remote

function launch(version=null){
    var rootpath = path.join(getGameVal("gameOptions").mcPath, "vanilla")
    if(!fs.existsSync(rootpath)){
        for(var y of rootpath.split("\\")){
            str += `${y}\\`
            if(!fs.existsSync(str)){
                fs.mkdirSync(str)
            }
        }
    }
    if(version===null){
        version = $( "#version-select option:selected" ).val().split(",")
    }
    console.log(version)
    ipcRenderer.send('startmc', {
        credentials : getVal("credentials"),
        mcPath : rootpath,
        XmxRam : getGameVal("gameOptions").XmxRam,
        version: version[0],
        type: version[1]
    })
}

var launchbtn = document.getElementById("startbtn")
var progress = document.getElementById("start-progress")
var pr_bar = document.getElementById("progress-bar")
var version_select = document.getElementById("version-select")


ipcRenderer.on("mc-init", function(ev){
    launchbtn.hidden = true
    version_select.hidden = true
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
        setTimeout(function(){
            pr_bar.style.height = "0";
            launchbtn.hidden = false;
            version_select.hidden = false
            if(getGameVal("hideOnGamestart")){
                remote.getCurrentWindow().hide()
            }
        }, 5000)
    }
    console.log(data)
})
ipcRenderer.on("mc-data", function(ev, data){
    console.log(data)
})
ipcRenderer.on("mc-end", function(){
    if(getGameVal("closeonend")){
        remote.getCurrentWindow() = null
        remote.app.quit()
    }else{
        remote.getCurrentWindow().show()
    }
})
