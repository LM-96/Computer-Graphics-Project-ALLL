const canvas = document.getElementById("my_Canvas");
var ciao = function (e){
    log(e.type);
}

function main(){
    log("CIAO!")
    attachHandlers(canvas, "onkeydown", log);
    // attachHandlers(canvas, "onmousemove", log);
    attachHandlers(canvas, "onmousedown", ciao);
    attachHandlers(canvas, "onmouseup", log);
    attachHandlers(canvas, "onmouseout", log);

    menu();
}


/** Main Func **/
main();

