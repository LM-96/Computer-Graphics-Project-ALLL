import {MeshObject} from "./mesh-object";
import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {LimitsCheckers} from "../geometry/limits/limits-checkers";
import {Point3D} from "../geometry/point/point-3d";
import {SingleSignalSubscriber} from "../signals/subscriptions";
import {MeshData} from "./load-mesh-wrapper";
import {Couple, coupleOf} from "../types/pair";
import {angle, Angle, AngleUnit} from "../geometry/angle/angle";
import {LimitsChecker} from "../geometry/limits/limits-checker";
import SignalFlows, {SingleSignalFlow} from "../signals/flow";
import PerformedTranslation, {PerformedTranslationBuilder} from "../geometry/data/performed-translation";
import {PerformedPolarRotation, PerformedPolarRotationBuilder} from "../geometry/data/performed-polar-rotation";
import {mutablePoint3D} from "../geometry/point/point-factory";
import PerformedScale, {PerformedScaleBuilder} from "../geometry/data/performed-scale";
import {MeshObjectSignals} from "./mesh-object-signals";
import {Log} from "../log/log";
import {Trio, trioOf} from "../types/triple";

export class FlowedMeshObject implements MeshObject {

  readonly #name: string;
  #data: any;
  #position: Point3D;
  #polarRotation: Trio<Angle>
  #scale: NumberTrio
  #limitChecker: LimitsChecker

  #hidden: boolean

  readonly #translationFlow: SingleSignalFlow<MeshObject, PerformedTranslation, void>
  readonly #polarRotationFlow: SingleSignalFlow<MeshObject, PerformedPolarRotation, void>
  readonly #scaleFlow: SingleSignalFlow<MeshObject, PerformedScale, void>
  #performedTranslationBuilder: PerformedTranslationBuilder
  #performedPolarRotationBuilder: PerformedPolarRotationBuilder
  #performedScaleBuilder: PerformedScaleBuilder

  constructor(name: string, data: any) {
    this.#name = name;
    this.#data = data;
    this.#position = mutablePoint3D(0, 0, 0);
    this.#polarRotation = trioOf(angle(0), angle(0), angle(0));
    this.#scale = numberTrio(1, 1, 1);
    this.#limitChecker = LimitsCheckers.unlimited();
    this.#hidden = false

    this.#translationFlow = SignalFlows.newSingleFlow(MeshObjectSignals.translationSignalNameOf(name))
    this.#polarRotationFlow = SignalFlows.newSingleFlow(MeshObjectSignals.polarRotationSignalNameOf(name))
    this.#scaleFlow = SignalFlows.newSingleFlow(MeshObjectSignals.scaleSignalNameOf(name))

    this.#performedTranslationBuilder = new PerformedTranslationBuilder()
    this.#performedPolarRotationBuilder = new PerformedPolarRotationBuilder()
    this.#performedScaleBuilder = new PerformedScaleBuilder()
    this.#performedTranslationBuilder.who = name
    this.#performedPolarRotationBuilder.who = name
    this.#performedScaleBuilder.who = name
  }


