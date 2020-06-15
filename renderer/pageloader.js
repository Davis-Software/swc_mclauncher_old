function loadHTML(filename){
    // $("#mainpage").load(filename);
    $("#mainpage").fadeOut(100, function() {
        $(this).load(filename).fadeIn(100);
    });
}
function loadURL(url){
    $("#mainpage").load(url);
}
function loadSTRING(str){
    $("#mainpage").html(str)
}