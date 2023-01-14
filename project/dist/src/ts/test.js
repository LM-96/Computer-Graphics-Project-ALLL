"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_factory_1 = require("./geometry/point/point-factory");
const angle_1 = require("./geometry/angle");
console.log('started');
const point = (0, point_factory_1.mutablePoint3D)(0, 0, 0);
console.log(point.toString());
point.translate(1, 0, 0);
console.log(point.toString());
point.rotateAroundZ((0, angle_1.degree)(180));
console.log(point.toString());
//# sourceMappingURL=test.js.map