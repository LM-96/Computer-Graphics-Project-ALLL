"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _ObjTextureSignalFlow_appToReDrawWithTextureLoaded, _ObjTextureSignalFlow_globalTextureLoadedReceipt, _ObjTextureSignalFlow_globalTextureLoadedHandler, _ObjTextureSignalFlow_flow, _ObjTextureSignalFlow_createTextureFlow;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjTextureSignalFlow = void 0;
const flow_1 = require("../signals/flow");
const pair_1 = require("../types/pair");
const options_1 = require("../signals/options");
class ObjTextureSignalFlow {
    static ensureDrawWithTextureLoaded(appName) {
        if (__classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_globalTextureLoadedReceipt) == null) {
            __classPrivateFieldSet(this, _a, (signal) => {
                __classPrivateFieldGet(ObjTextureSignalFlow, _a, "f", _ObjTextureSignalFlow_appToReDrawWithTextureLoaded).forEach((appName) => {
                    // @ts-ignore
                    window["APPLICATIONS"].get(appName).renderScene();
                });
            }, "f", _ObjTextureSignalFlow_globalTextureLoadedHandler);
            __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_flow).subscribe((0, options_1.handler)(__classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_globalTextureLoadedHandler))), "f", _ObjTextureSignalFlow_globalTextureLoadedReceipt);
        }
        if (__classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_appToReDrawWithTextureLoaded).indexOf(appName) < 0) {
            __classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_appToReDrawWithTextureLoaded).push(appName);
        }
    }
    static getTextureSubscriber() {
        return __classPrivateFieldGet(this, _a, "f", _ObjTextureSignalFlow_flow);
    }
}
exports.ObjTextureSignalFlow = ObjTextureSignalFlow;
_a = ObjTextureSignalFlow, _ObjTextureSignalFlow_createTextureFlow = function _ObjTextureSignalFlow_createTextureFlow() {
    let res = flow_1.default.newSingleFlow(this.LOADED_TEXTURE_SIGNAL_STRING_NAME);
    ON_TEXTURE_READY = (name, path) => {
        res.fire(undefined, (0, pair_1.pairOf)(name, path));
    };
    return res;
};
ObjTextureSignalFlow.LOADED_TEXTURE_SIGNAL_STRING_NAME = "loadobjx.loaded-texture";
_ObjTextureSignalFlow_appToReDrawWithTextureLoaded = { value: [] };
_ObjTextureSignalFlow_globalTextureLoadedReceipt = { value: null };
_ObjTextureSignalFlow_globalTextureLoadedHandler = { value: null };
_ObjTextureSignalFlow_flow = { value: __classPrivateFieldGet(_a, _a, "m", _ObjTextureSignalFlow_createTextureFlow).call(_a) };
//# sourceMappingURL=obj-texture-signal-flow.js.map