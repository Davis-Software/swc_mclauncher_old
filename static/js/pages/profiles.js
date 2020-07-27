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
                    <span class="info">Edited: ${profile.date}</span>
                </a>
                <button class="badge-pill material-icons btn-danger btn control" onclick="deleteProfile('${profile.id}')">close</button>
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
        function makeTabVisible(tab){tab.classList.remove("fade");tab.classList.add("active")}
        function makeTabInvisible(tab){tab.classList.remove("active");tab.classList.add("fade")}
        function makeTabButtonActive(btn){btn.children[0].classList.add("active")}
        function makeTabButtonInactive(btn){btn.children[0].classList.remove("active")}

        var releasesTAB = document.getElementById("releases")
        var snapshotTAB = document.getElementById("snapshots")
        var betasTAB = document.getElementById("betas")
        var forgeTAB = document.getElementById("forge")
        var tabBTNs = document.getElementsByClassName("nav-item")

        if(edit){

            load(vals.type, function(){
                versionsel.value = `${vals.mcVersion},${vals.type}`
            })

            pname.value = vals.name,
            icon.value = vals.icon,
            bg.value = vals.bg,
            document.getElementById("save-btn").setAttribute("onclick", `save('${vals.id}')`)

            makeTabInvisible(releasesTAB)
            makeTabInvisible(snapshotTAB)
            makeTabInvisible(betasTAB)
            makeTabInvisible(forgeTAB)
            for(var x of tabBTNs){makeTabButtonInactive(x)}

            switch (vals.type) {
                case "forge":
                    makeTabVisible(forgeTAB);
                    makeTabButtonActive(tabBTNs[3])
                    break;
                case "release":
                    makeTabVisible(releasesTAB);
                    makeTabButtonActive(tabBTNs[0])
                    break;
                case "snapshot":
                    makeTabVisible(snapshotTAB);
                    makeTabButtonActive(tabBTNs[1])
                    break;
                case "old_alpha":
                    makeTabVisible(betasTAB);
                    makeTabButtonActive(tabBTNs[2])
                    break;
                case "old_beta": 
                    makeTabVisible(betasTAB);
                    makeTabButtonActive(tabBTNs[2])
                    break;
                default:
                    makeTabVisible(releasesTAB);
                    makeTabButtonActive(tabBTNs[0])
                    break;
            }
        }else{
            pname.value = "",
            icon.value = "",
            bg.value = ""
            document.getElementById("save-btn").setAttribute("onclick", `save()`)
            load("release")
            makeTabVisible(releasesTAB);
            makeTabButtonActive(tabBTNs[0])
        }
        overview.hidden = true; editor.hidden = false
    }
    setVals()
}

function makeForgeSelPart(name, version, mcVersion){
    var template = `<option value="{{mcVersion}}-{{version}},forge" class="text-success">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name).replace("{{mcVersion}}", mcVersion)
}
function makeReleaseSelPart(name, version){
    var template = `<option value="{{version}},release" class="text-success">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeSnapshotSelPart(name, version){
    var template = `<option value="{{version}},snapshot" class="text-warning">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeBetaSelPart(name, version){
    var template = `<option value="{{version}},old_beta" class="text-warning">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeAlphaSelPart(name, version){
    var template = `<option value="{{version}},old_alpha" class="text-danger">{{name}}</option>`
    return template.replace("{{version}}", version).replace("{{name}}", name)
}
function makeInvalidSelPart(name){
    var template = `<option class="text-danger" disabled>{{name}}</option>`
    return template.replace("{{name}}", name)
}

function load(type, callback=function(){}){
    $.get("https://launchermeta.mojang.com/mc/game/version_manifest.json",function(data){
        var latestLI = document.getElementById("opt-latest")
        var allLI = document.getElementById("opt-all")
        
        latestLI.innerHTML = ""
        allLI.innerHTML = ""

        switch (type) {
            case "release":
                latestLI.innerHTML = makeReleaseSelPart(`${data.latest.release}`, data.latest.release)
                for(let version of data.versions){
                    if(version.type == "release"){
                        if(version.id.includes("1.8") || version.id.includes("1.7.")){
                            allLI.innerHTML += makeInvalidSelPart(version.id)
                        }else{
                            allLI.innerHTML += makeReleaseSelPart(version.id, version.id)
                        }
                    }
                }
                break;
            case "snapshot":
                latestLI.innerHTML = makeSnapshotSelPart(`${data.latest.snapshot}`, data.latest.snapshot)
                for(let version of data.versions){
                    if(version.type == "snapshot"){
                        allLI.innerHTML += makeSnapshotSelPart(version.id, version.id)
                    }
                }
                break;
            case "old_beta":
            case "old_alpha":
            case "beta":
                latestLI.innerHTML = makeInvalidSelPart(undefined)
                for(let version of data.versions){
                    if(version.type == "old_beta"){
                        allLI.innerHTML += makeBetaSelPart(version.id, version.id)
                    }else if(version.type == "old_alpha"){
                        allLI.innerHTML += makeAlphaSelPart(version.id, version.id)
                    }
                }
                break;
            case "forge":
                var supported_forge_versions = {
                    "latest": {mc: "1.12.2", version: "14.23.5.2847"},
                    "1.12.2": ["14.23.5.2847"]
                    // "1.7.10": ["10.13.4.1558-1.7.10", "10.13.4.1614-1.7.10"]
                }
                latestLI.innerHTML = makeForgeSelPart(`Minecraft ${supported_forge_versions.latest.mc} - Forge ${supported_forge_versions.latest.version}`, supported_forge_versions.latest.version, supported_forge_versions.latest.mc)
                for(var version in supported_forge_versions){
                    if(version == "latest"){continue}
                    var versionli = supported_forge_versions[version].reverse()
                    for(var ver of versionli){
                        allLI.innerHTML += makeForgeSelPart(`Minecraft ${version} - Forge ${ver}`, ver, version)
                    }
                }
                break;
            default:
                break;
        }
        callback()
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



// editorPage()
overviewPage()