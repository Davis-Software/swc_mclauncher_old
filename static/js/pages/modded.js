function getMod(id){
    for(let x of tempdata.modJSON){
        if(x.id === id){
            return x
        }
    }
}

var moddata = getMod(tempdata.loadmodpage)

$(".mod-name").text(moddata.name)
$(".mod-icon").attr("src", moddata.icon)
$(".mod-creator").text(moddata.creator)
$(".mod-version").text(moddata.version)
$(".mod-mcver").text(moddata.mcVersion)
$(".mod-type").text(moddata.type)
$(".mod-desc").text(moddata.desc)
document.getElementById("mainpage").innerHTML = document.getElementById("mainpage").innerHTML.replace(`"{{mod-bg}}"`, `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${moddata["bg-picture"]})`)







var { ipcRenderer } = require('electron')
var remote = require("electron").remote
var fs = require("fs-extra")

var rootpath = path.join(getGameVal("gameOptions").mcPath, "modpacks", moddata.id)

var launchbtn = document.getElementById("startbtn")
var progress = document.getElementById("start-progress")
var pr_bar = document.getElementById("progress-bar")

function launch(){
    var reinstall = false
    if(getGameVal("lastmodpack")[moddata.id] != moddata.version){
        reinstall = true
        progress.classList.add("progress-bar-striped", "progress-bar-animated")
        progress.innerText = `Reinstalling due to update...`
        progress.style.width = "100%"
        pr_bar.style.height = "20px"
        fs.removeSync(path.join(rootpath, "mods"))
        fs.removeSync(path.join(rootpath, "config"))
        if(moddata.extrafiles != undefined){
            console.log("ok")
            for(var x of moddata.extrafiles){
                console.log(path.join(rootpath, x), fs.existsSync(path.join(rootpath, x)))
                if(fs.existsSync(path.join(rootpath, x))){
                    fs.removeSync(path.join(rootpath, x))
                }
            }
        }
        gamedata["lastmodpack"][moddata.id] = moddata.version
        commit_game()
    }

    var package = `https://projects.software-city.org/resources/minecraft/modded/modpacks/${moddata.id}.zip`

    version = [moddata.mcVersion, moddata.type]

    ipcRenderer.send('startmoddedmc', {
        currpack: path.join(rootpath, `clientPackage.zip`),
        credentials : getVal("credentials"),
        mcPath : rootpath,
        XmxRam : getGameVal("gameOptions").XmxRam,
        package: package,
        forge: path.join(rootpath, `bin/forge-${moddata.mcVersion}.jar`),
        version: version[0],
        type: version[1],
        reinstall: reinstall
    })
}

ipcRenderer.on("mc-init", function(ev){
    launchbtn.hidden = true
    progress.innerText = ``
    progress.style.width = "0%"
    pr_bar.style.height = "20px"
    progress.classList.remove("progress-bar-striped", "progress-bar-animated")
})
ipcRenderer.on("mc-mod-sum", function(){
    progress.style.width = "100%"
    progress.innerText = `getting checksum...`
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
ipcRenderer.on("mc-error", function(err){
    pr_bar.style.height = "0";
    launchbtn.hidden = false;
    console.error(err)
    alert(err)
})