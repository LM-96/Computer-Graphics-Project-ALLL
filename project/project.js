/*============= ENV ============================*/
var ENV;
//var SHADERS;
var GL;
var modelXRotationRadians = degToRad(0);

function createEnv() {
  log("createEnv() | creating environment...");

  var canvas = document.getElementById("my_Canvas");
  log("createEnv() | canvas: " + canvas);
  gl = canvas.getContext("webgl");
  if (!gl) {
    throw new Error("WegGL not supported");
  }
  log("createEnv() | canvas and GL context created");

  log("createShaders() | creating shader programs...");
  var programInfo = webglUtils.createProgramInfo(gl, [
    "vertex-shader",
    "fragment-shader",
  ]);
  var program = programInfo.program;
  gl.useProgram(program);
  log("createShaders() | shader programs created and used");

  return {
    canvas: canvas,
    gl: gl,
    programInfo: programInfo,
    program: program,
  };
}

function init() {
  log("init() | starting...");
  ENV = createEnv();
  GL = ENV.gl;
  log("init() | ENV created");

  MESH_MANAGER = createMeshManager(ENV.gl, ENV.programInfo);
  log("init() | MESH_MANAGER setup completed");
  GL_DRAWER = createGlDrawer(MESH_MANAGER);
  log("init() | GL_DRAWER setup completed");

  const L = 3;
  let floor = MESH_MANAGER.loadFromObj("floor", "./assets/plane-2m.obj");
  floor.scalate(L, L, 0.25);
  let cube = MESH_MANAGER.loadFromObj("cube1", "./assets/cubo_con_assi.obj");
  cube.limits = Limits.linear(-L + 0.25, L - 0.25, -L + 0.25, L - 0.25, 3, 3);
  cube.setPosition(0, 0, 0.25);
  cube.setRotation(0, 0);
  cube.scalate(0.25, 0.25, 0.25);

  //GL_DRAWER.fov = degToRad(100);
  //GL_DRAWER.cameraPosition = [10, 10, 1];
  attachHandlers(ENV.canvas, MESH_MANAGER.get("cube1"));
  log("init() | handlers attached");

  GL_DRAWER.cameraManager.setCameraPosition(Position.newPosition(2, 2, 2));
  GL_DRAWER.cameraManager.setTargetPosition(Position.newPosition(0, 0, 0));
  GL_DRAWER.cameraManager.setUp([0, 1, 0]);
  GL_DRAWER.cameraManager.setCameraFovDegree(60);
  syncView();
}

function main() {
  init();
  log("main() | init completed");
  var cube1 = MESH_MANAGER.get("cube1");
  //cube1.scalate(0.5, 0.5, 0.5);

  //requestAnimationFrame(render);
  render();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function render(time) {
  time *= 0.001;
  then = time;

  //MESH_MANAGER.get('cube1').rotate((-0.7*delta), 0);
  //log("cameraPosition: " + GL_DRAWER.cameraPosition + ", target: " + GL_DRAWER.target);
  //log("cubePosition: " + cube.position.toArray());
  GL_DRAWER.drawScene();

  //await sleep(200);
  //requestAnimationFrame(render);
}

main();
