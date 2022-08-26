function MeshObj(name, path) {
  this.name = name;
  this.path = path;
  this.data = null;
  this.hasBeenLoaded = function() { return this.data != null; }
}

class MeshObjLoader {
  constructor(gl) {
    this.gl = gl;
    this.objects = [];
  }

  has(name) {
    for(const obj of this.objects) {
      if(obj.name == name) {
        return true;
      }
    }

    return false;
  }

  add(name, path) {
    if(this.has(name)) { throw new Error("An object with name " + name + " is already present. Unable to add"); }
    var newObject = new MeshObj(name, path);
    this.objects.push(newObject);
    return newObject;
  }

  get(name) {
    for(const obj of this.objects) {
      if(obj.name == name) {
        return obj;
      }
    }

    return null;
  }

  load(name) {
    this.loadObject(this.get(name));
  }

  loadObject(obj) {
    obj.data = LoadMesh(this.gl, obj.path);
  }

  addAndLoad(name, path) {
    var obj = this.add(name, path);
    this.loadObject(obj);
  }

  loadAll(reload = false) {
    for(const obj of this.objects) {
      if(reload || (!reload && obj.data == null)) {
        this.loadObject(obj);
      }
    }
  }

}

var MOLOADER;

function createMOLoader(gl) {
  return new MeshObjLoader(gl);
}
