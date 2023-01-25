import {MeshObjectManager} from "../obj/mesh-object-manager";
import {MeshObjectDrawer} from "../obj/mesh-object-drawer";
import {createWebglEnvironment, WebGLEnvironment} from "./webgl-environment";
import {Camera} from "../camera/camera";
import {SubscriptionReceipt} from "../signals/subscriptions";
import {handler, SubscriptionOptions} from "../signals/options";
import {SignalName} from "../signals/signal";
import SignalFlows, {SingleSignalFlow} from "../signals/flow";
import {MeshObject} from "../obj/mesh-object";
import {IllegalSignalNameException} from "../signals/exceptions/illegal-signal-name-exception";
import {SubscriptionNotAcceptedException} from "../signals/exceptions/subscription-not-accepted-exception";
import {Log} from "../log/log";
import {Point3D} from "../geometry/point/point-3d";
import {point3D} from "../geometry/point/point-factory";
import {Couple} from "../types/pair";
import {Angle} from "../geometry/angle/angle";
import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {LimitsChecker} from "../geometry/limits/limits-checker";
import {Trio, trioOf} from "../types/triple";
import {ObjTextureSignalFlow} from "../obj/obj-texture-signal-flow";

const ObjToLoad = Symbol("ObjToLoad")
const OnCanvasEventSym = Symbol("OnCanvasEvent")
const OnKeyboardEventSym = Symbol("OnKeyboardEvent")
const OnCanvasTouchEventSym = Symbol("OnCanvasTouchEvent")

export abstract class WebGLApplication {
    protected abstract main(args: string[]): void

    readonly applicationName: string
    private readonly meshObjectManager: MeshObjectManager
    private readonly meshObjectDrawer: MeshObjectDrawer
    private readonly environment: WebGLEnvironment
    private readonly camera: Camera

    protected constructor(applicationName: string | null = null,
                          environment: WebGLEnvironment | null = null) {
        Log.log("creating WebGL application [" + applicationName + "]...")
        this.applicationName = applicationName

        if(environment != null) {
            this.environment = environment
            Log.log(applicationName + "| using existing WebGL environment")

            this.meshObjectManager = new MeshObjectManager(applicationName, this.environment)
            Log.log(applicationName + "| mesh object manager created")

            this.meshObjectDrawer = new MeshObjectDrawer(applicationName, this.environment, this.meshObjectManager)
            Log.log(applicationName + "| mesh object drawer created")

            this.camera = this.meshObjectDrawer.getCamera()
            Log.log(applicationName + "| retrieved camera")
        }

        Log.log("WebGL application [" + applicationName + "] created")

    }

    getCanvas(): HTMLCanvasElement {
        return this.environment.getCanvas()
    }

    /**
     * Returns the mesh object manager
     * @protected
     */
    getMeshObjectManager(): MeshObjectManager {
        return this.meshObjectManager
    }

    /**
     * Returns the mesh object drawer
     * @protected
     */
    getMeshObjectDrawer(): MeshObjectDrawer {
        return this.meshObjectDrawer
    }

    /**
     * Returns the camera
     * @protected
     */
    getCamera(): Camera {
        return this.camera
    }

    /**
     * Loads an object from a given url associating it to the given name
     * @param {string} name the name of the object
     * @param {string} url the url of the object
     * @return {MeshObject} the loaded object
     * @protected
     */
    loadObj(name: string, url: string): MeshObject {
        Log.log(this.applicationName + " | loading object [" + name + "] from þ" + url + "]...")
        let res: MeshObject = this.meshObjectManager.loadObj(name, url)
        Log.log(this.applicationName + " | object [" + name + "] loaded!")
        return res
    }

    /**
     * Returns the object associated to the given name if already loaded, otherwise returns `undefined`
     * @param {string} name the name of the object
     * @returns {MeshObject | undefined} the object associated to the given name if already loaded,
     * otherwise returns `undefined`
     * @protected
     */
    getObj(name: string): MeshObject | undefined {
        return this.meshObjectManager.get(name)
    }

