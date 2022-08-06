import { a as __extends, _ as __decorate } from '../../../common/tslib.es6-2542203d.js';
import { s as serialize } from '../../../common/decorators-549f2b16.js';
import { V as Vector3, M as Matrix } from '../../../common/math.vector-92740b4e.js';
import { N as Node } from '../../../common/node-0c79311f.js';
import { L as Light } from '../../../common/light-9ca192f2.js';
import { S as ShadowLight } from '../../../common/shadowLight-ccd44d6f.js';
import '../../../common/devTools-40c203e4.js';
import '../../../common/math.color-1c350db4.js';
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
import '../../../common/math.axis-65421e97.js';

Node.AddNodeConstructor("Light_Type_0", function (name, scene) {
    return function () { return new PointLight(name, Vector3.Zero(), scene); };
});
/**
 * A point light is a light defined by an unique point in world space.
 * The light is emitted in every direction from this point.
 * A good example of a point light is a standard light bulb.
 * Documentation: https://doc.babylonjs.com/babylon101/lights
 */
var PointLight = /** @class */ (function (_super) {
    __extends(PointLight, _super);
    /**
     * Creates a PointLight object from the passed name and position (Vector3) and adds it in the scene.
     * A PointLight emits the light in every direction.
     * It can cast shadows.
     * If the scene camera is already defined and you want to set your PointLight at the camera position, just set it :
     * ```javascript
     * var pointLight = new PointLight("pl", camera.position, scene);
     * ```
     * Documentation : https://doc.babylonjs.com/babylon101/lights
     * @param name The light friendly name
     * @param position The position of the point light in the scene
     * @param scene The scene the lights belongs to
     */
    function PointLight(name, position, scene) {
        var _this = _super.call(this, name, scene) || this;
        _this._shadowAngle = Math.PI / 2;
        _this.position = position;
        return _this;
    }
    Object.defineProperty(PointLight.prototype, "shadowAngle", {
        /**
         * Getter: In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
         * This specifies what angle the shadow will use to be created.
         *
         * It default to 90 degrees to work nicely with the cube texture generation for point lights shadow maps.
         */
        get: function () {
            return this._shadowAngle;
        },
        /**
         * Setter: In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
         * This specifies what angle the shadow will use to be created.
         *
         * It default to 90 degrees to work nicely with the cube texture generation for point lights shadow maps.
         */
        set: function (value) {
            this._shadowAngle = value;
            this.forceProjectionMatrixCompute();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointLight.prototype, "direction", {
        /**
         * Gets the direction if it has been set.
         * In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
         */
        get: function () {
            return this._direction;
        },
        /**
         * In case of direction provided, the shadow will not use a cube texture but simulate a spot shadow as a fallback
         */
        set: function (value) {
            var previousNeedCube = this.needCube();
            this._direction = value;
            if (this.needCube() !== previousNeedCube && this._shadowGenerator) {
                this._shadowGenerator.recreateShadowMap();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the string "PointLight"
     * @returns the class name
     */
    PointLight.prototype.getClassName = function () {
        return "PointLight";
    };
    /**
     * Returns the integer 0.
     * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
     */
    PointLight.prototype.getTypeID = function () {
        return Light.LIGHTTYPEID_POINTLIGHT;
    };
    /**
     * Specifies whether or not the shadowmap should be a cube texture.
     * @returns true if the shadowmap needs to be a cube texture.
     */
    PointLight.prototype.needCube = function () {
        return !this.direction;
    };
    /**
     * Returns a new Vector3 aligned with the PointLight cube system according to the passed cube face index (integer).
     * @param faceIndex The index of the face we are computed the direction to generate shadow
     * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
     */
    PointLight.prototype.getShadowDirection = function (faceIndex) {
        if (this.direction) {
            return _super.prototype.getShadowDirection.call(this, faceIndex);
        }
        else {
            switch (faceIndex) {
                case 0:
                    return new Vector3(1.0, 0.0, 0.0);
                case 1:
                    return new Vector3(-1.0, 0.0, 0.0);
                case 2:
                    return new Vector3(0.0, -1.0, 0.0);
                case 3:
                    return new Vector3(0.0, 1.0, 0.0);
                case 4:
                    return new Vector3(0.0, 0.0, 1.0);
                case 5:
                    return new Vector3(0.0, 0.0, -1.0);
            }
        }
        return Vector3.Zero();
    };
    /**
     * Sets the passed matrix "matrix" as a left-handed perspective projection matrix with the following settings :
     * - fov = PI / 2
     * - aspect ratio : 1.0
     * - z-near and far equal to the active camera minZ and maxZ.
     * Returns the PointLight.
     * @param matrix
     * @param viewMatrix
     * @param renderList
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PointLight.prototype._setDefaultShadowProjectionMatrix = function (matrix, viewMatrix, renderList) {
        var activeCamera = this.getScene().activeCamera;
        if (!activeCamera) {
            return;
        }
        var minZ = this.shadowMinZ !== undefined ? this.shadowMinZ : activeCamera.minZ;
        var maxZ = this.shadowMaxZ !== undefined ? this.shadowMaxZ : activeCamera.maxZ;
        var useReverseDepthBuffer = this.getScene().getEngine().useReverseDepthBuffer;
        Matrix.PerspectiveFovLHToRef(this.shadowAngle, 1.0, useReverseDepthBuffer ? maxZ : minZ, useReverseDepthBuffer ? minZ : maxZ, matrix, true, this._scene.getEngine().isNDCHalfZRange, undefined, useReverseDepthBuffer);
    };
    PointLight.prototype._buildUniformLayout = function () {
        this._uniformBuffer.addUniform("vLightData", 4);
        this._uniformBuffer.addUniform("vLightDiffuse", 4);
        this._uniformBuffer.addUniform("vLightSpecular", 4);
        this._uniformBuffer.addUniform("vLightFalloff", 4);
        this._uniformBuffer.addUniform("shadowsInfo", 3);
        this._uniformBuffer.addUniform("depthValues", 2);
        this._uniformBuffer.create();
    };
    /**
     * Sets the passed Effect "effect" with the PointLight transformed position (or position, if none) and passed name (string).
     * @param effect The effect to update
     * @param lightIndex The index of the light in the effect to update
     * @returns The point light
     */
    PointLight.prototype.transferToEffect = function (effect, lightIndex) {
        if (this.computeTransformedInformation()) {
            this._uniformBuffer.updateFloat4("vLightData", this.transformedPosition.x, this.transformedPosition.y, this.transformedPosition.z, 0.0, lightIndex);
        }
        else {
            this._uniformBuffer.updateFloat4("vLightData", this.position.x, this.position.y, this.position.z, 0, lightIndex);
        }
        this._uniformBuffer.updateFloat4("vLightFalloff", this.range, this._inverseSquaredRange, 0, 0, lightIndex);
        return this;
    };
    PointLight.prototype.transferToNodeMaterialEffect = function (effect, lightDataUniformName) {
        if (this.computeTransformedInformation()) {
            effect.setFloat3(lightDataUniformName, this.transformedPosition.x, this.transformedPosition.y, this.transformedPosition.z);
        }
        else {
            effect.setFloat3(lightDataUniformName, this.position.x, this.position.y, this.position.z);
        }
        return this;
    };
    /**
     * Prepares the list of defines specific to the light type.
     * @param defines the list of defines
     * @param lightIndex defines the index of the light for the effect
     */
    PointLight.prototype.prepareLightSpecificDefines = function (defines, lightIndex) {
        defines["POINTLIGHT" + lightIndex] = true;
    };
    __decorate([
        serialize()
    ], PointLight.prototype, "shadowAngle", null);
    return PointLight;
}(ShadowLight));

export { PointLight };
