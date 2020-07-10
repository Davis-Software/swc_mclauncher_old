setTimeout(function(){
    if(getGameVal("lastmodpack")[moddata.id] == undefined){
        launchbtn.innerHTML = "INSTALL"
        launchbtn.classList.remove("btn-secondary")
        launchbtn.classList.add("btn-primary")
    }else if(getGameVal("lastmodpack")[moddata.id] != moddata.version){
        launchbtn.innerHTML = "UPDATE"
        launchbtn.classList.remove("btn-secondary")
        launchbtn.classList.add("btn-warning")
    }else{
        launchbtn.innerHTML = "PLAY"
        launchbtn.classList.remove("btn-secondary")
        launchbtn.classList.add("btn-success")
    }
    launchbtn.disabled = false
}, 200)
