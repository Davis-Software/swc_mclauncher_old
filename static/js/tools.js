String.prototype.includesMult = function(searchlist, position=undefined){
    if(position!=undefined){
        for(var x of searchlist){
            if(this.includes(x, position)){return true}
        }
        return false
    }else{
        for(var x of searchlist){
            if(this.includes(x)){return true}
        }
        return false
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function openExplorer(path){
    shell.openItem('folderpath')
}

function openwebpage(page){
    shell.openExternal(page)
}

try {
    exports.algorithm = algorithm
    exports.encrypt = encrypt
    exports.decrypt = decrypt
} catch (error) {
    
}