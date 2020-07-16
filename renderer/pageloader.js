function loadHTML(filename){
    $("#mainpage").fadeOut(100, function() {
        $(this).load(filename).fadeIn(100);
    });
}
function loadURL(url){
    $("#mainpage").fadeOut(100, function() {
        $(this).load(url).fadeIn(100);
    });
}
function loadSTRING(str){
    $("#mainpage").fadeOut(100, function() {
        $(this).html(str).fadeIn(100);
    });
}