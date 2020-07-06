function getProfile(id){
    for(let x of tempdata.customJSON){
        if(x.id === id){
            return x
        }
    }
}

var customdata = getProfile(tempdata.loadcustompage)

$(".custom-name").text(customdata.name)
$(".custom-date").text(customdata.date)
$(".custom-mcver").text(customdata.mcVersion)
$(".custom-type").text(customdata.type)
if(customdata.icon != ""){
    $(".custom-icon").attr("src", customdata.icon)
}
if(customdata.bg != ""){
    document.getElementById("mainpage").innerHTML = document.getElementById("mainpage").innerHTML.replace(`"{{custom-bg}}"`, `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${customdata.bg.replaceAll("\\", "/")})`)
}else{
    document.getElementById("mainpage").innerHTML = document.getElementById("mainpage").innerHTML.replace(`"{{custom-bg}}"`, `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./../static/images/vanilla-bg.png)`)
}






var { ipcRenderer } = require('electron')
var remote = require("electron").remote

function launch(){
    var rootpath = path.join(getGameVal("gameOptions").mcPath, "profiles", customdata.id)
    var data = {
        credentials : getVal("credentials"),
        mcPath : rootpath,
        XmxRam : getGameVal("gameOptions").XmxRam,
        version: customdata.mcVersion,
        type: customdata.type
    }
    var str = ""
    if(!fs.existsSync(rootpath)){
        for(var y of rootpath.split("\\")){
            str += `${y}\\`
            if(!fs.existsSync(str)){
                fs.mkdirSync(str)
            }
        }
        // fs.mkdirSync(rootpath)
    }
    ipcRenderer.send('startmc', data)
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
        setTimeout(function(){
            pr_bar.style.height = "0";
            launchbtn.hidden = false;
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
