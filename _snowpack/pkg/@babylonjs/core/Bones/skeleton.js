import { B as Bone } from '../../../common/bone-2589ff74.js';
import { O as Observable } from '../../../common/observable-08535f24.js';
import { T as TmpVectors, V as Vector3, M as Matrix } from '../../../common/math.vector-92740b4e.js';
import { a as __extends } from '../../../common/tslib.es6-2542203d.js';
import { T as Texture } from '../../../common/texture-a93bc695.js';
import '../../../common/engine.rawTexture-f81738c1.js';
import { a as AnimationRange, A as Animation } from '../../../common/animation-aea396da.js';
import { E as EngineStore } from '../../../common/engineStore-733743e8.js';
import { L as Logger } from '../../../common/logger-bef9f4b6.js';
import { D as DeepCopier } from '../../../common/tools-7eb5c69a.js';
import '../../../common/arrayTools-18b75ee3.js';
import '../../../common/node-0c79311f.js';
import '../../../common/decorators-549f2b16.js';
import '../../../common/devTools-40c203e4.js';
import '../../../common/math.color-1c350db4.js';
import '../../../common/math.scalar-e66d1d02.js';
import '../../../common/typeStore-e0f83823.js';
import '../../../common/math.axis-65421e97.js';
import '../../../common/guid-586031d9.js';
import '../../../common/fileTools-e883e409.js';
import '../../../common/webRequest-2d96397b.js';
import '../../../common/effect-95a5a78c.js';
import '../../../common/error-ec1bafe5.js';
import '../../../common/stringTools-39526e6b.js';
import '../../../common/dataBuffer-bed89e2d.js';
import '../../../common/drawWrapper-5520764a.js';
import '../../../common/math.size-6da31c23.js';
import '../../../common/math.plane-b261e683.js';
import '../../../common/compatibilityOptions-4310763a.js';
import '../../../common/animationKey-8d33c793.js';

/**
 * Raw texture can help creating a texture directly from an array of data.
 * This can be super useful if you either get the data from an uncompressed source or
 * if you wish to create your texture pixel by pixel.
 */
