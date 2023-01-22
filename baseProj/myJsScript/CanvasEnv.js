function CanvasEnv(canvasName){

    this.canvasName = canvasName;
    this.ENV = null;
    this.meshManager = null;
    this.GlDrawer = null;

    this.controller = null;
    this.CAMERA_MANAGER = null;

    this.init = function() {
        log("init() : " + canvasName +" | starting...");
        this.ENV = createEnv(canvasName);
        log("init() : " + canvasName + " | ENV created")
    
        this.meshManager = createMeshManager(this.ENV.gl, this.ENV.programInfo);
        log("init() | MESH_MANAGER setup completed");

        this.GlDrawer = GL_DRAWER_LIST[createGlDrawer(this.meshManager)];
        log("init() | GL_DRAWER setup completed")
    
        
    }

    this.main = function(){
        this.init();

        let obj = this.meshManager.loadFromObj("elmetto", "./assets/AntoniosObj/helmet.obj")
        const L = 30;
        var floor = this.meshManager.loadFromObj('floor', './assets/AntoniosObj/world_tiger.obj');
        floor.scalate(L, L, 50);
        // floor.rotate(180, 180, false);
        // let obj = this.meshManager.loadFromObj('cube1', './assets/cubo_con_assi.obj');

        obj.setPosition(0, 0, 0.25);
        obj.scalate(0.25, 0.25, 0.25);
        obj.rotate(90,0,false);
        obj.limits = Limits.linear(-L+0.25, L-0.25, -L+0.25, L-0.25, 3, 3);
        log(obj.name + " | cube created");



	    this.controller = new Controller(obj);
	    this.CAMERA_MANAGER = createCameraManager(this.GlDrawer, obj);
	    attachHandlers(this.ENV.canvas, obj);
        targetObject = obj;
    }
}