  draw(gl: WebGLRenderingContext, programInfo: object): void;
  draw(gl: WebGLRenderingContext, programInfo: object, clear: boolean): void;
  draw(gl: WebGLRenderingContext, programInfo: object, clear?: boolean): void {
    if(clear == undefined) {
      clear = false
    }
    if(clear) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    if(!this.#hidden) {
      let u_world = this.#data.u_world

      for (let {bufferInfo, material} of this.#data.parts) {
        // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
        WebGLUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        // calls gl.uniform
        WebGLUtils.setUniforms(programInfo, {
          u_colorMult: [1, 1, 1, 1],
          u_color: [1, 1, 1, 1],
          u_world: u_world,
        }, material);
        // calls gl.drawArrays or gl.drawElements
        WebGLUtils.drawBufferInfo(gl, bufferInfo);
      }

      // for (let part of this.#data.parts) {
      //   // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
      //   WebGLUtils.setBuffersAndAttributes(gl, programInfo, part.bufferInfo);
      //   // calls gl.uniform
      //   WebGLUtils.setUniforms(programInfo, { u_world }, part.material);
      //   // calls gl.drawArrays or gl.drawElements
      //   WebGLUtils.drawBufferInfo(gl, part.bufferInfo);
      // }
      Log.log("MeshObject[" + this.#name + "] | drawn")
    } else {
      Log.log("MeshObject[" + this.#name + "] | hidden, draw skipped")
    }
  }

  getCurrentScale(): NumberTrio {
    return this.#scale.clone()
  }

  getHidden(): boolean {
    return this.#hidden
  }

  getLimitsChecker(): LimitsChecker {
    return this.#limitChecker;
  }

  getPosition(): Point3D {
    return this.#position.clone();
  }

  getName(): string {
    return this.#name;
  }

  getPolarRotation(): Trio<Angle> {
    return this.#polarRotation.clone()
  }

  getPolarRotationSubscriber(): SingleSignalSubscriber<MeshObject, PerformedPolarRotation, void> {
    return this.#polarRotationFlow
  }

  getScaleSubscriber(): SingleSignalSubscriber<MeshObject, PerformedScale, void> {
    return this.#scaleFlow
  }

  getTranslationSubscriber(): SingleSignalSubscriber<MeshObject, PerformedTranslation, void> {
    return this.#translationFlow
  }

  glInit(gl: WebGLRenderingContext) {
    this.#data.u_world = M4.identity();
    Log.log("MeshObject[" + this.#name + "] initialized")
  }

  setHidden(hidden: boolean) {
    this.#hidden = hidden
  }

  setLimitsChecker(limitsChecker: LimitsChecker): void {
    this.#limitChecker = limitsChecker
  }

  setPolarRotation(psi: Angle, theta: Angle, phi: Angle): void {
    this.#performedPolarRotationBuilder.clear()
    this.#performedPolarRotationBuilder.from = this.#polarRotation.clone()
    this.#polarRotation.setFirst(psi)
    this.#polarRotation.setSecond(theta)
    this.#polarRotation.setThird(phi)
    this.#performedPolarRotationBuilder.to = this.#polarRotation.clone()
    this.#polarRotationFlow.fire(this, this.#performedPolarRotationBuilder.build())

    this.updateUMatrix()
  }

  setPosition(position: Point3D): void;
  setPosition(x: number, y: number, z: number): void;
  setPosition(position: Point3D | number, y?: number, z?: number): void {
    this.#performedTranslationBuilder.clear()
    this.#performedTranslationBuilder.from = this.#position.clone()
    if (typeof position === "number") {
      this.#position.set(position, y, z)
    } else {
      this.#position.set(position.getX(), position.getY(), position.getZ())
    }
    this.#performedTranslationBuilder.to = this.#position.clone()
    this.#translationFlow.fire(this, this.#performedTranslationBuilder.build())

    this.updateUMatrix()
  }

  setScale(scale: NumberTrio): void;
  setScale(x: number, y: number, z: number): void;
  setScale(scale: NumberTrio | number, y?: number, z?: number): void {
    this.#performedScaleBuilder.clear()
    this.#performedScaleBuilder.from = this.#scale.clone()
    if (typeof scale === "number") {
      this.#scale.setFirst(scale)
      this.#scale.setSecond(y)
      this.#scale.setThird(z)
    } else {
      this.#scale.setFirst(scale.getFirst())
      this.#scale.setSecond(scale.getSecond())
      this.#scale.setThird(scale.getThird())
    }
    this.#performedScaleBuilder.to = this.#scale.clone()
    this.#scaleFlow.fire(this, this.#performedScaleBuilder.build())

    this.updateUMatrix()
  }

  updateUMatrix(u_world: number[] = M4.identity(),
                position: boolean = true,
                rotation: boolean = true,
                scale: boolean = true) {
    if(position) {
      u_world = M4.translate(u_world, this.#position.getX(), this.#position.getY(), this.#position.getZ())
    }
    if(rotation) {
        u_world = M4.xRotate(u_world, this.#polarRotation.getFirst().getValueIn(AngleUnit.RAD))
        u_world = M4.yRotate(u_world, this.#polarRotation.getSecond().getValueIn(AngleUnit.RAD))
        u_world = M4.zRotate(u_world, this.#polarRotation.getThird().getValueIn(AngleUnit.RAD))
    }
    if(scale) {
        u_world = M4.scale(u_world, this.#scale.getFirst(), this.#scale.getSecond(), this.#scale.getThird())
    }
    this.#data.u_world = u_world
    Log.log("MeshObject[" + this.#name + "] | u_world updated: " + u_world)
  }
}