var RawTexture = /** @class */ (function (_super) {
    __extends(RawTexture, _super);
    /**
     * Instantiates a new RawTexture.
     * Raw texture can help creating a texture directly from an array of data.
     * This can be super useful if you either get the data from an uncompressed source or
     * if you wish to create your texture pixel by pixel.
     * @param data define the array of data to use to create the texture (null to create an empty texture)
     * @param width define the width of the texture
     * @param height define the height of the texture
     * @param format define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps define whether mip maps should be generated or not
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     */
    function RawTexture(data, width, height, 
    /**
     * Define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
     */
    format, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        if (type === void 0) { type = 0; }
        var _this = _super.call(this, null, sceneOrEngine, !generateMipMaps, invertY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, creationFlags) || this;
        _this.format = format;
        if (!_this._engine) {
            return _this;
        }
        if (!_this._engine._caps.textureFloatLinearFiltering && type === 1) {
            samplingMode = 1;
        }
        if (!_this._engine._caps.textureHalfFloatLinearFiltering && type === 2) {
            samplingMode = 1;
        }
        _this._texture = _this._engine.createRawTexture(data, width, height, format, generateMipMaps, invertY, samplingMode, null, type, creationFlags !== null && creationFlags !== void 0 ? creationFlags : 0, useSRGBBuffer !== null && useSRGBBuffer !== void 0 ? useSRGBBuffer : false);
        _this.wrapU = Texture.CLAMP_ADDRESSMODE;
        _this.wrapV = Texture.CLAMP_ADDRESSMODE;
        return _this;
    }
    /**
     * Updates the texture underlying data.
     * @param data Define the new data of the texture
     */
    RawTexture.prototype.update = function (data) {
        this._getEngine().updateRawTexture(this._texture, data, this._texture.format, this._texture.invertY, null, this._texture.type, this._texture._useSRGBBuffer);
    };
    /**
     * Creates a luminance texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the luminance texture
     */
    RawTexture.CreateLuminanceTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        return new RawTexture(data, width, height, 1, sceneOrEngine, generateMipMaps, invertY, samplingMode);
    };
    /**
     * Creates a luminance alpha texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the luminance alpha texture
     */
    RawTexture.CreateLuminanceAlphaTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        return new RawTexture(data, width, height, 2, sceneOrEngine, generateMipMaps, invertY, samplingMode);
    };
    /**
     * Creates an alpha texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the alpha texture
     */
    RawTexture.CreateAlphaTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        return new RawTexture(data, width, height, 0, sceneOrEngine, generateMipMaps, invertY, samplingMode);
    };
    /**
     * Creates a RGB texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the RGB alpha texture
     */
    RawTexture.CreateRGBTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        if (type === void 0) { type = 0; }
        if (creationFlags === void 0) { creationFlags = 0; }
        if (useSRGBBuffer === void 0) { useSRGBBuffer = false; }
        return new RawTexture(data, width, height, 4, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer);
    };
    /**
     * Creates a RGBA texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the RGBA texture
     */
    RawTexture.CreateRGBATexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        if (type === void 0) { type = 0; }
        if (creationFlags === void 0) { creationFlags = 0; }
        if (useSRGBBuffer === void 0) { useSRGBBuffer = false; }
        return new RawTexture(data, width, height, 5, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, creationFlags, useSRGBBuffer);
    };
    /**
     * Creates a RGBA storage texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the RGBA texture
     */
    RawTexture.CreateRGBAStorageTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, useSRGBBuffer) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = 3; }
        if (type === void 0) { type = 0; }
        if (useSRGBBuffer === void 0) { useSRGBBuffer = false; }
        return new RawTexture(data, width, height, 5, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, 1, useSRGBBuffer);
    };
    /**
     * Creates a R texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the R texture
     */
    RawTexture.CreateRTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = Texture.TRILINEAR_SAMPLINGMODE; }
        if (type === void 0) { type = 1; }
        return new RawTexture(data, width, height, 6, sceneOrEngine, generateMipMaps, invertY, samplingMode, type);
    };
    /**
     * Creates a R storage texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the R texture
     */
    RawTexture.CreateRStorageTexture = function (data, width, height, sceneOrEngine, generateMipMaps, invertY, samplingMode, type) {
        if (generateMipMaps === void 0) { generateMipMaps = true; }
        if (invertY === void 0) { invertY = false; }
        if (samplingMode === void 0) { samplingMode = Texture.TRILINEAR_SAMPLINGMODE; }
        if (type === void 0) { type = 1; }
        return new RawTexture(data, width, height, 6, sceneOrEngine, generateMipMaps, invertY, samplingMode, type, 1);
    };
    return RawTexture;
}(Texture));

/**
 * Class used to handle skinning animations
 * @see https://doc.babylonjs.com/how_to/how_to_use_bones_and_skeletons
 */
