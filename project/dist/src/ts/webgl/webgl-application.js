"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjLimitsChecker = exports.ObjScale = exports.ObjRotation = exports.ObjPosition = exports.OnCanvasTouchEvent = exports.OnKeyboardEvent = exports.OnCanvasMouseEvent = exports.WebGLMesh = exports.WebGL = exports.WebGLApplication = void 0;
const mesh_object_manager_1 = require("../obj/mesh-object-manager");
const mesh_object_drawer_1 = require("../obj/mesh-object-drawer");
const webgl_environment_1 = require("./webgl-environment");
const flow_1 = require("../signals/flow");
const illegal_signal_name_exception_1 = require("../signals/exceptions/illegal-signal-name-exception");
const log_1 = require("../log/log");
const point_factory_1 = require("../geometry/point/point-factory");
const number_trio_1 = require("../types/numbers/number-trio");
const triple_1 = require("../types/triple");
const obj_texture_signal_flow_1 = require("../obj/obj-texture-signal-flow");
const ObjToLoad = Symbol("ObjToLoad");
const OnCanvasEventSym = Symbol("OnCanvasEvent");
const OnKeyboardEventSym = Symbol("OnKeyboardEvent");
const OnCanvasTouchEventSym = Symbol("OnCanvasTouchEvent");
class WebGLApplication {
    constructor(applicationName = null, environment = null) {
        log_1.Log.log("creating WebGL application [" + applicationName + "]...");
        this.applicationName = applicationName;
        if (environment != null) {
            this.environment = environment;
            log_1.Log.log(applicationName + "| using existing WebGL environment");
            this.meshObjectManager = new mesh_object_manager_1.MeshObjectManager(applicationName, this.environment);
            log_1.Log.log(applicationName + "| mesh object manager created");
            this.meshObjectDrawer = new mesh_object_drawer_1.MeshObjectDrawer(applicationName, this.environment, this.meshObjectManager);
            log_1.Log.log(applicationName + "| mesh object drawer created");
            this.camera = this.meshObjectDrawer.getCamera();
            log_1.Log.log(applicationName + "| retrieved camera");
        }
        log_1.Log.log("WebGL application [" + applicationName + "] created");
    }
    getCanvas() {
        return this.environment.getCanvas();
    }
    /**
     * Returns the mesh object manager
     * @protected
     */
    getMeshObjectManager() {
        return this.meshObjectManager;
    }
    /**
     * Returns the mesh object drawer
     * @protected
     */
    getMeshObjectDrawer() {
        return this.meshObjectDrawer;
    }
    /**
     * Returns the camera
     * @protected
     */
    getCamera() {
        return this.camera;
    }
    /**
     * Loads an object from a given url associating it to the given name
     * @param {string} name the name of the object
     * @param {string} url the url of the object
     * @return {MeshObject} the loaded object
     * @protected
     */
    loadObj(name, url) {
        log_1.Log.log(this.applicationName + " | loading object [" + name + "] from þ" + url + "]...");
        let res = this.meshObjectManager.loadObj(name, url);
        log_1.Log.log(this.applicationName + " | object [" + name + "] loaded!");
        return res;
    }
    /**
     * Returns the object associated to the given name if already loaded, otherwise returns `undefined`
     * @param {string} name the name of the object
     * @returns {MeshObject | undefined} the object associated to the given name if already loaded,
     * otherwise returns `undefined`
     * @protected
     */
    getObj(name) {
        return this.meshObjectManager.get(name);
    }
    /**
     * Draws and renders the scene into the canvas of the application
     * @protected
     */
    renderScene() {
        log_1.Log.log(this.applicationName + " | drawing scene...");
        this.meshObjectDrawer.renderScene();
        log_1.Log.log(this.applicationName + " | scene drawn!");
    }
    subscribeTo(signalName, options) {
        log_1.Log.log(this.applicationName + " | subscribing to signal [" + signalName + "]...");
        let receipt;
        if (typeof signalName === "string") {
            receipt = flow_1.default.getSubscriber(signalName).subscribe(options);
        }
        receipt = flow_1.default.getSubscriber(signalName).subscribe(options);
        log_1.Log.log(this.applicationName + " | subscribed to signal [" + signalName + "] with subscription id [" +
            receipt.subscriptionId + "]!");
        return receipt;
    }
    /**
     * Unsubscribes from a signal using the given subscription receipt.
     * @param {SubscriptionReceipt<S, D, R>} subscriptionReceipt the subscription receipt
     * @returns {SubscriptionReceipt<S, D, R>} the unsubscription receipt
     */
    unsubscribeFrom(subscriptionReceipt) {
        log_1.Log.log(this.applicationName + " | unsubscribing from signal [" + subscriptionReceipt.signalName + "] ");
        let receipt = flow_1.default
            .getSubscriber(subscriptionReceipt.signalName)
            .unsubscribe(subscriptionReceipt);
        log_1.Log.log(this.applicationName + " | unsubscribed from signal [" + subscriptionReceipt.signalName + "]!");
        return receipt;
    }
    /**
     * Creates a new custom signal with the given name, returning the flow associated to it.
     * If the signal already exists, an error is thrown.
     * @param {string} name the name of the new signal
     * @returns {SingleSignalFlow<S, D, R>} the flow associated to the new signal
     * @throws {IllegalSignalNameException} if the signal name is not valid (a signal with the same name
     * already exists)
     */
    createSignal(name) {
        log_1.Log.log(this.applicationName + " | creating signal [" + name + "]...");
        if (flow_1.default.getSignalName(name) !== undefined) {
            log_1.Log.log(this.applicationName + " | signal [" + name + "] already exists!");
            alert("Unable to crete signal [" + name + "]: already exists!");
            throw new illegal_signal_name_exception_1.IllegalSignalNameException(name, "signal already exists");
        }
        let res = flow_1.default.newSingleFlow(name);
        log_1.Log.log(this.applicationName + " | signal [" + name + "] created!");
        return res;
    }
    /**
     * Converts the global position of the mouse into the position relative to the canvas
     * @param {MouseEvent|TouchEvent} event the mouse or touch event
     */
    getPositionInCanvas(event) {
        let rect = this.getCanvas().getBoundingClientRect();
        if (event instanceof TouchEvent) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
        else if (event instanceof MouseEvent) {
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
    }
    /**
     * The `init` method that is called immediately after the instantiation of the object.
     * At this point, the object of this `WebGLApplication` is created, so it is possible
     * to use the `this` keyboard without problems, but nothing else is created (so the *objs*
     * are not loaded and the events are not registered).
     * This method can be overridden to perform some initialization before the application is initialized
     * @protected
     */
    init() { }
    /**
     * The method that is called after the creation of the WebGL context.
     * At this point, the `WebGLEnvironment`, the `MeshObjectDrawer` and the `MeshObjectLoader` are created,
     * but the objects are not loaded yet and the events are not registered
     * @protected
     */
    afterContextCreation() { }
    /**
     * The method that is called after the loading of the objects.
     * At this point, the objects are loaded, but the events are not registered
     * @protected
     */
    afterObjectsLoaded() { }
    /**
     * The method that is called after the registration of the events.
     * At this point, the events are registered, but the application is not started yet
     * @protected
     */
    afterEventsRegistered() { }
    /**
     * The method that is called before the application starts.
     * At this point, all the mesh objects are loaded, and the scene is ready to be drawn.
     * This method can be overridden to perform some initialization before the application starts
     */
    beforeStart() { }
    start(args) {
        log_1.Log.log(this.applicationName + " | starting application...");
        this.main(args);
    }
}
exports.WebGLApplication = WebGLApplication;
/**
 * Transforms an object which contains each set of shaders associated to a key (their name) into
 * the map used by the `WebGLEnvironment` class.
 * This object is the one that is needed to use the `WebGL` decorator.
 * @param {any} shaders the object containing the pointers to the shaders
 */
function mapShaders(shaders) {
    let res = new Map();
    Object.entries(shaders).forEach(([key, value]) => {
        res.set(key, value);
    });
    return res;
}
/**
 * Creates a new webgl application injecting all the required dependencies or the fields that are
 * necessary to create them.<br>
 * **The class annotated with this decorator MUST ALSO EXTEND `WebGLApplication`**.
 * Thanks to this decorator, the following fields are injected:
 * <ul>
 *     <li>the `applicationName` field</li>
 *     <li>the `WebGLEnvironment` object</li>
 *     <li>the `MeshObjectManager` object</li>
 *     <li>the `MeshObjectDrawer` object</li>
 * </ul>
 * In addition, this decorator allows to use this other decorators:
 * <ul>
 *     <li>`WebGLMesh` to specify a `MeshObject` variable in which will be loaded and injected
 *     the specified mesh object</li>
 *     <li>`OnCanvasMouseEvent`, `OnCanvasTouchEvent` and `KeyboardsEvent` to specify the methods
 *     that will be called when the specified event occurs</li>
 * </ul>
 *
 * Notice that this decorator let the system load the referred application; the step for the
 * creation are:
 * <ol>
 *     <li>the `WebGL` decorator is called</li>
 *     <li>the `WebGLApplication` object is instantiated</li>
 *     <li>the `WebGLApplication` object is added to the `window["APPLICATIONS"]` map</li>
 *     <li>the `init()` method of the instantiated object is called</li>
 *     <li>the `WebGLEnvironment`, "MeshObjectManager" and "MeshObjectDrawer" objects are created</li>
 *     <li>the `afterContextCreation()` method of the instantiated object is called</li>
 *     <li>the annotated mesh objects are loaded</li>
 *     <li>the `afterObjectsLoaded()` method of the instantiated object is called</li>
 *     <li>the annotated methods are registered as event listeners</li>
 *     <li>the `afterEventsRegistered()` method of the instantiated object is called</li>
 *     <li>the `beforeStart()` method of the instantiated object is called</li>
 *     <li>the `start()` method of the instantiated object is called</li>
 * </ol>
 * The main logic of the application should be placed in the **`main()`** method that will be
 * used from the `start()` method
 *
 * @param {string} applicationName the name of the application
 * @param {string} canvasHtmlElementName the name of the canvas html element
 * @param {string[]} webGLShaders the names of the webgl shaders
 * @param {boolean} logEnabled to enable or disable the logging (`true` by default)
 * @constructor
 */
function WebGL(applicationName, canvasHtmlElementName, webGLShaders, logEnabled = true) {
    log_1.Log.setLog(logEnabled);
    log_1.Log.log("WebGLApplicationBuilder [" + applicationName + "]\n" +
        "\tapplicationName: " + applicationName + "\n" +
        "\tcanvasHtmlElementName: " + canvasHtmlElementName + "\n" +
        "\tmain shader: [" + webGLShaders.main + "]\n" +
        "\tcolor shader: [" + webGLShaders.color + "]\n" +
        "\tlogEnabled: " + logEnabled);
    // @ts-ignore
    window["APPLICATIONS"] = window["APPLICATIONS"] || new Map();
    // @ts-ignore
    window["SIGNALS"] = window["SIGNALS"] || flow_1.default;
    return function (clazz) {
        let appSignalFlow = flow_1.default.newSingleFlow("application." + applicationName + ".started");
        try {
            let instance = new clazz();
            // @ts-ignore
            window["APPLICATIONS"].set(applicationName, instance);
            log_1.Log.log("WebGLApplicationBuilder | created instance for " + applicationName +
                " calling init() ...");
            instance.init();
            log_1.Log.log("WebGLApplicationBuilder | creating webgl environment for " + applicationName + " ...");
            let webGLEnvironment = (0, webgl_environment_1.createWebglEnvironment)(canvasHtmlElementName, mapShaders(webGLShaders));
            log_1.Log.log("WebGLApplicationBuilder | creating mesh object manager for " + applicationName + " ...");
            let meshObjectManager = new mesh_object_manager_1.MeshObjectManager(applicationName, webGLEnvironment);
            log_1.Log.log("WebGLApplicationBuilder | creating mesh object drawer for " + applicationName + " ...");
            let meshObjectDrawer = new mesh_object_drawer_1.MeshObjectDrawer(applicationName, webGLEnvironment, meshObjectManager);
            log_1.Log.log("WebGLApplicationBuilder | injecting application variables for " + applicationName + " ...");
            instance["environment"] = webGLEnvironment;
            instance["meshObjectManager"] = meshObjectManager;
            instance["meshObjectDrawer"] = meshObjectDrawer;
            instance["camera"] = meshObjectDrawer.getCamera();
            instance["applicationName"] = applicationName;
            log_1.Log.log("WebGLApplicationBuilder | calling beforeContextCreation() for " + applicationName + " ...");
            instance["afterContextCreation"]();
            obj_texture_signal_flow_1.ObjTextureSignalFlow.ensureDrawWithTextureLoaded(applicationName);
            log_1.Log.log("WebGLApplicationBuilder | loading objects for " + applicationName + " ...");
            for (let objToLoad of clazz.prototype[ObjToLoad]) {
                let continuation = objToLoad[1];
                log_1.Log.log("WebGLApplicationBuilder | loading object [" + continuation.name + "] for " + applicationName + " ...");
                let obj = meshObjectManager.loadObj(continuation.name, continuation.path);
                if (continuation.position != null) {
                    obj.setPosition(continuation.position);
                }
                if (continuation.rotation != null) {
                    obj.setPolarRotation(continuation.rotation.getFirst(), continuation.rotation.getSecond(), continuation.rotation.getThird());
                }
                if (continuation.scale != null) {
                    obj.setScale(continuation.scale);
                }
                if (continuation.limitsChecker != null) {
                    obj.setLimitsChecker(continuation.limitsChecker);
                }
                instance[continuation.propertyKey] = obj;
                log_1.Log.log("WebGLApplicationBuilder | object [" + continuation.name + "] loaded for " + applicationName +
                    " into property [" + continuation.propertyKey + "]!");
            }
            log_1.Log.log("WebGLApplicationBuilder | objects loaded for " + applicationName +
                ", calling afterObjectsLoaded() ...");
            instance["afterObjectsLoaded"]();
            // Attach canvas mouse events
            const onCanvasMouseEventMethods = clazz.prototype[OnCanvasEventSym];
            if (onCanvasMouseEventMethods != undefined) {
                onCanvasMouseEventMethods.forEach((event, method) => {
                    log_1.Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...");
                    // webGLEnvironment.getCanvas().addEventListener(event, (e: MouseEvent) => {
                    //     instance[method](e)
                    // }, false)
                    attachMouseEventListenerOnCanvas(webGLEnvironment.getCanvas(), event, (e) => { instance[method](e); });
                });
            }
            // Attach keyboard events
            const onKeyboardEventMethods = clazz.prototype[OnKeyboardEventSym];
            if (onKeyboardEventMethods != undefined) {
                onKeyboardEventMethods.forEach((event, method) => {
                    log_1.Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...");
                    document.addEventListener(event, (e) => {
                        instance[method](e);
                    });
                });
            }
            // Attaching canvas touch events
            const onCanvasTouchEventMethods = clazz.prototype[OnCanvasTouchEventSym];
            if (onCanvasTouchEventMethods != undefined) {
                onCanvasTouchEventMethods.forEach((event, method) => {
                    log_1.Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...");
                    document.addEventListener(event, (e) => {
                        instance[method](e);
                    }, false);
                });
            }
            log_1.Log.log("WebGLApplicationBuilder | events attached for " + applicationName +
                ", calling afterEventsAttached() ...");
            instance["afterEventsRegistered"]();
            log_1.Log.log("WebGLApplicationBuilder | initializing application " + applicationName + " ...");
            instance.beforeStart();
            log_1.Log.log("WebGLApplicationBuilder | starting application " + applicationName + " ...");
            //CameraControls.init(instance)
            appSignalFlow.fire(instance, "STARTED");
            instance.start();
        }
        catch (e) {
            alert(e);
            throw e;
        }
    };
}
exports.WebGL = WebGL;
function attachMouseEventListenerOnCanvas(canvas, eventName, listener) {
    switch (eventName) {
        case "mousedown":
            canvas.onmousedown = listener;
            break;
        case "mouseup":
            canvas.onmouseup = listener;
            break;
        case "mousemove":
            canvas.onmousemove = listener;
            break;
        case "mouseover":
            canvas.onmouseover = listener;
            break;
        case "mouseout":
            canvas.onmouseout = listener;
            break;
        case "mouseenter":
            canvas.onmouseenter = listener;
            break;
        case "mouseleave":
            canvas.onmouseleave = listener;
            break;
        case "wheel":
            canvas.onwheel = listener;
            break;
        case "contextmenu":
            canvas.oncontextmenu = listener;
            break;
        default: log_1.Log.logError("WebGLApplicationBuilder | unknown event [" + eventName + "]!");
    }
}
class ObjInitializationContinuation {
    constructor() {
        this.propertyKey = null;
        this.name = null;
        this.path = null;
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.limitsChecker = null;
    }
}
function getOrCreateObjInitializationContinuation(target, propertyKey) {
    target[ObjToLoad] = target[ObjToLoad] || new Map();
    let objInitializationContinuation = target[ObjToLoad].get(propertyKey);
    if (objInitializationContinuation == undefined) {
        objInitializationContinuation = new ObjInitializationContinuation();
        objInitializationContinuation.propertyKey = propertyKey;
        target[ObjToLoad].set(propertyKey, objInitializationContinuation);
    }
    return objInitializationContinuation;
}
/**
 * Annotates a field to be loaded as a webgl mesh
 * @param {string} url the url of the mesh
 * @param {string} name the name of the field (optional, if absent the name of the field is used)
 * @param {Point3D} position the position of the mesh (optional, if absent the mesh is not translated)
 * @param {Couple<Angle>} rotation the rotation of the mesh (optional, if absent the mesh is not rotated)
 * @param {NumberTrio} scale the scale of the mesh (optional, if absent the mesh is not scaled)
 * @param {LimitsChecker} limitsChecker the limits checker of the mesh (optional, if absent the mesh is not limited)
 * @constructor
 */
function WebGLMesh(url, name = null, position = null, rotation = null, scale = null, limitsChecker = null) {
    return function (target, propertyKey) {
        if (name == null) {
            name = propertyKey;
        }
        let continuation = getOrCreateObjInitializationContinuation(target, propertyKey);
        continuation.path = url;
        continuation.name = name;
        if (position != null)
            continuation.position = position;
        if (rotation != null)
            continuation.rotation = rotation;
        if (scale != null)
            continuation.scale = scale;
        if (limitsChecker != null)
            continuation.limitsChecker = limitsChecker;
    };
}
exports.WebGLMesh = WebGLMesh;
/**
 * A decorator to attach a **mouse** event on a canvas to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication** and will be associated
 * with the canvas of the application. So, when the event is fired, the method annotated with this decorator
 * will be called.<br>
 * **The method must have a single parameter of type `MouseEvent`**
 * @param {string} eventName the name of the mouse event
 * @constructor
 */
function OnCanvasMouseEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnCanvasMouseEvent " + eventName + " on " + propertyKey);
        target[OnCanvasEventSym] = target[OnCanvasEventSym] || new Map();
        target[OnCanvasEventSym].set(propertyKey, eventName);
    };
}
exports.OnCanvasMouseEvent = OnCanvasMouseEvent;
/**
 * A decorator to attach a **keyboard** event o to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication**.
 * So, when the event is fired, the method annotated with this decorator will be called.<br>
 * **The method must have a single parameter of type `KeyboardEvent`**
 * @param {string} eventName the name of the keyboard event
 * @constructor
 */
function OnKeyboardEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey);
        target[OnKeyboardEventSym] = target[OnKeyboardEventSym] || new Map();
        target[OnKeyboardEventSym].set(propertyKey, eventName);
    };
}
exports.OnKeyboardEvent = OnKeyboardEvent;
/**
 * A decorator to attach a **touch** event on a canvas to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication** and will be associated
 * with the canvas of the application. So, when the event is fired, the method annotated with this decorator
 * will be called.<br>
 * **The method must have a single parameter of type `TouchEvent`**
 * @param {string} eventName the name of the touch event
 * @constructor
 */
function OnCanvasTouchEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey);
        target[OnCanvasTouchEventSym] = target[OnCanvasTouchEventSym] || new Map();
        target[OnCanvasTouchEventSym].set(propertyKey, eventName);
    };
}
exports.OnCanvasTouchEvent = OnCanvasTouchEvent;
/**
 * Sets the position the mesh object will have when loaded.
 * This decorator
 * @param {number} x the x coordinate of the position
 * @param {number} y the y coordinate of the position
 * @param {number} z the z coordinate of the position
 * @constructor
 */
function ObjPosition(x, y, z) {
    return function (target, propertyKey) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .position = (0, point_factory_1.point3D)(x, y, z);
    };
}
exports.ObjPosition = ObjPosition;
/**
 * Sets the scale the mesh object will have when loaded
 * @param {number} psi the psi angle of the rotation (around the `x` axis)
 * @param {number} theta the theta angle of the rotation (around the `y` axis)
 * @param {number} phi the phi angle of the rotation (around the `z` axis)
 * @constructor
 */
function ObjRotation(psi, theta, phi) {
    return function (target, propertyKey) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .rotation = (0, triple_1.trioOf)(psi, theta, phi);
    };
}
exports.ObjRotation = ObjRotation;
/**
 * Sets the scale the mesh object will have when loaded
 * @param {number} x the scale of the x coordinate
 * @param {number} y the scale of the y coordinate
 * @param {number} z the scale of the z coordinate
 * @constructor
 */
function ObjScale(x, y, z) {
    return function (target, propertyKey) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .scale = (0, number_trio_1.numberTrio)(x, y, z);
    };
}
exports.ObjScale = ObjScale;
/**
 * Sets the limits checker the mesh object will have when loaded
 * @param {LimitsChecker} limitsChecker the limits checker
 * @constructor
 */
function ObjLimitsChecker(limitsChecker) {
    return function (target, propertyKey) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .limitsChecker = limitsChecker;
    };
}
exports.ObjLimitsChecker = ObjLimitsChecker;
//# sourceMappingURL=webgl-application.js.map