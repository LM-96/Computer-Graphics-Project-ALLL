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
    case 40 : target.rotate(0, -1 * speed); break;
    case 38 : target.rotate(0, speed); break;
    case 37 : target.rotate(-1 * speed, 0); break;
    case 39 : target.rotate(speed, 0); break;
  }
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
