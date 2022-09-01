/* ======= MOUSE EVENTS ======================================================= */
var drag = false;
var old_x, old_y;
var dX = 0, dY = 0;
var speed = 0.05;
var target;

var mouseDown = function(e) {
  drag = true;
  old_x = e.pageX, old_y = e.pageY;
  e.preventDefault();
  return false;
}

var mouseUp = function(e) {
  drag = false;
}

var mouseMove = function(e) {
  if(!drag) return false;
  dX=(e.pageX-old_x)*2*Math.PI/ENV.canvas.width,
  dY=(e.pageY-old_y)*2*Math.PI/ENV.canvas.height;
  target.rotate(dX, dY);
  old_x=e.pageX, old_y=e.pageY;
  e.preventDefault();
  GL_DRAWER.drawScene();
}

var keydown = function(e) {
  switch(e.keyCode) {
    case 40 : target.translateL(0, 0.1, 0, m4.identity()); break;  //Freccia Giù
    case 38 : target.translateL(0, -0.1, 0, m4.identity()); break;       //Freccia Su
    case 37 : target.translateL(-0.1, 0, 0, m4.identity()); break;  //Freccia Sx
    case 39 : target.translateL(0.1, 0, 0, m4.identity()); break;       //Ferccia Dx
  }
  log("pos: " + target.position.toString());
  GL_DRAWER.drawScene();
}

function attachHandlers(canvas, p_target) {
  canvas.onmousedown=mouseDown;
  canvas.onmouseup=mouseUp;
  canvas.mouseout=mouseUp;
  canvas.onmousemove=mouseMove;
  target = p_target;

  document.addEventListener('keydown', keydown);
}
