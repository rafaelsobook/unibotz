import { _ as __decorate, a as __extends, b as __assign } from './tslib.es6-2542203d.js';
import { T as Tools, P as PrecisionDate } from './tools-7eb5c69a.js';
import { O as Observable } from './observable-08535f24.js';
import { S as SmartArrayNoDuplicate, a as SmartArray } from './smartArray-23f1522f.js';
import { S as SerializationHelper, s as serialize, a as serializeAsColorCurves, b as serializeAsTexture, c as serializeAsColor4, T as Tags } from './decorators-549f2b16.js';
import { a as Vector2, M as Matrix, T as TmpVectors, V as Vector3 } from './math.vector-92740b4e.js';
import { a as Color4, C as Color3 } from './math.color-1c350db4.js';
import { U as UniformBuffer } from './uniformBuffer-c6105a9c.js';
import { P as PickingInfo } from './pickingInfo-2221fa52.js';
import { R as RenderingManager, P as PostProcessManager } from './renderingManager-0400bd4b.js';
import { D as DomManagement, I as IsWindowObjectExist } from './effect-95a5a78c.js';
import { E as EngineStore } from './engineStore-733743e8.js';
import { _ as _WarnImport } from './devTools-40c203e4.js';
import { E as EventConstants, P as PointerEventTypes, a as PointerInfo, b as PointerInfoPre, K as KeyboardInfoPre, c as KeyboardInfo, d as KeyboardEventTypes } from './deviceInputEvents-42cd30dd.js';
import { P as PerfCounter } from './perfCounter-0abcf648.js';
import { F as Frustum } from './math.frustum-eeb481de.js';
import { L as LoadFile, R as RequestFile, a as ReadFile } from './fileTools-e883e409.js';
import { L as LightConstants } from './lightConstants-574d2608.js';

/**
 * Base class of the scene acting as a container for the different elements composing a scene.
 * This class is dynamically extended by the different components of the scene increasing
 * flexibility and reducing coupling
 */
