import { V as Vector3 } from './math.vector-92740b4e.js';

/** Defines supported spaces */
var Space;
(function (Space) {
    /** Local (object) space */
    Space[Space["LOCAL"] = 0] = "LOCAL";
    /** World space */
    Space[Space["WORLD"] = 1] = "WORLD";
    /** Bone space */
    Space[Space["BONE"] = 2] = "BONE";
})(Space || (Space = {}));
/** Defines the 3 main axes */
var Axis = /** @class */ (function () {
    function Axis() {
    }
    /** X axis */
    Axis.X = new Vector3(1.0, 0.0, 0.0);
    /** Y axis */
    Axis.Y = new Vector3(0.0, 1.0, 0.0);
    /** Z axis */
    Axis.Z = new Vector3(0.0, 0.0, 1.0);
    return Axis;
}());
/**
 * Defines cartesian components.
 */
var Coordinate;
(function (Coordinate) {
    /** X axis */
    Coordinate[Coordinate["X"] = 0] = "X";
    /** Y axis */
    Coordinate[Coordinate["Y"] = 1] = "Y";
    /** Z axis */
    Coordinate[Coordinate["Z"] = 2] = "Z";
})(Coordinate || (Coordinate = {}));

export { Axis as A, Coordinate as C, Space as S };