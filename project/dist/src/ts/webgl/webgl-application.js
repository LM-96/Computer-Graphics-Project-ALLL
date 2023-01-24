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
     * Draws the scene
     * @protected
     */
    drawScene() {
        log_1.Log.log(this.applicationName + " | drawing scene...");
        this.meshObjectDrawer.drawScene();
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
     * The method that is called before the application starts.
     * At the points all the mesh objects are loaded and the scene is ready to be drawn
     */
    beforeStart() {
    }
    start(args) {
        log_1.Log.log(this.applicationName + " | starting application...");
        this.main(args);
    }
}
exports.WebGLApplication = WebGLApplication;
function mapShaders(shaders) {
    let res = new Map();
    Object.entries(shaders).forEach(([key, value]) => {
        res.set(key, value);
    });
    return res;
}
/**
 * Creates a new webgl application injecting all the required dependencies or the fields that are
 * necessary to create them
 * @param {string} applicationName the name of the application
 * @param {string} canvasHtmlElementName the name of the canvas html element
 * @param {string[]} webGLShaders the names of the webgl shaders
 * @constructor
 */
function WebGL(applicationName, canvasHtmlElementName, webGLShaders) {
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
            log_1.Log.log("creating webgl environment for " + applicationName + " ...");
            let webGLEnvironment = (0, webgl_environment_1.createWebglEnvironment)(canvasHtmlElementName, mapShaders(webGLShaders));
            log_1.Log.log("creating mesh object manager for " + applicationName + " ...");
            let meshObjectManager = new mesh_object_manager_1.MeshObjectManager(applicationName, webGLEnvironment);
            log_1.Log.log("creating mesh object drawer for " + applicationName + " ...");
            let meshObjectDrawer = new mesh_object_drawer_1.MeshObjectDrawer(applicationName, webGLEnvironment, meshObjectManager);
            log_1.Log.log("injecting application variables for " + applicationName + " ...");
            instance["environment"] = webGLEnvironment;
            instance["meshObjectManager"] = meshObjectManager;
            instance["meshObjectDrawer"] = meshObjectDrawer;
            instance["camera"] = meshObjectDrawer.getCamera();
            instance["applicationName"] = applicationName;
            // Loading mesh objects
            log_1.Log.log("loading objects for " + applicationName + " ...");
            for (let objToLoad of clazz.prototype[ObjToLoad]) {
                let continuation = objToLoad[1];
                log_1.Log.log("loading object [" + continuation.name + "] for " + applicationName + " ...");
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
                log_1.Log.log("object [" + continuation.name + "] loaded for " + applicationName +
                    " into property [" + continuation.propertyKey + "]!");
            }
            // Attach canvas mouse events
            const onCanvasMouseEventMethods = clazz.prototype[OnCanvasEventSym];
            if (onCanvasMouseEventMethods != undefined) {
                onCanvasMouseEventMethods.forEach((event, method) => {
                    log_1.Log.log("subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...");
                    webGLEnvironment.getCanvas().addEventListener(event, (e) => {
                        instance[method](e);
                    });
                });
            }
            // Attach keyboard events
            const onKeyboardEventMethods = clazz.prototype[OnKeyboardEventSym];
            if (onKeyboardEventMethods != undefined) {
                onKeyboardEventMethods.forEach((event, method) => {
                    log_1.Log.log("subscribing to event [" + event + "] for " + applicationName +
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
                    log_1.Log.log("subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...");
                    document.addEventListener(event, (e) => {
                        instance[method](e);
                    }, false);
                });
            }
            log_1.Log.log("initializing application " + applicationName + " ...");
            instance.beforeStart();
            log_1.Log.log("starting application " + applicationName + " ...");
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
function OnCanvasMouseEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnCanvasMouseEvent " + eventName + " on " + propertyKey);
        target[OnCanvasEventSym] = target[OnCanvasEventSym] || new Map();
        target[OnCanvasEventSym].set(propertyKey, eventName);
    };
}
exports.OnCanvasMouseEvent = OnCanvasMouseEvent;
function OnKeyboardEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey);
        target[OnKeyboardEventSym] = target[OnKeyboardEventSym] || new Map();
        target[OnKeyboardEventSym].set(propertyKey, eventName);
    };
}
exports.OnKeyboardEvent = OnKeyboardEvent;
function OnCanvasTouchEvent(eventName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey);
        target[OnCanvasTouchEventSym] = target[OnCanvasTouchEventSym] || new Map();
        target[OnCanvasTouchEventSym].set(propertyKey, eventName);
    };
}
exports.OnCanvasTouchEvent = OnCanvasTouchEvent;
/**
 * Sets the position the mesh object will have when loaded
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