    /**
     * Draws and renders the scene into the canvas of the application
     * @protected
     */
    renderScene() {
        Log.log(this.applicationName + " | drawing scene...")
        this.meshObjectDrawer.renderScene()
        Log.log(this.applicationName + " | scene drawn!")
    }

    /**
     * Subscribes to a signal using the given options into the global signal system.
     * If the signal does not exist or the options are invalid, an error is thrown.
     * @param {string} signalName the name of the signal
     * @param {SubscriptionOptions<S, D, R>} options the options
     * @returns {SubscriptionReceipt<S, D, R>} the subscription receipt
     * @throws {IllegalSignalNameException} if the signal name is not valid
     * @throws {SubscriptionNotAcceptedException} if the subscription is not accepted
     */
    subscribeTo<S, D, R>(signalName: string, options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R>
    /**
     * Subscribes to a signal using the given options into the global signal system.
     * If the signal does not exist or the options are invalid, an error is thrown.
     * @param {SignalName} signalName the name of the signal
     * @param {SubscriptionOptions<S, D, R>} options the options
     * @returns {SubscriptionReceipt<S, D, R>} the subscription receipt
     * @throws {IllegalSignalNameException} if the signal name is not valid
     * @throws {SubscriptionNotAcceptedException} if the subscription is not accepted
     */
    subscribeTo<S, D, R>(signalName: SignalName, options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R>
    subscribeTo<S, D, R>(signalName: string | SignalName, options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R> {
        Log.log(this.applicationName + " | subscribing to signal [" + signalName + "]...")
        let receipt: SubscriptionReceipt<S, D, R>
        if (typeof signalName === "string") {
            receipt = SignalFlows.getSubscriber(signalName).subscribe(options)
        }
        receipt = SignalFlows.getSubscriber(signalName as SignalName).subscribe(options)
        Log.log(this.applicationName + " | subscribed to signal [" + signalName + "] with subscription id [" +
            receipt.subscriptionId + "]!")
        return receipt
    }

    /**
     * Unsubscribes from a signal using the given subscription receipt.
     * @param {SubscriptionReceipt<S, D, R>} subscriptionReceipt the subscription receipt
     * @returns {SubscriptionReceipt<S, D, R>} the unsubscription receipt
     */
    unsubscribeFrom<S, D, R>(subscriptionReceipt: SubscriptionReceipt<S, D, R>): SubscriptionReceipt<S, D, R> {
        Log.log(this.applicationName + " | unsubscribing from signal [" + subscriptionReceipt.signalName + "] ")
        let receipt: SubscriptionReceipt<S, D, R> = SignalFlows
            .getSubscriber(subscriptionReceipt.signalName)
            .unsubscribe(subscriptionReceipt)
        Log.log(this.applicationName + " | unsubscribed from signal [" + subscriptionReceipt.signalName + "]!")
        return receipt
    }

    /**
     * Creates a new custom signal with the given name, returning the flow associated to it.
     * If the signal already exists, an error is thrown.
     * @param {string} name the name of the new signal
     * @returns {SingleSignalFlow<S, D, R>} the flow associated to the new signal
     * @throws {IllegalSignalNameException} if the signal name is not valid (a signal with the same name
     * already exists)
     */
    createSignal<S, D, R>(name: string): SingleSignalFlow<S, D, R> {
        Log.log(this.applicationName + " | creating signal [" + name + "]...")
        if(SignalFlows.getSignalName(name) !== undefined) {
            Log.log(this.applicationName + " | signal [" + name + "] already exists!")
            alert("Unable to crete signal [" + name + "]: already exists!")
            throw new IllegalSignalNameException(name, "signal already exists")
        }
        let res: SingleSignalFlow<S, D, R> = SignalFlows.newSingleFlow<S, D, R>(name)
        Log.log(this.applicationName + " | signal [" + name + "] created!")
        return res
    }

    /**
     * Converts the global position of the mouse into the position relative to the canvas
     * @param {MouseEvent|TouchEvent} event the mouse or touch event
     */
    getPositionInCanvas(event: MouseEvent|TouchEvent): {x: number, y: number} {
        let rect = this.getCanvas().getBoundingClientRect();
        if(event instanceof TouchEvent) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        } else if(event instanceof MouseEvent) {
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
    protected init() {}

    /**
     * The method that is called before the application starts.
     * At this point, all the mesh objects are loaded, and the scene is ready to be drawn.
     * This method can be overridden to perform some initialization before the application starts
     */
    protected beforeStart() {}

    start(args: string[]) {
        Log.log(this.applicationName + " | starting application...")
        this.main(args)
    }
}

export interface WebGLShaderReference {
    /**
     * The `vertex-shader` and the `fragment-shader` of the main program
     */
    readonly main: string[]

    /**
     * The `vertex-shader` and the `fragment-shader` of the color process
     */
    readonly color: string[]
}

/**
 * Transforms an object which contains each set of shaders associated to a key (their name) into
 * the map used by the `WebGLEnvironment` class.
 * This object is the one that is needed to use the `WebGL` decorator.
 * @param {any} shaders the object containing the pointers to the shaders
 */
function mapShaders(shaders: any): Map<string, string[]> {
    let res = new Map<string, string[]>()
    Object.entries(shaders).forEach(([key, value]) => {
        res.set(key, value as string[])
    })
    return res
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
 *     <li>the annotated mesh objects are loaded</li>
 *     <li>the annotated methods are registered as event listeners</li>
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
export function WebGL(applicationName: string,
                      canvasHtmlElementName: string,
                      webGLShaders: WebGLShaderReference,
                      logEnabled: boolean = true) {

    Log.setLog(logEnabled)
    Log.log(
        "WebGLApplicationBuilder [" + applicationName + "]\n" +
        "\tapplicationName: " + applicationName + "\n" +
        "\tcanvasHtmlElementName: " + canvasHtmlElementName + "\n" +
        "\tmain shader: [" + webGLShaders.main + "]\n" +
        "\tcolor shader: [" + webGLShaders.color + "]\n" +
        "\tlogEnabled: " + logEnabled
    )

    // @ts-ignore
    window["APPLICATIONS"] = window["APPLICATIONS"] || new Map<string, WebGLApplication>()
    // @ts-ignore
    window["SIGNALS"] = window["SIGNALS"] || SignalFlows

    return function <T extends { new (...args: any[]): {} }> (clazz: T) {
        let appSignalFlow = SignalFlows.newSingleFlow<WebGLApplication, string, void>(
            "application." + applicationName + ".started")
        try {
            let instance: any = new clazz()
            // @ts-ignore
            window["APPLICATIONS"].set(applicationName, instance)

            Log.log("WebGLApplicationBuilder | created instance for " + applicationName +
                " calling init() ...")
            instance.init()

            Log.log("WebGLApplicationBuilder | creating webgl environment for " + applicationName + " ...")
            let webGLEnvironment: WebGLEnvironment =
                createWebglEnvironment(canvasHtmlElementName, mapShaders(webGLShaders))

            Log.log("WebGLApplicationBuilder | creating mesh object manager for " + applicationName + " ...")
            let meshObjectManager: MeshObjectManager = new MeshObjectManager(applicationName, webGLEnvironment)

            Log.log("WebGLApplicationBuilder | creating mesh object drawer for " + applicationName + " ...")
            let meshObjectDrawer: MeshObjectDrawer = new MeshObjectDrawer(applicationName, webGLEnvironment, meshObjectManager)

            Log.log("WebGLApplicationBuilder | injecting application variables for " + applicationName + " ...")
            instance["environment"] = webGLEnvironment
            instance["meshObjectManager"] = meshObjectManager
            instance["meshObjectDrawer"] = meshObjectDrawer
            instance["camera"] = meshObjectDrawer.getCamera()
            instance["applicationName"] = applicationName

            ObjTextureSignalFlow.ensureDrawWithTextureLoaded(applicationName)

            Log.log("WebGLApplicationBuilder | loading objects for " + applicationName + " ...")
            for(let objToLoad of clazz.prototype[ObjToLoad]) {
                let continuation: ObjInitializationContinuation = objToLoad[1]
                Log.log("WebGLApplicationBuilder | loading object [" + continuation.name + "] for " + applicationName + " ...")

                let obj: MeshObject = meshObjectManager.loadObj(continuation.name, continuation.path)
                if(continuation.position != null) {
                    obj.setPosition(continuation.position)
                }
                if(continuation.rotation != null) {
                    obj.setPolarRotation(continuation.rotation.getFirst(),
                        continuation.rotation.getSecond(), continuation.rotation.getThird())
                }
                if(continuation.scale != null) {
                    obj.setScale(continuation.scale)
                }
                if(continuation.limitsChecker != null) {
                    obj.setLimitsChecker(continuation.limitsChecker)
                }
                instance[continuation.propertyKey] = obj
                Log.log("WebGLApplicationBuilder | object [" + continuation.name + "] loaded for " + applicationName +
                    " into property [" + continuation.propertyKey + "]!")
            }

            // Attach canvas mouse events
            const onCanvasMouseEventMethods = clazz.prototype[OnCanvasEventSym]
            if(onCanvasMouseEventMethods != undefined) {
                onCanvasMouseEventMethods.forEach((event: string, method: string) => {
                    Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...")
                    webGLEnvironment.getCanvas().addEventListener(event, (e: MouseEvent) => {
                        instance[method](e)
                    })
                })
            }

            // Attach keyboard events
            const onKeyboardEventMethods = clazz.prototype[OnKeyboardEventSym]
            if(onKeyboardEventMethods != undefined) {
                onKeyboardEventMethods.forEach((event: string, method: string) => {
                    Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...")
                    document.addEventListener(event, (e: KeyboardEvent) => {
                        instance[method](e)
                    })
                })
            }

            // Attaching canvas touch events
            const onCanvasTouchEventMethods = clazz.prototype[OnCanvasTouchEventSym]
            if(onCanvasTouchEventMethods != undefined) {
                onCanvasTouchEventMethods.forEach((event: string, method: string) => {
                    Log.log("WebGLApplicationBuilder | subscribing to event [" + event + "] for " + applicationName +
                        " with method [" + method + "] ...")
                    document.addEventListener(event, (e: TouchEvent) => {
                        instance[method](e)
                    }, false)
                })
            }

            Log.log("WebGLApplicationBuilder | initializing application " + applicationName + " ...")
            instance.beforeStart()

            Log.log("WebGLApplicationBuilder | starting application " + applicationName + " ...")
            //CameraControls.init(instance)
            appSignalFlow.fire(instance, "STARTED")
            instance.start()
        } catch (e) {
            alert(e)
            throw e
        }
    }
}

class ObjInitializationContinuation {
    propertyKey: string|null = null
    name: string|null = null
    path: string|null = null
    position: Point3D|null = null
    rotation: Trio<Angle>|null = null
    scale: NumberTrio|null = null
    limitsChecker: LimitsChecker|null = null
}

function getOrCreateObjInitializationContinuation(target: any, propertyKey: string): ObjInitializationContinuation {
    target[ObjToLoad] = target[ObjToLoad] || new Map<string, ObjInitializationContinuation>()
    let objInitializationContinuation: ObjInitializationContinuation = target[ObjToLoad].get(propertyKey)
    if(objInitializationContinuation == undefined) {
        objInitializationContinuation = new ObjInitializationContinuation()
        objInitializationContinuation.propertyKey = propertyKey
        target[ObjToLoad].set(propertyKey, objInitializationContinuation)
    }
    return objInitializationContinuation
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
export function WebGLMesh(url: string, name: string|null = null,
                          position: Point3D|null = null,
                          rotation: Trio<Angle>|null = null,
                          scale: NumberTrio|null = null,
                          limitsChecker: LimitsChecker|null = null
                          ) {
    return function (target: any, propertyKey: string) {
        if(name == null) {
            name = propertyKey
        }
        let continuation: ObjInitializationContinuation =
            getOrCreateObjInitializationContinuation(target, propertyKey)
        continuation.path = url
        continuation.name = name
        if(position != null) continuation.position = position
        if(rotation != null) continuation.rotation = rotation
        if(scale != null) continuation.scale = scale
        if(limitsChecker != null) continuation.limitsChecker = limitsChecker
    }
}

/**
 * A decorator to attach a **mouse** event on a canvas to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication** and will be associated
 * with the canvas of the application. So, when the event is fired, the method annotated with this decorator
 * will be called.<br>
 * **The method must have a single parameter of type `MouseEvent`**
 * @param {string} eventName the name of the mouse event
 * @constructor
 */
export function OnCanvasMouseEvent<S, D, R>(eventName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Log.log("OnCanvasMouseEvent " + eventName + " on " + propertyKey)
        target[OnCanvasEventSym] = target[OnCanvasEventSym] || new Map<string, string>()
        target[OnCanvasEventSym].set(propertyKey, eventName)
    }
}

/**
 * A decorator to attach a **keyboard** event o to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication**.
 * So, when the event is fired, the method annotated with this decorator will be called.<br>
 * **The method must have a single parameter of type `KeyboardEvent`**
 * @param {string} eventName the name of the keyboard event
 * @constructor
 */
export function OnKeyboardEvent<S, D, R>(eventName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey)
        target[OnKeyboardEventSym] = target[OnKeyboardEventSym] || new Map<string, string>()
        target[OnKeyboardEventSym].set(propertyKey, eventName)
    }
}

/**
 * A decorator to attach a **touch** event on a canvas to a method.
 * This decorator **works only if the class is annotated with @WebGLApplication** and will be associated
 * with the canvas of the application. So, when the event is fired, the method annotated with this decorator
 * will be called.<br>
 * **The method must have a single parameter of type `TouchEvent`**
 * @param {string} eventName the name of the touch event
 * @constructor
 */
export function OnCanvasTouchEvent<S, D, R>(eventName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Log.log("OnKeyboardEvent " + eventName + " on " + propertyKey)
        target[OnCanvasTouchEventSym] = target[OnCanvasTouchEventSym] || new Map<string, string>()
        target[OnCanvasTouchEventSym].set(propertyKey, eventName)
    }
}


/**
 * Sets the position the mesh object will have when loaded.
 * This decorator
 * @param {number} x the x coordinate of the position
 * @param {number} y the y coordinate of the position
 * @param {number} z the z coordinate of the position
 * @constructor
 */
export function ObjPosition(x: number, y: number, z: number) {
    return function (target: any, propertyKey: string) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .position = point3D(x, y, z)
    }
}

/**
 * Sets the scale the mesh object will have when loaded
 * @param {number} psi the psi angle of the rotation (around the `x` axis)
 * @param {number} theta the theta angle of the rotation (around the `y` axis)
 * @param {number} phi the phi angle of the rotation (around the `z` axis)
 * @constructor
 */
export function ObjRotation(psi: Angle, theta: Angle, phi: Angle) {
    return function (target: any, propertyKey: string) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .rotation = trioOf(psi, theta, phi)
    }
}

/**
 * Sets the scale the mesh object will have when loaded
 * @param {number} x the scale of the x coordinate
 * @param {number} y the scale of the y coordinate
 * @param {number} z the scale of the z coordinate
 * @constructor
 */
export function ObjScale(x: number, y: number, z: number) {
    return function (target: any, propertyKey: string) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .scale = numberTrio(x, y, z)
    }
}

/**
 * Sets the limits checker the mesh object will have when loaded
 * @param {LimitsChecker} limitsChecker the limits checker
 * @constructor
 */
export function ObjLimitsChecker(limitsChecker: LimitsChecker) {
    return function (target: any, propertyKey: string) {
        getOrCreateObjInitializationContinuation(target, propertyKey)
            .limitsChecker = limitsChecker
    }
}

