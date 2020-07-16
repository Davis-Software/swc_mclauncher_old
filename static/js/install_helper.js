const fs = require("fs")
const checksum = require("checksum")
const request = require("request");
const { ipcMain } = require("electron");

function getChecksum(file, callback, fail){
    if(!fs.existsSync(file)){callback(null);return}
    else{
        checksum.file(file, {
            algorithm: "md5"
        }, function(err, data){
            if(err){fail(err)}
            else{
                callback(data)
            }
        })
    }
}

function getShouldSum(url, callback, fail){
    request.get(`${url}?checksum`, function(err, resp, body){
        if(err){fail(err)}
        else{
            callback(body)
        }
    })
}

function compareCheckSums(url, file, callback, fail){
    getShouldSum(url, function(data){
        getChecksum(file, function(checksum){
            callback({
                equal: data == checksum,
                is: checksum,
                should: data
            })
        }, fail)
    }, fail)
}



exports.checksum = checksum
exports.compareCheckSums = compareCheckSums


function downloadFIleToDir(url, destination, send=function(){}){
    var file = fs.createWriteStream(destination)
    var requ = request(url)
    requ.on("response", function(res){
        res.pipe(file)
    })
    file.on("close", () => {send("readyToLaunch")})
}

exports.downloadFIleToDir = downloadFIleToDir