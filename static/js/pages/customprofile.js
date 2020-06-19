function getProfile(id){
    for(let x of tempdata.customJSON){
        if(x.id === id){
            return x
        }
    }
}

var customdata = getProfile(tempdata.loadcustompage)

$(".custom-name").text(customdata.name)
$(".custom-date").text(customdata.date)
$(".custom-mcver").text(customdata.mcVersion)
$(".custom-type").text(customdata.type)
if(customdata.icon != ""){
    $(".custom-icon").attr("src", customdata.icon)
}
if(customdata["bg-icon"] != ""){
    document.getElementById("mainpage").innerHTML = document.getElementById("mainpage").innerHTML.replace(`"{{custom-bg}}"`, `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${customdata["bg-icon"]})`)
}else{
    document.getElementById("mainpage").innerHTML = document.getElementById("mainpage").innerHTML.replace(`"{{custom-bg}}"`, `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./../static/images/vanilla-bg.png)`)
}
