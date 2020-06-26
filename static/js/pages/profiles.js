var overview = document.getElementById("profile-overview")
var editor = document.getElementById("profile-edit")
var fs = require("fs-extra")













// overview section
function overviewPage(){
    var profilelist = document.getElementById("profile-list")
    var profiles = getGameVal("profiles")
    if(profiles.length==0){
        profilelist.innerHTML = 
            `
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span>No custom profiles</span>
            </a>
            `
    }else{
        profilelist.innerHTML = ""
        for(let profile of profiles){
            profilelist.innerHTML += 
            `
            <div class="list-group-item list-group-item-action align-items-center justify-content-between d-flex">
                <a href="#" class="justify-content-between d-flex" onclick="editProfile('${profile.id}')">
                    <span>${profile.name}</span>
                    <span class="info">Type: ${profile.type}</span>
                    <span class="info">Version: ${profile.mcVersion}</span>
                    <span class="info">Created: ${profile.date}</span>
                </a>
                <button class="badge-pill material-icons btn-danger btn" onclick="deleteProfile('${profile.id}')">close</button>
            </div>
            `
        }
    }
    overview.hidden = false; editor.hidden = true
}
function editProfile(profileid){
    function propFromId(jsObjects, id){
        return jsObjects.filter(obj => {
            return obj.id === id
        })[0]
    }
    editorPage(true, propFromId(getGameVal("profiles"), profileid))
}
function deleteProfile(profileid){
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }
    function propFromId(jsObjects, id){
        return jsObjects.filter(obj => {
            return obj.id === id
        })[0]
    }
    var torm = propFromId(getGameVal("profiles"), profileid)
    var remed = removeItemOnce(getGameVal("profiles"), torm)
    setGameVal("profiles", remed)
    commit_game()
    overviewPage()
    SidebarLoad()
    if(fs.existsSync(path.join(getGameVal("gameOptions").mcPath, "profiles", profileid))){
        fs.removeSync(path.join(getGameVal("gameOptions").mcPath, "profiles", profileid))
    }
}
















// editor section
var { dialog } = require('electron').remote
var uuid = require("uuid").v4

var pname = document.getElementById("edit-name")
var icon = document.getElementById("edit-icon")
var bg = document.getElementById("edit-bg")
var versionsel = document.getElementById("edit-version")

function editorPage(edit, vals){

    function setVals(){
        if(edit){
            pname.value = vals.name,
            icon.value = vals.icon,
            bg.value = vals.bg,
            versionsel.value = `${vals.mcVersion},${vals.type}`
            document.getElementById("save-btn").setAttribute("onclick", `save('${vals.id}')`)
        }else{
            pname.value = "",
            icon.value = "",
            bg.value = ""
            document.getElementById("save-btn").setAttribute("onclick", `save()`)
        }
        overview.hidden = true; editor.hidden = false
    }

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
    
        latestLI.innerHTML = makeReleaseSelPart(`Release: ${data.latest.release}`, data.latest.release)
        latestLI.innerHTML += makeSnaoshotSelPart(`Snapchot: ${data.latest.snapshot}`, data.latest.snapshot)
    
        var count = 0
        releasesLI.innerHTML = ""
        snapchotLI.innerHTML = ""
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
        setVals()
    })
}
function selectFile(idto){
    var elem = document.getElementById(idto)
    var path = openfolder(`Open for ${elem.getAttribute("for")}`)
    if(path){
        elem.value = path
    }
}
function openfolder(title){
    var path = dialog.showOpenDialogSync({
        title,
        properties: [
            "openFile"
        ],
        filters: [
            { name: "Images", extensions: ["png", "jpg", "jpeg", "gif"] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    if(path === undefined || path===""){
        return false
    }else{
        return path[0]
    }
}
function propCountFromId(jsObjects, id){
    for(let i in jsObjects){
        if(jsObjects[i].id == id){
            return i
        }
    }
    return null
}
function save(id=undefined){
    if(pname.value == ""){return}
    function propFromId(jsObjects, id){
        return jsObjects.filter(obj => {
            return obj.id === id
        })[0]
    }
    function propCountFromId(jsObjects, id){
        for(let i in jsObjects){
            if(jsObjects[i].id == id){
                return i
            }
        }
        return null
    }
    if(id!=undefined && propFromId(getGameVal("profiles"), id)){
        var version = versionsel.value
        var data = {
            id: id,
            name: pname.value,
            icon: icon.value,
            bg: bg.value,
            type: version.split(",")[1],
            mcVersion: version.split(",")[0],
            date: new Date().toDateString()
        }
        gamedata.profiles[propCountFromId(getGameVal("profiles"), id)] = data
    }else{
        var version = versionsel.value
        var data = {
            id: uuid(),
            name: pname.value,
            icon: icon.value,
            bg: bg.value,
            type: version.split(",")[1],
            mcVersion: version.split(",")[0],
            date: new Date().toDateString()
        }
        
        var li = getGameVal("profiles")
        setGameVal("profiles", [])
        li.push(data)
        setGameVal("profiles", li)
    }
    commit_game()
    SidebarLoad()
    overviewPage()
}




overviewPage()