var Skeleton = /** @class */ (function () {
    /**
     * Creates a new skeleton
     * @param name defines the skeleton name
     * @param id defines the skeleton Id
     * @param scene defines the hosting scene
     */
    function Skeleton(
    /** defines the skeleton name */
    name, 
    /** defines the skeleton Id */
    id, scene) {
        this.name = name;
        this.id = id;
        /**
         * Defines the list of child bones
         */
        this.bones = new Array();
        /**
         * Defines a boolean indicating if the root matrix is provided by meshes or by the current skeleton (this is the default value)
         */
        this.needInitialSkinMatrix = false;
        this._isDirty = true;
        this._meshesWithPoseMatrix = new Array();
        this._identity = Matrix.Identity();
        this._ranges = {};
        this._absoluteTransformIsDirty = true;
        this._canUseTextureForBones = false;
        this._uniqueId = 0;
        /** @hidden */
        this._numBonesWithLinkedTransformNode = 0;
        /** @hidden */
        this._hasWaitingData = null;
        /** @hidden */
        this._parentContainer = null;
        /**
         * Specifies if the skeleton should be serialized
         */
        this.doNotSerialize = false;
        this._useTextureToStoreBoneMatrices = true;
        this._animationPropertiesOverride = null;
        // Events
        /**
         * An observable triggered before computing the skeleton's matrices
         */
        this.onBeforeComputeObservable = new Observable();
        this.bones = [];
        this._scene = scene || EngineStore.LastCreatedScene;
        this._uniqueId = this._scene.getUniqueId();
        this._scene.addSkeleton(this);
        //make sure it will recalculate the matrix next time prepare is called.
        this._isDirty = true;
        var engineCaps = this._scene.getEngine().getCaps();
        this._canUseTextureForBones = engineCaps.textureFloat && engineCaps.maxVertexTextureImageUnits > 0;
    }
    Object.defineProperty(Skeleton.prototype, "useTextureToStoreBoneMatrices", {
        /**
         * Gets or sets a boolean indicating that bone matrices should be stored as a texture instead of using shader uniforms (default is true).
         * Please note that this option is not available if the hardware does not support it
         */
        get: function () {
            return this._useTextureToStoreBoneMatrices;
        },
        set: function (value) {
            this._useTextureToStoreBoneMatrices = value;
            this._markAsDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Skeleton.prototype, "animationPropertiesOverride", {
        /**
         * Gets or sets the animation properties override
         */
        get: function () {
            if (!this._animationPropertiesOverride) {
                return this._scene.animationPropertiesOverride;
            }
            return this._animationPropertiesOverride;
        },
        set: function (value) {
            this._animationPropertiesOverride = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Skeleton.prototype, "isUsingTextureForMatrices", {
        /**
         * Gets a boolean indicating that the skeleton effectively stores matrices into a texture
         */
        get: function () {
            return this.useTextureToStoreBoneMatrices && this._canUseTextureForBones;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Skeleton.prototype, "uniqueId", {
        /**
         * Gets the unique ID of this skeleton
         */
        get: function () {
            return this._uniqueId;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the current object class name.
     * @return the class name
     */
    Skeleton.prototype.getClassName = function () {
        return "Skeleton";
    };
    /**
     * Returns an array containing the root bones
     * @returns an array containing the root bones
     */
    Skeleton.prototype.getChildren = function () {
        return this.bones.filter(function (b) { return !b.getParent(); });
    };
    // Members
    /**
     * Gets the list of transform matrices to send to shaders (one matrix per bone)
     * @param mesh defines the mesh to use to get the root matrix (if needInitialSkinMatrix === true)
     * @returns a Float32Array containing matrices data
     */
    Skeleton.prototype.getTransformMatrices = function (mesh) {
        if (this.needInitialSkinMatrix) {
            if (!mesh._bonesTransformMatrices) {
                this.prepare();
            }
            return mesh._bonesTransformMatrices;
        }
        if (!this._transformMatrices) {
            this.prepare();
        }
        return this._transformMatrices;
    };
    /**
     * Gets the list of transform matrices to send to shaders inside a texture (one matrix per bone)
     * @param mesh defines the mesh to use to get the root matrix (if needInitialSkinMatrix === true)
     * @returns a raw texture containing the data
     */
    Skeleton.prototype.getTransformMatrixTexture = function (mesh) {
        if (this.needInitialSkinMatrix && mesh._transformMatrixTexture) {
            return mesh._transformMatrixTexture;
        }
        return this._transformMatrixTexture;
    };
    /**
     * Gets the current hosting scene
     * @returns a scene object
     */
    Skeleton.prototype.getScene = function () {
        return this._scene;
    };
    // Methods
    /**
     * Gets a string representing the current skeleton data
     * @param fullDetails defines a boolean indicating if we want a verbose version
     * @returns a string representing the current skeleton data
     */
    Skeleton.prototype.toString = function (fullDetails) {
        var ret = "Name: ".concat(this.name, ", nBones: ").concat(this.bones.length);
        ret += ", nAnimationRanges: ".concat(this._ranges ? Object.keys(this._ranges).length : "none");
        if (fullDetails) {
            ret += ", Ranges: {";
            var first = true;
            for (var name_1 in this._ranges) {
                if (first) {
                    ret += ", ";
                    first = false;
                }
                ret += name_1;
            }
            ret += "}";
        }
        return ret;
    };
    /**
     * Get bone's index searching by name
     * @param name defines bone's name to search for
     * @return the indice of the bone. Returns -1 if not found
     */
    Skeleton.prototype.getBoneIndexByName = function (name) {
        for (var boneIndex = 0, cache = this.bones.length; boneIndex < cache; boneIndex++) {
            if (this.bones[boneIndex].name === name) {
                return boneIndex;
            }
        }
        return -1;
    };
    /**
     * Create a new animation range
     * @param name defines the name of the range
     * @param from defines the start key
     * @param to defines the end key
     */
    Skeleton.prototype.createAnimationRange = function (name, from, to) {
        // check name not already in use
        if (!this._ranges[name]) {
            this._ranges[name] = new AnimationRange(name, from, to);
            for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
                if (this.bones[i].animations[0]) {
                    this.bones[i].animations[0].createRange(name, from, to);
                }
            }
        }
    };
    /**
     * Delete a specific animation range
     * @param name defines the name of the range
     * @param deleteFrames defines if frames must be removed as well
     */
    Skeleton.prototype.deleteAnimationRange = function (name, deleteFrames) {
        if (deleteFrames === void 0) { deleteFrames = true; }
        for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
            if (this.bones[i].animations[0]) {
                this.bones[i].animations[0].deleteRange(name, deleteFrames);
            }
        }
        this._ranges[name] = null; // said much faster than 'delete this._range[name]'
    };
    /**
     * Gets a specific animation range
     * @param name defines the name of the range to look for
     * @returns the requested animation range or null if not found
     */
    Skeleton.prototype.getAnimationRange = function (name) {
        return this._ranges[name] || null;
    };
    /**
     * Gets the list of all animation ranges defined on this skeleton
     * @returns an array
     */
    Skeleton.prototype.getAnimationRanges = function () {
        var animationRanges = [];
        var name;
        for (name in this._ranges) {
            animationRanges.push(this._ranges[name]);
        }
        return animationRanges;
    };
    /**
     * Copy animation range from a source skeleton.
     * This is not for a complete retargeting, only between very similar skeleton's with only possible bone length differences
     * @param source defines the source skeleton
     * @param name defines the name of the range to copy
     * @param rescaleAsRequired defines if rescaling must be applied if required
     * @returns true if operation was successful
     */
    Skeleton.prototype.copyAnimationRange = function (source, name, rescaleAsRequired) {
        if (rescaleAsRequired === void 0) { rescaleAsRequired = false; }
        if (this._ranges[name] || !source.getAnimationRange(name)) {
            return false;
        }
        var ret = true;
        var frameOffset = this._getHighestAnimationFrame() + 1;
        // make a dictionary of source skeleton's bones, so exact same order or doubly nested loop is not required
        var boneDict = {};
        var sourceBones = source.bones;
        var nBones;
        var i;
        for (i = 0, nBones = sourceBones.length; i < nBones; i++) {
            boneDict[sourceBones[i].name] = sourceBones[i];
        }
        if (this.bones.length !== sourceBones.length) {
            Logger.Warn("copyAnimationRange: this rig has ".concat(this.bones.length, " bones, while source as ").concat(sourceBones.length));
            ret = false;
        }
        var skelDimensionsRatio = rescaleAsRequired && this.dimensionsAtRest && source.dimensionsAtRest ? this.dimensionsAtRest.divide(source.dimensionsAtRest) : null;
        for (i = 0, nBones = this.bones.length; i < nBones; i++) {
            var boneName = this.bones[i].name;
            var sourceBone = boneDict[boneName];
            if (sourceBone) {
                ret = ret && this.bones[i].copyAnimationRange(sourceBone, name, frameOffset, rescaleAsRequired, skelDimensionsRatio);
            }
            else {
                Logger.Warn("copyAnimationRange: not same rig, missing source bone " + boneName);
                ret = false;
            }
        }
        // do not call createAnimationRange(), since it also is done to bones, which was already done
        var range = source.getAnimationRange(name);
        if (range) {
            this._ranges[name] = new AnimationRange(name, range.from + frameOffset, range.to + frameOffset);
        }
        return ret;
    };
    /**
     * Forces the skeleton to go to rest pose
     */
    Skeleton.prototype.returnToRest = function () {
        for (var _i = 0, _a = this.bones; _i < _a.length; _i++) {
            var bone = _a[_i];
            if (bone._index !== -1) {
                bone.returnToRest();
            }
        }
    };
    Skeleton.prototype._getHighestAnimationFrame = function () {
        var ret = 0;
        for (var i = 0, nBones = this.bones.length; i < nBones; i++) {
            if (this.bones[i].animations[0]) {
                var highest = this.bones[i].animations[0].getHighestFrame();
                if (ret < highest) {
                    ret = highest;
                }
            }
        }
        return ret;
    };
    /**
     * Begin a specific animation range
     * @param name defines the name of the range to start
     * @param loop defines if looping must be turned on (false by default)
     * @param speedRatio defines the speed ratio to apply (1 by default)
     * @param onAnimationEnd defines a callback which will be called when animation will end
     * @returns a new animatable
     */
    Skeleton.prototype.beginAnimation = function (name, loop, speedRatio, onAnimationEnd) {
        var range = this.getAnimationRange(name);
        if (!range) {
            return null;
        }
        return this._scene.beginAnimation(this, range.from, range.to, loop, speedRatio, onAnimationEnd);
    };
    /**
     * Convert the keyframes for a range of animation on a skeleton to be relative to a given reference frame.
     * @param skeleton defines the Skeleton containing the animation range to convert
     * @param referenceFrame defines the frame that keyframes in the range will be relative to
     * @param range defines the name of the AnimationRange belonging to the Skeleton to convert
     * @returns the original skeleton
     */
    Skeleton.MakeAnimationAdditive = function (skeleton, referenceFrame, range) {
        if (referenceFrame === void 0) { referenceFrame = 0; }
        var rangeValue = skeleton.getAnimationRange(range);
        // We can't make a range additive if it doesn't exist
        if (!rangeValue) {
            return null;
        }
        // Find any current scene-level animatable belonging to the target that matches the range
        var sceneAnimatables = skeleton._scene.getAllAnimatablesByTarget(skeleton);
        var rangeAnimatable = null;
        for (var index = 0; index < sceneAnimatables.length; index++) {
            var sceneAnimatable = sceneAnimatables[index];
            if (sceneAnimatable.fromFrame === (rangeValue === null || rangeValue === void 0 ? void 0 : rangeValue.from) && sceneAnimatable.toFrame === (rangeValue === null || rangeValue === void 0 ? void 0 : rangeValue.to)) {
                rangeAnimatable = sceneAnimatable;
                break;
            }
        }
        // Convert the animations belonging to the skeleton to additive keyframes
        var animatables = skeleton.getAnimatables();
        for (var index = 0; index < animatables.length; index++) {
            var animatable = animatables[index];
            var animations = animatable.animations;
            if (!animations) {
                continue;
            }
            for (var animIndex = 0; animIndex < animations.length; animIndex++) {
                Animation.MakeAnimationAdditive(animations[animIndex], referenceFrame, range);
            }
        }
        // Mark the scene-level animatable as additive
        if (rangeAnimatable) {
            rangeAnimatable.isAdditive = true;
        }
        return skeleton;
    };
    /** @hidden */
    Skeleton.prototype._markAsDirty = function () {
        this._isDirty = true;
        this._absoluteTransformIsDirty = true;
    };
    /**
     * @param mesh
     * @hidden
     */
    Skeleton.prototype._registerMeshWithPoseMatrix = function (mesh) {
        this._meshesWithPoseMatrix.push(mesh);
    };
    /**
     * @param mesh
     * @hidden
     */
    Skeleton.prototype._unregisterMeshWithPoseMatrix = function (mesh) {
        var index = this._meshesWithPoseMatrix.indexOf(mesh);
        if (index > -1) {
            this._meshesWithPoseMatrix.splice(index, 1);
        }
    };
    Skeleton.prototype._computeTransformMatrices = function (targetMatrix, initialSkinMatrix) {
        this.onBeforeComputeObservable.notifyObservers(this);
        for (var index = 0; index < this.bones.length; index++) {
            var bone = this.bones[index];
            bone._childUpdateId++;
            var parentBone = bone.getParent();
            if (parentBone) {
                bone.getLocalMatrix().multiplyToRef(parentBone.getWorldMatrix(), bone.getWorldMatrix());
            }
            else {
                if (initialSkinMatrix) {
                    bone.getLocalMatrix().multiplyToRef(initialSkinMatrix, bone.getWorldMatrix());
                }
                else {
                    bone.getWorldMatrix().copyFrom(bone.getLocalMatrix());
                }
            }
            if (bone._index !== -1) {
                var mappedIndex = bone._index === null ? index : bone._index;
                bone.getInvertedAbsoluteTransform().multiplyToArray(bone.getWorldMatrix(), targetMatrix, mappedIndex * 16);
            }
        }
        this._identity.copyToArray(targetMatrix, this.bones.length * 16);
    };
    /**
     * Build all resources required to render a skeleton
     */
    Skeleton.prototype.prepare = function () {
        // Update the local matrix of bones with linked transform nodes.
        if (this._numBonesWithLinkedTransformNode > 0) {
            for (var _i = 0, _a = this.bones; _i < _a.length; _i++) {
                var bone = _a[_i];
                if (bone._linkedTransformNode) {
                    // Computing the world matrix also computes the local matrix.
                    bone._linkedTransformNode.computeWorldMatrix();
                    bone._matrix = bone._linkedTransformNode._localMatrix;
                }
            }
        }
        if (this.needInitialSkinMatrix) {
            for (var _b = 0, _c = this._meshesWithPoseMatrix; _b < _c.length; _b++) {
                var mesh = _c[_b];
                var poseMatrix = mesh.getPoseMatrix();
                var needsUpdate = this._isDirty;
                if (!mesh._bonesTransformMatrices || mesh._bonesTransformMatrices.length !== 16 * (this.bones.length + 1)) {
                    mesh._bonesTransformMatrices = new Float32Array(16 * (this.bones.length + 1));
                    needsUpdate = true;
                }
                if (!needsUpdate) {
                    continue;
                }
                if (this._synchronizedWithMesh !== mesh) {
                    this._synchronizedWithMesh = mesh;
                    // Prepare bones
                    for (var _d = 0, _e = this.bones; _d < _e.length; _d++) {
                        var bone = _e[_d];
                        if (!bone.getParent()) {
                            var matrix = bone.getBaseMatrix();
                            matrix.multiplyToRef(poseMatrix, TmpVectors.Matrix[1]);
                            bone._updateDifferenceMatrix(TmpVectors.Matrix[1]);
                        }
                    }
                    if (this.isUsingTextureForMatrices) {
                        var textureWidth = (this.bones.length + 1) * 4;
                        if (!mesh._transformMatrixTexture || mesh._transformMatrixTexture.getSize().width !== textureWidth) {
                            if (mesh._transformMatrixTexture) {
                                mesh._transformMatrixTexture.dispose();
                            }
                            mesh._transformMatrixTexture = RawTexture.CreateRGBATexture(mesh._bonesTransformMatrices, (this.bones.length + 1) * 4, 1, this._scene, false, false, 1, 1);
                        }
                    }
                }
                this._computeTransformMatrices(mesh._bonesTransformMatrices, poseMatrix);
                if (this.isUsingTextureForMatrices && mesh._transformMatrixTexture) {
                    mesh._transformMatrixTexture.update(mesh._bonesTransformMatrices);
                }
            }
        }
        else {
            if (!this._isDirty) {
                return;
            }
            if (!this._transformMatrices || this._transformMatrices.length !== 16 * (this.bones.length + 1)) {
                this._transformMatrices = new Float32Array(16 * (this.bones.length + 1));
                if (this.isUsingTextureForMatrices) {
                    if (this._transformMatrixTexture) {
                        this._transformMatrixTexture.dispose();
                    }
                    this._transformMatrixTexture = RawTexture.CreateRGBATexture(this._transformMatrices, (this.bones.length + 1) * 4, 1, this._scene, false, false, 1, 1);
                }
            }
            this._computeTransformMatrices(this._transformMatrices, null);
            if (this.isUsingTextureForMatrices && this._transformMatrixTexture) {
                this._transformMatrixTexture.update(this._transformMatrices);
            }
        }
        this._isDirty = false;
    };
    /**
     * Gets the list of animatables currently running for this skeleton
     * @returns an array of animatables
     */
    Skeleton.prototype.getAnimatables = function () {
        if (!this._animatables || this._animatables.length !== this.bones.length) {
            this._animatables = [];
            for (var index = 0; index < this.bones.length; index++) {
                this._animatables.push(this.bones[index]);
            }
        }
        return this._animatables;
    };
    /**
     * Clone the current skeleton
     * @param name defines the name of the new skeleton
     * @param id defines the id of the new skeleton
     * @returns the new skeleton
     */
    Skeleton.prototype.clone = function (name, id) {
        var result = new Skeleton(name, id || name, this._scene);
        result.needInitialSkinMatrix = this.needInitialSkinMatrix;
        for (var index = 0; index < this.bones.length; index++) {
            var source = this.bones[index];
            var parentBone = null;
            var parent_1 = source.getParent();
            if (parent_1) {
                var parentIndex = this.bones.indexOf(parent_1);
                parentBone = result.bones[parentIndex];
            }
            var bone = new Bone(source.name, result, parentBone, source.getBaseMatrix().clone(), source.getRestPose().clone());
            bone._index = source._index;
            if (source._linkedTransformNode) {
                bone.linkTransformNode(source._linkedTransformNode);
            }
            DeepCopier.DeepCopy(source.animations, bone.animations);
        }
        if (this._ranges) {
            result._ranges = {};
            for (var rangeName in this._ranges) {
                var range = this._ranges[rangeName];
                if (range) {
                    result._ranges[rangeName] = range.clone();
                }
            }
        }
        this._isDirty = true;
        return result;
    };
    /**
     * Enable animation blending for this skeleton
     * @param blendingSpeed defines the blending speed to apply
     * @see https://doc.babylonjs.com/babylon101/animations#animation-blending
     */
    Skeleton.prototype.enableBlending = function (blendingSpeed) {
        if (blendingSpeed === void 0) { blendingSpeed = 0.01; }
        this.bones.forEach(function (bone) {
            bone.animations.forEach(function (animation) {
                animation.enableBlending = true;
                animation.blendingSpeed = blendingSpeed;
            });
        });
    };
    /**
     * Releases all resources associated with the current skeleton
     */
    Skeleton.prototype.dispose = function () {
        this._meshesWithPoseMatrix = [];
        // Animations
        this.getScene().stopAnimation(this);
        // Remove from scene
        this.getScene().removeSkeleton(this);
        if (this._parentContainer) {
            var index = this._parentContainer.skeletons.indexOf(this);
            if (index > -1) {
                this._parentContainer.skeletons.splice(index, 1);
            }
            this._parentContainer = null;
        }
        if (this._transformMatrixTexture) {
            this._transformMatrixTexture.dispose();
            this._transformMatrixTexture = null;
        }
    };
    /**
     * Serialize the skeleton in a JSON object
     * @returns a JSON object
     */
    Skeleton.prototype.serialize = function () {
        var _a;
        var serializationObject = {};
        serializationObject.name = this.name;
        serializationObject.id = this.id;
        if (this.dimensionsAtRest) {
            serializationObject.dimensionsAtRest = this.dimensionsAtRest.asArray();
        }
        serializationObject.bones = [];
        serializationObject.needInitialSkinMatrix = this.needInitialSkinMatrix;
        for (var index = 0; index < this.bones.length; index++) {
            var bone = this.bones[index];
            var parent_2 = bone.getParent();
            var serializedBone = {
                parentBoneIndex: parent_2 ? this.bones.indexOf(parent_2) : -1,
                index: bone.getIndex(),
                name: bone.name,
                id: bone.id,
                matrix: bone.getBaseMatrix().toArray(),
                rest: bone.getRestPose().toArray(),
                linkedTransformNodeId: (_a = bone.getTransformNode()) === null || _a === void 0 ? void 0 : _a.id,
            };
            serializationObject.bones.push(serializedBone);
            if (bone.length) {
                serializedBone.length = bone.length;
            }
            if (bone.metadata) {
                serializedBone.metadata = bone.metadata;
            }
            if (bone.animations && bone.animations.length > 0) {
                serializedBone.animation = bone.animations[0].serialize();
            }
            serializationObject.ranges = [];
            for (var name_2 in this._ranges) {
                var source = this._ranges[name_2];
                if (!source) {
                    continue;
                }
                var range = {};
                range.name = name_2;
                range.from = source.from;
                range.to = source.to;
                serializationObject.ranges.push(range);
            }
        }
        return serializationObject;
    };
    /**
     * Creates a new skeleton from serialized data
     * @param parsedSkeleton defines the serialized data
     * @param scene defines the hosting scene
     * @returns a new skeleton
     */
    Skeleton.Parse = function (parsedSkeleton, scene) {
        var skeleton = new Skeleton(parsedSkeleton.name, parsedSkeleton.id, scene);
        if (parsedSkeleton.dimensionsAtRest) {
            skeleton.dimensionsAtRest = Vector3.FromArray(parsedSkeleton.dimensionsAtRest);
        }
        skeleton.needInitialSkinMatrix = parsedSkeleton.needInitialSkinMatrix;
        var index;
        for (index = 0; index < parsedSkeleton.bones.length; index++) {
            var parsedBone = parsedSkeleton.bones[index];
            var parsedBoneIndex = parsedSkeleton.bones[index].index;
            var parentBone = null;
            if (parsedBone.parentBoneIndex > -1) {
                parentBone = skeleton.bones[parsedBone.parentBoneIndex];
            }
            var rest = parsedBone.rest ? Matrix.FromArray(parsedBone.rest) : null;
            var bone = new Bone(parsedBone.name, skeleton, parentBone, Matrix.FromArray(parsedBone.matrix), rest, null, parsedBoneIndex);
            if (parsedBone.id !== undefined && parsedBone.id !== null) {
                bone.id = parsedBone.id;
            }
            if (parsedBone.length) {
                bone.length = parsedBone.length;
            }
            if (parsedBone.metadata) {
                bone.metadata = parsedBone.metadata;
            }
            if (parsedBone.animation) {
                bone.animations.push(Animation.Parse(parsedBone.animation));
            }
            if (parsedBone.linkedTransformNodeId !== undefined && parsedBone.linkedTransformNodeId !== null) {
                skeleton._hasWaitingData = true;
                bone._waitingTransformNodeId = parsedBone.linkedTransformNodeId;
            }
        }
        // placed after bones, so createAnimationRange can cascade down
        if (parsedSkeleton.ranges) {
            for (index = 0; index < parsedSkeleton.ranges.length; index++) {
                var data = parsedSkeleton.ranges[index];
                skeleton.createAnimationRange(data.name, data.from, data.to);
            }
        }
        return skeleton;
    };
    /**
     * Compute all node absolute transforms
     * @param forceUpdate defines if computation must be done even if cache is up to date
     */
    Skeleton.prototype.computeAbsoluteTransforms = function (forceUpdate) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        if (this._absoluteTransformIsDirty || forceUpdate) {
            this.bones[0].computeAbsoluteTransforms();
            this._absoluteTransformIsDirty = false;
        }
    };
    /**
     * Gets the root pose matrix
     * @returns a matrix
     */
    Skeleton.prototype.getPoseMatrix = function () {
        var poseMatrix = null;
        if (this._meshesWithPoseMatrix.length > 0) {
            poseMatrix = this._meshesWithPoseMatrix[0].getPoseMatrix();
        }
        return poseMatrix;
    };
    /**
     * Sorts bones per internal index
     */
    Skeleton.prototype.sortBones = function () {
        var bones = new Array();
        var visited = new Array(this.bones.length);
        for (var index = 0; index < this.bones.length; index++) {
            this._sortBones(index, bones, visited);
        }
        this.bones = bones;
    };
    Skeleton.prototype._sortBones = function (index, bones, visited) {
        if (visited[index]) {
            return;
        }
        visited[index] = true;
        var bone = this.bones[index];
        if (!bone)
            return;
        if (bone._index === undefined) {
            bone._index = index;
        }
        var parentBone = bone.getParent();
        if (parentBone) {
            this._sortBones(this.bones.indexOf(parentBone), bones, visited);
        }
        bones.push(bone);
    };
    /**
     * Set the current local matrix as the restPose for all bones in the skeleton.
     */
    Skeleton.prototype.setCurrentPoseAsRest = function () {
        this.bones.forEach(function (b) {
            b.setCurrentPoseAsRest();
        });
    };
    return Skeleton;
}());

export { Skeleton };
