import { a as __extends, _ as __decorate } from '../../../common/tslib.es6-2542203d.js';
import { g as serializeAsColor3, d as serializeAsVector3 } from '../../../common/decorators-549f2b16.js';
import { V as Vector3, M as Matrix } from '../../../common/math.vector-92740b4e.js';
import { C as Color3 } from '../../../common/math.color-1c350db4.js';
import { N as Node } from '../../../common/node-0c79311f.js';
import { L as Light } from '../../../common/light-9ca192f2.js';
import '../../../common/devTools-40c203e4.js';
import '../../../common/math.scalar-e66d1d02.js';
import '../../../common/arrayTools-18b75ee3.js';
import '../../../common/typeStore-e0f83823.js';
import '../../../common/engineStore-733743e8.js';
import '../../../common/observable-08535f24.js';
import '../../../common/uniformBuffer-c6105a9c.js';
import '../../../common/logger-bef9f4b6.js';
import '../../../common/tools-7eb5c69a.js';
import '../../../common/effect-95a5a78c.js';
import '../../../common/webRequest-2d96397b.js';
import '../../../common/fileTools-e883e409.js';
import '../../../common/error-ec1bafe5.js';
import '../../../common/stringTools-39526e6b.js';
import '../../../common/dataBuffer-bed89e2d.js';
import '../../../common/drawWrapper-5520764a.js';
import '../../../common/guid-586031d9.js';
import '../../../common/lightConstants-574d2608.js';

Node.AddNodeConstructor("Light_Type_3", function (name, scene) {
    return function () { return new HemisphericLight(name, Vector3.Zero(), scene); };
});
/**
 * The HemisphericLight simulates the ambient environment light,
 * so the passed direction is the light reflection direction, not the incoming direction.
 */
var HemisphericLight = /** @class */ (function (_super) {
    __extends(HemisphericLight, _super);
    /**
     * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
     * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
     * The HemisphericLight can't cast shadows.
     * Documentation : https://doc.babylonjs.com/babylon101/lights
     * @param name The friendly name of the light
     * @param direction The direction of the light reflection
     * @param scene The scene the light belongs to
     */
    function HemisphericLight(name, direction, scene) {
        var _this = _super.call(this, name, scene) || this;
        /**
         * The groundColor is the light in the opposite direction to the one specified during creation.
         * You can think of the diffuse and specular light as coming from the centre of the object in the given direction and the groundColor light in the opposite direction.
         */
        _this.groundColor = new Color3(0.0, 0.0, 0.0);
        _this.direction = direction || Vector3.Up();
        return _this;
    }
    HemisphericLight.prototype._buildUniformLayout = function () {
        this._uniformBuffer.addUniform("vLightData", 4);
        this._uniformBuffer.addUniform("vLightDiffuse", 4);
        this._uniformBuffer.addUniform("vLightSpecular", 4);
        this._uniformBuffer.addUniform("vLightGround", 3);
        this._uniformBuffer.addUniform("shadowsInfo", 3);
        this._uniformBuffer.addUniform("depthValues", 2);
        this._uniformBuffer.create();
    };
    /**
     * Returns the string "HemisphericLight".
     * @return The class name
     */
    HemisphericLight.prototype.getClassName = function () {
        return "HemisphericLight";
    };
    /**
     * Sets the HemisphericLight direction towards the passed target (Vector3).
     * Returns the updated direction.
     * @param target The target the direction should point to
     * @return The computed direction
     */
    HemisphericLight.prototype.setDirectionToTarget = function (target) {
        this.direction = Vector3.Normalize(target.subtract(Vector3.Zero()));
        return this.direction;
    };
    /**
     * Returns the shadow generator associated to the light.
     * @returns Always null for hemispheric lights because it does not support shadows.
     */
    HemisphericLight.prototype.getShadowGenerator = function () {
        return null;
    };
    /**
     * Sets the passed Effect object with the HemisphericLight normalized direction and color and the passed name (string).
     * @param _effect The effect to update
     * @param lightIndex The index of the light in the effect to update
     * @returns The hemispheric light
     */
    HemisphericLight.prototype.transferToEffect = function (_effect, lightIndex) {
        var normalizeDirection = Vector3.Normalize(this.direction);
        this._uniformBuffer.updateFloat4("vLightData", normalizeDirection.x, normalizeDirection.y, normalizeDirection.z, 0.0, lightIndex);
        this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), lightIndex);
        return this;
    };
    HemisphericLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
        var normalizeDirection = Vector3.Normalize(this.direction);
        effect.setFloat3(lightDataUniformName, normalizeDirection.x, normalizeDirection.y, normalizeDirection.z);
        return this;
    };
    /**
     * Computes the world matrix of the node
     * @returns the world matrix
     */
    HemisphericLight.prototype.computeWorldMatrix = function () {
        if (!this._worldMatrix) {
            this._worldMatrix = Matrix.Identity();
        }
        return this._worldMatrix;
    };
    /**
     * Returns the integer 3.
     * @return The light Type id as a constant defines in Light.LIGHTTYPEID_x
     */
    HemisphericLight.prototype.getTypeID = function () {
        return Light.LIGHTTYPEID_HEMISPHERICLIGHT;
    };
    /**
     * Prepares the list of defines specific to the light type.
     * @param defines the list of defines
     * @param lightIndex defines the index of the light for the effect
     */
    HemisphericLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
        defines["HEMILIGHT" + lightIndex] = true;
    };
    __decorate([
        serializeAsColor3()
    ], HemisphericLight.prototype, "groundColor", void 0);
    __decorate([
        serializeAsVector3()
    ], HemisphericLight.prototype, "direction", void 0);
    return HemisphericLight;
}(Light));

export { HemisphericLight };