var AbstractScene = /** @class */ (function () {
    function AbstractScene() {
        /**
         * Gets the list of root nodes (ie. nodes with no parent)
         */
        this.rootNodes = new Array();
        /** All of the cameras added to this scene
         * @see https://doc.babylonjs.com/babylon101/cameras
         */
        this.cameras = new Array();
        /**
         * All of the lights added to this scene
         * @see https://doc.babylonjs.com/babylon101/lights
         */
        this.lights = new Array();
        /**
         * All of the (abstract) meshes added to this scene
         */
        this.meshes = new Array();
        /**
         * The list of skeletons added to the scene
         * @see https://doc.babylonjs.com/how_to/how_to_use_bones_and_skeletons
         */
        this.skeletons = new Array();
        /**
         * All of the particle systems added to this scene
         * @see https://doc.babylonjs.com/babylon101/particles
         */
        this.particleSystems = new Array();
        /**
         * Gets a list of Animations associated with the scene
         */
        this.animations = [];
        /**
         * All of the animation groups added to this scene
         * @see https://doc.babylonjs.com/divingDeeper/animation/groupAnimations
         */
        this.animationGroups = new Array();
        /**
         * All of the multi-materials added to this scene
         * @see https://doc.babylonjs.com/how_to/multi_materials
         */
        this.multiMaterials = new Array();
        /**
         * All of the materials added to this scene
         * In the context of a Scene, it is not supposed to be modified manually.
         * Any addition or removal should be done using the addMaterial and removeMaterial Scene methods.
         * Note also that the order of the Material within the array is not significant and might change.
         * @see https://doc.babylonjs.com/babylon101/materials
         */
        this.materials = new Array();
        /**
         * The list of morph target managers added to the scene
         * @see https://doc.babylonjs.com/how_to/how_to_dynamically_morph_a_mesh
         */
        this.morphTargetManagers = new Array();
        /**
         * The list of geometries used in the scene.
         */
        this.geometries = new Array();
        /**
         * All of the transform nodes added to this scene
         * In the context of a Scene, it is not supposed to be modified manually.
         * Any addition or removal should be done using the addTransformNode and removeTransformNode Scene methods.
         * Note also that the order of the TransformNode within the array is not significant and might change.
         * @see https://doc.babylonjs.com/how_to/transformnode
         */
        this.transformNodes = new Array();
        /**
         * ActionManagers available on the scene.
         * @deprecated
         */
        this.actionManagers = new Array();
        /**
         * Textures to keep.
         */
        this.textures = new Array();
        /** @hidden */
        this._environmentTexture = null;
        /**
         * The list of postprocesses added to the scene
         */
        this.postProcesses = new Array();
    }
    /**
     * Adds a parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    AbstractScene.AddParser = function (name, parser) {
        this._BabylonFileParsers[name] = parser;
    };
    /**
     * Gets a general parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    AbstractScene.GetParser = function (name) {
        if (this._BabylonFileParsers[name]) {
            return this._BabylonFileParsers[name];
        }
        return null;
    };
    /**
     * Adds n individual parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    AbstractScene.AddIndividualParser = function (name, parser) {
        this._IndividualBabylonFileParsers[name] = parser;
    };
    /**
     * Gets an individual parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    AbstractScene.GetIndividualParser = function (name) {
        if (this._IndividualBabylonFileParsers[name]) {
            return this._IndividualBabylonFileParsers[name];
        }
        return null;
    };
    /**
     * Parser json data and populate both a scene and its associated container object
     * @param jsonData Defines the data to parse
     * @param scene Defines the scene to parse the data for
     * @param container Defines the container attached to the parsing sequence
     * @param rootUrl Defines the root url of the data
     */
    AbstractScene.Parse = function (jsonData, scene, container, rootUrl) {
        for (var parserName in this._BabylonFileParsers) {
            if (Object.prototype.hasOwnProperty.call(this._BabylonFileParsers, parserName)) {
                this._BabylonFileParsers[parserName](jsonData, scene, container, rootUrl);
            }
        }
    };
    Object.defineProperty(AbstractScene.prototype, "environmentTexture", {
        /**
         * Texture used in all pbr material as the reflection texture.
         * As in the majority of the scene they are the same (exception for multi room and so on),
         * this is easier to reference from here than from all the materials.
         */
        get: function () {
            return this._environmentTexture;
        },
        set: function (value) {
            this._environmentTexture = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @returns all meshes, lights, cameras, transformNodes and bones
     */
    AbstractScene.prototype.getNodes = function () {
        var nodes = new Array();
        nodes = nodes.concat(this.meshes);
        nodes = nodes.concat(this.lights);
        nodes = nodes.concat(this.cameras);
        nodes = nodes.concat(this.transformNodes); // dummies
        this.skeletons.forEach(function (skeleton) { return (nodes = nodes.concat(skeleton.bones)); });
        return nodes;
    };
    /**
     * Stores the list of available parsers in the application.
     */
    AbstractScene._BabylonFileParsers = {};
    /**
     * Stores the list of available individual parsers in the application.
     */
    AbstractScene._IndividualBabylonFileParsers = {};
    return AbstractScene;
}());

/**
 * This class implement a typical dictionary using a string as key and the generic type T as value.
 * The underlying implementation relies on an associative array to ensure the best performances.
 * The value can be anything including 'null' but except 'undefined'
 */
var StringDictionary = /** @class */ (function () {
    function StringDictionary() {
        this._count = 0;
        this._data = {};
    }
    /**
     * This will clear this dictionary and copy the content from the 'source' one.
     * If the T value is a custom object, it won't be copied/cloned, the same object will be used
     * @param source the dictionary to take the content from and copy to this dictionary
     */
    StringDictionary.prototype.copyFrom = function (source) {
        var _this = this;
        this.clear();
        source.forEach(function (t, v) { return _this.add(t, v); });
    };
    /**
     * Get a value based from its key
     * @param key the given key to get the matching value from
     * @return the value if found, otherwise undefined is returned
     */
    StringDictionary.prototype.get = function (key) {
        var val = this._data[key];
        if (val !== undefined) {
            return val;
        }
        return undefined;
    };
    /**
     * Get a value from its key or add it if it doesn't exist.
     * This method will ensure you that a given key/data will be present in the dictionary.
     * @param key the given key to get the matching value from
     * @param factory the factory that will create the value if the key is not present in the dictionary.
     * The factory will only be invoked if there's no data for the given key.
     * @return the value corresponding to the key.
     */
    StringDictionary.prototype.getOrAddWithFactory = function (key, factory) {
        var val = this.get(key);
        if (val !== undefined) {
            return val;
        }
        val = factory(key);
        if (val) {
            this.add(key, val);
        }
        return val;
    };
    /**
     * Get a value from its key if present in the dictionary otherwise add it
     * @param key the key to get the value from
     * @param val if there's no such key/value pair in the dictionary add it with this value
     * @return the value corresponding to the key
     */
    StringDictionary.prototype.getOrAdd = function (key, val) {
        var curVal = this.get(key);
        if (curVal !== undefined) {
            return curVal;
        }
        this.add(key, val);
        return val;
    };
    /**
     * Check if there's a given key in the dictionary
     * @param key the key to check for
     * @return true if the key is present, false otherwise
     */
    StringDictionary.prototype.contains = function (key) {
        return this._data[key] !== undefined;
    };
    /**
     * Add a new key and its corresponding value
     * @param key the key to add
     * @param value the value corresponding to the key
     * @return true if the operation completed successfully, false if we couldn't insert the key/value because there was already this key in the dictionary
     */
    StringDictionary.prototype.add = function (key, value) {
        if (this._data[key] !== undefined) {
            return false;
        }
        this._data[key] = value;
        ++this._count;
        return true;
    };
    /**
     * Update a specific value associated to a key
     * @param key defines the key to use
     * @param value defines the value to store
     * @returns true if the value was updated (or false if the key was not found)
     */
    StringDictionary.prototype.set = function (key, value) {
        if (this._data[key] === undefined) {
            return false;
        }
        this._data[key] = value;
        return true;
    };
    /**
     * Get the element of the given key and remove it from the dictionary
     * @param key defines the key to search
     * @returns the value associated with the key or null if not found
     */
    StringDictionary.prototype.getAndRemove = function (key) {
        var val = this.get(key);
        if (val !== undefined) {
            delete this._data[key];
            --this._count;
            return val;
        }
        return null;
    };
    /**
     * Remove a key/value from the dictionary.
     * @param key the key to remove
     * @return true if the item was successfully deleted, false if no item with such key exist in the dictionary
     */
    StringDictionary.prototype.remove = function (key) {
        if (this.contains(key)) {
            delete this._data[key];
            --this._count;
            return true;
        }
        return false;
    };
    /**
     * Clear the whole content of the dictionary
     */
    StringDictionary.prototype.clear = function () {
        this._data = {};
        this._count = 0;
    };
    Object.defineProperty(StringDictionary.prototype, "count", {
        /**
         * Gets the current count
         */
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Execute a callback on each key/val of the dictionary.
     * Note that you can remove any element in this dictionary in the callback implementation
     * @param callback the callback to execute on a given key/value pair
     */
    StringDictionary.prototype.forEach = function (callback) {
        for (var cur in this._data) {
            var val = this._data[cur];
            callback(cur, val);
        }
    };
    /**
     * Execute a callback on every occurrence of the dictionary until it returns a valid TRes object.
     * If the callback returns null or undefined the method will iterate to the next key/value pair
     * Note that you can remove any element in this dictionary in the callback implementation
     * @param callback the callback to execute, if it return a valid T instanced object the enumeration will stop and the object will be returned
     * @returns the first item
     */
    StringDictionary.prototype.first = function (callback) {
        for (var cur in this._data) {
            var val = this._data[cur];
            var res = callback(cur, val);
            if (res) {
                return res;
            }
        }
        return null;
    };
    return StringDictionary;
}());

/**
 * Manages the defines for the Material
 */
var MaterialDefines = /** @class */ (function () {
    /**
     * Creates a new instance
     * @param externalProperties list of external properties to inject into the object
     */
    function MaterialDefines(externalProperties) {
        this._isDirty = true;
        /** @hidden */
        this._areLightsDirty = true;
        /** @hidden */
        this._areLightsDisposed = false;
        /** @hidden */
        this._areAttributesDirty = true;
        /** @hidden */
        this._areTexturesDirty = true;
        /** @hidden */
        this._areFresnelDirty = true;
        /** @hidden */
        this._areMiscDirty = true;
        /** @hidden */
        this._arePrePassDirty = true;
        /** @hidden */
        this._areImageProcessingDirty = true;
        /** @hidden */
        this._normals = false;
        /** @hidden */
        this._uvs = false;
        /** @hidden */
        this._needNormals = false;
        /** @hidden */
        this._needUVs = false;
        this._externalProperties = externalProperties;
        // Initialize External Properties
        if (externalProperties) {
            for (var prop in externalProperties) {
                if (Object.prototype.hasOwnProperty.call(externalProperties, prop)) {
                    this._setDefaultValue(prop);
                }
            }
        }
    }
    Object.defineProperty(MaterialDefines.prototype, "isDirty", {
        /**
         * Specifies if the material needs to be re-calculated
         */
        get: function () {
            return this._isDirty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Marks the material to indicate that it has been re-calculated
     */
    MaterialDefines.prototype.markAsProcessed = function () {
        this._isDirty = false;
        this._areAttributesDirty = false;
        this._areTexturesDirty = false;
        this._areFresnelDirty = false;
        this._areLightsDirty = false;
        this._areLightsDisposed = false;
        this._areMiscDirty = false;
        this._arePrePassDirty = false;
        this._areImageProcessingDirty = false;
    };
    /**
     * Marks the material to indicate that it needs to be re-calculated
     */
    MaterialDefines.prototype.markAsUnprocessed = function () {
        this._isDirty = true;
    };
    /**
     * Marks the material to indicate all of its defines need to be re-calculated
     */
    MaterialDefines.prototype.markAllAsDirty = function () {
        this._areTexturesDirty = true;
        this._areAttributesDirty = true;
        this._areLightsDirty = true;
        this._areFresnelDirty = true;
        this._areMiscDirty = true;
        this._areImageProcessingDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the material to indicate that image processing needs to be re-calculated
     */
    MaterialDefines.prototype.markAsImageProcessingDirty = function () {
        this._areImageProcessingDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the material to indicate the lights need to be re-calculated
     * @param disposed Defines whether the light is dirty due to dispose or not
     */
    MaterialDefines.prototype.markAsLightDirty = function (disposed) {
        if (disposed === void 0) { disposed = false; }
        this._areLightsDirty = true;
        this._areLightsDisposed = this._areLightsDisposed || disposed;
        this._isDirty = true;
    };
    /**
     * Marks the attribute state as changed
     */
    MaterialDefines.prototype.markAsAttributesDirty = function () {
        this._areAttributesDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the texture state as changed
     */
    MaterialDefines.prototype.markAsTexturesDirty = function () {
        this._areTexturesDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the fresnel state as changed
     */
    MaterialDefines.prototype.markAsFresnelDirty = function () {
        this._areFresnelDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the misc state as changed
     */
    MaterialDefines.prototype.markAsMiscDirty = function () {
        this._areMiscDirty = true;
        this._isDirty = true;
    };
    /**
     * Marks the prepass state as changed
     */
    MaterialDefines.prototype.markAsPrePassDirty = function () {
        this._arePrePassDirty = true;
        this._isDirty = true;
    };
    /**
     * Rebuilds the material defines
     */
    MaterialDefines.prototype.rebuild = function () {
        this._keys = [];
        for (var _i = 0, _a = Object.keys(this); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key[0] === "_") {
                continue;
            }
            this._keys.push(key);
        }
        if (this._externalProperties) {
            for (var name_1 in this._externalProperties) {
                if (this._keys.indexOf(name_1) === -1) {
                    this._keys.push(name_1);
                }
            }
        }
    };
    /**
     * Specifies if two material defines are equal
     * @param other - A material define instance to compare to
     * @returns - Boolean indicating if the material defines are equal (true) or not (false)
     */
    MaterialDefines.prototype.isEqual = function (other) {
        if (this._keys.length !== other._keys.length) {
            return false;
        }
        for (var index = 0; index < this._keys.length; index++) {
            var prop = this._keys[index];
            if (this[prop] !== other[prop]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Clones this instance's defines to another instance
     * @param other - material defines to clone values to
     */
    MaterialDefines.prototype.cloneTo = function (other) {
        if (this._keys.length !== other._keys.length) {
            other._keys = this._keys.slice(0);
        }
        for (var index = 0; index < this._keys.length; index++) {
            var prop = this._keys[index];
            other[prop] = this[prop];
        }
    };
    /**
     * Resets the material define values
     */
    MaterialDefines.prototype.reset = function () {
        var _this = this;
        this._keys.forEach(function (prop) { return _this._setDefaultValue(prop); });
    };
    MaterialDefines.prototype._setDefaultValue = function (prop) {
        var _a, _b, _c, _d, _e;
        var type = (_c = (_b = (_a = this._externalProperties) === null || _a === void 0 ? void 0 : _a[prop]) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : typeof this[prop];
        var defValue = (_e = (_d = this._externalProperties) === null || _d === void 0 ? void 0 : _d[prop]) === null || _e === void 0 ? void 0 : _e.default;
        switch (type) {
            case "number":
                this[prop] = defValue !== null && defValue !== void 0 ? defValue : 0;
                break;
            case "string":
                this[prop] = defValue !== null && defValue !== void 0 ? defValue : "";
                break;
            default:
                this[prop] = defValue !== null && defValue !== void 0 ? defValue : false;
                break;
        }
    };
    /**
     * Converts the material define values to a string
     * @returns - String of material define information
     */
    MaterialDefines.prototype.toString = function () {
        var result = "";
        for (var index = 0; index < this._keys.length; index++) {
            var prop = this._keys[index];
            var value = this[prop];
            var type = typeof value;
            switch (type) {
                case "number":
                case "string":
                    result += "#define " + prop + " " + value + "\n";
                    break;
                default:
                    if (value) {
                        result += "#define " + prop + "\n";
                    }
                    break;
            }
        }
        return result;
    };
    return MaterialDefines;
}());

/**
 * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
 * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
 * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
 * corresponding to low luminance, medium luminance, and high luminance areas respectively.
 */
var ColorCurves = /** @class */ (function () {
    function ColorCurves() {
        this._dirty = true;
        this._tempColor = new Color4(0, 0, 0, 0);
        this._globalCurve = new Color4(0, 0, 0, 0);
        this._highlightsCurve = new Color4(0, 0, 0, 0);
        this._midtonesCurve = new Color4(0, 0, 0, 0);
        this._shadowsCurve = new Color4(0, 0, 0, 0);
        this._positiveCurve = new Color4(0, 0, 0, 0);
        this._negativeCurve = new Color4(0, 0, 0, 0);
        this._globalHue = 30;
        this._globalDensity = 0;
        this._globalSaturation = 0;
        this._globalExposure = 0;
        this._highlightsHue = 30;
        this._highlightsDensity = 0;
        this._highlightsSaturation = 0;
        this._highlightsExposure = 0;
        this._midtonesHue = 30;
        this._midtonesDensity = 0;
        this._midtonesSaturation = 0;
        this._midtonesExposure = 0;
        this._shadowsHue = 30;
        this._shadowsDensity = 0;
        this._shadowsSaturation = 0;
        this._shadowsExposure = 0;
    }
    Object.defineProperty(ColorCurves.prototype, "globalHue", {
        /**
         * Gets the global Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        get: function () {
            return this._globalHue;
        },
        /**
         * Sets the global Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        set: function (value) {
            this._globalHue = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "globalDensity", {
        /**
         * Gets the global Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        get: function () {
            return this._globalDensity;
        },
        /**
         * Sets the global Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        set: function (value) {
            this._globalDensity = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "globalSaturation", {
        /**
         * Gets the global Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        get: function () {
            return this._globalSaturation;
        },
        /**
         * Sets the global Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        set: function (value) {
            this._globalSaturation = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "globalExposure", {
        /**
         * Gets the global Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        get: function () {
            return this._globalExposure;
        },
        /**
         * Sets the global Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        set: function (value) {
            this._globalExposure = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "highlightsHue", {
        /**
         * Gets the highlights Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        get: function () {
            return this._highlightsHue;
        },
        /**
         * Sets the highlights Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        set: function (value) {
            this._highlightsHue = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "highlightsDensity", {
        /**
         * Gets the highlights Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        get: function () {
            return this._highlightsDensity;
        },
        /**
         * Sets the highlights Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        set: function (value) {
            this._highlightsDensity = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "highlightsSaturation", {
        /**
         * Gets the highlights Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        get: function () {
            return this._highlightsSaturation;
        },
        /**
         * Sets the highlights Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        set: function (value) {
            this._highlightsSaturation = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "highlightsExposure", {
        /**
         * Gets the highlights Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        get: function () {
            return this._highlightsExposure;
        },
        /**
         * Sets the highlights Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        set: function (value) {
            this._highlightsExposure = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "midtonesHue", {
        /**
         * Gets the midtones Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        get: function () {
            return this._midtonesHue;
        },
        /**
         * Sets the midtones Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        set: function (value) {
            this._midtonesHue = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "midtonesDensity", {
        /**
         * Gets the midtones Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        get: function () {
            return this._midtonesDensity;
        },
        /**
         * Sets the midtones Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        set: function (value) {
            this._midtonesDensity = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "midtonesSaturation", {
        /**
         * Gets the midtones Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        get: function () {
            return this._midtonesSaturation;
        },
        /**
         * Sets the midtones Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        set: function (value) {
            this._midtonesSaturation = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "midtonesExposure", {
        /**
         * Gets the midtones Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        get: function () {
            return this._midtonesExposure;
        },
        /**
         * Sets the midtones Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        set: function (value) {
            this._midtonesExposure = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "shadowsHue", {
        /**
         * Gets the shadows Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        get: function () {
            return this._shadowsHue;
        },
        /**
         * Sets the shadows Hue value.
         * The hue value is a standard HSB hue in the range [0,360] where 0=red, 120=green and 240=blue. The default value is 30 degrees (orange).
         */
        set: function (value) {
            this._shadowsHue = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "shadowsDensity", {
        /**
         * Gets the shadows Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        get: function () {
            return this._shadowsDensity;
        },
        /**
         * Sets the shadows Density value.
         * The density value is in range [-100,+100] where 0 means the color filter has no effect and +100 means the color filter has maximum effect.
         * Values less than zero provide a filter of opposite hue.
         */
        set: function (value) {
            this._shadowsDensity = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "shadowsSaturation", {
        /**
         * Gets the shadows Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        get: function () {
            return this._shadowsSaturation;
        },
        /**
         * Sets the shadows Saturation value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase saturation and negative values decrease saturation.
         */
        set: function (value) {
            this._shadowsSaturation = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorCurves.prototype, "shadowsExposure", {
        /**
         * Gets the shadows Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        get: function () {
            return this._shadowsExposure;
        },
        /**
         * Sets the shadows Exposure value.
         * This is an adjustment value in the range [-100,+100], where the default value of 0.0 makes no adjustment, positive values increase exposure and negative values decrease exposure.
         */
        set: function (value) {
            this._shadowsExposure = value;
            this._dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the class name
     * @returns The class name
     */
    ColorCurves.prototype.getClassName = function () {
        return "ColorCurves";
    };
    /**
     * Binds the color curves to the shader.
     * @param colorCurves The color curve to bind
     * @param effect The effect to bind to
     * @param positiveUniform The positive uniform shader parameter
     * @param neutralUniform The neutral uniform shader parameter
     * @param negativeUniform The negative uniform shader parameter
     */
    ColorCurves.Bind = function (colorCurves, effect, positiveUniform, neutralUniform, negativeUniform) {
        if (positiveUniform === void 0) { positiveUniform = "vCameraColorCurvePositive"; }
        if (neutralUniform === void 0) { neutralUniform = "vCameraColorCurveNeutral"; }
        if (negativeUniform === void 0) { negativeUniform = "vCameraColorCurveNegative"; }
        if (colorCurves._dirty) {
            colorCurves._dirty = false;
            // Fill in global info.
            colorCurves._getColorGradingDataToRef(colorCurves._globalHue, colorCurves._globalDensity, colorCurves._globalSaturation, colorCurves._globalExposure, colorCurves._globalCurve);
            // Compute highlights info.
            colorCurves._getColorGradingDataToRef(colorCurves._highlightsHue, colorCurves._highlightsDensity, colorCurves._highlightsSaturation, colorCurves._highlightsExposure, colorCurves._tempColor);
            colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._highlightsCurve);
            // Compute midtones info.
            colorCurves._getColorGradingDataToRef(colorCurves._midtonesHue, colorCurves._midtonesDensity, colorCurves._midtonesSaturation, colorCurves._midtonesExposure, colorCurves._tempColor);
            colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._midtonesCurve);
            // Compute shadows info.
            colorCurves._getColorGradingDataToRef(colorCurves._shadowsHue, colorCurves._shadowsDensity, colorCurves._shadowsSaturation, colorCurves._shadowsExposure, colorCurves._tempColor);
            colorCurves._tempColor.multiplyToRef(colorCurves._globalCurve, colorCurves._shadowsCurve);
            // Compute deltas (neutral is midtones).
            colorCurves._highlightsCurve.subtractToRef(colorCurves._midtonesCurve, colorCurves._positiveCurve);
            colorCurves._midtonesCurve.subtractToRef(colorCurves._shadowsCurve, colorCurves._negativeCurve);
        }
        if (effect) {
            effect.setFloat4(positiveUniform, colorCurves._positiveCurve.r, colorCurves._positiveCurve.g, colorCurves._positiveCurve.b, colorCurves._positiveCurve.a);
            effect.setFloat4(neutralUniform, colorCurves._midtonesCurve.r, colorCurves._midtonesCurve.g, colorCurves._midtonesCurve.b, colorCurves._midtonesCurve.a);
            effect.setFloat4(negativeUniform, colorCurves._negativeCurve.r, colorCurves._negativeCurve.g, colorCurves._negativeCurve.b, colorCurves._negativeCurve.a);
        }
    };
    /**
     * Prepare the list of uniforms associated with the ColorCurves effects.
     * @param uniformsList The list of uniforms used in the effect
     */
    ColorCurves.PrepareUniforms = function (uniformsList) {
        uniformsList.push("vCameraColorCurveNeutral", "vCameraColorCurvePositive", "vCameraColorCurveNegative");
    };
    /**
     * Returns color grading data based on a hue, density, saturation and exposure value.
     * @param hue
     * @param density
     * @param saturation The saturation.
     * @param exposure The exposure.
     * @param result The result data container.
     */
    ColorCurves.prototype._getColorGradingDataToRef = function (hue, density, saturation, exposure, result) {
        if (hue == null) {
            return;
        }
        hue = ColorCurves._Clamp(hue, 0, 360);
        density = ColorCurves._Clamp(density, -100, 100);
        saturation = ColorCurves._Clamp(saturation, -100, 100);
        exposure = ColorCurves._Clamp(exposure, -100, 100);
        // Remap the slider/config filter density with non-linear mapping and also scale by half
        // so that the maximum filter density is only 50% control. This provides fine control
        // for small values and reasonable range.
        density = ColorCurves._ApplyColorGradingSliderNonlinear(density);
        density *= 0.5;
        exposure = ColorCurves._ApplyColorGradingSliderNonlinear(exposure);
        if (density < 0) {
            density *= -1;
            hue = (hue + 180) % 360;
        }
        ColorCurves._FromHSBToRef(hue, density, 50 + 0.25 * exposure, result);
        result.scaleToRef(2, result);
        result.a = 1 + 0.01 * saturation;
    };
    /**
     * Takes an input slider value and returns an adjusted value that provides extra control near the centre.
     * @param value The input slider value in range [-100,100].
     * @returns Adjusted value.
     */
    ColorCurves._ApplyColorGradingSliderNonlinear = function (value) {
        value /= 100;
        var x = Math.abs(value);
        x = Math.pow(x, 2);
        if (value < 0) {
            x *= -1;
        }
        x *= 100;
        return x;
    };
    /**
     * Returns an RGBA Color4 based on Hue, Saturation and Brightness (also referred to as value, HSV).
     * @param hue The hue (H) input.
     * @param saturation The saturation (S) input.
     * @param brightness The brightness (B) input.
     * @param result
     * @result An RGBA color represented as Vector4.
     */
    ColorCurves._FromHSBToRef = function (hue, saturation, brightness, result) {
        var h = ColorCurves._Clamp(hue, 0, 360);
        var s = ColorCurves._Clamp(saturation / 100, 0, 1);
        var v = ColorCurves._Clamp(brightness / 100, 0, 1);
        if (s === 0) {
            result.r = v;
            result.g = v;
            result.b = v;
        }
        else {
            // sector 0 to 5
            h /= 60;
            var i = Math.floor(h);
            // fractional part of h
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    result.r = v;
                    result.g = t;
                    result.b = p;
                    break;
                case 1:
                    result.r = q;
                    result.g = v;
                    result.b = p;
                    break;
                case 2:
                    result.r = p;
                    result.g = v;
                    result.b = t;
                    break;
                case 3:
                    result.r = p;
                    result.g = q;
                    result.b = v;
                    break;
                case 4:
                    result.r = t;
                    result.g = p;
                    result.b = v;
                    break;
                default:
                    // case 5:
                    result.r = v;
                    result.g = p;
                    result.b = q;
                    break;
            }
        }
        result.a = 1;
    };
    /**
     * Returns a value clamped between min and max
     * @param value The value to clamp
     * @param min The minimum of value
     * @param max The maximum of value
     * @returns The clamped value.
     */
    ColorCurves._Clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * Clones the current color curve instance.
     * @return The cloned curves
     */
    ColorCurves.prototype.clone = function () {
        return SerializationHelper.Clone(function () { return new ColorCurves(); }, this);
    };
    /**
     * Serializes the current color curve instance to a json representation.
     * @return a JSON representation
     */
    ColorCurves.prototype.serialize = function () {
        return SerializationHelper.Serialize(this);
    };
    /**
     * Parses the color curve from a json representation.
     * @param source the JSON source to parse
     * @return The parsed curves
     */
    ColorCurves.Parse = function (source) {
        return SerializationHelper.Parse(function () { return new ColorCurves(); }, source, null, null);
    };
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_globalHue", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_globalDensity", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_globalSaturation", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_globalExposure", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_highlightsHue", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_highlightsDensity", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_highlightsSaturation", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_highlightsExposure", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_midtonesHue", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_midtonesDensity", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_midtonesSaturation", void 0);
    __decorate([
        serialize()
    ], ColorCurves.prototype, "_midtonesExposure", void 0);
    return ColorCurves;
}());
// References the dependencies.
SerializationHelper._ColorCurvesParser = ColorCurves.Parse;

/**
 * @hidden
 */
var ImageProcessingConfigurationDefines = /** @class */ (function (_super) {
    __extends(ImageProcessingConfigurationDefines, _super);
    function ImageProcessingConfigurationDefines() {
        var _this = _super.call(this) || this;
        _this.IMAGEPROCESSING = false;
        _this.VIGNETTE = false;
        _this.VIGNETTEBLENDMODEMULTIPLY = false;
        _this.VIGNETTEBLENDMODEOPAQUE = false;
        _this.TONEMAPPING = false;
        _this.TONEMAPPING_ACES = false;
        _this.CONTRAST = false;
        _this.COLORCURVES = false;
        _this.COLORGRADING = false;
        _this.COLORGRADING3D = false;
        _this.SAMPLER3DGREENDEPTH = false;
        _this.SAMPLER3DBGRMAP = false;
        _this.IMAGEPROCESSINGPOSTPROCESS = false;
        _this.EXPOSURE = false;
        _this.SKIPFINALCOLORCLAMP = false;
        _this.rebuild();
        return _this;
    }
    return ImageProcessingConfigurationDefines;
}(MaterialDefines));
/**
 * This groups together the common properties used for image processing either in direct forward pass
 * or through post processing effect depending on the use of the image processing pipeline in your scene
 * or not.
 */
var ImageProcessingConfiguration = /** @class */ (function () {
    function ImageProcessingConfiguration() {
        /**
         * Color curves setup used in the effect if colorCurvesEnabled is set to true
         */
        this.colorCurves = new ColorCurves();
        this._colorCurvesEnabled = false;
        this._colorGradingEnabled = false;
        this._colorGradingWithGreenDepth = true;
        this._colorGradingBGR = true;
        /** @hidden */
        this._exposure = 1.0;
        this._toneMappingEnabled = false;
        this._toneMappingType = ImageProcessingConfiguration.TONEMAPPING_STANDARD;
        this._contrast = 1.0;
        /**
         * Vignette stretch size.
         */
        this.vignetteStretch = 0;
        /**
         * Vignette centre X Offset.
         */
        this.vignetteCentreX = 0;
        /**
         * Vignette centre Y Offset.
         */
        this.vignetteCentreY = 0;
        /**
         * Vignette weight or intensity of the vignette effect.
         */
        this.vignetteWeight = 1.5;
        /**
         * Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode)
         * if vignetteEnabled is set to true.
         */
        this.vignetteColor = new Color4(0, 0, 0, 0);
        /**
         * Camera field of view used by the Vignette effect.
         */
        this.vignetteCameraFov = 0.5;
        this._vignetteBlendMode = ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY;
        this._vignetteEnabled = false;
        /** @hidden */
        this._skipFinalColorClamp = false;
        /** @hidden */
        this._applyByPostProcess = false;
        this._isEnabled = true;
        /**
         * An event triggered when the configuration changes and requires Shader to Update some parameters.
         */
        this.onUpdateParameters = new Observable();
    }
    Object.defineProperty(ImageProcessingConfiguration.prototype, "colorCurvesEnabled", {
        /**
         * Gets whether the color curves effect is enabled.
         */
        get: function () {
            return this._colorCurvesEnabled;
        },
        /**
         * Sets whether the color curves effect is enabled.
         */
        set: function (value) {
            if (this._colorCurvesEnabled === value) {
                return;
            }
            this._colorCurvesEnabled = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "colorGradingTexture", {
        /**
         * Color grading LUT texture used in the effect if colorGradingEnabled is set to true
         */
        get: function () {
            return this._colorGradingTexture;
        },
        /**
         * Color grading LUT texture used in the effect if colorGradingEnabled is set to true
         */
        set: function (value) {
            if (this._colorGradingTexture === value) {
                return;
            }
            this._colorGradingTexture = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "colorGradingEnabled", {
        /**
         * Gets whether the color grading effect is enabled.
         */
        get: function () {
            return this._colorGradingEnabled;
        },
        /**
         * Sets whether the color grading effect is enabled.
         */
        set: function (value) {
            if (this._colorGradingEnabled === value) {
                return;
            }
            this._colorGradingEnabled = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "colorGradingWithGreenDepth", {
        /**
         * Gets whether the color grading effect is using a green depth for the 3d Texture.
         */
        get: function () {
            return this._colorGradingWithGreenDepth;
        },
        /**
         * Sets whether the color grading effect is using a green depth for the 3d Texture.
         */
        set: function (value) {
            if (this._colorGradingWithGreenDepth === value) {
                return;
            }
            this._colorGradingWithGreenDepth = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "colorGradingBGR", {
        /**
         * Gets whether the color grading texture contains BGR values.
         */
        get: function () {
            return this._colorGradingBGR;
        },
        /**
         * Sets whether the color grading texture contains BGR values.
         */
        set: function (value) {
            if (this._colorGradingBGR === value) {
                return;
            }
            this._colorGradingBGR = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "exposure", {
        /**
         * Gets the Exposure used in the effect.
         */
        get: function () {
            return this._exposure;
        },
        /**
         * Sets the Exposure used in the effect.
         */
        set: function (value) {
            if (this._exposure === value) {
                return;
            }
            this._exposure = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "toneMappingEnabled", {
        /**
         * Gets whether the tone mapping effect is enabled.
         */
        get: function () {
            return this._toneMappingEnabled;
        },
        /**
         * Sets whether the tone mapping effect is enabled.
         */
        set: function (value) {
            if (this._toneMappingEnabled === value) {
                return;
            }
            this._toneMappingEnabled = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "toneMappingType", {
        /**
         * Gets the type of tone mapping effect.
         */
        get: function () {
            return this._toneMappingType;
        },
        /**
         * Sets the type of tone mapping effect used in BabylonJS.
         */
        set: function (value) {
            if (this._toneMappingType === value) {
                return;
            }
            this._toneMappingType = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "contrast", {
        /**
         * Gets the contrast used in the effect.
         */
        get: function () {
            return this._contrast;
        },
        /**
         * Sets the contrast used in the effect.
         */
        set: function (value) {
            if (this._contrast === value) {
                return;
            }
            this._contrast = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "vignetteBlendMode", {
        /**
         * Gets the vignette blend mode allowing different kind of effect.
         */
        get: function () {
            return this._vignetteBlendMode;
        },
        /**
         * Sets the vignette blend mode allowing different kind of effect.
         */
        set: function (value) {
            if (this._vignetteBlendMode === value) {
                return;
            }
            this._vignetteBlendMode = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "vignetteEnabled", {
        /**
         * Gets whether the vignette effect is enabled.
         */
        get: function () {
            return this._vignetteEnabled;
        },
        /**
         * Sets whether the vignette effect is enabled.
         */
        set: function (value) {
            if (this._vignetteEnabled === value) {
                return;
            }
            this._vignetteEnabled = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "skipFinalColorClamp", {
        /**
         * If apply by post process is set to true, setting this to true will skip the the final color clamp step in the fragment shader
         * Applies to PBR materials.
         */
        get: function () {
            return this._skipFinalColorClamp;
        },
        /**
         * If apply by post process is set to true, setting this to true will skip the the final color clamp step in the fragment shader
         * Applies to PBR materials.
         */
        set: function (value) {
            if (this._skipFinalColorClamp === value) {
                return;
            }
            this._skipFinalColorClamp = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "applyByPostProcess", {
        /**
         * Gets whether the image processing is applied through a post process or not.
         */
        get: function () {
            return this._applyByPostProcess;
        },
        /**
         * Sets whether the image processing is applied through a post process or not.
         */
        set: function (value) {
            if (this._applyByPostProcess === value) {
                return;
            }
            this._applyByPostProcess = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration.prototype, "isEnabled", {
        /**
         * Gets whether the image processing is enabled or not.
         */
        get: function () {
            return this._isEnabled;
        },
        /**
         * Sets whether the image processing is enabled or not.
         */
        set: function (value) {
            if (this._isEnabled === value) {
                return;
            }
            this._isEnabled = value;
            this._updateParameters();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Method called each time the image processing information changes requires to recompile the effect.
     */
    ImageProcessingConfiguration.prototype._updateParameters = function () {
        this.onUpdateParameters.notifyObservers(this);
    };
    /**
     * Gets the current class name.
     * @return "ImageProcessingConfiguration"
     */
    ImageProcessingConfiguration.prototype.getClassName = function () {
        return "ImageProcessingConfiguration";
    };
    /**
     * Prepare the list of uniforms associated with the Image Processing effects.
     * @param uniforms The list of uniforms used in the effect
     * @param defines the list of defines currently in use
     */
    ImageProcessingConfiguration.PrepareUniforms = function (uniforms, defines) {
        if (defines.EXPOSURE) {
            uniforms.push("exposureLinear");
        }
        if (defines.CONTRAST) {
            uniforms.push("contrast");
        }
        if (defines.COLORGRADING) {
            uniforms.push("colorTransformSettings");
        }
        if (defines.VIGNETTE) {
            uniforms.push("vInverseScreenSize");
            uniforms.push("vignetteSettings1");
            uniforms.push("vignetteSettings2");
        }
        if (defines.COLORCURVES) {
            ColorCurves.PrepareUniforms(uniforms);
        }
    };
    /**
     * Prepare the list of samplers associated with the Image Processing effects.
     * @param samplersList The list of uniforms used in the effect
     * @param defines the list of defines currently in use
     */
    ImageProcessingConfiguration.PrepareSamplers = function (samplersList, defines) {
        if (defines.COLORGRADING) {
            samplersList.push("txColorTransform");
        }
    };
    /**
     * Prepare the list of defines associated to the shader.
     * @param defines the list of defines to complete
     * @param forPostProcess Define if we are currently in post process mode or not
     */
    ImageProcessingConfiguration.prototype.prepareDefines = function (defines, forPostProcess) {
        if (forPostProcess === void 0) { forPostProcess = false; }
        if (forPostProcess !== this.applyByPostProcess || !this._isEnabled) {
            defines.VIGNETTE = false;
            defines.TONEMAPPING = false;
            defines.TONEMAPPING_ACES = false;
            defines.CONTRAST = false;
            defines.EXPOSURE = false;
            defines.COLORCURVES = false;
            defines.COLORGRADING = false;
            defines.COLORGRADING3D = false;
            defines.IMAGEPROCESSING = false;
            defines.SKIPFINALCOLORCLAMP = this.skipFinalColorClamp;
            defines.IMAGEPROCESSINGPOSTPROCESS = this.applyByPostProcess && this._isEnabled;
            return;
        }
        defines.VIGNETTE = this.vignetteEnabled;
        defines.VIGNETTEBLENDMODEMULTIPLY = this.vignetteBlendMode === ImageProcessingConfiguration._VIGNETTEMODE_MULTIPLY;
        defines.VIGNETTEBLENDMODEOPAQUE = !defines.VIGNETTEBLENDMODEMULTIPLY;
        defines.TONEMAPPING = this.toneMappingEnabled;
        switch (this._toneMappingType) {
            case ImageProcessingConfiguration.TONEMAPPING_ACES:
                defines.TONEMAPPING_ACES = true;
                break;
            default:
                defines.TONEMAPPING_ACES = false;
                break;
        }
        defines.CONTRAST = this.contrast !== 1.0;
        defines.EXPOSURE = this.exposure !== 1.0;
        defines.COLORCURVES = this.colorCurvesEnabled && !!this.colorCurves;
        defines.COLORGRADING = this.colorGradingEnabled && !!this.colorGradingTexture;
        if (defines.COLORGRADING) {
            defines.COLORGRADING3D = this.colorGradingTexture.is3D;
        }
        else {
            defines.COLORGRADING3D = false;
        }
        defines.SAMPLER3DGREENDEPTH = this.colorGradingWithGreenDepth;
        defines.SAMPLER3DBGRMAP = this.colorGradingBGR;
        defines.IMAGEPROCESSINGPOSTPROCESS = this.applyByPostProcess;
        defines.SKIPFINALCOLORCLAMP = this.skipFinalColorClamp;
        defines.IMAGEPROCESSING = defines.VIGNETTE || defines.TONEMAPPING || defines.CONTRAST || defines.EXPOSURE || defines.COLORCURVES || defines.COLORGRADING;
    };
    /**
     * Returns true if all the image processing information are ready.
     * @returns True if ready, otherwise, false
     */
    ImageProcessingConfiguration.prototype.isReady = function () {
        // Color Grading texture can not be none blocking.
        return !this.colorGradingEnabled || !this.colorGradingTexture || this.colorGradingTexture.isReady();
    };
    /**
     * Binds the image processing to the shader.
     * @param effect The effect to bind to
     * @param overrideAspectRatio Override the aspect ratio of the effect
     */
    ImageProcessingConfiguration.prototype.bind = function (effect, overrideAspectRatio) {
        // Color Curves
        if (this._colorCurvesEnabled && this.colorCurves) {
            ColorCurves.Bind(this.colorCurves, effect);
        }
        // Vignette
        if (this._vignetteEnabled) {
            var inverseWidth = 1 / effect.getEngine().getRenderWidth();
            var inverseHeight = 1 / effect.getEngine().getRenderHeight();
            effect.setFloat2("vInverseScreenSize", inverseWidth, inverseHeight);
            var aspectRatio = overrideAspectRatio != null ? overrideAspectRatio : inverseHeight / inverseWidth;
            var vignetteScaleY = Math.tan(this.vignetteCameraFov * 0.5);
            var vignetteScaleX = vignetteScaleY * aspectRatio;
            var vignetteScaleGeometricMean = Math.sqrt(vignetteScaleX * vignetteScaleY);
            vignetteScaleX = Tools.Mix(vignetteScaleX, vignetteScaleGeometricMean, this.vignetteStretch);
            vignetteScaleY = Tools.Mix(vignetteScaleY, vignetteScaleGeometricMean, this.vignetteStretch);
            effect.setFloat4("vignetteSettings1", vignetteScaleX, vignetteScaleY, -vignetteScaleX * this.vignetteCentreX, -vignetteScaleY * this.vignetteCentreY);
            var vignettePower = -2.0 * this.vignetteWeight;
            effect.setFloat4("vignetteSettings2", this.vignetteColor.r, this.vignetteColor.g, this.vignetteColor.b, vignettePower);
        }
        // Exposure
        effect.setFloat("exposureLinear", this.exposure);
        // Contrast
        effect.setFloat("contrast", this.contrast);
        // Color transform settings
        if (this.colorGradingTexture) {
            effect.setTexture("txColorTransform", this.colorGradingTexture);
            var textureSize = this.colorGradingTexture.getSize().height;
            effect.setFloat4("colorTransformSettings", (textureSize - 1) / textureSize, // textureScale
            0.5 / textureSize, // textureOffset
            textureSize, // textureSize
            this.colorGradingTexture.level // weight
            );
        }
    };
    /**
     * Clones the current image processing instance.
     * @return The cloned image processing
     */
    ImageProcessingConfiguration.prototype.clone = function () {
        return SerializationHelper.Clone(function () { return new ImageProcessingConfiguration(); }, this);
    };
    /**
     * Serializes the current image processing instance to a json representation.
     * @return a JSON representation
     */
    ImageProcessingConfiguration.prototype.serialize = function () {
        return SerializationHelper.Serialize(this);
    };
    /**
     * Parses the image processing from a json representation.
     * @param source the JSON source to parse
     * @return The parsed image processing
     */
    ImageProcessingConfiguration.Parse = function (source) {
        return SerializationHelper.Parse(function () { return new ImageProcessingConfiguration(); }, source, null, null);
    };
    Object.defineProperty(ImageProcessingConfiguration, "VIGNETTEMODE_MULTIPLY", {
        /**
         * Used to apply the vignette as a mix with the pixel color.
         */
        get: function () {
            return this._VIGNETTEMODE_MULTIPLY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageProcessingConfiguration, "VIGNETTEMODE_OPAQUE", {
        /**
         * Used to apply the vignette as a replacement of the pixel color.
         */
        get: function () {
            return this._VIGNETTEMODE_OPAQUE;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Default tone mapping applied in BabylonJS.
     */
    ImageProcessingConfiguration.TONEMAPPING_STANDARD = 0;
    /**
     * ACES Tone mapping (used by default in unreal and unity). This can help getting closer
     * to other engines rendering to increase portability.
     */
    ImageProcessingConfiguration.TONEMAPPING_ACES = 1;
    // Static constants associated to the image processing.
    ImageProcessingConfiguration._VIGNETTEMODE_MULTIPLY = 0;
    ImageProcessingConfiguration._VIGNETTEMODE_OPAQUE = 1;
    __decorate([
        serializeAsColorCurves()
    ], ImageProcessingConfiguration.prototype, "colorCurves", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_colorCurvesEnabled", void 0);
    __decorate([
        serializeAsTexture("colorGradingTexture")
    ], ImageProcessingConfiguration.prototype, "_colorGradingTexture", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingEnabled", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingWithGreenDepth", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_colorGradingBGR", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_exposure", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_toneMappingEnabled", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_toneMappingType", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_contrast", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteStretch", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCentreX", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCentreY", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteWeight", void 0);
    __decorate([
        serializeAsColor4()
    ], ImageProcessingConfiguration.prototype, "vignetteColor", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "vignetteCameraFov", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_vignetteBlendMode", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_vignetteEnabled", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_skipFinalColorClamp", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_applyByPostProcess", void 0);
    __decorate([
        serialize()
    ], ImageProcessingConfiguration.prototype, "_isEnabled", void 0);
    return ImageProcessingConfiguration;
}());
// References the dependencies.
SerializationHelper._ImageProcessingConfigurationParser = ImageProcessingConfiguration.Parse;

/**
 * ActionEvent is the event being sent when an action is triggered.
 */
var ActionEvent = /** @class */ (function () {
    /**
     * Creates a new ActionEvent
     * @param source The mesh or sprite that triggered the action
     * @param pointerX The X mouse cursor position at the time of the event
     * @param pointerY The Y mouse cursor position at the time of the event
     * @param meshUnderPointer The mesh that is currently pointed at (can be null)
     * @param sourceEvent the original (browser) event that triggered the ActionEvent
     * @param additionalData additional data for the event
     */
    function ActionEvent(
    /** The mesh or sprite that triggered the action */
    source, 
    /** The X mouse cursor position at the time of the event */
    pointerX, 
    /** The Y mouse cursor position at the time of the event */
    pointerY, 
    /** The mesh that is currently pointed at (can be null) */
    meshUnderPointer, 
    /** the original (browser) event that triggered the ActionEvent */
    sourceEvent, 
    /** additional data for the event */
    additionalData) {
        this.source = source;
        this.pointerX = pointerX;
        this.pointerY = pointerY;
        this.meshUnderPointer = meshUnderPointer;
        this.sourceEvent = sourceEvent;
        this.additionalData = additionalData;
    }
    /**
     * Helper function to auto-create an ActionEvent from a source mesh.
     * @param source The source mesh that triggered the event
     * @param evt The original (browser) event
     * @param additionalData additional data for the event
     * @returns the new ActionEvent
     */
    ActionEvent.CreateNew = function (source, evt, additionalData) {
        var scene = source.getScene();
        return new ActionEvent(source, scene.pointerX, scene.pointerY, scene.meshUnderPointer || source, evt, additionalData);
    };
    /**
     * Helper function to auto-create an ActionEvent from a source sprite
     * @param source The source sprite that triggered the event
     * @param scene Scene associated with the sprite
     * @param evt The original (browser) event
     * @param additionalData additional data for the event
     * @returns the new ActionEvent
     */
    ActionEvent.CreateNewFromSprite = function (source, scene, evt, additionalData) {
        return new ActionEvent(source, scene.pointerX, scene.pointerY, scene.meshUnderPointer, evt, additionalData);
    };
    /**
     * Helper function to auto-create an ActionEvent from a scene. If triggered by a mesh use ActionEvent.CreateNew
     * @param scene the scene where the event occurred
     * @param evt The original (browser) event
     * @returns the new ActionEvent
     */
    ActionEvent.CreateNewFromScene = function (scene, evt) {
        return new ActionEvent(null, scene.pointerX, scene.pointerY, scene.meshUnderPointer, evt);
    };
    /**
     * Helper function to auto-create an ActionEvent from a primitive
     * @param prim defines the target primitive
     * @param pointerPos defines the pointer position
     * @param evt The original (browser) event
     * @param additionalData additional data for the event
     * @returns the new ActionEvent
     */
    ActionEvent.CreateNewFromPrimitive = function (prim, pointerPos, evt, additionalData) {
        return new ActionEvent(prim, pointerPos.x, pointerPos.y, null, evt, additionalData);
    };
    return ActionEvent;
}());

/**
 * Groups all the scene component constants in one place to ease maintenance.
 * @hidden
 */
var SceneComponentConstants = /** @class */ (function () {
    function SceneComponentConstants() {
    }
    SceneComponentConstants.NAME_EFFECTLAYER = "EffectLayer";
    SceneComponentConstants.NAME_LAYER = "Layer";
    SceneComponentConstants.NAME_LENSFLARESYSTEM = "LensFlareSystem";
    SceneComponentConstants.NAME_BOUNDINGBOXRENDERER = "BoundingBoxRenderer";
    SceneComponentConstants.NAME_PARTICLESYSTEM = "ParticleSystem";
    SceneComponentConstants.NAME_GAMEPAD = "Gamepad";
    SceneComponentConstants.NAME_SIMPLIFICATIONQUEUE = "SimplificationQueue";
    SceneComponentConstants.NAME_GEOMETRYBUFFERRENDERER = "GeometryBufferRenderer";
    SceneComponentConstants.NAME_PREPASSRENDERER = "PrePassRenderer";
    SceneComponentConstants.NAME_DEPTHRENDERER = "DepthRenderer";
    SceneComponentConstants.NAME_DEPTHPEELINGRENDERER = "DepthPeelingRenderer";
    SceneComponentConstants.NAME_POSTPROCESSRENDERPIPELINEMANAGER = "PostProcessRenderPipelineManager";
    SceneComponentConstants.NAME_SPRITE = "Sprite";
    SceneComponentConstants.NAME_SUBSURFACE = "SubSurface";
    SceneComponentConstants.NAME_OUTLINERENDERER = "Outline";
    SceneComponentConstants.NAME_PROCEDURALTEXTURE = "ProceduralTexture";
    SceneComponentConstants.NAME_SHADOWGENERATOR = "ShadowGenerator";
    SceneComponentConstants.NAME_OCTREE = "Octree";
    SceneComponentConstants.NAME_PHYSICSENGINE = "PhysicsEngine";
    SceneComponentConstants.NAME_AUDIO = "Audio";
    SceneComponentConstants.STEP_ISREADYFORMESH_EFFECTLAYER = 0;
    SceneComponentConstants.STEP_BEFOREEVALUATEACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_EVALUATESUBMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_PREACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    SceneComponentConstants.STEP_CAMERADRAWRENDERTARGET_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_BEFORECAMERADRAW_LAYER = 2;
    SceneComponentConstants.STEP_BEFORERENDERTARGETDRAW_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORERENDERTARGETDRAW_LAYER = 1;
    SceneComponentConstants.STEP_BEFORERENDERINGMESH_PREPASS = 0;
    SceneComponentConstants.STEP_BEFORERENDERINGMESH_OUTLINE = 1;
    SceneComponentConstants.STEP_AFTERRENDERINGMESH_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERINGMESH_OUTLINE = 1;
    SceneComponentConstants.STEP_AFTERRENDERINGGROUPDRAW_EFFECTLAYER_DRAW = 0;
    SceneComponentConstants.STEP_AFTERRENDERINGGROUPDRAW_BOUNDINGBOXRENDERER = 1;
    SceneComponentConstants.STEP_BEFORECAMERAUPDATE_SIMPLIFICATIONQUEUE = 0;
    SceneComponentConstants.STEP_BEFORECAMERAUPDATE_GAMEPAD = 1;
    SceneComponentConstants.STEP_BEFORECLEAR_PROCEDURALTEXTURE = 0;
    SceneComponentConstants.STEP_BEFORECLEAR_PREPASS = 1;
    SceneComponentConstants.STEP_BEFORERENDERTARGETCLEAR_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERTARGETDRAW_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERRENDERTARGETDRAW_LAYER = 1;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_PREPASS = 0;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER = 1;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_LENSFLARESYSTEM = 2;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_EFFECTLAYER_DRAW = 3;
    SceneComponentConstants.STEP_AFTERCAMERADRAW_LAYER = 4;
    SceneComponentConstants.STEP_AFTERRENDER_AUDIO = 0;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_DEPTHRENDERER = 0;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_GEOMETRYBUFFERRENDERER = 1;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR = 2;
    SceneComponentConstants.STEP_GATHERRENDERTARGETS_POSTPROCESSRENDERPIPELINEMANAGER = 3;
    SceneComponentConstants.STEP_GATHERACTIVECAMERARENDERTARGETS_DEPTHRENDERER = 0;
    SceneComponentConstants.STEP_POINTERMOVE_SPRITE = 0;
    SceneComponentConstants.STEP_POINTERDOWN_SPRITE = 0;
    SceneComponentConstants.STEP_POINTERUP_SPRITE = 0;
    return SceneComponentConstants;
}());
/**
 * Representation of a stage in the scene (Basically a list of ordered steps)
 * @hidden
 */
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    /**
     * Hide ctor from the rest of the world.
     * @param items The items to add.
     */
    function Stage(items) {
        return _super.apply(this, items) || this;
    }
    /**
     * Creates a new Stage.
     * @returns A new instance of a Stage
     */
    Stage.Create = function () {
        return Object.create(Stage.prototype);
    };
    /**
     * Registers a step in an ordered way in the targeted stage.
     * @param index Defines the position to register the step in
     * @param component Defines the component attached to the step
     * @param action Defines the action to launch during the step
     */
    Stage.prototype.registerStep = function (index, component, action) {
        var i = 0;
        var maxIndex = Number.MAX_VALUE;
        for (; i < this.length; i++) {
            var step = this[i];
            maxIndex = step.index;
            if (index < maxIndex) {
                break;
            }
        }
        this.splice(i, 0, { index: index, component: component, action: action.bind(component) });
    };
    /**
     * Clears all the steps from the stage.
     */
    Stage.prototype.clear = function () {
        this.length = 0;
    };
    return Stage;
}(Array));

/**
 * Abstract class used to decouple action Manager from scene and meshes.
 * Do not instantiate.
 * @see https://doc.babylonjs.com/how_to/how_to_use_actions
 */
var AbstractActionManager = /** @class */ (function () {
    function AbstractActionManager() {
        /** Gets the cursor to use when hovering items */
        this.hoverCursor = "";
        /** Gets the list of actions */
        this.actions = new Array();
        /**
         * Gets or sets a boolean indicating that the manager is recursive meaning that it can trigger action from children
         */
        this.isRecursive = false;
    }
    Object.defineProperty(AbstractActionManager, "HasTriggers", {
        /**
         * Does exist one action manager with at least one trigger
         **/
        get: function () {
            for (var t in AbstractActionManager.Triggers) {
                if (Object.prototype.hasOwnProperty.call(AbstractActionManager.Triggers, t)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractActionManager, "HasPickTriggers", {
        /**
         * Does exist one action manager with at least one pick trigger
         **/
        get: function () {
            for (var t in AbstractActionManager.Triggers) {
                if (Object.prototype.hasOwnProperty.call(AbstractActionManager.Triggers, t)) {
                    var tAsInt = parseInt(t);
                    if (tAsInt >= 1 && tAsInt <= 7) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Does exist one action manager that handles actions of a given trigger
     * @param trigger defines the trigger to be tested
     * @return a boolean indicating whether the trigger is handled by at least one action manager
     **/
    AbstractActionManager.HasSpecificTrigger = function (trigger) {
        for (var t in AbstractActionManager.Triggers) {
            if (Object.prototype.hasOwnProperty.call(AbstractActionManager.Triggers, t)) {
                var tAsInt = parseInt(t);
                if (tAsInt === trigger) {
                    return true;
                }
            }
        }
        return false;
    };
    /** Gets the list of active triggers */
    AbstractActionManager.Triggers = {};
    return AbstractActionManager;
}());

/**
 * Enum for Device Types
 */
var DeviceType;
(function (DeviceType) {
    /** Generic */
    DeviceType[DeviceType["Generic"] = 0] = "Generic";
    /** Keyboard */
    DeviceType[DeviceType["Keyboard"] = 1] = "Keyboard";
    /** Mouse */
    DeviceType[DeviceType["Mouse"] = 2] = "Mouse";
    /** Touch Pointers */
    DeviceType[DeviceType["Touch"] = 3] = "Touch";
    /** PS4 Dual Shock */
    DeviceType[DeviceType["DualShock"] = 4] = "DualShock";
    /** Xbox */
    DeviceType[DeviceType["Xbox"] = 5] = "Xbox";
    /** Switch Controller */
    DeviceType[DeviceType["Switch"] = 6] = "Switch";
    /** PS5 DualSense */
    DeviceType[DeviceType["DualSense"] = 7] = "DualSense";
})(DeviceType || (DeviceType = {}));
// Device Enums
/**
 * Enum for All Pointers (Touch/Mouse)
 */
var PointerInput;
(function (PointerInput) {
    /** Horizontal Axis (Not used in events/observables; only in polling) */
    PointerInput[PointerInput["Horizontal"] = 0] = "Horizontal";
    /** Vertical Axis (Not used in events/observables; only in polling) */
    PointerInput[PointerInput["Vertical"] = 1] = "Vertical";
    /** Left Click or Touch */
    PointerInput[PointerInput["LeftClick"] = 2] = "LeftClick";
    /** Middle Click */
    PointerInput[PointerInput["MiddleClick"] = 3] = "MiddleClick";
    /** Right Click */
    PointerInput[PointerInput["RightClick"] = 4] = "RightClick";
    /** Browser Back */
    PointerInput[PointerInput["BrowserBack"] = 5] = "BrowserBack";
    /** Browser Forward */
    PointerInput[PointerInput["BrowserForward"] = 6] = "BrowserForward";
    /** Mouse Wheel X */
    PointerInput[PointerInput["MouseWheelX"] = 7] = "MouseWheelX";
    /** Mouse Wheel Y */
    PointerInput[PointerInput["MouseWheelY"] = 8] = "MouseWheelY";
    /** Mouse Wheel Z */
    PointerInput[PointerInput["MouseWheelZ"] = 9] = "MouseWheelZ";
    /** Used in events/observables to identify if x/y changes occurred */
    PointerInput[PointerInput["Move"] = 12] = "Move";
})(PointerInput || (PointerInput = {}));
/** @hidden */
var NativePointerInput;
(function (NativePointerInput) {
    /** Horizontal Axis */
    NativePointerInput[NativePointerInput["Horizontal"] = 0] = "Horizontal";
    /** Vertical Axis */
    NativePointerInput[NativePointerInput["Vertical"] = 1] = "Vertical";
    /** Left Click or Touch */
    NativePointerInput[NativePointerInput["LeftClick"] = 2] = "LeftClick";
    /** Middle Click */
    NativePointerInput[NativePointerInput["MiddleClick"] = 3] = "MiddleClick";
    /** Right Click */
    NativePointerInput[NativePointerInput["RightClick"] = 4] = "RightClick";
    /** Browser Back */
    NativePointerInput[NativePointerInput["BrowserBack"] = 5] = "BrowserBack";
    /** Browser Forward */
    NativePointerInput[NativePointerInput["BrowserForward"] = 6] = "BrowserForward";
    /** Mouse Wheel X */
    NativePointerInput[NativePointerInput["MouseWheelX"] = 7] = "MouseWheelX";
    /** Mouse Wheel Y */
    NativePointerInput[NativePointerInput["MouseWheelY"] = 8] = "MouseWheelY";
    /** Mouse Wheel Z */
    NativePointerInput[NativePointerInput["MouseWheelZ"] = 9] = "MouseWheelZ";
    /** Delta X */
    NativePointerInput[NativePointerInput["DeltaHorizontal"] = 10] = "DeltaHorizontal";
    /** Delta Y */
    NativePointerInput[NativePointerInput["DeltaVertical"] = 11] = "DeltaVertical";
})(NativePointerInput || (NativePointerInput = {}));
/**
 * Enum for Dual Shock Gamepad
 */
var DualShockInput;
(function (DualShockInput) {
    /** Cross */
    DualShockInput[DualShockInput["Cross"] = 0] = "Cross";
    /** Circle */
    DualShockInput[DualShockInput["Circle"] = 1] = "Circle";
    /** Square */
    DualShockInput[DualShockInput["Square"] = 2] = "Square";
    /** Triangle */
    DualShockInput[DualShockInput["Triangle"] = 3] = "Triangle";
    /** L1 */
    DualShockInput[DualShockInput["L1"] = 4] = "L1";
    /** R1 */
    DualShockInput[DualShockInput["R1"] = 5] = "R1";
    /** L2 */
    DualShockInput[DualShockInput["L2"] = 6] = "L2";
    /** R2 */
    DualShockInput[DualShockInput["R2"] = 7] = "R2";
    /** Share */
    DualShockInput[DualShockInput["Share"] = 8] = "Share";
    /** Options */
    DualShockInput[DualShockInput["Options"] = 9] = "Options";
    /** L3 */
    DualShockInput[DualShockInput["L3"] = 10] = "L3";
    /** R3 */
    DualShockInput[DualShockInput["R3"] = 11] = "R3";
    /** DPadUp */
    DualShockInput[DualShockInput["DPadUp"] = 12] = "DPadUp";
    /** DPadDown */
    DualShockInput[DualShockInput["DPadDown"] = 13] = "DPadDown";
    /** DPadLeft */
    DualShockInput[DualShockInput["DPadLeft"] = 14] = "DPadLeft";
    /** DRight */
    DualShockInput[DualShockInput["DPadRight"] = 15] = "DPadRight";
    /** Home */
    DualShockInput[DualShockInput["Home"] = 16] = "Home";
    /** TouchPad */
    DualShockInput[DualShockInput["TouchPad"] = 17] = "TouchPad";
    /** LStickXAxis */
    DualShockInput[DualShockInput["LStickXAxis"] = 18] = "LStickXAxis";
    /** LStickYAxis */
    DualShockInput[DualShockInput["LStickYAxis"] = 19] = "LStickYAxis";
    /** RStickXAxis */
    DualShockInput[DualShockInput["RStickXAxis"] = 20] = "RStickXAxis";
    /** RStickYAxis */
    DualShockInput[DualShockInput["RStickYAxis"] = 21] = "RStickYAxis";
})(DualShockInput || (DualShockInput = {}));
/**
 * Enum for Dual Sense Gamepad
 */
var DualSenseInput;
(function (DualSenseInput) {
    /** Cross */
    DualSenseInput[DualSenseInput["Cross"] = 0] = "Cross";
    /** Circle */
    DualSenseInput[DualSenseInput["Circle"] = 1] = "Circle";
    /** Square */
    DualSenseInput[DualSenseInput["Square"] = 2] = "Square";
    /** Triangle */
    DualSenseInput[DualSenseInput["Triangle"] = 3] = "Triangle";
    /** L1 */
    DualSenseInput[DualSenseInput["L1"] = 4] = "L1";
    /** R1 */
    DualSenseInput[DualSenseInput["R1"] = 5] = "R1";
    /** L2 */
    DualSenseInput[DualSenseInput["L2"] = 6] = "L2";
    /** R2 */
    DualSenseInput[DualSenseInput["R2"] = 7] = "R2";
    /** Create */
    DualSenseInput[DualSenseInput["Create"] = 8] = "Create";
    /** Options */
    DualSenseInput[DualSenseInput["Options"] = 9] = "Options";
    /** L3 */
    DualSenseInput[DualSenseInput["L3"] = 10] = "L3";
    /** R3 */
    DualSenseInput[DualSenseInput["R3"] = 11] = "R3";
    /** DPadUp */
    DualSenseInput[DualSenseInput["DPadUp"] = 12] = "DPadUp";
    /** DPadDown */
    DualSenseInput[DualSenseInput["DPadDown"] = 13] = "DPadDown";
    /** DPadLeft */
    DualSenseInput[DualSenseInput["DPadLeft"] = 14] = "DPadLeft";
    /** DRight */
    DualSenseInput[DualSenseInput["DPadRight"] = 15] = "DPadRight";
    /** Home */
    DualSenseInput[DualSenseInput["Home"] = 16] = "Home";
    /** TouchPad */
    DualSenseInput[DualSenseInput["TouchPad"] = 17] = "TouchPad";
    /** LStickXAxis */
    DualSenseInput[DualSenseInput["LStickXAxis"] = 18] = "LStickXAxis";
    /** LStickYAxis */
    DualSenseInput[DualSenseInput["LStickYAxis"] = 19] = "LStickYAxis";
    /** RStickXAxis */
    DualSenseInput[DualSenseInput["RStickXAxis"] = 20] = "RStickXAxis";
    /** RStickYAxis */
    DualSenseInput[DualSenseInput["RStickYAxis"] = 21] = "RStickYAxis";
})(DualSenseInput || (DualSenseInput = {}));
/**
 * Enum for Xbox Gamepad
 */
var XboxInput;
(function (XboxInput) {
    /** A */
    XboxInput[XboxInput["A"] = 0] = "A";
    /** B */
    XboxInput[XboxInput["B"] = 1] = "B";
    /** X */
    XboxInput[XboxInput["X"] = 2] = "X";
    /** Y */
    XboxInput[XboxInput["Y"] = 3] = "Y";
    /** LB */
    XboxInput[XboxInput["LB"] = 4] = "LB";
    /** RB */
    XboxInput[XboxInput["RB"] = 5] = "RB";
    /** LT */
    XboxInput[XboxInput["LT"] = 6] = "LT";
    /** RT */
    XboxInput[XboxInput["RT"] = 7] = "RT";
    /** Back */
    XboxInput[XboxInput["Back"] = 8] = "Back";
    /** Start */
    XboxInput[XboxInput["Start"] = 9] = "Start";
    /** LS */
    XboxInput[XboxInput["LS"] = 10] = "LS";
    /** RS */
    XboxInput[XboxInput["RS"] = 11] = "RS";
    /** DPadUp */
    XboxInput[XboxInput["DPadUp"] = 12] = "DPadUp";
    /** DPadDown */
    XboxInput[XboxInput["DPadDown"] = 13] = "DPadDown";
    /** DPadLeft */
    XboxInput[XboxInput["DPadLeft"] = 14] = "DPadLeft";
    /** DRight */
    XboxInput[XboxInput["DPadRight"] = 15] = "DPadRight";
    /** Home */
    XboxInput[XboxInput["Home"] = 16] = "Home";
    /** LStickXAxis */
    XboxInput[XboxInput["LStickXAxis"] = 17] = "LStickXAxis";
    /** LStickYAxis */
    XboxInput[XboxInput["LStickYAxis"] = 18] = "LStickYAxis";
    /** RStickXAxis */
    XboxInput[XboxInput["RStickXAxis"] = 19] = "RStickXAxis";
    /** RStickYAxis */
    XboxInput[XboxInput["RStickYAxis"] = 20] = "RStickYAxis";
})(XboxInput || (XboxInput = {}));
/**
 * Enum for Switch (Pro/JoyCon L+R) Gamepad
 */
var SwitchInput;
(function (SwitchInput) {
    /** B */
    SwitchInput[SwitchInput["B"] = 0] = "B";
    /** A */
    SwitchInput[SwitchInput["A"] = 1] = "A";
    /** Y */
    SwitchInput[SwitchInput["Y"] = 2] = "Y";
    /** X */
    SwitchInput[SwitchInput["X"] = 3] = "X";
    /** L */
    SwitchInput[SwitchInput["L"] = 4] = "L";
    /** R */
    SwitchInput[SwitchInput["R"] = 5] = "R";
    /** ZL */
    SwitchInput[SwitchInput["ZL"] = 6] = "ZL";
    /** ZR */
    SwitchInput[SwitchInput["ZR"] = 7] = "ZR";
    /** Minus */
    SwitchInput[SwitchInput["Minus"] = 8] = "Minus";
    /** Plus */
    SwitchInput[SwitchInput["Plus"] = 9] = "Plus";
    /** LS */
    SwitchInput[SwitchInput["LS"] = 10] = "LS";
    /** RS */
    SwitchInput[SwitchInput["RS"] = 11] = "RS";
    /** DPadUp */
    SwitchInput[SwitchInput["DPadUp"] = 12] = "DPadUp";
    /** DPadDown */
    SwitchInput[SwitchInput["DPadDown"] = 13] = "DPadDown";
    /** DPadLeft */
    SwitchInput[SwitchInput["DPadLeft"] = 14] = "DPadLeft";
    /** DRight */
    SwitchInput[SwitchInput["DPadRight"] = 15] = "DPadRight";
    /** Home */
    SwitchInput[SwitchInput["Home"] = 16] = "Home";
    /** Capture */
    SwitchInput[SwitchInput["Capture"] = 17] = "Capture";
    /** LStickXAxis */
    SwitchInput[SwitchInput["LStickXAxis"] = 18] = "LStickXAxis";
    /** LStickYAxis */
    SwitchInput[SwitchInput["LStickYAxis"] = 19] = "LStickYAxis";
    /** RStickXAxis */
    SwitchInput[SwitchInput["RStickXAxis"] = 20] = "RStickXAxis";
    /** RStickYAxis */
    SwitchInput[SwitchInput["RStickYAxis"] = 21] = "RStickYAxis";
})(SwitchInput || (SwitchInput = {}));

/**
 * Class to wrap DeviceInputSystem data into an event object
 */
var DeviceEventFactory = /** @class */ (function () {
    function DeviceEventFactory() {
    }
    /**
     * Create device input events based on provided type and slot
     *
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object
     */
    DeviceEventFactory.CreateDeviceEvent = function (deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        switch (deviceType) {
            case DeviceType.Keyboard:
                return this._CreateKeyboardEvent(inputIndex, currentState, deviceInputSystem, elementToAttachTo);
            case DeviceType.Mouse:
                if (inputIndex === PointerInput.MouseWheelX || inputIndex === PointerInput.MouseWheelY || inputIndex === PointerInput.MouseWheelZ) {
                    return this._CreateWheelEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
                }
            // eslint-disable-next-line no-fallthrough
            case DeviceType.Touch:
                return this._CreatePointerEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
            default:
                throw "Unable to generate event for device ".concat(DeviceType[deviceType]);
        }
    };
    /**
     * Creates pointer event
     *
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Pointer)
     */
    DeviceEventFactory._CreatePointerEvent = function (deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        var evt = this._CreateMouseEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
        if (deviceType === DeviceType.Mouse) {
            evt.deviceType = DeviceType.Mouse;
            evt.pointerId = 1;
            evt.pointerType = "mouse";
        }
        else {
            evt.deviceType = DeviceType.Touch;
            evt.pointerId = deviceSlot;
            evt.pointerType = "touch";
        }
        if (inputIndex === PointerInput.Move) {
            evt.type = "pointermove";
        }
        else if (inputIndex >= PointerInput.LeftClick && inputIndex <= PointerInput.RightClick) {
            evt.type = currentState === 1 ? "pointerdown" : "pointerup";
            evt.button = inputIndex - 2;
        }
        return evt;
    };
    /**
     * Create Mouse Wheel Event
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Wheel)
     */
    DeviceEventFactory._CreateWheelEvent = function (deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        var evt = this._CreateMouseEvent(deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo);
        evt.type = "wheel";
        evt.deltaMode = EventConstants.DOM_DELTA_PIXEL;
        evt.deltaX = 0;
        evt.deltaY = 0;
        evt.deltaZ = 0;
        switch (inputIndex) {
            case PointerInput.MouseWheelX:
                evt.deltaX = currentState;
                break;
            case PointerInput.MouseWheelY:
                evt.deltaY = currentState;
                break;
            case PointerInput.MouseWheelZ:
                evt.deltaZ = currentState;
                break;
        }
        return evt;
    };
    /**
     * Create Mouse Event
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Mouse)
     */
    DeviceEventFactory._CreateMouseEvent = function (deviceType, deviceSlot, inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        var evt = this._CreateEvent(elementToAttachTo);
        var pointerX = deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.Horizontal);
        var pointerY = deviceInputSystem.pollInput(deviceType, deviceSlot, PointerInput.Vertical);
        // Handle offsets/deltas based on existence of HTMLElement
        if (elementToAttachTo) {
            evt.movementX = 0;
            evt.movementY = 0;
            evt.offsetX = evt.movementX - elementToAttachTo.getBoundingClientRect().x;
            evt.offsetY = evt.movementY - elementToAttachTo.getBoundingClientRect().y;
        }
        else {
            evt.movementX = deviceInputSystem.pollInput(deviceType, deviceSlot, NativePointerInput.DeltaHorizontal); // DeltaHorizontal
            evt.movementY = deviceInputSystem.pollInput(deviceType, deviceSlot, NativePointerInput.DeltaVertical); // DeltaVertical
            evt.offsetX = 0;
            evt.offsetY = 0;
        }
        this._CheckNonCharacterKeys(evt, deviceInputSystem);
        evt.clientX = pointerX;
        evt.clientY = pointerY;
        evt.x = pointerX;
        evt.y = pointerY;
        evt.deviceType = deviceType;
        evt.deviceSlot = deviceSlot;
        evt.inputIndex = inputIndex;
        return evt;
    };
    /**
     * Create Keyboard Event
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IEvent object (Keyboard)
     */
    DeviceEventFactory._CreateKeyboardEvent = function (inputIndex, currentState, deviceInputSystem, elementToAttachTo) {
        var evt = this._CreateEvent(elementToAttachTo);
        this._CheckNonCharacterKeys(evt, deviceInputSystem);
        evt.deviceType = DeviceType.Keyboard;
        evt.deviceSlot = 0;
        evt.inputIndex = inputIndex;
        evt.type = currentState === 1 ? "keydown" : "keyup";
        evt.key = String.fromCharCode(inputIndex);
        evt.keyCode = inputIndex;
        return evt;
    };
    /**
     * Add parameters for non-character keys (Ctrl, Alt, Meta, Shift)
     * @param evt Event object to add parameters to
     * @param deviceInputSystem DeviceInputSystem to pull values from
     */
    DeviceEventFactory._CheckNonCharacterKeys = function (evt, deviceInputSystem) {
        var isKeyboardActive = deviceInputSystem.isDeviceAvailable(DeviceType.Keyboard);
        var altKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 18) === 1;
        var ctrlKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 17) === 1;
        var metaKey = isKeyboardActive &&
            (deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 91) === 1 ||
                deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 92) === 1 ||
                deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 93) === 1);
        var shiftKey = isKeyboardActive && deviceInputSystem.pollInput(DeviceType.Keyboard, 0, 16) === 1;
        evt.altKey = altKey;
        evt.ctrlKey = ctrlKey;
        evt.metaKey = metaKey;
        evt.shiftKey = shiftKey;
    };
    /**
     * Create base event object
     * @param elementToAttachTo Value to use as event target
     * @returns
     */
    DeviceEventFactory._CreateEvent = function (elementToAttachTo) {
        var evt = {};
        evt.preventDefault = function () { };
        evt.target = elementToAttachTo;
        return evt;
    };
    return DeviceEventFactory;
}());

/** @hidden */
var NativeDeviceInputSystem = /** @class */ (function () {
    function NativeDeviceInputSystem(onDeviceConnected, onDeviceDisconnected, onInputChanged) {
        var _this = this;
        this._nativeInput = _native.DeviceInputSystem
            ? new _native.DeviceInputSystem(onDeviceConnected, onDeviceDisconnected, function (deviceType, deviceSlot, inputIndex, currentState) {
                var evt = DeviceEventFactory.CreateDeviceEvent(deviceType, deviceSlot, inputIndex, currentState, _this);
                onInputChanged(deviceType, deviceSlot, evt);
            })
            : this._createDummyNativeInput();
    }
    // Public functions
    /**
     * Checks for current device input value, given an id and input index. Throws exception if requested device not initialized.
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @returns Current value of input
     */
    NativeDeviceInputSystem.prototype.pollInput = function (deviceType, deviceSlot, inputIndex) {
        return this._nativeInput.pollInput(deviceType, deviceSlot, inputIndex);
    };
    /**
     * Check for a specific device in the DeviceInputSystem
     * @param deviceType Type of device to check for
     * @returns bool with status of device's existence
     */
    NativeDeviceInputSystem.prototype.isDeviceAvailable = function (deviceType) {
        //TODO: FIx native side first
        return deviceType === DeviceType.Mouse || deviceType === DeviceType.Touch;
    };
    /**
     * Dispose of all the observables
     */
    NativeDeviceInputSystem.prototype.dispose = function () {
        this._nativeInput.dispose();
    };
    /**
     * For versions of BabylonNative that don't have the NativeInput plugin initialized, create a dummy version
     * @returns Object with dummy functions
     */
    NativeDeviceInputSystem.prototype._createDummyNativeInput = function () {
        var nativeInput = {
            pollInput: function () {
                return 0;
            },
            isDeviceAvailable: function () {
                return false;
            },
            dispose: function () { },
        };
        return nativeInput;
    };
    return NativeDeviceInputSystem;
}());

// eslint-disable-next-line @typescript-eslint/naming-convention
var MAX_KEYCODES = 255;
// eslint-disable-next-line @typescript-eslint/naming-convention
var MAX_POINTER_INPUTS = Object.keys(PointerInput).length / 2;
/** @hidden */
var WebDeviceInputSystem = /** @class */ (function () {
    function WebDeviceInputSystem(engine, onDeviceConnected, onDeviceDisconnected, onInputChanged) {
        var _this = this;
        // Private Members
        this._inputs = [];
        this._keyboardActive = false;
        this._pointerActive = false;
        this._usingSafari = Tools.IsSafari();
        // Found solution for determining if MacOS is being used here:
        // https://stackoverflow.com/questions/10527983/best-way-to-detect-mac-os-x-or-windows-computers-with-javascript-or-jquery
        this._usingMacOS = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._keyboardDownEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._keyboardUpEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._keyboardBlurEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerMoveEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerDownEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerUpEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerCancelEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerWheelEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._pointerBlurEvent = function (evt) { };
        this._eventsAttached = false;
        this._mouseId = -1;
        this._isUsingFirefox = DomManagement.IsNavigatorAvailable() && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1;
        this._maxTouchPoints = 0;
        this._pointerInputClearObserver = null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._gamepadConnectedEvent = function (evt) { };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._gamepadDisconnectedEvent = function (evt) { };
        this._eventPrefix = Tools.GetPointerPrefix(engine);
        this._engine = engine;
        this._onDeviceConnected = onDeviceConnected;
        this._onDeviceDisconnected = onDeviceDisconnected;
        this._onInputChanged = onInputChanged;
        this._enableEvents();
        if (this._usingMacOS) {
            this._metaKeys = [];
        }
        // Set callback to enable event handler switching when inputElement changes
        if (!this._engine._onEngineViewChanged) {
            this._engine._onEngineViewChanged = function () {
                _this._enableEvents();
            };
        }
    }
    // Public functions
    /**
     * Checks for current device input value, given an id and input index. Throws exception if requested device not initialized.
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @returns Current value of input
     */
    WebDeviceInputSystem.prototype.pollInput = function (deviceType, deviceSlot, inputIndex) {
        var device = this._inputs[deviceType][deviceSlot];
        if (!device) {
            throw "Unable to find device ".concat(DeviceType[deviceType]);
        }
        if (deviceType >= DeviceType.DualShock && deviceType <= DeviceType.DualSense) {
            this._updateDevice(deviceType, deviceSlot, inputIndex);
        }
        var currentValue = device[inputIndex];
        if (currentValue === undefined) {
            throw "Unable to find input ".concat(inputIndex, " for device ").concat(DeviceType[deviceType], " in slot ").concat(deviceSlot);
        }
        if (inputIndex === PointerInput.Move) {
            Tools.Warn("Unable to provide information for PointerInput.Move.  Try using PointerInput.Horizontal or PointerInput.Vertical for move data.");
        }
        return currentValue;
    };
    /**
     * Check for a specific device in the DeviceInputSystem
     * @param deviceType Type of device to check for
     * @returns bool with status of device's existence
     */
    WebDeviceInputSystem.prototype.isDeviceAvailable = function (deviceType) {
        return this._inputs[deviceType] !== undefined;
    };
    /**
     * Dispose of all the eventlisteners
     */
    WebDeviceInputSystem.prototype.dispose = function () {
        // Callbacks
        this._onDeviceConnected = function () { };
        this._onDeviceDisconnected = function () { };
        this._onInputChanged = function () { };
        delete this._engine._onEngineViewChanged;
        if (this._elementToAttachTo) {
            this._disableEvents();
        }
    };
    /**
     * Enable listening for user input events
     */
    WebDeviceInputSystem.prototype._enableEvents = function () {
        var inputElement = this === null || this === void 0 ? void 0 : this._engine.getInputElement();
        if (inputElement && (!this._eventsAttached || this._elementToAttachTo !== inputElement)) {
            // Remove events before adding to avoid double events or simultaneous events on multiple canvases
            this._disableEvents();
            // If the inputs array has already been created, zero it out to before setting up events
            if (this._inputs) {
                for (var _i = 0, _a = this._inputs; _i < _a.length; _i++) {
                    var inputs = _a[_i];
                    if (inputs) {
                        for (var deviceSlotKey in inputs) {
                            var deviceSlot = +deviceSlotKey;
                            var device = inputs[deviceSlot];
                            if (device) {
                                for (var inputIndex = 0; inputIndex < device.length; inputIndex++) {
                                    device[inputIndex] = 0;
                                }
                            }
                        }
                    }
                }
            }
            this._elementToAttachTo = inputElement;
            // Set tab index for the inputElement to the engine's canvasTabIndex, if and only if the element's tab index is -1
            this._elementToAttachTo.tabIndex = this._elementToAttachTo.tabIndex !== -1 ? this._elementToAttachTo.tabIndex : this._engine.canvasTabIndex;
            this._handleKeyActions();
            this._handlePointerActions();
            this._handleGamepadActions();
            this._eventsAttached = true;
            // Check for devices that are already connected but aren't registered. Currently, only checks for gamepads and mouse
            this._checkForConnectedDevices();
        }
    };
    /**
     * Disable listening for user input events
     */
    WebDeviceInputSystem.prototype._disableEvents = function () {
        if (this._elementToAttachTo) {
            // Blur Events
            this._elementToAttachTo.removeEventListener("blur", this._keyboardBlurEvent);
            this._elementToAttachTo.removeEventListener("blur", this._pointerBlurEvent);
            // Keyboard Events
            this._elementToAttachTo.removeEventListener("keydown", this._keyboardDownEvent);
            this._elementToAttachTo.removeEventListener("keyup", this._keyboardUpEvent);
            // Pointer Events
            this._elementToAttachTo.removeEventListener(this._eventPrefix + "move", this._pointerMoveEvent);
            this._elementToAttachTo.removeEventListener(this._eventPrefix + "down", this._pointerDownEvent);
            this._elementToAttachTo.removeEventListener(this._eventPrefix + "up", this._pointerUpEvent);
            this._elementToAttachTo.removeEventListener(this._eventPrefix + "cancel", this._pointerCancelEvent);
            this._elementToAttachTo.removeEventListener(this._wheelEventName, this._pointerWheelEvent);
            // Gamepad Events
            window.removeEventListener("gamepadconnected", this._gamepadConnectedEvent);
            window.removeEventListener("gamepaddisconnected", this._gamepadDisconnectedEvent);
        }
        if (this._pointerInputClearObserver) {
            this._engine.onEndFrameObservable.remove(this._pointerInputClearObserver);
        }
        this._eventsAttached = false;
    };
    /**
     * Checks for existing connections to devices and register them, if necessary
     * Currently handles gamepads and mouse
     */
    WebDeviceInputSystem.prototype._checkForConnectedDevices = function () {
        if (navigator.getGamepads) {
            var gamepads = navigator.getGamepads();
            for (var _i = 0, gamepads_1 = gamepads; _i < gamepads_1.length; _i++) {
                var gamepad = gamepads_1[_i];
                if (gamepad) {
                    this._addGamePad(gamepad);
                }
            }
        }
        // If the device in use has mouse capabilities, pre-register mouse
        if (typeof matchMedia === "function" && matchMedia("(pointer:fine)").matches) {
            // This will provide a dummy value for the cursor position and is expected to be overridden when the first mouse event happens.
            // There isn't any good way to get the current position outside of a pointer event so that's why this was done.
            this._addPointerDevice(DeviceType.Mouse, 0, 0, 0);
        }
    };
    // Private functions
    /**
     * Add a gamepad to the DeviceInputSystem
     * @param gamepad A single DOM Gamepad object
     */
    WebDeviceInputSystem.prototype._addGamePad = function (gamepad) {
        var deviceType = this._getGamepadDeviceType(gamepad.id);
        var deviceSlot = gamepad.index;
        this._gamepads = this._gamepads || new Array(gamepad.index + 1);
        this._registerDevice(deviceType, deviceSlot, gamepad.buttons.length + gamepad.axes.length);
        this._gamepads[deviceSlot] = deviceType;
    };
    /**
     * Add pointer device to DeviceInputSystem
     * @param deviceType Type of Pointer to add
     * @param deviceSlot Pointer ID (0 for mouse, pointerId for Touch)
     * @param currentX Current X at point of adding
     * @param currentY Current Y at point of adding
     */
    WebDeviceInputSystem.prototype._addPointerDevice = function (deviceType, deviceSlot, currentX, currentY) {
        if (!this._pointerActive) {
            this._pointerActive = true;
        }
        this._registerDevice(deviceType, deviceSlot, MAX_POINTER_INPUTS);
        var pointer = this._inputs[deviceType][deviceSlot]; /* initialize our pointer position immediately after registration */
        pointer[0] = currentX;
        pointer[1] = currentY;
    };
    /**
     * Add device and inputs to device array
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param numberOfInputs Number of input entries to create for given device
     */
    WebDeviceInputSystem.prototype._registerDevice = function (deviceType, deviceSlot, numberOfInputs) {
        if (deviceSlot === undefined) {
            throw "Unable to register device ".concat(DeviceType[deviceType], " to undefined slot.");
        }
        if (!this._inputs[deviceType]) {
            this._inputs[deviceType] = {};
        }
        if (!this._inputs[deviceType][deviceSlot]) {
            var device = new Array(numberOfInputs);
            device.fill(0);
            this._inputs[deviceType][deviceSlot] = device;
            this._onDeviceConnected(deviceType, deviceSlot);
        }
    };
    /**
     * Given a specific device name, remove that device from the device map
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     */
    WebDeviceInputSystem.prototype._unregisterDevice = function (deviceType, deviceSlot) {
        if (this._inputs[deviceType][deviceSlot]) {
            delete this._inputs[deviceType][deviceSlot];
            this._onDeviceDisconnected(deviceType, deviceSlot);
        }
    };
    /**
     * Handle all actions that come from keyboard interaction
     */
    WebDeviceInputSystem.prototype._handleKeyActions = function () {
        var _this = this;
        this._keyboardDownEvent = function (evt) {
            if (!_this._keyboardActive) {
                _this._keyboardActive = true;
                _this._registerDevice(DeviceType.Keyboard, 0, MAX_KEYCODES);
            }
            var kbKey = _this._inputs[DeviceType.Keyboard][0];
            if (kbKey) {
                kbKey[evt.keyCode] = 1;
                var deviceEvent = evt;
                deviceEvent.inputIndex = evt.keyCode;
                if (_this._usingMacOS && evt.metaKey && evt.key !== "Meta") {
                    if (!_this._metaKeys.includes(evt.keyCode)) {
                        _this._metaKeys.push(evt.keyCode);
                    }
                }
                _this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
            }
        };
        this._keyboardUpEvent = function (evt) {
            if (!_this._keyboardActive) {
                _this._keyboardActive = true;
                _this._registerDevice(DeviceType.Keyboard, 0, MAX_KEYCODES);
            }
            var kbKey = _this._inputs[DeviceType.Keyboard][0];
            if (kbKey) {
                kbKey[evt.keyCode] = 0;
                var deviceEvent = evt;
                deviceEvent.inputIndex = evt.keyCode;
                if (_this._usingMacOS && evt.key === "Meta" && _this._metaKeys.length > 0) {
                    for (var _i = 0, _a = _this._metaKeys; _i < _a.length; _i++) {
                        var keyCode = _a[_i];
                        var deviceEvent_1 = DeviceEventFactory.CreateDeviceEvent(DeviceType.Keyboard, 0, keyCode, 0, _this, _this._elementToAttachTo);
                        kbKey[keyCode] = 0;
                        _this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent_1);
                    }
                    _this._metaKeys.splice(0, _this._metaKeys.length);
                }
                _this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
            }
        };
        this._keyboardBlurEvent = function () {
            if (_this._keyboardActive) {
                var kbKey = _this._inputs[DeviceType.Keyboard][0];
                for (var i = 0; i < kbKey.length; i++) {
                    if (kbKey[i] !== 0) {
                        kbKey[i] = 0;
                        var deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Keyboard, 0, i, 0, _this, _this._elementToAttachTo);
                        _this._onInputChanged(DeviceType.Keyboard, 0, deviceEvent);
                    }
                }
                if (_this._usingMacOS) {
                    _this._metaKeys.splice(0, _this._metaKeys.length);
                }
            }
        };
        this._elementToAttachTo.addEventListener("keydown", this._keyboardDownEvent);
        this._elementToAttachTo.addEventListener("keyup", this._keyboardUpEvent);
        this._elementToAttachTo.addEventListener("blur", this._keyboardBlurEvent);
    };
    /**
     * Handle all actions that come from pointer interaction
     */
    WebDeviceInputSystem.prototype._handlePointerActions = function () {
        var _this = this;
        // If maxTouchPoints is defined, use that value.  Otherwise, allow for a minimum for supported gestures like pinch
        this._maxTouchPoints = (DomManagement.IsNavigatorAvailable() && navigator.maxTouchPoints) || 2;
        if (!this._activeTouchIds) {
            this._activeTouchIds = new Array(this._maxTouchPoints);
        }
        for (var i = 0; i < this._maxTouchPoints; i++) {
            this._activeTouchIds[i] = -1;
        }
        this._pointerMoveEvent = function (evt) {
            var deviceType = _this._getPointerType(evt);
            var deviceSlot = deviceType === DeviceType.Mouse ? 0 : _this._activeTouchIds.indexOf(evt.pointerId);
            if (!_this._inputs[deviceType]) {
                _this._inputs[deviceType] = {};
            }
            if (!_this._inputs[deviceType][deviceSlot]) {
                _this._addPointerDevice(deviceType, deviceSlot, evt.clientX, evt.clientY);
            }
            var pointer = _this._inputs[deviceType][deviceSlot];
            if (pointer) {
                pointer[PointerInput.Horizontal] = evt.clientX;
                pointer[PointerInput.Vertical] = evt.clientY;
                var deviceEvent = evt;
                deviceEvent.inputIndex = PointerInput.Move;
                _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                // Lets Propagate the event for move with same position.
                if (!_this._usingSafari && evt.button !== -1) {
                    deviceEvent.inputIndex = evt.button + 2;
                    pointer[evt.button + 2] = pointer[evt.button + 2] ? 0 : 1; // Reverse state of button if evt.button has value
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
            }
        };
        this._pointerDownEvent = function (evt) {
            var deviceType = _this._getPointerType(evt);
            var deviceSlot = deviceType === DeviceType.Mouse ? 0 : evt.pointerId;
            if (deviceType === DeviceType.Touch) {
                var idx = _this._activeTouchIds.indexOf(-1);
                if (idx >= 0) {
                    deviceSlot = idx;
                    _this._activeTouchIds[idx] = evt.pointerId;
                }
                else {
                    // We can't find an open slot to store new pointer so just return (can only support max number of touches)
                    Tools.Warn("Max number of touches exceeded.  Ignoring touches in excess of ".concat(_this._maxTouchPoints));
                    return;
                }
            }
            if (!_this._inputs[deviceType]) {
                _this._inputs[deviceType] = {};
            }
            if (!_this._inputs[deviceType][deviceSlot]) {
                _this._addPointerDevice(deviceType, deviceSlot, evt.clientX, evt.clientY);
            }
            else if (deviceType === DeviceType.Touch) {
                _this._onDeviceConnected(deviceType, deviceSlot);
            }
            var pointer = _this._inputs[deviceType][deviceSlot];
            if (pointer) {
                var previousHorizontal = pointer[PointerInput.Horizontal];
                var previousVertical = pointer[PointerInput.Vertical];
                if (deviceType === DeviceType.Mouse) {
                    // Mouse; Among supported browsers, value is either 1 or 0 for mouse
                    if (_this._mouseId === -1) {
                        if (evt.pointerId === undefined) {
                            // If there is no pointerId (eg. manually dispatched MouseEvent)
                            _this._mouseId = _this._isUsingFirefox ? 0 : 1;
                        }
                        else {
                            _this._mouseId = evt.pointerId;
                        }
                    }
                    if (!document.pointerLockElement) {
                        try {
                            _this._elementToAttachTo.setPointerCapture(_this._mouseId);
                        }
                        catch (e) {
                            // DO NOTHING
                        }
                    }
                }
                else {
                    // Touch; Since touches are dynamically assigned, only set capture if we have an id
                    if (evt.pointerId && !document.pointerLockElement) {
                        try {
                            _this._elementToAttachTo.setPointerCapture(evt.pointerId);
                        }
                        catch (e) {
                            // DO NOTHING
                        }
                    }
                }
                pointer[PointerInput.Horizontal] = evt.clientX;
                pointer[PointerInput.Vertical] = evt.clientY;
                pointer[evt.button + 2] = 1;
                var deviceEvent = evt;
                // NOTE: The +2 used here to is because PointerInput has the same value progression for its mouse buttons as PointerEvent.button
                // However, we have our X and Y values front-loaded to group together the touch inputs but not break this progression
                // EG. ([X, Y, Left-click], Middle-click, etc...)
                deviceEvent.inputIndex = evt.button + 2;
                _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                if (previousHorizontal !== evt.clientX || previousVertical !== evt.clientY) {
                    deviceEvent.inputIndex = PointerInput.Move;
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
            }
        };
        this._pointerUpEvent = function (evt) {
            var _a, _b, _c, _d, _e;
            var deviceType = _this._getPointerType(evt);
            var deviceSlot = deviceType === DeviceType.Mouse ? 0 : _this._activeTouchIds.indexOf(evt.pointerId);
            if (deviceType === DeviceType.Touch) {
                if (deviceSlot === -1) {
                    return;
                }
                else {
                    _this._activeTouchIds[deviceSlot] = -1;
                }
            }
            var pointer = (_a = _this._inputs[deviceType]) === null || _a === void 0 ? void 0 : _a[deviceSlot];
            if (pointer && pointer[evt.button + 2] !== 0) {
                var previousHorizontal = pointer[PointerInput.Horizontal];
                var previousVertical = pointer[PointerInput.Vertical];
                pointer[PointerInput.Horizontal] = evt.clientX;
                pointer[PointerInput.Vertical] = evt.clientY;
                pointer[evt.button + 2] = 0;
                var deviceEvent = evt;
                if (previousHorizontal !== evt.clientX || previousVertical !== evt.clientY) {
                    deviceEvent.inputIndex = PointerInput.Move;
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
                // NOTE: The +2 used here to is because PointerInput has the same value progression for its mouse buttons as PointerEvent.button
                // However, we have our X and Y values front-loaded to group together the touch inputs but not break this progression
                // EG. ([X, Y, Left-click], Middle-click, etc...)
                deviceEvent.inputIndex = evt.button + 2;
                if (deviceType === DeviceType.Mouse && _this._mouseId >= 0 && ((_c = (_b = _this._elementToAttachTo).hasPointerCapture) === null || _c === void 0 ? void 0 : _c.call(_b, _this._mouseId))) {
                    _this._elementToAttachTo.releasePointerCapture(_this._mouseId);
                }
                else if (evt.pointerId && ((_e = (_d = _this._elementToAttachTo).hasPointerCapture) === null || _e === void 0 ? void 0 : _e.call(_d, evt.pointerId))) {
                    _this._elementToAttachTo.releasePointerCapture(evt.pointerId);
                }
                _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                if (deviceType === DeviceType.Touch) {
                    _this._onDeviceDisconnected(deviceType, deviceSlot);
                }
            }
        };
        this._pointerCancelEvent = function (evt) {
            var _a, _b, _c, _d;
            if (evt.pointerType === "mouse") {
                var pointer = _this._inputs[DeviceType.Mouse][0];
                if (_this._mouseId >= 0 && ((_b = (_a = _this._elementToAttachTo).hasPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, _this._mouseId))) {
                    _this._elementToAttachTo.releasePointerCapture(_this._mouseId);
                }
                for (var inputIndex = PointerInput.LeftClick; inputIndex <= PointerInput.BrowserForward; inputIndex++) {
                    if (pointer[inputIndex] === 1) {
                        pointer[inputIndex] = 0;
                        var deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Mouse, 0, inputIndex, 0, _this, _this._elementToAttachTo);
                        _this._onInputChanged(DeviceType.Mouse, 0, deviceEvent);
                    }
                }
            }
            else {
                var deviceSlot = _this._activeTouchIds.indexOf(evt.pointerId);
                if ((_d = (_c = _this._elementToAttachTo).hasPointerCapture) === null || _d === void 0 ? void 0 : _d.call(_c, evt.pointerId)) {
                    _this._elementToAttachTo.releasePointerCapture(evt.pointerId);
                }
                _this._inputs[DeviceType.Touch][deviceSlot][PointerInput.LeftClick] = 0;
                var deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Touch, deviceSlot, PointerInput.LeftClick, 0, _this, _this._elementToAttachTo);
                _this._onInputChanged(DeviceType.Touch, deviceSlot, deviceEvent);
                _this._activeTouchIds[deviceSlot] = -1;
                _this._onDeviceDisconnected(DeviceType.Touch, deviceSlot);
            }
        };
        // Set Wheel Event Name, code originally from scene.inputManager
        this._wheelEventName =
            "onwheel" in document.createElement("div")
                ? "wheel" // Modern browsers support "wheel"
                : document.onmousewheel !== undefined
                    ? "mousewheel" // Webkit and IE support at least "mousewheel"
                    : "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
        // Code originally in scene.inputManager.ts
        // Chrome reports warning in console if wheel listener doesn't set an explicit passive option.
        // IE11 only supports captureEvent:boolean, not options:object, and it defaults to false.
        // Feature detection technique copied from: https://github.com/github/eventlistener-polyfill (MIT license)
        var passiveSupported = false;
        var noop = function () { };
        try {
            var options = Object.defineProperty({}, "passive", {
                get: function () {
                    passiveSupported = true;
                },
            });
            this._elementToAttachTo.addEventListener("test", noop, options);
            this._elementToAttachTo.removeEventListener("test", noop, options);
        }
        catch (e) {
            /* */
        }
        this._pointerBlurEvent = function () {
            var _a, _b, _c, _d, _e;
            // Handle mouse buttons
            if (_this.isDeviceAvailable(DeviceType.Mouse)) {
                var pointer = _this._inputs[DeviceType.Mouse][0];
                if (_this._mouseId >= 0 && ((_b = (_a = _this._elementToAttachTo).hasPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, _this._mouseId))) {
                    _this._elementToAttachTo.releasePointerCapture(_this._mouseId);
                }
                for (var inputIndex = PointerInput.LeftClick; inputIndex <= PointerInput.BrowserForward; inputIndex++) {
                    if (pointer[inputIndex] === 1) {
                        pointer[inputIndex] = 0;
                        var deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Mouse, 0, inputIndex, 0, _this, _this._elementToAttachTo);
                        _this._onInputChanged(DeviceType.Mouse, 0, deviceEvent);
                    }
                }
            }
            // Handle Active Touches
            if (_this.isDeviceAvailable(DeviceType.Touch)) {
                var pointer = _this._inputs[DeviceType.Touch];
                for (var deviceSlot = 0; deviceSlot < _this._activeTouchIds.length; deviceSlot++) {
                    var pointerId = _this._activeTouchIds[deviceSlot];
                    if ((_d = (_c = _this._elementToAttachTo).hasPointerCapture) === null || _d === void 0 ? void 0 : _d.call(_c, pointerId)) {
                        _this._elementToAttachTo.releasePointerCapture(pointerId);
                    }
                    if (pointerId !== -1 && ((_e = pointer[deviceSlot]) === null || _e === void 0 ? void 0 : _e[PointerInput.LeftClick]) === 1) {
                        pointer[deviceSlot][PointerInput.LeftClick] = 0;
                        var deviceEvent = DeviceEventFactory.CreateDeviceEvent(DeviceType.Touch, deviceSlot, PointerInput.LeftClick, 0, _this, _this._elementToAttachTo);
                        _this._onInputChanged(DeviceType.Touch, deviceSlot, deviceEvent);
                        _this._activeTouchIds[deviceSlot] = -1;
                        _this._onDeviceDisconnected(DeviceType.Touch, deviceSlot);
                    }
                }
            }
        };
        this._pointerWheelEvent = function (evt) {
            var deviceType = DeviceType.Mouse;
            var deviceSlot = 0;
            if (!_this._inputs[deviceType]) {
                _this._inputs[deviceType] = [];
            }
            if (!_this._inputs[deviceType][deviceSlot]) {
                _this._pointerActive = true;
                _this._registerDevice(deviceType, deviceSlot, MAX_POINTER_INPUTS);
            }
            var pointer = _this._inputs[deviceType][deviceSlot];
            if (pointer) {
                pointer[PointerInput.MouseWheelX] = evt.deltaX || 0;
                pointer[PointerInput.MouseWheelY] = evt.deltaY || evt.wheelDelta || 0;
                pointer[PointerInput.MouseWheelZ] = evt.deltaZ || 0;
                var deviceEvent = evt;
                if (pointer[PointerInput.MouseWheelX] !== 0) {
                    deviceEvent.inputIndex = PointerInput.MouseWheelX;
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
                if (pointer[PointerInput.MouseWheelY] !== 0) {
                    deviceEvent.inputIndex = PointerInput.MouseWheelY;
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
                if (pointer[PointerInput.MouseWheelZ] !== 0) {
                    deviceEvent.inputIndex = PointerInput.MouseWheelZ;
                    _this._onInputChanged(deviceType, deviceSlot, deviceEvent);
                }
            }
        };
        this._elementToAttachTo.addEventListener(this._eventPrefix + "move", this._pointerMoveEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "down", this._pointerDownEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "up", this._pointerUpEvent);
        this._elementToAttachTo.addEventListener(this._eventPrefix + "cancel", this._pointerCancelEvent);
        this._elementToAttachTo.addEventListener("blur", this._pointerBlurEvent);
        this._elementToAttachTo.addEventListener(this._wheelEventName, this._pointerWheelEvent, passiveSupported ? { passive: false } : false);
        // Since there's no up or down event for mouse wheel or delta x/y, clear mouse values at end of frame
        this._pointerInputClearObserver = this._engine.onEndFrameObservable.add(function () {
            if (_this.isDeviceAvailable(DeviceType.Mouse)) {
                var pointer = _this._inputs[DeviceType.Mouse][0];
                pointer[PointerInput.MouseWheelX] = 0;
                pointer[PointerInput.MouseWheelY] = 0;
                pointer[PointerInput.MouseWheelZ] = 0;
            }
        });
    };
    /**
     * Handle all actions that come from gamepad interaction
     */
    WebDeviceInputSystem.prototype._handleGamepadActions = function () {
        var _this = this;
        this._gamepadConnectedEvent = function (evt) {
            _this._addGamePad(evt.gamepad);
        };
        this._gamepadDisconnectedEvent = function (evt) {
            if (_this._gamepads) {
                var deviceType = _this._getGamepadDeviceType(evt.gamepad.id);
                var deviceSlot = evt.gamepad.index;
                _this._unregisterDevice(deviceType, deviceSlot);
                delete _this._gamepads[deviceSlot];
            }
        };
        window.addEventListener("gamepadconnected", this._gamepadConnectedEvent);
        window.addEventListener("gamepaddisconnected", this._gamepadDisconnectedEvent);
    };
    /**
     * Update all non-event based devices with each frame
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     */
    WebDeviceInputSystem.prototype._updateDevice = function (deviceType, deviceSlot, inputIndex) {
        // Gamepads
        var gp = navigator.getGamepads()[deviceSlot];
        if (gp && deviceType === this._gamepads[deviceSlot]) {
            var device = this._inputs[deviceType][deviceSlot];
            if (inputIndex >= gp.buttons.length) {
                device[inputIndex] = gp.axes[inputIndex - gp.buttons.length].valueOf();
            }
            else {
                device[inputIndex] = gp.buttons[inputIndex].value;
            }
        }
    };
    /**
     * Gets DeviceType from the device name
     * @param deviceName Name of Device from DeviceInputSystem
     * @returns DeviceType enum value
     */
    WebDeviceInputSystem.prototype._getGamepadDeviceType = function (deviceName) {
        if (deviceName.indexOf("054c") !== -1) {
            // DualShock 4 Gamepad
            return deviceName.indexOf("0ce6") !== -1 ? DeviceType.DualSense : DeviceType.DualShock;
        }
        else if (deviceName.indexOf("Xbox One") !== -1 || deviceName.search("Xbox 360") !== -1 || deviceName.search("xinput") !== -1) {
            // Xbox Gamepad
            return DeviceType.Xbox;
        }
        else if (deviceName.indexOf("057e") !== -1) {
            // Switch Gamepad
            return DeviceType.Switch;
        }
        return DeviceType.Generic;
    };
    /**
     * Get DeviceType from a given pointer/mouse/touch event.
     * @param evt PointerEvent to evaluate
     * @returns DeviceType interpreted from event
     */
    WebDeviceInputSystem.prototype._getPointerType = function (evt) {
        var deviceType = DeviceType.Mouse;
        if (evt.pointerType === "touch" || evt.pointerType === "pen" || evt.touches) {
            deviceType = DeviceType.Touch;
        }
        return deviceType;
    };
    return WebDeviceInputSystem;
}());

/**
 * Class that handles all input for a specific device
 */
var DeviceSource = /** @class */ (function () {
    /**
     * Default Constructor
     * @param deviceInputSystem - Reference to DeviceInputSystem
     * @param deviceType - Type of device
     * @param deviceSlot - "Slot" or index that device is referenced in
     */
    function DeviceSource(deviceInputSystem, 
    /** Type of device */
    deviceType, 
    /** "Slot" or index that device is referenced in */
    deviceSlot) {
        if (deviceSlot === void 0) { deviceSlot = 0; }
        this.deviceType = deviceType;
        this.deviceSlot = deviceSlot;
        // Public Members
        /**
         * Observable to handle device input changes per device
         */
        this.onInputChangedObservable = new Observable();
        this._deviceInputSystem = deviceInputSystem;
    }
    /**
     * Get input for specific input
     * @param inputIndex - index of specific input on device
     * @returns Input value from DeviceInputSystem
     */
    DeviceSource.prototype.getInput = function (inputIndex) {
        return this._deviceInputSystem.pollInput(this.deviceType, this.deviceSlot, inputIndex);
    };
    return DeviceSource;
}());

/** @hidden */
var InternalDeviceSourceManager = /** @class */ (function () {
    function InternalDeviceSourceManager(engine) {
        var _this = this;
        this._registeredManagers = new Array();
        this._refCount = 0;
        // Public Functions
        this.registerManager = function (manager) {
            for (var deviceType = 0; deviceType < _this._devices.length; deviceType++) {
                var device = _this._devices[deviceType];
                for (var deviceSlotKey in device) {
                    var deviceSlot = +deviceSlotKey;
                    manager._addDevice(new DeviceSource(_this._deviceInputSystem, deviceType, deviceSlot));
                }
            }
            _this._registeredManagers.push(manager);
        };
        this.unregisterManager = function (manager) {
            var idx = _this._registeredManagers.indexOf(manager);
            if (idx > -1) {
                _this._registeredManagers.splice(idx, 1);
            }
        };
        var numberOfDeviceTypes = Object.keys(DeviceType).length / 2;
        this._devices = new Array(numberOfDeviceTypes);
        var onDeviceConnected = function (deviceType, deviceSlot) {
            if (!_this._devices[deviceType]) {
                _this._devices[deviceType] = new Array();
            }
            if (!_this._devices[deviceType][deviceSlot]) {
                _this._devices[deviceType][deviceSlot] = deviceSlot;
            }
            for (var _i = 0, _a = _this._registeredManagers; _i < _a.length; _i++) {
                var manager = _a[_i];
                var deviceSource = new DeviceSource(_this._deviceInputSystem, deviceType, deviceSlot);
                manager._addDevice(deviceSource);
            }
        };
        var onDeviceDisconnected = function (deviceType, deviceSlot) {
            var _a;
            if ((_a = _this._devices[deviceType]) === null || _a === void 0 ? void 0 : _a[deviceSlot]) {
                delete _this._devices[deviceType][deviceSlot];
            }
            for (var _i = 0, _b = _this._registeredManagers; _i < _b.length; _i++) {
                var manager = _b[_i];
                manager._removeDevice(deviceType, deviceSlot);
            }
        };
        var onInputChanged = function (deviceType, deviceSlot, eventData) {
            if (eventData) {
                for (var _i = 0, _a = _this._registeredManagers; _i < _a.length; _i++) {
                    var manager = _a[_i];
                    manager._onInputChanged(deviceType, deviceSlot, eventData);
                }
            }
        };
        if (typeof _native !== "undefined") {
            this._deviceInputSystem = new NativeDeviceInputSystem(onDeviceConnected, onDeviceDisconnected, onInputChanged);
        }
        else {
            this._deviceInputSystem = new WebDeviceInputSystem(engine, onDeviceConnected, onDeviceDisconnected, onInputChanged);
        }
    }
    InternalDeviceSourceManager.prototype.dispose = function () {
        this._deviceInputSystem.dispose();
    };
    return InternalDeviceSourceManager;
}());

/**
 * Class to keep track of devices
 */
var DeviceSourceManager = /** @class */ (function () {
    /**
     * Default constructor
     * @param engine - Used to get canvas (if applicable)
     */
    function DeviceSourceManager(engine) {
        var _this = this;
        var numberOfDeviceTypes = Object.keys(DeviceType).length / 2;
        this._devices = new Array(numberOfDeviceTypes);
        this._firstDevice = new Array(numberOfDeviceTypes);
        this._engine = engine;
        if (!this._engine._deviceSourceManager) {
            this._engine._deviceSourceManager = new InternalDeviceSourceManager(engine);
        }
        this._engine._deviceSourceManager._refCount++;
        // Observables
        this.onDeviceConnectedObservable = new Observable(function (observer) {
            for (var _i = 0, _a = _this._devices; _i < _a.length; _i++) {
                var devices = _a[_i];
                if (devices) {
                    for (var _b = 0, devices_1 = devices; _b < devices_1.length; _b++) {
                        var device = devices_1[_b];
                        if (device) {
                            _this.onDeviceConnectedObservable.notifyObserver(observer, device);
                        }
                    }
                }
            }
        });
        this.onDeviceDisconnectedObservable = new Observable();
        this._engine._deviceSourceManager.registerManager(this);
        this._onDisposeObserver = engine.onDisposeObservable.add(function () {
            _this.dispose();
        });
    }
    // Public Functions
    /**
     * Gets a DeviceSource, given a type and slot
     * @param deviceType - Type of Device
     * @param deviceSlot - Slot or ID of device
     * @returns DeviceSource
     */
    DeviceSourceManager.prototype.getDeviceSource = function (deviceType, deviceSlot) {
        if (deviceSlot === undefined) {
            if (this._firstDevice[deviceType] === undefined) {
                return null;
            }
            deviceSlot = this._firstDevice[deviceType];
        }
        if (!this._devices[deviceType] || this._devices[deviceType][deviceSlot] === undefined) {
            return null;
        }
        return this._devices[deviceType][deviceSlot];
    };
    /**
     * Gets an array of DeviceSource objects for a given device type
     * @param deviceType - Type of Device
     * @returns All available DeviceSources of a given type
     */
    DeviceSourceManager.prototype.getDeviceSources = function (deviceType) {
        // If device type hasn't had any devices connected yet, return empty array.
        if (!this._devices[deviceType]) {
            return [];
        }
        return this._devices[deviceType].filter(function (source) {
            return !!source;
        });
    };
    /**
     * Dispose of DeviceSourceManager
     */
    DeviceSourceManager.prototype.dispose = function () {
        // Null out observable refs
        this.onDeviceConnectedObservable.clear();
        this.onDeviceDisconnectedObservable.clear();
        if (this._engine._deviceSourceManager) {
            this._engine._deviceSourceManager.unregisterManager(this);
            if (--this._engine._deviceSourceManager._refCount < 1) {
                this._engine._deviceSourceManager.dispose();
                delete this._engine._deviceSourceManager;
            }
        }
        this._engine.onDisposeObservable.remove(this._onDisposeObserver);
    };
    // Hidden Functions
    /**
     * @param deviceSource - Source to add
     * @hidden
     */
    DeviceSourceManager.prototype._addDevice = function (deviceSource) {
        if (!this._devices[deviceSource.deviceType]) {
            this._devices[deviceSource.deviceType] = new Array();
        }
        if (!this._devices[deviceSource.deviceType][deviceSource.deviceSlot]) {
            this._devices[deviceSource.deviceType][deviceSource.deviceSlot] = deviceSource;
            this._updateFirstDevices(deviceSource.deviceType);
        }
        this.onDeviceConnectedObservable.notifyObservers(deviceSource);
    };
    /**
     * @param deviceType - DeviceType
     * @param deviceSlot - DeviceSlot
     * @hidden
     */
    DeviceSourceManager.prototype._removeDevice = function (deviceType, deviceSlot) {
        var _a, _b;
        var deviceSource = (_a = this._devices[deviceType]) === null || _a === void 0 ? void 0 : _a[deviceSlot]; // Grab local reference to use before removing from devices
        this.onDeviceDisconnectedObservable.notifyObservers(deviceSource);
        if ((_b = this._devices[deviceType]) === null || _b === void 0 ? void 0 : _b[deviceSlot]) {
            delete this._devices[deviceType][deviceSlot];
        }
        // Even if we don't delete a device, we should still check for the first device as things may have gotten out of sync.
        this._updateFirstDevices(deviceType);
    };
    /**
     * @param deviceType - DeviceType
     * @param deviceSlot - DeviceSlot
     * @param eventData - Event
     * @hidden
     */
    DeviceSourceManager.prototype._onInputChanged = function (deviceType, deviceSlot, eventData) {
        var _a, _b;
        (_b = (_a = this._devices[deviceType]) === null || _a === void 0 ? void 0 : _a[deviceSlot]) === null || _b === void 0 ? void 0 : _b.onInputChangedObservable.notifyObservers(eventData);
    };
    // Private Functions
    DeviceSourceManager.prototype._updateFirstDevices = function (type) {
        switch (type) {
            case DeviceType.Keyboard:
            case DeviceType.Mouse:
                this._firstDevice[type] = 0;
                break;
            case DeviceType.Touch:
            case DeviceType.DualSense:
            case DeviceType.DualShock:
            case DeviceType.Xbox:
            case DeviceType.Switch:
            case DeviceType.Generic: {
                delete this._firstDevice[type];
                // eslint-disable-next-line no-case-declarations
                var devices = this._devices[type];
                if (devices) {
                    for (var i = 0; i < devices.length; i++) {
                        if (devices[i]) {
                            this._firstDevice[type] = i;
                            break;
                        }
                    }
                }
                break;
            }
        }
    };
    return DeviceSourceManager;
}());

/** @hidden */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _ClickInfo = /** @class */ (function () {
    function _ClickInfo() {
        this._singleClick = false;
        this._doubleClick = false;
        this._hasSwiped = false;
        this._ignore = false;
    }
    Object.defineProperty(_ClickInfo.prototype, "singleClick", {
        get: function () {
            return this._singleClick;
        },
        set: function (b) {
            this._singleClick = b;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ClickInfo.prototype, "doubleClick", {
        get: function () {
            return this._doubleClick;
        },
        set: function (b) {
            this._doubleClick = b;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ClickInfo.prototype, "hasSwiped", {
        get: function () {
            return this._hasSwiped;
        },
        set: function (b) {
            this._hasSwiped = b;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ClickInfo.prototype, "ignore", {
        get: function () {
            return this._ignore;
        },
        set: function (b) {
            this._ignore = b;
        },
        enumerable: false,
        configurable: true
    });
    return _ClickInfo;
}());
/**
 * Class used to manage all inputs for the scene.
 */
var InputManager = /** @class */ (function () {
    /**
     * Creates a new InputManager
     * @param scene - defines the hosting scene
     */
    function InputManager(scene) {
        /** This is a defensive check to not allow control attachment prior to an already active one. If already attached, previous control is unattached before attaching the new one. */
        this._alreadyAttached = false;
        this._meshPickProceed = false;
        this._currentPickResult = null;
        this._previousPickResult = null;
        this._totalPointersPressed = 0;
        this._doubleClickOccured = false;
        this._pointerX = 0;
        this._pointerY = 0;
        this._startingPointerPosition = new Vector2(0, 0);
        this._previousStartingPointerPosition = new Vector2(0, 0);
        this._startingPointerTime = 0;
        this._previousStartingPointerTime = 0;
        this._pointerCaptures = {};
        this._meshUnderPointerId = {};
        this._deviceSourceManager = null;
        this._scene = scene || EngineStore.LastCreatedScene;
        if (!this._scene) {
            return;
        }
    }
    Object.defineProperty(InputManager.prototype, "meshUnderPointer", {
        /**
         * Gets the mesh that is currently under the pointer
         * @returns Mesh that the pointer is pointer is hovering over
         */
        get: function () {
            return this._pointerOverMesh;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * When using more than one pointer (for example in XR) you can get the mesh under the specific pointer
     * @param pointerId - the pointer id to use
     * @returns The mesh under this pointer id or null if not found
     */
    InputManager.prototype.getMeshUnderPointerByPointerId = function (pointerId) {
        return this._meshUnderPointerId[pointerId] || null;
    };
    Object.defineProperty(InputManager.prototype, "unTranslatedPointer", {
        /**
         * Gets the pointer coordinates in 2D without any translation (ie. straight out of the pointer event)
         * @returns Vector with X/Y values directly from pointer event
         */
        get: function () {
            return new Vector2(this._unTranslatedPointerX, this._unTranslatedPointerY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "pointerX", {
        /**
         * Gets or sets the current on-screen X position of the pointer
         * @returns Translated X with respect to screen
         */
        get: function () {
            return this._pointerX;
        },
        set: function (value) {
            this._pointerX = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "pointerY", {
        /**
         * Gets or sets the current on-screen Y position of the pointer
         * @returns Translated Y with respect to screen
         */
        get: function () {
            return this._pointerY;
        },
        set: function (value) {
            this._pointerY = value;
        },
        enumerable: false,
        configurable: true
    });
    InputManager.prototype._updatePointerPosition = function (evt) {
        var canvasRect = this._scene.getEngine().getInputElementClientRect();
        if (!canvasRect) {
            return;
        }
        this._pointerX = evt.clientX - canvasRect.left;
        this._pointerY = evt.clientY - canvasRect.top;
        this._unTranslatedPointerX = this._pointerX;
        this._unTranslatedPointerY = this._pointerY;
    };
    InputManager.prototype._processPointerMove = function (pickResult, evt) {
        var scene = this._scene;
        var engine = scene.getEngine();
        var canvas = engine.getInputElement();
        if (canvas) {
            canvas.tabIndex = engine.canvasTabIndex;
            // Restore pointer
            if (!scene.doNotHandleCursors) {
                canvas.style.cursor = scene.defaultCursor;
            }
        }
        var isMeshPicked = pickResult && pickResult.hit && pickResult.pickedMesh ? true : false;
        if (isMeshPicked) {
            scene.setPointerOverMesh(pickResult.pickedMesh, evt.pointerId, pickResult);
            if (!scene.doNotHandleCursors && canvas && this._pointerOverMesh) {
                var actionManager = this._pointerOverMesh._getActionManagerForTrigger();
                if (actionManager && actionManager.hasPointerTriggers) {
                    canvas.style.cursor = actionManager.hoverCursor || scene.hoverCursor;
                }
            }
        }
        else {
            scene.setPointerOverMesh(null, evt.pointerId, pickResult);
        }
        for (var _i = 0, _a = scene._pointerMoveStage; _i < _a.length; _i++) {
            var step = _a[_i];
            pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, isMeshPicked, canvas);
        }
        if (pickResult) {
            var type = evt.type === "wheel" || evt.type === "mousewheel" || evt.type === "DOMMouseScroll" ? PointerEventTypes.POINTERWHEEL : PointerEventTypes.POINTERMOVE;
            if (scene.onPointerMove) {
                scene.onPointerMove(evt, pickResult, type);
            }
            if (scene.onPointerObservable.hasObservers()) {
                var pi = new PointerInfo(type, evt, pickResult);
                this._setRayOnPointerInfo(pi);
                scene.onPointerObservable.notifyObservers(pi, type);
            }
        }
    };
    // Pointers handling
    InputManager.prototype._setRayOnPointerInfo = function (pointerInfo) {
        var scene = this._scene;
        if (pointerInfo.pickInfo && !pointerInfo.pickInfo._pickingUnavailable) {
            if (!pointerInfo.pickInfo.ray) {
                pointerInfo.pickInfo.ray = scene.createPickingRay(pointerInfo.event.offsetX, pointerInfo.event.offsetY, Matrix.Identity(), scene.activeCamera);
            }
        }
    };
    InputManager.prototype._checkPrePointerObservable = function (pickResult, evt, type) {
        var scene = this._scene;
        var pi = new PointerInfoPre(type, evt, this._unTranslatedPointerX, this._unTranslatedPointerY);
        if (pickResult) {
            pi.ray = pickResult.ray;
            if (pickResult.originMesh) {
                pi.nearInteractionPickingInfo = pickResult;
            }
        }
        scene.onPrePointerObservable.notifyObservers(pi, type);
        if (pi.skipOnPointerObservable) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Use this method to simulate a pointer move on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     */
    InputManager.prototype.simulatePointerMove = function (pickResult, pointerEventInit) {
        var evt = new PointerEvent("pointermove", pointerEventInit);
        evt.inputIndex = PointerInput.Move;
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERMOVE)) {
            return;
        }
        this._processPointerMove(pickResult, evt);
    };
    /**
     * Use this method to simulate a pointer down on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     */
    InputManager.prototype.simulatePointerDown = function (pickResult, pointerEventInit) {
        var evt = new PointerEvent("pointerdown", pointerEventInit);
        evt.inputIndex = evt.button + 2;
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERDOWN)) {
            return;
        }
        this._processPointerDown(pickResult, evt);
    };
    InputManager.prototype._processPointerDown = function (pickResult, evt) {
        var _this = this;
        var scene = this._scene;
        if (pickResult && pickResult.hit && pickResult.pickedMesh) {
            this._pickedDownMesh = pickResult.pickedMesh;
            var actionManager_1 = pickResult.pickedMesh._getActionManagerForTrigger();
            if (actionManager_1) {
                if (actionManager_1.hasPickTriggers) {
                    actionManager_1.processTrigger(5, ActionEvent.CreateNew(pickResult.pickedMesh, evt));
                    switch (evt.button) {
                        case 0:
                            actionManager_1.processTrigger(2, ActionEvent.CreateNew(pickResult.pickedMesh, evt));
                            break;
                        case 1:
                            actionManager_1.processTrigger(4, ActionEvent.CreateNew(pickResult.pickedMesh, evt));
                            break;
                        case 2:
                            actionManager_1.processTrigger(3, ActionEvent.CreateNew(pickResult.pickedMesh, evt));
                            break;
                    }
                }
                if (actionManager_1.hasSpecificTrigger(8)) {
                    window.setTimeout(function () {
                        var pickResult = scene.pick(_this._unTranslatedPointerX, _this._unTranslatedPointerY, function (mesh) {
                            return ((mesh.isPickable &&
                                mesh.isVisible &&
                                mesh.isReady() &&
                                mesh.actionManager &&
                                mesh.actionManager.hasSpecificTrigger(8) &&
                                mesh === _this._pickedDownMesh));
                        }, false, scene.cameraToUseForPointers);
                        if (pickResult && pickResult.hit && pickResult.pickedMesh && actionManager_1) {
                            if (_this._totalPointersPressed !== 0 && Date.now() - _this._startingPointerTime > InputManager.LongPressDelay && !_this._isPointerSwiping()) {
                                _this._startingPointerTime = 0;
                                actionManager_1.processTrigger(8, ActionEvent.CreateNew(pickResult.pickedMesh, evt));
                            }
                        }
                    }, InputManager.LongPressDelay);
                }
            }
        }
        else {
            for (var _i = 0, _a = scene._pointerDownStage; _i < _a.length; _i++) {
                var step = _a[_i];
                pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, evt);
            }
        }
        if (pickResult) {
            var type = PointerEventTypes.POINTERDOWN;
            if (scene.onPointerDown) {
                scene.onPointerDown(evt, pickResult, type);
            }
            if (scene.onPointerObservable.hasObservers()) {
                var pi = new PointerInfo(type, evt, pickResult);
                this._setRayOnPointerInfo(pi);
                scene.onPointerObservable.notifyObservers(pi, type);
            }
        }
    };
    /**
     * @hidden
     * @returns Boolean if delta for pointer exceeds drag movement threshold
     */
    InputManager.prototype._isPointerSwiping = function () {
        return (Math.abs(this._startingPointerPosition.x - this._pointerX) > InputManager.DragMovementThreshold ||
            Math.abs(this._startingPointerPosition.y - this._pointerY) > InputManager.DragMovementThreshold);
    };
    /**
     * Use this method to simulate a pointer up on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     * @param doubleTap - indicates that the pointer up event should be considered as part of a double click (false by default)
     */
    InputManager.prototype.simulatePointerUp = function (pickResult, pointerEventInit, doubleTap) {
        var evt = new PointerEvent("pointerup", pointerEventInit);
        evt.inputIndex = PointerInput.Move;
        var clickInfo = new _ClickInfo();
        if (doubleTap) {
            clickInfo.doubleClick = true;
        }
        else {
            clickInfo.singleClick = true;
        }
        if (this._checkPrePointerObservable(pickResult, evt, PointerEventTypes.POINTERUP)) {
            return;
        }
        this._processPointerUp(pickResult, evt, clickInfo);
    };
    InputManager.prototype._processPointerUp = function (pickResult, evt, clickInfo) {
        var scene = this._scene;
        if (pickResult && pickResult.hit && pickResult.pickedMesh) {
            this._pickedUpMesh = pickResult.pickedMesh;
            if (this._pickedDownMesh === this._pickedUpMesh) {
                if (scene.onPointerPick) {
                    scene.onPointerPick(evt, pickResult);
                }
                if (clickInfo.singleClick && !clickInfo.ignore && scene.onPointerObservable.hasObservers()) {
                    var type_1 = PointerEventTypes.POINTERPICK;
                    var pi = new PointerInfo(type_1, evt, pickResult);
                    this._setRayOnPointerInfo(pi);
                    scene.onPointerObservable.notifyObservers(pi, type_1);
                }
            }
            var actionManager = pickResult.pickedMesh._getActionManagerForTrigger();
            if (actionManager && !clickInfo.ignore) {
                actionManager.processTrigger(7, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                if (!clickInfo.hasSwiped && clickInfo.singleClick) {
                    actionManager.processTrigger(1, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                }
                var doubleClickActionManager = pickResult.pickedMesh._getActionManagerForTrigger(6);
                if (clickInfo.doubleClick && doubleClickActionManager) {
                    doubleClickActionManager.processTrigger(6, ActionEvent.CreateNew(pickResult.pickedMesh, evt, pickResult));
                }
            }
        }
        else {
            if (!clickInfo.ignore) {
                for (var _i = 0, _a = scene._pointerUpStage; _i < _a.length; _i++) {
                    var step = _a[_i];
                    pickResult = step.action(this._unTranslatedPointerX, this._unTranslatedPointerY, pickResult, evt);
                }
            }
        }
        if (this._pickedDownMesh && this._pickedDownMesh !== this._pickedUpMesh) {
            var pickedDownActionManager = this._pickedDownMesh._getActionManagerForTrigger(16);
            if (pickedDownActionManager) {
                pickedDownActionManager.processTrigger(16, ActionEvent.CreateNew(this._pickedDownMesh, evt));
            }
        }
        var type = 0;
        if (scene.onPointerObservable.hasObservers()) {
            if (!clickInfo.ignore && !clickInfo.hasSwiped) {
                if (clickInfo.singleClick && scene.onPointerObservable.hasSpecificMask(PointerEventTypes.POINTERTAP)) {
                    type = PointerEventTypes.POINTERTAP;
                }
                else if (clickInfo.doubleClick && scene.onPointerObservable.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP)) {
                    type = PointerEventTypes.POINTERDOUBLETAP;
                }
                if (type) {
                    var pi = new PointerInfo(type, evt, pickResult);
                    this._setRayOnPointerInfo(pi);
                    scene.onPointerObservable.notifyObservers(pi, type);
                }
            }
            if (!clickInfo.ignore) {
                type = PointerEventTypes.POINTERUP;
                var pi = new PointerInfo(type, evt, pickResult);
                this._setRayOnPointerInfo(pi);
                scene.onPointerObservable.notifyObservers(pi, type);
            }
        }
        if (scene.onPointerUp && !clickInfo.ignore) {
            scene.onPointerUp(evt, pickResult, type);
        }
    };
    /**
     * Gets a boolean indicating if the current pointer event is captured (meaning that the scene has already handled the pointer down)
     * @param pointerId - defines the pointer id to use in a multi-touch scenario (0 by default)
     * @returns true if the pointer was captured
     */
    InputManager.prototype.isPointerCaptured = function (pointerId) {
        if (pointerId === void 0) { pointerId = 0; }
        return this._pointerCaptures[pointerId];
    };
    /**
     * Attach events to the canvas (To handle actionManagers triggers and raise onPointerMove, onPointerDown and onPointerUp
     * @param attachUp - defines if you want to attach events to pointerup
     * @param attachDown - defines if you want to attach events to pointerdown
     * @param attachMove - defines if you want to attach events to pointermove
     * @param elementToAttachTo - defines the target DOM element to attach to (will use the canvas by default)
     */
    InputManager.prototype.attachControl = function (attachUp, attachDown, attachMove, elementToAttachTo) {
        var _this = this;
        if (attachUp === void 0) { attachUp = true; }
        if (attachDown === void 0) { attachDown = true; }
        if (attachMove === void 0) { attachMove = true; }
        if (elementToAttachTo === void 0) { elementToAttachTo = null; }
        var scene = this._scene;
        var engine = scene.getEngine();
        if (!elementToAttachTo) {
            elementToAttachTo = engine.getInputElement();
        }
        if (this._alreadyAttached) {
            this.detachControl();
        }
        if (elementToAttachTo) {
            this._alreadyAttachedTo = elementToAttachTo;
        }
        this._deviceSourceManager = new DeviceSourceManager(engine);
        // Because this is only called from _initClickEvent, which is called in _onPointerUp, we'll use the pointerUpPredicate for the pick call
        this._initActionManager = function (act) {
            if (!_this._meshPickProceed) {
                var pickResult = scene.skipPointerUpPicking
                    ? null
                    : scene.pick(_this._unTranslatedPointerX, _this._unTranslatedPointerY, scene.pointerUpPredicate, false, scene.cameraToUseForPointers);
                _this._currentPickResult = pickResult;
                if (pickResult) {
                    act = pickResult.hit && pickResult.pickedMesh ? pickResult.pickedMesh._getActionManagerForTrigger() : null;
                }
                _this._meshPickProceed = true;
            }
            return act;
        };
        this._delayedSimpleClick = function (btn, clickInfo, cb) {
            // double click delay is over and that no double click has been raised since, or the 2 consecutive keys pressed are different
            if ((Date.now() - _this._previousStartingPointerTime > InputManager.DoubleClickDelay && !_this._doubleClickOccured) || btn !== _this._previousButtonPressed) {
                _this._doubleClickOccured = false;
                clickInfo.singleClick = true;
                clickInfo.ignore = false;
                cb(clickInfo, _this._currentPickResult);
            }
        };
        this._initClickEvent = function (obs1, obs2, evt, cb) {
            var clickInfo = new _ClickInfo();
            _this._currentPickResult = null;
            var act = null;
            var checkPicking = obs1.hasSpecificMask(PointerEventTypes.POINTERPICK) ||
                obs2.hasSpecificMask(PointerEventTypes.POINTERPICK) ||
                obs1.hasSpecificMask(PointerEventTypes.POINTERTAP) ||
                obs2.hasSpecificMask(PointerEventTypes.POINTERTAP) ||
                obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) ||
                obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
            if (!checkPicking && AbstractActionManager) {
                act = _this._initActionManager(act, clickInfo);
                if (act) {
                    checkPicking = act.hasPickTriggers;
                }
            }
            var needToIgnoreNext = false;
            if (checkPicking) {
                var btn = evt.button;
                clickInfo.hasSwiped = _this._isPointerSwiping();
                if (!clickInfo.hasSwiped) {
                    var checkSingleClickImmediately = !InputManager.ExclusiveDoubleClickMode;
                    if (!checkSingleClickImmediately) {
                        checkSingleClickImmediately = !obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) && !obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
                        if (checkSingleClickImmediately && !AbstractActionManager.HasSpecificTrigger(6)) {
                            act = _this._initActionManager(act, clickInfo);
                            if (act) {
                                checkSingleClickImmediately = !act.hasSpecificTrigger(6);
                            }
                        }
                    }
                    if (checkSingleClickImmediately) {
                        // single click detected if double click delay is over or two different successive keys pressed without exclusive double click or no double click required
                        if (Date.now() - _this._previousStartingPointerTime > InputManager.DoubleClickDelay || btn !== _this._previousButtonPressed) {
                            clickInfo.singleClick = true;
                            cb(clickInfo, _this._currentPickResult);
                            needToIgnoreNext = true;
                        }
                    }
                    // at least one double click is required to be check and exclusive double click is enabled
                    else {
                        // wait that no double click has been raised during the double click delay
                        _this._previousDelayedSimpleClickTimeout = _this._delayedSimpleClickTimeout;
                        _this._delayedSimpleClickTimeout = window.setTimeout(_this._delayedSimpleClick.bind(_this, btn, clickInfo, cb), InputManager.DoubleClickDelay);
                    }
                    var checkDoubleClick = obs1.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP) || obs2.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP);
                    if (!checkDoubleClick && AbstractActionManager.HasSpecificTrigger(6)) {
                        act = _this._initActionManager(act, clickInfo);
                        if (act) {
                            checkDoubleClick = act.hasSpecificTrigger(6);
                        }
                    }
                    if (checkDoubleClick) {
                        // two successive keys pressed are equal, double click delay is not over and double click has not just occurred
                        if (btn === _this._previousButtonPressed && Date.now() - _this._previousStartingPointerTime < InputManager.DoubleClickDelay && !_this._doubleClickOccured) {
                            // pointer has not moved for 2 clicks, it's a double click
                            if (!clickInfo.hasSwiped && !_this._isPointerSwiping()) {
                                _this._previousStartingPointerTime = 0;
                                _this._doubleClickOccured = true;
                                clickInfo.doubleClick = true;
                                clickInfo.ignore = false;
                                if (InputManager.ExclusiveDoubleClickMode && _this._previousDelayedSimpleClickTimeout) {
                                    clearTimeout(_this._previousDelayedSimpleClickTimeout);
                                }
                                _this._previousDelayedSimpleClickTimeout = _this._delayedSimpleClickTimeout;
                                cb(clickInfo, _this._currentPickResult);
                            }
                            // if the two successive clicks are too far, it's just two simple clicks
                            else {
                                _this._doubleClickOccured = false;
                                _this._previousStartingPointerTime = _this._startingPointerTime;
                                _this._previousStartingPointerPosition.x = _this._startingPointerPosition.x;
                                _this._previousStartingPointerPosition.y = _this._startingPointerPosition.y;
                                _this._previousButtonPressed = btn;
                                if (InputManager.ExclusiveDoubleClickMode) {
                                    if (_this._previousDelayedSimpleClickTimeout) {
                                        clearTimeout(_this._previousDelayedSimpleClickTimeout);
                                    }
                                    _this._previousDelayedSimpleClickTimeout = _this._delayedSimpleClickTimeout;
                                    cb(clickInfo, _this._previousPickResult);
                                }
                                else {
                                    cb(clickInfo, _this._currentPickResult);
                                }
                            }
                            needToIgnoreNext = true;
                        }
                        // just the first click of the double has been raised
                        else {
                            _this._doubleClickOccured = false;
                            _this._previousStartingPointerTime = _this._startingPointerTime;
                            _this._previousStartingPointerPosition.x = _this._startingPointerPosition.x;
                            _this._previousStartingPointerPosition.y = _this._startingPointerPosition.y;
                            _this._previousButtonPressed = btn;
                        }
                    }
                }
            }
            if (!needToIgnoreNext) {
                cb(clickInfo, _this._currentPickResult);
            }
        };
        this._onPointerMove = function (evt) {
            // preserve compatibility with Safari when pointerId is not present
            if (evt.pointerId === undefined) {
                evt.pointerId = 0;
            }
            _this._updatePointerPosition(evt);
            // PreObservable support
            if (_this._checkPrePointerObservable(null, evt, evt.type === "wheel" || evt.type === "mousewheel" || evt.type === "DOMMouseScroll" ? PointerEventTypes.POINTERWHEEL : PointerEventTypes.POINTERMOVE)) {
                return;
            }
            if (!scene.cameraToUseForPointers && !scene.activeCamera) {
                return;
            }
            if (scene.skipPointerMovePicking) {
                _this._processPointerMove(new PickingInfo(), evt);
                return;
            }
            if (!scene.pointerMovePredicate) {
                scene.pointerMovePredicate = function (mesh) {
                    return mesh.isPickable &&
                        mesh.isVisible &&
                        mesh.isReady() &&
                        mesh.isEnabled() &&
                        (mesh.enablePointerMoveEvents || scene.constantlyUpdateMeshUnderPointer || mesh._getActionManagerForTrigger() !== null) &&
                        (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0);
                };
            }
            // Meshes
            var pickResult = scene.pick(_this._unTranslatedPointerX, _this._unTranslatedPointerY, scene.pointerMovePredicate, false, scene.cameraToUseForPointers, scene.pointerMoveTrianglePredicate);
            _this._processPointerMove(pickResult, evt);
        };
        this._onPointerDown = function (evt) {
            _this._totalPointersPressed++;
            _this._pickedDownMesh = null;
            _this._meshPickProceed = false;
            // preserve compatibility with Safari when pointerId is not present
            if (evt.pointerId === undefined) {
                evt.pointerId = 0;
            }
            _this._updatePointerPosition(evt);
            if (scene.preventDefaultOnPointerDown && elementToAttachTo) {
                evt.preventDefault();
                elementToAttachTo.focus();
            }
            _this._startingPointerPosition.x = _this._pointerX;
            _this._startingPointerPosition.y = _this._pointerY;
            _this._startingPointerTime = Date.now();
            // PreObservable support
            if (_this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERDOWN)) {
                return;
            }
            if (!scene.cameraToUseForPointers && !scene.activeCamera) {
                return;
            }
            _this._pointerCaptures[evt.pointerId] = true;
            if (!scene.pointerDownPredicate) {
                scene.pointerDownPredicate = function (mesh) {
                    return (mesh.isPickable &&
                        mesh.isVisible &&
                        mesh.isReady() &&
                        mesh.isEnabled() &&
                        (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0));
                };
            }
            // Meshes
            _this._pickedDownMesh = null;
            var pickResult;
            if (scene.skipPointerDownPicking) {
                pickResult = new PickingInfo();
            }
            else {
                pickResult = scene.pick(_this._unTranslatedPointerX, _this._unTranslatedPointerY, scene.pointerDownPredicate, false, scene.cameraToUseForPointers);
            }
            _this._processPointerDown(pickResult, evt);
        };
        this._onPointerUp = function (evt) {
            if (_this._totalPointersPressed === 0) {
                // We are attaching the pointer up to windows because of a bug in FF
                return; // So we need to test it the pointer down was pressed before.
            }
            _this._totalPointersPressed--;
            _this._pickedUpMesh = null;
            _this._meshPickProceed = false;
            // preserve compatibility with Safari when pointerId is not present
            if (evt.pointerId === undefined) {
                evt.pointerId = 0;
            }
            _this._updatePointerPosition(evt);
            if (scene.preventDefaultOnPointerUp && elementToAttachTo) {
                evt.preventDefault();
                elementToAttachTo.focus();
            }
            _this._initClickEvent(scene.onPrePointerObservable, scene.onPointerObservable, evt, function (clickInfo, pickResult) {
                // PreObservable support
                if (scene.onPrePointerObservable.hasObservers()) {
                    if (!clickInfo.ignore) {
                        if (!clickInfo.hasSwiped) {
                            if (clickInfo.singleClick && scene.onPrePointerObservable.hasSpecificMask(PointerEventTypes.POINTERTAP)) {
                                if (_this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERTAP)) {
                                    return;
                                }
                            }
                            if (clickInfo.doubleClick && scene.onPrePointerObservable.hasSpecificMask(PointerEventTypes.POINTERDOUBLETAP)) {
                                if (_this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERDOUBLETAP)) {
                                    return;
                                }
                            }
                        }
                        if (_this._checkPrePointerObservable(null, evt, PointerEventTypes.POINTERUP)) {
                            return;
                        }
                    }
                }
                if (!_this._pointerCaptures[evt.pointerId] && evt.buttons > 0) {
                    return;
                }
                _this._pointerCaptures[evt.pointerId] = false;
                if (!scene.cameraToUseForPointers && !scene.activeCamera) {
                    return;
                }
                if (!scene.pointerUpPredicate) {
                    scene.pointerUpPredicate = function (mesh) {
                        return (mesh.isPickable &&
                            mesh.isVisible &&
                            mesh.isReady() &&
                            mesh.isEnabled() &&
                            (!scene.cameraToUseForPointers || (scene.cameraToUseForPointers.layerMask & mesh.layerMask) !== 0));
                    };
                }
                // Meshes
                if (!_this._meshPickProceed && ((AbstractActionManager && AbstractActionManager.HasTriggers) || scene.onPointerObservable.hasObservers())) {
                    _this._initActionManager(null, clickInfo);
                }
                if (!pickResult) {
                    pickResult = _this._currentPickResult;
                }
                _this._processPointerUp(pickResult, evt, clickInfo);
                _this._previousPickResult = _this._currentPickResult;
            });
        };
        this._onKeyDown = function (evt) {
            var type = KeyboardEventTypes.KEYDOWN;
            if (scene.onPreKeyboardObservable.hasObservers()) {
                var pi = new KeyboardInfoPre(type, evt);
                scene.onPreKeyboardObservable.notifyObservers(pi, type);
                if (pi.skipOnKeyboardObservable) {
                    return;
                }
            }
            if (scene.onKeyboardObservable.hasObservers()) {
                var pi = new KeyboardInfo(type, evt);
                scene.onKeyboardObservable.notifyObservers(pi, type);
            }
            if (scene.actionManager) {
                scene.actionManager.processTrigger(14, ActionEvent.CreateNewFromScene(scene, evt));
            }
        };
        this._onKeyUp = function (evt) {
            var type = KeyboardEventTypes.KEYUP;
            if (scene.onPreKeyboardObservable.hasObservers()) {
                var pi = new KeyboardInfoPre(type, evt);
                scene.onPreKeyboardObservable.notifyObservers(pi, type);
                if (pi.skipOnKeyboardObservable) {
                    return;
                }
            }
            if (scene.onKeyboardObservable.hasObservers()) {
                var pi = new KeyboardInfo(type, evt);
                scene.onKeyboardObservable.notifyObservers(pi, type);
            }
            if (scene.actionManager) {
                scene.actionManager.processTrigger(15, ActionEvent.CreateNewFromScene(scene, evt));
            }
        };
        // If a device connects that we can handle, wire up the observable
        this._deviceSourceManager.onDeviceConnectedObservable.add(function (deviceSource) {
            if (deviceSource.deviceType === DeviceType.Mouse) {
                deviceSource.onInputChangedObservable.add(function (eventData) {
                    if (eventData.inputIndex === PointerInput.LeftClick ||
                        eventData.inputIndex === PointerInput.MiddleClick ||
                        eventData.inputIndex === PointerInput.RightClick ||
                        eventData.inputIndex === PointerInput.BrowserBack ||
                        eventData.inputIndex === PointerInput.BrowserForward) {
                        if (attachDown && deviceSource.getInput(eventData.inputIndex) === 1) {
                            _this._onPointerDown(eventData);
                        }
                        else if (attachUp && deviceSource.getInput(eventData.inputIndex) === 0) {
                            _this._onPointerUp(eventData);
                        }
                    }
                    else if (attachMove) {
                        if (eventData.inputIndex === PointerInput.Move) {
                            _this._onPointerMove(eventData);
                        }
                        else if (eventData.inputIndex === PointerInput.MouseWheelX ||
                            eventData.inputIndex === PointerInput.MouseWheelY ||
                            eventData.inputIndex === PointerInput.MouseWheelZ) {
                            _this._onPointerMove(eventData);
                        }
                    }
                });
            }
            else if (deviceSource.deviceType === DeviceType.Touch) {
                deviceSource.onInputChangedObservable.add(function (eventData) {
                    if (eventData.inputIndex === PointerInput.LeftClick) {
                        if (attachDown && deviceSource.getInput(eventData.inputIndex) === 1) {
                            _this._onPointerDown(eventData);
                        }
                        else if (attachUp && deviceSource.getInput(eventData.inputIndex) === 0) {
                            _this._onPointerUp(eventData);
                        }
                    }
                    if (attachMove && eventData.inputIndex === PointerInput.Move) {
                        _this._onPointerMove(eventData);
                    }
                });
            }
            else if (deviceSource.deviceType === DeviceType.Keyboard) {
                deviceSource.onInputChangedObservable.add(function (eventData) {
                    if (eventData.type === "keydown") {
                        _this._onKeyDown(eventData);
                    }
                    else if (eventData.type === "keyup") {
                        _this._onKeyUp(eventData);
                    }
                });
            }
        });
        this._alreadyAttached = true;
    };
    /**
     * Detaches all event handlers
     */
    InputManager.prototype.detachControl = function () {
        if (this._alreadyAttached) {
            this._deviceSourceManager.dispose();
            this._deviceSourceManager = null;
            // Cursor
            if (this._alreadyAttachedTo && !this._scene.doNotHandleCursors) {
                this._alreadyAttachedTo.style.cursor = this._scene.defaultCursor;
            }
            this._alreadyAttached = false;
            this._alreadyAttachedTo = null;
        }
    };
    /**
     * Force the value of meshUnderPointer
     * @param mesh - defines the mesh to use
     * @param pointerId - optional pointer id when using more than one pointer. Defaults to 0
     * @param pickResult - optional pickingInfo data used to find mesh
     */
    InputManager.prototype.setPointerOverMesh = function (mesh, pointerId, pickResult) {
        if (pointerId === void 0) { pointerId = 0; }
        if (this._meshUnderPointerId[pointerId] === mesh) {
            return;
        }
        var underPointerMesh = this._meshUnderPointerId[pointerId];
        var actionManager;
        if (underPointerMesh) {
            actionManager = underPointerMesh._getActionManagerForTrigger(10);
            if (actionManager) {
                actionManager.processTrigger(10, ActionEvent.CreateNew(underPointerMesh, undefined, { pointerId: pointerId }));
            }
        }
        if (mesh) {
            this._meshUnderPointerId[pointerId] = mesh;
            this._pointerOverMesh = mesh;
            actionManager = mesh._getActionManagerForTrigger(9);
            if (actionManager) {
                actionManager.processTrigger(9, ActionEvent.CreateNew(mesh, undefined, { pointerId: pointerId, pickResult: pickResult }));
            }
        }
        else {
            delete this._meshUnderPointerId[pointerId];
            this._pointerOverMesh = null;
        }
    };
    /**
     * Gets the mesh under the pointer
     * @returns a Mesh or null if no mesh is under the pointer
     */
    InputManager.prototype.getPointerOverMesh = function () {
        return this._pointerOverMesh;
    };
    /**
     * @param mesh - Mesh to invalidate
     * @hidden
     */
    InputManager.prototype._invalidateMesh = function (mesh) {
        if (this._pointerOverMesh === mesh) {
            this._pointerOverMesh = null;
        }
        if (this._pickedDownMesh === mesh) {
            this._pickedDownMesh = null;
        }
        if (this._pickedUpMesh === mesh) {
            this._pickedUpMesh = null;
        }
        for (var pointerId in this._meshUnderPointerId) {
            if (this._meshUnderPointerId[pointerId] === mesh) {
                delete this._meshUnderPointerId[pointerId];
            }
        }
    };
    /** The distance in pixel that you have to move to prevent some events */
    InputManager.DragMovementThreshold = 10; // in pixels
    /** Time in milliseconds to wait to raise long press events if button is still pressed */
    InputManager.LongPressDelay = 500; // in milliseconds
    /** Time in milliseconds with two consecutive clicks will be considered as a double click */
    InputManager.DoubleClickDelay = 300; // in milliseconds
    /** If you need to check double click without raising a single click at first click, enable this flag */
    InputManager.ExclusiveDoubleClickMode = false;
    return InputManager;
}());

/**
 * Helper class used to generate session unique ID
 */
var UniqueIdGenerator = /** @class */ (function () {
    function UniqueIdGenerator() {
    }
    Object.defineProperty(UniqueIdGenerator, "UniqueId", {
        /**
         * Gets an unique (relatively to the current scene) Id
         */
        get: function () {
            var result = this._UniqueIdCounter;
            this._UniqueIdCounter++;
            return result;
        },
        enumerable: false,
        configurable: true
    });
    // Statics
    UniqueIdGenerator._UniqueIdCounter = 1;
    return UniqueIdGenerator;
}());

/**
 * A wrapper for the experimental compute pressure api which allows a callback to be called whenever certain thresholds are met.
 */
var ComputePressureObserverWrapper = /** @class */ (function () {
    /**
     * A compute pressure observer will call this callback, whenever these thresholds are met.
     * @param callback The callback that is called whenever thresholds are met.
     * @param thresholds An object containing the thresholds used to decide what value to to return for each update property (average of start and end of a threshold boundary).
     */
    function ComputePressureObserverWrapper(callback, thresholds) {
        if (ComputePressureObserverWrapper.IsAvailable) {
            this._observer = new window.ComputePressureObserver(callback, thresholds);
        }
    }
    Object.defineProperty(ComputePressureObserverWrapper, "IsAvailable", {
        /**
         * Returns true if ComputePressureObserver is available for use, false otherwise.
         */
        get: function () {
            return IsWindowObjectExist() && "ComputePressureObserver" in window;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Method that must be called to begin observing changes, and triggering callbacks.
     */
    ComputePressureObserverWrapper.prototype.observe = function () {
        var _a, _b;
        ((_a = this._observer) === null || _a === void 0 ? void 0 : _a.observe) &&
            ((_b = this._observer) === null || _b === void 0 ? void 0 : _b.observe().catch(function () {
                // Ignore error
            }));
    };
    /**
     * Method that must be called to stop observing changes and triggering callbacks (cleanup function).
     */
    ComputePressureObserverWrapper.prototype.unobserve = function () {
        var _a, _b;
        ((_a = this._observer) === null || _a === void 0 ? void 0 : _a.unobserve) && ((_b = this._observer) === null || _b === void 0 ? void 0 : _b.unobserve());
    };
    return ComputePressureObserverWrapper;
}());

/**
 * Represents a scene to be rendered by the engine.
 * @see https://doc.babylonjs.com/features/scene
 */
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    /**
     * Creates a new Scene
     * @param engine defines the engine to use to render this scene
     * @param options defines the scene options
     */
    function Scene(engine, options) {
        var _this = _super.call(this) || this;
        // Members
        /** @hidden */
        _this._inputManager = new InputManager(_this);
        /** Define this parameter if you are using multiple cameras and you want to specify which one should be used for pointer position */
        _this.cameraToUseForPointers = null;
        /** @hidden */
        _this._isScene = true;
        /** @hidden */
        _this._blockEntityCollection = false;
        /**
         * Gets or sets a boolean that indicates if the scene must clear the render buffer before rendering a frame
         */
        _this.autoClear = true;
        /**
         * Gets or sets a boolean that indicates if the scene must clear the depth and stencil buffers before rendering a frame
         */
        _this.autoClearDepthAndStencil = true;
        /**
         * Defines the color used to clear the render buffer (Default is (0.2, 0.2, 0.3, 1.0))
         */
        _this.clearColor = new Color4(0.2, 0.2, 0.3, 1.0);
        /**
         * Defines the color used to simulate the ambient color (Default is (0, 0, 0))
         */
        _this.ambientColor = new Color3(0, 0, 0);
        /**
         * Intensity of the environment in all pbr material.
         * This dims or reinforces the IBL lighting overall (reflection and diffuse).
         * As in the majority of the scene they are the same (exception for multi room and so on),
         * this is easier to reference from here than from all the materials.
         */
        _this.environmentIntensity = 1;
        _this._forceWireframe = false;
        _this._skipFrustumClipping = false;
        _this._forcePointsCloud = false;
        /**
         * Gets or sets a boolean indicating if animations are enabled
         */
        _this.animationsEnabled = true;
        _this._animationPropertiesOverride = null;
        /**
         * Gets or sets a boolean indicating if a constant deltatime has to be used
         * This is mostly useful for testing purposes when you do not want the animations to scale with the framerate
         */
        _this.useConstantAnimationDeltaTime = false;
        /**
         * Gets or sets a boolean indicating if the scene must keep the meshUnderPointer property updated
         * Please note that it requires to run a ray cast through the scene on every frame
         */
        _this.constantlyUpdateMeshUnderPointer = false;
        /**
         * Defines the HTML cursor to use when hovering over interactive elements
         */
        _this.hoverCursor = "pointer";
        /**
         * Defines the HTML default cursor to use (empty by default)
         */
        _this.defaultCursor = "";
        /**
         * Defines whether cursors are handled by the scene.
         */
        _this.doNotHandleCursors = false;
        /**
         * This is used to call preventDefault() on pointer down
         * in order to block unwanted artifacts like system double clicks
         */
        _this.preventDefaultOnPointerDown = true;
        /**
         * This is used to call preventDefault() on pointer up
         * in order to block unwanted artifacts like system double clicks
         */
        _this.preventDefaultOnPointerUp = true;
        // Metadata
        /**
         * Gets or sets user defined metadata
         */
        _this.metadata = null;
        /**
         * For internal use only. Please do not use.
         */
        _this.reservedDataStore = null;
        /**
         * Use this array to add regular expressions used to disable offline support for specific urls
         */
        _this.disableOfflineSupportExceptionRules = new Array();
        /**
         * An event triggered when the scene is disposed.
         */
        _this.onDisposeObservable = new Observable();
        _this._onDisposeObserver = null;
        /**
         * An event triggered before rendering the scene (right after animations and physics)
         */
        _this.onBeforeRenderObservable = new Observable();
        _this._onBeforeRenderObserver = null;
        /**
         * An event triggered after rendering the scene
         */
        _this.onAfterRenderObservable = new Observable();
        /**
         * An event triggered after rendering the scene for an active camera (When scene.render is called this will be called after each camera)
         */
        _this.onAfterRenderCameraObservable = new Observable();
        _this._onAfterRenderObserver = null;
        /**
         * An event triggered before animating the scene
         */
        _this.onBeforeAnimationsObservable = new Observable();
        /**
         * An event triggered after animations processing
         */
        _this.onAfterAnimationsObservable = new Observable();
        /**
         * An event triggered before draw calls are ready to be sent
         */
        _this.onBeforeDrawPhaseObservable = new Observable();
        /**
         * An event triggered after draw calls have been sent
         */
        _this.onAfterDrawPhaseObservable = new Observable();
        /**
         * An event triggered when the scene is ready
         */
        _this.onReadyObservable = new Observable();
        /**
         * An event triggered before rendering a camera
         */
        _this.onBeforeCameraRenderObservable = new Observable();
        _this._onBeforeCameraRenderObserver = null;
        /**
         * An event triggered after rendering a camera
         */
        _this.onAfterCameraRenderObservable = new Observable();
        _this._onAfterCameraRenderObserver = null;
        /**
         * An event triggered when active meshes evaluation is about to start
         */
        _this.onBeforeActiveMeshesEvaluationObservable = new Observable();
        /**
         * An event triggered when active meshes evaluation is done
         */
        _this.onAfterActiveMeshesEvaluationObservable = new Observable();
        /**
         * An event triggered when particles rendering is about to start
         * Note: This event can be trigger more than once per frame (because particles can be rendered by render target textures as well)
         */
        _this.onBeforeParticlesRenderingObservable = new Observable();
        /**
         * An event triggered when particles rendering is done
         * Note: This event can be trigger more than once per frame (because particles can be rendered by render target textures as well)
         */
        _this.onAfterParticlesRenderingObservable = new Observable();
        /**
         * An event triggered when SceneLoader.Append or SceneLoader.Load or SceneLoader.ImportMesh were successfully executed
         */
        _this.onDataLoadedObservable = new Observable();
        /**
         * An event triggered when a camera is created
         */
        _this.onNewCameraAddedObservable = new Observable();
        /**
         * An event triggered when a camera is removed
         */
        _this.onCameraRemovedObservable = new Observable();
        /**
         * An event triggered when a light is created
         */
        _this.onNewLightAddedObservable = new Observable();
        /**
         * An event triggered when a light is removed
         */
        _this.onLightRemovedObservable = new Observable();
        /**
         * An event triggered when a geometry is created
         */
        _this.onNewGeometryAddedObservable = new Observable();
        /**
         * An event triggered when a geometry is removed
         */
        _this.onGeometryRemovedObservable = new Observable();
        /**
         * An event triggered when a transform node is created
         */
        _this.onNewTransformNodeAddedObservable = new Observable();
        /**
         * An event triggered when a transform node is removed
         */
        _this.onTransformNodeRemovedObservable = new Observable();
        /**
         * An event triggered when a mesh is created
         */
        _this.onNewMeshAddedObservable = new Observable();
        /**
         * An event triggered when a mesh is removed
         */
        _this.onMeshRemovedObservable = new Observable();
        /**
         * An event triggered when a skeleton is created
         */
        _this.onNewSkeletonAddedObservable = new Observable();
        /**
         * An event triggered when a skeleton is removed
         */
        _this.onSkeletonRemovedObservable = new Observable();
        /**
         * An event triggered when a material is created
         */
        _this.onNewMaterialAddedObservable = new Observable();
        /**
         * An event triggered when a multi material is created
         */
        _this.onNewMultiMaterialAddedObservable = new Observable();
        /**
         * An event triggered when a material is removed
         */
        _this.onMaterialRemovedObservable = new Observable();
        /**
         * An event triggered when a multi material is removed
         */
        _this.onMultiMaterialRemovedObservable = new Observable();
        /**
         * An event triggered when a texture is created
         */
        _this.onNewTextureAddedObservable = new Observable();
        /**
         * An event triggered when a texture is removed
         */
        _this.onTextureRemovedObservable = new Observable();
        /**
         * An event triggered when render targets are about to be rendered
         * Can happen multiple times per frame.
         */
        _this.onBeforeRenderTargetsRenderObservable = new Observable();
        /**
         * An event triggered when render targets were rendered.
         * Can happen multiple times per frame.
         */
        _this.onAfterRenderTargetsRenderObservable = new Observable();
        /**
         * An event triggered before calculating deterministic simulation step
         */
        _this.onBeforeStepObservable = new Observable();
        /**
         * An event triggered after calculating deterministic simulation step
         */
        _this.onAfterStepObservable = new Observable();
        /**
         * An event triggered when the activeCamera property is updated
         */
        _this.onActiveCameraChanged = new Observable();
        /**
         * This Observable will be triggered before rendering each renderingGroup of each rendered camera.
         * The RenderingGroupInfo class contains all the information about the context in which the observable is called
         * If you wish to register an Observer only for a given set of renderingGroup, use the mask with a combination of the renderingGroup index elevated to the power of two (1 for renderingGroup 0, 2 for renderingrOup1, 4 for 2 and 8 for 3)
         */
        _this.onBeforeRenderingGroupObservable = new Observable();
        /**
         * This Observable will be triggered after rendering each renderingGroup of each rendered camera.
         * The RenderingGroupInfo class contains all the information about the context in which the observable is called
         * If you wish to register an Observer only for a given set of renderingGroup, use the mask with a combination of the renderingGroup index elevated to the power of two (1 for renderingGroup 0, 2 for renderingrOup1, 4 for 2 and 8 for 3)
         */
        _this.onAfterRenderingGroupObservable = new Observable();
        /**
         * This Observable will when a mesh has been imported into the scene.
         */
        _this.onMeshImportedObservable = new Observable();
        /**
         * This Observable will when an animation file has been imported into the scene.
         */
        _this.onAnimationFileImportedObservable = new Observable();
        // Animations
        /** @hidden */
        _this._registeredForLateAnimationBindings = new SmartArrayNoDuplicate(256);
        /**
         * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer move event occurs.
         */
        _this.skipPointerMovePicking = false;
        /**
         * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer down event occurs.
         */
        _this.skipPointerDownPicking = false;
        /**
         * Gets or sets a boolean indicating if the user want to entirely skip the picking phase when a pointer up event occurs.  Off by default.
         */
        _this.skipPointerUpPicking = false;
        /**
         * This observable event is triggered when any ponter event is triggered. It is registered during Scene.attachControl() and it is called BEFORE the 3D engine process anything (mesh/sprite picking for instance).
         * You have the possibility to skip the process and the call to onPointerObservable by setting PointerInfoPre.skipOnPointerObservable to true
         */
        _this.onPrePointerObservable = new Observable();
        /**
         * Observable event triggered each time an input event is received from the rendering canvas
         */
        _this.onPointerObservable = new Observable();
        // Keyboard
        /**
         * This observable event is triggered when any keyboard event si raised and registered during Scene.attachControl()
         * You have the possibility to skip the process and the call to onKeyboardObservable by setting KeyboardInfoPre.skipOnPointerObservable to true
         */
        _this.onPreKeyboardObservable = new Observable();
        /**
         * Observable event triggered each time an keyboard event is received from the hosting window
         */
        _this.onKeyboardObservable = new Observable();
        // Coordinates system
        _this._useRightHandedSystem = false;
        // Deterministic lockstep
        _this._timeAccumulator = 0;
        _this._currentStepId = 0;
        _this._currentInternalStep = 0;
        // Fog
        _this._fogEnabled = true;
        _this._fogMode = Scene.FOGMODE_NONE;
        /**
         * Gets or sets the fog color to use
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * (Default is Color3(0.2, 0.2, 0.3))
         */
        _this.fogColor = new Color3(0.2, 0.2, 0.3);
        /**
         * Gets or sets the fog density to use
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * (Default is 0.1)
         */
        _this.fogDensity = 0.1;
        /**
         * Gets or sets the fog start distance to use
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * (Default is 0)
         */
        _this.fogStart = 0;
        /**
         * Gets or sets the fog end distance to use
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * (Default is 1000)
         */
        _this.fogEnd = 1000.0;
        /**
         * Flag indicating if we need to store previous matrices when rendering
         */
        _this.needsPreviousWorldMatrices = false;
        // Lights
        _this._shadowsEnabled = true;
        _this._lightsEnabled = true;
        /** All of the active cameras added to this scene. */
        _this.activeCameras = new Array();
        // Textures
        _this._texturesEnabled = true;
        // Physics
        /**
         * Gets or sets a boolean indicating if physic engines are enabled on this scene
         */
        _this.physicsEnabled = true;
        // Particles
        /**
         * Gets or sets a boolean indicating if particles are enabled on this scene
         */
        _this.particlesEnabled = true;
        // Sprites
        /**
         * Gets or sets a boolean indicating if sprites are enabled on this scene
         */
        _this.spritesEnabled = true;
        // Skeletons
        _this._skeletonsEnabled = true;
        // Lens flares
        /**
         * Gets or sets a boolean indicating if lens flares are enabled on this scene
         */
        _this.lensFlaresEnabled = true;
        // Collisions
        /**
         * Gets or sets a boolean indicating if collisions are enabled on this scene
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        _this.collisionsEnabled = true;
        /**
         * Defines the gravity applied to this scene (used only for collisions)
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        _this.gravity = new Vector3(0, -9.807, 0);
        // Postprocesses
        /**
         * Gets or sets a boolean indicating if postprocesses are enabled on this scene
         */
        _this.postProcessesEnabled = true;
        // Customs render targets
        /**
         * Gets or sets a boolean indicating if render targets are enabled on this scene
         */
        _this.renderTargetsEnabled = true;
        /**
         * Gets or sets a boolean indicating if next render targets must be dumped as image for debugging purposes
         * We recommend not using it and instead rely on Spector.js: http://spector.babylonjs.com
         */
        _this.dumpNextRenderTargets = false;
        /**
         * The list of user defined render targets added to the scene
         */
        _this.customRenderTargets = new Array();
        /**
         * Gets the list of meshes imported to the scene through SceneLoader
         */
        _this.importedMeshesFiles = new Array();
        // Probes
        /**
         * Gets or sets a boolean indicating if probes are enabled on this scene
         */
        _this.probesEnabled = true;
        _this._meshesForIntersections = new SmartArrayNoDuplicate(256);
        // Procedural textures
        /**
         * Gets or sets a boolean indicating if procedural textures are enabled on this scene
         */
        _this.proceduralTexturesEnabled = true;
        // Performance counters
        _this._totalVertices = new PerfCounter();
        /** @hidden */
        _this._activeIndices = new PerfCounter();
        /** @hidden */
        _this._activeParticles = new PerfCounter();
        /** @hidden */
        _this._activeBones = new PerfCounter();
        /** @hidden */
        _this._animationTime = 0;
        /**
         * Gets or sets a general scale for animation speed
         * @see https://www.babylonjs-playground.com/#IBU2W7#3
         */
        _this.animationTimeScale = 1;
        _this._renderId = 0;
        _this._frameId = 0;
        _this._executeWhenReadyTimeoutId = null;
        _this._intermediateRendering = false;
        _this._defaultFrameBufferCleared = false;
        _this._viewUpdateFlag = -1;
        _this._projectionUpdateFlag = -1;
        /** @hidden */
        _this._toBeDisposed = new Array(256);
        _this._activeRequests = new Array();
        /** @hidden */
        _this._pendingData = new Array();
        _this._isDisposed = false;
        /**
         * Gets or sets a boolean indicating that all submeshes of active meshes must be rendered
         * Use this boolean to avoid computing frustum clipping on submeshes (This could help when you are CPU bound)
         */
        _this.dispatchAllSubMeshesOfActiveMeshes = false;
        _this._activeMeshes = new SmartArray(256);
        _this._processedMaterials = new SmartArray(256);
        _this._renderTargets = new SmartArrayNoDuplicate(256);
        _this._materialsRenderTargets = new SmartArrayNoDuplicate(256);
        /** @hidden */
        _this._activeParticleSystems = new SmartArray(256);
        _this._activeSkeletons = new SmartArrayNoDuplicate(32);
        _this._softwareSkinnedMeshes = new SmartArrayNoDuplicate(32);
        /** @hidden */
        _this._activeAnimatables = new Array();
        _this._transformMatrix = Matrix.Zero();
        /**
         * Gets or sets a boolean indicating if lights must be sorted by priority (off by default)
         * This is useful if there are more lights that the maximum simulteanous authorized
         */
        _this.requireLightSorting = false;
        /**
         * @hidden
         * Backing store of defined scene components.
         */
        _this._components = [];
        /**
         * @hidden
         * Backing store of defined scene components.
         */
        _this._serializableComponents = [];
        /**
         * List of components to register on the next registration step.
         */
        _this._transientComponents = [];
        /**
         * @hidden
         * Defines the actions happening before camera updates.
         */
        _this._beforeCameraUpdateStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening before clear the canvas.
         */
        _this._beforeClearStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening before clear the canvas.
         */
        _this._beforeRenderTargetClearStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions when collecting render targets for the frame.
         */
        _this._gatherRenderTargetsStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening for one camera in the frame.
         */
        _this._gatherActiveCameraRenderTargetsStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening during the per mesh ready checks.
         */
        _this._isReadyForMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening before evaluate active mesh checks.
         */
        _this._beforeEvaluateActiveMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening during the evaluate sub mesh checks.
         */
        _this._evaluateSubMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening during the active mesh stage.
         */
        _this._preActiveMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening during the per camera render target step.
         */
        _this._cameraDrawRenderTargetStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just before the active camera is drawing.
         */
        _this._beforeCameraDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just before a render target is drawing.
         */
        _this._beforeRenderTargetDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just before a rendering group is drawing.
         */
        _this._beforeRenderingGroupDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just before a mesh is drawing.
         */
        _this._beforeRenderingMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just after a mesh has been drawn.
         */
        _this._afterRenderingMeshStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just after a rendering group has been drawn.
         */
        _this._afterRenderingGroupDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just after the active camera has been drawn.
         */
        _this._afterCameraDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just after a render target has been drawn.
         */
        _this._afterRenderTargetDrawStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening just after rendering all cameras and computing intersections.
         */
        _this._afterRenderStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening when a pointer move event happens.
         */
        _this._pointerMoveStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening when a pointer down event happens.
         */
        _this._pointerDownStage = Stage.Create();
        /**
         * @hidden
         * Defines the actions happening when a pointer up event happens.
         */
        _this._pointerUpStage = Stage.Create();
        /**
         * an optional map from Geometry Id to Geometry index in the 'geometries' array
         */
        _this._geometriesByUniqueId = null;
        _this._defaultMeshCandidates = {
            data: [],
            length: 0
        };
        _this._defaultSubMeshCandidates = {
            data: [],
            length: 0
        };
        _this._preventFreeActiveMeshesAndRenderingGroups = false;
        /** @hidden */
        _this._activeMeshesFrozen = false;
        _this._activeMeshesFrozenButKeepClipping = false;
        _this._skipEvaluateActiveMeshesCompletely = false;
        /** @hidden */
        _this._allowPostProcessClearColor = true;
        /**
         * User updatable function that will return a deterministic frame time when engine is in deterministic lock step mode
         */
        _this.getDeterministicFrameTime = function () {
            return _this._engine.getTimeStep();
        };
        _this._blockMaterialDirtyMechanism = false;
        /**
         * Internal perfCollector instance used for sharing between inspector and playground.
         * Marked as protected to allow sharing between prototype extensions, but disallow access at toplevel.
         */
        _this._perfCollector = null;
        /**
         * An event triggered when the cpu usage/speed meets certain thresholds.
         * Note: Compute pressure is an experimental API.
         */
        _this.onComputePressureChanged = new Observable();
        var fullOptions = __assign({ useGeometryUniqueIdsMap: true, useMaterialMeshMap: true, useClonedMeshMap: true, virtual: false }, options);
        _this._engine = engine || EngineStore.LastCreatedEngine;
        if (!fullOptions.virtual) {
            EngineStore._LastCreatedScene = _this;
            _this._engine.scenes.push(_this);
        }
        else {
            _this._engine._virtualScenes.push(_this);
        }
        _this._uid = null;
        _this._renderingManager = new RenderingManager(_this);
        if (PostProcessManager) {
            _this.postProcessManager = new PostProcessManager(_this);
        }
        if (IsWindowObjectExist()) {
            _this.attachControl();
        }
        // Uniform Buffer
        _this._createUbo();
        // Default Image processing definition
        if (ImageProcessingConfiguration) {
            _this._imageProcessingConfiguration = new ImageProcessingConfiguration();
        }
        _this.setDefaultCandidateProviders();
        if (fullOptions.useGeometryUniqueIdsMap) {
            _this._geometriesByUniqueId = {};
        }
        _this.useMaterialMeshMap = fullOptions.useMaterialMeshMap;
        _this.useClonedMeshMap = fullOptions.useClonedMeshMap;
        if (!options || !options.virtual) {
            _this._engine.onNewSceneAddedObservable.notifyObservers(_this);
        }
        if (ComputePressureObserverWrapper.IsAvailable) {
            _this._computePressureObserver = new ComputePressureObserverWrapper(function (update) {
                _this.onComputePressureChanged.notifyObservers(update);
            }, {
                // Thresholds divide the interval [0.0 .. 1.0] into ranges.
                cpuUtilizationThresholds: [0.25, 0.5, 0.75, 0.9],
                cpuSpeedThresholds: [0.5]
            });
            _this._computePressureObserver.observe();
        }
        return _this;
    }
    /**
     * Factory used to create the default material.
     * @param scene The scene to create the material for
     * @returns The default material
     */
    Scene.DefaultMaterialFactory = function (scene) {
        throw _WarnImport("StandardMaterial");
    };
    /**
     * Factory used to create the a collision coordinator.
     * @returns The collision coordinator
     */
    Scene.CollisionCoordinatorFactory = function () {
        throw _WarnImport("DefaultCollisionCoordinator");
    };
    Object.defineProperty(Scene.prototype, "environmentTexture", {
        /**
         * Texture used in all pbr material as the reflection texture.
         * As in the majority of the scene they are the same (exception for multi room and so on),
         * this is easier to reference from here than from all the materials.
         */
        get: function () {
            return this._environmentTexture;
        },
        /**
         * Texture used in all pbr material as the reflection texture.
         * As in the majority of the scene they are the same (exception for multi room and so on),
         * this is easier to set here than in all the materials.
         */
        set: function (value) {
            if (this._environmentTexture === value) {
                return;
            }
            this._environmentTexture = value;
            this.markAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "imageProcessingConfiguration", {
        /**
         * Default image processing configuration used either in the rendering
         * Forward main pass or through the imageProcessingPostProcess if present.
         * As in the majority of the scene they are the same (exception for multi camera),
         * this is easier to reference from here than from all the materials and post process.
         *
         * No setter as we it is a shared configuration, you can set the values instead.
         */
        get: function () {
            return this._imageProcessingConfiguration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "forceWireframe", {
        get: function () {
            return this._forceWireframe;
        },
        /**
         * Gets or sets a boolean indicating if all rendering must be done in wireframe
         */
        set: function (value) {
            if (this._forceWireframe === value) {
                return;
            }
            this._forceWireframe = value;
            this.markAllMaterialsAsDirty(16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "skipFrustumClipping", {
        get: function () {
            return this._skipFrustumClipping;
        },
        /**
         * Gets or sets a boolean indicating if we should skip the frustum clipping part of the active meshes selection
         */
        set: function (value) {
            if (this._skipFrustumClipping === value) {
                return;
            }
            this._skipFrustumClipping = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "forcePointsCloud", {
        get: function () {
            return this._forcePointsCloud;
        },
        /**
         * Gets or sets a boolean indicating if all rendering must be done in point cloud
         */
        set: function (value) {
            if (this._forcePointsCloud === value) {
                return;
            }
            this._forcePointsCloud = value;
            this.markAllMaterialsAsDirty(16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "animationPropertiesOverride", {
        /**
         * Gets or sets the animation properties override
         */
        get: function () {
            return this._animationPropertiesOverride;
        },
        set: function (value) {
            this._animationPropertiesOverride = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "onDispose", {
        /** Sets a function to be executed when this scene is disposed. */
        set: function (callback) {
            if (this._onDisposeObserver) {
                this.onDisposeObservable.remove(this._onDisposeObserver);
            }
            this._onDisposeObserver = this.onDisposeObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "beforeRender", {
        /** Sets a function to be executed before rendering this scene */
        set: function (callback) {
            if (this._onBeforeRenderObserver) {
                this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
            }
            if (callback) {
                this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "afterRender", {
        /** Sets a function to be executed after rendering this scene */
        set: function (callback) {
            if (this._onAfterRenderObserver) {
                this.onAfterRenderObservable.remove(this._onAfterRenderObserver);
            }
            if (callback) {
                this._onAfterRenderObserver = this.onAfterRenderObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "beforeCameraRender", {
        /** Sets a function to be executed before rendering a camera*/
        set: function (callback) {
            if (this._onBeforeCameraRenderObserver) {
                this.onBeforeCameraRenderObservable.remove(this._onBeforeCameraRenderObserver);
            }
            this._onBeforeCameraRenderObserver = this.onBeforeCameraRenderObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "afterCameraRender", {
        /** Sets a function to be executed after rendering a camera*/
        set: function (callback) {
            if (this._onAfterCameraRenderObserver) {
                this.onAfterCameraRenderObservable.remove(this._onAfterCameraRenderObserver);
            }
            this._onAfterCameraRenderObserver = this.onAfterCameraRenderObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "unTranslatedPointer", {
        /**
         * Gets the pointer coordinates without any translation (ie. straight out of the pointer event)
         */
        get: function () {
            return this._inputManager.unTranslatedPointer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene, "DragMovementThreshold", {
        /**
         * Gets or sets the distance in pixel that you have to move to prevent some events. Default is 10 pixels
         */
        get: function () {
            return InputManager.DragMovementThreshold;
        },
        set: function (value) {
            InputManager.DragMovementThreshold = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene, "LongPressDelay", {
        /**
         * Time in milliseconds to wait to raise long press events if button is still pressed. Default is 500 ms
         */
        get: function () {
            return InputManager.LongPressDelay;
        },
        set: function (value) {
            InputManager.LongPressDelay = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene, "DoubleClickDelay", {
        /**
         * Time in milliseconds to wait to raise long press events if button is still pressed. Default is 300 ms
         */
        get: function () {
            return InputManager.DoubleClickDelay;
        },
        set: function (value) {
            InputManager.DoubleClickDelay = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene, "ExclusiveDoubleClickMode", {
        /** If you need to check double click without raising a single click at first click, enable this flag */
        get: function () {
            return InputManager.ExclusiveDoubleClickMode;
        },
        set: function (value) {
            InputManager.ExclusiveDoubleClickMode = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Bind the current view position to an effect.
     * @param effect The effect to be bound
     * @param variableName name of the shader variable that will hold the eye position
     * @param isVector3 true to indicates that variableName is a Vector3 and not a Vector4
     * @return the computed eye position
     */
    Scene.prototype.bindEyePosition = function (effect, variableName, isVector3) {
        var _a;
        if (variableName === void 0) { variableName = "vEyePosition"; }
        if (isVector3 === void 0) { isVector3 = false; }
        var eyePosition = this._forcedViewPosition
            ? this._forcedViewPosition
            : this._mirroredCameraPosition
                ? this._mirroredCameraPosition
                : (_a = this.activeCamera.globalPosition) !== null && _a !== void 0 ? _a : this.activeCamera.devicePosition;
        var invertNormal = this.useRightHandedSystem === (this._mirroredCameraPosition != null);
        TmpVectors.Vector4[0].set(eyePosition.x, eyePosition.y, eyePosition.z, invertNormal ? -1 : 1);
        if (effect) {
            if (isVector3) {
                effect.setFloat3(variableName, TmpVectors.Vector4[0].x, TmpVectors.Vector4[0].y, TmpVectors.Vector4[0].z);
            }
            else {
                effect.setVector4(variableName, TmpVectors.Vector4[0]);
            }
        }
        return TmpVectors.Vector4[0];
    };
    /**
     * Update the scene ubo before it can be used in rendering processing
     * @returns the scene UniformBuffer
     */
    Scene.prototype.finalizeSceneUbo = function () {
        var ubo = this.getSceneUniformBuffer();
        var eyePosition = this.bindEyePosition(null);
        ubo.updateFloat4("vEyePosition", eyePosition.x, eyePosition.y, eyePosition.z, eyePosition.w);
        ubo.update();
        return ubo;
    };
    Object.defineProperty(Scene.prototype, "useRightHandedSystem", {
        get: function () {
            return this._useRightHandedSystem;
        },
        /**
         * Gets or sets a boolean indicating if the scene must use right-handed coordinates system
         */
        set: function (value) {
            if (this._useRightHandedSystem === value) {
                return;
            }
            this._useRightHandedSystem = value;
            this.markAllMaterialsAsDirty(16);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the step Id used by deterministic lock step
     * @see https://doc.babylonjs.com/babylon101/animations#deterministic-lockstep
     * @param newStepId defines the step Id
     */
    Scene.prototype.setStepId = function (newStepId) {
        this._currentStepId = newStepId;
    };
    /**
     * Gets the step Id used by deterministic lock step
     * @see https://doc.babylonjs.com/babylon101/animations#deterministic-lockstep
     * @returns the step Id
     */
    Scene.prototype.getStepId = function () {
        return this._currentStepId;
    };
    /**
     * Gets the internal step used by deterministic lock step
     * @see https://doc.babylonjs.com/babylon101/animations#deterministic-lockstep
     * @returns the internal step
     */
    Scene.prototype.getInternalStep = function () {
        return this._currentInternalStep;
    };
    Object.defineProperty(Scene.prototype, "fogEnabled", {
        get: function () {
            return this._fogEnabled;
        },
        /**
         * Gets or sets a boolean indicating if fog is enabled on this scene
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * (Default is true)
         */
        set: function (value) {
            if (this._fogEnabled === value) {
                return;
            }
            this._fogEnabled = value;
            this.markAllMaterialsAsDirty(16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "fogMode", {
        get: function () {
            return this._fogMode;
        },
        /**
         * Gets or sets the fog mode to use
         * @see https://doc.babylonjs.com/babylon101/environment#fog
         * | mode | value |
         * | --- | --- |
         * | FOGMODE_NONE | 0 |
         * | FOGMODE_EXP | 1 |
         * | FOGMODE_EXP2 | 2 |
         * | FOGMODE_LINEAR | 3 |
         */
        set: function (value) {
            if (this._fogMode === value) {
                return;
            }
            this._fogMode = value;
            this.markAllMaterialsAsDirty(16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "prePass", {
        /**
         * Flag indicating that the frame buffer binding is handled by another component
         */
        get: function () {
            return !!this.prePassRenderer && this.prePassRenderer.defaultRT.enabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "shadowsEnabled", {
        get: function () {
            return this._shadowsEnabled;
        },
        /**
         * Gets or sets a boolean indicating if shadows are enabled on this scene
         */
        set: function (value) {
            if (this._shadowsEnabled === value) {
                return;
            }
            this._shadowsEnabled = value;
            this.markAllMaterialsAsDirty(2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "lightsEnabled", {
        get: function () {
            return this._lightsEnabled;
        },
        /**
         * Gets or sets a boolean indicating if lights are enabled on this scene
         */
        set: function (value) {
            if (this._lightsEnabled === value) {
                return;
            }
            this._lightsEnabled = value;
            this.markAllMaterialsAsDirty(2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "activeCamera", {
        /** Gets or sets the current active camera */
        get: function () {
            return this._activeCamera;
        },
        set: function (value) {
            if (value === this._activeCamera) {
                return;
            }
            this._activeCamera = value;
            this.onActiveCameraChanged.notifyObservers(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "defaultMaterial", {
        /** The default material used on meshes when no material is affected */
        get: function () {
            if (!this._defaultMaterial) {
                this._defaultMaterial = Scene.DefaultMaterialFactory(this);
            }
            return this._defaultMaterial;
        },
        /** The default material used on meshes when no material is affected */
        set: function (value) {
            this._defaultMaterial = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "texturesEnabled", {
        get: function () {
            return this._texturesEnabled;
        },
        /**
         * Gets or sets a boolean indicating if textures are enabled on this scene
         */
        set: function (value) {
            if (this._texturesEnabled === value) {
                return;
            }
            this._texturesEnabled = value;
            this.markAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "skeletonsEnabled", {
        get: function () {
            return this._skeletonsEnabled;
        },
        /**
         * Gets or sets a boolean indicating if skeletons are enabled on this scene
         */
        set: function (value) {
            if (this._skeletonsEnabled === value) {
                return;
            }
            this._skeletonsEnabled = value;
            this.markAllMaterialsAsDirty(8);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "collisionCoordinator", {
        /** @hidden */
        get: function () {
            if (!this._collisionCoordinator) {
                this._collisionCoordinator = Scene.CollisionCoordinatorFactory();
                this._collisionCoordinator.init(this);
            }
            return this._collisionCoordinator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "frustumPlanes", {
        /**
         * Gets the list of frustum planes (built from the active camera)
         */
        get: function () {
            return this._frustumPlanes;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Registers the transient components if needed.
     */
    Scene.prototype._registerTransientComponents = function () {
        // Register components that have been associated lately to the scene.
        if (this._transientComponents.length > 0) {
            for (var _i = 0, _a = this._transientComponents; _i < _a.length; _i++) {
                var component = _a[_i];
                component.register();
            }
            this._transientComponents = [];
        }
    };
    /**
     * @hidden
     * Add a component to the scene.
     * Note that the ccomponent could be registered on th next frame if this is called after
     * the register component stage.
     * @param component Defines the component to add to the scene
     */
    Scene.prototype._addComponent = function (component) {
        this._components.push(component);
        this._transientComponents.push(component);
        var serializableComponent = component;
        if (serializableComponent.addFromContainer && serializableComponent.serialize) {
            this._serializableComponents.push(serializableComponent);
        }
    };
    /**
     * @hidden
     * Gets a component from the scene.
     * @param name defines the name of the component to retrieve
     * @returns the component or null if not present
     */
    Scene.prototype._getComponent = function (name) {
        for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
            var component = _a[_i];
            if (component.name === name) {
                return component;
            }
        }
        return null;
    };
    /**
     * Gets a string identifying the name of the class
     * @returns "Scene" string
     */
    Scene.prototype.getClassName = function () {
        return "Scene";
    };
    /**
     * @hidden
     */
    Scene.prototype._getDefaultMeshCandidates = function () {
        this._defaultMeshCandidates.data = this.meshes;
        this._defaultMeshCandidates.length = this.meshes.length;
        return this._defaultMeshCandidates;
    };
    /**
     * @param mesh
     * @hidden
     */
    Scene.prototype._getDefaultSubMeshCandidates = function (mesh) {
        this._defaultSubMeshCandidates.data = mesh.subMeshes;
        this._defaultSubMeshCandidates.length = mesh.subMeshes.length;
        return this._defaultSubMeshCandidates;
    };
    /**
     * Sets the default candidate providers for the scene.
     * This sets the getActiveMeshCandidates, getActiveSubMeshCandidates, getIntersectingSubMeshCandidates
     * and getCollidingSubMeshCandidates to their default function
     */
    Scene.prototype.setDefaultCandidateProviders = function () {
        this.getActiveMeshCandidates = this._getDefaultMeshCandidates.bind(this);
        this.getActiveSubMeshCandidates = this._getDefaultSubMeshCandidates.bind(this);
        this.getIntersectingSubMeshCandidates = this._getDefaultSubMeshCandidates.bind(this);
        this.getCollidingSubMeshCandidates = this._getDefaultSubMeshCandidates.bind(this);
    };
    Object.defineProperty(Scene.prototype, "meshUnderPointer", {
        /**
         * Gets the mesh that is currently under the pointer
         */
        get: function () {
            return this._inputManager.meshUnderPointer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "pointerX", {
        /**
         * Gets or sets the current on-screen X position of the pointer
         */
        get: function () {
            return this._inputManager.pointerX;
        },
        set: function (value) {
            this._inputManager.pointerX = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "pointerY", {
        /**
         * Gets or sets the current on-screen Y position of the pointer
         */
        get: function () {
            return this._inputManager.pointerY;
        },
        set: function (value) {
            this._inputManager.pointerY = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the cached material (ie. the latest rendered one)
     * @returns the cached material
     */
    Scene.prototype.getCachedMaterial = function () {
        return this._cachedMaterial;
    };
    /**
     * Gets the cached effect (ie. the latest rendered one)
     * @returns the cached effect
     */
    Scene.prototype.getCachedEffect = function () {
        return this._cachedEffect;
    };
    /**
     * Gets the cached visibility state (ie. the latest rendered one)
     * @returns the cached visibility state
     */
    Scene.prototype.getCachedVisibility = function () {
        return this._cachedVisibility;
    };
    /**
     * Gets a boolean indicating if the current material / effect / visibility must be bind again
     * @param material defines the current material
     * @param effect defines the current effect
     * @param visibility defines the current visibility state
     * @returns true if one parameter is not cached
     */
    Scene.prototype.isCachedMaterialInvalid = function (material, effect, visibility) {
        if (visibility === void 0) { visibility = 1; }
        return this._cachedEffect !== effect || this._cachedMaterial !== material || this._cachedVisibility !== visibility;
    };
    /**
     * Gets the engine associated with the scene
     * @returns an Engine
     */
    Scene.prototype.getEngine = function () {
        return this._engine;
    };
    /**
     * Gets the total number of vertices rendered per frame
     * @returns the total number of vertices rendered per frame
     */
    Scene.prototype.getTotalVertices = function () {
        return this._totalVertices.current;
    };
    Object.defineProperty(Scene.prototype, "totalVerticesPerfCounter", {
        /**
         * Gets the performance counter for total vertices
         * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#instrumentation
         */
        get: function () {
            return this._totalVertices;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the total number of active indices rendered per frame (You can deduce the number of rendered triangles by dividing this number by 3)
     * @returns the total number of active indices rendered per frame
     */
    Scene.prototype.getActiveIndices = function () {
        return this._activeIndices.current;
    };
    Object.defineProperty(Scene.prototype, "totalActiveIndicesPerfCounter", {
        /**
         * Gets the performance counter for active indices
         * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#instrumentation
         */
        get: function () {
            return this._activeIndices;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the total number of active particles rendered per frame
     * @returns the total number of active particles rendered per frame
     */
    Scene.prototype.getActiveParticles = function () {
        return this._activeParticles.current;
    };
    Object.defineProperty(Scene.prototype, "activeParticlesPerfCounter", {
        /**
         * Gets the performance counter for active particles
         * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#instrumentation
         */
        get: function () {
            return this._activeParticles;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the total number of active bones rendered per frame
     * @returns the total number of active bones rendered per frame
     */
    Scene.prototype.getActiveBones = function () {
        return this._activeBones.current;
    };
    Object.defineProperty(Scene.prototype, "activeBonesPerfCounter", {
        /**
         * Gets the performance counter for active bones
         * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#instrumentation
         */
        get: function () {
            return this._activeBones;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the array of active meshes
     * @returns an array of AbstractMesh
     */
    Scene.prototype.getActiveMeshes = function () {
        return this._activeMeshes;
    };
    /**
     * Gets the animation ratio (which is 1.0 is the scene renders at 60fps and 2 if the scene renders at 30fps, etc.)
     * @returns a number
     */
    Scene.prototype.getAnimationRatio = function () {
        return this._animationRatio !== undefined ? this._animationRatio : 1;
    };
    /**
     * Gets an unique Id for the current render phase
     * @returns a number
     */
    Scene.prototype.getRenderId = function () {
        return this._renderId;
    };
    /**
     * Gets an unique Id for the current frame
     * @returns a number
     */
    Scene.prototype.getFrameId = function () {
        return this._frameId;
    };
    /** Call this function if you want to manually increment the render Id*/
    Scene.prototype.incrementRenderId = function () {
        this._renderId++;
    };
    Scene.prototype._createUbo = function () {
        this.setSceneUniformBuffer(this.createSceneUniformBuffer());
    };
    /**
     * Use this method to simulate a pointer move on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     * @returns the current scene
     */
    Scene.prototype.simulatePointerMove = function (pickResult, pointerEventInit) {
        this._inputManager.simulatePointerMove(pickResult, pointerEventInit);
        return this;
    };
    /**
     * Use this method to simulate a pointer down on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     * @returns the current scene
     */
    Scene.prototype.simulatePointerDown = function (pickResult, pointerEventInit) {
        this._inputManager.simulatePointerDown(pickResult, pointerEventInit);
        return this;
    };
    /**
     * Use this method to simulate a pointer up on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     * @param doubleTap indicates that the pointer up event should be considered as part of a double click (false by default)
     * @returns the current scene
     */
    Scene.prototype.simulatePointerUp = function (pickResult, pointerEventInit, doubleTap) {
        this._inputManager.simulatePointerUp(pickResult, pointerEventInit, doubleTap);
        return this;
    };
    /**
     * Gets a boolean indicating if the current pointer event is captured (meaning that the scene has already handled the pointer down)
     * @param pointerId defines the pointer id to use in a multi-touch scenario (0 by default)
     * @returns true if the pointer was captured
     */
    Scene.prototype.isPointerCaptured = function (pointerId) {
        if (pointerId === void 0) { pointerId = 0; }
        return this._inputManager.isPointerCaptured(pointerId);
    };
    /**
     * Attach events to the canvas (To handle actionManagers triggers and raise onPointerMove, onPointerDown and onPointerUp
     * @param attachUp defines if you want to attach events to pointerup
     * @param attachDown defines if you want to attach events to pointerdown
     * @param attachMove defines if you want to attach events to pointermove
     */
    Scene.prototype.attachControl = function (attachUp, attachDown, attachMove) {
        if (attachUp === void 0) { attachUp = true; }
        if (attachDown === void 0) { attachDown = true; }
        if (attachMove === void 0) { attachMove = true; }
        this._inputManager.attachControl(attachUp, attachDown, attachMove);
    };
    /** Detaches all event handlers*/
    Scene.prototype.detachControl = function () {
        this._inputManager.detachControl();
    };
    /**
     * This function will check if the scene can be rendered (textures are loaded, shaders are compiled)
     * Delay loaded resources are not taking in account
     * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: true)
     * @return true if all required resources are ready
     */
    Scene.prototype.isReady = function (checkRenderTargets) {
        if (checkRenderTargets === void 0) { checkRenderTargets = true; }
        if (this._isDisposed) {
            return false;
        }
        var index;
        var engine = this.getEngine();
        var isReady = true;
        // Pending data
        if (this._pendingData.length > 0) {
            isReady = false;
        }
        // Meshes
        if (checkRenderTargets) {
            this._processedMaterials.reset();
            this._materialsRenderTargets.reset();
        }
        for (index = 0; index < this.meshes.length; index++) {
            var mesh = this.meshes[index];
            if (!mesh.subMeshes || mesh.subMeshes.length === 0) {
                continue;
            }
            // Do not stop at the first encountered "unready" object as we want to ensure
            // all materials are starting off their compilation in parallel.
            if (!mesh.isReady(true)) {
                isReady = false;
                continue;
            }
            var hardwareInstancedRendering = mesh.hasThinInstances ||
                mesh.getClassName() === "InstancedMesh" ||
                mesh.getClassName() === "InstancedLinesMesh" ||
                (engine.getCaps().instancedArrays && mesh.instances.length > 0);
            // Is Ready For Mesh
            for (var _i = 0, _a = this._isReadyForMeshStage; _i < _a.length; _i++) {
                var step = _a[_i];
                if (!step.action(mesh, hardwareInstancedRendering)) {
                    isReady = false;
                }
            }
            if (!checkRenderTargets) {
                continue;
            }
            var mat = mesh.material || this.defaultMaterial;
            if (mat) {
                if (mat._storeEffectOnSubMeshes) {
                    for (var _b = 0, _c = mesh.subMeshes; _b < _c.length; _b++) {
                        var subMesh = _c[_b];
                        var material = subMesh.getMaterial();
                        if (material && material.hasRenderTargetTextures && material.getRenderTargetTextures != null) {
                            if (this._processedMaterials.indexOf(material) === -1) {
                                this._processedMaterials.push(material);
                                this._materialsRenderTargets.concatWithNoDuplicate(material.getRenderTargetTextures());
                            }
                        }
                    }
                }
                else {
                    if (mat.hasRenderTargetTextures && mat.getRenderTargetTextures != null) {
                        if (this._processedMaterials.indexOf(mat) === -1) {
                            this._processedMaterials.push(mat);
                            this._materialsRenderTargets.concatWithNoDuplicate(mat.getRenderTargetTextures());
                        }
                    }
                }
            }
        }
        if (!isReady) {
            return false;
        }
        // Effects
        if (!engine.areAllEffectsReady()) {
            return false;
        }
        // Render targets
        if (checkRenderTargets) {
            for (index = 0; index < this._materialsRenderTargets.length; ++index) {
                var rtt = this._materialsRenderTargets.data[index];
                if (!rtt.isReadyForRendering()) {
                    return false;
                }
            }
        }
        // Geometries
        for (index = 0; index < this.geometries.length; index++) {
            var geometry = this.geometries[index];
            if (geometry.delayLoadState === 2) {
                return false;
            }
        }
        // Post-processes
        if (this.activeCameras && this.activeCameras.length > 0) {
            for (var _d = 0, _e = this.activeCameras; _d < _e.length; _d++) {
                var camera = _e[_d];
                if (!camera.isReady(true)) {
                    return false;
                }
            }
        }
        else if (this.activeCamera) {
            if (!this.activeCamera.isReady(true)) {
                return false;
            }
        }
        // Particles
        for (var _f = 0, _g = this.particleSystems; _f < _g.length; _f++) {
            var particleSystem = _g[_f];
            if (!particleSystem.isReady()) {
                return false;
            }
        }
        return true;
    };
    /** Resets all cached information relative to material (including effect and visibility) */
    Scene.prototype.resetCachedMaterial = function () {
        this._cachedMaterial = null;
        this._cachedEffect = null;
        this._cachedVisibility = null;
    };
    /**
     * Registers a function to be called before every frame render
     * @param func defines the function to register
     */
    Scene.prototype.registerBeforeRender = function (func) {
        this.onBeforeRenderObservable.add(func);
    };
    /**
     * Unregisters a function called before every frame render
     * @param func defines the function to unregister
     */
    Scene.prototype.unregisterBeforeRender = function (func) {
        this.onBeforeRenderObservable.removeCallback(func);
    };
    /**
     * Registers a function to be called after every frame render
     * @param func defines the function to register
     */
    Scene.prototype.registerAfterRender = function (func) {
        this.onAfterRenderObservable.add(func);
    };
    /**
     * Unregisters a function called after every frame render
     * @param func defines the function to unregister
     */
    Scene.prototype.unregisterAfterRender = function (func) {
        this.onAfterRenderObservable.removeCallback(func);
    };
    Scene.prototype._executeOnceBeforeRender = function (func) {
        var _this = this;
        var execFunc = function () {
            func();
            setTimeout(function () {
                _this.unregisterBeforeRender(execFunc);
            });
        };
        this.registerBeforeRender(execFunc);
    };
    /**
     * The provided function will run before render once and will be disposed afterwards.
     * A timeout delay can be provided so that the function will be executed in N ms.
     * The timeout is using the browser's native setTimeout so time percision cannot be guaranteed.
     * @param func The function to be executed.
     * @param timeout optional delay in ms
     */
    Scene.prototype.executeOnceBeforeRender = function (func, timeout) {
        var _this = this;
        if (timeout !== undefined) {
            setTimeout(function () {
                _this._executeOnceBeforeRender(func);
            }, timeout);
        }
        else {
            this._executeOnceBeforeRender(func);
        }
    };
    /**
     * This function can help adding any object to the list of data awaited to be ready in order to check for a complete scene loading.
     * @param data defines the object to wait for
     */
    Scene.prototype.addPendingData = function (data) {
        this._pendingData.push(data);
    };
    /**
     * Remove a pending data from the loading list which has previously been added with addPendingData.
     * @param data defines the object to remove from the pending list
     */
    Scene.prototype.removePendingData = function (data) {
        var wasLoading = this.isLoading;
        var index = this._pendingData.indexOf(data);
        if (index !== -1) {
            this._pendingData.splice(index, 1);
        }
        if (wasLoading && !this.isLoading) {
            this.onDataLoadedObservable.notifyObservers(this);
        }
    };
    /**
     * Returns the number of items waiting to be loaded
     * @returns the number of items waiting to be loaded
     */
    Scene.prototype.getWaitingItemsCount = function () {
        return this._pendingData.length;
    };
    Object.defineProperty(Scene.prototype, "isLoading", {
        /**
         * Returns a boolean indicating if the scene is still loading data
         */
        get: function () {
            return this._pendingData.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Registers a function to be executed when the scene is ready
     * @param {Function} func - the function to be executed
     * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: false)
     */
    Scene.prototype.executeWhenReady = function (func, checkRenderTargets) {
        if (checkRenderTargets === void 0) { checkRenderTargets = false; }
        this.onReadyObservable.add(func);
        if (this._executeWhenReadyTimeoutId !== null) {
            return;
        }
        this._checkIsReady(checkRenderTargets);
    };
    /**
     * Returns a promise that resolves when the scene is ready
     * @param checkRenderTargets true to also check that the meshes rendered as part of a render target are ready (default: false)
     * @returns A promise that resolves when the scene is ready
     */
    Scene.prototype.whenReadyAsync = function (checkRenderTargets) {
        var _this = this;
        if (checkRenderTargets === void 0) { checkRenderTargets = false; }
        return new Promise(function (resolve) {
            _this.executeWhenReady(function () {
                resolve();
            }, checkRenderTargets);
        });
    };
    /**
     * @param checkRenderTargets
     * @hidden
     */
    Scene.prototype._checkIsReady = function (checkRenderTargets) {
        var _this = this;
        if (checkRenderTargets === void 0) { checkRenderTargets = false; }
        this._registerTransientComponents();
        if (this.isReady(checkRenderTargets)) {
            this.onReadyObservable.notifyObservers(this);
            this.onReadyObservable.clear();
            this._executeWhenReadyTimeoutId = null;
            return;
        }
        if (this._isDisposed) {
            this.onReadyObservable.clear();
            this._executeWhenReadyTimeoutId = null;
            return;
        }
        this._executeWhenReadyTimeoutId = setTimeout(function () {
            _this._checkIsReady(checkRenderTargets);
        }, 100);
    };
    Object.defineProperty(Scene.prototype, "animatables", {
        /**
         * Gets all animatable attached to the scene
         */
        get: function () {
            return this._activeAnimatables;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Resets the last animation time frame.
     * Useful to override when animations start running when loading a scene for the first time.
     */
    Scene.prototype.resetLastAnimationTimeFrame = function () {
        this._animationTimeLast = PrecisionDate.Now;
    };
    // Matrix
    /**
     * Gets the current view matrix
     * @returns a Matrix
     */
    Scene.prototype.getViewMatrix = function () {
        return this._viewMatrix;
    };
    /**
     * Gets the current projection matrix
     * @returns a Matrix
     */
    Scene.prototype.getProjectionMatrix = function () {
        return this._projectionMatrix;
    };
    /**
     * Gets the current transform matrix
     * @returns a Matrix made of View * Projection
     */
    Scene.prototype.getTransformMatrix = function () {
        return this._transformMatrix;
    };
    /**
     * Sets the current transform matrix
     * @param viewL defines the View matrix to use
     * @param projectionL defines the Projection matrix to use
     * @param viewR defines the right View matrix to use (if provided)
     * @param projectionR defines the right Projection matrix to use (if provided)
     */
    Scene.prototype.setTransformMatrix = function (viewL, projectionL, viewR, projectionR) {
        // clear the multiviewSceneUbo if no viewR and projectionR are defined
        if (!viewR && !projectionR && this._multiviewSceneUbo) {
            this._multiviewSceneUbo.dispose();
            this._multiviewSceneUbo = null;
        }
        if (this._viewUpdateFlag === viewL.updateFlag && this._projectionUpdateFlag === projectionL.updateFlag) {
            return;
        }
        this._viewUpdateFlag = viewL.updateFlag;
        this._projectionUpdateFlag = projectionL.updateFlag;
        this._viewMatrix = viewL;
        this._projectionMatrix = projectionL;
        this._viewMatrix.multiplyToRef(this._projectionMatrix, this._transformMatrix);
        // Update frustum
        if (!this._frustumPlanes) {
            this._frustumPlanes = Frustum.GetPlanes(this._transformMatrix);
        }
        else {
            Frustum.GetPlanesToRef(this._transformMatrix, this._frustumPlanes);
        }
        if (this._multiviewSceneUbo && this._multiviewSceneUbo.useUbo) {
            this._updateMultiviewUbo(viewR, projectionR);
        }
        else if (this._sceneUbo.useUbo) {
            this._sceneUbo.updateMatrix("viewProjection", this._transformMatrix);
            this._sceneUbo.updateMatrix("view", this._viewMatrix);
            this._sceneUbo.updateMatrix("projection", this._projectionMatrix);
        }
    };
    /**
     * Gets the uniform buffer used to store scene data
     * @returns a UniformBuffer
     */
    Scene.prototype.getSceneUniformBuffer = function () {
        return this._multiviewSceneUbo ? this._multiviewSceneUbo : this._sceneUbo;
    };
    /**
     * Creates a scene UBO
     * @param name name of the uniform buffer (optional, for debugging purpose only)
     * @returns a new ubo
     */
    Scene.prototype.createSceneUniformBuffer = function (name) {
        var sceneUbo = new UniformBuffer(this._engine, undefined, false, name !== null && name !== void 0 ? name : "scene");
        sceneUbo.addUniform("viewProjection", 16);
        sceneUbo.addUniform("view", 16);
        sceneUbo.addUniform("projection", 16);
        sceneUbo.addUniform("vEyePosition", 4);
        return sceneUbo;
    };
    /**
     * Sets the scene ubo
     * @param ubo the ubo to set for the scene
     */
    Scene.prototype.setSceneUniformBuffer = function (ubo) {
        this._sceneUbo = ubo;
        this._viewUpdateFlag = -1;
        this._projectionUpdateFlag = -1;
    };
    /**
     * Gets an unique (relatively to the current scene) Id
     * @returns an unique number for the scene
     */
    Scene.prototype.getUniqueId = function () {
        return UniqueIdGenerator.UniqueId;
    };
    /**
     * Add a mesh to the list of scene's meshes
     * @param newMesh defines the mesh to add
     * @param recursive if all child meshes should also be added to the scene
     */
    Scene.prototype.addMesh = function (newMesh, recursive) {
        var _this = this;
        if (recursive === void 0) { recursive = false; }
        if (this._blockEntityCollection) {
            return;
        }
        this.meshes.push(newMesh);
        newMesh._resyncLightSources();
        if (!newMesh.parent) {
            newMesh._addToSceneRootNodes();
        }
        this.onNewMeshAddedObservable.notifyObservers(newMesh);
        if (recursive) {
            newMesh.getChildMeshes().forEach(function (m) {
                _this.addMesh(m);
            });
        }
    };
    /**
     * Remove a mesh for the list of scene's meshes
     * @param toRemove defines the mesh to remove
     * @param recursive if all child meshes should also be removed from the scene
     * @returns the index where the mesh was in the mesh list
     */
    Scene.prototype.removeMesh = function (toRemove, recursive) {
        var _this = this;
        if (recursive === void 0) { recursive = false; }
        var index = this.meshes.indexOf(toRemove);
        if (index !== -1) {
            // Remove from the scene if mesh found
            this.meshes[index] = this.meshes[this.meshes.length - 1];
            this.meshes.pop();
            if (!toRemove.parent) {
                toRemove._removeFromSceneRootNodes();
            }
        }
        this._inputManager._invalidateMesh(toRemove);
        this.onMeshRemovedObservable.notifyObservers(toRemove);
        if (recursive) {
            toRemove.getChildMeshes().forEach(function (m) {
                _this.removeMesh(m);
            });
        }
        return index;
    };
    /**
     * Add a transform node to the list of scene's transform nodes
     * @param newTransformNode defines the transform node to add
     */
    Scene.prototype.addTransformNode = function (newTransformNode) {
        if (this._blockEntityCollection) {
            return;
        }
        if (newTransformNode.getScene() === this && newTransformNode._indexInSceneTransformNodesArray !== -1) {
            // Already there?
            return;
        }
        newTransformNode._indexInSceneTransformNodesArray = this.transformNodes.length;
        this.transformNodes.push(newTransformNode);
        if (!newTransformNode.parent) {
            newTransformNode._addToSceneRootNodes();
        }
        this.onNewTransformNodeAddedObservable.notifyObservers(newTransformNode);
    };
    /**
     * Remove a transform node for the list of scene's transform nodes
     * @param toRemove defines the transform node to remove
     * @returns the index where the transform node was in the transform node list
     */
    Scene.prototype.removeTransformNode = function (toRemove) {
        var index = toRemove._indexInSceneTransformNodesArray;
        if (index !== -1) {
            if (index !== this.transformNodes.length - 1) {
                var lastNode = this.transformNodes[this.transformNodes.length - 1];
                this.transformNodes[index] = lastNode;
                lastNode._indexInSceneTransformNodesArray = index;
            }
            toRemove._indexInSceneTransformNodesArray = -1;
            this.transformNodes.pop();
            if (!toRemove.parent) {
                toRemove._removeFromSceneRootNodes();
            }
        }
        this.onTransformNodeRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Remove a skeleton for the list of scene's skeletons
     * @param toRemove defines the skeleton to remove
     * @returns the index where the skeleton was in the skeleton list
     */
    Scene.prototype.removeSkeleton = function (toRemove) {
        var index = this.skeletons.indexOf(toRemove);
        if (index !== -1) {
            // Remove from the scene if found
            this.skeletons.splice(index, 1);
            this.onSkeletonRemovedObservable.notifyObservers(toRemove);
            // Clean active container
            this._executeActiveContainerCleanup(this._activeSkeletons);
        }
        return index;
    };
    /**
     * Remove a morph target for the list of scene's morph targets
     * @param toRemove defines the morph target to remove
     * @returns the index where the morph target was in the morph target list
     */
    Scene.prototype.removeMorphTargetManager = function (toRemove) {
        var index = this.morphTargetManagers.indexOf(toRemove);
        if (index !== -1) {
            // Remove from the scene if found
            this.morphTargetManagers.splice(index, 1);
        }
        return index;
    };
    /**
     * Remove a light for the list of scene's lights
     * @param toRemove defines the light to remove
     * @returns the index where the light was in the light list
     */
    Scene.prototype.removeLight = function (toRemove) {
        var index = this.lights.indexOf(toRemove);
        if (index !== -1) {
            // Remove from meshes
            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
                var mesh = _a[_i];
                mesh._removeLightSource(toRemove, false);
            }
            // Remove from the scene if mesh found
            this.lights.splice(index, 1);
            this.sortLightsByPriority();
            if (!toRemove.parent) {
                toRemove._removeFromSceneRootNodes();
            }
        }
        this.onLightRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Remove a camera for the list of scene's cameras
     * @param toRemove defines the camera to remove
     * @returns the index where the camera was in the camera list
     */
    Scene.prototype.removeCamera = function (toRemove) {
        var index = this.cameras.indexOf(toRemove);
        if (index !== -1) {
            // Remove from the scene if mesh found
            this.cameras.splice(index, 1);
            if (!toRemove.parent) {
                toRemove._removeFromSceneRootNodes();
            }
        }
        // Remove from activeCameras
        if (this.activeCameras) {
            var index2 = this.activeCameras.indexOf(toRemove);
            if (index2 !== -1) {
                // Remove from the scene if mesh found
                this.activeCameras.splice(index2, 1);
            }
        }
        // Reset the activeCamera
        if (this.activeCamera === toRemove) {
            if (this.cameras.length > 0) {
                this.activeCamera = this.cameras[0];
            }
            else {
                this.activeCamera = null;
            }
        }
        this.onCameraRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Remove a particle system for the list of scene's particle systems
     * @param toRemove defines the particle system to remove
     * @returns the index where the particle system was in the particle system list
     */
    Scene.prototype.removeParticleSystem = function (toRemove) {
        var index = this.particleSystems.indexOf(toRemove);
        if (index !== -1) {
            this.particleSystems.splice(index, 1);
            // Clean active container
            this._executeActiveContainerCleanup(this._activeParticleSystems);
        }
        return index;
    };
    /**
     * Remove a animation for the list of scene's animations
     * @param toRemove defines the animation to remove
     * @returns the index where the animation was in the animation list
     */
    Scene.prototype.removeAnimation = function (toRemove) {
        var index = this.animations.indexOf(toRemove);
        if (index !== -1) {
            this.animations.splice(index, 1);
        }
        return index;
    };
    /**
     * Will stop the animation of the given target
     * @param target - the target
     * @param animationName - the name of the animation to stop (all animations will be stopped if both this and targetMask are empty)
     * @param targetMask - a function that determines if the animation should be stopped based on its target (all animations will be stopped if both this and animationName are empty)
     */
    Scene.prototype.stopAnimation = function (target, animationName, targetMask) {
        // Do nothing as code will be provided by animation component
    };
    /**
     * Removes the given animation group from this scene.
     * @param toRemove The animation group to remove
     * @returns The index of the removed animation group
     */
    Scene.prototype.removeAnimationGroup = function (toRemove) {
        var index = this.animationGroups.indexOf(toRemove);
        if (index !== -1) {
            this.animationGroups.splice(index, 1);
        }
        return index;
    };
    /**
     * Removes the given multi-material from this scene.
     * @param toRemove The multi-material to remove
     * @returns The index of the removed multi-material
     */
    Scene.prototype.removeMultiMaterial = function (toRemove) {
        var index = this.multiMaterials.indexOf(toRemove);
        if (index !== -1) {
            this.multiMaterials.splice(index, 1);
        }
        this.onMultiMaterialRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Removes the given material from this scene.
     * @param toRemove The material to remove
     * @returns The index of the removed material
     */
    Scene.prototype.removeMaterial = function (toRemove) {
        var index = toRemove._indexInSceneMaterialArray;
        if (index !== -1 && index < this.materials.length) {
            if (index !== this.materials.length - 1) {
                var lastMaterial = this.materials[this.materials.length - 1];
                this.materials[index] = lastMaterial;
                lastMaterial._indexInSceneMaterialArray = index;
            }
            toRemove._indexInSceneMaterialArray = -1;
            this.materials.pop();
        }
        this.onMaterialRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Removes the given action manager from this scene.
     * @deprecated
     * @param toRemove The action manager to remove
     * @returns The index of the removed action manager
     */
    Scene.prototype.removeActionManager = function (toRemove) {
        var index = this.actionManagers.indexOf(toRemove);
        if (index !== -1) {
            this.actionManagers.splice(index, 1);
        }
        return index;
    };
    /**
     * Removes the given texture from this scene.
     * @param toRemove The texture to remove
     * @returns The index of the removed texture
     */
    Scene.prototype.removeTexture = function (toRemove) {
        var index = this.textures.indexOf(toRemove);
        if (index !== -1) {
            this.textures.splice(index, 1);
        }
        this.onTextureRemovedObservable.notifyObservers(toRemove);
        return index;
    };
    /**
     * Adds the given light to this scene
     * @param newLight The light to add
     */
    Scene.prototype.addLight = function (newLight) {
        if (this._blockEntityCollection) {
            return;
        }
        this.lights.push(newLight);
        this.sortLightsByPriority();
        if (!newLight.parent) {
            newLight._addToSceneRootNodes();
        }
        // Add light to all meshes (To support if the light is removed and then re-added)
        for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
            var mesh = _a[_i];
            if (mesh.lightSources.indexOf(newLight) === -1) {
                mesh.lightSources.push(newLight);
                mesh._resyncLightSources();
            }
        }
        this.onNewLightAddedObservable.notifyObservers(newLight);
    };
    /**
     * Sorts the list list based on light priorities
     */
    Scene.prototype.sortLightsByPriority = function () {
        if (this.requireLightSorting) {
            this.lights.sort(LightConstants.CompareLightsPriority);
        }
    };
    /**
     * Adds the given camera to this scene
     * @param newCamera The camera to add
     */
    Scene.prototype.addCamera = function (newCamera) {
        if (this._blockEntityCollection) {
            return;
        }
        this.cameras.push(newCamera);
        this.onNewCameraAddedObservable.notifyObservers(newCamera);
        if (!newCamera.parent) {
            newCamera._addToSceneRootNodes();
        }
    };
    /**
     * Adds the given skeleton to this scene
     * @param newSkeleton The skeleton to add
     */
    Scene.prototype.addSkeleton = function (newSkeleton) {
        if (this._blockEntityCollection) {
            return;
        }
        this.skeletons.push(newSkeleton);
        this.onNewSkeletonAddedObservable.notifyObservers(newSkeleton);
    };
    /**
     * Adds the given particle system to this scene
     * @param newParticleSystem The particle system to add
     */
    Scene.prototype.addParticleSystem = function (newParticleSystem) {
        if (this._blockEntityCollection) {
            return;
        }
        this.particleSystems.push(newParticleSystem);
    };
    /**
     * Adds the given animation to this scene
     * @param newAnimation The animation to add
     */
    Scene.prototype.addAnimation = function (newAnimation) {
        if (this._blockEntityCollection) {
            return;
        }
        this.animations.push(newAnimation);
    };
    /**
     * Adds the given animation group to this scene.
     * @param newAnimationGroup The animation group to add
     */
    Scene.prototype.addAnimationGroup = function (newAnimationGroup) {
        if (this._blockEntityCollection) {
            return;
        }
        this.animationGroups.push(newAnimationGroup);
    };
    /**
     * Adds the given multi-material to this scene
     * @param newMultiMaterial The multi-material to add
     */
    Scene.prototype.addMultiMaterial = function (newMultiMaterial) {
        if (this._blockEntityCollection) {
            return;
        }
        this.multiMaterials.push(newMultiMaterial);
        this.onNewMultiMaterialAddedObservable.notifyObservers(newMultiMaterial);
    };
    /**
     * Adds the given material to this scene
     * @param newMaterial The material to add
     */
    Scene.prototype.addMaterial = function (newMaterial) {
        if (this._blockEntityCollection) {
            return;
        }
        if (newMaterial.getScene() === this && newMaterial._indexInSceneMaterialArray !== -1) {
            // Already there??
            return;
        }
        newMaterial._indexInSceneMaterialArray = this.materials.length;
        this.materials.push(newMaterial);
        this.onNewMaterialAddedObservable.notifyObservers(newMaterial);
    };
    /**
     * Adds the given morph target to this scene
     * @param newMorphTargetManager The morph target to add
     */
    Scene.prototype.addMorphTargetManager = function (newMorphTargetManager) {
        if (this._blockEntityCollection) {
            return;
        }
        this.morphTargetManagers.push(newMorphTargetManager);
    };
    /**
     * Adds the given geometry to this scene
     * @param newGeometry The geometry to add
     */
    Scene.prototype.addGeometry = function (newGeometry) {
        if (this._blockEntityCollection) {
            return;
        }
        if (this._geometriesByUniqueId) {
            this._geometriesByUniqueId[newGeometry.uniqueId] = this.geometries.length;
        }
        this.geometries.push(newGeometry);
    };
    /**
     * Adds the given action manager to this scene
     * @deprecated
     * @param newActionManager The action manager to add
     */
    Scene.prototype.addActionManager = function (newActionManager) {
        this.actionManagers.push(newActionManager);
    };
    /**
     * Adds the given texture to this scene.
     * @param newTexture The texture to add
     */
    Scene.prototype.addTexture = function (newTexture) {
        if (this._blockEntityCollection) {
            return;
        }
        this.textures.push(newTexture);
        this.onNewTextureAddedObservable.notifyObservers(newTexture);
    };
    /**
     * Switch active camera
     * @param newCamera defines the new active camera
     * @param attachControl defines if attachControl must be called for the new active camera (default: true)
     */
    Scene.prototype.switchActiveCamera = function (newCamera, attachControl) {
        if (attachControl === void 0) { attachControl = true; }
        var canvas = this._engine.getInputElement();
        if (!canvas) {
            return;
        }
        if (this.activeCamera) {
            this.activeCamera.detachControl();
        }
        this.activeCamera = newCamera;
        if (attachControl) {
            newCamera.attachControl();
        }
    };
    /**
     * sets the active camera of the scene using its Id
     * @param id defines the camera's Id
     * @return the new active camera or null if none found.
     */
    Scene.prototype.setActiveCameraById = function (id) {
        var camera = this.getCameraById(id);
        if (camera) {
            this.activeCamera = camera;
            return camera;
        }
        return null;
    };
    /**
     * sets the active camera of the scene using its name
     * @param name defines the camera's name
     * @returns the new active camera or null if none found.
     */
    Scene.prototype.setActiveCameraByName = function (name) {
        var camera = this.getCameraByName(name);
        if (camera) {
            this.activeCamera = camera;
            return camera;
        }
        return null;
    };
    /**
     * get an animation group using its name
     * @param name defines the material's name
     * @return the animation group or null if none found.
     */
    Scene.prototype.getAnimationGroupByName = function (name) {
        for (var index = 0; index < this.animationGroups.length; index++) {
            if (this.animationGroups[index].name === name) {
                return this.animationGroups[index];
            }
        }
        return null;
    };
    /**
     * Get a material using its unique id
     * @param uniqueId defines the material's unique id
     * @return the material or null if none found.
     */
    Scene.prototype.getMaterialByUniqueID = function (uniqueId) {
        for (var index = 0; index < this.materials.length; index++) {
            if (this.materials[index].uniqueId === uniqueId) {
                return this.materials[index];
            }
        }
        return null;
    };
    /**
     * get a material using its id
     * @param id defines the material's Id
     * @return the material or null if none found.
     */
    Scene.prototype.getMaterialById = function (id) {
        for (var index = 0; index < this.materials.length; index++) {
            if (this.materials[index].id === id) {
                return this.materials[index];
            }
        }
        return null;
    };
    /**
     * Gets a the last added material using a given id
     * @param id defines the material's Id
     * @param allowMultiMaterials determines whether multimaterials should be considered
     * @return the last material with the given id or null if none found.
     */
    Scene.prototype.getLastMaterialById = function (id, allowMultiMaterials) {
        if (allowMultiMaterials === void 0) { allowMultiMaterials = false; }
        for (var index = this.materials.length - 1; index >= 0; index--) {
            if (this.materials[index].id === id) {
                return this.materials[index];
            }
        }
        if (allowMultiMaterials) {
            for (var index = this.multiMaterials.length - 1; index >= 0; index--) {
                if (this.multiMaterials[index].id === id) {
                    return this.multiMaterials[index];
                }
            }
        }
        return null;
    };
    /**
     * Gets a material using its name
     * @param name defines the material's name
     * @return the material or null if none found.
     */
    Scene.prototype.getMaterialByName = function (name) {
        for (var index = 0; index < this.materials.length; index++) {
            if (this.materials[index].name === name) {
                return this.materials[index];
            }
        }
        return null;
    };
    /**
     * Get a texture using its unique id
     * @param uniqueId defines the texture's unique id
     * @return the texture or null if none found.
     */
    Scene.prototype.getTextureByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.textures.length; index++) {
            if (this.textures[index].uniqueId === uniqueId) {
                return this.textures[index];
            }
        }
        return null;
    };
    /**
     * Gets a texture using its name
     * @param name defines the texture's name
     * @return the texture or null if none found.
     */
    Scene.prototype.getTextureByName = function (name) {
        for (var index = 0; index < this.textures.length; index++) {
            if (this.textures[index].name === name) {
                return this.textures[index];
            }
        }
        return null;
    };
    /**
     * Gets a camera using its Id
     * @param id defines the Id to look for
     * @returns the camera or null if not found
     */
    Scene.prototype.getCameraById = function (id) {
        for (var index = 0; index < this.cameras.length; index++) {
            if (this.cameras[index].id === id) {
                return this.cameras[index];
            }
        }
        return null;
    };
    /**
     * Gets a camera using its unique Id
     * @param uniqueId defines the unique Id to look for
     * @returns the camera or null if not found
     */
    Scene.prototype.getCameraByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.cameras.length; index++) {
            if (this.cameras[index].uniqueId === uniqueId) {
                return this.cameras[index];
            }
        }
        return null;
    };
    /**
     * Gets a camera using its name
     * @param name defines the camera's name
     * @return the camera or null if none found.
     */
    Scene.prototype.getCameraByName = function (name) {
        for (var index = 0; index < this.cameras.length; index++) {
            if (this.cameras[index].name === name) {
                return this.cameras[index];
            }
        }
        return null;
    };
    /**
     * Gets a bone using its Id
     * @param id defines the bone's Id
     * @return the bone or null if not found
     */
    Scene.prototype.getBoneById = function (id) {
        for (var skeletonIndex = 0; skeletonIndex < this.skeletons.length; skeletonIndex++) {
            var skeleton = this.skeletons[skeletonIndex];
            for (var boneIndex = 0; boneIndex < skeleton.bones.length; boneIndex++) {
                if (skeleton.bones[boneIndex].id === id) {
                    return skeleton.bones[boneIndex];
                }
            }
        }
        return null;
    };
    /**
     * Gets a bone using its id
     * @param name defines the bone's name
     * @return the bone or null if not found
     */
    Scene.prototype.getBoneByName = function (name) {
        for (var skeletonIndex = 0; skeletonIndex < this.skeletons.length; skeletonIndex++) {
            var skeleton = this.skeletons[skeletonIndex];
            for (var boneIndex = 0; boneIndex < skeleton.bones.length; boneIndex++) {
                if (skeleton.bones[boneIndex].name === name) {
                    return skeleton.bones[boneIndex];
                }
            }
        }
        return null;
    };
    /**
     * Gets a light node using its name
     * @param name defines the the light's name
     * @return the light or null if none found.
     */
    Scene.prototype.getLightByName = function (name) {
        for (var index = 0; index < this.lights.length; index++) {
            if (this.lights[index].name === name) {
                return this.lights[index];
            }
        }
        return null;
    };
    /**
     * Gets a light node using its Id
     * @param id defines the light's Id
     * @return the light or null if none found.
     */
    Scene.prototype.getLightById = function (id) {
        for (var index = 0; index < this.lights.length; index++) {
            if (this.lights[index].id === id) {
                return this.lights[index];
            }
        }
        return null;
    };
    /**
     * Gets a light node using its scene-generated unique Id
     * @param uniqueId defines the light's unique Id
     * @return the light or null if none found.
     */
    Scene.prototype.getLightByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.lights.length; index++) {
            if (this.lights[index].uniqueId === uniqueId) {
                return this.lights[index];
            }
        }
        return null;
    };
    /**
     * Gets a particle system by Id
     * @param id defines the particle system Id
     * @return the corresponding system or null if none found
     */
    Scene.prototype.getParticleSystemById = function (id) {
        for (var index = 0; index < this.particleSystems.length; index++) {
            if (this.particleSystems[index].id === id) {
                return this.particleSystems[index];
            }
        }
        return null;
    };
    /**
     * Gets a geometry using its Id
     * @param id defines the geometry's Id
     * @return the geometry or null if none found.
     */
    Scene.prototype.getGeometryById = function (id) {
        for (var index = 0; index < this.geometries.length; index++) {
            if (this.geometries[index].id === id) {
                return this.geometries[index];
            }
        }
        return null;
    };
    Scene.prototype._getGeometryByUniqueId = function (uniqueId) {
        if (this._geometriesByUniqueId) {
            var index = this._geometriesByUniqueId[uniqueId];
            if (index !== undefined) {
                return this.geometries[index];
            }
        }
        else {
            for (var index = 0; index < this.geometries.length; index++) {
                if (this.geometries[index].uniqueId === uniqueId) {
                    return this.geometries[index];
                }
            }
        }
        return null;
    };
    /**
     * Add a new geometry to this scene
     * @param geometry defines the geometry to be added to the scene.
     * @param force defines if the geometry must be pushed even if a geometry with this id already exists
     * @return a boolean defining if the geometry was added or not
     */
    Scene.prototype.pushGeometry = function (geometry, force) {
        if (!force && this._getGeometryByUniqueId(geometry.uniqueId)) {
            return false;
        }
        this.addGeometry(geometry);
        this.onNewGeometryAddedObservable.notifyObservers(geometry);
        return true;
    };
    /**
     * Removes an existing geometry
     * @param geometry defines the geometry to be removed from the scene
     * @return a boolean defining if the geometry was removed or not
     */
    Scene.prototype.removeGeometry = function (geometry) {
        var index;
        if (this._geometriesByUniqueId) {
            index = this._geometriesByUniqueId[geometry.uniqueId];
            if (index === undefined) {
                return false;
            }
        }
        else {
            index = this.geometries.indexOf(geometry);
            if (index < 0) {
                return false;
            }
        }
        if (index !== this.geometries.length - 1) {
            var lastGeometry = this.geometries[this.geometries.length - 1];
            if (lastGeometry) {
                this.geometries[index] = lastGeometry;
                if (this._geometriesByUniqueId) {
                    this._geometriesByUniqueId[lastGeometry.uniqueId] = index;
                    this._geometriesByUniqueId[geometry.uniqueId] = undefined;
                }
            }
        }
        this.geometries.pop();
        this.onGeometryRemovedObservable.notifyObservers(geometry);
        return true;
    };
    /**
     * Gets the list of geometries attached to the scene
     * @returns an array of Geometry
     */
    Scene.prototype.getGeometries = function () {
        return this.geometries;
    };
    /**
     * Gets the first added mesh found of a given Id
     * @param id defines the Id to search for
     * @return the mesh found or null if not found at all
     */
    Scene.prototype.getMeshById = function (id) {
        for (var index = 0; index < this.meshes.length; index++) {
            if (this.meshes[index].id === id) {
                return this.meshes[index];
            }
        }
        return null;
    };
    /**
     * Gets a list of meshes using their Id
     * @param id defines the Id to search for
     * @returns a list of meshes
     */
    Scene.prototype.getMeshesById = function (id) {
        return this.meshes.filter(function (m) {
            return m.id === id;
        });
    };
    /**
     * Gets the first added transform node found of a given Id
     * @param id defines the Id to search for
     * @return the found transform node or null if not found at all.
     */
    Scene.prototype.getTransformNodeById = function (id) {
        for (var index = 0; index < this.transformNodes.length; index++) {
            if (this.transformNodes[index].id === id) {
                return this.transformNodes[index];
            }
        }
        return null;
    };
    /**
     * Gets a transform node with its auto-generated unique Id
     * @param uniqueId defines the unique Id to search for
     * @return the found transform node or null if not found at all.
     */
    Scene.prototype.getTransformNodeByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.transformNodes.length; index++) {
            if (this.transformNodes[index].uniqueId === uniqueId) {
                return this.transformNodes[index];
            }
        }
        return null;
    };
    /**
     * Gets a list of transform nodes using their Id
     * @param id defines the Id to search for
     * @returns a list of transform nodes
     */
    Scene.prototype.getTransformNodesById = function (id) {
        return this.transformNodes.filter(function (m) {
            return m.id === id;
        });
    };
    /**
     * Gets a mesh with its auto-generated unique Id
     * @param uniqueId defines the unique Id to search for
     * @return the found mesh or null if not found at all.
     */
    Scene.prototype.getMeshByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.meshes.length; index++) {
            if (this.meshes[index].uniqueId === uniqueId) {
                return this.meshes[index];
            }
        }
        return null;
    };
    /**
     * Gets a the last added mesh using a given Id
     * @param id defines the Id to search for
     * @return the found mesh or null if not found at all.
     */
    Scene.prototype.getLastMeshById = function (id) {
        for (var index = this.meshes.length - 1; index >= 0; index--) {
            if (this.meshes[index].id === id) {
                return this.meshes[index];
            }
        }
        return null;
    };
    /**
     * Gets a the last added node (Mesh, Camera, Light) using a given Id
     * @param id defines the Id to search for
     * @return the found node or null if not found at all
     */
    Scene.prototype.getLastEntryById = function (id) {
        var index;
        for (index = this.meshes.length - 1; index >= 0; index--) {
            if (this.meshes[index].id === id) {
                return this.meshes[index];
            }
        }
        for (index = this.transformNodes.length - 1; index >= 0; index--) {
            if (this.transformNodes[index].id === id) {
                return this.transformNodes[index];
            }
        }
        for (index = this.cameras.length - 1; index >= 0; index--) {
            if (this.cameras[index].id === id) {
                return this.cameras[index];
            }
        }
        for (index = this.lights.length - 1; index >= 0; index--) {
            if (this.lights[index].id === id) {
                return this.lights[index];
            }
        }
        return null;
    };
    /**
     * Gets a node (Mesh, Camera, Light) using a given Id
     * @param id defines the Id to search for
     * @return the found node or null if not found at all
     */
    Scene.prototype.getNodeById = function (id) {
        var mesh = this.getMeshById(id);
        if (mesh) {
            return mesh;
        }
        var transformNode = this.getTransformNodeById(id);
        if (transformNode) {
            return transformNode;
        }
        var light = this.getLightById(id);
        if (light) {
            return light;
        }
        var camera = this.getCameraById(id);
        if (camera) {
            return camera;
        }
        var bone = this.getBoneById(id);
        if (bone) {
            return bone;
        }
        return null;
    };
    /**
     * Gets a node (Mesh, Camera, Light) using a given name
     * @param name defines the name to search for
     * @return the found node or null if not found at all.
     */
    Scene.prototype.getNodeByName = function (name) {
        var mesh = this.getMeshByName(name);
        if (mesh) {
            return mesh;
        }
        var transformNode = this.getTransformNodeByName(name);
        if (transformNode) {
            return transformNode;
        }
        var light = this.getLightByName(name);
        if (light) {
            return light;
        }
        var camera = this.getCameraByName(name);
        if (camera) {
            return camera;
        }
        var bone = this.getBoneByName(name);
        if (bone) {
            return bone;
        }
        return null;
    };
    /**
     * Gets a mesh using a given name
     * @param name defines the name to search for
     * @return the found mesh or null if not found at all.
     */
    Scene.prototype.getMeshByName = function (name) {
        for (var index = 0; index < this.meshes.length; index++) {
            if (this.meshes[index].name === name) {
                return this.meshes[index];
            }
        }
        return null;
    };
    /**
     * Gets a transform node using a given name
     * @param name defines the name to search for
     * @return the found transform node or null if not found at all.
     */
    Scene.prototype.getTransformNodeByName = function (name) {
        for (var index = 0; index < this.transformNodes.length; index++) {
            if (this.transformNodes[index].name === name) {
                return this.transformNodes[index];
            }
        }
        return null;
    };
    /**
     * Gets a skeleton using a given Id (if many are found, this function will pick the last one)
     * @param id defines the Id to search for
     * @return the found skeleton or null if not found at all.
     */
    Scene.prototype.getLastSkeletonById = function (id) {
        for (var index = this.skeletons.length - 1; index >= 0; index--) {
            if (this.skeletons[index].id === id) {
                return this.skeletons[index];
            }
        }
        return null;
    };
    /**
     * Gets a skeleton using a given auto generated unique id
     * @param  uniqueId defines the unique id to search for
     * @return the found skeleton or null if not found at all.
     */
    Scene.prototype.getSkeletonByUniqueId = function (uniqueId) {
        for (var index = 0; index < this.skeletons.length; index++) {
            if (this.skeletons[index].uniqueId === uniqueId) {
                return this.skeletons[index];
            }
        }
        return null;
    };
    /**
     * Gets a skeleton using a given id (if many are found, this function will pick the first one)
     * @param id defines the id to search for
     * @return the found skeleton or null if not found at all.
     */
    Scene.prototype.getSkeletonById = function (id) {
        for (var index = 0; index < this.skeletons.length; index++) {
            if (this.skeletons[index].id === id) {
                return this.skeletons[index];
            }
        }
        return null;
    };
    /**
     * Gets a skeleton using a given name
     * @param name defines the name to search for
     * @return the found skeleton or null if not found at all.
     */
    Scene.prototype.getSkeletonByName = function (name) {
        for (var index = 0; index < this.skeletons.length; index++) {
            if (this.skeletons[index].name === name) {
                return this.skeletons[index];
            }
        }
        return null;
    };
    /**
     * Gets a morph target manager  using a given id (if many are found, this function will pick the last one)
     * @param id defines the id to search for
     * @return the found morph target manager or null if not found at all.
     */
    Scene.prototype.getMorphTargetManagerById = function (id) {
        for (var index = 0; index < this.morphTargetManagers.length; index++) {
            if (this.morphTargetManagers[index].uniqueId === id) {
                return this.morphTargetManagers[index];
            }
        }
        return null;
    };
    /**
     * Gets a morph target using a given id (if many are found, this function will pick the first one)
     * @param id defines the id to search for
     * @return the found morph target or null if not found at all.
     */
    Scene.prototype.getMorphTargetById = function (id) {
        for (var managerIndex = 0; managerIndex < this.morphTargetManagers.length; ++managerIndex) {
            var morphTargetManager = this.morphTargetManagers[managerIndex];
            for (var index = 0; index < morphTargetManager.numTargets; ++index) {
                var target = morphTargetManager.getTarget(index);
                if (target.id === id) {
                    return target;
                }
            }
        }
        return null;
    };
    /**
     * Gets a morph target using a given name (if many are found, this function will pick the first one)
     * @param name defines the name to search for
     * @return the found morph target or null if not found at all.
     */
    Scene.prototype.getMorphTargetByName = function (name) {
        for (var managerIndex = 0; managerIndex < this.morphTargetManagers.length; ++managerIndex) {
            var morphTargetManager = this.morphTargetManagers[managerIndex];
            for (var index = 0; index < morphTargetManager.numTargets; ++index) {
                var target = morphTargetManager.getTarget(index);
                if (target.name === name) {
                    return target;
                }
            }
        }
        return null;
    };
    /**
     * Gets a post process using a given name (if many are found, this function will pick the first one)
     * @param name defines the name to search for
     * @return the found post process or null if not found at all.
     */
    Scene.prototype.getPostProcessByName = function (name) {
        for (var postProcessIndex = 0; postProcessIndex < this.postProcesses.length; ++postProcessIndex) {
            var postProcess = this.postProcesses[postProcessIndex];
            if (postProcess.name === name) {
                return postProcess;
            }
        }
        return null;
    };
    /**
     * Gets a boolean indicating if the given mesh is active
     * @param mesh defines the mesh to look for
     * @returns true if the mesh is in the active list
     */
    Scene.prototype.isActiveMesh = function (mesh) {
        return this._activeMeshes.indexOf(mesh) !== -1;
    };
    Object.defineProperty(Scene.prototype, "uid", {
        /**
         * Return a unique id as a string which can serve as an identifier for the scene
         */
        get: function () {
            if (!this._uid) {
                this._uid = Tools.RandomId();
            }
            return this._uid;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add an externally attached data from its key.
     * This method call will fail and return false, if such key already exists.
     * If you don't care and just want to get the data no matter what, use the more convenient getOrAddExternalDataWithFactory() method.
     * @param key the unique key that identifies the data
     * @param data the data object to associate to the key for this Engine instance
     * @return true if no such key were already present and the data was added successfully, false otherwise
     */
    Scene.prototype.addExternalData = function (key, data) {
        if (!this._externalData) {
            this._externalData = new StringDictionary();
        }
        return this._externalData.add(key, data);
    };
    /**
     * Get an externally attached data from its key
     * @param key the unique key that identifies the data
     * @return the associated data, if present (can be null), or undefined if not present
     */
    Scene.prototype.getExternalData = function (key) {
        if (!this._externalData) {
            return null;
        }
        return this._externalData.get(key);
    };
    /**
     * Get an externally attached data from its key, create it using a factory if it's not already present
     * @param key the unique key that identifies the data
     * @param factory the factory that will be called to create the instance if and only if it doesn't exists
     * @return the associated data, can be null if the factory returned null.
     */
    Scene.prototype.getOrAddExternalDataWithFactory = function (key, factory) {
        if (!this._externalData) {
            this._externalData = new StringDictionary();
        }
        return this._externalData.getOrAddWithFactory(key, factory);
    };
    /**
     * Remove an externally attached data from the Engine instance
     * @param key the unique key that identifies the data
     * @return true if the data was successfully removed, false if it doesn't exist
     */
    Scene.prototype.removeExternalData = function (key) {
        return this._externalData.remove(key);
    };
    Scene.prototype._evaluateSubMesh = function (subMesh, mesh, initialMesh) {
        if (initialMesh.hasInstances ||
            initialMesh.isAnInstance ||
            this.dispatchAllSubMeshesOfActiveMeshes ||
            this._skipFrustumClipping ||
            mesh.alwaysSelectAsActiveMesh ||
            mesh.subMeshes.length === 1 ||
            subMesh.isInFrustum(this._frustumPlanes)) {
            for (var _i = 0, _a = this._evaluateSubMeshStage; _i < _a.length; _i++) {
                var step = _a[_i];
                step.action(mesh, subMesh);
            }
            var material = subMesh.getMaterial();
            if (material !== null && material !== undefined) {
                // Render targets
                if (material.hasRenderTargetTextures && material.getRenderTargetTextures != null) {
                    if (this._processedMaterials.indexOf(material) === -1) {
                        this._processedMaterials.push(material);
                        this._materialsRenderTargets.concatWithNoDuplicate(material.getRenderTargetTextures());
                    }
                }
                // Dispatch
                this._renderingManager.dispatch(subMesh, mesh, material);
            }
        }
    };
    /**
     * Clear the processed materials smart array preventing retention point in material dispose.
     */
    Scene.prototype.freeProcessedMaterials = function () {
        this._processedMaterials.dispose();
    };
    Object.defineProperty(Scene.prototype, "blockfreeActiveMeshesAndRenderingGroups", {
        /** Gets or sets a boolean blocking all the calls to freeActiveMeshes and freeRenderingGroups
         * It can be used in order to prevent going through methods freeRenderingGroups and freeActiveMeshes several times to improve performance
         * when disposing several meshes in a row or a hierarchy of meshes.
         * When used, it is the responsibility of the user to blockfreeActiveMeshesAndRenderingGroups back to false.
         */
        get: function () {
            return this._preventFreeActiveMeshesAndRenderingGroups;
        },
        set: function (value) {
            if (this._preventFreeActiveMeshesAndRenderingGroups === value) {
                return;
            }
            if (value) {
                this.freeActiveMeshes();
                this.freeRenderingGroups();
            }
            this._preventFreeActiveMeshesAndRenderingGroups = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clear the active meshes smart array preventing retention point in mesh dispose.
     */
    Scene.prototype.freeActiveMeshes = function () {
        if (this.blockfreeActiveMeshesAndRenderingGroups) {
            return;
        }
        this._activeMeshes.dispose();
        if (this.activeCamera && this.activeCamera._activeMeshes) {
            this.activeCamera._activeMeshes.dispose();
        }
        if (this.activeCameras) {
            for (var i = 0; i < this.activeCameras.length; i++) {
                var activeCamera = this.activeCameras[i];
                if (activeCamera && activeCamera._activeMeshes) {
                    activeCamera._activeMeshes.dispose();
                }
            }
        }
    };
    /**
     * Clear the info related to rendering groups preventing retention points during dispose.
     */
    Scene.prototype.freeRenderingGroups = function () {
        if (this.blockfreeActiveMeshesAndRenderingGroups) {
            return;
        }
        if (this._renderingManager) {
            this._renderingManager.freeRenderingGroups();
        }
        if (this.textures) {
            for (var i = 0; i < this.textures.length; i++) {
                var texture = this.textures[i];
                if (texture && texture.renderList) {
                    texture.freeRenderingGroups();
                }
            }
        }
    };
    /** @hidden */
    Scene.prototype._isInIntermediateRendering = function () {
        return this._intermediateRendering;
    };
    /**
     * Use this function to stop evaluating active meshes. The current list will be keep alive between frames
     * @param skipEvaluateActiveMeshes defines an optional boolean indicating that the evaluate active meshes step must be completely skipped
     * @param onSuccess optional success callback
     * @param onError optional error callback
     * @param freezeMeshes defines if meshes should be frozen (true by default)
     * @param keepFrustumCulling defines if you want to keep running the frustum clipping (false by default)
     * @returns the current scene
     */
    Scene.prototype.freezeActiveMeshes = function (skipEvaluateActiveMeshes, onSuccess, onError, freezeMeshes, keepFrustumCulling) {
        var _this = this;
        if (skipEvaluateActiveMeshes === void 0) { skipEvaluateActiveMeshes = false; }
        if (freezeMeshes === void 0) { freezeMeshes = true; }
        if (keepFrustumCulling === void 0) { keepFrustumCulling = false; }
        this.executeWhenReady(function () {
            if (!_this.activeCamera) {
                onError && onError("No active camera found");
                return;
            }
            if (!_this._frustumPlanes) {
                _this.updateTransformMatrix();
            }
            _this._evaluateActiveMeshes();
            _this._activeMeshesFrozen = true;
            _this._activeMeshesFrozenButKeepClipping = keepFrustumCulling;
            _this._skipEvaluateActiveMeshesCompletely = skipEvaluateActiveMeshes;
            if (freezeMeshes) {
                for (var index = 0; index < _this._activeMeshes.length; index++) {
                    _this._activeMeshes.data[index]._freeze();
                }
            }
            onSuccess && onSuccess();
        });
        return this;
    };
    /**
     * Use this function to restart evaluating active meshes on every frame
     * @returns the current scene
     */
    Scene.prototype.unfreezeActiveMeshes = function () {
        for (var index = 0; index < this.meshes.length; index++) {
            var mesh = this.meshes[index];
            if (mesh._internalAbstractMeshDataInfo) {
                mesh._internalAbstractMeshDataInfo._isActive = false;
            }
        }
        for (var index = 0; index < this._activeMeshes.length; index++) {
            this._activeMeshes.data[index]._unFreeze();
        }
        this._activeMeshesFrozen = false;
        return this;
    };
    Scene.prototype._executeActiveContainerCleanup = function (container) {
        var isInFastMode = this._engine.snapshotRendering && this._engine.snapshotRenderingMode === 1;
        if (!isInFastMode && this._activeMeshesFrozen && this._activeMeshes.length) {
            return; // Do not execute in frozen mode
        }
        // We need to ensure we are not in the rendering loop
        this.onBeforeRenderObservable.addOnce(function () { return container.dispose(); });
    };
    Scene.prototype._evaluateActiveMeshes = function () {
        var _a;
        if (this._engine.snapshotRendering && this._engine.snapshotRenderingMode === 1) {
            if (this._activeMeshes.length > 0) {
                (_a = this.activeCamera) === null || _a === void 0 ? void 0 : _a._activeMeshes.reset();
                this._activeMeshes.reset();
                this._renderingManager.reset();
                this._processedMaterials.reset();
                this._activeParticleSystems.reset();
                this._activeSkeletons.reset();
                this._softwareSkinnedMeshes.reset();
            }
            return;
        }
        if (this._activeMeshesFrozen && this._activeMeshes.length) {
            if (!this._skipEvaluateActiveMeshesCompletely) {
                var len_1 = this._activeMeshes.length;
                for (var i = 0; i < len_1; i++) {
                    var mesh = this._activeMeshes.data[i];
                    mesh.computeWorldMatrix();
                }
            }
            if (this._activeParticleSystems) {
                var psLength = this._activeParticleSystems.length;
                for (var i = 0; i < psLength; i++) {
                    this._activeParticleSystems.data[i].animate();
                }
            }
            return;
        }
        if (!this.activeCamera) {
            return;
        }
        this.onBeforeActiveMeshesEvaluationObservable.notifyObservers(this);
        this.activeCamera._activeMeshes.reset();
        this._activeMeshes.reset();
        this._renderingManager.reset();
        this._processedMaterials.reset();
        this._activeParticleSystems.reset();
        this._activeSkeletons.reset();
        this._softwareSkinnedMeshes.reset();
        this._materialsRenderTargets.reset();
        for (var _i = 0, _b = this._beforeEvaluateActiveMeshStage; _i < _b.length; _i++) {
            var step = _b[_i];
            step.action();
        }
        // Determine mesh candidates
        var meshes = this.getActiveMeshCandidates();
        // Check each mesh
        var len = meshes.length;
        for (var i = 0; i < len; i++) {
            var mesh = meshes.data[i];
            mesh._internalAbstractMeshDataInfo._currentLODIsUpToDate = false;
            if (mesh.isBlocked) {
                continue;
            }
            this._totalVertices.addCount(mesh.getTotalVertices(), false);
            if (!mesh.isReady() || !mesh.isEnabled() || mesh.scaling.hasAZeroComponent) {
                continue;
            }
            mesh.computeWorldMatrix();
            // Intersections
            if (mesh.actionManager && mesh.actionManager.hasSpecificTriggers2(12, 13)) {
                this._meshesForIntersections.pushNoDuplicate(mesh);
            }
            // Switch to current LOD
            var meshToRender = this.customLODSelector ? this.customLODSelector(mesh, this.activeCamera) : mesh.getLOD(this.activeCamera);
            mesh._internalAbstractMeshDataInfo._currentLOD = meshToRender;
            mesh._internalAbstractMeshDataInfo._currentLODIsUpToDate = true;
            if (meshToRender === undefined || meshToRender === null) {
                continue;
            }
            // Compute world matrix if LOD is billboard
            if (meshToRender !== mesh && meshToRender.billboardMode !== 0) {
                meshToRender.computeWorldMatrix();
            }
            mesh._preActivate();
            if (mesh.isVisible &&
                mesh.visibility > 0 &&
                (mesh.layerMask & this.activeCamera.layerMask) !== 0 &&
                (this._skipFrustumClipping || mesh.alwaysSelectAsActiveMesh || mesh.isInFrustum(this._frustumPlanes))) {
                this._activeMeshes.push(mesh);
                this.activeCamera._activeMeshes.push(mesh);
                if (meshToRender !== mesh) {
                    meshToRender._activate(this._renderId, false);
                }
                for (var _c = 0, _d = this._preActiveMeshStage; _c < _d.length; _c++) {
                    var step = _d[_c];
                    step.action(mesh);
                }
                if (mesh._activate(this._renderId, false)) {
                    if (!mesh.isAnInstance) {
                        meshToRender._internalAbstractMeshDataInfo._onlyForInstances = false;
                    }
                    else {
                        if (mesh._internalAbstractMeshDataInfo._actAsRegularMesh) {
                            meshToRender = mesh;
                        }
                    }
                    meshToRender._internalAbstractMeshDataInfo._isActive = true;
                    this._activeMesh(mesh, meshToRender);
                }
                mesh._postActivate();
            }
        }
        this.onAfterActiveMeshesEvaluationObservable.notifyObservers(this);
        // Particle systems
        if (this.particlesEnabled) {
            this.onBeforeParticlesRenderingObservable.notifyObservers(this);
            for (var particleIndex = 0; particleIndex < this.particleSystems.length; particleIndex++) {
                var particleSystem = this.particleSystems[particleIndex];
                if (!particleSystem.isStarted() || !particleSystem.emitter) {
                    continue;
                }
                var emitter = particleSystem.emitter;
                if (!emitter.position || emitter.isEnabled()) {
                    this._activeParticleSystems.push(particleSystem);
                    particleSystem.animate();
                    this._renderingManager.dispatchParticles(particleSystem);
                }
            }
            this.onAfterParticlesRenderingObservable.notifyObservers(this);
        }
    };
    Scene.prototype._activeMesh = function (sourceMesh, mesh) {
        if (this._skeletonsEnabled && mesh.skeleton !== null && mesh.skeleton !== undefined) {
            if (this._activeSkeletons.pushNoDuplicate(mesh.skeleton)) {
                mesh.skeleton.prepare();
                this._activeBones.addCount(mesh.skeleton.bones.length, false);
            }
            if (!mesh.computeBonesUsingShaders) {
                this._softwareSkinnedMeshes.pushNoDuplicate(mesh);
            }
        }
        if (mesh && mesh.subMeshes && mesh.subMeshes.length > 0) {
            var subMeshes = this.getActiveSubMeshCandidates(mesh);
            var len = subMeshes.length;
            for (var i = 0; i < len; i++) {
                var subMesh = subMeshes.data[i];
                this._evaluateSubMesh(subMesh, mesh, sourceMesh);
            }
        }
    };
    /**
     * Update the transform matrix to update from the current active camera
     * @param force defines a boolean used to force the update even if cache is up to date
     */
    Scene.prototype.updateTransformMatrix = function (force) {
        if (!this.activeCamera) {
            return;
        }
        if (this.activeCamera._renderingMultiview) {
            var leftCamera = this.activeCamera._rigCameras[0];
            var rightCamera = this.activeCamera._rigCameras[1];
            this.setTransformMatrix(leftCamera.getViewMatrix(), leftCamera.getProjectionMatrix(force), rightCamera.getViewMatrix(), rightCamera.getProjectionMatrix(force));
        }
        else {
            this.setTransformMatrix(this.activeCamera.getViewMatrix(), this.activeCamera.getProjectionMatrix(force));
        }
    };
    Scene.prototype._bindFrameBuffer = function (camera, clear) {
        if (clear === void 0) { clear = true; }
        if (camera && camera._multiviewTexture) {
            camera._multiviewTexture._bindFrameBuffer();
        }
        else if (camera && camera.outputRenderTarget) {
            camera.outputRenderTarget._bindFrameBuffer();
        }
        else {
            if (!this._engine._currentFrameBufferIsDefaultFrameBuffer()) {
                this._engine.restoreDefaultFramebuffer();
            }
        }
        if (clear) {
            this._clearFrameBuffer(camera);
        }
    };
    Scene.prototype._clearFrameBuffer = function (camera) {
        // we assume the framebuffer currently bound is the right one
        if (camera && camera._multiviewTexture) ;
        else if (camera && camera.outputRenderTarget) {
            var rtt = camera.outputRenderTarget;
            if (rtt.onClearObservable.hasObservers()) {
                rtt.onClearObservable.notifyObservers(this._engine);
            }
            else if (!rtt.skipInitialClear) {
                this._engine.clear(rtt.clearColor || this.clearColor, !rtt._cleared, true, true);
                rtt._cleared = true;
            }
        }
        else {
            if (!this._defaultFrameBufferCleared) {
                this._defaultFrameBufferCleared = true;
                this._clear();
            }
            else {
                this._engine.clear(null, false, true, true);
            }
        }
    };
    /**
     * @param camera
     * @param rigParent
     * @param bindFrameBuffer
     * @hidden
     */
    Scene.prototype._renderForCamera = function (camera, rigParent, bindFrameBuffer) {
        var _a, _b, _c;
        if (bindFrameBuffer === void 0) { bindFrameBuffer = true; }
        if (camera && camera._skipRendering) {
            return;
        }
        var engine = this._engine;
        // Use _activeCamera instead of activeCamera to avoid onActiveCameraChanged
        this._activeCamera = camera;
        if (!this.activeCamera) {
            throw new Error("Active camera not set");
        }
        // Viewport
        engine.setViewport(this.activeCamera.viewport);
        // Camera
        this.resetCachedMaterial();
        this._renderId++;
        if (!this.prePass && bindFrameBuffer) {
            var skipInitialClear = true;
            if (camera._renderingMultiview && camera.outputRenderTarget) {
                skipInitialClear = camera.outputRenderTarget.skipInitialClear;
                if (this.autoClear) {
                    camera.outputRenderTarget.skipInitialClear = false;
                }
            }
            this._bindFrameBuffer(this._activeCamera);
            if (camera._renderingMultiview && camera.outputRenderTarget) {
                camera.outputRenderTarget.skipInitialClear = skipInitialClear;
            }
        }
        this.updateTransformMatrix();
        this.onBeforeCameraRenderObservable.notifyObservers(this.activeCamera);
        // Meshes
        this._evaluateActiveMeshes();
        // Software skinning
        for (var softwareSkinnedMeshIndex = 0; softwareSkinnedMeshIndex < this._softwareSkinnedMeshes.length; softwareSkinnedMeshIndex++) {
            var mesh = this._softwareSkinnedMeshes.data[softwareSkinnedMeshIndex];
            mesh.applySkeleton(mesh.skeleton);
        }
        // Render targets
        this.onBeforeRenderTargetsRenderObservable.notifyObservers(this);
        this._renderTargets.concatWithNoDuplicate(this._materialsRenderTargets);
        if (camera.customRenderTargets && camera.customRenderTargets.length > 0) {
            this._renderTargets.concatWithNoDuplicate(camera.customRenderTargets);
        }
        if (rigParent && rigParent.customRenderTargets && rigParent.customRenderTargets.length > 0) {
            this._renderTargets.concatWithNoDuplicate(rigParent.customRenderTargets);
        }
        if (this.environmentTexture && this.environmentTexture.isRenderTarget) {
            this._renderTargets.pushNoDuplicate(this.environmentTexture);
        }
        // Collects render targets from external components.
        for (var _i = 0, _d = this._gatherActiveCameraRenderTargetsStage; _i < _d.length; _i++) {
            var step = _d[_i];
            step.action(this._renderTargets);
        }
        var needRebind = false;
        if (this.renderTargetsEnabled) {
            this._intermediateRendering = true;
            if (this._renderTargets.length > 0) {
                Tools.StartPerformanceCounter("Render targets", this._renderTargets.length > 0);
                for (var renderIndex = 0; renderIndex < this._renderTargets.length; renderIndex++) {
                    var renderTarget = this._renderTargets.data[renderIndex];
                    if (renderTarget._shouldRender()) {
                        this._renderId++;
                        var hasSpecialRenderTargetCamera = renderTarget.activeCamera && renderTarget.activeCamera !== this.activeCamera;
                        renderTarget.render(hasSpecialRenderTargetCamera, this.dumpNextRenderTargets);
                        needRebind = true;
                    }
                }
                Tools.EndPerformanceCounter("Render targets", this._renderTargets.length > 0);
                this._renderId++;
            }
            for (var _e = 0, _f = this._cameraDrawRenderTargetStage; _e < _f.length; _e++) {
                var step = _f[_e];
                needRebind = step.action(this.activeCamera) || needRebind;
            }
            this._intermediateRendering = false;
        }
        this._engine.currentRenderPassId = (_c = (_b = (_a = camera.outputRenderTarget) === null || _a === void 0 ? void 0 : _a.renderPassId) !== null && _b !== void 0 ? _b : camera.renderPassId) !== null && _c !== void 0 ? _c : 0;
        // Restore framebuffer after rendering to targets
        if (needRebind && !this.prePass) {
            this._bindFrameBuffer(this._activeCamera, false);
        }
        this.onAfterRenderTargetsRenderObservable.notifyObservers(this);
        // Prepare Frame
        if (this.postProcessManager && !camera._multiviewTexture && !this.prePass) {
            this.postProcessManager._prepareFrame();
        }
        // Before Camera Draw
        for (var _g = 0, _h = this._beforeCameraDrawStage; _g < _h.length; _g++) {
            var step = _h[_g];
            step.action(this.activeCamera);
        }
        // Render
        this.onBeforeDrawPhaseObservable.notifyObservers(this);
        if (engine.snapshotRendering && engine.snapshotRenderingMode === 1) {
            this.finalizeSceneUbo();
        }
        this._renderingManager.render(null, null, true, true);
        this.onAfterDrawPhaseObservable.notifyObservers(this);
        // After Camera Draw
        for (var _j = 0, _k = this._afterCameraDrawStage; _j < _k.length; _j++) {
            var step = _k[_j];
            step.action(this.activeCamera);
        }
        // Finalize frame
        if (this.postProcessManager && !camera._multiviewTexture) {
            // if the camera has an output render target, render the post process to the render target
            var texture = camera.outputRenderTarget ? camera.outputRenderTarget.renderTarget : undefined;
            this.postProcessManager._finalizeFrame(camera.isIntermediate, texture);
        }
        // Reset some special arrays
        this._renderTargets.reset();
        this.onAfterCameraRenderObservable.notifyObservers(this.activeCamera);
    };
    Scene.prototype._processSubCameras = function (camera, bindFrameBuffer) {
        if (bindFrameBuffer === void 0) { bindFrameBuffer = true; }
        if (camera.cameraRigMode === 0 || camera._renderingMultiview) {
            if (camera._renderingMultiview && !this._multiviewSceneUbo) {
                this._createMultiviewUbo();
            }
            this._renderForCamera(camera, undefined, bindFrameBuffer);
            this.onAfterRenderCameraObservable.notifyObservers(camera);
            return;
        }
        if (camera._useMultiviewToSingleView) {
            this._renderMultiviewToSingleView(camera);
        }
        else {
            // rig cameras
            this.onBeforeCameraRenderObservable.notifyObservers(camera);
            for (var index = 0; index < camera._rigCameras.length; index++) {
                this._renderForCamera(camera._rigCameras[index], camera);
            }
        }
        // Use _activeCamera instead of activeCamera to avoid onActiveCameraChanged
        this._activeCamera = camera;
        this.updateTransformMatrix();
        this.onAfterRenderCameraObservable.notifyObservers(camera);
    };
    Scene.prototype._checkIntersections = function () {
        for (var index = 0; index < this._meshesForIntersections.length; index++) {
            var sourceMesh = this._meshesForIntersections.data[index];
            if (!sourceMesh.actionManager) {
                continue;
            }
            var _loop_1 = function (actionIndex) {
                var action = sourceMesh.actionManager.actions[actionIndex];
                if (action.trigger === 12 || action.trigger === 13) {
                    var parameters = action.getTriggerParameter();
                    var otherMesh_1 = parameters.mesh ? parameters.mesh : parameters;
                    var areIntersecting = otherMesh_1.intersectsMesh(sourceMesh, parameters.usePreciseIntersection);
                    var currentIntersectionInProgress = sourceMesh._intersectionsInProgress.indexOf(otherMesh_1);
                    if (areIntersecting && currentIntersectionInProgress === -1) {
                        if (action.trigger === 12) {
                            action._executeCurrent(ActionEvent.CreateNew(sourceMesh, undefined, otherMesh_1));
                            sourceMesh._intersectionsInProgress.push(otherMesh_1);
                        }
                        else if (action.trigger === 13) {
                            sourceMesh._intersectionsInProgress.push(otherMesh_1);
                        }
                    }
                    else if (!areIntersecting && currentIntersectionInProgress > -1) {
                        //They intersected, and now they don't.
                        //is this trigger an exit trigger? execute an event.
                        if (action.trigger === 13) {
                            action._executeCurrent(ActionEvent.CreateNew(sourceMesh, undefined, otherMesh_1));
                        }
                        //if this is an exit trigger, or no exit trigger exists, remove the id from the intersection in progress array.
                        if (!sourceMesh.actionManager.hasSpecificTrigger(13, function (parameter) {
                            var parameterMesh = parameter.mesh ? parameter.mesh : parameter;
                            return otherMesh_1 === parameterMesh;
                        }) ||
                            action.trigger === 13) {
                            sourceMesh._intersectionsInProgress.splice(currentIntersectionInProgress, 1);
                        }
                    }
                }
            };
            for (var actionIndex = 0; sourceMesh.actionManager && actionIndex < sourceMesh.actionManager.actions.length; actionIndex++) {
                _loop_1(actionIndex);
            }
        }
    };
    /**
     * @param step
     * @hidden
     */
    Scene.prototype._advancePhysicsEngineStep = function (step) {
        // Do nothing. Code will be replaced if physics engine component is referenced
    };
    /** @hidden */
    Scene.prototype._animate = function () {
        // Nothing to do as long as Animatable have not been imported.
    };
    /** Execute all animations (for a frame) */
    Scene.prototype.animate = function () {
        if (this._engine.isDeterministicLockStep()) {
            var deltaTime = Math.max(Scene.MinDeltaTime, Math.min(this._engine.getDeltaTime(), Scene.MaxDeltaTime)) + this._timeAccumulator;
            var defaultFrameTime = this._engine.getTimeStep();
            var defaultFPS = 1000.0 / defaultFrameTime / 1000.0;
            var stepsTaken = 0;
            var maxSubSteps = this._engine.getLockstepMaxSteps();
            var internalSteps = Math.floor(deltaTime / defaultFrameTime);
            internalSteps = Math.min(internalSteps, maxSubSteps);
            while (deltaTime > 0 && stepsTaken < internalSteps) {
                this.onBeforeStepObservable.notifyObservers(this);
                // Animations
                this._animationRatio = defaultFrameTime * defaultFPS;
                this._animate();
                this.onAfterAnimationsObservable.notifyObservers(this);
                // Physics
                if (this.physicsEnabled) {
                    this._advancePhysicsEngineStep(defaultFrameTime);
                }
                this.onAfterStepObservable.notifyObservers(this);
                this._currentStepId++;
                stepsTaken++;
                deltaTime -= defaultFrameTime;
            }
            this._timeAccumulator = deltaTime < 0 ? 0 : deltaTime;
        }
        else {
            // Animations
            var deltaTime = this.useConstantAnimationDeltaTime ? 16 : Math.max(Scene.MinDeltaTime, Math.min(this._engine.getDeltaTime(), Scene.MaxDeltaTime));
            this._animationRatio = deltaTime * (60.0 / 1000.0);
            this._animate();
            this.onAfterAnimationsObservable.notifyObservers(this);
            // Physics
            if (this.physicsEnabled) {
                this._advancePhysicsEngineStep(deltaTime);
            }
        }
    };
    Scene.prototype._clear = function () {
        if (this.autoClearDepthAndStencil || this.autoClear) {
            this._engine.clear(this.clearColor, this.autoClear || this.forceWireframe || this.forcePointsCloud, this.autoClearDepthAndStencil, this.autoClearDepthAndStencil);
        }
    };
    Scene.prototype._checkCameraRenderTarget = function (camera) {
        var _a;
        if ((camera === null || camera === void 0 ? void 0 : camera.outputRenderTarget) && !(camera === null || camera === void 0 ? void 0 : camera.isRigCamera)) {
            camera.outputRenderTarget._cleared = false;
        }
        if ((_a = camera === null || camera === void 0 ? void 0 : camera.rigCameras) === null || _a === void 0 ? void 0 : _a.length) {
            for (var i = 0; i < camera.rigCameras.length; ++i) {
                var rtt = camera.rigCameras[i].outputRenderTarget;
                if (rtt) {
                    rtt._cleared = false;
                }
            }
        }
    };
    /**
     * Resets the draw wrappers cache of all meshes
     * @param passId If provided, releases only the draw wrapper corresponding to this render pass id
     */
    Scene.prototype.resetDrawCache = function (passId) {
        if (!this.meshes) {
            return;
        }
        for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
            var mesh = _a[_i];
            mesh.resetDrawCache(passId);
        }
    };
    /**
     * Render the scene
     * @param updateCameras defines a boolean indicating if cameras must update according to their inputs (true by default)
     * @param ignoreAnimations defines a boolean indicating if animations should not be executed (false by default)
     */
    Scene.prototype.render = function (updateCameras, ignoreAnimations) {
        var _a, _b, _c;
        if (updateCameras === void 0) { updateCameras = true; }
        if (ignoreAnimations === void 0) { ignoreAnimations = false; }
        if (this.isDisposed) {
            return;
        }
        if (this.onReadyObservable.hasObservers() && this._executeWhenReadyTimeoutId === null) {
            this._checkIsReady();
        }
        this._frameId++;
        this._defaultFrameBufferCleared = false;
        this._checkCameraRenderTarget(this.activeCamera);
        if ((_a = this.activeCameras) === null || _a === void 0 ? void 0 : _a.length) {
            this.activeCameras.forEach(this._checkCameraRenderTarget);
        }
        // Register components that have been associated lately to the scene.
        this._registerTransientComponents();
        this._activeParticles.fetchNewFrame();
        this._totalVertices.fetchNewFrame();
        this._activeIndices.fetchNewFrame();
        this._activeBones.fetchNewFrame();
        this._meshesForIntersections.reset();
        this.resetCachedMaterial();
        this.onBeforeAnimationsObservable.notifyObservers(this);
        // Actions
        if (this.actionManager) {
            this.actionManager.processTrigger(11);
        }
        // Animations
        if (!ignoreAnimations) {
            this.animate();
        }
        // Before camera update steps
        for (var _i = 0, _d = this._beforeCameraUpdateStage; _i < _d.length; _i++) {
            var step = _d[_i];
            step.action();
        }
        // Update Cameras
        if (updateCameras) {
            if (this.activeCameras && this.activeCameras.length > 0) {
                for (var cameraIndex = 0; cameraIndex < this.activeCameras.length; cameraIndex++) {
                    var camera = this.activeCameras[cameraIndex];
                    camera.update();
                    if (camera.cameraRigMode !== 0) {
                        // rig cameras
                        for (var index = 0; index < camera._rigCameras.length; index++) {
                            camera._rigCameras[index].update();
                        }
                    }
                }
            }
            else if (this.activeCamera) {
                this.activeCamera.update();
                if (this.activeCamera.cameraRigMode !== 0) {
                    // rig cameras
                    for (var index = 0; index < this.activeCamera._rigCameras.length; index++) {
                        this.activeCamera._rigCameras[index].update();
                    }
                }
            }
        }
        // Before render
        this.onBeforeRenderObservable.notifyObservers(this);
        var engine = this.getEngine();
        // Customs render targets
        this.onBeforeRenderTargetsRenderObservable.notifyObservers(this);
        var currentActiveCamera = ((_b = this.activeCameras) === null || _b === void 0 ? void 0 : _b.length) ? this.activeCameras[0] : this.activeCamera;
        if (this.renderTargetsEnabled) {
            Tools.StartPerformanceCounter("Custom render targets", this.customRenderTargets.length > 0);
            this._intermediateRendering = true;
            for (var customIndex = 0; customIndex < this.customRenderTargets.length; customIndex++) {
                var renderTarget = this.customRenderTargets[customIndex];
                if (renderTarget._shouldRender()) {
                    this._renderId++;
                    this.activeCamera = renderTarget.activeCamera || this.activeCamera;
                    if (!this.activeCamera) {
                        throw new Error("Active camera not set");
                    }
                    // Viewport
                    engine.setViewport(this.activeCamera.viewport);
                    // Camera
                    this.updateTransformMatrix();
                    renderTarget.render(currentActiveCamera !== this.activeCamera, this.dumpNextRenderTargets);
                }
            }
            Tools.EndPerformanceCounter("Custom render targets", this.customRenderTargets.length > 0);
            this._intermediateRendering = false;
            this._renderId++;
        }
        this._engine.currentRenderPassId = (_c = currentActiveCamera === null || currentActiveCamera === void 0 ? void 0 : currentActiveCamera.renderPassId) !== null && _c !== void 0 ? _c : 0;
        // Restore back buffer
        this.activeCamera = currentActiveCamera;
        if (this._activeCamera && this._activeCamera.cameraRigMode !== 22 && !this.prePass) {
            this._bindFrameBuffer(this._activeCamera, false);
        }
        this.onAfterRenderTargetsRenderObservable.notifyObservers(this);
        for (var _e = 0, _f = this._beforeClearStage; _e < _f.length; _e++) {
            var step = _f[_e];
            step.action();
        }
        // Clear
        this._clearFrameBuffer(this.activeCamera);
        // Collects render targets from external components.
        for (var _g = 0, _h = this._gatherRenderTargetsStage; _g < _h.length; _g++) {
            var step = _h[_g];
            step.action(this._renderTargets);
        }
        // Multi-cameras?
        if (this.activeCameras && this.activeCameras.length > 0) {
            for (var cameraIndex = 0; cameraIndex < this.activeCameras.length; cameraIndex++) {
                this._processSubCameras(this.activeCameras[cameraIndex], cameraIndex > 0);
            }
        }
        else {
            if (!this.activeCamera) {
                throw new Error("No camera defined");
            }
            this._processSubCameras(this.activeCamera, !!this.activeCamera.outputRenderTarget);
        }
        // Intersection checks
        this._checkIntersections();
        // Executes the after render stage actions.
        for (var _j = 0, _k = this._afterRenderStage; _j < _k.length; _j++) {
            var step = _k[_j];
            step.action();
        }
        // After render
        if (this.afterRender) {
            this.afterRender();
        }
        this.onAfterRenderObservable.notifyObservers(this);
        // Cleaning
        if (this._toBeDisposed.length) {
            for (var index = 0; index < this._toBeDisposed.length; index++) {
                var data = this._toBeDisposed[index];
                if (data) {
                    data.dispose();
                }
            }
            this._toBeDisposed = [];
        }
        if (this.dumpNextRenderTargets) {
            this.dumpNextRenderTargets = false;
        }
        this._activeBones.addCount(0, true);
        this._activeIndices.addCount(0, true);
        this._activeParticles.addCount(0, true);
        this._engine.restoreDefaultFramebuffer();
    };
    /**
     * Freeze all materials
     * A frozen material will not be updatable but should be faster to render
     */
    Scene.prototype.freezeMaterials = function () {
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].freeze();
        }
    };
    /**
     * Unfreeze all materials
     * A frozen material will not be updatable but should be faster to render
     */
    Scene.prototype.unfreezeMaterials = function () {
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].unfreeze();
        }
    };
    /**
     * Releases all held resources
     */
    Scene.prototype.dispose = function () {
        var _a;
        if (this.isDisposed) {
            return;
        }
        this.beforeRender = null;
        this.afterRender = null;
        this.metadata = null;
        this.skeletons = [];
        this.morphTargetManagers = [];
        this._transientComponents = [];
        this._isReadyForMeshStage.clear();
        this._beforeEvaluateActiveMeshStage.clear();
        this._evaluateSubMeshStage.clear();
        this._preActiveMeshStage.clear();
        this._cameraDrawRenderTargetStage.clear();
        this._beforeCameraDrawStage.clear();
        this._beforeRenderTargetDrawStage.clear();
        this._beforeRenderingGroupDrawStage.clear();
        this._beforeRenderingMeshStage.clear();
        this._afterRenderingMeshStage.clear();
        this._afterRenderingGroupDrawStage.clear();
        this._afterCameraDrawStage.clear();
        this._afterRenderTargetDrawStage.clear();
        this._afterRenderStage.clear();
        this._beforeCameraUpdateStage.clear();
        this._beforeClearStage.clear();
        this._gatherRenderTargetsStage.clear();
        this._gatherActiveCameraRenderTargetsStage.clear();
        this._pointerMoveStage.clear();
        this._pointerDownStage.clear();
        this._pointerUpStage.clear();
        this.importedMeshesFiles = new Array();
        if (this.stopAllAnimations) {
            this.stopAllAnimations();
        }
        this.resetCachedMaterial();
        // Smart arrays
        if (this.activeCamera) {
            this.activeCamera._activeMeshes.dispose();
            this.activeCamera = null;
        }
        this._activeMeshes.dispose();
        this._renderingManager.dispose();
        this._processedMaterials.dispose();
        this._activeParticleSystems.dispose();
        this._activeSkeletons.dispose();
        this._softwareSkinnedMeshes.dispose();
        this._renderTargets.dispose();
        this._materialsRenderTargets.dispose();
        this._registeredForLateAnimationBindings.dispose();
        this._meshesForIntersections.dispose();
        this._toBeDisposed = [];
        // Abort active requests
        var activeRequests = this._activeRequests.slice();
        for (var _i = 0, activeRequests_1 = activeRequests; _i < activeRequests_1.length; _i++) {
            var request = activeRequests_1[_i];
            request.abort();
        }
        this._activeRequests = [];
        // Events
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
        this.onBeforeRenderObservable.clear();
        this.onAfterRenderObservable.clear();
        this.onBeforeRenderTargetsRenderObservable.clear();
        this.onAfterRenderTargetsRenderObservable.clear();
        this.onAfterStepObservable.clear();
        this.onBeforeStepObservable.clear();
        this.onBeforeActiveMeshesEvaluationObservable.clear();
        this.onAfterActiveMeshesEvaluationObservable.clear();
        this.onBeforeParticlesRenderingObservable.clear();
        this.onAfterParticlesRenderingObservable.clear();
        this.onBeforeDrawPhaseObservable.clear();
        this.onAfterDrawPhaseObservable.clear();
        this.onBeforeAnimationsObservable.clear();
        this.onAfterAnimationsObservable.clear();
        this.onDataLoadedObservable.clear();
        this.onBeforeRenderingGroupObservable.clear();
        this.onAfterRenderingGroupObservable.clear();
        this.onMeshImportedObservable.clear();
        this.onBeforeCameraRenderObservable.clear();
        this.onAfterCameraRenderObservable.clear();
        this.onReadyObservable.clear();
        this.onNewCameraAddedObservable.clear();
        this.onCameraRemovedObservable.clear();
        this.onNewLightAddedObservable.clear();
        this.onLightRemovedObservable.clear();
        this.onNewGeometryAddedObservable.clear();
        this.onGeometryRemovedObservable.clear();
        this.onNewTransformNodeAddedObservable.clear();
        this.onTransformNodeRemovedObservable.clear();
        this.onNewMeshAddedObservable.clear();
        this.onMeshRemovedObservable.clear();
        this.onNewSkeletonAddedObservable.clear();
        this.onSkeletonRemovedObservable.clear();
        this.onNewMaterialAddedObservable.clear();
        this.onNewMultiMaterialAddedObservable.clear();
        this.onMaterialRemovedObservable.clear();
        this.onMultiMaterialRemovedObservable.clear();
        this.onNewTextureAddedObservable.clear();
        this.onTextureRemovedObservable.clear();
        this.onPrePointerObservable.clear();
        this.onPointerObservable.clear();
        this.onPreKeyboardObservable.clear();
        this.onKeyboardObservable.clear();
        this.onActiveCameraChanged.clear();
        this.onComputePressureChanged.clear();
        (_a = this._computePressureObserver) === null || _a === void 0 ? void 0 : _a.unobserve();
        this._computePressureObserver = undefined;
        this.detachControl();
        // Detach cameras
        var canvas = this._engine.getInputElement();
        if (canvas) {
            for (var index_1 = 0; index_1 < this.cameras.length; index_1++) {
                this.cameras[index_1].detachControl();
            }
        }
        // Release animation groups
        this._disposeList(this.animationGroups);
        // Release lights
        this._disposeList(this.lights);
        // Release meshes
        this._disposeList(this.meshes, function (item) { return item.dispose(true); });
        this._disposeList(this.transformNodes, function (item) { return item.dispose(true); });
        // Release cameras
        this._disposeList(this.cameras);
        // Release materials
        if (this._defaultMaterial) {
            this._defaultMaterial.dispose();
        }
        this._disposeList(this.multiMaterials);
        this._disposeList(this.materials);
        // Release particles
        this._disposeList(this.particleSystems);
        // Release postProcesses
        this._disposeList(this.postProcesses);
        // Release textures
        this._disposeList(this.textures);
        // Release morph targets
        this._disposeList(this.morphTargetManagers);
        // Release UBO
        this._sceneUbo.dispose();
        if (this._multiviewSceneUbo) {
            this._multiviewSceneUbo.dispose();
        }
        // Post-processes
        this.postProcessManager.dispose();
        // Components
        this._disposeList(this._components);
        // Remove from engine
        var index = this._engine.scenes.indexOf(this);
        if (index > -1) {
            this._engine.scenes.splice(index, 1);
        }
        if (EngineStore._LastCreatedScene === this) {
            if (this._engine.scenes.length > 0) {
                EngineStore._LastCreatedScene = this._engine.scenes[this._engine.scenes.length - 1];
            }
            else {
                EngineStore._LastCreatedScene = null;
            }
        }
        index = this._engine._virtualScenes.indexOf(this);
        if (index > -1) {
            this._engine._virtualScenes.splice(index, 1);
        }
        this._engine.wipeCaches(true);
        this._isDisposed = true;
    };
    Scene.prototype._disposeList = function (items, callback) {
        var itemsCopy = items.slice(0);
        callback = callback !== null && callback !== void 0 ? callback : (function (item) { return item.dispose(); });
        for (var _i = 0, itemsCopy_1 = itemsCopy; _i < itemsCopy_1.length; _i++) {
            var item = itemsCopy_1[_i];
            callback(item);
        }
        items.length = 0;
    };
    Object.defineProperty(Scene.prototype, "isDisposed", {
        /**
         * Gets if the scene is already disposed
         */
        get: function () {
            return this._isDisposed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call this function to reduce memory footprint of the scene.
     * Vertex buffers will not store CPU data anymore (this will prevent picking, collisions or physics to work correctly)
     */
    Scene.prototype.clearCachedVertexData = function () {
        for (var meshIndex = 0; meshIndex < this.meshes.length; meshIndex++) {
            var mesh = this.meshes[meshIndex];
            var geometry = mesh.geometry;
            if (geometry) {
                geometry.clearCachedData();
            }
        }
    };
    /**
     * This function will remove the local cached buffer data from texture.
     * It will save memory but will prevent the texture from being rebuilt
     */
    Scene.prototype.cleanCachedTextureBuffer = function () {
        for (var _i = 0, _a = this.textures; _i < _a.length; _i++) {
            var baseTexture = _a[_i];
            var buffer = baseTexture._buffer;
            if (buffer) {
                baseTexture._buffer = null;
            }
        }
    };
    /**
     * Get the world extend vectors with an optional filter
     *
     * @param filterPredicate the predicate - which meshes should be included when calculating the world size
     * @returns {{ min: Vector3; max: Vector3 }} min and max vectors
     */
    Scene.prototype.getWorldExtends = function (filterPredicate) {
        var min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        var max = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        filterPredicate = filterPredicate || (function () { return true; });
        this.meshes.filter(filterPredicate).forEach(function (mesh) {
            mesh.computeWorldMatrix(true);
            if (!mesh.subMeshes || mesh.subMeshes.length === 0 || mesh.infiniteDistance) {
                return;
            }
            var boundingInfo = mesh.getBoundingInfo();
            var minBox = boundingInfo.boundingBox.minimumWorld;
            var maxBox = boundingInfo.boundingBox.maximumWorld;
            Vector3.CheckExtends(minBox, min, max);
            Vector3.CheckExtends(maxBox, min, max);
        });
        return {
            min: min,
            max: max
        };
    };
    // Picking
    /**
     * Creates a ray that can be used to pick in the scene
     * @param x defines the x coordinate of the origin (on-screen)
     * @param y defines the y coordinate of the origin (on-screen)
     * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
     * @param camera defines the camera to use for the picking
     * @param cameraViewSpace defines if picking will be done in view space (false by default)
     * @returns a Ray
     */
    Scene.prototype.createPickingRay = function (x, y, world, camera, cameraViewSpace) {
        throw _WarnImport("Ray");
    };
    /**
     * Creates a ray that can be used to pick in the scene
     * @param x defines the x coordinate of the origin (on-screen)
     * @param y defines the y coordinate of the origin (on-screen)
     * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
     * @param result defines the ray where to store the picking ray
     * @param camera defines the camera to use for the picking
     * @param cameraViewSpace defines if picking will be done in view space (false by default)
     * @param enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
     * @returns the current scene
     */
    Scene.prototype.createPickingRayToRef = function (x, y, world, result, camera, cameraViewSpace, enableDistantPicking) {
        throw _WarnImport("Ray");
    };
    /**
     * Creates a ray that can be used to pick in the scene
     * @param x defines the x coordinate of the origin (on-screen)
     * @param y defines the y coordinate of the origin (on-screen)
     * @param camera defines the camera to use for the picking
     * @returns a Ray
     */
    Scene.prototype.createPickingRayInCameraSpace = function (x, y, camera) {
        throw _WarnImport("Ray");
    };
    /**
     * Creates a ray that can be used to pick in the scene
     * @param x defines the x coordinate of the origin (on-screen)
     * @param y defines the y coordinate of the origin (on-screen)
     * @param result defines the ray where to store the picking ray
     * @param camera defines the camera to use for the picking
     * @returns the current scene
     */
    Scene.prototype.createPickingRayInCameraSpaceToRef = function (x, y, result, camera) {
        throw _WarnImport("Ray");
    };
    /** Launch a ray to try to pick a mesh in the scene
     * @param x position on screen
     * @param y position on screen
     * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @returns a PickingInfo
     */
    Scene.prototype.pick = function (x, y, predicate, fastCheck, camera, trianglePredicate) {
        // Dummy info if picking as not been imported
        var pi = new PickingInfo();
        pi._pickingUnavailable = true;
        return pi;
    };
    /** Launch a ray to try to pick a mesh in the scene using only bounding information of the main mesh (not using submeshes)
     * @param x position on screen
     * @param y position on screen
     * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
     * @returns a PickingInfo (Please note that some info will not be set like distance, bv, bu and everything that cannot be capture by only using bounding infos)
     */
    Scene.prototype.pickWithBoundingInfo = function (x, y, predicate, fastCheck, camera) {
        // Dummy info if picking as not been imported
        var pi = new PickingInfo();
        pi._pickingUnavailable = true;
        return pi;
    };
    /** Use the given ray to pick a mesh in the scene
     * @param ray The ray to use to pick meshes
     * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must have isPickable set to true
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @returns a PickingInfo
     */
    Scene.prototype.pickWithRay = function (ray, predicate, fastCheck, trianglePredicate) {
        throw _WarnImport("Ray");
    };
    /**
     * Launch a ray to try to pick a mesh in the scene
     * @param x X position on screen
     * @param y Y position on screen
     * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
     * @param camera camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @returns an array of PickingInfo
     */
    Scene.prototype.multiPick = function (x, y, predicate, camera, trianglePredicate) {
        throw _WarnImport("Ray");
    };
    /**
     * Launch a ray to try to pick a mesh in the scene
     * @param ray Ray to use
     * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @returns an array of PickingInfo
     */
    Scene.prototype.multiPickWithRay = function (ray, predicate, trianglePredicate) {
        throw _WarnImport("Ray");
    };
    /**
     * Force the value of meshUnderPointer
     * @param mesh defines the mesh to use
     * @param pointerId optional pointer id when using more than one pointer
     * @param pickResult optional pickingInfo data used to find mesh
     */
    Scene.prototype.setPointerOverMesh = function (mesh, pointerId, pickResult) {
        this._inputManager.setPointerOverMesh(mesh, pointerId, pickResult);
    };
    /**
     * Gets the mesh under the pointer
     * @returns a Mesh or null if no mesh is under the pointer
     */
    Scene.prototype.getPointerOverMesh = function () {
        return this._inputManager.getPointerOverMesh();
    };
    // Misc.
    /** @hidden */
    Scene.prototype._rebuildGeometries = function () {
        for (var _i = 0, _a = this.geometries; _i < _a.length; _i++) {
            var geometry = _a[_i];
            geometry._rebuild();
        }
        for (var _b = 0, _c = this.meshes; _b < _c.length; _b++) {
            var mesh = _c[_b];
            mesh._rebuild();
        }
        if (this.postProcessManager) {
            this.postProcessManager._rebuild();
        }
        for (var _d = 0, _e = this._components; _d < _e.length; _d++) {
            var component = _e[_d];
            component.rebuild();
        }
        for (var _f = 0, _g = this.particleSystems; _f < _g.length; _f++) {
            var system = _g[_f];
            system.rebuild();
        }
        if (this.spriteManagers) {
            for (var _h = 0, _j = this.spriteManagers; _h < _j.length; _h++) {
                var spriteMgr = _j[_h];
                spriteMgr.rebuild();
            }
        }
    };
    /** @hidden */
    Scene.prototype._rebuildTextures = function () {
        for (var _i = 0, _a = this.textures; _i < _a.length; _i++) {
            var texture = _a[_i];
            texture._rebuild();
        }
        this.markAllMaterialsAsDirty(1);
    };
    // Tags
    Scene.prototype._getByTags = function (list, tagsQuery, forEach) {
        if (tagsQuery === undefined) {
            // returns the complete list (could be done with Tags.MatchesQuery but no need to have a for-loop here)
            return list;
        }
        var listByTags = [];
        forEach =
            forEach ||
                (function (item) {
                    return;
                });
        for (var i in list) {
            var item = list[i];
            if (Tags && Tags.MatchesQuery(item, tagsQuery)) {
                listByTags.push(item);
                forEach(item);
            }
        }
        return listByTags;
    };
    /**
     * Get a list of meshes by tags
     * @param tagsQuery defines the tags query to use
     * @param forEach defines a predicate used to filter results
     * @returns an array of Mesh
     */
    Scene.prototype.getMeshesByTags = function (tagsQuery, forEach) {
        return this._getByTags(this.meshes, tagsQuery, forEach);
    };
    /**
     * Get a list of cameras by tags
     * @param tagsQuery defines the tags query to use
     * @param forEach defines a predicate used to filter results
     * @returns an array of Camera
     */
    Scene.prototype.getCamerasByTags = function (tagsQuery, forEach) {
        return this._getByTags(this.cameras, tagsQuery, forEach);
    };
    /**
     * Get a list of lights by tags
     * @param tagsQuery defines the tags query to use
     * @param forEach defines a predicate used to filter results
     * @returns an array of Light
     */
    Scene.prototype.getLightsByTags = function (tagsQuery, forEach) {
        return this._getByTags(this.lights, tagsQuery, forEach);
    };
    /**
     * Get a list of materials by tags
     * @param tagsQuery defines the tags query to use
     * @param forEach defines a predicate used to filter results
     * @returns an array of Material
     */
    Scene.prototype.getMaterialByTags = function (tagsQuery, forEach) {
        return this._getByTags(this.materials, tagsQuery, forEach).concat(this._getByTags(this.multiMaterials, tagsQuery, forEach));
    };
    /**
     * Get a list of transform nodes by tags
     * @param tagsQuery defines the tags query to use
     * @param forEach defines a predicate used to filter results
     * @returns an array of TransformNode
     */
    Scene.prototype.getTransformNodesByTags = function (tagsQuery, forEach) {
        return this._getByTags(this.transformNodes, tagsQuery, forEach);
    };
    /**
     * Overrides the default sort function applied in the rendering group to prepare the meshes.
     * This allowed control for front to back rendering or reversly depending of the special needs.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
     * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
     * @param transparentSortCompareFn The transparent queue comparison function use to sort.
     */
    Scene.prototype.setRenderingOrder = function (renderingGroupId, opaqueSortCompareFn, alphaTestSortCompareFn, transparentSortCompareFn) {
        if (opaqueSortCompareFn === void 0) { opaqueSortCompareFn = null; }
        if (alphaTestSortCompareFn === void 0) { alphaTestSortCompareFn = null; }
        if (transparentSortCompareFn === void 0) { transparentSortCompareFn = null; }
        this._renderingManager.setRenderingOrder(renderingGroupId, opaqueSortCompareFn, alphaTestSortCompareFn, transparentSortCompareFn);
    };
    /**
     * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
     * @param depth Automatically clears depth between groups if true and autoClear is true.
     * @param stencil Automatically clears stencil between groups if true and autoClear is true.
     */
    Scene.prototype.setRenderingAutoClearDepthStencil = function (renderingGroupId, autoClearDepthStencil, depth, stencil) {
        if (depth === void 0) { depth = true; }
        if (stencil === void 0) { stencil = true; }
        this._renderingManager.setRenderingAutoClearDepthStencil(renderingGroupId, autoClearDepthStencil, depth, stencil);
    };
    /**
     * Gets the current auto clear configuration for one rendering group of the rendering
     * manager.
     * @param index the rendering group index to get the information for
     * @returns The auto clear setup for the requested rendering group
     */
    Scene.prototype.getAutoClearDepthStencilSetup = function (index) {
        return this._renderingManager.getAutoClearDepthStencilSetup(index);
    };
    Object.defineProperty(Scene.prototype, "blockMaterialDirtyMechanism", {
        /** Gets or sets a boolean blocking all the calls to markAllMaterialsAsDirty (ie. the materials won't be updated if they are out of sync) */
        get: function () {
            return this._blockMaterialDirtyMechanism;
        },
        set: function (value) {
            if (this._blockMaterialDirtyMechanism === value) {
                return;
            }
            this._blockMaterialDirtyMechanism = value;
            if (!value) {
                // Do a complete update
                this.markAllMaterialsAsDirty(63);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Will flag all materials as dirty to trigger new shader compilation
     * @param flag defines the flag used to specify which material part must be marked as dirty
     * @param predicate If not null, it will be used to specify if a material has to be marked as dirty
     */
    Scene.prototype.markAllMaterialsAsDirty = function (flag, predicate) {
        if (this._blockMaterialDirtyMechanism) {
            return;
        }
        for (var _i = 0, _a = this.materials; _i < _a.length; _i++) {
            var material = _a[_i];
            if (predicate && !predicate(material)) {
                continue;
            }
            material.markAsDirty(flag);
        }
    };
    /**
     * @param fileOrUrl
     * @param onSuccess
     * @param onProgress
     * @param useOfflineSupport
     * @param useArrayBuffer
     * @param onError
     * @param onOpened
     * @hidden
     */
    Scene.prototype._loadFile = function (fileOrUrl, onSuccess, onProgress, useOfflineSupport, useArrayBuffer, onError, onOpened) {
        var _this = this;
        var request = LoadFile(fileOrUrl, onSuccess, onProgress, useOfflineSupport ? this.offlineProvider : undefined, useArrayBuffer, onError, onOpened);
        this._activeRequests.push(request);
        request.onCompleteObservable.add(function (request) {
            _this._activeRequests.splice(_this._activeRequests.indexOf(request), 1);
        });
        return request;
    };
    /**
     * @param fileOrUrl
     * @param onProgress
     * @param useOfflineSupport
     * @param useArrayBuffer
     * @param onOpened
     * @hidden
     */
    Scene.prototype._loadFileAsync = function (fileOrUrl, onProgress, useOfflineSupport, useArrayBuffer, onOpened) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._loadFile(fileOrUrl, function (data) {
                resolve(data);
            }, onProgress, useOfflineSupport, useArrayBuffer, function (request, exception) {
                reject(exception);
            }, onOpened);
        });
    };
    /**
     * @param url
     * @param onSuccess
     * @param onProgress
     * @param useOfflineSupport
     * @param useArrayBuffer
     * @param onError
     * @param onOpened
     * @hidden
     */
    Scene.prototype._requestFile = function (url, onSuccess, onProgress, useOfflineSupport, useArrayBuffer, onError, onOpened) {
        var _this = this;
        var request = RequestFile(url, onSuccess, onProgress, useOfflineSupport ? this.offlineProvider : undefined, useArrayBuffer, onError, onOpened);
        this._activeRequests.push(request);
        request.onCompleteObservable.add(function (request) {
            _this._activeRequests.splice(_this._activeRequests.indexOf(request), 1);
        });
        return request;
    };
    /**
     * @param url
     * @param onProgress
     * @param useOfflineSupport
     * @param useArrayBuffer
     * @param onOpened
     * @hidden
     */
    Scene.prototype._requestFileAsync = function (url, onProgress, useOfflineSupport, useArrayBuffer, onOpened) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._requestFile(url, function (data) {
                resolve(data);
            }, onProgress, useOfflineSupport, useArrayBuffer, function (error) {
                reject(error);
            }, onOpened);
        });
    };
    /**
     * @param file
     * @param onSuccess
     * @param onProgress
     * @param useArrayBuffer
     * @param onError
     * @hidden
     */
    Scene.prototype._readFile = function (file, onSuccess, onProgress, useArrayBuffer, onError) {
        var _this = this;
        var request = ReadFile(file, onSuccess, onProgress, useArrayBuffer, onError);
        this._activeRequests.push(request);
        request.onCompleteObservable.add(function (request) {
            _this._activeRequests.splice(_this._activeRequests.indexOf(request), 1);
        });
        return request;
    };
    /**
     * @param file
     * @param onProgress
     * @param useArrayBuffer
     * @hidden
     */
    Scene.prototype._readFileAsync = function (file, onProgress, useArrayBuffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._readFile(file, function (data) {
                resolve(data);
            }, onProgress, useArrayBuffer, function (error) {
                reject(error);
            });
        });
    };
    /**
     * This method gets the performance collector belonging to the scene, which is generally shared with the inspector.
     * @returns the perf collector belonging to the scene.
     */
    Scene.prototype.getPerfCollector = function () {
        throw _WarnImport("performanceViewerSceneExtension");
    };
    /** The fog is deactivated */
    Scene.FOGMODE_NONE = 0;
    /** The fog density is following an exponential function */
    Scene.FOGMODE_EXP = 1;
    /** The fog density is following an exponential function faster than FOGMODE_EXP */
    Scene.FOGMODE_EXP2 = 2;
    /** The fog density is following a linear function. */
    Scene.FOGMODE_LINEAR = 3;
    /**
     * Gets or sets the minimum deltatime when deterministic lock step is enabled
     * @see https://doc.babylonjs.com/babylon101/animations#deterministic-lockstep
     */
    Scene.MinDeltaTime = 1.0;
    /**
     * Gets or sets the maximum deltatime when deterministic lock step is enabled
     * @see https://doc.babylonjs.com/babylon101/animations#deterministic-lockstep
     */
    Scene.MaxDeltaTime = 1000.0;
    return Scene;
}(AbstractScene));
/**
 * @param id
 * @hidden
 */
Scene.prototype.setActiveCameraByID = function (id) {
    return this.setActiveCameraById(id);
};
Scene.prototype.getLastMaterialByID = function (id) {
    return this.getLastMaterialById(id);
};
Scene.prototype.getMaterialByID = function (id) {
    return this.getMaterialById(id);
};
Scene.prototype.getTextureByUniqueID = function (uniqueId) {
    return this.getTextureByUniqueId(uniqueId);
};
Scene.prototype.getCameraByID = function (id) {
    return this.getCameraById(id);
};
Scene.prototype.getCameraByUniqueID = function (uniqueId) {
    return this.getCameraByUniqueId(uniqueId);
};
Scene.prototype.getBoneByID = function (id) {
    return this.getBoneById(id);
};
Scene.prototype.getLightByID = function (id) {
    return this.getLightById(id);
};
Scene.prototype.getLightByUniqueID = function (uniqueId) {
    return this.getLightByUniqueId(uniqueId);
};
Scene.prototype.getParticleSystemByID = function (id) {
    return this.getParticleSystemById(id);
};
Scene.prototype.getGeometryByID = function (id) {
    return this.getGeometryById(id);
};
Scene.prototype.getMeshByID = function (id) {
    return this.getMeshById(id);
};
Scene.prototype.getMeshesByID = function (id) {
    return this.getMeshesById(id);
};
Scene.prototype.getTransformNodeByID = function (id) {
    return this.getTransformNodeById(id);
};
Scene.prototype.getTransformNodeByUniqueID = function (uniqueId) {
    return this.getTransformNodeByUniqueId(uniqueId);
};
Scene.prototype.getTransformNodesByID = function (id) {
    return this.getTransformNodesById(id);
};
Scene.prototype.getMeshByUniqueID = function (uniqueId) {
    return this.getMeshByUniqueId(uniqueId);
};
Scene.prototype.getLastMeshByID = function (id) {
    return this.getLastMeshById(id);
};
Scene.prototype.getLastEntryByID = function (id) {
    return this.getLastEntryById(id);
};
Scene.prototype.getNodeByID = function (id) {
    return this.getNodeById(id);
};
Scene.prototype.getLastSkeletonByID = function (id) {
    return this.getLastSkeletonById(id);
};

export { AbstractScene as A, ImageProcessingConfiguration as I, MaterialDefines as M, SceneComponentConstants as S, Scene as a };
