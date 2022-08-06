import { d as ShaderStore } from './effect-95a5a78c.js';
import { _ as __decorate, a as __extends } from './tslib.es6-2542203d.js';
import { b as MaterialPluginEvent, a as MaterialHelper, M as Material } from './material-68530d52.js';
import { S as SerializationHelper, s as serialize, b as serializeAsTexture, h as expandToProperty } from './decorators-549f2b16.js';
import { E as Engine } from './engine-6da2def3.js';
import { M as MaterialDefines } from './scene-02f0c3e7.js';

/**
 * Class that manages the plugins of a material
 * @since 5.0
 */
var MaterialPluginManager = /** @class */ (function () {
    /**
     * Creates a new instance of the plugin manager
     * @param material material that this manager will manage the plugins for
     */
    function MaterialPluginManager(material) {
        this._plugins = [];
        this._activePlugins = [];
        this._activePluginsForExtraEvents = [];
        this._material = material;
        this._scene = material.getScene();
        this._engine = this._scene.getEngine();
    }
    /**
     * @param plugin
     * @hidden
     */
    MaterialPluginManager.prototype._addPlugin = function (plugin) {
        for (var i = 0; i < this._plugins.length; ++i) {
            if (this._plugins[i].name === plugin.name) {
                throw "Plugin \"".concat(plugin.name, "\" already added to the material \"").concat(this._material.name, "\"!");
            }
        }
        if (this._material._uniformBufferLayoutBuilt) {
            throw "The plugin \"".concat(plugin.name, "\" can't be added to the material \"").concat(this._material.name, "\" because this material has already been used for rendering! Please add plugins to materials before any rendering with this material occurs.");
        }
        var pluginClassName = plugin.getClassName();
        if (!MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName]) {
            MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName] = "MATERIALPLUGIN_" + ++MaterialPluginManager._MaterialPluginCounter;
        }
        this._material._callbackPluginEventGeneric = this._handlePluginEvent.bind(this);
        this._plugins.push(plugin);
        this._plugins.sort(function (a, b) { return a.priority - b.priority; });
        this._codeInjectionPoints = {};
        var defineNamesFromPlugins = {};
        defineNamesFromPlugins[MaterialPluginManager._MaterialPluginClassToMainDefine[pluginClassName]] = {
            type: "boolean",
            default: true,
        };
        for (var _i = 0, _a = this._plugins; _i < _a.length; _i++) {
            var plugin_1 = _a[_i];
            plugin_1.collectDefines(defineNamesFromPlugins);
            this._collectPointNames("vertex", plugin_1.getCustomCode("vertex"));
            this._collectPointNames("fragment", plugin_1.getCustomCode("fragment"));
        }
        this._defineNamesFromPlugins = defineNamesFromPlugins;
    };
    /**
     * @param plugin
     * @hidden
     */
    MaterialPluginManager.prototype._activatePlugin = function (plugin) {
        if (this._activePlugins.indexOf(plugin) === -1) {
            this._activePlugins.push(plugin);
            this._activePlugins.sort(function (a, b) { return a.priority - b.priority; });
            this._material._callbackPluginEventIsReadyForSubMesh = this._handlePluginEventIsReadyForSubMesh.bind(this);
            this._material._callbackPluginEventPrepareDefinesBeforeAttributes = this._handlePluginEventPrepareDefinesBeforeAttributes.bind(this);
            this._material._callbackPluginEventPrepareDefines = this._handlePluginEventPrepareDefines.bind(this);
            this._material._callbackPluginEventBindForSubMesh = this._handlePluginEventBindForSubMesh.bind(this);
            if (plugin.registerForExtraEvents) {
                this._activePluginsForExtraEvents.push(plugin);
                this._activePluginsForExtraEvents.sort(function (a, b) { return a.priority - b.priority; });
                this._material._callbackPluginEventHasRenderTargetTextures = this._handlePluginEventHasRenderTargetTextures.bind(this);
                this._material._callbackPluginEventFillRenderTargetTextures = this._handlePluginEventFillRenderTargetTextures.bind(this);
                this._material._callbackPluginEventHardBindForSubMesh = this._handlePluginEventHardBindForSubMesh.bind(this);
            }
        }
    };
    /**
     * Gets a plugin from the list of plugins managed by this manager
     * @param name name of the plugin
     * @returns the plugin if found, else null
     */
    MaterialPluginManager.prototype.getPlugin = function (name) {
        for (var i = 0; i < this._plugins.length; ++i) {
            if (this._plugins[i].name === name) {
                return this._plugins[i];
            }
        }
        return null;
    };
    MaterialPluginManager.prototype._handlePluginEventIsReadyForSubMesh = function (eventData) {
        var isReady = true;
        for (var _i = 0, _a = this._activePlugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            isReady = isReady && plugin.isReadyForSubMesh(eventData.defines, this._scene, this._engine, eventData.subMesh);
        }
        eventData.isReadyForSubMesh = isReady;
    };
    MaterialPluginManager.prototype._handlePluginEventPrepareDefinesBeforeAttributes = function (eventData) {
        for (var _i = 0, _a = this._activePlugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.prepareDefinesBeforeAttributes(eventData.defines, this._scene, eventData.mesh);
        }
    };
    MaterialPluginManager.prototype._handlePluginEventPrepareDefines = function (eventData) {
        for (var _i = 0, _a = this._activePlugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.prepareDefines(eventData.defines, this._scene, eventData.mesh);
        }
    };
    MaterialPluginManager.prototype._handlePluginEventHardBindForSubMesh = function (eventData) {
        for (var _i = 0, _a = this._activePluginsForExtraEvents; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.hardBindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, eventData.subMesh);
        }
    };
    MaterialPluginManager.prototype._handlePluginEventBindForSubMesh = function (eventData) {
        for (var _i = 0, _a = this._activePlugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.bindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, eventData.subMesh);
        }
    };
    MaterialPluginManager.prototype._handlePluginEventHasRenderTargetTextures = function (eventData) {
        var hasRenderTargetTextures = false;
        for (var _i = 0, _a = this._activePluginsForExtraEvents; _i < _a.length; _i++) {
            var plugin = _a[_i];
            hasRenderTargetTextures = plugin.hasRenderTargetTextures();
            if (hasRenderTargetTextures) {
                break;
            }
        }
        eventData.hasRenderTargetTextures = hasRenderTargetTextures;
    };
    MaterialPluginManager.prototype._handlePluginEventFillRenderTargetTextures = function (eventData) {
        for (var _i = 0, _a = this._activePluginsForExtraEvents; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.fillRenderTargetTextures(eventData.renderTargets);
        }
    };
    MaterialPluginManager.prototype._handlePluginEvent = function (id, info) {
        var _a, _b, _c;
        switch (id) {
            case MaterialPluginEvent.GetActiveTextures: {
                var eventData = info;
                for (var _i = 0, _d = this._activePlugins; _i < _d.length; _i++) {
                    var plugin = _d[_i];
                    plugin.getActiveTextures(eventData.activeTextures);
                }
                break;
            }
            case MaterialPluginEvent.GetAnimatables: {
                var eventData = info;
                for (var _e = 0, _f = this._activePlugins; _e < _f.length; _e++) {
                    var plugin = _f[_e];
                    plugin.getAnimatables(eventData.animatables);
                }
                break;
            }
            case MaterialPluginEvent.HasTexture: {
                var eventData = info;
                var hasTexture = false;
                for (var _g = 0, _h = this._activePlugins; _g < _h.length; _g++) {
                    var plugin = _h[_g];
                    hasTexture = plugin.hasTexture(eventData.texture);
                    if (hasTexture) {
                        break;
                    }
                }
                eventData.hasTexture = hasTexture;
                break;
            }
            case MaterialPluginEvent.Disposed: {
                var eventData = info;
                for (var _j = 0, _k = this._plugins; _j < _k.length; _j++) {
                    var plugin = _k[_j];
                    plugin.dispose(eventData.forceDisposeTextures);
                }
                break;
            }
            case MaterialPluginEvent.GetDefineNames: {
                var eventData = info;
                eventData.defineNames = this._defineNamesFromPlugins;
                break;
            }
            case MaterialPluginEvent.PrepareEffect: {
                var eventData = info;
                for (var _l = 0, _m = this._activePlugins; _l < _m.length; _l++) {
                    var plugin = _m[_l];
                    eventData.fallbackRank = plugin.addFallbacks(eventData.defines, eventData.fallbacks, eventData.fallbackRank);
                    plugin.getAttributes(eventData.attributes, this._scene, eventData.mesh);
                }
                if (this._uniformList.length > 0) {
                    (_a = eventData.uniforms).push.apply(_a, this._uniformList);
                }
                if (this._samplerList.length > 0) {
                    (_b = eventData.samplers).push.apply(_b, this._samplerList);
                }
                if (this._uboList.length > 0) {
                    (_c = eventData.uniformBuffersNames).push.apply(_c, this._uboList);
                }
                eventData.customCode = this._injectCustomCode(eventData.customCode);
                break;
            }
            case MaterialPluginEvent.PrepareUniformBuffer: {
                var eventData = info;
                this._uboDeclaration = "";
                this._vertexDeclaration = "";
                this._fragmentDeclaration = "";
                this._uniformList = [];
                this._samplerList = [];
                this._uboList = [];
                for (var _o = 0, _p = this._plugins; _o < _p.length; _o++) {
                    var plugin = _p[_o];
                    var uniforms = plugin.getUniforms();
                    if (uniforms) {
                        if (uniforms.ubo) {
                            for (var _q = 0, _r = uniforms.ubo; _q < _r.length; _q++) {
                                var uniform = _r[_q];
                                eventData.ubo.addUniform(uniform.name, uniform.size);
                                this._uboDeclaration += "".concat(uniform.type, " ").concat(uniform.name, ";\r\n");
                                this._uniformList.push(uniform.name);
                            }
                        }
                        if (uniforms.vertex) {
                            this._vertexDeclaration += uniforms.vertex + "\r\n";
                        }
                        if (uniforms.fragment) {
                            this._fragmentDeclaration += uniforms.fragment + "\r\n";
                        }
                    }
                    plugin.getSamplers(this._samplerList);
                    plugin.getUniformBuffersNames(this._uboList);
                }
                break;
            }
        }
    };
    MaterialPluginManager.prototype._collectPointNames = function (shaderType, customCode) {
        if (!customCode) {
            return;
        }
        for (var pointName in customCode) {
            if (!this._codeInjectionPoints[shaderType]) {
                this._codeInjectionPoints[shaderType] = {};
            }
            this._codeInjectionPoints[shaderType][pointName] = true;
        }
    };
    MaterialPluginManager.prototype._injectCustomCode = function (existingCallback) {
        var _this = this;
        return function (shaderType, code) {
            var _a;
            if (existingCallback) {
                code = existingCallback(shaderType, code);
            }
            if (_this._uboDeclaration) {
                code = code.replace("#define ADDITIONAL_UBO_DECLARATION", _this._uboDeclaration);
            }
            if (_this._vertexDeclaration) {
                code = code.replace("#define ADDITIONAL_VERTEX_DECLARATION", _this._vertexDeclaration);
            }
            if (_this._fragmentDeclaration) {
                code = code.replace("#define ADDITIONAL_FRAGMENT_DECLARATION", _this._fragmentDeclaration);
            }
            var points = (_a = _this._codeInjectionPoints) === null || _a === void 0 ? void 0 : _a[shaderType];
            if (!points) {
                return code;
            }
            for (var pointName in points) {
                var injectedCode = "";
                for (var _i = 0, _b = _this._activePlugins; _i < _b.length; _i++) {
                    var plugin = _b[_i];
                    var customCode = plugin.getCustomCode(shaderType);
                    if (customCode === null || customCode === void 0 ? void 0 : customCode[pointName]) {
                        injectedCode += customCode[pointName] + "\r\n";
                    }
                }
                if (injectedCode.length > 0) {
                    if (pointName.charAt(0) === "!") {
                        // pointName is a regular expression
                        var rx = new RegExp(pointName.substring(1), "g");
                        var match = rx.exec(code);
                        while (match !== null) {
                            var newCode = injectedCode;
                            for (var i = 0; i < match.length; ++i) {
                                newCode = newCode.replace("$" + i, match[i]);
                            }
                            code = code.replace(match[0], newCode);
                            match = rx.exec(code);
                        }
                    }
                    else {
                        var fullPointName = "#define " + pointName;
                        code = code.replace(fullPointName, "\r\n" + injectedCode + "\r\n" + fullPointName);
                    }
                }
            }
            return code;
        };
    };
    /** Map a plugin class name to a #define name (used in the vertex/fragment shaders as a marker of the plugin usage) */
    MaterialPluginManager._MaterialPluginClassToMainDefine = {};
    MaterialPluginManager._MaterialPluginCounter = 0;
    return MaterialPluginManager;
}());

/**
 * Base class for material plugins.
 * @since 5.0
 */
