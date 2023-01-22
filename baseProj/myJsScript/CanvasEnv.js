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
        
        const L = 3;
        var floor = this.meshManager.loadFromObj('floor', './assets/plane-2m.obj');
        floor.scalate(L, L, 0);
        let obj = this.meshManager.loadFromObj('cube1', './assets/cubo_con_assi.obj');
        obj.limits = Limits.linear(-L+0.25, L-0.25, -L+0.25, L-0.25, 3, 3);
        obj.setPosition(0, 0, 0.25);
        obj.scalate(0.25, 0.25, 0.25);
        log("main() | cube created");

    
	    this.controller = new Controller(obj);
	    this.CAMERA_MANAGER = createCameraManager(this.GlDrawer, obj);
	    attachHandlers(this.ENV.canvas, obj);

        targetObject = obj;
    }
}
