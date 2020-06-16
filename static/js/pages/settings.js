var os = require("os")
var { dialog } = require('electron').remote

var gamesets = getGameVal("gameOptions")

var rundetached = document.getElementById("rundetached")
var hideOnGamestart = document.getElementById("hideOnGamestart")

var maxram = document.getElementById("maxram")

var mcpath = document.getElementById("mcpath")
var jvpath = document.getElementById("jvex")
var jvmargs = document.getElementById("jvmargs")



rundetached.checked = gamedata.rundetached
hideOnGamestart.checked = gamedata.hideOnGamestart

rundetached.addEventListener("click", function(){
    gamedata.rundetached = rundetached.checked
    commit_game()
})
hideOnGamestart.addEventListener("click", function(){
    gamedata.hideOnGamestart = hideOnGamestart.checked
    commit_game()
})



maxram.value = gamesets.XmxRam
maxram.max = Math.round(os.totalmem()/(1024*1024))

function updateRAM(val){
    maxram.value = val
    $('#maxramVAL').html(val)
    gamedata.gameOptions.XmxRam = Number(val)
    commit_game()
}
$(document).ready(function() {
    const $valueSpan = $('#maxramVAL');
    const $value = $('#maxram');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
        updateRAM($value.val())
    });
});



mcpath.value = gamesets.mcPath
jvpath.value = gamesets.jPath
jvmargs.value = gamesets.jArguments

function changeMCPath(){
    var path = openfolder("Minecraft Folder")
    if(path){
        mcpath.value = path
        gamedata.gameOptions.mcPath = path
        commit_game()
    }
}
jvmargs.addEventListener("change", function(){
    gamedata.gameOptions.jArguments = jvmargs.value
    commit_game()
})









function openfolder(title){
    var path = dialog.showOpenDialogSync({
        title,
        properties: [
            "openDirectory"
        ]
    });
    if(path === undefined || path===""){
        return false
    }else{
        return path[0]
    }
    
}

function reset(){
    gamedata = def_gameconfig()
    commit_game()
}