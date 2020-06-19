var overview = document.getElementById("profile-overview")
var editor = document.getElementById("profile-edit")

// overview section
function overviewPage(){
    overview.hidden = false; editor.hidden = true
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
        for(let profile of profiles){
            profilelist.innerHTML += 
            `
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span>name</span>
                <button class="badge-pill material-icons btn-danger btn">close</button>
            </a>
            `
        }
    }
}

// editor section
function editorPage(edit){
    overview.hidden = true; editor.hidden = false
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
    })
}




overviewPage()