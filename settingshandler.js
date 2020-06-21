var iswin32 = process.platform === "win32";
var fs = require('fs');
var path = require("path")

var AppData;
var appPath;

var setfile;
var gamefile;

var settings;
var gamedata;
var tempdata;
var cachedir;

var settingsfile = "settings.json";
var gamefilefile = "gamefile.json";

appName = "SWC\ Minecraft\ Launcher"

if(iswin32){
    AppData = `${require("os").homedir()}/AppData/Roaming/`;
}else{
    AppData = `${require("os").homedir()}/.config/`;
}
appPath = AppData + appName + "/"

setfile = appPath + settingsfile;
gamefile = appPath + gamefilefile;
cachedir = appPath;


var def_config = {
    "loggedin":false,
    "credentials":{},
    "devMode":false
}
function def_gameconfig(){
    return {
        "hideOnGamestart": true,
        "rundetached": true,
        "closeonend": false,
        "resolution": [800, 400],
        "gameOptions": {
            "XmxRam": 4096,
            "mcPath": path.join(AppData, ".minecraft_swc"),
            "jPath": "~auto~",
            "jArguments": "-XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M"
        },
        "profiles": [
            
        ]
    }
}



try {
    exports.init_settings = init_settings;
    exports.setVal = setVal;
    exports.getVal = getVal;
    exports.setGameVal = setGameVal;
    exports.getGameVal = getGameVal;
    exports.gamedata = gamedata;
    exports.cachedir = cachedir;
    exports.tempdata = tempdata;
} catch (error) {
    init_settings();
}


function init_settings(){
    if(!fs.existsSync(setfile)){
        fs.writeFileSync(setfile, JSON.stringify(def_config));
    }
    if(!fs.existsSync(gamefile)){
        fs.writeFileSync(gamefile, JSON.stringify(def_gameconfig()));
    }
    settings = JSON.parse(fs.readFileSync(setfile, "utf8"));
    gamedata = JSON.parse(fs.readFileSync(gamefile, "utf8"));
    tempdata = JSON.parse("{}")
}

function commit_game(){
    fs.writeFileSync(gamefile, JSON.stringify(gamedata));
}

function setGameVal(key, val){
    gamedata[key] = val;
    commit_game();
}

function getGameVal(key){
    return gamedata[key];
}


function commit(){
    fs.writeFileSync(setfile, JSON.stringify(settings));
}

function setVal(key, val){
    settings[key] = val;
    commit();
}

function getVal(key){
    return settings[key];
}