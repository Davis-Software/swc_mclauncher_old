$(".username").text(getVal("credentials").username)

function populateSidebarMods(callback){
    $.get("https://projects.software-city.org/resources/minecraft/modded/modpacks/packs.json", function(data){
        var modli = document.getElementById("mod-section")
        for(mod of data){
            modli.innerHTML += 
            `
            <li class="liobj">
                <a href="#" page="modded" modpack=${mod.id}>${mod.name}</a>
            </li>
            `
        }
        if(data.length === 0){
            modli.innerHTML = 
            `
            <p>MODPACKS</p>
            <li>
                <span class="none">NONE</span>
            </li>
            `
        }else{
            tempdata.modJSON = data
        }
        callback()
    }).fail(alert)
}
function populateSidebarCustoms(callback){
    var data = getGameVal("profiles"); if(data==undefined){data=[]}
    var profileli = document.getElementById("custom-section")
    for(profile of data){
        profileli.innerHTML += 
        `
        <li class="liobj">
            <a href="#" page="customprofile" profile=${profile.id}>${profile.name}</a>
        </li>
        `
    }
    if(data.length === 0){
        profileli.innerHTML = 
        `
        <p>CUSTOM</p>
        <li>
            <span class="none">NONE</span>
        </li>
        `
    }else{
        tempdata.customJSON = data
    }
    callback()
}

function children(){
    var li = []
    for(let x of document.getElementById("sidebarli").children){
        if(x.nodeName === "SECTION" && x.classList.contains("lisection")){
            for(let y of x.children){
                if(y.classList.contains("liobj")){
                    li.push(y)
                }
            }
        }
    }
    return li
}

populateSidebarMods(
    function(){
        populateSidebarCustoms(function(){
            for(let x of children()){
                switch (x.children[0].getAttribute("page")) {
                    case "modded":
                        x.setAttribute("onclick", "sidebar_loadmodpage(this)")
                        break;
                    case "customprofile":
                        x.setAttribute("onclick", "sidebar_loadcustompage(this)")
                        break;
                    default:
                        x.setAttribute("onclick", "sidebar_loadpage(this)")
                        break;
                }
            }
        })
    }
)

function sidebar_loadpage(btn){
    var btns = children()
    for(let x of btns){x.classList.remove("active")}
    btn.classList.add("active")
    loadpage(btn.children[0].getAttribute("page"), btn.hasAttribute("force-data"))
}

function sidebar_loadmodpage(btn){
    var btns = children()
    for(let x of btns){x.classList.remove("active")}
    btn.classList.add("active")
    tempdata.loadmodpage = btn.children[0].getAttribute("modpack")
    loadpage("modded", btn.hasAttribute("force-data"))
}

function sidebar_loadcustompage(btn){
    var btns = children()
    for(let x of btns){x.classList.remove("active")}
    btn.classList.add("active")
    tempdata.loadcustompage = btn.children[0].getAttribute("profile")
    loadpage("customprofile", btn.hasAttribute("force-data"))
}

function external_loadpage(btn){
    var btns = children()
    for(let x of btns){x.classList.remove("active")}
    loadpage(btn.getAttribute("page"), btn.hasAttribute("force-data"))
}