var MaterialPluginBase = /** @class */ (function () {
    /**
     * Creates a new material plugin
     * @param material parent material of the plugin
     * @param name name of the plugin
     * @param priority priority of the plugin
     * @param defines list of defines used by the plugin. The value of the property is the default value for this property
     * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
     * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
     */
    function MaterialPluginBase(material, name, priority, defines, addToPluginList, enable) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        if (enable === void 0) { enable = false; }
        /**
         * Defines the priority of the plugin. Lower numbers run first.
         */
        this.priority = 500;
        /**
         * Indicates that this plugin should be notified for the extra events (HasRenderTargetTextures / FillRenderTargetTextures / HardBindForSubMesh)
         */
        this.registerForExtraEvents = false;
        this._material = material;
        this.name = name;
        this.priority = priority;
        if (!material.pluginManager) {
            material.pluginManager = new MaterialPluginManager(material);
        }
        this._pluginDefineNames = defines;
        this._pluginManager = material.pluginManager;
        if (addToPluginList) {
            this._pluginManager._addPlugin(this);
        }
        if (enable) {
            this._enable(true);
        }
        this.markAllDefinesAsDirty = material._dirtyCallbacks[63];
    }
    MaterialPluginBase.prototype._enable = function (enable) {
        if (enable) {
            this._pluginManager._activatePlugin(this);
        }
    };
    /**
     * Gets the current class name useful for serialization or dynamic coding.
     * @returns The class name.
     */
    MaterialPluginBase.prototype.getClassName = function () {
        return "MaterialPluginBase";
    };
    /**
     * Specifies that the submesh is ready to be used.
     * @param defines the list of "defines" to update.
     * @param scene defines the scene the material belongs to.
     * @param engine the engine this scene belongs to.
     * @param subMesh the submesh to check for readiness
     * @returns - boolean indicating that the submesh is ready or not.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.isReadyForSubMesh = function (defines, scene, engine, subMesh) {
        return true;
    };
    /**
     * Binds the material data (this function is called even if mustRebind() returns false)
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine defines the engine the material belongs to.
     * @param subMesh the submesh to bind data for
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.hardBindForSubMesh = function (uniformBuffer, scene, engine, subMesh) { };
    /**
     * Binds the material data.
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine the engine this scene belongs to.
     * @param subMesh the submesh to bind data for
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.bindForSubMesh = function (uniformBuffer, scene, engine, subMesh) { };
    /**
     * Disposes the resources of the material.
     * @param forceDisposeTextures - Forces the disposal of all textures.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.dispose = function (forceDisposeTextures) { };
    /**
     * Returns a list of custom shader code fragments to customize the shader.
     * @param shaderType "vertex" or "fragment"
     * @returns null if no code to be added, or a list of pointName => code.
     * Note that `pointName` can also be a regular expression if it starts with a `!`.
     * In that case, the string found by the regular expression (if any) will be
     * replaced by the code provided.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getCustomCode = function (shaderType) {
        return null;
    };
    /**
     * Collects all defines.
     * @param defines The object to append to.
     */
    MaterialPluginBase.prototype.collectDefines = function (defines) {
        if (!this._pluginDefineNames) {
            return;
        }
        for (var _i = 0, _a = Object.keys(this._pluginDefineNames); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key[0] === "_") {
                continue;
            }
            var type = typeof this._pluginDefineNames[key];
            defines[key] = {
                type: type === "number" ? "number" : type === "string" ? "string" : type === "boolean" ? "boolean" : "object",
                default: this._pluginDefineNames[key],
            };
        }
    };
    /**
     * Sets the defines for the next rendering. Called before MaterialHelper.PrepareDefinesForAttributes is called.
     * @param defines the list of "defines" to update.
     * @param scene defines the scene to the material belongs to.
     * @param mesh the mesh being rendered
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.prepareDefinesBeforeAttributes = function (defines, scene, mesh) { };
    /**
     * Sets the defines for the next rendering
     * @param defines the list of "defines" to update.
     * @param scene defines the scene to the material belongs to.
     * @param mesh the mesh being rendered
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.prepareDefines = function (defines, scene, mesh) { };
    /**
     * Checks to see if a texture is used in the material.
     * @param texture - Base texture to use.
     * @returns - Boolean specifying if a texture is used in the material.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.hasTexture = function (texture) {
        return false;
    };
    /**
     * Gets a boolean indicating that current material needs to register RTT
     * @returns true if this uses a render target otherwise false.
     */
    MaterialPluginBase.prototype.hasRenderTargetTextures = function () {
        return false;
    };
    /**
     * Fills the list of render target textures.
     * @param renderTargets the list of render targets to update
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.fillRenderTargetTextures = function (renderTargets) { };
    /**
     * Returns an array of the actively used textures.
     * @param activeTextures Array of BaseTextures
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getActiveTextures = function (activeTextures) { };
    /**
     * Returns the animatable textures.
     * @param animatables Array of animatable textures.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getAnimatables = function (animatables) { };
    /**
     * Add fallbacks to the effect fallbacks list.
     * @param defines defines the Base texture to use.
     * @param fallbacks defines the current fallback list.
     * @param currentRank defines the current fallback rank.
     * @returns the new fallback rank.
     */
    MaterialPluginBase.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        return currentRank;
    };
    /**
     * Gets the samplers used by the plugin.
     * @param samplers list that the sampler names should be added to.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getSamplers = function (samplers) { };
    /**
     * Gets the attributes used by the plugin.
     * @param attributes list that the attribute names should be added to.
     * @param scene the scene that the material belongs to.
     * @param mesh the mesh being rendered.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getAttributes = function (attributes, scene, mesh) { };
    /**
     * Gets the uniform buffers names added by the plugin.
     * @param ubos list that the ubo names should be added to.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MaterialPluginBase.prototype.getUniformBuffersNames = function (ubos) { };
    /**
     * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
     * @returns the description of the uniforms
     */
    MaterialPluginBase.prototype.getUniforms = function () {
        return {};
    };
    /**
     * Makes a duplicate of the current configuration into another one.
     * @param plugin define the config where to copy the info
     */
    MaterialPluginBase.prototype.copyTo = function (plugin) {
        SerializationHelper.Clone(function () { return plugin; }, this);
    };
    /**
     * Serializes this clear coat configuration.
     * @returns - An object with the serialized config.
     */
    MaterialPluginBase.prototype.serialize = function () {
        return SerializationHelper.Serialize(this);
    };
    /**
     * Parses a anisotropy Configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    MaterialPluginBase.prototype.parse = function (source, scene, rootUrl) {
        var _this = this;
        SerializationHelper.Parse(function () { return _this; }, source, scene, rootUrl);
    };
    __decorate([
        serialize()
    ], MaterialPluginBase.prototype, "name", void 0);
    __decorate([
        serialize()
    ], MaterialPluginBase.prototype, "priority", void 0);
    __decorate([
        serialize()
    ], MaterialPluginBase.prototype, "registerForExtraEvents", void 0);
    return MaterialPluginBase;
}());

/**
 * Configuration needed for prepass-capable materials
 */
