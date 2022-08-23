/* ======= MOUSE EVENTS ======================================================= */
var drag = false;
var old_x, old_y;
var dX = 0, dY = 0;
var speed = 0.05;

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
  dX=(e.pageX-old_x)*2*Math.PI/canvas.width,
  dY=(e.pageY-old_y)*2*Math.PI/canvas.height;
  THETA += dX;
  PHI += dY;
  old_x=e.pageX, old_y=e.pageY;
  e.preventDefault();
  render();
}

var keydown = function(e) {
  switch(e.keyCode) {
    case 40 : PHI -= speed; break;
    case 38 : PHI += speed; break;
    case 37 : THETA -= speed; break;
    case 39 : THETA += speed; break;
  }
  render();
}

canvas.onmousedown=mouseDown;
canvas.onmouseup=mouseUp;
canvas.mouseout=mouseUp;
canvas.onmousemove=mouseMove;

document.addEventListener('keydown', keydown);
