import { a as __extends, _ as __decorate, d as __awaiter, c as __generator } from './tslib.es6-2542203d.js';
import { S as SerializationHelper, s as serialize, b as serializeAsTexture } from './decorators-549f2b16.js';
import { O as Observable } from './observable-08535f24.js';
import { M as Matrix, V as Vector3, T as TmpVectors } from './math.vector-92740b4e.js';
import { E as EngineStore } from './engineStore-733743e8.js';
import { R as RandomGUID, I as InstantiationTools } from './guid-586031d9.js';
import { T as TimingTools } from './fileTools-e883e409.js';
import { S as Size } from './math.size-6da31c23.js';
import { R as RegisterClass, G as GetClass } from './typeStore-e0f83823.js';
import { _ as _WarnImport } from './devTools-40c203e4.js';
import { P as Plane } from './math.plane-b261e683.js';
import { E as EncodeArrayBufferToBase64 } from './stringTools-39526e6b.js';
import { C as CompatibilityOptions } from './compatibilityOptions-4310763a.js';

/**
 * Base class of all the textures in babylon.
 * It groups all the common properties required to work with Thin Engine.
 */
var ThinTexture = /** @class */ (function () {
    /**
     * Instantiates a new ThinTexture.
     * Base class of all the textures in babylon.
     * This can be used as an internal texture wrapper in ThinEngine to benefit from the cache
     * @param internalTexture Define the internalTexture to wrap
     */
    function ThinTexture(internalTexture) {
        this._wrapU = 1;
        this._wrapV = 1;
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        this.wrapR = 1;
        /**
         * With compliant hardware and browser (supporting anisotropic filtering)
         * this defines the level of anisotropic filtering in the texture.
         * The higher the better but the slower. This defaults to 4 as it seems to be the best tradeoff.
         */
        this.anisotropicFilteringLevel = 4;
        /**
         * Define the current state of the loading sequence when in delayed load mode.
         */
        this.delayLoadState = 0;
        /** @hidden */
        this._texture = null;
        this._engine = null;
        this._cachedSize = Size.Zero();
        this._cachedBaseSize = Size.Zero();
        /** @hidden */
        this._initialSamplingMode = 2;
        this._texture = internalTexture;
        if (this._texture) {
            this._engine = this._texture.getEngine();
        }
    }
    Object.defineProperty(ThinTexture.prototype, "wrapU", {
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        get: function () {
            return this._wrapU;
        },
        set: function (value) {
            this._wrapU = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThinTexture.prototype, "wrapV", {
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        get: function () {
            return this._wrapV;
        },
        set: function (value) {
            this._wrapV = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThinTexture.prototype, "coordinatesMode", {
        /**
         * How a texture is mapped.
         * Unused in thin texture mode.
         */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThinTexture.prototype, "isCube", {
        /**
         * Define if the texture is a cube texture or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return false;
            }
            return this._texture.isCube;
        },
        set: function (value) {
            if (!this._texture) {
                return;
            }
            this._texture.isCube = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThinTexture.prototype, "is3D", {
        /**
         * Define if the texture is a 3d texture (webgl 2) or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return false;
            }
            return this._texture.is3D;
        },
        set: function (value) {
            if (!this._texture) {
                return;
            }
            this._texture.is3D = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThinTexture.prototype, "is2DArray", {
        /**
         * Define if the texture is a 2d array texture (webgl 2) or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return false;
            }
            return this._texture.is2DArray;
        },
        set: function (value) {
            if (!this._texture) {
                return;
            }
            this._texture.is2DArray = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the class name of the texture.
     * @returns "ThinTexture"
     */
    ThinTexture.prototype.getClassName = function () {
        return "ThinTexture";
    };
    /**
     * Get if the texture is ready to be used (downloaded, converted, mip mapped...).
     * @returns true if fully ready
     */
    ThinTexture.prototype.isReady = function () {
        if (this.delayLoadState === 4) {
            this.delayLoad();
            return false;
        }
        if (this._texture) {
            return this._texture.isReady;
        }
        return false;
    };
    /**
     * Triggers the load sequence in delayed load mode.
     */
    ThinTexture.prototype.delayLoad = function () { };
    /**
     * Get the underlying lower level texture from Babylon.
     * @returns the internal texture
     */
    ThinTexture.prototype.getInternalTexture = function () {
        return this._texture;
    };
    /**
     * Get the size of the texture.
     * @returns the texture size.
     */
    ThinTexture.prototype.getSize = function () {
        if (this._texture) {
            if (this._texture.width) {
                this._cachedSize.width = this._texture.width;
                this._cachedSize.height = this._texture.height;
                return this._cachedSize;
            }
            if (this._texture._size) {
                this._cachedSize.width = this._texture._size;
                this._cachedSize.height = this._texture._size;
                return this._cachedSize;
            }
        }
        return this._cachedSize;
    };
    /**
     * Get the base size of the texture.
     * It can be different from the size if the texture has been resized for POT for instance
     * @returns the base size
     */
    ThinTexture.prototype.getBaseSize = function () {
        if (!this.isReady() || !this._texture) {
            this._cachedBaseSize.width = 0;
            this._cachedBaseSize.height = 0;
            return this._cachedBaseSize;
        }
        if (this._texture._size) {
            this._cachedBaseSize.width = this._texture._size;
            this._cachedBaseSize.height = this._texture._size;
            return this._cachedBaseSize;
        }
        this._cachedBaseSize.width = this._texture.baseWidth;
        this._cachedBaseSize.height = this._texture.baseHeight;
        return this._cachedBaseSize;
    };
    Object.defineProperty(ThinTexture.prototype, "samplingMode", {
        /**
         * Get the current sampling mode associated with the texture.
         */
        get: function () {
            if (!this._texture) {
                return this._initialSamplingMode;
            }
            return this._texture.samplingMode;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Update the sampling mode of the texture.
     * Default is Trilinear mode.
     *
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 1     | NEAREST_SAMPLINGMODE or NEAREST_NEAREST_MIPLINEAR  | Nearest is: mag = nearest, min = nearest, mip = linear |
     * | 2     | BILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPNEAREST | Bilinear is: mag = linear, min = linear, mip = nearest |
     * | 3     | TRILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPLINEAR | Trilinear is: mag = linear, min = linear, mip = linear |
     * | 4     | NEAREST_NEAREST_MIPNEAREST |             |
     * | 5    | NEAREST_LINEAR_MIPNEAREST |             |
     * | 6    | NEAREST_LINEAR_MIPLINEAR |             |
     * | 7    | NEAREST_LINEAR |             |
     * | 8    | NEAREST_NEAREST |             |
     * | 9   | LINEAR_NEAREST_MIPNEAREST |             |
     * | 10   | LINEAR_NEAREST_MIPLINEAR |             |
     * | 11   | LINEAR_LINEAR |             |
     * | 12   | LINEAR_NEAREST |             |
     *
     *    > _mag_: magnification filter (close to the viewer)
     *    > _min_: minification filter (far from the viewer)
     *    > _mip_: filter used between mip map levels
     *@param samplingMode Define the new sampling mode of the texture
     */
    ThinTexture.prototype.updateSamplingMode = function (samplingMode) {
        if (this._texture && this._engine) {
            this._engine.updateTextureSamplingMode(samplingMode, this._texture);
        }
    };
    /**
     * Release and destroy the underlying lower level texture aka internalTexture.
     */
    ThinTexture.prototype.releaseInternalTexture = function () {
        if (this._texture) {
            this._texture.dispose();
            this._texture = null;
        }
    };
    /**
     * Dispose the texture and release its associated resources.
     */
    ThinTexture.prototype.dispose = function () {
        if (this._texture) {
            this.releaseInternalTexture();
            this._engine = null;
        }
    };
    return ThinTexture;
}());

/**
 * Base class of all the textures in babylon.
 * It groups all the common properties the materials, post process, lights... might need
 * in order to make a correct use of the texture.
 */
var BaseTexture = /** @class */ (function (_super) {
    __extends(BaseTexture, _super);
    /**
     * Instantiates a new BaseTexture.
     * Base class of all the textures in babylon.
     * It groups all the common properties the materials, post process, lights... might need
     * in order to make a correct use of the texture.
     * @param sceneOrEngine Define the scene or engine the texture belongs to
     */
    function BaseTexture(sceneOrEngine) {
        var _this = _super.call(this, null) || this;
        /**
         * Gets or sets an object used to store user defined information.
         */
        _this.metadata = null;
        /**
         * For internal use only. Please do not use.
         */
        _this.reservedDataStore = null;
        _this._hasAlpha = false;
        _this._getAlphaFromRGB = false;
        /**
         * Intensity or strength of the texture.
         * It is commonly used by materials to fine tune the intensity of the texture
         */
        _this.level = 1;
        _this._coordinatesIndex = 0;
        _this._coordinatesMode = 0;
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        _this.wrapR = 1;
        /**
         * With compliant hardware and browser (supporting anisotropic filtering)
         * this defines the level of anisotropic filtering in the texture.
         * The higher the better but the slower. This defaults to 4 as it seems to be the best tradeoff.
         */
        _this.anisotropicFilteringLevel = BaseTexture.DEFAULT_ANISOTROPIC_FILTERING_LEVEL;
        _this._isCube = false;
        _this._gammaSpace = true;
        /**
         * Is Z inverted in the texture (useful in a cube texture).
         */
        _this.invertZ = false;
        /**
         * @hidden
         */
        _this.lodLevelInAlpha = false;
        /**
         * Define if the texture is a render target.
         */
        _this.isRenderTarget = false;
        /** @hidden */
        _this._prefiltered = false;
        /** @hidden */
        _this._forceSerialize = false;
        /**
         * Define the list of animation attached to the texture.
         */
        _this.animations = new Array();
        /**
         * An event triggered when the texture is disposed.
         */
        _this.onDisposeObservable = new Observable();
        _this._onDisposeObserver = null;
        _this._scene = null;
        /** @hidden */
        _this._uid = null;
        /** @hidden */
        _this._parentContainer = null;
        _this._loadingError = false;
        if (sceneOrEngine) {
            if (BaseTexture._IsScene(sceneOrEngine)) {
                _this._scene = sceneOrEngine;
            }
            else {
                _this._engine = sceneOrEngine;
            }
        }
        else {
            _this._scene = EngineStore.LastCreatedScene;
        }
        if (_this._scene) {
            _this.uniqueId = _this._scene.getUniqueId();
            _this._scene.addTexture(_this);
            _this._engine = _this._scene.getEngine();
        }
        _this._uid = null;
        return _this;
    }
    Object.defineProperty(BaseTexture.prototype, "hasAlpha", {
        get: function () {
            return this._hasAlpha;
        },
        /**
         * Define if the texture is having a usable alpha value (can be use for transparency or glossiness for instance).
         */
        set: function (value) {
            var _this = this;
            if (this._hasAlpha === value) {
                return;
            }
            this._hasAlpha = value;
            if (this._scene) {
                this._scene.markAllMaterialsAsDirty(1, function (mat) {
                    return mat.hasTexture(_this);
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "getAlphaFromRGB", {
        get: function () {
            return this._getAlphaFromRGB;
        },
        /**
         * Defines if the alpha value should be determined via the rgb values.
         * If true the luminance of the pixel might be used to find the corresponding alpha value.
         */
        set: function (value) {
            var _this = this;
            if (this._getAlphaFromRGB === value) {
                return;
            }
            this._getAlphaFromRGB = value;
            if (this._scene) {
                this._scene.markAllMaterialsAsDirty(1, function (mat) {
                    return mat.hasTexture(_this);
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "coordinatesIndex", {
        get: function () {
            return this._coordinatesIndex;
        },
        /**
         * Define the UV channel to use starting from 0 and defaulting to 0.
         * This is part of the texture as textures usually maps to one uv set.
         */
        set: function (value) {
            var _this = this;
            if (this._coordinatesIndex === value) {
                return;
            }
            this._coordinatesIndex = value;
            if (this._scene) {
                this._scene.markAllMaterialsAsDirty(1, function (mat) {
                    return mat.hasTexture(_this);
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "coordinatesMode", {
        get: function () {
            return this._coordinatesMode;
        },
        /**
         * How a texture is mapped.
         *
         * | Value | Type                                | Description |
         * | ----- | ----------------------------------- | ----------- |
         * | 0     | EXPLICIT_MODE                       |             |
         * | 1     | SPHERICAL_MODE                      |             |
         * | 2     | PLANAR_MODE                         |             |
         * | 3     | CUBIC_MODE                          |             |
         * | 4     | PROJECTION_MODE                     |             |
         * | 5     | SKYBOX_MODE                         |             |
         * | 6     | INVCUBIC_MODE                       |             |
         * | 7     | EQUIRECTANGULAR_MODE                |             |
         * | 8     | FIXED_EQUIRECTANGULAR_MODE          |             |
         * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |             |
         */
        set: function (value) {
            var _this = this;
            if (this._coordinatesMode === value) {
                return;
            }
            this._coordinatesMode = value;
            if (this._scene) {
                this._scene.markAllMaterialsAsDirty(1, function (mat) {
                    return mat.hasTexture(_this);
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "wrapU", {
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        get: function () {
            return this._wrapU;
        },
        set: function (value) {
            this._wrapU = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "wrapV", {
        /**
         * | Value | Type               | Description |
         * | ----- | ------------------ | ----------- |
         * | 0     | CLAMP_ADDRESSMODE  |             |
         * | 1     | WRAP_ADDRESSMODE   |             |
         * | 2     | MIRROR_ADDRESSMODE |             |
         */
        get: function () {
            return this._wrapV;
        },
        set: function (value) {
            this._wrapV = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "isCube", {
        /**
         * Define if the texture is a cube texture or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return this._isCube;
            }
            return this._texture.isCube;
        },
        set: function (value) {
            if (!this._texture) {
                this._isCube = value;
            }
            else {
                this._texture.isCube = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "is3D", {
        /**
         * Define if the texture is a 3d texture (webgl 2) or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return false;
            }
            return this._texture.is3D;
        },
        set: function (value) {
            if (!this._texture) {
                return;
            }
            this._texture.is3D = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "is2DArray", {
        /**
         * Define if the texture is a 2d array texture (webgl 2) or if false a 2d texture.
         */
        get: function () {
            if (!this._texture) {
                return false;
            }
            return this._texture.is2DArray;
        },
        set: function (value) {
            if (!this._texture) {
                return;
            }
            this._texture.is2DArray = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "gammaSpace", {
        /**
         * Define if the texture contains data in gamma space (most of the png/jpg aside bump).
         * HDR texture are usually stored in linear space.
         * This only impacts the PBR and Background materials
         */
        get: function () {
            if (!this._texture) {
                return this._gammaSpace;
            }
            else {
                if (this._texture._gammaSpace === null) {
                    this._texture._gammaSpace = this._gammaSpace;
                }
            }
            return this._texture._gammaSpace && !this._texture._useSRGBBuffer;
        },
        set: function (gamma) {
            if (!this._texture) {
                if (this._gammaSpace === gamma) {
                    return;
                }
                this._gammaSpace = gamma;
            }
            else {
                if (this._texture._gammaSpace === gamma) {
                    return;
                }
                this._texture._gammaSpace = gamma;
            }
            this._markAllSubMeshesAsTexturesDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "isRGBD", {
        /**
         * Gets or sets whether or not the texture contains RGBD data.
         */
        get: function () {
            return this._texture != null && this._texture._isRGBD;
        },
        set: function (value) {
            if (this._texture) {
                this._texture._isRGBD = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "noMipmap", {
        /**
         * Are mip maps generated for this texture or not.
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "lodGenerationOffset", {
        /**
         * With prefiltered texture, defined the offset used during the prefiltering steps.
         */
        get: function () {
            if (this._texture) {
                return this._texture._lodGenerationOffset;
            }
            return 0.0;
        },
        set: function (value) {
            if (this._texture) {
                this._texture._lodGenerationOffset = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "lodGenerationScale", {
        /**
         * With prefiltered texture, defined the scale used during the prefiltering steps.
         */
        get: function () {
            if (this._texture) {
                return this._texture._lodGenerationScale;
            }
            return 0.0;
        },
        set: function (value) {
            if (this._texture) {
                this._texture._lodGenerationScale = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "linearSpecularLOD", {
        /**
         * With prefiltered texture, defined if the specular generation is based on a linear ramp.
         * By default we are using a log2 of the linear roughness helping to keep a better resolution for
         * average roughness values.
         */
        get: function () {
            if (this._texture) {
                return this._texture._linearSpecularLOD;
            }
            return false;
        },
        set: function (value) {
            if (this._texture) {
                this._texture._linearSpecularLOD = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "irradianceTexture", {
        /**
         * In case a better definition than spherical harmonics is required for the diffuse part of the environment.
         * You can set the irradiance texture to rely on a texture instead of the spherical approach.
         * This texture need to have the same characteristics than its parent (Cube vs 2d, coordinates mode, Gamma/Linear, RGBD).
         */
        get: function () {
            if (this._texture) {
                return this._texture._irradianceTexture;
            }
            return null;
        },
        set: function (value) {
            if (this._texture) {
                this._texture._irradianceTexture = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "uid", {
        /**
         * Define the unique id of the texture in the scene.
         */
        get: function () {
            if (!this._uid) {
                this._uid = RandomGUID();
            }
            return this._uid;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return a string representation of the texture.
     * @returns the texture as a string
     */
    BaseTexture.prototype.toString = function () {
        return this.name;
    };
    /**
     * Get the class name of the texture.
     * @returns "BaseTexture"
     */
    BaseTexture.prototype.getClassName = function () {
        return "BaseTexture";
    };
    Object.defineProperty(BaseTexture.prototype, "onDispose", {
        /**
         * Callback triggered when the texture has been disposed.
         * Kept for back compatibility, you can use the onDisposeObservable instead.
         */
        set: function (callback) {
            if (this._onDisposeObserver) {
                this.onDisposeObservable.remove(this._onDisposeObserver);
            }
            this._onDisposeObserver = this.onDisposeObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "isBlocking", {
        /**
         * Define if the texture is preventing a material to render or not.
         * If not and the texture is not ready, the engine will use a default black texture instead.
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "loadingError", {
        /**
         * Was there any loading error?
         */
        get: function () {
            return this._loadingError;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "errorObject", {
        /**
         * If a loading error occurred this object will be populated with information about the error.
         */
        get: function () {
            return this._errorObject;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the scene the texture belongs to.
     * @returns the scene or null if undefined
     */
    BaseTexture.prototype.getScene = function () {
        return this._scene;
    };
    /** @hidden */
    BaseTexture.prototype._getEngine = function () {
        return this._engine;
    };
    /**
     * Checks if the texture has the same transform matrix than another texture
     * @param texture texture to check against
     * @returns true if the transforms are the same, else false
     */
    BaseTexture.prototype.checkTransformsAreIdentical = function (texture) {
        return texture !== null;
    };
    /**
     * Get the texture transform matrix used to offset tile the texture for instance.
     * @returns the transformation matrix
     */
    BaseTexture.prototype.getTextureMatrix = function () {
        return Matrix.IdentityReadOnly;
    };
    /**
     * Get the texture reflection matrix used to rotate/transform the reflection.
     * @returns the reflection matrix
     */
    BaseTexture.prototype.getReflectionTextureMatrix = function () {
        return Matrix.IdentityReadOnly;
    };
    /**
     * Get if the texture is ready to be consumed (either it is ready or it is not blocking)
     * @returns true if ready, not blocking or if there was an error loading the texture
     */
    BaseTexture.prototype.isReadyOrNotBlocking = function () {
        return !this.isBlocking || this.isReady() || this.loadingError;
    };
    /**
     * Scales the texture if is `canRescale()`
     * @param ratio the resize factor we want to use to rescale
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BaseTexture.prototype.scale = function (ratio) { };
    Object.defineProperty(BaseTexture.prototype, "canRescale", {
        /**
         * Get if the texture can rescale.
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param url
     * @param noMipmap
     * @param sampling
     * @param invertY
     * @param useSRGBBuffer
     * @param isCube
     * @hidden
     */
    BaseTexture.prototype._getFromCache = function (url, noMipmap, sampling, invertY, useSRGBBuffer, isCube) {
        var engine = this._getEngine();
        if (!engine) {
            return null;
        }
        var correctedUseSRGBBuffer = engine._getUseSRGBBuffer(!!useSRGBBuffer, noMipmap);
        var texturesCache = engine.getLoadedTexturesCache();
        for (var index = 0; index < texturesCache.length; index++) {
            var texturesCacheEntry = texturesCache[index];
            if (useSRGBBuffer === undefined || correctedUseSRGBBuffer === texturesCacheEntry._useSRGBBuffer) {
                if (invertY === undefined || invertY === texturesCacheEntry.invertY) {
                    if (texturesCacheEntry.url === url && texturesCacheEntry.generateMipMaps === !noMipmap) {
                        if (!sampling || sampling === texturesCacheEntry.samplingMode) {
                            if (isCube === undefined || isCube === texturesCacheEntry.isCube) {
                                texturesCacheEntry.incrementReferences();
                                return texturesCacheEntry;
                            }
                        }
                    }
                }
            }
        }
        return null;
    };
    /** @hidden */
    BaseTexture.prototype._rebuild = function () { };
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    BaseTexture.prototype.clone = function () {
        return null;
    };
    Object.defineProperty(BaseTexture.prototype, "textureType", {
        /**
         * Get the texture underlying type (INT, FLOAT...)
         */
        get: function () {
            if (!this._texture) {
                return 0;
            }
            return this._texture.type !== undefined ? this._texture.type : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "textureFormat", {
        /**
         * Get the texture underlying format (RGB, RGBA...)
         */
        get: function () {
            if (!this._texture) {
                return 5;
            }
            return this._texture.format !== undefined ? this._texture.format : 5;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Indicates that textures need to be re-calculated for all materials
     */
    BaseTexture.prototype._markAllSubMeshesAsTexturesDirty = function () {
        var scene = this.getScene();
        if (!scene) {
            return;
        }
        scene.markAllMaterialsAsDirty(1);
    };
    /**
     * Reads the pixels stored in the webgl texture and returns them as an ArrayBuffer.
     * This will returns an RGBA array buffer containing either in values (0-255) or
     * float values (0-1) depending of the underlying buffer type.
     * @param faceIndex defines the face of the texture to read (in case of cube texture)
     * @param level defines the LOD level of the texture to read (in case of Mip Maps)
     * @param buffer defines a user defined buffer to fill with data (can be null)
     * @param flushRenderer true to flush the renderer from the pending commands before reading the pixels
     * @param noDataConversion false to convert the data to Uint8Array (if texture type is UNSIGNED_BYTE) or to Float32Array (if texture type is anything but UNSIGNED_BYTE). If true, the type of the generated buffer (if buffer==null) will depend on the type of the texture
     * @param x defines the region x coordinates to start reading from (default to 0)
     * @param y defines the region y coordinates to start reading from (default to 0)
     * @param width defines the region width to read from (default to the texture size at level)
     * @param height defines the region width to read from (default to the texture size at level)
     * @returns The Array buffer promise containing the pixels data.
     */
    BaseTexture.prototype.readPixels = function (faceIndex, level, buffer, flushRenderer, noDataConversion, x, y, width, height) {
        if (faceIndex === void 0) { faceIndex = 0; }
        if (level === void 0) { level = 0; }
        if (buffer === void 0) { buffer = null; }
        if (flushRenderer === void 0) { flushRenderer = true; }
        if (noDataConversion === void 0) { noDataConversion = false; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = Number.MAX_VALUE; }
        if (height === void 0) { height = Number.MAX_VALUE; }
        if (!this._texture) {
            return null;
        }
        var engine = this._getEngine();
        if (!engine) {
            return null;
        }
        var size = this.getSize();
        var maxWidth = size.width;
        var maxHeight = size.height;
        if (level !== 0) {
            maxWidth = maxWidth / Math.pow(2, level);
            maxHeight = maxHeight / Math.pow(2, level);
            maxWidth = Math.round(maxWidth);
            maxHeight = Math.round(maxHeight);
        }
        width = Math.min(maxWidth, width);
        height = Math.min(maxHeight, height);
        try {
            if (this._texture.isCube) {
                return engine._readTexturePixels(this._texture, width, height, faceIndex, level, buffer, flushRenderer, noDataConversion, x, y);
            }
            return engine._readTexturePixels(this._texture, width, height, -1, level, buffer, flushRenderer, noDataConversion, x, y);
        }
        catch (e) {
            return null;
        }
    };
    /**
     * @param faceIndex
     * @param level
     * @param buffer
     * @param flushRenderer
     * @param noDataConversion
     * @hidden
     */
    BaseTexture.prototype._readPixelsSync = function (faceIndex, level, buffer, flushRenderer, noDataConversion) {
        if (faceIndex === void 0) { faceIndex = 0; }
        if (level === void 0) { level = 0; }
        if (buffer === void 0) { buffer = null; }
        if (flushRenderer === void 0) { flushRenderer = true; }
        if (noDataConversion === void 0) { noDataConversion = false; }
        if (!this._texture) {
            return null;
        }
        var size = this.getSize();
        var width = size.width;
        var height = size.height;
        var engine = this._getEngine();
        if (!engine) {
            return null;
        }
        if (level != 0) {
            width = width / Math.pow(2, level);
            height = height / Math.pow(2, level);
            width = Math.round(width);
            height = Math.round(height);
        }
        try {
            if (this._texture.isCube) {
                return engine._readTexturePixelsSync(this._texture, width, height, faceIndex, level, buffer, flushRenderer, noDataConversion);
            }
            return engine._readTexturePixelsSync(this._texture, width, height, -1, level, buffer, flushRenderer, noDataConversion);
        }
        catch (e) {
            return null;
        }
    };
    Object.defineProperty(BaseTexture.prototype, "_lodTextureHigh", {
        /** @hidden */
        get: function () {
            if (this._texture) {
                return this._texture._lodTextureHigh;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "_lodTextureMid", {
        /** @hidden */
        get: function () {
            if (this._texture) {
                return this._texture._lodTextureMid;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "_lodTextureLow", {
        /** @hidden */
        get: function () {
            if (this._texture) {
                return this._texture._lodTextureLow;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Dispose the texture and release its associated resources.
     */
    BaseTexture.prototype.dispose = function () {
        if (this._scene) {
            // Animations
            if (this._scene.stopAnimation) {
                this._scene.stopAnimation(this);
            }
            // Remove from scene
            this._scene.removePendingData(this);
            var index = this._scene.textures.indexOf(this);
            if (index >= 0) {
                this._scene.textures.splice(index, 1);
            }
            this._scene.onTextureRemovedObservable.notifyObservers(this);
            this._scene = null;
            if (this._parentContainer) {
                var index_1 = this._parentContainer.textures.indexOf(this);
                if (index_1 > -1) {
                    this._parentContainer.textures.splice(index_1, 1);
                }
                this._parentContainer = null;
            }
        }
        // Callback
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
        this.metadata = null;
        _super.prototype.dispose.call(this);
    };
    /**
     * Serialize the texture into a JSON representation that can be parsed later on.
     * @returns the JSON representation of the texture
     */
    BaseTexture.prototype.serialize = function () {
        if (!this.name) {
            return null;
        }
        var serializationObject = SerializationHelper.Serialize(this);
        // Animations
        SerializationHelper.AppendSerializedAnimations(this, serializationObject);
        return serializationObject;
    };
    /**
     * Helper function to be called back once a list of texture contains only ready textures.
     * @param textures Define the list of textures to wait for
     * @param callback Define the callback triggered once the entire list will be ready
     */
    BaseTexture.WhenAllReady = function (textures, callback) {
        var numRemaining = textures.length;
        if (numRemaining === 0) {
            callback();
            return;
        }
        for (var i = 0; i < textures.length; i++) {
            var texture = textures[i];
            if (texture.isReady()) {
                if (--numRemaining === 0) {
                    callback();
                }
            }
            else {
                var onLoadObservable = texture.onLoadObservable;
                if (onLoadObservable) {
                    onLoadObservable.addOnce(function () {
                        if (--numRemaining === 0) {
                            callback();
                        }
                    });
                }
                else {
                    if (--numRemaining === 0) {
                        callback();
                    }
                }
            }
        }
    };
    BaseTexture._IsScene = function (sceneOrEngine) {
        return sceneOrEngine.getClassName() === "Scene";
    };
    /**
     * Default anisotropic filtering level for the application.
     * It is set to 4 as a good tradeoff between perf and quality.
     */
    BaseTexture.DEFAULT_ANISOTROPIC_FILTERING_LEVEL = 4;
    __decorate([
        serialize()
    ], BaseTexture.prototype, "uniqueId", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "name", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "metadata", void 0);
    __decorate([
        serialize("hasAlpha")
    ], BaseTexture.prototype, "_hasAlpha", void 0);
    __decorate([
        serialize("getAlphaFromRGB")
    ], BaseTexture.prototype, "_getAlphaFromRGB", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "level", void 0);
    __decorate([
        serialize("coordinatesIndex")
    ], BaseTexture.prototype, "_coordinatesIndex", void 0);
    __decorate([
        serialize("coordinatesMode")
    ], BaseTexture.prototype, "_coordinatesMode", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "wrapU", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "wrapV", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "wrapR", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "anisotropicFilteringLevel", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "isCube", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "is3D", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "is2DArray", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "gammaSpace", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "invertZ", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "lodLevelInAlpha", void 0);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "lodGenerationOffset", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "lodGenerationScale", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "linearSpecularLOD", null);
    __decorate([
        serializeAsTexture()
    ], BaseTexture.prototype, "irradianceTexture", null);
    __decorate([
        serialize()
    ], BaseTexture.prototype, "isRenderTarget", void 0);
    return BaseTexture;
}(ThinTexture));

/**
 * Transform some pixel data to a base64 string
 * @param pixels defines the pixel data to transform to base64
 * @param size defines the width and height of the (texture) data
 * @param invertY true if the data must be inverted for the Y coordinate during the conversion
 * @returns The base64 encoded string or null
 */
function GenerateBase64StringFromPixelData(pixels, size, invertY) {
    if (invertY === void 0) { invertY = false; }
    var width = size.width;
    var height = size.height;
    if (pixels instanceof Float32Array) {
        var len = pixels.byteLength / pixels.BYTES_PER_ELEMENT;
        var npixels = new Uint8Array(len);
        while (--len >= 0) {
            var val = pixels[len];
            if (val < 0) {
                val = 0;
            }
            else if (val > 1) {
                val = 1;
            }
            npixels[len] = val * 255;
        }
        pixels = npixels;
    }
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    if (!ctx) {
        return null;
    }
    var imageData = ctx.createImageData(width, height);
    var castData = imageData.data;
    castData.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    if (invertY) {
        var canvas2 = document.createElement("canvas");
        canvas2.width = width;
        canvas2.height = height;
        var ctx2 = canvas2.getContext("2d");
        if (!ctx2) {
            return null;
        }
        ctx2.translate(0, height);
        ctx2.scale(1, -1);
        ctx2.drawImage(canvas, 0, 0);
        return canvas2.toDataURL("image/png");
    }
    return canvas.toDataURL("image/png");
}
/**
 * Reads the pixels stored in the webgl texture and returns them as a base64 string
 * @param texture defines the texture to read pixels from
 * @param faceIndex defines the face of the texture to read (in case of cube texture)
 * @param level defines the LOD level of the texture to read (in case of Mip Maps)
 * @returns The base64 encoded string or null
 */
function GenerateBase64StringFromTexture(texture, faceIndex, level) {
    if (faceIndex === void 0) { faceIndex = 0; }
    if (level === void 0) { level = 0; }
    var internalTexture = texture.getInternalTexture();
    if (!internalTexture) {
        return null;
    }
    var pixels = texture._readPixelsSync(faceIndex, level);
    if (!pixels) {
        return null;
    }
    return GenerateBase64StringFromPixelData(pixels, texture.getSize(), internalTexture.invertY);
}
/**
 * Reads the pixels stored in the webgl texture and returns them as a base64 string
 * @param texture defines the texture to read pixels from
 * @param faceIndex defines the face of the texture to read (in case of cube texture)
 * @param level defines the LOD level of the texture to read (in case of Mip Maps)
 * @returns The base64 encoded string or null wrapped in a promise
 */
function GenerateBase64StringFromTextureAsync(texture, faceIndex, level) {
    if (faceIndex === void 0) { faceIndex = 0; }
    if (level === void 0) { level = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var internalTexture, pixels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    internalTexture = texture.getInternalTexture();
                    if (!internalTexture) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, texture.readPixels(faceIndex, level)];
                case 1:
                    pixels = _a.sent();
                    if (!pixels) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, GenerateBase64StringFromPixelData(pixels, texture.getSize(), internalTexture.invertY)];
            }
        });
    });
}

/**
 * This represents a texture in babylon. It can be easily loaded from a network, base64 or html input.
 * @see https://doc.babylonjs.com/babylon101/materials#texture
 */
var Texture = /** @class */ (function (_super) {
    __extends(Texture, _super);
    /**
     * Instantiates a new texture.
     * This represents a texture in babylon. It can be easily loaded from a network, base64 or html input.
     * @see https://doc.babylonjs.com/babylon101/materials#texture
     * @param url defines the url of the picture to load as a texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY defines if the texture needs to be inverted on the y axis during loading
     * @param samplingMode defines the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad defines a callback triggered when the texture has been loaded
     * @param onError defines a callback triggered when an error occurred during the loading session
     * @param buffer defines the buffer to load the texture from in case the texture is loaded from a buffer representation
     * @param deleteBuffer defines if the buffer we are loading the texture from should be deleted after load
     * @param format defines the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param mimeType defines an optional mime type information
     * @param loaderOptions options to be passed to the loader
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @param forcedExtension defines the extension to use to pick the right loader
     */
    function Texture(url, sceneOrEngine, noMipmapOrOptions, invertY, samplingMode, onLoad, onError, buffer, deleteBuffer, format, mimeType, loaderOptions, creationFlags, forcedExtension) {
        if (samplingMode === void 0) { samplingMode = Texture.TRILINEAR_SAMPLINGMODE; }
        if (onLoad === void 0) { onLoad = null; }
        if (onError === void 0) { onError = null; }
        if (buffer === void 0) { buffer = null; }
        if (deleteBuffer === void 0) { deleteBuffer = false; }
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        _this = _super.call(this, sceneOrEngine) || this;
        /**
         * Define the url of the texture.
         */
        _this.url = null;
        /**
         * Define an offset on the texture to offset the u coordinates of the UVs
         * @see https://doc.babylonjs.com/how_to/more_materials#offsetting
         */
        _this.uOffset = 0;
        /**
         * Define an offset on the texture to offset the v coordinates of the UVs
         * @see https://doc.babylonjs.com/how_to/more_materials#offsetting
         */
        _this.vOffset = 0;
        /**
         * Define an offset on the texture to scale the u coordinates of the UVs
         * @see https://doc.babylonjs.com/how_to/more_materials#tiling
         */
        _this.uScale = 1.0;
        /**
         * Define an offset on the texture to scale the v coordinates of the UVs
         * @see https://doc.babylonjs.com/how_to/more_materials#tiling
         */
        _this.vScale = 1.0;
        /**
         * Define an offset on the texture to rotate around the u coordinates of the UVs
         * The angle is defined in radians.
         * @see https://doc.babylonjs.com/how_to/more_materials
         */
        _this.uAng = 0;
        /**
         * Define an offset on the texture to rotate around the v coordinates of the UVs
         * The angle is defined in radians.
         * @see https://doc.babylonjs.com/how_to/more_materials
         */
        _this.vAng = 0;
        /**
         * Define an offset on the texture to rotate around the w coordinates of the UVs (in case of 3d texture)
         * The angle is defined in radians.
         * @see https://doc.babylonjs.com/how_to/more_materials
         */
        _this.wAng = 0;
        /**
         * Defines the center of rotation (U)
         */
        _this.uRotationCenter = 0.5;
        /**
         * Defines the center of rotation (V)
         */
        _this.vRotationCenter = 0.5;
        /**
         * Defines the center of rotation (W)
         */
        _this.wRotationCenter = 0.5;
        /**
         * Sets this property to true to avoid deformations when rotating the texture with non-uniform scaling
         */
        _this.homogeneousRotationInUVTransform = false;
        /**
         * List of inspectable custom properties (used by the Inspector)
         * @see https://doc.babylonjs.com/how_to/debug_layer#extensibility
         */
        _this.inspectableCustomProperties = null;
        _this._noMipmap = false;
        /** @hidden */
        _this._invertY = false;
        _this._rowGenerationMatrix = null;
        _this._cachedTextureMatrix = null;
        _this._projectionModeMatrix = null;
        _this._t0 = null;
        _this._t1 = null;
        _this._t2 = null;
        _this._cachedUOffset = -1;
        _this._cachedVOffset = -1;
        _this._cachedUScale = 0;
        _this._cachedVScale = 0;
        _this._cachedUAng = -1;
        _this._cachedVAng = -1;
        _this._cachedWAng = -1;
        _this._cachedProjectionMatrixId = -1;
        _this._cachedURotationCenter = -1;
        _this._cachedVRotationCenter = -1;
        _this._cachedWRotationCenter = -1;
        _this._cachedHomogeneousRotationInUVTransform = false;
        _this._cachedCoordinatesMode = -1;
        /** @hidden */
        _this._buffer = null;
        _this._deleteBuffer = false;
        _this._format = null;
        _this._delayedOnLoad = null;
        _this._delayedOnError = null;
        /**
         * Observable triggered once the texture has been loaded.
         */
        _this.onLoadObservable = new Observable();
        _this._isBlocking = true;
        _this.name = url || "";
        _this.url = url;
        var noMipmap;
        var useSRGBBuffer = false;
        var internalTexture = null;
        if (typeof noMipmapOrOptions === "object" && noMipmapOrOptions !== null) {
            noMipmap = (_a = noMipmapOrOptions.noMipmap) !== null && _a !== void 0 ? _a : false;
            invertY = (_b = noMipmapOrOptions.invertY) !== null && _b !== void 0 ? _b : (CompatibilityOptions.UseOpenGLOrientationForUV ? false : true);
            samplingMode = (_c = noMipmapOrOptions.samplingMode) !== null && _c !== void 0 ? _c : Texture.TRILINEAR_SAMPLINGMODE;
            onLoad = (_d = noMipmapOrOptions.onLoad) !== null && _d !== void 0 ? _d : null;
            onError = (_e = noMipmapOrOptions.onError) !== null && _e !== void 0 ? _e : null;
            buffer = (_f = noMipmapOrOptions.buffer) !== null && _f !== void 0 ? _f : null;
            deleteBuffer = (_g = noMipmapOrOptions.deleteBuffer) !== null && _g !== void 0 ? _g : false;
            format = noMipmapOrOptions.format;
            mimeType = noMipmapOrOptions.mimeType;
            loaderOptions = noMipmapOrOptions.loaderOptions;
            creationFlags = noMipmapOrOptions.creationFlags;
            useSRGBBuffer = (_h = noMipmapOrOptions.useSRGBBuffer) !== null && _h !== void 0 ? _h : false;
            internalTexture = (_j = noMipmapOrOptions.internalTexture) !== null && _j !== void 0 ? _j : null;
        }
        else {
            noMipmap = !!noMipmapOrOptions;
        }
        _this._noMipmap = noMipmap;
        _this._invertY = invertY === undefined ? (CompatibilityOptions.UseOpenGLOrientationForUV ? false : true) : invertY;
        _this._initialSamplingMode = samplingMode;
        _this._buffer = buffer;
        _this._deleteBuffer = deleteBuffer;
        _this._mimeType = mimeType;
        _this._loaderOptions = loaderOptions;
        _this._creationFlags = creationFlags;
        _this._useSRGBBuffer = useSRGBBuffer;
        _this._forcedExtension = forcedExtension;
        if (format) {
            _this._format = format;
        }
        var scene = _this.getScene();
        var engine = _this._getEngine();
        if (!engine) {
            return _this;
        }
        engine.onBeforeTextureInitObservable.notifyObservers(_this);
        var load = function () {
            if (_this._texture) {
                if (_this._texture._invertVScale) {
                    _this.vScale *= -1;
                    _this.vOffset += 1;
                }
                // Update texture to match internal texture's wrapping
                if (_this._texture._cachedWrapU !== null) {
                    _this.wrapU = _this._texture._cachedWrapU;
                    _this._texture._cachedWrapU = null;
                }
                if (_this._texture._cachedWrapV !== null) {
                    _this.wrapV = _this._texture._cachedWrapV;
                    _this._texture._cachedWrapV = null;
                }
                if (_this._texture._cachedWrapR !== null) {
                    _this.wrapR = _this._texture._cachedWrapR;
                    _this._texture._cachedWrapR = null;
                }
            }
            if (_this.onLoadObservable.hasObservers()) {
                _this.onLoadObservable.notifyObservers(_this);
            }
            if (onLoad) {
                onLoad();
            }
            if (!_this.isBlocking && scene) {
                scene.resetCachedMaterial();
            }
        };
        var errorHandler = function (message, exception) {
            _this._loadingError = true;
            _this._errorObject = { message: message, exception: exception };
            if (onError) {
                onError(message, exception);
            }
            Texture.OnTextureLoadErrorObservable.notifyObservers(_this);
        };
        if (!_this.url) {
            _this._delayedOnLoad = load;
            _this._delayedOnError = errorHandler;
            return _this;
        }
        _this._texture = internalTexture !== null && internalTexture !== void 0 ? internalTexture : _this._getFromCache(_this.url, noMipmap, samplingMode, _this._invertY, useSRGBBuffer);
        if (!_this._texture) {
            if (!scene || !scene.useDelayedTextureLoading) {
                try {
                    _this._texture = engine.createTexture(_this.url, noMipmap, _this._invertY, scene, samplingMode, load, errorHandler, _this._buffer, undefined, _this._format, _this._forcedExtension, mimeType, loaderOptions, creationFlags, useSRGBBuffer);
                }
                catch (e) {
                    errorHandler("error loading", e);
                    throw e;
                }
                if (deleteBuffer) {
                    _this._buffer = null;
                }
            }
            else {
                _this.delayLoadState = 4;
                _this._delayedOnLoad = load;
                _this._delayedOnError = errorHandler;
            }
        }
        else {
            if (_this._texture.isReady) {
                TimingTools.SetImmediate(function () { return load(); });
            }
            else {
                var loadObserver_1 = _this._texture.onLoadedObservable.add(load);
                _this._texture.onErrorObservable.add(function (e) {
                    var _a;
                    errorHandler(e.message, e.exception);
                    (_a = _this._texture) === null || _a === void 0 ? void 0 : _a.onLoadedObservable.remove(loadObserver_1);
                });
            }
        }
        return _this;
    }
    Object.defineProperty(Texture.prototype, "noMipmap", {
        /**
         * Are mip maps generated for this texture or not.
         */
        get: function () {
            return this._noMipmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "mimeType", {
        /** Returns the texture mime type if it was defined by a loader (undefined else) */
        get: function () {
            return this._mimeType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "isBlocking", {
        get: function () {
            return this._isBlocking;
        },
        /**
         * Is the texture preventing material to render while loading.
         * If false, a default texture will be used instead of the loading one during the preparation step.
         */
        set: function (value) {
            this._isBlocking = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "invertY", {
        /**
         * Gets a boolean indicating if the texture needs to be inverted on the y axis during loading
         */
        get: function () {
            return this._invertY;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Update the url (and optional buffer) of this texture if url was null during construction.
     * @param url the url of the texture
     * @param buffer the buffer of the texture (defaults to null)
     * @param onLoad callback called when the texture is loaded  (defaults to null)
     * @param forcedExtension defines the extension to use to pick the right loader
     */
    Texture.prototype.updateURL = function (url, buffer, onLoad, forcedExtension) {
        if (buffer === void 0) { buffer = null; }
        if (this.url) {
            this.releaseInternalTexture();
            this.getScene().markAllMaterialsAsDirty(1);
        }
        if (!this.name || this.name.startsWith("data:")) {
            this.name = url;
        }
        this.url = url;
        this._buffer = buffer;
        this._forcedExtension = forcedExtension;
        this.delayLoadState = 4;
        if (onLoad) {
            this._delayedOnLoad = onLoad;
        }
        this.delayLoad();
    };
    /**
     * Finish the loading sequence of a texture flagged as delayed load.
     * @hidden
     */
    Texture.prototype.delayLoad = function () {
        if (this.delayLoadState !== 4) {
            return;
        }
        var scene = this.getScene();
        if (!scene) {
            return;
        }
        this.delayLoadState = 1;
        this._texture = this._getFromCache(this.url, this._noMipmap, this.samplingMode, this._invertY, this._useSRGBBuffer);
        if (!this._texture) {
            this._texture = scene
                .getEngine()
                .createTexture(this.url, this._noMipmap, this._invertY, scene, this.samplingMode, this._delayedOnLoad, this._delayedOnError, this._buffer, null, this._format, this._forcedExtension, this._mimeType, this._loaderOptions, this._creationFlags, this._useSRGBBuffer);
            if (this._deleteBuffer) {
                this._buffer = null;
            }
        }
        else {
            if (this._delayedOnLoad) {
                if (this._texture.isReady) {
                    TimingTools.SetImmediate(this._delayedOnLoad);
                }
                else {
                    this._texture.onLoadedObservable.add(this._delayedOnLoad);
                }
            }
        }
        this._delayedOnLoad = null;
        this._delayedOnError = null;
    };
    Texture.prototype._prepareRowForTextureGeneration = function (x, y, z, t) {
        x *= this._cachedUScale;
        y *= this._cachedVScale;
        x -= this.uRotationCenter * this._cachedUScale;
        y -= this.vRotationCenter * this._cachedVScale;
        z -= this.wRotationCenter;
        Vector3.TransformCoordinatesFromFloatsToRef(x, y, z, this._rowGenerationMatrix, t);
        t.x += this.uRotationCenter * this._cachedUScale + this._cachedUOffset;
        t.y += this.vRotationCenter * this._cachedVScale + this._cachedVOffset;
        t.z += this.wRotationCenter;
    };
    /**
     * Checks if the texture has the same transform matrix than another texture
     * @param texture texture to check against
     * @returns true if the transforms are the same, else false
     */
    Texture.prototype.checkTransformsAreIdentical = function (texture) {
        return (texture !== null &&
            this.uOffset === texture.uOffset &&
            this.vOffset === texture.vOffset &&
            this.uScale === texture.uScale &&
            this.vScale === texture.vScale &&
            this.uAng === texture.uAng &&
            this.vAng === texture.vAng &&
            this.wAng === texture.wAng);
    };
    /**
     * Get the current texture matrix which includes the requested offsetting, tiling and rotation components.
     * @param uBase
     * @returns the transform matrix of the texture.
     */
    Texture.prototype.getTextureMatrix = function (uBase) {
        var _this = this;
        if (uBase === void 0) { uBase = 1; }
        if (this.uOffset === this._cachedUOffset &&
            this.vOffset === this._cachedVOffset &&
            this.uScale * uBase === this._cachedUScale &&
            this.vScale === this._cachedVScale &&
            this.uAng === this._cachedUAng &&
            this.vAng === this._cachedVAng &&
            this.wAng === this._cachedWAng &&
            this.uRotationCenter === this._cachedURotationCenter &&
            this.vRotationCenter === this._cachedVRotationCenter &&
            this.wRotationCenter === this._cachedWRotationCenter &&
            this.homogeneousRotationInUVTransform === this._cachedHomogeneousRotationInUVTransform) {
            return this._cachedTextureMatrix;
        }
        this._cachedUOffset = this.uOffset;
        this._cachedVOffset = this.vOffset;
        this._cachedUScale = this.uScale * uBase;
        this._cachedVScale = this.vScale;
        this._cachedUAng = this.uAng;
        this._cachedVAng = this.vAng;
        this._cachedWAng = this.wAng;
        this._cachedURotationCenter = this.uRotationCenter;
        this._cachedVRotationCenter = this.vRotationCenter;
        this._cachedWRotationCenter = this.wRotationCenter;
        this._cachedHomogeneousRotationInUVTransform = this.homogeneousRotationInUVTransform;
        if (!this._cachedTextureMatrix || !this._rowGenerationMatrix) {
            this._cachedTextureMatrix = Matrix.Zero();
            this._rowGenerationMatrix = new Matrix();
            this._t0 = Vector3.Zero();
            this._t1 = Vector3.Zero();
            this._t2 = Vector3.Zero();
        }
        Matrix.RotationYawPitchRollToRef(this.vAng, this.uAng, this.wAng, this._rowGenerationMatrix);
        if (this.homogeneousRotationInUVTransform) {
            Matrix.TranslationToRef(-this._cachedURotationCenter, -this._cachedVRotationCenter, -this._cachedWRotationCenter, TmpVectors.Matrix[0]);
            Matrix.TranslationToRef(this._cachedURotationCenter, this._cachedVRotationCenter, this._cachedWRotationCenter, TmpVectors.Matrix[1]);
            Matrix.ScalingToRef(this._cachedUScale, this._cachedVScale, 0, TmpVectors.Matrix[2]);
            Matrix.TranslationToRef(this._cachedUOffset, this._cachedVOffset, 0, TmpVectors.Matrix[3]);
            TmpVectors.Matrix[0].multiplyToRef(this._rowGenerationMatrix, this._cachedTextureMatrix);
            this._cachedTextureMatrix.multiplyToRef(TmpVectors.Matrix[1], this._cachedTextureMatrix);
            this._cachedTextureMatrix.multiplyToRef(TmpVectors.Matrix[2], this._cachedTextureMatrix);
            this._cachedTextureMatrix.multiplyToRef(TmpVectors.Matrix[3], this._cachedTextureMatrix);
            // copy the translation row to the 3rd row of the matrix so that we don't need to update the shaders (which expects the translation to be on the 3rd row)
            this._cachedTextureMatrix.setRowFromFloats(2, this._cachedTextureMatrix.m[12], this._cachedTextureMatrix.m[13], this._cachedTextureMatrix.m[14], 1);
        }
        else {
            this._prepareRowForTextureGeneration(0, 0, 0, this._t0);
            this._prepareRowForTextureGeneration(1.0, 0, 0, this._t1);
            this._prepareRowForTextureGeneration(0, 1.0, 0, this._t2);
            this._t1.subtractInPlace(this._t0);
            this._t2.subtractInPlace(this._t0);
            Matrix.FromValuesToRef(this._t1.x, this._t1.y, this._t1.z, 0.0, this._t2.x, this._t2.y, this._t2.z, 0.0, this._t0.x, this._t0.y, this._t0.z, 0.0, 0.0, 0.0, 0.0, 1.0, this._cachedTextureMatrix);
        }
        var scene = this.getScene();
        if (!scene) {
            return this._cachedTextureMatrix;
        }
        // We flag the materials that are using this texture as "texture dirty" because depending on the fact that the matrix is the identity or not, some defines
        // will get different values (see MaterialHelper.PrepareDefinesForMergedUV), meaning we should regenerate the effect accordingly
        scene.markAllMaterialsAsDirty(1, function (mat) {
            return mat.hasTexture(_this);
        });
        return this._cachedTextureMatrix;
    };
    /**
     * Get the current matrix used to apply reflection. This is useful to rotate an environment texture for instance.
     * @returns The reflection texture transform
     */
    Texture.prototype.getReflectionTextureMatrix = function () {
        var _this = this;
        var scene = this.getScene();
        if (!scene) {
            return this._cachedTextureMatrix;
        }
        if (this.uOffset === this._cachedUOffset &&
            this.vOffset === this._cachedVOffset &&
            this.uScale === this._cachedUScale &&
            this.vScale === this._cachedVScale &&
            this.coordinatesMode === this._cachedCoordinatesMode) {
            if (this.coordinatesMode === Texture.PROJECTION_MODE) {
                if (this._cachedProjectionMatrixId === scene.getProjectionMatrix().updateFlag) {
                    return this._cachedTextureMatrix;
                }
            }
            else {
                return this._cachedTextureMatrix;
            }
        }
        if (!this._cachedTextureMatrix) {
            this._cachedTextureMatrix = Matrix.Zero();
        }
        if (!this._projectionModeMatrix) {
            this._projectionModeMatrix = Matrix.Zero();
        }
        var flagMaterialsAsTextureDirty = this._cachedCoordinatesMode !== this.coordinatesMode;
        this._cachedUOffset = this.uOffset;
        this._cachedVOffset = this.vOffset;
        this._cachedUScale = this.uScale;
        this._cachedVScale = this.vScale;
        this._cachedCoordinatesMode = this.coordinatesMode;
        switch (this.coordinatesMode) {
            case Texture.PLANAR_MODE: {
                Matrix.IdentityToRef(this._cachedTextureMatrix);
                this._cachedTextureMatrix[0] = this.uScale;
                this._cachedTextureMatrix[5] = this.vScale;
                this._cachedTextureMatrix[12] = this.uOffset;
                this._cachedTextureMatrix[13] = this.vOffset;
                break;
            }
            case Texture.PROJECTION_MODE: {
                Matrix.FromValuesToRef(0.5, 0.0, 0.0, 0.0, 0.0, -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, this._projectionModeMatrix);
                var projectionMatrix = scene.getProjectionMatrix();
                this._cachedProjectionMatrixId = projectionMatrix.updateFlag;
                projectionMatrix.multiplyToRef(this._projectionModeMatrix, this._cachedTextureMatrix);
                break;
            }
            default:
                Matrix.IdentityToRef(this._cachedTextureMatrix);
                break;
        }
        if (flagMaterialsAsTextureDirty) {
            // We flag the materials that are using this texture as "texture dirty" if the coordinatesMode has changed.
            // Indeed, this property is used to set the value of some defines used to generate the effect (in material.isReadyForSubMesh), so we must make sure this code will be re-executed and the effect recreated if necessary
            scene.markAllMaterialsAsDirty(1, function (mat) {
                return mat.getActiveTextures().indexOf(_this) !== -1;
            });
        }
        return this._cachedTextureMatrix;
    };
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    Texture.prototype.clone = function () {
        var _this = this;
        var options = {
            noMipmap: this._noMipmap,
            invertY: this._invertY,
            samplingMode: this.samplingMode,
            onLoad: undefined,
            onError: undefined,
            buffer: this._texture ? this._texture._buffer : undefined,
            deleteBuffer: this._deleteBuffer,
            format: this.textureFormat,
            mimeType: this.mimeType,
            loaderOptions: this._loaderOptions,
            creationFlags: this._creationFlags,
            useSRGBBuffer: this._useSRGBBuffer,
        };
        return SerializationHelper.Clone(function () {
            return new Texture(_this._texture ? _this._texture.url : null, _this.getScene(), options);
        }, this);
    };
    /**
     * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
     * @returns The JSON representation of the texture
     */
    Texture.prototype.serialize = function () {
        var savedName = this.name;
        if (!Texture.SerializeBuffers) {
            if (this.name.startsWith("data:")) {
                this.name = "";
            }
        }
        if (this.name.startsWith("data:") && this.url === this.name) {
            this.url = "";
        }
        var serializationObject = _super.prototype.serialize.call(this);
        if (!serializationObject) {
            return null;
        }
        if (Texture.SerializeBuffers || Texture.ForceSerializeBuffers) {
            if (typeof this._buffer === "string" && this._buffer.substr(0, 5) === "data:") {
                serializationObject.base64String = this._buffer;
                serializationObject.name = serializationObject.name.replace("data:", "");
            }
            else if (this.url && this.url.startsWith("data:") && this._buffer instanceof Uint8Array) {
                serializationObject.base64String = "data:image/png;base64," + EncodeArrayBufferToBase64(this._buffer);
            }
            else if (Texture.ForceSerializeBuffers || (this.url && this.url.startsWith("blob:")) || this._forceSerialize) {
                serializationObject.base64String =
                    !this._engine || this._engine._features.supportSyncTextureRead ? GenerateBase64StringFromTexture(this) : GenerateBase64StringFromTextureAsync(this);
            }
        }
        serializationObject.invertY = this._invertY;
        serializationObject.samplingMode = this.samplingMode;
        serializationObject._creationFlags = this._creationFlags;
        serializationObject._useSRGBBuffer = this._useSRGBBuffer;
        this.name = savedName;
        return serializationObject;
    };
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "Texture"
     */
    Texture.prototype.getClassName = function () {
        return "Texture";
    };
    /**
     * Dispose the texture and release its associated resources.
     */
    Texture.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.onLoadObservable.clear();
        this._delayedOnLoad = null;
        this._delayedOnError = null;
    };
    /**
     * Parse the JSON representation of a texture in order to recreate the texture in the given scene.
     * @param parsedTexture Define the JSON representation of the texture
     * @param scene Define the scene the parsed texture should be instantiated in
     * @param rootUrl Define the root url of the parsing sequence in the case of relative dependencies
     * @returns The parsed texture if successful
     */
    Texture.Parse = function (parsedTexture, scene, rootUrl) {
        if (parsedTexture.customType) {
            var customTexture = InstantiationTools.Instantiate(parsedTexture.customType);
            // Update Sampling Mode
            var parsedCustomTexture = customTexture.Parse(parsedTexture, scene, rootUrl);
            if (parsedTexture.samplingMode && parsedCustomTexture.updateSamplingMode && parsedCustomTexture._samplingMode) {
                if (parsedCustomTexture._samplingMode !== parsedTexture.samplingMode) {
                    parsedCustomTexture.updateSamplingMode(parsedTexture.samplingMode);
                }
            }
            return parsedCustomTexture;
        }
        if (parsedTexture.isCube && !parsedTexture.isRenderTarget) {
            return Texture._CubeTextureParser(parsedTexture, scene, rootUrl);
        }
        if (!parsedTexture.name && !parsedTexture.isRenderTarget) {
            return null;
        }
        var onLoaded = function () {
            // Clear cache
            if (texture && texture._texture) {
                texture._texture._cachedWrapU = null;
                texture._texture._cachedWrapV = null;
                texture._texture._cachedWrapR = null;
            }
            // Update Sampling Mode
            if (parsedTexture.samplingMode) {
                var sampling = parsedTexture.samplingMode;
                if (texture && texture.samplingMode !== sampling) {
                    texture.updateSamplingMode(sampling);
                }
            }
            // Animations
            if (texture && parsedTexture.animations) {
                for (var animationIndex = 0; animationIndex < parsedTexture.animations.length; animationIndex++) {
                    var parsedAnimation = parsedTexture.animations[animationIndex];
                    var internalClass = GetClass("BABYLON.Animation");
                    if (internalClass) {
                        texture.animations.push(internalClass.Parse(parsedAnimation));
                    }
                }
            }
        };
        var texture = SerializationHelper.Parse(function () {
            var _a, _b, _c;
            var generateMipMaps = true;
            if (parsedTexture.noMipmap) {
                generateMipMaps = false;
            }
            if (parsedTexture.mirrorPlane) {
                var mirrorTexture = Texture._CreateMirror(parsedTexture.name, parsedTexture.renderTargetSize, scene, generateMipMaps);
                mirrorTexture._waitingRenderList = parsedTexture.renderList;
                mirrorTexture.mirrorPlane = Plane.FromArray(parsedTexture.mirrorPlane);
                onLoaded();
                return mirrorTexture;
            }
            else if (parsedTexture.isRenderTarget) {
                var renderTargetTexture = null;
                if (parsedTexture.isCube) {
                    // Search for an existing reflection probe (which contains a cube render target texture)
                    if (scene.reflectionProbes) {
                        for (var index = 0; index < scene.reflectionProbes.length; index++) {
                            var probe = scene.reflectionProbes[index];
                            if (probe.name === parsedTexture.name) {
                                return probe.cubeTexture;
                            }
                        }
                    }
                }
                else {
                    renderTargetTexture = Texture._CreateRenderTargetTexture(parsedTexture.name, parsedTexture.renderTargetSize, scene, generateMipMaps, (_a = parsedTexture._creationFlags) !== null && _a !== void 0 ? _a : 0);
                    renderTargetTexture._waitingRenderList = parsedTexture.renderList;
                }
                onLoaded();
                return renderTargetTexture;
            }
            else {
                var texture_1;
                if (parsedTexture.base64String) {
                    texture_1 = Texture.CreateFromBase64String(parsedTexture.base64String, parsedTexture.name, scene, !generateMipMaps, parsedTexture.invertY, parsedTexture.samplingMode, onLoaded, (_b = parsedTexture._creationFlags) !== null && _b !== void 0 ? _b : 0, (_c = parsedTexture._useSRGBBuffer) !== null && _c !== void 0 ? _c : false);
                }
                else {
                    var url = void 0;
                    if (parsedTexture.name && parsedTexture.name.indexOf("://") > 0) {
                        url = parsedTexture.name;
                    }
                    else {
                        url = rootUrl + parsedTexture.name;
                    }
                    if (parsedTexture.url && (parsedTexture.url.startsWith("data:") || Texture.UseSerializedUrlIfAny)) {
                        url = parsedTexture.url;
                    }
                    texture_1 = new Texture(url, scene, !generateMipMaps, parsedTexture.invertY, parsedTexture.samplingMode, onLoaded);
                }
                return texture_1;
            }
        }, parsedTexture, scene);
        return texture;
    };
    /**
     * Creates a texture from its base 64 representation.
     * @param data Define the base64 payload without the data: prefix
     * @param name Define the name of the texture in the scene useful fo caching purpose for instance
     * @param scene Define the scene the texture should belong to
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY define if the texture needs to be inverted on the y axis during loading
     * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad define a callback triggered when the texture has been loaded
     * @param onError define a callback triggered when an error occurred during the loading session
     * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @returns the created texture
     */
    Texture.CreateFromBase64String = function (data, name, scene, noMipmapOrOptions, invertY, samplingMode, onLoad, onError, format, creationFlags) {
        if (samplingMode === void 0) { samplingMode = Texture.TRILINEAR_SAMPLINGMODE; }
        if (onLoad === void 0) { onLoad = null; }
        if (onError === void 0) { onError = null; }
        if (format === void 0) { format = 5; }
        return new Texture("data:" + name, scene, noMipmapOrOptions, invertY, samplingMode, onLoad, onError, data, false, format, undefined, undefined, creationFlags);
    };
    /**
     * Creates a texture from its data: representation. (data: will be added in case only the payload has been passed in)
     * @param name Define the name of the texture in the scene useful fo caching purpose for instance
     * @param buffer define the buffer to load the texture from in case the texture is loaded from a buffer representation
     * @param scene Define the scene the texture should belong to
     * @param deleteBuffer define if the buffer we are loading the texture from should be deleted after load
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY define if the texture needs to be inverted on the y axis during loading
     * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad define a callback triggered when the texture has been loaded
     * @param onError define a callback triggered when an error occurred during the loading session
     * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
     * @returns the created texture
     */
    Texture.LoadFromDataString = function (name, buffer, scene, deleteBuffer, noMipmapOrOptions, invertY, samplingMode, onLoad, onError, format, creationFlags) {
        if (deleteBuffer === void 0) { deleteBuffer = false; }
        if (invertY === void 0) { invertY = true; }
        if (samplingMode === void 0) { samplingMode = Texture.TRILINEAR_SAMPLINGMODE; }
        if (onLoad === void 0) { onLoad = null; }
        if (onError === void 0) { onError = null; }
        if (format === void 0) { format = 5; }
        if (name.substr(0, 5) !== "data:") {
            name = "data:" + name;
        }
        return new Texture(name, scene, noMipmapOrOptions, invertY, samplingMode, onLoad, onError, buffer, deleteBuffer, format, undefined, undefined, creationFlags);
    };
    /**
     * Gets or sets a general boolean used to indicate that textures containing direct data (buffers) must be saved as part of the serialization process
     */
    Texture.SerializeBuffers = true;
    /**
     * Gets or sets a general boolean used to indicate that texture buffers must be saved as part of the serialization process.
     * If no buffer exists, one will be created as base64 string from the internal webgl data.
     */
    Texture.ForceSerializeBuffers = false;
    /**
     * This observable will notify when any texture had a loading error
     */
    Texture.OnTextureLoadErrorObservable = new Observable();
    /**
     * @param jsonTexture
     * @param scene
     * @param rootUrl
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Texture._CubeTextureParser = function (jsonTexture, scene, rootUrl) {
        throw _WarnImport("CubeTexture");
    };
    /**
     * @param name
     * @param renderTargetSize
     * @param scene
     * @param generateMipMaps
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Texture._CreateMirror = function (name, renderTargetSize, scene, generateMipMaps) {
        throw _WarnImport("MirrorTexture");
    };
    /**
     * @param name
     * @param renderTargetSize
     * @param scene
     * @param generateMipMaps
     * @param creationFlags
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Texture._CreateRenderTargetTexture = function (name, renderTargetSize, scene, generateMipMaps, creationFlags) {
        throw _WarnImport("RenderTargetTexture");
    };
    /** nearest is mag = nearest and min = nearest and mip = linear */
    Texture.NEAREST_SAMPLINGMODE = 1;
    /** nearest is mag = nearest and min = nearest and mip = linear */
    Texture.NEAREST_NEAREST_MIPLINEAR = 8; // nearest is mag = nearest and min = nearest and mip = linear
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    Texture.BILINEAR_SAMPLINGMODE = 2;
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    Texture.LINEAR_LINEAR_MIPNEAREST = 11; // Bilinear is mag = linear and min = linear and mip = nearest
    /** Trilinear is mag = linear and min = linear and mip = linear */
    Texture.TRILINEAR_SAMPLINGMODE = 3;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    Texture.LINEAR_LINEAR_MIPLINEAR = 3; // Trilinear is mag = linear and min = linear and mip = linear
    /** mag = nearest and min = nearest and mip = nearest */
    Texture.NEAREST_NEAREST_MIPNEAREST = 4;
    /** mag = nearest and min = linear and mip = nearest */
    Texture.NEAREST_LINEAR_MIPNEAREST = 5;
    /** mag = nearest and min = linear and mip = linear */
    Texture.NEAREST_LINEAR_MIPLINEAR = 6;
    /** mag = nearest and min = linear and mip = none */
    Texture.NEAREST_LINEAR = 7;
    /** mag = nearest and min = nearest and mip = none */
    Texture.NEAREST_NEAREST = 1;
    /** mag = linear and min = nearest and mip = nearest */
    Texture.LINEAR_NEAREST_MIPNEAREST = 9;
    /** mag = linear and min = nearest and mip = linear */
    Texture.LINEAR_NEAREST_MIPLINEAR = 10;
    /** mag = linear and min = linear and mip = none */
    Texture.LINEAR_LINEAR = 2;
    /** mag = linear and min = nearest and mip = none */
    Texture.LINEAR_NEAREST = 12;
    /** Explicit coordinates mode */
    Texture.EXPLICIT_MODE = 0;
    /** Spherical coordinates mode */
    Texture.SPHERICAL_MODE = 1;
    /** Planar coordinates mode */
    Texture.PLANAR_MODE = 2;
    /** Cubic coordinates mode */
    Texture.CUBIC_MODE = 3;
    /** Projection coordinates mode */
    Texture.PROJECTION_MODE = 4;
    /** Inverse Cubic coordinates mode */
    Texture.SKYBOX_MODE = 5;
    /** Inverse Cubic coordinates mode */
    Texture.INVCUBIC_MODE = 6;
    /** Equirectangular coordinates mode */
    Texture.EQUIRECTANGULAR_MODE = 7;
    /** Equirectangular Fixed coordinates mode */
    Texture.FIXED_EQUIRECTANGULAR_MODE = 8;
    /** Equirectangular Fixed Mirrored coordinates mode */
    Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
    /** Texture is not repeating outside of 0..1 UVs */
    Texture.CLAMP_ADDRESSMODE = 0;
    /** Texture is repeating outside of 0..1 UVs */
    Texture.WRAP_ADDRESSMODE = 1;
    /** Texture is repeating and mirrored */
    Texture.MIRROR_ADDRESSMODE = 2;
    /**
     * Gets or sets a boolean which defines if the texture url must be build from the serialized URL instead of just using the name and loading them side by side with the scene file
     */
    Texture.UseSerializedUrlIfAny = false;
    __decorate([
        serialize()
    ], Texture.prototype, "url", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "uOffset", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "vOffset", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "uScale", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "vScale", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "uAng", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "vAng", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "wAng", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "uRotationCenter", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "vRotationCenter", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "wRotationCenter", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "homogeneousRotationInUVTransform", void 0);
    __decorate([
        serialize()
    ], Texture.prototype, "isBlocking", null);
    return Texture;
}(BaseTexture));
// References the dependencies.
RegisterClass("BABYLON.Texture", Texture);
SerializationHelper._TextureParser = Texture.Parse;

export { BaseTexture as B, Texture as T };