var PrePassConfiguration = /** @class */ (function () {
    function PrePassConfiguration() {
        /**
         * Previous world matrices of meshes carrying this material
         * Used for computing velocity
         */
        this.previousWorldMatrices = {};
        /**
         * Previous bones of meshes carrying this material
         * Used for computing velocity
         */
        this.previousBones = {};
    }
    /**
     * Add the required uniforms to the current list.
     * @param uniforms defines the current uniform list.
     */
    PrePassConfiguration.AddUniforms = function (uniforms) {
        uniforms.push("previousWorld", "previousViewProjection", "mPreviousBones");
    };
    /**
     * Add the required samplers to the current list.
     * @param samplers defines the current sampler list.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PrePassConfiguration.AddSamplers = function (samplers) {
        // pass
    };
    /**
     * Binds the material data.
     * @param effect defines the effect to update
     * @param scene defines the scene the material belongs to.
     * @param mesh The mesh
     * @param world World matrix of this mesh
     * @param isFrozen Is the material frozen
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PrePassConfiguration.prototype.bindForSubMesh = function (effect, scene, mesh, world, isFrozen) {
        if (scene.prePassRenderer && scene.prePassRenderer.enabled && scene.prePassRenderer.currentRTisSceneRT) {
            if (scene.prePassRenderer.getIndex(2) !== -1) {
                if (!this.previousWorldMatrices[mesh.uniqueId]) {
                    this.previousWorldMatrices[mesh.uniqueId] = world.clone();
                }
                if (!this.previousViewProjection) {
                    this.previousViewProjection = scene.getTransformMatrix().clone();
                    this.currentViewProjection = scene.getTransformMatrix().clone();
                }
                var engine = scene.getEngine();
                if (this.currentViewProjection.updateFlag !== scene.getTransformMatrix().updateFlag) {
                    // First update of the prepass configuration for this rendering pass
                    this._lastUpdateFrameId = engine.frameId;
                    this.previousViewProjection.copyFrom(this.currentViewProjection);
                    this.currentViewProjection.copyFrom(scene.getTransformMatrix());
                }
                else if (this._lastUpdateFrameId !== engine.frameId) {
                    // The scene transformation did not change from the previous frame (so no camera motion), we must update previousViewProjection accordingly
                    this._lastUpdateFrameId = engine.frameId;
                    this.previousViewProjection.copyFrom(this.currentViewProjection);
                }
                effect.setMatrix("previousWorld", this.previousWorldMatrices[mesh.uniqueId]);
                effect.setMatrix("previousViewProjection", this.previousViewProjection);
                this.previousWorldMatrices[mesh.uniqueId] = world.clone();
            }
        }
    };
    return PrePassConfiguration;
}());

/**
 * This groups all the flags used to control the materials channel.
 */
var MaterialFlags = /** @class */ (function () {
    function MaterialFlags() {
    }
    Object.defineProperty(MaterialFlags, "DiffuseTextureEnabled", {
        /**
         * Are diffuse textures enabled in the application.
         */
        get: function () {
            return this._DiffuseTextureEnabled;
        },
        set: function (value) {
            if (this._DiffuseTextureEnabled === value) {
                return;
            }
            this._DiffuseTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "DetailTextureEnabled", {
        /**
         * Are detail textures enabled in the application.
         */
        get: function () {
            return this._DetailTextureEnabled;
        },
        set: function (value) {
            if (this._DetailTextureEnabled === value) {
                return;
            }
            this._DetailTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "AmbientTextureEnabled", {
        /**
         * Are ambient textures enabled in the application.
         */
        get: function () {
            return this._AmbientTextureEnabled;
        },
        set: function (value) {
            if (this._AmbientTextureEnabled === value) {
                return;
            }
            this._AmbientTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "OpacityTextureEnabled", {
        /**
         * Are opacity textures enabled in the application.
         */
        get: function () {
            return this._OpacityTextureEnabled;
        },
        set: function (value) {
            if (this._OpacityTextureEnabled === value) {
                return;
            }
            this._OpacityTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ReflectionTextureEnabled", {
        /**
         * Are reflection textures enabled in the application.
         */
        get: function () {
            return this._ReflectionTextureEnabled;
        },
        set: function (value) {
            if (this._ReflectionTextureEnabled === value) {
                return;
            }
            this._ReflectionTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "EmissiveTextureEnabled", {
        /**
         * Are emissive textures enabled in the application.
         */
        get: function () {
            return this._EmissiveTextureEnabled;
        },
        set: function (value) {
            if (this._EmissiveTextureEnabled === value) {
                return;
            }
            this._EmissiveTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "SpecularTextureEnabled", {
        /**
         * Are specular textures enabled in the application.
         */
        get: function () {
            return this._SpecularTextureEnabled;
        },
        set: function (value) {
            if (this._SpecularTextureEnabled === value) {
                return;
            }
            this._SpecularTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "BumpTextureEnabled", {
        /**
         * Are bump textures enabled in the application.
         */
        get: function () {
            return this._BumpTextureEnabled;
        },
        set: function (value) {
            if (this._BumpTextureEnabled === value) {
                return;
            }
            this._BumpTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "LightmapTextureEnabled", {
        /**
         * Are lightmap textures enabled in the application.
         */
        get: function () {
            return this._LightmapTextureEnabled;
        },
        set: function (value) {
            if (this._LightmapTextureEnabled === value) {
                return;
            }
            this._LightmapTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "RefractionTextureEnabled", {
        /**
         * Are refraction textures enabled in the application.
         */
        get: function () {
            return this._RefractionTextureEnabled;
        },
        set: function (value) {
            if (this._RefractionTextureEnabled === value) {
                return;
            }
            this._RefractionTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ColorGradingTextureEnabled", {
        /**
         * Are color grading textures enabled in the application.
         */
        get: function () {
            return this._ColorGradingTextureEnabled;
        },
        set: function (value) {
            if (this._ColorGradingTextureEnabled === value) {
                return;
            }
            this._ColorGradingTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "FresnelEnabled", {
        /**
         * Are fresnels enabled in the application.
         */
        get: function () {
            return this._FresnelEnabled;
        },
        set: function (value) {
            if (this._FresnelEnabled === value) {
                return;
            }
            this._FresnelEnabled = value;
            Engine.MarkAllMaterialsAsDirty(4);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ClearCoatTextureEnabled", {
        /**
         * Are clear coat textures enabled in the application.
         */
        get: function () {
            return this._ClearCoatTextureEnabled;
        },
        set: function (value) {
            if (this._ClearCoatTextureEnabled === value) {
                return;
            }
            this._ClearCoatTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ClearCoatBumpTextureEnabled", {
        /**
         * Are clear coat bump textures enabled in the application.
         */
        get: function () {
            return this._ClearCoatBumpTextureEnabled;
        },
        set: function (value) {
            if (this._ClearCoatBumpTextureEnabled === value) {
                return;
            }
            this._ClearCoatBumpTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ClearCoatTintTextureEnabled", {
        /**
         * Are clear coat tint textures enabled in the application.
         */
        get: function () {
            return this._ClearCoatTintTextureEnabled;
        },
        set: function (value) {
            if (this._ClearCoatTintTextureEnabled === value) {
                return;
            }
            this._ClearCoatTintTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "SheenTextureEnabled", {
        /**
         * Are sheen textures enabled in the application.
         */
        get: function () {
            return this._SheenTextureEnabled;
        },
        set: function (value) {
            if (this._SheenTextureEnabled === value) {
                return;
            }
            this._SheenTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "AnisotropicTextureEnabled", {
        /**
         * Are anisotropic textures enabled in the application.
         */
        get: function () {
            return this._AnisotropicTextureEnabled;
        },
        set: function (value) {
            if (this._AnisotropicTextureEnabled === value) {
                return;
            }
            this._AnisotropicTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "ThicknessTextureEnabled", {
        /**
         * Are thickness textures enabled in the application.
         */
        get: function () {
            return this._ThicknessTextureEnabled;
        },
        set: function (value) {
            if (this._ThicknessTextureEnabled === value) {
                return;
            }
            this._ThicknessTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "RefractionIntensityTextureEnabled", {
        /**
         * Are refraction intensity textures enabled in the application.
         */
        get: function () {
            return this._ThicknessTextureEnabled;
        },
        set: function (value) {
            if (this._RefractionIntensityTextureEnabled === value) {
                return;
            }
            this._RefractionIntensityTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "TranslucencyIntensityTextureEnabled", {
        /**
         * Are translucency intensity textures enabled in the application.
         */
        get: function () {
            return this._ThicknessTextureEnabled;
        },
        set: function (value) {
            if (this._TranslucencyIntensityTextureEnabled === value) {
                return;
            }
            this._TranslucencyIntensityTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialFlags, "IridescenceTextureEnabled", {
        /**
         * Are translucency intensity textures enabled in the application.
         */
        get: function () {
            return this._IridescenceTextureEnabled;
        },
        set: function (value) {
            if (this._IridescenceTextureEnabled === value) {
                return;
            }
            this._IridescenceTextureEnabled = value;
            Engine.MarkAllMaterialsAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    // Flags used to enable or disable a type of texture for all Standard Materials
    MaterialFlags._DiffuseTextureEnabled = true;
    MaterialFlags._DetailTextureEnabled = true;
    MaterialFlags._AmbientTextureEnabled = true;
    MaterialFlags._OpacityTextureEnabled = true;
    MaterialFlags._ReflectionTextureEnabled = true;
    MaterialFlags._EmissiveTextureEnabled = true;
    MaterialFlags._SpecularTextureEnabled = true;
    MaterialFlags._BumpTextureEnabled = true;
    MaterialFlags._LightmapTextureEnabled = true;
    MaterialFlags._RefractionTextureEnabled = true;
    MaterialFlags._ColorGradingTextureEnabled = true;
    MaterialFlags._FresnelEnabled = true;
    MaterialFlags._ClearCoatTextureEnabled = true;
    MaterialFlags._ClearCoatBumpTextureEnabled = true;
    MaterialFlags._ClearCoatTintTextureEnabled = true;
    MaterialFlags._SheenTextureEnabled = true;
    MaterialFlags._AnisotropicTextureEnabled = true;
    MaterialFlags._ThicknessTextureEnabled = true;
    MaterialFlags._RefractionIntensityTextureEnabled = true;
    MaterialFlags._TranslucencyIntensityTextureEnabled = true;
    MaterialFlags._IridescenceTextureEnabled = true;
    return MaterialFlags;
}());

// Do not edit.
var name = "prePassDeclaration";
var shader = "#ifdef PREPASS\n#extension GL_EXT_draw_buffers : require\nlayout(location=0) out highp vec4 glFragData[{X}];highp vec4 gl_FragColor;\n#ifdef PREPASS_DEPTH\nvarying highp vec3 vViewPos;\n#endif\n#ifdef PREPASS_VELOCITY\nvarying highp vec4 vCurrentPosition;varying highp vec4 vPreviousPosition;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;

// Do not edit.
var name$1 = "oitDeclaration";
var shader$1 = "#ifdef ORDER_INDEPENDENT_TRANSPARENCY\n#extension GL_EXT_draw_buffers : require\nlayout(location=0) out vec2 depth; \nlayout(location=1) out vec4 frontColor;\nlayout(location=2) out vec4 backColor;\n#define MAX_DEPTH 99999.0\nhighp vec4 gl_FragColor;\nuniform sampler2D oitDepthSampler;\nuniform sampler2D oitFrontColorSampler;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$1] = shader$1;

// Do not edit.
var name$2 = "sceneUboDeclaration";
var shader$2 = "layout(std140,column_major) uniform;\nuniform Scene {\nmat4 viewProjection;\n#ifdef MULTIVIEW\nmat4 viewProjectionR;\n#endif \nmat4 view;\nmat4 projection;\nvec4 vEyePosition;\n};\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$2] = shader$2;

// Do not edit.
var name$3 = "meshUboDeclaration";
var shader$3 = "#ifdef WEBGL2\nuniform mat4 world;\nuniform float visibility;\n#else\nlayout(std140,column_major) uniform;\nuniform Mesh\n{\nmat4 world;\nfloat visibility;\n};\n#endif\n#define WORLD_UBO\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$3] = shader$3;

// Do not edit.
var name$4 = "mainUVVaryingDeclaration";
var shader$4 = "#ifdef MAINUV{X}\nvarying vec2 vMainUV{X};\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$4] = shader$4;

// Do not edit.
var name$5 = "lightFragmentDeclaration";
var shader$5 = "#ifdef LIGHT{X}\nuniform vec4 vLightData{X};\nuniform vec4 vLightDiffuse{X};\n#ifdef SPECULARTERM\nuniform vec4 vLightSpecular{X};\n#else\nvec4 vLightSpecular{X}=vec4(0.);\n#endif\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float cascadeBlendFactor{X};\nvarying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromCamera{X};\n#if defined(SHADOWPCSS{X})\nuniform highp sampler2DArrayShadow shadowSampler{X};\nuniform highp sampler2DArray depthSampler{X};\nuniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float penumbraDarkness{X};\n#elif defined(SHADOWPCF{X})\nuniform highp sampler2DArrayShadow shadowSampler{X};\n#else\nuniform highp sampler2DArray shadowSampler{X};\n#endif\n#ifdef SHADOWCSMDEBUG{X}\nconst vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]\n(\nvec3 ( 1.5,0.0,0.0 ),\nvec3 ( 0.0,1.5,0.0 ),\nvec3 ( 0.0,0.0,5.5 ),\nvec3 ( 1.5,0.0,5.5 ),\nvec3 ( 1.5,1.5,0.0 ),\nvec3 ( 1.0,1.0,1.0 ),\nvec3 ( 0.0,1.0,5.5 ),\nvec3 ( 0.5,3.5,0.75 )\n);\nvec3 shadowDebug{X};\n#endif\n#ifdef SHADOWCSMUSESHADOWMAXZ{X}\nint index{X}=-1;\n#else\nint index{X}=SHADOWCSMNUM_CASCADES{X}-1;\n#endif\nfloat diff{X}=0.;\n#elif defined(SHADOWCUBE{X})\nuniform samplerCube shadowSampler{X};\n#else\nvarying vec4 vPositionFromLight{X};\nvarying float vDepthMetric{X};\n#if defined(SHADOWPCSS{X})\nuniform highp sampler2DShadow shadowSampler{X};\nuniform highp sampler2D depthSampler{X};\n#elif defined(SHADOWPCF{X})\nuniform highp sampler2DShadow shadowSampler{X};\n#else\nuniform sampler2D shadowSampler{X};\n#endif\nuniform mat4 lightMatrix{X};\n#endif\nuniform vec4 shadowsInfo{X};\nuniform vec2 depthValues{X};\n#endif\n#ifdef SPOTLIGHT{X}\nuniform vec4 vLightDirection{X};\nuniform vec4 vLightFalloff{X};\n#elif defined(POINTLIGHT{X})\nuniform vec4 vLightFalloff{X};\n#elif defined(HEMILIGHT{X})\nuniform vec3 vLightGround{X};\n#endif\n#ifdef PROJECTEDLIGHTTEXTURE{X}\nuniform mat4 textureProjectionMatrix{X};\nuniform sampler2D projectionLightSampler{X};\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$5] = shader$5;

// Do not edit.
var name$6 = "lightUboDeclaration";
var shader$6 = "#ifdef LIGHT{X}\nuniform Light{X}\n{\nvec4 vLightData;\nvec4 vLightDiffuse;\nvec4 vLightSpecular;\n#ifdef SPOTLIGHT{X}\nvec4 vLightDirection;\nvec4 vLightFalloff;\n#elif defined(POINTLIGHT{X})\nvec4 vLightFalloff;\n#elif defined(HEMILIGHT{X})\nvec3 vLightGround;\n#endif\nvec4 shadowsInfo;\nvec2 depthValues;\n} light{X};\n#ifdef PROJECTEDLIGHTTEXTURE{X}\nuniform mat4 textureProjectionMatrix{X};\nuniform sampler2D projectionLightSampler{X};\n#endif\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float cascadeBlendFactor{X};\nvarying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromCamera{X};\n#if defined(SHADOWPCSS{X})\nuniform highp sampler2DArrayShadow shadowSampler{X};\nuniform highp sampler2DArray depthSampler{X};\nuniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];\nuniform float penumbraDarkness{X};\n#elif defined(SHADOWPCF{X})\nuniform highp sampler2DArrayShadow shadowSampler{X};\n#else\nuniform highp sampler2DArray shadowSampler{X};\n#endif\n#ifdef SHADOWCSMDEBUG{X}\nconst vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]\n(\nvec3 ( 1.5,0.0,0.0 ),\nvec3 ( 0.0,1.5,0.0 ),\nvec3 ( 0.0,0.0,5.5 ),\nvec3 ( 1.5,0.0,5.5 ),\nvec3 ( 1.5,1.5,0.0 ),\nvec3 ( 1.0,1.0,1.0 ),\nvec3 ( 0.0,1.0,5.5 ),\nvec3 ( 0.5,3.5,0.75 )\n);\nvec3 shadowDebug{X};\n#endif\n#ifdef SHADOWCSMUSESHADOWMAXZ{X}\nint index{X}=-1;\n#else\nint index{X}=SHADOWCSMNUM_CASCADES{X}-1;\n#endif\nfloat diff{X}=0.;\n#elif defined(SHADOWCUBE{X})\nuniform samplerCube shadowSampler{X}; \n#else\nvarying vec4 vPositionFromLight{X};\nvarying float vDepthMetric{X};\n#if defined(SHADOWPCSS{X})\nuniform highp sampler2DShadow shadowSampler{X};\nuniform highp sampler2D depthSampler{X};\n#elif defined(SHADOWPCF{X})\nuniform highp sampler2DShadow shadowSampler{X};\n#else\nuniform sampler2D shadowSampler{X};\n#endif\nuniform mat4 lightMatrix{X};\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$6] = shader$6;

// Do not edit.
var name$7 = "samplerFragmentDeclaration";
var shader$7 = "#ifdef _DEFINENAME_\n#if _DEFINENAME_DIRECTUV==1\n#define v_VARYINGNAME_UV vMainUV1\n#elif _DEFINENAME_DIRECTUV==2\n#define v_VARYINGNAME_UV vMainUV2\n#elif _DEFINENAME_DIRECTUV==3\n#define v_VARYINGNAME_UV vMainUV3\n#elif _DEFINENAME_DIRECTUV==4\n#define v_VARYINGNAME_UV vMainUV4\n#elif _DEFINENAME_DIRECTUV==5\n#define v_VARYINGNAME_UV vMainUV5\n#elif _DEFINENAME_DIRECTUV==6\n#define v_VARYINGNAME_UV vMainUV6\n#else\nvarying vec2 v_VARYINGNAME_UV;\n#endif\nuniform sampler2D _SAMPLERNAME_Sampler;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$7] = shader$7;

// Do not edit.
var name$8 = "imageProcessingDeclaration";
var shader$8 = "#ifdef EXPOSURE\nuniform float exposureLinear;\n#endif\n#ifdef CONTRAST\nuniform float contrast;\n#endif\n#ifdef VIGNETTE\nuniform vec2 vInverseScreenSize;\nuniform vec4 vignetteSettings1;\nuniform vec4 vignetteSettings2;\n#endif\n#ifdef COLORCURVES\nuniform vec4 vCameraColorCurveNegative;\nuniform vec4 vCameraColorCurveNeutral;\nuniform vec4 vCameraColorCurvePositive;\n#endif\n#ifdef COLORGRADING\n#ifdef COLORGRADING3D\nuniform highp sampler3D txColorTransform;\n#else\nuniform sampler2D txColorTransform;\n#endif\nuniform vec4 colorTransformSettings;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$8] = shader$8;

// Do not edit.
var name$9 = "clipPlaneFragmentDeclaration";
var shader$9 = "#ifdef CLIPPLANE\nvarying float fClipDistance;\n#endif\n#ifdef CLIPPLANE2\nvarying float fClipDistance2;\n#endif\n#ifdef CLIPPLANE3\nvarying float fClipDistance3;\n#endif\n#ifdef CLIPPLANE4\nvarying float fClipDistance4;\n#endif\n#ifdef CLIPPLANE5\nvarying float fClipDistance5;\n#endif\n#ifdef CLIPPLANE6\nvarying float fClipDistance6;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$9] = shader$9;

// Do not edit.
var name$a = "logDepthDeclaration";
var shader$a = "#ifdef LOGARITHMICDEPTH\nuniform float logarithmicDepthConstant;\nvarying float vFragmentDepth;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$a] = shader$a;

// Do not edit.
var name$b = "fogFragmentDeclaration";
var shader$b = "#ifdef FOG\n#define FOGMODE_NONE 0.\n#define FOGMODE_EXP 1.\n#define FOGMODE_EXP2 2.\n#define FOGMODE_LINEAR 3.\n#define E 2.71828\nuniform vec4 vFogInfos;\nuniform vec3 vFogColor;\nvarying vec3 vFogDistance;\nfloat CalcFogFactor()\n{\nfloat fogCoeff=1.0;\nfloat fogStart=vFogInfos.y;\nfloat fogEnd=vFogInfos.z;\nfloat fogDensity=vFogInfos.w;\nfloat fogDistance=length(vFogDistance);\nif (FOGMODE_LINEAR==vFogInfos.x)\n{\nfogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);\n}\nelse if (FOGMODE_EXP==vFogInfos.x)\n{\nfogCoeff=1.0/pow(E,fogDistance*fogDensity);\n}\nelse if (FOGMODE_EXP2==vFogInfos.x)\n{\nfogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);\n}\nreturn clamp(fogCoeff,0.0,1.0);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$b] = shader$b;

// Do not edit.
var name$c = "imageProcessingFunctions";
var shader$c = "#if defined(COLORGRADING) && !defined(COLORGRADING3D)\n/** \n* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.\n* sampler3dSetting.x=textureOffset (0.5/textureSize).\n* sampler3dSetting.y=textureSize.\n*/\n#define inline\nvec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)\n{\nfloat sliceSize=2.0*sampler3dSetting.x; \n#ifdef SAMPLER3DGREENDEPTH\nfloat sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;\n#else\nfloat sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;\n#endif\nfloat sliceInteger=floor(sliceContinuous);\nfloat sliceFraction=sliceContinuous-sliceInteger;\n#ifdef SAMPLER3DGREENDEPTH\nvec2 sliceUV=color.rb;\n#else\nvec2 sliceUV=color.rg;\n#endif\nsliceUV.x*=sliceSize;\nsliceUV.x+=sliceInteger*sliceSize;\nsliceUV=saturate(sliceUV);\nvec4 slice0Color=texture2D(colorTransform,sliceUV);\nsliceUV.x+=sliceSize;\nsliceUV=saturate(sliceUV);\nvec4 slice1Color=texture2D(colorTransform,sliceUV);\nvec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);\n#ifdef SAMPLER3DBGRMAP\ncolor.rgb=result.rgb;\n#else\ncolor.rgb=result.bgr;\n#endif\nreturn color;\n}\n#endif\n#ifdef TONEMAPPING_ACES\nconst mat3 ACESInputMat=mat3(\nvec3(0.59719,0.07600,0.02840),\nvec3(0.35458,0.90834,0.13383),\nvec3(0.04823,0.01566,0.83777)\n);\nconst mat3 ACESOutputMat=mat3(\nvec3( 1.60475,-0.10208,-0.00327),\nvec3(-0.53108, 1.10813,-0.07276),\nvec3(-0.07367,-0.00605, 1.07602)\n);\nvec3 RRTAndODTFit(vec3 v)\n{\nvec3 a=v*(v+0.0245786)-0.000090537;\nvec3 b=v*(0.983729*v+0.4329510)+0.238081;\nreturn a/b;\n}\nvec3 ACESFitted(vec3 color)\n{\ncolor=ACESInputMat*color;\ncolor=RRTAndODTFit(color);\ncolor=ACESOutputMat*color;\ncolor=saturate(color);\nreturn color;\n}\n#endif\nvec4 applyImageProcessing(vec4 result) {\n#ifdef EXPOSURE\nresult.rgb*=exposureLinear;\n#endif\n#ifdef VIGNETTE\nvec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;\nviewportXY=viewportXY*2.0-1.0;\nvec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);\nfloat vignetteTerm=dot(vignetteXY1,vignetteXY1);\nfloat vignette=pow(vignetteTerm,vignetteSettings2.w);\nvec3 vignetteColor=vignetteSettings2.rgb;\n#ifdef VIGNETTEBLENDMODEMULTIPLY\nvec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);\nresult.rgb*=vignetteColorMultiplier;\n#endif\n#ifdef VIGNETTEBLENDMODEOPAQUE\nresult.rgb=mix(vignetteColor,result.rgb,vignette);\n#endif\n#endif\n#ifdef TONEMAPPING\n#ifdef TONEMAPPING_ACES\nresult.rgb=ACESFitted(result.rgb);\n#else\nconst float tonemappingCalibration=1.590579;\nresult.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);\n#endif\n#endif\nresult.rgb=toGammaSpace(result.rgb);\nresult.rgb=saturate(result.rgb);\n#ifdef CONTRAST\nvec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);\nif (contrast<1.0) {\nresult.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);\n} else {\nresult.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);\n}\n#endif\n#ifdef COLORGRADING\nvec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;\n#ifdef COLORGRADING3D\nvec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;\n#else\nvec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;\n#endif\nresult.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);\n#endif\n#ifdef COLORCURVES\nfloat luma=getLuminance(result.rgb);\nvec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));\nvec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;\nresult.rgb*=colorCurve.rgb;\nresult.rgb=mix(vec3(luma),result.rgb,colorCurve.a);\n#endif\nreturn result;\n}";
// Sideeffect
ShaderStore.IncludesShadersStore[name$c] = shader$c;

// Do not edit.
var name$d = "shadowsFragmentFunctions";
var shader$d = "#ifdef SHADOWS\n#ifndef SHADOWFLOAT\nfloat unpack(vec4 color)\n{\nconst vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);\nreturn dot(color,bit_shift);\n}\n#endif\nfloat computeFallOff(float value,vec2 clipSpace,float frustumEdgeFalloff)\n{\nfloat mask=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));\nreturn mix(value,1.0,mask);\n}\n#define inline\nfloat computeShadowCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,vec2 depthValues)\n{\nvec3 directionToLight=vPositionW-lightPosition;\nfloat depth=length(directionToLight);\ndepth=(depth+depthValues.x)/(depthValues.y);\ndepth=clamp(depth,0.,1.0);\ndirectionToLight=normalize(directionToLight);\ndirectionToLight.y=-directionToLight.y;\n#ifndef SHADOWFLOAT\nfloat shadow=unpack(textureCube(shadowSampler,directionToLight));\n#else\nfloat shadow=textureCube(shadowSampler,directionToLight).x;\n#endif\nreturn depth>shadow ? darkness : 1.0;\n}\n#define inline\nfloat computeShadowWithPoissonSamplingCube(vec3 lightPosition,samplerCube shadowSampler,float mapSize,float darkness,vec2 depthValues)\n{\nvec3 directionToLight=vPositionW-lightPosition;\nfloat depth=length(directionToLight);\ndepth=(depth+depthValues.x)/(depthValues.y);\ndepth=clamp(depth,0.,1.0);\ndirectionToLight=normalize(directionToLight);\ndirectionToLight.y=-directionToLight.y;\nfloat visibility=1.;\nvec3 poissonDisk[4];\npoissonDisk[0]=vec3(-1.0,1.0,-1.0);\npoissonDisk[1]=vec3(1.0,-1.0,-1.0);\npoissonDisk[2]=vec3(-1.0,-1.0,-1.0);\npoissonDisk[3]=vec3(1.0,-1.0,1.0);\n#ifndef SHADOWFLOAT\nif (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) visibility-=0.25;\nif (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) visibility-=0.25;\nif (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) visibility-=0.25;\nif (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) visibility-=0.25;\n#else\nif (textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) visibility-=0.25;\nif (textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) visibility-=0.25;\nif (textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) visibility-=0.25;\nif (textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) visibility-=0.25;\n#endif\nreturn min(1.0,visibility+darkness);\n}\n#define inline\nfloat computeShadowWithESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)\n{\nvec3 directionToLight=vPositionW-lightPosition;\nfloat depth=length(directionToLight);\ndepth=(depth+depthValues.x)/(depthValues.y);\nfloat shadowPixelDepth=clamp(depth,0.,1.0);\ndirectionToLight=normalize(directionToLight);\ndirectionToLight.y=-directionToLight.y;\n#ifndef SHADOWFLOAT\nfloat shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));\n#else\nfloat shadowMapSample=textureCube(shadowSampler,directionToLight).x;\n#endif\nfloat esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness); \nreturn esm;\n}\n#define inline\nfloat computeShadowWithCloseESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)\n{\nvec3 directionToLight=vPositionW-lightPosition;\nfloat depth=length(directionToLight);\ndepth=(depth+depthValues.x)/(depthValues.y);\nfloat shadowPixelDepth=clamp(depth,0.,1.0);\ndirectionToLight=normalize(directionToLight);\ndirectionToLight.y=-directionToLight.y;\n#ifndef SHADOWFLOAT\nfloat shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));\n#else\nfloat shadowMapSample=textureCube(shadowSampler,directionToLight).x;\n#endif\nfloat esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);\nreturn esm;\n}\n#if defined(WEBGL2) || defined(WEBGPU)\n#define inline\nfloat computeShadowCSM(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray shadowSampler,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec2 uv=0.5*clipSpace.xy+vec2(0.5);\nvec3 uvLayer=vec3(uv.x,uv.y,layer);\nfloat shadowPixelDepth=clamp(depthMetric,0.,1.0);\n#ifndef SHADOWFLOAT\nfloat shadow=unpack(texture2D(shadowSampler,uvLayer));\n#else\nfloat shadow=texture2D(shadowSampler,uvLayer).x;\n#endif\nreturn shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;\n}\n#endif\n#define inline\nfloat computeShadow(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec2 uv=0.5*clipSpace.xy+vec2(0.5);\nif (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)\n{\nreturn 1.0;\n}\nelse\n{\nfloat shadowPixelDepth=clamp(depthMetric,0.,1.0);\n#ifndef SHADOWFLOAT\nfloat shadow=unpack(texture2D(shadowSampler,uv));\n#else\nfloat shadow=texture2D(shadowSampler,uv).x;\n#endif\nreturn shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;\n}\n}\n#define inline\nfloat computeShadowWithPoissonSampling(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float mapSize,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec2 uv=0.5*clipSpace.xy+vec2(0.5);\nif (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)\n{\nreturn 1.0;\n}\nelse\n{\nfloat shadowPixelDepth=clamp(depthMetric,0.,1.0);\nfloat visibility=1.;\nvec2 poissonDisk[4];\npoissonDisk[0]=vec2(-0.94201624,-0.39906216);\npoissonDisk[1]=vec2(0.94558609,-0.76890725);\npoissonDisk[2]=vec2(-0.094184101,-0.92938870);\npoissonDisk[3]=vec2(0.34495938,0.29387760);\n#ifndef SHADOWFLOAT\nif (unpack(texture2D(shadowSampler,uv+poissonDisk[0]*mapSize))<shadowPixelDepth) visibility-=0.25;\nif (unpack(texture2D(shadowSampler,uv+poissonDisk[1]*mapSize))<shadowPixelDepth) visibility-=0.25;\nif (unpack(texture2D(shadowSampler,uv+poissonDisk[2]*mapSize))<shadowPixelDepth) visibility-=0.25;\nif (unpack(texture2D(shadowSampler,uv+poissonDisk[3]*mapSize))<shadowPixelDepth) visibility-=0.25;\n#else\nif (texture2D(shadowSampler,uv+poissonDisk[0]*mapSize).x<shadowPixelDepth) visibility-=0.25;\nif (texture2D(shadowSampler,uv+poissonDisk[1]*mapSize).x<shadowPixelDepth) visibility-=0.25;\nif (texture2D(shadowSampler,uv+poissonDisk[2]*mapSize).x<shadowPixelDepth) visibility-=0.25;\nif (texture2D(shadowSampler,uv+poissonDisk[3]*mapSize).x<shadowPixelDepth) visibility-=0.25;\n#endif\nreturn computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#define inline\nfloat computeShadowWithESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec2 uv=0.5*clipSpace.xy+vec2(0.5);\nif (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)\n{\nreturn 1.0;\n}\nelse\n{\nfloat shadowPixelDepth=clamp(depthMetric,0.,1.0);\n#ifndef SHADOWFLOAT\nfloat shadowMapSample=unpack(texture2D(shadowSampler,uv));\n#else\nfloat shadowMapSample=texture2D(shadowSampler,uv).x;\n#endif\nfloat esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);\nreturn computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#define inline\nfloat computeShadowWithCloseESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec2 uv=0.5*clipSpace.xy+vec2(0.5);\nif (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)\n{\nreturn 1.0;\n}\nelse\n{\nfloat shadowPixelDepth=clamp(depthMetric,0.,1.0); \n#ifndef SHADOWFLOAT\nfloat shadowMapSample=unpack(texture2D(shadowSampler,uv));\n#else\nfloat shadowMapSample=texture2D(shadowSampler,uv).x;\n#endif\nfloat esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);\nreturn computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#ifdef IS_NDC_HALF_ZRANGE\n#define ZINCLIP clipSpace.z\n#else\n#define ZINCLIP uvDepth.z\n#endif\n#if defined(WEBGL2) || defined(WEBGPU)\n#define GREATEST_LESS_THAN_ONE 0.99999994\n#define inline\nfloat computeShadowWithCSMPCF1(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);\nvec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);\nfloat shadow=texture2D(shadowSampler,uvDepthLayer);\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n#define inline\nfloat computeShadowWithCSMPCF3(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);\nvec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; \nuv+=0.5; \nvec2 st=fract(uv); \nvec2 base_uv=floor(uv)-0.5; \nbase_uv*=shadowMapSizeAndInverse.y; \nvec2 uvw0=3.-2.*st;\nvec2 uvw1=1.+2.*st;\nvec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;\nvec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;\nfloat shadow=0.;\nshadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));\nshadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));\nshadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));\nshadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));\nshadow=shadow/16.;\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n#define inline\nfloat computeShadowWithCSMPCF5(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);\nvec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; \nuv+=0.5; \nvec2 st=fract(uv); \nvec2 base_uv=floor(uv)-0.5; \nbase_uv*=shadowMapSizeAndInverse.y; \nvec2 uvw0=4.-3.*st;\nvec2 uvw1=vec2(7.);\nvec2 uvw2=1.+3.*st;\nvec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;\nvec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;\nfloat shadow=0.;\nshadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));\nshadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));\nshadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[0]),layer,uvDepth.z));\nshadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));\nshadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));\nshadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[1]),layer,uvDepth.z));\nshadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[2]),layer,uvDepth.z));\nshadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[2]),layer,uvDepth.z));\nshadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[2]),layer,uvDepth.z));\nshadow=shadow/144.;\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n#define inline\nfloat computeShadowWithPCF1(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,float darkness,float frustumEdgeFalloff)\n{\nif (depthMetric>1.0 || depthMetric<0.0) {\nreturn 1.0;\n}\nelse\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=ZINCLIP;\nfloat shadow=texture2D(shadowSampler,uvDepth);\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#define inline\nfloat computeShadowWithPCF3(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)\n{\nif (depthMetric>1.0 || depthMetric<0.0) {\nreturn 1.0;\n}\nelse\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=ZINCLIP;\nvec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; \nuv+=0.5; \nvec2 st=fract(uv); \nvec2 base_uv=floor(uv)-0.5; \nbase_uv*=shadowMapSizeAndInverse.y; \nvec2 uvw0=3.-2.*st;\nvec2 uvw1=1.+2.*st;\nvec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;\nvec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;\nfloat shadow=0.;\nshadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z));\nshadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z));\nshadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z));\nshadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z));\nshadow=shadow/16.;\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#define inline\nfloat computeShadowWithPCF5(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)\n{\nif (depthMetric>1.0 || depthMetric<0.0) {\nreturn 1.0;\n}\nelse\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=ZINCLIP;\nvec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; \nuv+=0.5; \nvec2 st=fract(uv); \nvec2 base_uv=floor(uv)-0.5; \nbase_uv*=shadowMapSizeAndInverse.y; \nvec2 uvw0=4.-3.*st;\nvec2 uvw1=vec2(7.);\nvec2 uvw2=1.+3.*st;\nvec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;\nvec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;\nfloat shadow=0.;\nshadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z));\nshadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z));\nshadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[0]),uvDepth.z));\nshadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z));\nshadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z));\nshadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[1]),uvDepth.z));\nshadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[2]),uvDepth.z));\nshadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[2]),uvDepth.z));\nshadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[2]),uvDepth.z));\nshadow=shadow/144.;\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n}\nconst vec3 PoissonSamplers32[64]=vec3[64](\nvec3(0.06407013,0.05409927,0.),\nvec3(0.7366577,0.5789394,0.),\nvec3(-0.6270542,-0.5320278,0.),\nvec3(-0.4096107,0.8411095,0.),\nvec3(0.6849564,-0.4990818,0.),\nvec3(-0.874181,-0.04579735,0.),\nvec3(0.9989998,0.0009880066,0.),\nvec3(-0.004920578,-0.9151649,0.),\nvec3(0.1805763,0.9747483,0.),\nvec3(-0.2138451,0.2635818,0.),\nvec3(0.109845,0.3884785,0.),\nvec3(0.06876755,-0.3581074,0.),\nvec3(0.374073,-0.7661266,0.),\nvec3(0.3079132,-0.1216763,0.),\nvec3(-0.3794335,-0.8271583,0.),\nvec3(-0.203878,-0.07715034,0.),\nvec3(0.5912697,0.1469799,0.),\nvec3(-0.88069,0.3031784,0.),\nvec3(0.5040108,0.8283722,0.),\nvec3(-0.5844124,0.5494877,0.),\nvec3(0.6017799,-0.1726654,0.),\nvec3(-0.5554981,0.1559997,0.),\nvec3(-0.3016369,-0.3900928,0.),\nvec3(-0.5550632,-0.1723762,0.),\nvec3(0.925029,0.2995041,0.),\nvec3(-0.2473137,0.5538505,0.),\nvec3(0.9183037,-0.2862392,0.),\nvec3(0.2469421,0.6718712,0.),\nvec3(0.3916397,-0.4328209,0.),\nvec3(-0.03576927,-0.6220032,0.),\nvec3(-0.04661255,0.7995201,0.),\nvec3(0.4402924,0.3640312,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.),\nvec3(0.,0.,0.)\n);\nconst vec3 PoissonSamplers64[64]=vec3[64](\nvec3(-0.613392,0.617481,0.),\nvec3(0.170019,-0.040254,0.),\nvec3(-0.299417,0.791925,0.),\nvec3(0.645680,0.493210,0.),\nvec3(-0.651784,0.717887,0.),\nvec3(0.421003,0.027070,0.),\nvec3(-0.817194,-0.271096,0.),\nvec3(-0.705374,-0.668203,0.),\nvec3(0.977050,-0.108615,0.),\nvec3(0.063326,0.142369,0.),\nvec3(0.203528,0.214331,0.),\nvec3(-0.667531,0.326090,0.),\nvec3(-0.098422,-0.295755,0.),\nvec3(-0.885922,0.215369,0.),\nvec3(0.566637,0.605213,0.),\nvec3(0.039766,-0.396100,0.),\nvec3(0.751946,0.453352,0.),\nvec3(0.078707,-0.715323,0.),\nvec3(-0.075838,-0.529344,0.),\nvec3(0.724479,-0.580798,0.),\nvec3(0.222999,-0.215125,0.),\nvec3(-0.467574,-0.405438,0.),\nvec3(-0.248268,-0.814753,0.),\nvec3(0.354411,-0.887570,0.),\nvec3(0.175817,0.382366,0.),\nvec3(0.487472,-0.063082,0.),\nvec3(-0.084078,0.898312,0.),\nvec3(0.488876,-0.783441,0.),\nvec3(0.470016,0.217933,0.),\nvec3(-0.696890,-0.549791,0.),\nvec3(-0.149693,0.605762,0.),\nvec3(0.034211,0.979980,0.),\nvec3(0.503098,-0.308878,0.),\nvec3(-0.016205,-0.872921,0.),\nvec3(0.385784,-0.393902,0.),\nvec3(-0.146886,-0.859249,0.),\nvec3(0.643361,0.164098,0.),\nvec3(0.634388,-0.049471,0.),\nvec3(-0.688894,0.007843,0.),\nvec3(0.464034,-0.188818,0.),\nvec3(-0.440840,0.137486,0.),\nvec3(0.364483,0.511704,0.),\nvec3(0.034028,0.325968,0.),\nvec3(0.099094,-0.308023,0.),\nvec3(0.693960,-0.366253,0.),\nvec3(0.678884,-0.204688,0.),\nvec3(0.001801,0.780328,0.),\nvec3(0.145177,-0.898984,0.),\nvec3(0.062655,-0.611866,0.),\nvec3(0.315226,-0.604297,0.),\nvec3(-0.780145,0.486251,0.),\nvec3(-0.371868,0.882138,0.),\nvec3(0.200476,0.494430,0.),\nvec3(-0.494552,-0.711051,0.),\nvec3(0.612476,0.705252,0.),\nvec3(-0.578845,-0.768792,0.),\nvec3(-0.772454,-0.090976,0.),\nvec3(0.504440,0.372295,0.),\nvec3(0.155736,0.065157,0.),\nvec3(0.391522,0.849605,0.),\nvec3(-0.620106,-0.328104,0.),\nvec3(0.789239,-0.419965,0.),\nvec3(-0.545396,0.538133,0.),\nvec3(-0.178564,-0.596057,0.)\n);\n#define inline\nfloat computeShadowWithCSMPCSS(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);\nvec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);\nfloat blockerDepth=0.0;\nfloat sumBlockerDepth=0.0;\nfloat numBlocker=0.0;\nfor (int i=0; i<searchTapCount; i ++) {\nblockerDepth=texture2D(depthSampler,vec3(uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer)).r;\nif (blockerDepth<depthMetric) {\nsumBlockerDepth+=blockerDepth;\nnumBlocker++;\n}\n}\nif (numBlocker<1.0) {\nreturn 1.0;\n}\nelse\n{\nfloat avgBlockerDepth=sumBlockerDepth/numBlocker;\nfloat AAOffset=shadowMapSizeInverse*10.;\nfloat penumbraRatio=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);\nvec4 filterRadius=vec4(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);\nfloat random=getRand(vPositionFromLight.xy);\nfloat rotationAngle=random*3.1415926;\nvec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));\nfloat shadow=0.;\nfor (int i=0; i<pcfTapCount; i++) {\nvec4 offset=vec4(poissonSamplers[i],0.);\noffset=vec4(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);\nshadow+=texture2D(shadowSampler,uvDepthLayer+offset*filterRadius);\n}\nshadow/=float(pcfTapCount);\nshadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n#define inline\nfloat computeShadowWithPCSS(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers)\n{\nif (depthMetric>1.0 || depthMetric<0.0) {\nreturn 1.0;\n}\nelse\n{\nvec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;\nvec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));\nuvDepth.z=ZINCLIP;\nfloat blockerDepth=0.0;\nfloat sumBlockerDepth=0.0;\nfloat numBlocker=0.0;\nfor (int i=0; i<searchTapCount; i ++) {\nblockerDepth=texture2D(depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy)).r;\nif (blockerDepth<depthMetric) {\nsumBlockerDepth+=blockerDepth;\nnumBlocker++;\n}\n}\nif (numBlocker<1.0) {\nreturn 1.0;\n}\nelse\n{\nfloat avgBlockerDepth=sumBlockerDepth/numBlocker;\nfloat AAOffset=shadowMapSizeInverse*10.;\nfloat penumbraRatio=((depthMetric-avgBlockerDepth)+AAOffset);\nfloat filterRadius=penumbraRatio*lightSizeUV*shadowMapSizeInverse;\nfloat random=getRand(vPositionFromLight.xy);\nfloat rotationAngle=random*3.1415926;\nvec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));\nfloat shadow=0.;\nfor (int i=0; i<pcfTapCount; i++) {\nvec3 offset=poissonSamplers[i];\noffset=vec3(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);\nshadow+=texture2D(shadowSampler,uvDepth+offset*filterRadius);\n}\nshadow/=float(pcfTapCount);\nshadow=mix(shadow,1.,depthMetric-avgBlockerDepth);\nshadow=mix(darkness,1.,shadow);\nreturn computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);\n}\n}\n}\n#define inline\nfloat computeShadowWithPCSS16(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)\n{\nreturn computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);\n}\n#define inline\nfloat computeShadowWithPCSS32(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)\n{\nreturn computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);\n}\n#define inline\nfloat computeShadowWithPCSS64(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)\n{\nreturn computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);\n}\n#define inline\nfloat computeShadowWithCSMPCSS16(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)\n{\nreturn computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);\n}\n#define inline\nfloat computeShadowWithCSMPCSS32(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)\n{\nreturn computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);\n}\n#define inline\nfloat computeShadowWithCSMPCSS64(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)\n{\nreturn computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$d] = shader$d;

// Do not edit.
var name$e = "bumpFragmentMainFunctions";
var shader$e = "#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)\n#if defined(TANGENT) && defined(NORMAL) \nvarying mat3 vTBN;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nuniform mat4 normalMatrix;\n#endif\nvec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)\n{\n#ifdef NORMALXYSCALE\nnormal=normalize(normal*vec3(scale,scale,1.0));\n#endif\nreturn normalize(cotangentFrame*normal);\n}\nvec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)\n{\nreturn perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);\n}\nmat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)\n{\nvec3 dp1=dFdx(p);\nvec3 dp2=dFdy(p);\nvec2 duv1=dFdx(uv);\nvec2 duv2=dFdy(uv);\nvec3 dp2perp=cross(dp2,normal);\nvec3 dp1perp=cross(normal,dp1);\nvec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;\nvec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;\ntangent*=tangentSpaceParams.x;\nbitangent*=tangentSpaceParams.y;\nfloat invmax=inversesqrt(max(dot(tangent,tangent),dot(bitangent,bitangent)));\nreturn mat3(tangent*invmax,bitangent*invmax,normal);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$e] = shader$e;

// Do not edit.
var name$f = "bumpFragmentFunctions";
var shader$f = "#if defined(BUMP)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)\n#endif\n#if defined(DETAIL)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)\n#endif\n#if defined(BUMP) && defined(PARALLAX)\nconst float minSamples=4.;\nconst float maxSamples=15.;\nconst int iMaxSamples=15;\nvec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {\nfloat parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;\nparallaxLimit*=parallaxScale;\nvec2 vOffsetDir=normalize(vViewDirCoT.xy);\nvec2 vMaxOffset=vOffsetDir*parallaxLimit;\nfloat numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));\nfloat stepSize=1.0/numSamples;\nfloat currRayHeight=1.0;\nvec2 vCurrOffset=vec2(0,0);\nvec2 vLastOffset=vec2(0,0);\nfloat lastSampledHeight=1.0;\nfloat currSampledHeight=1.0;\nfor (int i=0; i<iMaxSamples; i++)\n{\ncurrSampledHeight=texture2D(bumpSampler,texCoord+vCurrOffset).w;\nif (currSampledHeight>currRayHeight)\n{\nfloat delta1=currSampledHeight-currRayHeight;\nfloat delta2=(currRayHeight+stepSize)-lastSampledHeight;\nfloat ratio=delta1/(delta1+delta2);\nvCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;\nbreak;\n}\nelse\n{\ncurrRayHeight-=stepSize;\nvLastOffset=vCurrOffset;\nvCurrOffset+=stepSize*vMaxOffset;\nlastSampledHeight=currSampledHeight;\n}\n}\nreturn vCurrOffset;\n}\nvec2 parallaxOffset(vec3 viewDir,float heightScale)\n{\nfloat height=texture2D(bumpSampler,vBumpUV).w;\nvec2 texCoordOffset=heightScale*viewDir.xy*height;\nreturn -texCoordOffset;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$f] = shader$f;

// Do not edit.
var name$g = "reflectionFunction";
var shader$g = "vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)\n{\nfloat lon=atan(direction.z,direction.x);\nfloat lat=acos(direction.y);\nvec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;\nfloat s=sphereCoords.x*0.5+0.5;\nfloat t=sphereCoords.y;\nreturn vec3(s,t,0); \n}\nvec3 computeMirroredFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)\n{\nfloat lon=atan(direction.z,direction.x);\nfloat lat=acos(direction.y);\nvec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;\nfloat s=sphereCoords.x*0.5+0.5;\nfloat t=sphereCoords.y;\nreturn vec3(1.0-s,t,0); \n}\nvec3 computeEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)\n{\nvec3 cameraToVertex=normalize(worldPos.xyz-eyePosition);\nvec3 r=normalize(reflect(cameraToVertex,worldNormal));\nr=vec3(reflectionMatrix*vec4(r,0));\nfloat lon=atan(r.z,r.x);\nfloat lat=acos(r.y);\nvec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;\nfloat s=sphereCoords.x*0.5+0.5;\nfloat t=sphereCoords.y;\nreturn vec3(s,t,0);\n}\nvec3 computeSphericalCoords(vec4 worldPos,vec3 worldNormal,mat4 view,mat4 reflectionMatrix)\n{\nvec3 viewDir=normalize(vec3(view*worldPos));\nvec3 viewNormal=normalize(vec3(view*vec4(worldNormal,0.0)));\nvec3 r=reflect(viewDir,viewNormal);\nr=vec3(reflectionMatrix*vec4(r,0));\nr.z=r.z-1.0;\nfloat m=2.0*length(r);\nreturn vec3(r.x/m+0.5,1.0-r.y/m-0.5,0);\n}\nvec3 computePlanarCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)\n{\nvec3 viewDir=worldPos.xyz-eyePosition;\nvec3 coords=normalize(reflect(viewDir,worldNormal));\nreturn vec3(reflectionMatrix*vec4(coords,1));\n}\nvec3 computeCubicCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)\n{\nvec3 viewDir=normalize(worldPos.xyz-eyePosition);\nvec3 coords=reflect(viewDir,worldNormal);\ncoords=vec3(reflectionMatrix*vec4(coords,0));\n#ifdef INVERTCUBICMAP\ncoords.y*=-1.0;\n#endif\nreturn coords;\n}\nvec3 computeCubicLocalCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix,vec3 reflectionSize,vec3 reflectionPosition)\n{\nvec3 viewDir=normalize(worldPos.xyz-eyePosition);\nvec3 coords=reflect(viewDir,worldNormal);\ncoords=parallaxCorrectNormal(worldPos.xyz,coords,reflectionSize,reflectionPosition);\ncoords=vec3(reflectionMatrix*vec4(coords,0));\n#ifdef INVERTCUBICMAP\ncoords.y*=-1.0;\n#endif\nreturn coords;\n}\nvec3 computeProjectionCoords(vec4 worldPos,mat4 view,mat4 reflectionMatrix)\n{\nreturn vec3(reflectionMatrix*(view*worldPos));\n}\nvec3 computeSkyBoxCoords(vec3 positionW,mat4 reflectionMatrix)\n{\nreturn vec3(reflectionMatrix*vec4(positionW,1.));\n}\n#ifdef REFLECTION\nvec3 computeReflectionCoords(vec4 worldPos,vec3 worldNormal)\n{\n#ifdef REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED\nvec3 direction=normalize(vDirectionW);\nreturn computeMirroredFixedEquirectangularCoords(worldPos,worldNormal,direction);\n#endif\n#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED\nvec3 direction=normalize(vDirectionW);\nreturn computeFixedEquirectangularCoords(worldPos,worldNormal,direction);\n#endif\n#ifdef REFLECTIONMAP_EQUIRECTANGULAR\nreturn computeEquirectangularCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);\n#endif\n#ifdef REFLECTIONMAP_SPHERICAL\nreturn computeSphericalCoords(worldPos,worldNormal,view,reflectionMatrix);\n#endif\n#ifdef REFLECTIONMAP_PLANAR\nreturn computePlanarCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);\n#endif\n#ifdef REFLECTIONMAP_CUBIC\n#ifdef USE_LOCAL_REFLECTIONMAP_CUBIC\nreturn computeCubicLocalCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix,vReflectionSize,vReflectionPosition);\n#else\nreturn computeCubicCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);\n#endif\n#endif\n#ifdef REFLECTIONMAP_PROJECTION\nreturn computeProjectionCoords(worldPos,view,reflectionMatrix);\n#endif\n#ifdef REFLECTIONMAP_SKYBOX\nreturn computeSkyBoxCoords(vPositionUVW,reflectionMatrix);\n#endif\n#ifdef REFLECTIONMAP_EXPLICIT\nreturn vec3(0,0,0);\n#endif\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$g] = shader$g;

// Do not edit.
var name$h = "oitFragment";
var shader$h = "#ifdef ORDER_INDEPENDENT_TRANSPARENCY\nfloat fragDepth=gl_FragCoord.z; \n#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS\nuint halfFloat=packHalf2x16(vec2(fragDepth));\nvec2 full=unpackHalf2x16(halfFloat);\nfragDepth=full.x;\n#endif\nivec2 fragCoord=ivec2(gl_FragCoord.xy);\nvec2 lastDepth=texelFetch(oitDepthSampler,fragCoord,0).rg;\nvec4 lastFrontColor=texelFetch(oitFrontColorSampler,fragCoord,0);\ndepth.rg=vec2(-MAX_DEPTH);\nfrontColor=lastFrontColor;\nbackColor=vec4(0.0);\n#ifdef USE_REVERSE_DEPTHBUFFER\nfloat furthestDepth=-lastDepth.x;\nfloat nearestDepth=lastDepth.y;\n#else\nfloat nearestDepth=-lastDepth.x;\nfloat furthestDepth=lastDepth.y;\n#endif\nfloat alphaMultiplier=1.0-lastFrontColor.a;\n#ifdef USE_REVERSE_DEPTHBUFFER\nif (fragDepth>nearestDepth || fragDepth<furthestDepth) {\n#else\nif (fragDepth<nearestDepth || fragDepth>furthestDepth) {\n#endif\nreturn;\n}\n#ifdef USE_REVERSE_DEPTHBUFFER\nif (fragDepth<nearestDepth && fragDepth>furthestDepth) {\n#else\nif (fragDepth>nearestDepth && fragDepth<furthestDepth) {\n#endif\ndepth.rg=vec2(-fragDepth,fragDepth);\nreturn;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$h] = shader$h;

// Do not edit.
var name$i = "clipPlaneFragment";
var shader$i = "#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)\nif (false) {}\n#endif\n#ifdef CLIPPLANE\nelse if (fClipDistance>0.0)\n{\ndiscard;\n}\n#endif\n#ifdef CLIPPLANE2\nelse if (fClipDistance2>0.0)\n{\ndiscard;\n}\n#endif\n#ifdef CLIPPLANE3\nelse if (fClipDistance3>0.0)\n{\ndiscard;\n}\n#endif\n#ifdef CLIPPLANE4\nelse if (fClipDistance4>0.0)\n{\ndiscard;\n}\n#endif\n#ifdef CLIPPLANE5\nelse if (fClipDistance5>0.0)\n{\ndiscard;\n}\n#endif\n#ifdef CLIPPLANE6\nelse if (fClipDistance6>0.0)\n{\ndiscard;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$i] = shader$i;

// Do not edit.
var name$j = "bumpFragment";
var shader$j = "vec2 uvOffset=vec2(0.0,0.0);\n#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)\n#ifdef NORMALXYSCALE\nfloat normalScale=1.0;\n#elif defined(BUMP)\nfloat normalScale=vBumpInfos.y;\n#else\nfloat normalScale=1.0;\n#endif\n#if defined(TANGENT) && defined(NORMAL)\nmat3 TBN=vTBN;\n#elif defined(BUMP)\nvec2 TBNUV=gl_FrontFacing ? vBumpUV : -vBumpUV;\nmat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);\n#else\nvec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;\nmat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));\n#endif\n#elif defined(ANISOTROPIC)\n#if defined(TANGENT) && defined(NORMAL)\nmat3 TBN=vTBN;\n#else\nvec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;\nmat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));\n#endif\n#endif\n#ifdef PARALLAX\nmat3 invTBN=transposeMat3(TBN);\n#ifdef PARALLAXOCCLUSION\nuvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,vBumpUV,vBumpInfos.z);\n#else\nuvOffset=parallaxOffset(invTBN*viewDirectionW,vBumpInfos.z);\n#endif\n#endif\n#ifdef DETAIL\nvec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);\nvec2 detailNormalRG=detailColor.wy*2.0-1.0;\nfloat detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));\nvec3 detailNormal=vec3(detailNormalRG,detailNormalB);\n#endif\n#ifdef BUMP\n#ifdef OBJECTSPACE_NORMALMAP\nnormalW=normalize(texture2D(bumpSampler,vBumpUV).xyz *2.0-1.0);\nnormalW=normalize(mat3(normalMatrix)*normalW);\n#elif !defined(DETAIL)\nnormalW=perturbNormal(TBN,texture2D(bumpSampler,vBumpUV+uvOffset).xyz,vBumpInfos.y);\n#else\nvec3 bumpNormal=texture2D(bumpSampler,vBumpUV+uvOffset).xyz*2.0-1.0;\n#if DETAIL_NORMALBLENDMETHOD==0 \ndetailNormal.xy*=vDetailInfos.z;\nvec3 blendedNormal=normalize(vec3(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));\n#elif DETAIL_NORMALBLENDMETHOD==1 \ndetailNormal.xy*=vDetailInfos.z;\nbumpNormal+=vec3(0.0,0.0,1.0);\ndetailNormal*=vec3(-1.0,-1.0,1.0);\nvec3 blendedNormal=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;\n#endif\nnormalW=perturbNormalBase(TBN,blendedNormal,vBumpInfos.y);\n#endif\n#elif defined(DETAIL)\ndetailNormal.xy*=vDetailInfos.z;\nnormalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$j] = shader$j;

// Do not edit.
var name$k = "depthPrePass";
var shader$k = "#ifdef DEPTHPREPASS\ngl_FragColor=vec4(0.,0.,0.,1.0);\nreturn;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$k] = shader$k;

// Do not edit.
var name$l = "lightFragment";
var shader$l = "#ifdef LIGHT{X}\n#if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})\n#else\n#ifdef PBR\n#ifdef SPOTLIGHT{X}\npreInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);\n#elif defined(POINTLIGHT{X})\npreInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);\n#elif defined(HEMILIGHT{X})\npreInfo=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);\n#elif defined(DIRLIGHT{X})\npreInfo=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);\n#endif\npreInfo.NdotV=NdotV;\n#ifdef SPOTLIGHT{X}\n#ifdef LIGHT_FALLOFF_GLTF{X}\npreInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);\npreInfo.attenuation*=computeDirectionalLightFalloff_GLTF(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);\n#elif defined(LIGHT_FALLOFF_PHYSICAL{X})\npreInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);\npreInfo.attenuation*=computeDirectionalLightFalloff_Physical(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w);\n#elif defined(LIGHT_FALLOFF_STANDARD{X})\npreInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);\npreInfo.attenuation*=computeDirectionalLightFalloff_Standard(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w);\n#else\npreInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);\npreInfo.attenuation*=computeDirectionalLightFalloff(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);\n#endif\n#elif defined(POINTLIGHT{X})\n#ifdef LIGHT_FALLOFF_GLTF{X}\npreInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);\n#elif defined(LIGHT_FALLOFF_PHYSICAL{X})\npreInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);\n#elif defined(LIGHT_FALLOFF_STANDARD{X})\npreInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);\n#else\npreInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);\n#endif\n#else\npreInfo.attenuation=1.0;\n#endif\n#ifdef HEMILIGHT{X}\npreInfo.roughness=roughness;\n#else\npreInfo.roughness=adjustRoughnessFromLightProperties(roughness,light{X}.vLightSpecular.a,preInfo.lightDistance);\n#endif\n#ifdef IRIDESCENCE\npreInfo.iridescenceIntensity=iridescenceIntensity;\n#endif\n#ifdef HEMILIGHT{X}\ninfo.diffuse=computeHemisphericDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb,light{X}.vLightGround);\n#elif defined(SS_TRANSLUCENCY)\ninfo.diffuse=computeDiffuseAndTransmittedLighting(preInfo,light{X}.vLightDiffuse.rgb,subSurfaceOut.transmittance);\n#else\ninfo.diffuse=computeDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb);\n#endif\n#ifdef SPECULARTERM\n#ifdef ANISOTROPIC\ninfo.specular=computeAnisotropicSpecularLighting(preInfo,viewDirectionW,normalW,anisotropicOut.anisotropicTangent,anisotropicOut.anisotropicBitangent,anisotropicOut.anisotropy,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);\n#else\ninfo.specular=computeSpecularLighting(preInfo,normalW,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);\n#endif\n#endif\n#ifdef SHEEN\n#ifdef SHEEN_LINKWITHALBEDO\npreInfo.roughness=sheenOut.sheenIntensity;\n#else\n#ifdef HEMILIGHT{X}\npreInfo.roughness=sheenOut.sheenRoughness;\n#else\npreInfo.roughness=adjustRoughnessFromLightProperties(sheenOut.sheenRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);\n#endif\n#endif\ninfo.sheen=computeSheenLighting(preInfo,normalW,sheenOut.sheenColor,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);\n#endif\n#ifdef CLEARCOAT\n#ifdef HEMILIGHT{X}\npreInfo.roughness=clearcoatOut.clearCoatRoughness;\n#else\npreInfo.roughness=adjustRoughnessFromLightProperties(clearcoatOut.clearCoatRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);\n#endif\ninfo.clearCoat=computeClearCoatLighting(preInfo,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatAARoughnessFactors.x,clearcoatOut.clearCoatIntensity,light{X}.vLightDiffuse.rgb);\n#ifdef CLEARCOAT_TINT\nabsorption=computeClearCoatLightingAbsorption(clearcoatOut.clearCoatNdotVRefract,preInfo.L,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatColor,clearcoatOut.clearCoatThickness,clearcoatOut.clearCoatIntensity);\ninfo.diffuse*=absorption;\n#ifdef SPECULARTERM\ninfo.specular*=absorption;\n#endif\n#endif\ninfo.diffuse*=info.clearCoat.w;\n#ifdef SPECULARTERM\ninfo.specular*=info.clearCoat.w;\n#endif\n#ifdef SHEEN\ninfo.sheen*=info.clearCoat.w;\n#endif\n#endif\n#else\n#ifdef SPOTLIGHT{X}\ninfo=computeSpotLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDirection,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);\n#elif defined(HEMILIGHT{X})\ninfo=computeHemisphericLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightGround,glossiness);\n#elif defined(POINTLIGHT{X}) || defined(DIRLIGHT{X})\ninfo=computeLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);\n#endif\n#endif\n#ifdef PROJECTEDLIGHTTEXTURE{X}\ninfo.diffuse*=computeProjectionTextureDiffuseLighting(projectionLightSampler{X},textureProjectionMatrix{X});\n#endif\n#endif\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nfor (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) \n{\n#ifdef SHADOWCSM_RIGHTHANDED{X}\ndiff{X}=viewFrustumZ{X}[i]+vPositionFromCamera{X}.z;\n#else\ndiff{X}=viewFrustumZ{X}[i]-vPositionFromCamera{X}.z;\n#endif\nif (diff{X}>=0.) {\nindex{X}=i;\nbreak;\n}\n}\n#ifdef SHADOWCSMUSESHADOWMAXZ{X}\nif (index{X}>=0)\n#endif\n{\n#if defined(SHADOWPCF{X})\n#if defined(SHADOWLOWQUALITY{X})\nshadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#elif defined(SHADOWMEDIUMQUALITY{X})\nshadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#else\nshadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWPCSS{X})\n#if defined(SHADOWLOWQUALITY{X})\nshadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#elif defined(SHADOWMEDIUMQUALITY{X})\nshadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#else\nshadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#endif\n#else\nshadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#ifdef SHADOWCSMDEBUG{X}\nshadowDebug{X}=vec3(shadow)*vCascadeColorsMultiplier{X}[index{X}];\n#endif\n#ifndef SHADOWCSMNOBLEND{X}\nfloat frustumLength=frustumLengths{X}[index{X}];\nfloat diffRatio=clamp(diff{X}/frustumLength,0.,1.)*cascadeBlendFactor{X};\nif (index{X}<(SHADOWCSMNUM_CASCADES{X}-1) && diffRatio<1.)\n{\nindex{X}+=1;\nfloat nextShadow=0.;\n#if defined(SHADOWPCF{X})\n#if defined(SHADOWLOWQUALITY{X})\nnextShadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#elif defined(SHADOWMEDIUMQUALITY{X})\nnextShadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#else\nnextShadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWPCSS{X})\n#if defined(SHADOWLOWQUALITY{X})\nnextShadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#elif defined(SHADOWMEDIUMQUALITY{X})\nnextShadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#else\nnextShadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});\n#endif\n#else\nnextShadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\nshadow=mix(nextShadow,shadow,diffRatio);\n#ifdef SHADOWCSMDEBUG{X}\nshadowDebug{X}=mix(vec3(nextShadow)*vCascadeColorsMultiplier{X}[index{X}],shadowDebug{X},diffRatio);\n#endif\n}\n#endif\n}\n#elif defined(SHADOWCLOSEESM{X})\n#if defined(SHADOWCUBE{X})\nshadow=computeShadowWithCloseESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);\n#else\nshadow=computeShadowWithCloseESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWESM{X})\n#if defined(SHADOWCUBE{X})\nshadow=computeShadowWithESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);\n#else\nshadow=computeShadowWithESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWPOISSON{X})\n#if defined(SHADOWCUBE{X})\nshadow=computeShadowWithPoissonSamplingCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.depthValues);\n#else\nshadow=computeShadowWithPoissonSampling(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWPCF{X})\n#if defined(SHADOWLOWQUALITY{X})\nshadow=computeShadowWithPCF1(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#elif defined(SHADOWMEDIUMQUALITY{X})\nshadow=computeShadowWithPCF3(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#else\nshadow=computeShadowWithPCF5(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#elif defined(SHADOWPCSS{X})\n#if defined(SHADOWLOWQUALITY{X})\nshadow=computeShadowWithPCSS16(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#elif defined(SHADOWMEDIUMQUALITY{X})\nshadow=computeShadowWithPCSS32(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#else\nshadow=computeShadowWithPCSS64(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#else\n#if defined(SHADOWCUBE{X})\nshadow=computeShadowCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.depthValues);\n#else\nshadow=computeShadow(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);\n#endif\n#endif\n#ifdef SHADOWONLY\n#ifndef SHADOWINUSE\n#define SHADOWINUSE\n#endif\nglobalShadow+=shadow;\nshadowLightCount+=1.0;\n#endif\n#else\nshadow=1.;\n#endif\n#ifndef SHADOWONLY\n#ifdef CUSTOMUSERLIGHTING\ndiffuseBase+=computeCustomDiffuseLighting(info,diffuseBase,shadow);\n#ifdef SPECULARTERM\nspecularBase+=computeCustomSpecularLighting(info,specularBase,shadow);\n#endif\n#elif defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X})\ndiffuseBase+=lightmapColor.rgb*shadow;\n#ifdef SPECULARTERM\n#ifndef LIGHTMAPNOSPECULAR{X}\nspecularBase+=info.specular*shadow*lightmapColor.rgb;\n#endif\n#endif\n#ifdef CLEARCOAT\n#ifndef LIGHTMAPNOSPECULAR{X}\nclearCoatBase+=info.clearCoat.rgb*shadow*lightmapColor.rgb;\n#endif\n#endif\n#ifdef SHEEN\n#ifndef LIGHTMAPNOSPECULAR{X}\nsheenBase+=info.sheen.rgb*shadow;\n#endif\n#endif\n#else\n#ifdef SHADOWCSMDEBUG{X}\ndiffuseBase+=info.diffuse*shadowDebug{X};\n#else \ndiffuseBase+=info.diffuse*shadow;\n#endif\n#ifdef SPECULARTERM\nspecularBase+=info.specular*shadow;\n#endif\n#ifdef CLEARCOAT\nclearCoatBase+=info.clearCoat.rgb*shadow;\n#endif\n#ifdef SHEEN\nsheenBase+=info.sheen.rgb*shadow;\n#endif\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$l] = shader$l;

// Do not edit.
var name$m = "logDepthFragment";
var shader$m = "#ifdef LOGARITHMICDEPTH\ngl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$m] = shader$m;

// Do not edit.
var name$n = "fogFragment";
var shader$n = "#ifdef FOG\nfloat fog=CalcFogFactor();\n#ifdef PBR\nfog=toLinearSpace(fog);\n#endif\ncolor.rgb=mix(vFogColor,color.rgb,fog);\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$n] = shader$n;

// Do not edit.
var name$o = "uvAttributeDeclaration";
var shader$o = "#ifdef UV{X}\nattribute vec2 uv{X};\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$o] = shader$o;

// Do not edit.
var name$p = "bonesDeclaration";
var shader$p = "#if NUM_BONE_INFLUENCERS>0\nattribute vec4 matricesIndices;\nattribute vec4 matricesWeights;\n#if NUM_BONE_INFLUENCERS>4\nattribute vec4 matricesIndicesExtra;\nattribute vec4 matricesWeightsExtra;\n#endif\n#ifndef BAKED_VERTEX_ANIMATION_TEXTURE\n#ifdef BONETEXTURE\nuniform sampler2D boneSampler;\nuniform float boneTextureWidth;\n#else\nuniform mat4 mBones[BonesPerMesh];\n#ifdef BONES_VELOCITY_ENABLED\nuniform mat4 mPreviousBones[BonesPerMesh];\n#endif\n#endif\n#ifdef BONETEXTURE\n#define inline\nmat4 readMatrixFromRawSampler(sampler2D smp,float index)\n{\nfloat offset=index *4.0;\nfloat dx=1.0/boneTextureWidth;\nvec4 m0=texture2D(smp,vec2(dx*(offset+0.5),0.));\nvec4 m1=texture2D(smp,vec2(dx*(offset+1.5),0.));\nvec4 m2=texture2D(smp,vec2(dx*(offset+2.5),0.));\nvec4 m3=texture2D(smp,vec2(dx*(offset+3.5),0.));\nreturn mat4(m0,m1,m2,m3);\n}\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$p] = shader$p;

// Do not edit.
var name$q = "bakedVertexAnimationDeclaration";
var shader$q = "#ifdef BAKED_VERTEX_ANIMATION_TEXTURE\nuniform float bakedVertexAnimationTime;\nuniform vec2 bakedVertexAnimationTextureSizeInverted;\nuniform vec4 bakedVertexAnimationSettings;\nuniform sampler2D bakedVertexAnimationTexture;\n#ifdef INSTANCES\nattribute vec4 bakedVertexAnimationSettingsInstanced;\n#endif\n#define inline\nmat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)\n{\nfloat offset=index*4.0;\nfloat frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;\nfloat dx=bakedVertexAnimationTextureSizeInverted.x;\nvec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));\nvec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));\nvec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));\nvec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));\nreturn mat4(m0,m1,m2,m3);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$q] = shader$q;

// Do not edit.
var name$r = "instancesDeclaration";
var shader$r = "#ifdef INSTANCES\nattribute vec4 world0;\nattribute vec4 world1;\nattribute vec4 world2;\nattribute vec4 world3;\n#ifdef INSTANCESCOLOR\nattribute vec4 instanceColor;\n#endif\n#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)\nuniform mat4 world;\n#endif\n#if defined(VELOCITY) || defined(PREPASS_VELOCITY)\nattribute vec4 previousWorld0;\nattribute vec4 previousWorld1;\nattribute vec4 previousWorld2;\nattribute vec4 previousWorld3;\n#ifdef THIN_INSTANCES\nuniform mat4 previousWorld;\n#endif\n#endif\n#else\n#if !defined(WORLD_UBO)\nuniform mat4 world;\n#endif\n#if defined(VELOCITY) || defined(PREPASS_VELOCITY)\nuniform mat4 previousWorld;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$r] = shader$r;

// Do not edit.
var name$s = "prePassVertexDeclaration";
var shader$s = "#ifdef PREPASS\n#ifdef PREPASS_DEPTH\nvarying vec3 vViewPos;\n#endif\n#ifdef PREPASS_VELOCITY\nuniform mat4 previousViewProjection;\nvarying vec4 vCurrentPosition;\nvarying vec4 vPreviousPosition;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$s] = shader$s;

// Do not edit.
var name$t = "samplerVertexDeclaration";
var shader$t = "#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0\nvarying vec2 v_VARYINGNAME_UV;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$t] = shader$t;

// Do not edit.
var name$u = "bumpVertexDeclaration";
var shader$u = "#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)\n#if defined(TANGENT) && defined(NORMAL) \nvarying mat3 vTBN;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$u] = shader$u;

// Do not edit.
var name$v = "clipPlaneVertexDeclaration";
var shader$v = "#ifdef CLIPPLANE\nuniform vec4 vClipPlane;\nvarying float fClipDistance;\n#endif\n#ifdef CLIPPLANE2\nuniform vec4 vClipPlane2;\nvarying float fClipDistance2;\n#endif\n#ifdef CLIPPLANE3\nuniform vec4 vClipPlane3;\nvarying float fClipDistance3;\n#endif\n#ifdef CLIPPLANE4\nuniform vec4 vClipPlane4;\nvarying float fClipDistance4;\n#endif\n#ifdef CLIPPLANE5\nuniform vec4 vClipPlane5;\nvarying float fClipDistance5;\n#endif\n#ifdef CLIPPLANE6\nuniform vec4 vClipPlane6;\nvarying float fClipDistance6;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$v] = shader$v;

// Do not edit.
var name$w = "fogVertexDeclaration";
var shader$w = "#ifdef FOG\nvarying vec3 vFogDistance;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$w] = shader$w;

// Do not edit.
var name$x = "lightVxFragmentDeclaration";
var shader$x = "#ifdef LIGHT{X}\nuniform vec4 vLightData{X};\nuniform vec4 vLightDiffuse{X};\n#ifdef SPECULARTERM\nuniform vec4 vLightSpecular{X};\n#else\nvec4 vLightSpecular{X}=vec4(0.);\n#endif\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromCamera{X};\n#elif defined(SHADOWCUBE{X})\n#else\nvarying vec4 vPositionFromLight{X};\nvarying float vDepthMetric{X};\nuniform mat4 lightMatrix{X};\n#endif\nuniform vec4 shadowsInfo{X};\nuniform vec2 depthValues{X};\n#endif\n#ifdef SPOTLIGHT{X}\nuniform vec4 vLightDirection{X};\nuniform vec4 vLightFalloff{X};\n#elif defined(POINTLIGHT{X})\nuniform vec4 vLightFalloff{X};\n#elif defined(HEMILIGHT{X})\nuniform vec3 vLightGround{X};\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$x] = shader$x;

// Do not edit.
var name$y = "lightVxUboDeclaration";
var shader$y = "#ifdef LIGHT{X}\nuniform Light{X}\n{\nvec4 vLightData;\nvec4 vLightDiffuse;\nvec4 vLightSpecular;\n#ifdef SPOTLIGHT{X}\nvec4 vLightDirection;\nvec4 vLightFalloff;\n#elif defined(POINTLIGHT{X})\nvec4 vLightFalloff;\n#elif defined(HEMILIGHT{X})\nvec3 vLightGround;\n#endif\nvec4 shadowsInfo;\nvec2 depthValues;\n} light{X};\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];\nvarying vec4 vPositionFromCamera{X};\n#elif defined(SHADOWCUBE{X})\n#else\nvarying vec4 vPositionFromLight{X};\nvarying float vDepthMetric{X};\nuniform mat4 lightMatrix{X};\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$y] = shader$y;

// Do not edit.
var name$z = "morphTargetsVertexGlobalDeclaration";
var shader$z = "#ifdef MORPHTARGETS\nuniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];\n#ifdef MORPHTARGETS_TEXTURE \nprecision mediump sampler2DArray; \nuniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];\nuniform vec3 morphTargetTextureInfo;\nuniform sampler2DArray morphTargets;\nvec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)\n{ \nfloat y=floor(vertexIndex/morphTargetTextureInfo.y);\nfloat x=vertexIndex-y*morphTargetTextureInfo.y;\nvec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);\nreturn texture(morphTargets,textureUV).xyz;\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$z] = shader$z;

// Do not edit.
var name$A = "morphTargetsVertexDeclaration";
var shader$A = "#ifdef MORPHTARGETS\n#ifndef MORPHTARGETS_TEXTURE\nattribute vec3 position{X};\n#ifdef MORPHTARGETS_NORMAL\nattribute vec3 normal{X};\n#endif\n#ifdef MORPHTARGETS_TANGENT\nattribute vec3 tangent{X};\n#endif\n#ifdef MORPHTARGETS_UV\nattribute vec2 uv_{X};\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$A] = shader$A;

// Do not edit.
var name$B = "morphTargetsVertexGlobal";
var shader$B = "#ifdef MORPHTARGETS\n#ifdef MORPHTARGETS_TEXTURE\nfloat vertexID;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$B] = shader$B;

// Do not edit.
var name$C = "morphTargetsVertex";
var shader$C = "#ifdef MORPHTARGETS\n#ifdef MORPHTARGETS_TEXTURE \nvertexID=float(gl_VertexID)*morphTargetTextureInfo.x;\npositionUpdated+=(readVector3FromRawSampler({X},vertexID)-position)*morphTargetInfluences[{X}];\nvertexID+=1.0;\n#ifdef MORPHTARGETS_NORMAL\nnormalUpdated+=(readVector3FromRawSampler({X},vertexID) -normal)*morphTargetInfluences[{X}];\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_UV\nuvUpdated+=(readVector3FromRawSampler({X},vertexID).xy-uv)*morphTargetInfluences[{X}];\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_TANGENT\ntangentUpdated.xyz+=(readVector3FromRawSampler({X},vertexID) -tangent.xyz)*morphTargetInfluences[{X}];\n#endif\n#else\npositionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];\n#ifdef MORPHTARGETS_NORMAL\nnormalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_TANGENT\ntangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_UV\nuvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$C] = shader$C;

// Do not edit.
var name$D = "instancesVertex";
var shader$D = "#ifdef INSTANCES\nmat4 finalWorld=mat4(world0,world1,world2,world3);\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY)\nmat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,previousWorld2,previousWorld3);\n#endif\n#ifdef THIN_INSTANCES\nfinalWorld=world*finalWorld;\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY)\nfinalPreviousWorld=previousWorld*finalPreviousWorld;\n#endif\n#endif\n#else\nmat4 finalWorld=world;\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY)\nmat4 finalPreviousWorld=previousWorld;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$D] = shader$D;

// Do not edit.
var name$E = "bonesVertex";
var shader$E = "#ifndef BAKED_VERTEX_ANIMATION_TEXTURE\n#if NUM_BONE_INFLUENCERS>0\nmat4 influence;\n#ifdef BONETEXTURE\ninfluence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];\n#endif\n#else\ninfluence=mBones[int(matricesIndices[0])]*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\ninfluence+=mBones[int(matricesIndices[1])]*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\ninfluence+=mBones[int(matricesIndices[2])]*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\ninfluence+=mBones[int(matricesIndices[3])]*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\ninfluence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\ninfluence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\ninfluence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\ninfluence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];\n#endif\n#endif\nfinalWorld=finalWorld*influence;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$E] = shader$E;

// Do not edit.
var name$F = "bakedVertexAnimation";
var shader$F = "#ifdef BAKED_VERTEX_ANIMATION_TEXTURE\n{\n#ifdef INSTANCES\n#define BVASNAME bakedVertexAnimationSettingsInstanced\n#else\n#define BVASNAME bakedVertexAnimationSettings\n#endif\nfloat VATStartFrame=BVASNAME.x;\nfloat VATEndFrame=BVASNAME.y;\nfloat VATOffsetFrame=BVASNAME.z;\nfloat VATSpeed=BVASNAME.w;\nfloat totalFrames=VATEndFrame-VATStartFrame+1.0;\nfloat time=bakedVertexAnimationTime*VATSpeed/totalFrames;\nfloat frameCorrection=time<1.0 ? 0.0 : 1.0;\nfloat numOfFrames=totalFrames-frameCorrection;\nfloat VATFrameNum=fract(time)*numOfFrames;\nVATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);\nVATFrameNum=floor(VATFrameNum);\nVATFrameNum+=VATStartFrame+frameCorrection;\nmat4 VATInfluence;\nVATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];\n#endif\nfinalWorld=finalWorld*VATInfluence;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$F] = shader$F;

// Do not edit.
var name$G = "prePassVertex";
var shader$G = "#ifdef PREPASS_DEPTH\nvViewPos=(view*worldPos).rgb;\n#endif\n#if defined(PREPASS_VELOCITY) && defined(BONES_VELOCITY_ENABLED)\nvCurrentPosition=viewProjection*worldPos;\n#if NUM_BONE_INFLUENCERS>0\nmat4 previousInfluence;\npreviousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\npreviousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];\n#endif \n#if NUM_BONE_INFLUENCERS>2\npreviousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];\n#endif \n#if NUM_BONE_INFLUENCERS>3\npreviousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];\n#endif \n#if NUM_BONE_INFLUENCERS>5\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];\n#endif \n#if NUM_BONE_INFLUENCERS>6\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];\n#endif \n#if NUM_BONE_INFLUENCERS>7\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];\n#endif\nvPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);\n#else\nvPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$G] = shader$G;

// Do not edit.
var name$H = "uvVariableDeclaration";
var shader$H = "#if !defined(UV{X}) && defined(MAINUV{X})\nvec2 uv{X}=vec2(0.,0.);\n#endif\n#ifdef MAINUV{X}\nvMainUV{X}=uv{X};\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$H] = shader$H;

// Do not edit.
var name$I = "samplerVertexImplementation";
var shader$I = "#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0\nif (v_INFONAME_==0.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uvUpdated,1.0,0.0));\n}\n#ifdef UV2\nelse if (v_INFONAME_==1.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#ifdef UV3\nelse if (v_INFONAME_==2.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv3,1.0,0.0));\n}\n#endif\n#ifdef UV4\nelse if (v_INFONAME_==3.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv4,1.0,0.0));\n}\n#endif\n#ifdef UV5\nelse if (v_INFONAME_==4.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv5,1.0,0.0));\n}\n#endif\n#ifdef UV6\nelse if (v_INFONAME_==5.)\n{\nv_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv6,1.0,0.0));\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$I] = shader$I;

// Do not edit.
var name$J = "bumpVertex";
var shader$J = "#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)\n#if defined(TANGENT) && defined(NORMAL)\nvec3 tbnNormal=normalize(normalUpdated);\nvec3 tbnTangent=normalize(tangentUpdated.xyz);\nvec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;\nvTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$J] = shader$J;

// Do not edit.
var name$K = "clipPlaneVertex";
var shader$K = "#ifdef CLIPPLANE\nfClipDistance=dot(worldPos,vClipPlane);\n#endif\n#ifdef CLIPPLANE2\nfClipDistance2=dot(worldPos,vClipPlane2);\n#endif\n#ifdef CLIPPLANE3\nfClipDistance3=dot(worldPos,vClipPlane3);\n#endif\n#ifdef CLIPPLANE4\nfClipDistance4=dot(worldPos,vClipPlane4);\n#endif\n#ifdef CLIPPLANE5\nfClipDistance5=dot(worldPos,vClipPlane5);\n#endif\n#ifdef CLIPPLANE6\nfClipDistance6=dot(worldPos,vClipPlane6);\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$K] = shader$K;

// Do not edit.
var name$L = "fogVertex";
var shader$L = "#ifdef FOG\nvFogDistance=(view*worldPos).xyz;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$L] = shader$L;

// Do not edit.
var name$M = "shadowsVertex";
var shader$M = "#ifdef SHADOWS\n#if defined(SHADOWCSM{X})\nvPositionFromCamera{X}=view*worldPos;\nfor (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) {\nvPositionFromLight{X}[i]=lightMatrix{X}[i]*worldPos;\n#ifdef USE_REVERSE_DEPTHBUFFER\nvDepthMetric{X}[i]=(-vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#else\nvDepthMetric{X}[i]=(vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#endif\n}\n#elif defined(SHADOW{X}) && !defined(SHADOWCUBE{X})\nvPositionFromLight{X}=lightMatrix{X}*worldPos;\n#ifdef USE_REVERSE_DEPTHBUFFER\nvDepthMetric{X}=(-vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#else\nvDepthMetric{X}=(vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$M] = shader$M;

// Do not edit.
var name$N = "vertexColorMixing";
var shader$N = "#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR)\nvColor=vec4(1.0);\n#ifdef VERTEXCOLOR\n#ifdef VERTEXALPHA\nvColor*=color;\n#else\nvColor.rgb*=color.rgb;\n#endif\n#endif\n#ifdef INSTANCESCOLOR\nvColor*=instanceColor;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$N] = shader$N;

// Do not edit.
var name$O = "logDepthVertex";
var shader$O = "#ifdef LOGARITHMICDEPTH\nvFragmentDepth=1.0+gl_Position.w;\ngl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$O] = shader$O;

/**
 * @hidden
 */
var MaterialDetailMapDefines = /** @class */ (function (_super) {
    __extends(MaterialDetailMapDefines, _super);
    function MaterialDetailMapDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DETAIL = false;
        _this.DETAILDIRECTUV = 0;
        _this.DETAIL_NORMALBLENDMETHOD = 0;
        return _this;
    }
    return MaterialDetailMapDefines;
}(MaterialDefines));
/**
 * Plugin that implements the detail map component of a material
 *
 * Inspired from:
 *   Unity: https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@9.0/manual/Mask-Map-and-Detail-Map.html and https://docs.unity3d.com/Manual/StandardShaderMaterialParameterDetail.html
 *   Unreal: https://docs.unrealengine.com/en-US/Engine/Rendering/Materials/HowTo/DetailTexturing/index.html
 *   Cryengine: https://docs.cryengine.com/display/SDKDOC2/Detail+Maps
 */
var DetailMapConfiguration = /** @class */ (function (_super) {
    __extends(DetailMapConfiguration, _super);
    function DetailMapConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "DetailMap", 140, new MaterialDetailMapDefines(), addToPluginList) || this;
        _this._texture = null;
        /**
         * Defines how strongly the detail diffuse/albedo channel is blended with the regular diffuse/albedo texture
         * Bigger values mean stronger blending
         */
        _this.diffuseBlendLevel = 1;
        /**
         * Defines how strongly the detail roughness channel is blended with the regular roughness value
         * Bigger values mean stronger blending. Only used with PBR materials
         */
        _this.roughnessBlendLevel = 1;
        /**
         * Defines how strong the bump effect from the detail map is
         * Bigger values mean stronger effect
         */
        _this.bumpLevel = 1;
        _this._normalBlendMethod = Material.MATERIAL_NORMALBLENDMETHOD_WHITEOUT;
        _this._isEnabled = false;
        /**
         * Enable or disable the detail map on this material
         */
        _this.isEnabled = false;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        return _this;
    }
    /** @hidden */
    DetailMapConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    DetailMapConfiguration.prototype.isReadyForSubMesh = function (defines, scene, engine) {
        if (!this._isEnabled) {
            return true;
        }
        if (defines._areTexturesDirty && scene.texturesEnabled) {
            if (engine.getCaps().standardDerivatives && this._texture && MaterialFlags.DetailTextureEnabled) {
                // Detail texture cannot be not blocking.
                if (!this._texture.isReady()) {
                    return false;
                }
            }
        }
        return true;
    };
    DetailMapConfiguration.prototype.prepareDefines = function (defines, scene) {
        if (this._isEnabled) {
            defines.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
            var engine = scene.getEngine();
            if (defines._areTexturesDirty) {
                if (engine.getCaps().standardDerivatives && this._texture && MaterialFlags.DetailTextureEnabled && this._isEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._texture, defines, "DETAIL");
                    defines.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
                }
                else {
                    defines.DETAIL = false;
                }
            }
        }
        else {
            defines.DETAIL = false;
        }
    };
    DetailMapConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene) {
        if (!this._isEnabled) {
            return;
        }
        var isFrozen = this._material.isFrozen;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (this._texture && MaterialFlags.DetailTextureEnabled) {
                uniformBuffer.updateFloat4("vDetailInfos", this._texture.coordinatesIndex, this.diffuseBlendLevel, this.bumpLevel, this.roughnessBlendLevel);
                MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "detail");
            }
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._texture && MaterialFlags.DetailTextureEnabled) {
                uniformBuffer.setTexture("detailSampler", this._texture);
            }
        }
    };
    DetailMapConfiguration.prototype.hasTexture = function (texture) {
        if (this._texture === texture) {
            return true;
        }
        return false;
    };
    DetailMapConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._texture) {
            activeTextures.push(this._texture);
        }
    };
    DetailMapConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
            animatables.push(this._texture);
        }
    };
    DetailMapConfiguration.prototype.dispose = function (forceDisposeTextures) {
        var _a;
        if (forceDisposeTextures) {
            (_a = this._texture) === null || _a === void 0 ? void 0 : _a.dispose();
        }
    };
    DetailMapConfiguration.prototype.getClassName = function () {
        return "DetailMapConfiguration";
    };
    DetailMapConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("detailSampler");
    };
    DetailMapConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vDetailInfos", size: 4, type: "vec4" },
                { name: "detailMatrix", size: 16, type: "mat4" },
            ],
        };
    };
    __decorate([
        serializeAsTexture("detailTexture"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "texture", void 0);
    __decorate([
        serialize()
    ], DetailMapConfiguration.prototype, "diffuseBlendLevel", void 0);
    __decorate([
        serialize()
    ], DetailMapConfiguration.prototype, "roughnessBlendLevel", void 0);
    __decorate([
        serialize()
    ], DetailMapConfiguration.prototype, "bumpLevel", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "normalBlendMethod", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], DetailMapConfiguration.prototype, "isEnabled", void 0);
    return DetailMapConfiguration;
}(MaterialPluginBase));

export { DetailMapConfiguration as D, MaterialPluginBase as M, PrePassConfiguration as P, MaterialFlags as a };
