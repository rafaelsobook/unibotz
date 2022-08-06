import { _ as __decorate, b as __assign } from './tslib.es6-2542203d.js';
import { S as SerializationHelper, s as serialize } from './decorators-549f2b16.js';
import { T as Tools } from './tools-7eb5c69a.js';
import { O as Observable } from './observable-08535f24.js';
import { E as EngineStore } from './engineStore-733743e8.js';
import { S as SubMesh } from './subMesh-a55557e5.js';
import { U as UniformBuffer } from './uniformBuffer-c6105a9c.js';
import { L as Logger } from './logger-bef9f4b6.js';
import { P as Plane } from './math.plane-b261e683.js';
import { C as Camera } from './camera-8f300542.js';
import { a as Scene } from './scene-02f0c3e7.js';
import { V as VertexBuffer } from './buffer-82c85d65.js';
import { L as LightConstants } from './lightConstants-574d2608.js';
import { C as Color3 } from './math.color-1c350db4.js';
import { D as DrawWrapper } from './drawWrapper-5520764a.js';

/**
 * "Static Class" containing a few commonly used helper while dealing with material for rendering purpose.
 *
 * It is complementary with MaterialHelper but provides completely independent functions (for tree shaking sake)
 *
 * This works by convention in BabylonJS but is meant to be use only with shader following the in place naming rules and conventions.
 */
var ThinMaterialHelper = /** @class */ (function () {
    function ThinMaterialHelper() {
    }
    /**
     * Binds the clip plane information from the holder to the effect.
     * @param effect The effect we are binding the data to
     * @param holder The entity containing the clip plane information
     */
    ThinMaterialHelper.BindClipPlane = function (effect, holder) {
        if (holder.clipPlane) {
            var clipPlane = holder.clipPlane;
            effect.setFloat4("vClipPlane", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
        if (holder.clipPlane2) {
            var clipPlane = holder.clipPlane2;
            effect.setFloat4("vClipPlane2", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
        if (holder.clipPlane3) {
            var clipPlane = holder.clipPlane3;
            effect.setFloat4("vClipPlane3", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
        if (holder.clipPlane4) {
            var clipPlane = holder.clipPlane4;
            effect.setFloat4("vClipPlane4", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
        if (holder.clipPlane5) {
            var clipPlane = holder.clipPlane5;
            effect.setFloat4("vClipPlane5", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
        if (holder.clipPlane6) {
            var clipPlane = holder.clipPlane6;
            effect.setFloat4("vClipPlane6", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
        }
    };
    return ThinMaterialHelper;
}());

/**
 * "Static Class" containing the most commonly used helper while dealing with material for rendering purpose.
 *
 * It contains the basic tools to help defining defines, binding uniform for the common part of the materials.
 *
 * This works by convention in BabylonJS but is meant to be use only with shader following the in place naming rules and conventions.
 */
var MaterialHelper = /** @class */ (function () {
    function MaterialHelper() {
    }
    /**
     * Binds the scene's uniform buffer to the effect.
     * @param effect defines the effect to bind to the scene uniform buffer
     * @param sceneUbo defines the uniform buffer storing scene data
     */
    MaterialHelper.BindSceneUniformBuffer = function (effect, sceneUbo) {
        sceneUbo.bindToEffect(effect, "Scene");
    };
    /**
     * Helps preparing the defines values about the UVs in used in the effect.
     * UVs are shared as much as we can across channels in the shaders.
     * @param texture The texture we are preparing the UVs for
     * @param defines The defines to update
     * @param key The channel key "diffuse", "specular"... used in the shader
     */
    MaterialHelper.PrepareDefinesForMergedUV = function (texture, defines, key) {
        defines._needUVs = true;
        defines[key] = true;
        if (texture.getTextureMatrix().isIdentityAs3x2()) {
            defines[key + "DIRECTUV"] = texture.coordinatesIndex + 1;
            defines["MAINUV" + (texture.coordinatesIndex + 1)] = true;
        }
        else {
            defines[key + "DIRECTUV"] = 0;
        }
    };
    /**
     * Binds a texture matrix value to its corresponding uniform
     * @param texture The texture to bind the matrix for
     * @param uniformBuffer The uniform buffer receiving the data
     * @param key The channel key "diffuse", "specular"... used in the shader
     */
    MaterialHelper.BindTextureMatrix = function (texture, uniformBuffer, key) {
        var matrix = texture.getTextureMatrix();
        uniformBuffer.updateMatrix(key + "Matrix", matrix);
    };
    /**
     * Gets the current status of the fog (should it be enabled?)
     * @param mesh defines the mesh to evaluate for fog support
     * @param scene defines the hosting scene
     * @returns true if fog must be enabled
     */
    MaterialHelper.GetFogState = function (mesh, scene) {
        return scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE;
    };
    /**
     * Helper used to prepare the list of defines associated with misc. values for shader compilation
     * @param mesh defines the current mesh
     * @param scene defines the current scene
     * @param useLogarithmicDepth defines if logarithmic depth has to be turned on
     * @param pointsCloud defines if point cloud rendering has to be turned on
     * @param fogEnabled defines if fog has to be turned on
     * @param alphaTest defines if alpha testing has to be turned on
     * @param defines defines the current list of defines
     */
    MaterialHelper.PrepareDefinesForMisc = function (mesh, scene, useLogarithmicDepth, pointsCloud, fogEnabled, alphaTest, defines) {
        if (defines._areMiscDirty) {
            defines["LOGARITHMICDEPTH"] = useLogarithmicDepth;
            defines["POINTSIZE"] = pointsCloud;
            defines["FOG"] = fogEnabled && this.GetFogState(mesh, scene);
            defines["NONUNIFORMSCALING"] = mesh.nonUniformScaling;
            defines["ALPHATEST"] = alphaTest;
        }
    };
    /**
     * Helper used to prepare the list of defines associated with frame values for shader compilation
     * @param scene defines the current scene
     * @param engine defines the current engine
     * @param defines specifies the list of active defines
     * @param useInstances defines if instances have to be turned on
     * @param useClipPlane defines if clip plane have to be turned on
     * @param useThinInstances defines if thin instances have to be turned on
     */
    MaterialHelper.PrepareDefinesForFrameBoundValues = function (scene, engine, defines, useInstances, useClipPlane, useThinInstances) {
        if (useClipPlane === void 0) { useClipPlane = null; }
        if (useThinInstances === void 0) { useThinInstances = false; }
        var changed = false;
        var useClipPlane1 = false;
        var useClipPlane2 = false;
        var useClipPlane3 = false;
        var useClipPlane4 = false;
        var useClipPlane5 = false;
        var useClipPlane6 = false;
        useClipPlane1 = useClipPlane == null ? scene.clipPlane !== undefined && scene.clipPlane !== null : useClipPlane;
        useClipPlane2 = useClipPlane == null ? scene.clipPlane2 !== undefined && scene.clipPlane2 !== null : useClipPlane;
        useClipPlane3 = useClipPlane == null ? scene.clipPlane3 !== undefined && scene.clipPlane3 !== null : useClipPlane;
        useClipPlane4 = useClipPlane == null ? scene.clipPlane4 !== undefined && scene.clipPlane4 !== null : useClipPlane;
        useClipPlane5 = useClipPlane == null ? scene.clipPlane5 !== undefined && scene.clipPlane5 !== null : useClipPlane;
        useClipPlane6 = useClipPlane == null ? scene.clipPlane6 !== undefined && scene.clipPlane6 !== null : useClipPlane;
        if (defines["CLIPPLANE"] !== useClipPlane1) {
            defines["CLIPPLANE"] = useClipPlane1;
            changed = true;
        }
        if (defines["CLIPPLANE2"] !== useClipPlane2) {
            defines["CLIPPLANE2"] = useClipPlane2;
            changed = true;
        }
        if (defines["CLIPPLANE3"] !== useClipPlane3) {
            defines["CLIPPLANE3"] = useClipPlane3;
            changed = true;
        }
        if (defines["CLIPPLANE4"] !== useClipPlane4) {
            defines["CLIPPLANE4"] = useClipPlane4;
            changed = true;
        }
        if (defines["CLIPPLANE5"] !== useClipPlane5) {
            defines["CLIPPLANE5"] = useClipPlane5;
            changed = true;
        }
        if (defines["CLIPPLANE6"] !== useClipPlane6) {
            defines["CLIPPLANE6"] = useClipPlane6;
            changed = true;
        }
        if (defines["DEPTHPREPASS"] !== !engine.getColorWrite()) {
            defines["DEPTHPREPASS"] = !defines["DEPTHPREPASS"];
            changed = true;
        }
        if (defines["INSTANCES"] !== useInstances) {
            defines["INSTANCES"] = useInstances;
            changed = true;
        }
        // ensure defines.INSTANCESCOLOR is not out of sync with instances
        if (defines["INSTANCESCOLOR"] && !defines["INSTANCES"]) {
            defines["INSTANCESCOLOR"] = false;
            changed = true;
        }
        if (defines["THIN_INSTANCES"] !== useThinInstances) {
            defines["THIN_INSTANCES"] = useThinInstances;
            changed = true;
        }
        if (changed) {
            defines.markAsUnprocessed();
        }
    };
    /**
     * Prepares the defines for bones
     * @param mesh The mesh containing the geometry data we will draw
     * @param defines The defines to update
     */
    MaterialHelper.PrepareDefinesForBones = function (mesh, defines) {
        if (mesh.useBones && mesh.computeBonesUsingShaders && mesh.skeleton) {
            defines["NUM_BONE_INFLUENCERS"] = mesh.numBoneInfluencers;
            var materialSupportsBoneTexture = defines["BONETEXTURE"] !== undefined;
            if (mesh.skeleton.isUsingTextureForMatrices && materialSupportsBoneTexture) {
                defines["BONETEXTURE"] = true;
            }
            else {
                defines["BonesPerMesh"] = mesh.skeleton.bones.length + 1;
                defines["BONETEXTURE"] = materialSupportsBoneTexture ? false : undefined;
                var prePassRenderer = mesh.getScene().prePassRenderer;
                if (prePassRenderer && prePassRenderer.enabled) {
                    var nonExcluded = prePassRenderer.excludedSkinnedMesh.indexOf(mesh) === -1;
                    defines["BONES_VELOCITY_ENABLED"] = nonExcluded;
                }
            }
        }
        else {
            defines["NUM_BONE_INFLUENCERS"] = 0;
            defines["BonesPerMesh"] = 0;
        }
    };
    /**
     * Prepares the defines for morph targets
     * @param mesh The mesh containing the geometry data we will draw
     * @param defines The defines to update
     */
    MaterialHelper.PrepareDefinesForMorphTargets = function (mesh, defines) {
        var manager = mesh.morphTargetManager;
        if (manager) {
            defines["MORPHTARGETS_UV"] = manager.supportsUVs && defines["UV1"];
            defines["MORPHTARGETS_TANGENT"] = manager.supportsTangents && defines["TANGENT"];
            defines["MORPHTARGETS_NORMAL"] = manager.supportsNormals && defines["NORMAL"];
            defines["MORPHTARGETS"] = manager.numInfluencers > 0;
            defines["NUM_MORPH_INFLUENCERS"] = manager.numInfluencers;
            defines["MORPHTARGETS_TEXTURE"] = manager.isUsingTextureForTargets;
        }
        else {
            defines["MORPHTARGETS_UV"] = false;
            defines["MORPHTARGETS_TANGENT"] = false;
            defines["MORPHTARGETS_NORMAL"] = false;
            defines["MORPHTARGETS"] = false;
            defines["NUM_MORPH_INFLUENCERS"] = 0;
        }
    };
    /**
     * Prepares the defines for baked vertex animation
     * @param mesh The mesh containing the geometry data we will draw
     * @param defines The defines to update
     */
    MaterialHelper.PrepareDefinesForBakedVertexAnimation = function (mesh, defines) {
        var manager = mesh.bakedVertexAnimationManager;
        defines["BAKED_VERTEX_ANIMATION_TEXTURE"] = manager && manager.isEnabled ? true : false;
    };
    /**
     * Prepares the defines used in the shader depending on the attributes data available in the mesh
     * @param mesh The mesh containing the geometry data we will draw
     * @param defines The defines to update
     * @param useVertexColor Precise whether vertex colors should be used or not (override mesh info)
     * @param useBones Precise whether bones should be used or not (override mesh info)
     * @param useMorphTargets Precise whether morph targets should be used or not (override mesh info)
     * @param useVertexAlpha Precise whether vertex alpha should be used or not (override mesh info)
     * @param useBakedVertexAnimation Precise whether baked vertex animation should be used or not (override mesh info)
     * @returns false if defines are considered not dirty and have not been checked
     */
    MaterialHelper.PrepareDefinesForAttributes = function (mesh, defines, useVertexColor, useBones, useMorphTargets, useVertexAlpha, useBakedVertexAnimation) {
        if (useMorphTargets === void 0) { useMorphTargets = false; }
        if (useVertexAlpha === void 0) { useVertexAlpha = true; }
        if (useBakedVertexAnimation === void 0) { useBakedVertexAnimation = true; }
        if (!defines._areAttributesDirty && defines._needNormals === defines._normals && defines._needUVs === defines._uvs) {
            return false;
        }
        defines._normals = defines._needNormals;
        defines._uvs = defines._needUVs;
        defines["NORMAL"] = defines._needNormals && mesh.isVerticesDataPresent(VertexBuffer.NormalKind);
        if (defines._needNormals && mesh.isVerticesDataPresent(VertexBuffer.TangentKind)) {
            defines["TANGENT"] = true;
        }
        for (var i = 1; i <= 6; ++i) {
            defines["UV" + i] = defines._needUVs ? mesh.isVerticesDataPresent("uv".concat(i === 1 ? "" : i)) : false;
        }
        if (useVertexColor) {
            var hasVertexColors = mesh.useVertexColors && mesh.isVerticesDataPresent(VertexBuffer.ColorKind);
            defines["VERTEXCOLOR"] = hasVertexColors;
            defines["VERTEXALPHA"] = mesh.hasVertexAlpha && hasVertexColors && useVertexAlpha;
        }
        if (mesh.isVerticesDataPresent(VertexBuffer.ColorInstanceKind) && (mesh.hasInstances || mesh.hasThinInstances)) {
            defines["INSTANCESCOLOR"] = true;
        }
        if (useBones) {
            this.PrepareDefinesForBones(mesh, defines);
        }
        if (useMorphTargets) {
            this.PrepareDefinesForMorphTargets(mesh, defines);
        }
        if (useBakedVertexAnimation) {
            this.PrepareDefinesForBakedVertexAnimation(mesh, defines);
        }
        return true;
    };
    /**
     * Prepares the defines related to multiview
     * @param scene The scene we are intending to draw
     * @param defines The defines to update
     */
    MaterialHelper.PrepareDefinesForMultiview = function (scene, defines) {
        if (scene.activeCamera) {
            var previousMultiview = defines.MULTIVIEW;
            defines.MULTIVIEW = scene.activeCamera.outputRenderTarget !== null && scene.activeCamera.outputRenderTarget.getViewCount() > 1;
            if (defines.MULTIVIEW != previousMultiview) {
                defines.markAsUnprocessed();
            }
        }
    };
    /**
     * Prepares the defines related to order independant transparency
     * @param scene The scene we are intending to draw
     * @param defines The defines to update
     * @param needAlphaBlending Determines if the material needs alpha blending
     */
    MaterialHelper.PrepareDefinesForOIT = function (scene, defines, needAlphaBlending) {
        var previousDefine = defines.ORDER_INDEPENDENT_TRANSPARENCY;
        var previousDefine16Bits = defines.ORDER_INDEPENDENT_TRANSPARENCY_16BITS;
        defines.ORDER_INDEPENDENT_TRANSPARENCY = scene.useOrderIndependentTransparency && needAlphaBlending;
        defines.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = !scene.getEngine().getCaps().textureFloatLinearFiltering;
        if (previousDefine !== defines.ORDER_INDEPENDENT_TRANSPARENCY || previousDefine16Bits !== defines.ORDER_INDEPENDENT_TRANSPARENCY_16BITS) {
            defines.markAsUnprocessed();
        }
    };
    /**
     * Prepares the defines related to the prepass
     * @param scene The scene we are intending to draw
     * @param defines The defines to update
     * @param canRenderToMRT Indicates if this material renders to several textures in the prepass
     */
    MaterialHelper.PrepareDefinesForPrePass = function (scene, defines, canRenderToMRT) {
        var previousPrePass = defines.PREPASS;
        if (!defines._arePrePassDirty) {
            return;
        }
        var texturesList = [
            {
                type: 1,
                define: "PREPASS_POSITION",
                index: "PREPASS_POSITION_INDEX",
            },
            {
                type: 2,
                define: "PREPASS_VELOCITY",
                index: "PREPASS_VELOCITY_INDEX",
            },
            {
                type: 3,
                define: "PREPASS_REFLECTIVITY",
                index: "PREPASS_REFLECTIVITY_INDEX",
            },
            {
                type: 0,
                define: "PREPASS_IRRADIANCE",
                index: "PREPASS_IRRADIANCE_INDEX",
            },
            {
                type: 7,
                define: "PREPASS_ALBEDO_SQRT",
                index: "PREPASS_ALBEDO_SQRT_INDEX",
            },
            {
                type: 5,
                define: "PREPASS_DEPTH",
                index: "PREPASS_DEPTH_INDEX",
            },
            {
                type: 6,
                define: "PREPASS_NORMAL",
                index: "PREPASS_NORMAL_INDEX",
            },
        ];
        if (scene.prePassRenderer && scene.prePassRenderer.enabled && canRenderToMRT) {
            defines.PREPASS = true;
            defines.SCENE_MRT_COUNT = scene.prePassRenderer.mrtCount;
            for (var i = 0; i < texturesList.length; i++) {
                var index = scene.prePassRenderer.getIndex(texturesList[i].type);
                if (index !== -1) {
                    defines[texturesList[i].define] = true;
                    defines[texturesList[i].index] = index;
                }
                else {
                    defines[texturesList[i].define] = false;
                }
            }
        }
        else {
            defines.PREPASS = false;
            for (var i = 0; i < texturesList.length; i++) {
                defines[texturesList[i].define] = false;
            }
        }
        if (defines.PREPASS != previousPrePass) {
            defines.markAsUnprocessed();
            defines.markAsImageProcessingDirty();
        }
    };
    /**
     * Prepares the defines related to the light information passed in parameter
     * @param scene The scene we are intending to draw
     * @param mesh The mesh the effect is compiling for
     * @param light The light the effect is compiling for
     * @param lightIndex The index of the light
     * @param defines The defines to update
     * @param specularSupported Specifies whether specular is supported or not (override lights data)
     * @param state Defines the current state regarding what is needed (normals, etc...)
     * @param state.needNormals
     * @param state.needRebuild
     * @param state.shadowEnabled
     * @param state.specularEnabled
     * @param state.lightmapMode
     */
    MaterialHelper.PrepareDefinesForLight = function (scene, mesh, light, lightIndex, defines, specularSupported, state) {
        state.needNormals = true;
        if (defines["LIGHT" + lightIndex] === undefined) {
            state.needRebuild = true;
        }
        defines["LIGHT" + lightIndex] = true;
        defines["SPOTLIGHT" + lightIndex] = false;
        defines["HEMILIGHT" + lightIndex] = false;
        defines["POINTLIGHT" + lightIndex] = false;
        defines["DIRLIGHT" + lightIndex] = false;
        light.prepareLightSpecificDefines(defines, lightIndex);
        // FallOff.
        defines["LIGHT_FALLOFF_PHYSICAL" + lightIndex] = false;
        defines["LIGHT_FALLOFF_GLTF" + lightIndex] = false;
        defines["LIGHT_FALLOFF_STANDARD" + lightIndex] = false;
        switch (light.falloffType) {
            case LightConstants.FALLOFF_GLTF:
                defines["LIGHT_FALLOFF_GLTF" + lightIndex] = true;
                break;
            case LightConstants.FALLOFF_PHYSICAL:
                defines["LIGHT_FALLOFF_PHYSICAL" + lightIndex] = true;
                break;
            case LightConstants.FALLOFF_STANDARD:
                defines["LIGHT_FALLOFF_STANDARD" + lightIndex] = true;
                break;
        }
        // Specular
        if (specularSupported && !light.specular.equalsFloats(0, 0, 0)) {
            state.specularEnabled = true;
        }
        // Shadows
        defines["SHADOW" + lightIndex] = false;
        defines["SHADOWCSM" + lightIndex] = false;
        defines["SHADOWCSMDEBUG" + lightIndex] = false;
        defines["SHADOWCSMNUM_CASCADES" + lightIndex] = false;
        defines["SHADOWCSMUSESHADOWMAXZ" + lightIndex] = false;
        defines["SHADOWCSMNOBLEND" + lightIndex] = false;
        defines["SHADOWCSM_RIGHTHANDED" + lightIndex] = false;
        defines["SHADOWPCF" + lightIndex] = false;
        defines["SHADOWPCSS" + lightIndex] = false;
        defines["SHADOWPOISSON" + lightIndex] = false;
        defines["SHADOWESM" + lightIndex] = false;
        defines["SHADOWCLOSEESM" + lightIndex] = false;
        defines["SHADOWCUBE" + lightIndex] = false;
        defines["SHADOWLOWQUALITY" + lightIndex] = false;
        defines["SHADOWMEDIUMQUALITY" + lightIndex] = false;
        if (mesh && mesh.receiveShadows && scene.shadowsEnabled && light.shadowEnabled) {
            var shadowGenerator = light.getShadowGenerator();
            if (shadowGenerator) {
                var shadowMap = shadowGenerator.getShadowMap();
                if (shadowMap) {
                    if (shadowMap.renderList && shadowMap.renderList.length > 0) {
                        state.shadowEnabled = true;
                        shadowGenerator.prepareDefines(defines, lightIndex);
                    }
                }
            }
        }
        if (light.lightmapMode != LightConstants.LIGHTMAP_DEFAULT) {
            state.lightmapMode = true;
            defines["LIGHTMAPEXCLUDED" + lightIndex] = true;
            defines["LIGHTMAPNOSPECULAR" + lightIndex] = light.lightmapMode == LightConstants.LIGHTMAP_SHADOWSONLY;
        }
        else {
            defines["LIGHTMAPEXCLUDED" + lightIndex] = false;
            defines["LIGHTMAPNOSPECULAR" + lightIndex] = false;
        }
    };
    /**
     * Prepares the defines related to the light information passed in parameter
     * @param scene The scene we are intending to draw
     * @param mesh The mesh the effect is compiling for
     * @param defines The defines to update
     * @param specularSupported Specifies whether specular is supported or not (override lights data)
     * @param maxSimultaneousLights Specifies how manuy lights can be added to the effect at max
     * @param disableLighting Specifies whether the lighting is disabled (override scene and light)
     * @returns true if normals will be required for the rest of the effect
     */
    MaterialHelper.PrepareDefinesForLights = function (scene, mesh, defines, specularSupported, maxSimultaneousLights, disableLighting) {
        if (maxSimultaneousLights === void 0) { maxSimultaneousLights = 4; }
        if (disableLighting === void 0) { disableLighting = false; }
        if (!defines._areLightsDirty) {
            return defines._needNormals;
        }
        var lightIndex = 0;
        var state = {
            needNormals: false,
            needRebuild: false,
            lightmapMode: false,
            shadowEnabled: false,
            specularEnabled: false,
        };
        if (scene.lightsEnabled && !disableLighting) {
            for (var _i = 0, _a = mesh.lightSources; _i < _a.length; _i++) {
                var light = _a[_i];
                this.PrepareDefinesForLight(scene, mesh, light, lightIndex, defines, specularSupported, state);
                lightIndex++;
                if (lightIndex === maxSimultaneousLights) {
                    break;
                }
            }
        }
        defines["SPECULARTERM"] = state.specularEnabled;
        defines["SHADOWS"] = state.shadowEnabled;
        // Resetting all other lights if any
        for (var index = lightIndex; index < maxSimultaneousLights; index++) {
            if (defines["LIGHT" + index] !== undefined) {
                defines["LIGHT" + index] = false;
                defines["HEMILIGHT" + index] = false;
                defines["POINTLIGHT" + index] = false;
                defines["DIRLIGHT" + index] = false;
                defines["SPOTLIGHT" + index] = false;
                defines["SHADOW" + index] = false;
                defines["SHADOWCSM" + index] = false;
                defines["SHADOWCSMDEBUG" + index] = false;
                defines["SHADOWCSMNUM_CASCADES" + index] = false;
                defines["SHADOWCSMUSESHADOWMAXZ" + index] = false;
                defines["SHADOWCSMNOBLEND" + index] = false;
                defines["SHADOWCSM_RIGHTHANDED" + index] = false;
                defines["SHADOWPCF" + index] = false;
                defines["SHADOWPCSS" + index] = false;
                defines["SHADOWPOISSON" + index] = false;
                defines["SHADOWESM" + index] = false;
                defines["SHADOWCLOSEESM" + index] = false;
                defines["SHADOWCUBE" + index] = false;
                defines["SHADOWLOWQUALITY" + index] = false;
                defines["SHADOWMEDIUMQUALITY" + index] = false;
            }
        }
        var caps = scene.getEngine().getCaps();
        if (defines["SHADOWFLOAT"] === undefined) {
            state.needRebuild = true;
        }
        defines["SHADOWFLOAT"] =
            state.shadowEnabled && ((caps.textureFloatRender && caps.textureFloatLinearFiltering) || (caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering));
        defines["LIGHTMAPEXCLUDED"] = state.lightmapMode;
        if (state.needRebuild) {
            defines.rebuild();
        }
        return state.needNormals;
    };
    /**
     * Prepares the uniforms and samplers list to be used in the effect (for a specific light)
     * @param lightIndex defines the light index
     * @param uniformsList The uniform list
     * @param samplersList The sampler list
     * @param projectedLightTexture defines if projected texture must be used
     * @param uniformBuffersList defines an optional list of uniform buffers
     * @param updateOnlyBuffersList True to only update the uniformBuffersList array
     */
    MaterialHelper.PrepareUniformsAndSamplersForLight = function (lightIndex, uniformsList, samplersList, projectedLightTexture, uniformBuffersList, updateOnlyBuffersList) {
        if (uniformBuffersList === void 0) { uniformBuffersList = null; }
        if (updateOnlyBuffersList === void 0) { updateOnlyBuffersList = false; }
        if (uniformBuffersList) {
            uniformBuffersList.push("Light" + lightIndex);
        }
        if (updateOnlyBuffersList) {
            return;
        }
        uniformsList.push("vLightData" + lightIndex, "vLightDiffuse" + lightIndex, "vLightSpecular" + lightIndex, "vLightDirection" + lightIndex, "vLightFalloff" + lightIndex, "vLightGround" + lightIndex, "lightMatrix" + lightIndex, "shadowsInfo" + lightIndex, "depthValues" + lightIndex);
        samplersList.push("shadowSampler" + lightIndex);
        samplersList.push("depthSampler" + lightIndex);
        uniformsList.push("viewFrustumZ" + lightIndex, "cascadeBlendFactor" + lightIndex, "lightSizeUVCorrection" + lightIndex, "depthCorrection" + lightIndex, "penumbraDarkness" + lightIndex, "frustumLengths" + lightIndex);
        if (projectedLightTexture) {
            samplersList.push("projectionLightSampler" + lightIndex);
            uniformsList.push("textureProjectionMatrix" + lightIndex);
        }
    };
    /**
     * Prepares the uniforms and samplers list to be used in the effect
     * @param uniformsListOrOptions The uniform names to prepare or an EffectCreationOptions containing the list and extra information
     * @param samplersList The sampler list
     * @param defines The defines helping in the list generation
     * @param maxSimultaneousLights The maximum number of simultaneous light allowed in the effect
     */
    MaterialHelper.PrepareUniformsAndSamplersList = function (uniformsListOrOptions, samplersList, defines, maxSimultaneousLights) {
        if (maxSimultaneousLights === void 0) { maxSimultaneousLights = 4; }
        var uniformsList;
        var uniformBuffersList = null;
        if (uniformsListOrOptions.uniformsNames) {
            var options = uniformsListOrOptions;
            uniformsList = options.uniformsNames;
            uniformBuffersList = options.uniformBuffersNames;
            samplersList = options.samplers;
            defines = options.defines;
            maxSimultaneousLights = options.maxSimultaneousLights || 0;
        }
        else {
            uniformsList = uniformsListOrOptions;
            if (!samplersList) {
                samplersList = [];
            }
        }
        for (var lightIndex = 0; lightIndex < maxSimultaneousLights; lightIndex++) {
            if (!defines["LIGHT" + lightIndex]) {
                break;
            }
            this.PrepareUniformsAndSamplersForLight(lightIndex, uniformsList, samplersList, defines["PROJECTEDLIGHTTEXTURE" + lightIndex], uniformBuffersList);
        }
        if (defines["NUM_MORPH_INFLUENCERS"]) {
            uniformsList.push("morphTargetInfluences");
        }
        if (defines["BAKED_VERTEX_ANIMATION_TEXTURE"]) {
            uniformsList.push("bakedVertexAnimationSettings");
            uniformsList.push("bakedVertexAnimationTextureSizeInverted");
            uniformsList.push("bakedVertexAnimationTime");
            samplersList.push("bakedVertexAnimationTexture");
        }
    };
    /**
     * This helps decreasing rank by rank the shadow quality (0 being the highest rank and quality)
     * @param defines The defines to update while falling back
     * @param fallbacks The authorized effect fallbacks
     * @param maxSimultaneousLights The maximum number of lights allowed
     * @param rank the current rank of the Effect
     * @returns The newly affected rank
     */
    MaterialHelper.HandleFallbacksForShadows = function (defines, fallbacks, maxSimultaneousLights, rank) {
        if (maxSimultaneousLights === void 0) { maxSimultaneousLights = 4; }
        if (rank === void 0) { rank = 0; }
        var lightFallbackRank = 0;
        for (var lightIndex = 0; lightIndex < maxSimultaneousLights; lightIndex++) {
            if (!defines["LIGHT" + lightIndex]) {
                break;
            }
            if (lightIndex > 0) {
                lightFallbackRank = rank + lightIndex;
                fallbacks.addFallback(lightFallbackRank, "LIGHT" + lightIndex);
            }
            if (!defines["SHADOWS"]) {
                if (defines["SHADOW" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOW" + lightIndex);
                }
                if (defines["SHADOWPCF" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOWPCF" + lightIndex);
                }
                if (defines["SHADOWPCSS" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOWPCSS" + lightIndex);
                }
                if (defines["SHADOWPOISSON" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOWPOISSON" + lightIndex);
                }
                if (defines["SHADOWESM" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOWESM" + lightIndex);
                }
                if (defines["SHADOWCLOSEESM" + lightIndex]) {
                    fallbacks.addFallback(rank, "SHADOWCLOSEESM" + lightIndex);
                }
            }
        }
        return lightFallbackRank++;
    };
    /**
     * Prepares the list of attributes required for morph targets according to the effect defines.
     * @param attribs The current list of supported attribs
     * @param mesh The mesh to prepare the morph targets attributes for
     * @param influencers The number of influencers
     */
    MaterialHelper.PrepareAttributesForMorphTargetsInfluencers = function (attribs, mesh, influencers) {
        this._TmpMorphInfluencers.NUM_MORPH_INFLUENCERS = influencers;
        this.PrepareAttributesForMorphTargets(attribs, mesh, this._TmpMorphInfluencers);
    };
    /**
     * Prepares the list of attributes required for morph targets according to the effect defines.
     * @param attribs The current list of supported attribs
     * @param mesh The mesh to prepare the morph targets attributes for
     * @param defines The current Defines of the effect
     */
    MaterialHelper.PrepareAttributesForMorphTargets = function (attribs, mesh, defines) {
        var influencers = defines["NUM_MORPH_INFLUENCERS"];
        if (influencers > 0 && EngineStore.LastCreatedEngine) {
            var maxAttributesCount = EngineStore.LastCreatedEngine.getCaps().maxVertexAttribs;
            var manager = mesh.morphTargetManager;
            if (manager === null || manager === void 0 ? void 0 : manager.isUsingTextureForTargets) {
                return;
            }
            var normal = manager && manager.supportsNormals && defines["NORMAL"];
            var tangent = manager && manager.supportsTangents && defines["TANGENT"];
            var uv = manager && manager.supportsUVs && defines["UV1"];
            for (var index = 0; index < influencers; index++) {
                attribs.push(VertexBuffer.PositionKind + index);
                if (normal) {
                    attribs.push(VertexBuffer.NormalKind + index);
                }
                if (tangent) {
                    attribs.push(VertexBuffer.TangentKind + index);
                }
                if (uv) {
                    attribs.push(VertexBuffer.UVKind + "_" + index);
                }
                if (attribs.length > maxAttributesCount) {
                    Logger.Error("Cannot add more vertex attributes for mesh " + mesh.name);
                }
            }
        }
    };
    /**
     * Prepares the list of attributes required for baked vertex animations according to the effect defines.
     * @param attribs The current list of supported attribs
     * @param mesh The mesh to prepare the morph targets attributes for
     * @param defines The current Defines of the effect
     */
    MaterialHelper.PrepareAttributesForBakedVertexAnimation = function (attribs, mesh, defines) {
        var enabled = defines["BAKED_VERTEX_ANIMATION_TEXTURE"] && defines["INSTANCES"];
        if (enabled) {
            attribs.push("bakedVertexAnimationSettingsInstanced");
        }
    };
    /**
     * Prepares the list of attributes required for bones according to the effect defines.
     * @param attribs The current list of supported attribs
     * @param mesh The mesh to prepare the bones attributes for
     * @param defines The current Defines of the effect
     * @param fallbacks The current effect fallback strategy
     */
    MaterialHelper.PrepareAttributesForBones = function (attribs, mesh, defines, fallbacks) {
        if (defines["NUM_BONE_INFLUENCERS"] > 0) {
            fallbacks.addCPUSkinningFallback(0, mesh);
            attribs.push(VertexBuffer.MatricesIndicesKind);
            attribs.push(VertexBuffer.MatricesWeightsKind);
            if (defines["NUM_BONE_INFLUENCERS"] > 4) {
                attribs.push(VertexBuffer.MatricesIndicesExtraKind);
                attribs.push(VertexBuffer.MatricesWeightsExtraKind);
            }
        }
    };
    /**
     * Check and prepare the list of attributes required for instances according to the effect defines.
     * @param attribs The current list of supported attribs
     * @param defines The current MaterialDefines of the effect
     */
    MaterialHelper.PrepareAttributesForInstances = function (attribs, defines) {
        if (defines["INSTANCES"] || defines["THIN_INSTANCES"]) {
            this.PushAttributesForInstances(attribs, !!defines["PREPASS_VELOCITY"]);
        }
        if (defines.INSTANCESCOLOR) {
            attribs.push(VertexBuffer.ColorInstanceKind);
        }
    };
    /**
     * Add the list of attributes required for instances to the attribs array.
     * @param attribs The current list of supported attribs
     * @param needsPreviousMatrices If the shader needs previous matrices
     */
    MaterialHelper.PushAttributesForInstances = function (attribs, needsPreviousMatrices) {
        if (needsPreviousMatrices === void 0) { needsPreviousMatrices = false; }
        attribs.push("world0");
        attribs.push("world1");
        attribs.push("world2");
        attribs.push("world3");
        if (needsPreviousMatrices) {
            attribs.push("previousWorld0");
            attribs.push("previousWorld1");
            attribs.push("previousWorld2");
            attribs.push("previousWorld3");
        }
    };
    /**
     * Binds the light information to the effect.
     * @param light The light containing the generator
     * @param effect The effect we are binding the data to
     * @param lightIndex The light index in the effect used to render
     */
    MaterialHelper.BindLightProperties = function (light, effect, lightIndex) {
        light.transferToEffect(effect, lightIndex + "");
    };
    /**
     * Binds the lights information from the scene to the effect for the given mesh.
     * @param light Light to bind
     * @param lightIndex Light index
     * @param scene The scene where the light belongs to
     * @param effect The effect we are binding the data to
     * @param useSpecular Defines if specular is supported
     * @param receiveShadows Defines if the effect (mesh) we bind the light for receives shadows
     */
    MaterialHelper.BindLight = function (light, lightIndex, scene, effect, useSpecular, receiveShadows) {
        if (receiveShadows === void 0) { receiveShadows = true; }
        light._bindLight(lightIndex, scene, effect, useSpecular, receiveShadows);
    };
    /**
     * Binds the lights information from the scene to the effect for the given mesh.
     * @param scene The scene the lights belongs to
     * @param mesh The mesh we are binding the information to render
     * @param effect The effect we are binding the data to
     * @param defines The generated defines for the effect
     * @param maxSimultaneousLights The maximum number of light that can be bound to the effect
     */
    MaterialHelper.BindLights = function (scene, mesh, effect, defines, maxSimultaneousLights) {
        if (maxSimultaneousLights === void 0) { maxSimultaneousLights = 4; }
        var len = Math.min(mesh.lightSources.length, maxSimultaneousLights);
        for (var i = 0; i < len; i++) {
            var light = mesh.lightSources[i];
            this.BindLight(light, i, scene, effect, typeof defines === "boolean" ? defines : defines["SPECULARTERM"], mesh.receiveShadows);
        }
    };
    /**
     * Binds the fog information from the scene to the effect for the given mesh.
     * @param scene The scene the lights belongs to
     * @param mesh The mesh we are binding the information to render
     * @param effect The effect we are binding the data to
     * @param linearSpace Defines if the fog effect is applied in linear space
     */
    MaterialHelper.BindFogParameters = function (scene, mesh, effect, linearSpace) {
        if (linearSpace === void 0) { linearSpace = false; }
        if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            // Convert fog color to linear space if used in a linear space computed shader.
            if (linearSpace) {
                scene.fogColor.toLinearSpaceToRef(this._TempFogColor);
                effect.setColor3("vFogColor", this._TempFogColor);
            }
            else {
                effect.setColor3("vFogColor", scene.fogColor);
            }
        }
    };
    /**
     * Binds the bones information from the mesh to the effect.
     * @param mesh The mesh we are binding the information to render
     * @param effect The effect we are binding the data to
     * @param prePassConfiguration Configuration for the prepass, in case prepass is activated
     */
    MaterialHelper.BindBonesParameters = function (mesh, effect, prePassConfiguration) {
        if (!effect || !mesh) {
            return;
        }
        if (mesh.computeBonesUsingShaders && effect._bonesComputationForcedToCPU) {
            mesh.computeBonesUsingShaders = false;
        }
        if (mesh.useBones && mesh.computeBonesUsingShaders && mesh.skeleton) {
            var skeleton = mesh.skeleton;
            if (skeleton.isUsingTextureForMatrices && effect.getUniformIndex("boneTextureWidth") > -1) {
                var boneTexture = skeleton.getTransformMatrixTexture(mesh);
                effect.setTexture("boneSampler", boneTexture);
                effect.setFloat("boneTextureWidth", 4.0 * (skeleton.bones.length + 1));
            }
            else {
                var matrices = skeleton.getTransformMatrices(mesh);
                if (matrices) {
                    effect.setMatrices("mBones", matrices);
                    if (prePassConfiguration && mesh.getScene().prePassRenderer && mesh.getScene().prePassRenderer.getIndex(2)) {
                        if (!prePassConfiguration.previousBones[mesh.uniqueId]) {
                            prePassConfiguration.previousBones[mesh.uniqueId] = matrices.slice();
                        }
                        effect.setMatrices("mPreviousBones", prePassConfiguration.previousBones[mesh.uniqueId]);
                        MaterialHelper._CopyBonesTransformationMatrices(matrices, prePassConfiguration.previousBones[mesh.uniqueId]);
                    }
                }
            }
        }
    };
    // Copies the bones transformation matrices into the target array and returns the target's reference
    MaterialHelper._CopyBonesTransformationMatrices = function (source, target) {
        target.set(source);
        return target;
    };
    /**
     * Binds the morph targets information from the mesh to the effect.
     * @param abstractMesh The mesh we are binding the information to render
     * @param effect The effect we are binding the data to
     */
    MaterialHelper.BindMorphTargetParameters = function (abstractMesh, effect) {
        var manager = abstractMesh.morphTargetManager;
        if (!abstractMesh || !manager) {
            return;
        }
        effect.setFloatArray("morphTargetInfluences", manager.influences);
    };
    /**
     * Binds the logarithmic depth information from the scene to the effect for the given defines.
     * @param defines The generated defines used in the effect
     * @param effect The effect we are binding the data to
     * @param scene The scene we are willing to render with logarithmic scale for
     */
    MaterialHelper.BindLogDepth = function (defines, effect, scene) {
        if (!defines || defines["LOGARITHMICDEPTH"]) {
            var camera = scene.activeCamera;
            if (camera.mode === Camera.ORTHOGRAPHIC_CAMERA) {
                Logger.Error("Logarithmic depth is not compatible with orthographic cameras!", 20);
            }
            effect.setFloat("logarithmicDepthConstant", 2.0 / (Math.log(camera.maxZ + 1.0) / Math.LN2));
        }
    };
    /**
     * Binds the clip plane information from the scene to the effect.
     * @param effect The effect we are binding the data to
     * @param scene The scene the clip plane information are extracted from
     */
    MaterialHelper.BindClipPlane = function (effect, scene) {
        ThinMaterialHelper.BindClipPlane(effect, scene);
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MaterialHelper._TmpMorphInfluencers = { NUM_MORPH_INFLUENCERS: 0 };
    MaterialHelper._TempFogColor = Color3.Black();
    return MaterialHelper;
}());

/**
 * Class that holds the different stencil states of a material
 * Usage example: https://playground.babylonjs.com/#CW5PRI#10
 */
var MaterialStencilState = /** @class */ (function () {
    /**
     * Creates a material stencil state instance
     */
    function MaterialStencilState() {
        this.reset();
    }
    /**
     * Resets all the stencil states to default values
     */
    MaterialStencilState.prototype.reset = function () {
        this.enabled = false;
        this.mask = 0xff;
        this.func = 519;
        this.funcRef = 1;
        this.funcMask = 0xff;
        this.opStencilFail = 7680;
        this.opDepthFail = 7680;
        this.opStencilDepthPass = 7681;
    };
    Object.defineProperty(MaterialStencilState.prototype, "func", {
        /**
         * Gets or sets the stencil function
         */
        get: function () {
            return this._func;
        },
        set: function (value) {
            this._func = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "funcRef", {
        /**
         * Gets or sets the stencil function reference
         */
        get: function () {
            return this._funcRef;
        },
        set: function (value) {
            this._funcRef = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "funcMask", {
        /**
         * Gets or sets the stencil function mask
         */
        get: function () {
            return this._funcMask;
        },
        set: function (value) {
            this._funcMask = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "opStencilFail", {
        /**
         * Gets or sets the operation when the stencil test fails
         */
        get: function () {
            return this._opStencilFail;
        },
        set: function (value) {
            this._opStencilFail = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "opDepthFail", {
        /**
         * Gets or sets the operation when the depth test fails
         */
        get: function () {
            return this._opDepthFail;
        },
        set: function (value) {
            this._opDepthFail = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "opStencilDepthPass", {
        /**
         * Gets or sets the operation when the stencil+depth test succeeds
         */
        get: function () {
            return this._opStencilDepthPass;
        },
        set: function (value) {
            this._opStencilDepthPass = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "mask", {
        /**
         * Gets or sets the stencil mask
         */
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this._mask = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialStencilState.prototype, "enabled", {
        /**
         * Enables or disables the stencil test
         */
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the current class name, useful for serialization or dynamic coding.
     * @returns "MaterialStencilState"
     */
    MaterialStencilState.prototype.getClassName = function () {
        return "MaterialStencilState";
    };
    /**
     * Makes a duplicate of the current configuration into another one.
     * @param stencilState defines stencil state where to copy the info
     */
    MaterialStencilState.prototype.copyTo = function (stencilState) {
        SerializationHelper.Clone(function () { return stencilState; }, this);
    };
    /**
     * Serializes this stencil configuration.
     * @returns - An object with the serialized config.
     */
    MaterialStencilState.prototype.serialize = function () {
        return SerializationHelper.Serialize(this);
    };
    /**
     * Parses a stencil state configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    MaterialStencilState.prototype.parse = function (source, scene, rootUrl) {
        var _this = this;
        SerializationHelper.Parse(function () { return _this; }, source, scene, rootUrl);
    };
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "func", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "funcRef", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "funcMask", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "opStencilFail", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "opDepthFail", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "opStencilDepthPass", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "mask", null);
    __decorate([
        serialize()
    ], MaterialStencilState.prototype, "enabled", null);
    return MaterialStencilState;
}());

/**
 * @hidden
 */
var MaterialPluginEvent;
(function (MaterialPluginEvent) {
    MaterialPluginEvent[MaterialPluginEvent["Created"] = 1] = "Created";
    MaterialPluginEvent[MaterialPluginEvent["Disposed"] = 2] = "Disposed";
    MaterialPluginEvent[MaterialPluginEvent["GetDefineNames"] = 4] = "GetDefineNames";
    MaterialPluginEvent[MaterialPluginEvent["PrepareUniformBuffer"] = 8] = "PrepareUniformBuffer";
    MaterialPluginEvent[MaterialPluginEvent["IsReadyForSubMesh"] = 16] = "IsReadyForSubMesh";
    MaterialPluginEvent[MaterialPluginEvent["PrepareDefines"] = 32] = "PrepareDefines";
    MaterialPluginEvent[MaterialPluginEvent["BindForSubMesh"] = 64] = "BindForSubMesh";
    MaterialPluginEvent[MaterialPluginEvent["PrepareEffect"] = 128] = "PrepareEffect";
    MaterialPluginEvent[MaterialPluginEvent["GetAnimatables"] = 256] = "GetAnimatables";
    MaterialPluginEvent[MaterialPluginEvent["GetActiveTextures"] = 512] = "GetActiveTextures";
    MaterialPluginEvent[MaterialPluginEvent["HasTexture"] = 1024] = "HasTexture";
    MaterialPluginEvent[MaterialPluginEvent["FillRenderTargetTextures"] = 2048] = "FillRenderTargetTextures";
    MaterialPluginEvent[MaterialPluginEvent["HasRenderTargetTextures"] = 4096] = "HasRenderTargetTextures";
    MaterialPluginEvent[MaterialPluginEvent["HardBindForSubMesh"] = 8192] = "HardBindForSubMesh";
})(MaterialPluginEvent || (MaterialPluginEvent = {}));

/**
 * Base class for the main features of a material in Babylon.js
 */
var Material = /** @class */ (function () {
    /**
     * Creates a material instance
     * @param name defines the name of the material
     * @param scene defines the scene to reference
     * @param doNotAdd specifies if the material should be added to the scene
     */
    function Material(name, scene, doNotAdd) {
        /**
         * Custom shadow depth material to use for shadow rendering instead of the in-built one
         */
        this.shadowDepthWrapper = null;
        /**
         * Gets or sets a boolean indicating that the material is allowed (if supported) to do shader hot swapping.
         * This means that the material can keep using a previous shader while a new one is being compiled.
         * This is mostly used when shader parallel compilation is supported (true by default)
         */
        this.allowShaderHotSwapping = true;
        /**
         * Gets or sets user defined metadata
         */
        this.metadata = null;
        /**
         * For internal use only. Please do not use.
         */
        this.reservedDataStore = null;
        /**
         * Specifies if the ready state should be checked on each call
         */
        this.checkReadyOnEveryCall = false;
        /**
         * Specifies if the ready state should be checked once
         */
        this.checkReadyOnlyOnce = false;
        /**
         * The state of the material
         */
        this.state = "";
        /**
         * The alpha value of the material
         */
        this._alpha = 1.0;
        /**
         * Specifies if back face culling is enabled
         */
        this._backFaceCulling = true;
        /**
         * Specifies if back or front faces should be culled (when culling is enabled)
         */
        this._cullBackFaces = true;
        /**
         * Callback triggered when the material is compiled
         */
        this.onCompiled = null;
        /**
         * Callback triggered when an error occurs
         */
        this.onError = null;
        /**
         * Callback triggered to get the render target textures
         */
        this.getRenderTargetTextures = null;
        /**
         * Specifies if the material should be serialized
         */
        this.doNotSerialize = false;
        /**
         * @hidden
         */
        this._storeEffectOnSubMeshes = false;
        /**
         * Stores the animations for the material
         */
        this.animations = null;
        /**
         * An event triggered when the material is disposed
         */
        this.onDisposeObservable = new Observable();
        /**
         * An observer which watches for dispose events
         */
        this._onDisposeObserver = null;
        this._onUnBindObservable = null;
        /**
         * An observer which watches for bind events
         */
        this._onBindObserver = null;
        /**
         * Stores the value of the alpha mode
         */
        this._alphaMode = 2;
        /**
         * Stores the state of the need depth pre-pass value
         */
        this._needDepthPrePass = false;
        /**
         * Specifies if depth writing should be disabled
         */
        this.disableDepthWrite = false;
        /**
         * Specifies if color writing should be disabled
         */
        this.disableColorWrite = false;
        /**
         * Specifies if depth writing should be forced
         */
        this.forceDepthWrite = false;
        /**
         * Specifies the depth function that should be used. 0 means the default engine function
         */
        this.depthFunction = 0;
        /**
         * Specifies if there should be a separate pass for culling
         */
        this.separateCullingPass = false;
        /**
         * Stores the state specifying if fog should be enabled
         */
        this._fogEnabled = true;
        /**
         * Stores the size of points
         */
        this.pointSize = 1.0;
        /**
         * Stores the z offset Factor value
         */
        this.zOffset = 0;
        /**
         * Stores the z offset Units value
         */
        this.zOffsetUnits = 0;
        /**
         * Gives access to the stencil properties of the material
         */
        this.stencil = new MaterialStencilState();
        /**
         * Specifies if uniform buffers should be used
         */
        this._useUBO = false;
        /**
         * Stores the fill mode state
         */
        this._fillMode = Material.TriangleFillMode;
        /**
         * Specifies if the depth write state should be cached
         */
        this._cachedDepthWriteState = false;
        /**
         * Specifies if the color write state should be cached
         */
        this._cachedColorWriteState = false;
        /**
         * Specifies if the depth function state should be cached
         */
        this._cachedDepthFunctionState = 0;
        /** @hidden */
        this._indexInSceneMaterialArray = -1;
        /** @hidden */
        this.meshMap = null;
        /** @hidden */
        this._parentContainer = null;
        /** @hidden */
        this._uniformBufferLayoutBuilt = false;
        this._eventInfo = {}; // will be initialized before each event notification
        /** @hidden */
        this._callbackPluginEventGeneric = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventIsReadyForSubMesh = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventPrepareDefines = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventPrepareDefinesBeforeAttributes = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventHardBindForSubMesh = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventBindForSubMesh = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventHasRenderTargetTextures = function () { return void 0; };
        /** @hidden */
        this._callbackPluginEventFillRenderTargetTextures = function () { return void 0; };
        /**
         * Enforces alpha test in opaque or blend mode in order to improve the performances of some situations.
         */
        this._forceAlphaTest = false;
        /**
         * The transparency mode of the material.
         */
        this._transparencyMode = null;
        this.name = name;
        var setScene = scene || EngineStore.LastCreatedScene;
        if (!setScene) {
            return;
        }
        this._scene = setScene;
        this._dirtyCallbacks = {};
        this._dirtyCallbacks[1] = this._markAllSubMeshesAsTexturesDirty.bind(this);
        this._dirtyCallbacks[2] = this._markAllSubMeshesAsLightsDirty.bind(this);
        this._dirtyCallbacks[4] = this._markAllSubMeshesAsFresnelDirty.bind(this);
        this._dirtyCallbacks[8] = this._markAllSubMeshesAsAttributesDirty.bind(this);
        this._dirtyCallbacks[16] = this._markAllSubMeshesAsMiscDirty.bind(this);
        this._dirtyCallbacks[32] = this._markAllSubMeshesAsPrePassDirty.bind(this);
        this._dirtyCallbacks[63] = this._markAllSubMeshesAsAllDirty.bind(this);
        this.id = name || Tools.RandomId();
        this.uniqueId = this._scene.getUniqueId();
        this._materialContext = this._scene.getEngine().createMaterialContext();
        this._drawWrapper = new DrawWrapper(this._scene.getEngine(), false);
        this._drawWrapper.materialContext = this._materialContext;
        if (this._scene.useRightHandedSystem) {
            this.sideOrientation = Material.ClockWiseSideOrientation;
        }
        else {
            this.sideOrientation = Material.CounterClockWiseSideOrientation;
        }
        this._uniformBuffer = new UniformBuffer(this._scene.getEngine(), undefined, undefined, name);
        this._useUBO = this.getScene().getEngine().supportsUniformBuffers;
        if (!doNotAdd) {
            this._scene.addMaterial(this);
        }
        if (this._scene.useMaterialMeshMap) {
            this.meshMap = {};
        }
        Material.OnEventObservable.notifyObservers(this, MaterialPluginEvent.Created);
    }
    Object.defineProperty(Material.prototype, "canRenderToMRT", {
        /**
         * If the material can be rendered to several textures with MRT extension
         */
        get: function () {
            // By default, shaders are not compatible with MRTs
            // Base classes should override that if their shader supports MRT
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "alpha", {
        /**
         * Gets the alpha value of the material
         */
        get: function () {
            return this._alpha;
        },
        /**
         * Sets the alpha value of the material
         */
        set: function (value) {
            if (this._alpha === value) {
                return;
            }
            var oldValue = this._alpha;
            this._alpha = value;
            // Only call dirty when there is a state change (no alpha / alpha)
            if (oldValue === 1 || value === 1) {
                this.markAsDirty(Material.MiscDirtyFlag);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "backFaceCulling", {
        /**
         * Gets the culling state
         */
        get: function () {
            return this._backFaceCulling;
        },
        /**
         * Sets the culling state (true to enable culling, false to disable)
         */
        set: function (value) {
            if (this._backFaceCulling === value) {
                return;
            }
            this._backFaceCulling = value;
            this.markAsDirty(Material.TextureDirtyFlag);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "cullBackFaces", {
        /**
         * Gets the type of faces that should be culled
         */
        get: function () {
            return this._cullBackFaces;
        },
        /**
         * Sets the type of faces that should be culled (true for back faces, false for front faces)
         */
        set: function (value) {
            if (this._cullBackFaces === value) {
                return;
            }
            this._cullBackFaces = value;
            this.markAsDirty(Material.TextureDirtyFlag);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "hasRenderTargetTextures", {
        /**
         * Gets a boolean indicating that current material needs to register RTT
         */
        get: function () {
            this._eventInfo.hasRenderTargetTextures = false;
            this._callbackPluginEventHasRenderTargetTextures(this._eventInfo);
            return this._eventInfo.hasRenderTargetTextures;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "onDispose", {
        /**
         * Called during a dispose event
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
    Object.defineProperty(Material.prototype, "onBindObservable", {
        /**
         * An event triggered when the material is bound
         */
        get: function () {
            if (!this._onBindObservable) {
                this._onBindObservable = new Observable();
            }
            return this._onBindObservable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "onBind", {
        /**
         * Called during a bind event
         */
        set: function (callback) {
            if (this._onBindObserver) {
                this.onBindObservable.remove(this._onBindObserver);
            }
            this._onBindObserver = this.onBindObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "onUnBindObservable", {
        /**
         * An event triggered when the material is unbound
         */
        get: function () {
            if (!this._onUnBindObservable) {
                this._onUnBindObservable = new Observable();
            }
            return this._onUnBindObservable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "onEffectCreatedObservable", {
        /**
         * An event triggered when the effect is (re)created
         */
        get: function () {
            if (!this._onEffectCreatedObservable) {
                this._onEffectCreatedObservable = new Observable();
            }
            return this._onEffectCreatedObservable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "alphaMode", {
        /**
         * Gets the value of the alpha mode
         */
        get: function () {
            return this._alphaMode;
        },
        /**
         * Sets the value of the alpha mode.
         *
         * | Value | Type | Description |
         * | --- | --- | --- |
         * | 0 | ALPHA_DISABLE |   |
         * | 1 | ALPHA_ADD |   |
         * | 2 | ALPHA_COMBINE |   |
         * | 3 | ALPHA_SUBTRACT |   |
         * | 4 | ALPHA_MULTIPLY |   |
         * | 5 | ALPHA_MAXIMIZED |   |
         * | 6 | ALPHA_ONEONE |   |
         * | 7 | ALPHA_PREMULTIPLIED |   |
         * | 8 | ALPHA_PREMULTIPLIED_PORTERDUFF |   |
         * | 9 | ALPHA_INTERPOLATE |   |
         * | 10 | ALPHA_SCREENMODE |   |
         *
         */
        set: function (value) {
            if (this._alphaMode === value) {
                return;
            }
            this._alphaMode = value;
            this.markAsDirty(Material.TextureDirtyFlag);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "needDepthPrePass", {
        /**
         * Gets the depth pre-pass value
         */
        get: function () {
            return this._needDepthPrePass;
        },
        /**
         * Sets the need depth pre-pass value
         */
        set: function (value) {
            if (this._needDepthPrePass === value) {
                return;
            }
            this._needDepthPrePass = value;
            if (this._needDepthPrePass) {
                this.checkReadyOnEveryCall = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "isPrePassCapable", {
        /**
         * Can this material render to prepass
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "fogEnabled", {
        /**
         * Gets the value of the fog enabled state
         */
        get: function () {
            return this._fogEnabled;
        },
        /**
         * Sets the state for enabling fog
         */
        set: function (value) {
            if (this._fogEnabled === value) {
                return;
            }
            this._fogEnabled = value;
            this.markAsDirty(Material.MiscDirtyFlag);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "wireframe", {
        get: function () {
            switch (this._fillMode) {
                case Material.WireFrameFillMode:
                case Material.LineListDrawMode:
                case Material.LineLoopDrawMode:
                case Material.LineStripDrawMode:
                    return true;
            }
            return this._scene.forceWireframe;
        },
        /**
         * Sets the state of wireframe mode
         */
        set: function (value) {
            this.fillMode = value ? Material.WireFrameFillMode : Material.TriangleFillMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "pointsCloud", {
        /**
         * Gets the value specifying if point clouds are enabled
         */
        get: function () {
            switch (this._fillMode) {
                case Material.PointFillMode:
                case Material.PointListDrawMode:
                    return true;
            }
            return this._scene.forcePointsCloud;
        },
        /**
         * Sets the state of point cloud mode
         */
        set: function (value) {
            this.fillMode = value ? Material.PointFillMode : Material.TriangleFillMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "fillMode", {
        /**
         * Gets the material fill mode
         */
        get: function () {
            return this._fillMode;
        },
        /**
         * Sets the material fill mode
         */
        set: function (value) {
            if (this._fillMode === value) {
                return;
            }
            this._fillMode = value;
            this.markAsDirty(Material.MiscDirtyFlag);
        },
        enumerable: false,
        configurable: true
    });
    /** @hidden */
    Material.prototype._getDrawWrapper = function () {
        return this._drawWrapper;
    };
    /**
     * @param drawWrapper
     * @hidden
     */
    Material.prototype._setDrawWrapper = function (drawWrapper) {
        this._drawWrapper = drawWrapper;
    };
    /**
     * Returns a string representation of the current material
     * @param fullDetails defines a boolean indicating which levels of logging is desired
     * @returns a string with material information
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.toString = function (fullDetails) {
        var ret = "Name: " + this.name;
        return ret;
    };
    /**
     * Gets the class name of the material
     * @returns a string with the class name of the material
     */
    Material.prototype.getClassName = function () {
        return "Material";
    };
    Object.defineProperty(Material.prototype, "isFrozen", {
        /**
         * Specifies if updates for the material been locked
         */
        get: function () {
            return this.checkReadyOnlyOnce;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Locks updates for the material
     */
    Material.prototype.freeze = function () {
        this.markDirty();
        this.checkReadyOnlyOnce = true;
    };
    /**
     * Unlocks updates for the material
     */
    Material.prototype.unfreeze = function () {
        this.markDirty();
        this.checkReadyOnlyOnce = false;
    };
    /**
     * Specifies if the material is ready to be used
     * @param mesh defines the mesh to check
     * @param useInstances specifies if instances should be used
     * @returns a boolean indicating if the material is ready to be used
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.isReady = function (mesh, useInstances) {
        return true;
    };
    /**
     * Specifies that the submesh is ready to be used
     * @param mesh defines the mesh to check
     * @param subMesh defines which submesh to check
     * @param useInstances specifies that instances should be used
     * @returns a boolean indicating that the submesh is ready or not
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
        var defines = subMesh.materialDefines;
        if (!defines) {
            return false;
        }
        this._eventInfo.isReadyForSubMesh = true;
        this._eventInfo.defines = defines;
        this._callbackPluginEventIsReadyForSubMesh(this._eventInfo);
        return this._eventInfo.isReadyForSubMesh;
    };
    /**
     * Returns the material effect
     * @returns the effect associated with the material
     */
    Material.prototype.getEffect = function () {
        return this._drawWrapper.effect;
    };
    /**
     * Returns the current scene
     * @returns a Scene
     */
    Material.prototype.getScene = function () {
        return this._scene;
    };
    Object.defineProperty(Material.prototype, "transparencyMode", {
        /**
         * Gets the current transparency mode.
         */
        get: function () {
            return this._transparencyMode;
        },
        /**
         * Sets the transparency mode of the material.
         *
         * | Value | Type                                | Description |
         * | ----- | ----------------------------------- | ----------- |
         * | 0     | OPAQUE                              |             |
         * | 1     | ALPHATEST                           |             |
         * | 2     | ALPHABLEND                          |             |
         * | 3     | ALPHATESTANDBLEND                   |             |
         *
         */
        set: function (value) {
            if (this._transparencyMode === value) {
                return;
            }
            this._transparencyMode = value;
            this._forceAlphaTest = value === Material.MATERIAL_ALPHATESTANDBLEND;
            this._markAllSubMeshesAsTexturesAndMiscDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "_disableAlphaBlending", {
        /**
         * Returns true if alpha blending should be disabled.
         */
        get: function () {
            return this._transparencyMode === Material.MATERIAL_OPAQUE || this._transparencyMode === Material.MATERIAL_ALPHATEST;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Specifies whether or not this material should be rendered in alpha blend mode.
     * @returns a boolean specifying if alpha blending is needed
     */
    Material.prototype.needAlphaBlending = function () {
        if (this._disableAlphaBlending) {
            return false;
        }
        return this.alpha < 1.0;
    };
    /**
     * Specifies if the mesh will require alpha blending
     * @param mesh defines the mesh to check
     * @returns a boolean specifying if alpha blending is needed for the mesh
     */
    Material.prototype.needAlphaBlendingForMesh = function (mesh) {
        if (this._disableAlphaBlending && mesh.visibility >= 1.0) {
            return false;
        }
        return this.needAlphaBlending() || mesh.visibility < 1.0 || mesh.hasVertexAlpha;
    };
    /**
     * Specifies whether or not this material should be rendered in alpha test mode.
     * @returns a boolean specifying if an alpha test is needed.
     */
    Material.prototype.needAlphaTesting = function () {
        if (this._forceAlphaTest) {
            return true;
        }
        return false;
    };
    /**
     * Specifies if material alpha testing should be turned on for the mesh
     * @param mesh defines the mesh to check
     */
    Material.prototype._shouldTurnAlphaTestOn = function (mesh) {
        return !this.needAlphaBlendingForMesh(mesh) && this.needAlphaTesting();
    };
    /**
     * Gets the texture used for the alpha test
     * @returns the texture to use for alpha testing
     */
    Material.prototype.getAlphaTestTexture = function () {
        return null;
    };
    /**
     * Marks the material to indicate that it needs to be re-calculated
     */
    Material.prototype.markDirty = function () {
        var meshes = this.getScene().meshes;
        for (var _i = 0, meshes_1 = meshes; _i < meshes_1.length; _i++) {
            var mesh = meshes_1[_i];
            if (!mesh.subMeshes) {
                continue;
            }
            for (var _a = 0, _b = mesh.subMeshes; _a < _b.length; _a++) {
                var subMesh = _b[_a];
                if (subMesh.getMaterial() !== this) {
                    continue;
                }
                if (!subMesh.effect) {
                    continue;
                }
                subMesh.effect._wasPreviouslyReady = false;
                subMesh.effect._wasPreviouslyUsingInstances = null;
            }
        }
    };
    /**
     * @param effect
     * @param overrideOrientation
     * @hidden
     */
    Material.prototype._preBind = function (effect, overrideOrientation) {
        if (overrideOrientation === void 0) { overrideOrientation = null; }
        var engine = this._scene.getEngine();
        var orientation = overrideOrientation == null ? this.sideOrientation : overrideOrientation;
        var reverse = orientation === Material.ClockWiseSideOrientation;
        engine.enableEffect(effect ? effect : this._getDrawWrapper());
        engine.setState(this.backFaceCulling, this.zOffset, false, reverse, this.cullBackFaces, this.stencil, this.zOffsetUnits);
        return reverse;
    };
    /**
     * Binds the material to the mesh
     * @param world defines the world transformation matrix
     * @param mesh defines the mesh to bind the material to
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.bind = function (world, mesh) { };
    /**
     * Initializes the uniform buffer layout for the shader.
     */
    Material.prototype.buildUniformLayout = function () {
        var ubo = this._uniformBuffer;
        this._eventInfo.ubo = ubo;
        this._callbackPluginEventGeneric(MaterialPluginEvent.PrepareUniformBuffer, this._eventInfo);
        ubo.create();
        this._uniformBufferLayoutBuilt = true;
    };
    /**
     * Binds the submesh to the material
     * @param world defines the world transformation matrix
     * @param mesh defines the mesh containing the submesh
     * @param subMesh defines the submesh to bind the material to
     */
    Material.prototype.bindForSubMesh = function (world, mesh, subMesh) {
        var effect = subMesh.effect;
        if (!effect) {
            return;
        }
        this._eventInfo.subMesh = subMesh;
        this._callbackPluginEventBindForSubMesh(this._eventInfo);
    };
    /**
     * Binds the world matrix to the material
     * @param world defines the world transformation matrix
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.bindOnlyWorldMatrix = function (world) { };
    /**
     * Binds the view matrix to the effect
     * @param effect defines the effect to bind the view matrix to
     */
    Material.prototype.bindView = function (effect) {
        if (!this._useUBO) {
            effect.setMatrix("view", this.getScene().getViewMatrix());
        }
        else {
            this._needToBindSceneUbo = true;
        }
    };
    /**
     * Binds the view projection and projection matrices to the effect
     * @param effect defines the effect to bind the view projection and projection matrices to
     */
    Material.prototype.bindViewProjection = function (effect) {
        if (!this._useUBO) {
            effect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
            effect.setMatrix("projection", this.getScene().getProjectionMatrix());
        }
        else {
            this._needToBindSceneUbo = true;
        }
    };
    /**
     * Binds the view matrix to the effect
     * @param effect defines the effect to bind the view matrix to
     * @param variableName name of the shader variable that will hold the eye position
     */
    Material.prototype.bindEyePosition = function (effect, variableName) {
        if (!this._useUBO) {
            this._scene.bindEyePosition(effect, variableName);
        }
        else {
            this._needToBindSceneUbo = true;
        }
    };
    /**
     * Processes to execute after binding the material to a mesh
     * @param mesh defines the rendered mesh
     * @param effect
     */
    Material.prototype._afterBind = function (mesh, effect) {
        if (effect === void 0) { effect = null; }
        this._scene._cachedMaterial = this;
        if (this._needToBindSceneUbo) {
            if (effect) {
                this._needToBindSceneUbo = false;
                MaterialHelper.BindSceneUniformBuffer(effect, this.getScene().getSceneUniformBuffer());
                this._scene.finalizeSceneUbo();
            }
        }
        if (mesh) {
            this._scene._cachedVisibility = mesh.visibility;
        }
        else {
            this._scene._cachedVisibility = 1;
        }
        if (this._onBindObservable && mesh) {
            this._onBindObservable.notifyObservers(mesh);
        }
        if (this.disableDepthWrite) {
            var engine = this._scene.getEngine();
            this._cachedDepthWriteState = engine.getDepthWrite();
            engine.setDepthWrite(false);
        }
        if (this.disableColorWrite) {
            var engine = this._scene.getEngine();
            this._cachedColorWriteState = engine.getColorWrite();
            engine.setColorWrite(false);
        }
        if (this.depthFunction !== 0) {
            var engine = this._scene.getEngine();
            this._cachedDepthFunctionState = engine.getDepthFunction() || 0;
            engine.setDepthFunction(this.depthFunction);
        }
    };
    /**
     * Unbinds the material from the mesh
     */
    Material.prototype.unbind = function () {
        if (this._onUnBindObservable) {
            this._onUnBindObservable.notifyObservers(this);
        }
        if (this.depthFunction !== 0) {
            var engine = this._scene.getEngine();
            engine.setDepthFunction(this._cachedDepthFunctionState);
        }
        if (this.disableDepthWrite) {
            var engine = this._scene.getEngine();
            engine.setDepthWrite(this._cachedDepthWriteState);
        }
        if (this.disableColorWrite) {
            var engine = this._scene.getEngine();
            engine.setColorWrite(this._cachedColorWriteState);
        }
    };
    /**
     * Returns the animatable textures.
     * @returns - Array of animatable textures.
     */
    Material.prototype.getAnimatables = function () {
        this._eventInfo.animatables = [];
        this._callbackPluginEventGeneric(MaterialPluginEvent.GetAnimatables, this._eventInfo);
        return this._eventInfo.animatables;
    };
    /**
     * Gets the active textures from the material
     * @returns an array of textures
     */
    Material.prototype.getActiveTextures = function () {
        this._eventInfo.activeTextures = [];
        this._callbackPluginEventGeneric(MaterialPluginEvent.GetActiveTextures, this._eventInfo);
        return this._eventInfo.activeTextures;
    };
    /**
     * Specifies if the material uses a texture
     * @param texture defines the texture to check against the material
     * @returns a boolean specifying if the material uses the texture
     */
    Material.prototype.hasTexture = function (texture) {
        this._eventInfo.hasTexture = false;
        this._eventInfo.texture = texture;
        this._callbackPluginEventGeneric(MaterialPluginEvent.HasTexture, this._eventInfo);
        return this._eventInfo.hasTexture;
    };
    /**
     * Makes a duplicate of the material, and gives it a new name
     * @param name defines the new name for the duplicated material
     * @returns the cloned material
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.clone = function (name) {
        return null;
    };
    /**
     * Gets the meshes bound to the material
     * @returns an array of meshes bound to the material
     */
    Material.prototype.getBindedMeshes = function () {
        var _this = this;
        if (this.meshMap) {
            var result = new Array();
            for (var meshId in this.meshMap) {
                var mesh = this.meshMap[meshId];
                if (mesh) {
                    result.push(mesh);
                }
            }
            return result;
        }
        else {
            var meshes = this._scene.meshes;
            return meshes.filter(function (mesh) { return mesh.material === _this; });
        }
    };
    /**
     * Force shader compilation
     * @param mesh defines the mesh associated with this material
     * @param onCompiled defines a function to execute once the material is compiled
     * @param options defines the options to configure the compilation
     * @param onError defines a function to execute if the material fails compiling
     */
    Material.prototype.forceCompilation = function (mesh, onCompiled, options, onError) {
        var _this = this;
        var localOptions = __assign({ clipPlane: false, useInstances: false }, options);
        var scene = this.getScene();
        var currentHotSwapingState = this.allowShaderHotSwapping;
        this.allowShaderHotSwapping = false; // Turned off to let us evaluate the real compilation state
        var checkReady = function () {
            if (!_this._scene || !_this._scene.getEngine()) {
                return;
            }
            var clipPlaneState = scene.clipPlane;
            if (localOptions.clipPlane) {
                scene.clipPlane = new Plane(0, 0, 0, 1);
            }
            if (_this._storeEffectOnSubMeshes) {
                var allDone = true, lastError = null;
                if (mesh.subMeshes) {
                    var tempSubMesh = new SubMesh(0, 0, 0, 0, 0, mesh, undefined, false, false);
                    if (tempSubMesh.materialDefines) {
                        tempSubMesh.materialDefines._renderId = -1;
                    }
                    if (!_this.isReadyForSubMesh(mesh, tempSubMesh, localOptions.useInstances)) {
                        if (tempSubMesh.effect && tempSubMesh.effect.getCompilationError() && tempSubMesh.effect.allFallbacksProcessed()) {
                            lastError = tempSubMesh.effect.getCompilationError();
                        }
                        else {
                            allDone = false;
                            setTimeout(checkReady, 16);
                        }
                    }
                }
                if (allDone) {
                    _this.allowShaderHotSwapping = currentHotSwapingState;
                    if (lastError) {
                        if (onError) {
                            onError(lastError);
                        }
                    }
                    if (onCompiled) {
                        onCompiled(_this);
                    }
                }
            }
            else {
                if (_this.isReady()) {
                    _this.allowShaderHotSwapping = currentHotSwapingState;
                    if (onCompiled) {
                        onCompiled(_this);
                    }
                }
                else {
                    setTimeout(checkReady, 16);
                }
            }
            if (localOptions.clipPlane) {
                scene.clipPlane = clipPlaneState;
            }
        };
        checkReady();
    };
    /**
     * Force shader compilation
     * @param mesh defines the mesh that will use this material
     * @param options defines additional options for compiling the shaders
     * @returns a promise that resolves when the compilation completes
     */
    Material.prototype.forceCompilationAsync = function (mesh, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.forceCompilation(mesh, function () {
                resolve();
            }, options, function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * Marks a define in the material to indicate that it needs to be re-computed
     * @param flag defines a flag used to determine which parts of the material have to be marked as dirty
     */
    Material.prototype.markAsDirty = function (flag) {
        if (this.getScene().blockMaterialDirtyMechanism) {
            return;
        }
        Material._DirtyCallbackArray.length = 0;
        if (flag & Material.TextureDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._TextureDirtyCallBack);
        }
        if (flag & Material.LightDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._LightsDirtyCallBack);
        }
        if (flag & Material.FresnelDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._FresnelDirtyCallBack);
        }
        if (flag & Material.AttributesDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._AttributeDirtyCallBack);
        }
        if (flag & Material.MiscDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._MiscDirtyCallBack);
        }
        if (flag & Material.PrePassDirtyFlag) {
            Material._DirtyCallbackArray.push(Material._PrePassDirtyCallBack);
        }
        if (Material._DirtyCallbackArray.length) {
            this._markAllSubMeshesAsDirty(Material._RunDirtyCallBacks);
        }
        this.getScene().resetCachedMaterial();
    };
    /**
     * Resets the draw wrappers cache for all submeshes that are using this material
     */
    Material.prototype.resetDrawCache = function () {
        var meshes = this.getScene().meshes;
        for (var _i = 0, meshes_2 = meshes; _i < meshes_2.length; _i++) {
            var mesh = meshes_2[_i];
            if (!mesh.subMeshes) {
                continue;
            }
            for (var _a = 0, _b = mesh.subMeshes; _a < _b.length; _a++) {
                var subMesh = _b[_a];
                if (subMesh.getMaterial() !== this) {
                    continue;
                }
                subMesh.resetDrawCache();
            }
        }
    };
    /**
     * Marks all submeshes of a material to indicate that their material defines need to be re-calculated
     * @param func defines a function which checks material defines against the submeshes
     */
    Material.prototype._markAllSubMeshesAsDirty = function (func) {
        if (this.getScene().blockMaterialDirtyMechanism) {
            return;
        }
        var meshes = this.getScene().meshes;
        for (var _i = 0, meshes_3 = meshes; _i < meshes_3.length; _i++) {
            var mesh = meshes_3[_i];
            if (!mesh.subMeshes) {
                continue;
            }
            for (var _a = 0, _b = mesh.subMeshes; _a < _b.length; _a++) {
                var subMesh = _b[_a];
                // We want to skip the submeshes which are not using this material or which have not yet rendered at least once
                if (subMesh.getMaterial(false) !== this) {
                    continue;
                }
                for (var _c = 0, _d = subMesh._drawWrappers; _c < _d.length; _c++) {
                    var drawWrapper = _d[_c];
                    if (!drawWrapper || !drawWrapper.defines || !drawWrapper.defines.markAllAsDirty) {
                        continue;
                    }
                    if (this._materialContext === drawWrapper.materialContext) {
                        func(drawWrapper.defines);
                    }
                }
            }
        }
    };
    /**
     * Indicates that the scene should check if the rendering now needs a prepass
     */
    Material.prototype._markScenePrePassDirty = function () {
        if (this.getScene().blockMaterialDirtyMechanism) {
            return;
        }
        var prePassRenderer = this.getScene().enablePrePassRenderer();
        if (prePassRenderer) {
            prePassRenderer.markAsDirty();
        }
    };
    /**
     * Indicates that we need to re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsAllDirty = function () {
        this._markAllSubMeshesAsDirty(Material._AllDirtyCallBack);
    };
    /**
     * Indicates that image processing needs to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsImageProcessingDirty = function () {
        this._markAllSubMeshesAsDirty(Material._ImageProcessingDirtyCallBack);
    };
    /**
     * Indicates that textures need to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._markAllSubMeshesAsDirty(Material._TextureDirtyCallBack);
    };
    /**
     * Indicates that fresnel needs to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsFresnelDirty = function () {
        this._markAllSubMeshesAsDirty(Material._FresnelDirtyCallBack);
    };
    /**
     * Indicates that fresnel and misc need to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsFresnelAndMiscDirty = function () {
        this._markAllSubMeshesAsDirty(Material._FresnelAndMiscDirtyCallBack);
    };
    /**
     * Indicates that lights need to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsLightsDirty = function () {
        this._markAllSubMeshesAsDirty(Material._LightsDirtyCallBack);
    };
    /**
     * Indicates that attributes need to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsAttributesDirty = function () {
        this._markAllSubMeshesAsDirty(Material._AttributeDirtyCallBack);
    };
    /**
     * Indicates that misc needs to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsMiscDirty = function () {
        this._markAllSubMeshesAsDirty(Material._MiscDirtyCallBack);
    };
    /**
     * Indicates that prepass needs to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsPrePassDirty = function () {
        this._markAllSubMeshesAsDirty(Material._MiscDirtyCallBack);
    };
    /**
     * Indicates that textures and misc need to be re-calculated for all submeshes
     */
    Material.prototype._markAllSubMeshesAsTexturesAndMiscDirty = function () {
        this._markAllSubMeshesAsDirty(Material._TextureAndMiscDirtyCallBack);
    };
    /**
     * Sets the required values to the prepass renderer.
     * @param prePassRenderer defines the prepass renderer to setup.
     * @returns true if the pre pass is needed.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Material.prototype.setPrePassRenderer = function (prePassRenderer) {
        // Do Nothing by default
        return false;
    };
    /**
     * Disposes the material
     * @param forceDisposeEffect specifies if effects should be forcefully disposed
     * @param forceDisposeTextures specifies if textures should be forcefully disposed
     * @param notBoundToMesh specifies if the material that is being disposed is known to be not bound to any mesh
     */
    Material.prototype.dispose = function (forceDisposeEffect, forceDisposeTextures, notBoundToMesh) {
        var scene = this.getScene();
        // Animations
        scene.stopAnimation(this);
        scene.freeProcessedMaterials();
        // Remove from scene
        scene.removeMaterial(this);
        this._eventInfo.forceDisposeTextures = forceDisposeTextures;
        this._callbackPluginEventGeneric(MaterialPluginEvent.Disposed, this._eventInfo);
        if (this._parentContainer) {
            var index = this._parentContainer.materials.indexOf(this);
            if (index > -1) {
                this._parentContainer.materials.splice(index, 1);
            }
            this._parentContainer = null;
        }
        if (notBoundToMesh !== true) {
            // Remove from meshes
            if (this.meshMap) {
                for (var meshId in this.meshMap) {
                    var mesh = this.meshMap[meshId];
                    if (mesh) {
                        mesh.material = null; // will set the entry in the map to undefined
                        this.releaseVertexArrayObject(mesh, forceDisposeEffect);
                    }
                }
            }
            else {
                var meshes = scene.meshes;
                for (var _i = 0, meshes_4 = meshes; _i < meshes_4.length; _i++) {
                    var mesh = meshes_4[_i];
                    if (mesh.material === this && !mesh.sourceMesh) {
                        mesh.material = null;
                        this.releaseVertexArrayObject(mesh, forceDisposeEffect);
                    }
                }
            }
        }
        this._uniformBuffer.dispose();
        // Shader are kept in cache for further use but we can get rid of this by using forceDisposeEffect
        if (forceDisposeEffect && this._drawWrapper.effect) {
            if (!this._storeEffectOnSubMeshes) {
                this._drawWrapper.effect.dispose();
            }
            this._drawWrapper.effect = null;
        }
        this.metadata = null;
        // Callback
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
        if (this._onBindObservable) {
            this._onBindObservable.clear();
        }
        if (this._onUnBindObservable) {
            this._onUnBindObservable.clear();
        }
        if (this._onEffectCreatedObservable) {
            this._onEffectCreatedObservable.clear();
        }
    };
    /**
     * @param mesh
     * @param forceDisposeEffect
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Material.prototype.releaseVertexArrayObject = function (mesh, forceDisposeEffect) {
        if (mesh.geometry) {
            var geometry = mesh.geometry;
            if (this._storeEffectOnSubMeshes) {
                for (var _i = 0, _a = mesh.subMeshes; _i < _a.length; _i++) {
                    var subMesh = _a[_i];
                    geometry._releaseVertexArrayObject(subMesh.effect);
                    if (forceDisposeEffect && subMesh.effect) {
                        subMesh.effect.dispose();
                    }
                }
            }
            else {
                geometry._releaseVertexArrayObject(this._drawWrapper.effect);
            }
        }
    };
    /**
     * Serializes this material
     * @returns the serialized material object
     */
    Material.prototype.serialize = function () {
        var serializationObject = SerializationHelper.Serialize(this);
        serializationObject.stencil = this.stencil.serialize();
        serializationObject.uniqueId = this.uniqueId;
        return serializationObject;
    };
    /**
     * Creates a material from parsed material data
     * @param parsedMaterial defines parsed material data
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures
     * @returns a new material
     */
    Material.Parse = function (parsedMaterial, scene, rootUrl) {
        if (!parsedMaterial.customType) {
            parsedMaterial.customType = "BABYLON.StandardMaterial";
        }
        else if (parsedMaterial.customType === "BABYLON.PBRMaterial" && parsedMaterial.overloadedAlbedo) {
            parsedMaterial.customType = "BABYLON.LegacyPBRMaterial";
            if (!BABYLON.LegacyPBRMaterial) {
                Logger.Error("Your scene is trying to load a legacy version of the PBRMaterial, please, include it from the materials library.");
                return null;
            }
        }
        var materialType = Tools.Instantiate(parsedMaterial.customType);
        var material = materialType.Parse(parsedMaterial, scene, rootUrl);
        material._loadedUniqueId = parsedMaterial.uniqueId;
        return material;
    };
    /**
     * Returns the triangle fill mode
     */
    Material.TriangleFillMode = 0;
    /**
     * Returns the wireframe mode
     */
    Material.WireFrameFillMode = 1;
    /**
     * Returns the point fill mode
     */
    Material.PointFillMode = 2;
    /**
     * Returns the point list draw mode
     */
    Material.PointListDrawMode = 3;
    /**
     * Returns the line list draw mode
     */
    Material.LineListDrawMode = 4;
    /**
     * Returns the line loop draw mode
     */
    Material.LineLoopDrawMode = 5;
    /**
     * Returns the line strip draw mode
     */
    Material.LineStripDrawMode = 6;
    /**
     * Returns the triangle strip draw mode
     */
    Material.TriangleStripDrawMode = 7;
    /**
     * Returns the triangle fan draw mode
     */
    Material.TriangleFanDrawMode = 8;
    /**
     * Stores the clock-wise side orientation
     */
    Material.ClockWiseSideOrientation = 0;
    /**
     * Stores the counter clock-wise side orientation
     */
    Material.CounterClockWiseSideOrientation = 1;
    /**
     * The dirty texture flag value
     */
    Material.TextureDirtyFlag = 1;
    /**
     * The dirty light flag value
     */
    Material.LightDirtyFlag = 2;
    /**
     * The dirty fresnel flag value
     */
    Material.FresnelDirtyFlag = 4;
    /**
     * The dirty attribute flag value
     */
    Material.AttributesDirtyFlag = 8;
    /**
     * The dirty misc flag value
     */
    Material.MiscDirtyFlag = 16;
    /**
     * The dirty prepass flag value
     */
    Material.PrePassDirtyFlag = 32;
    /**
     * The all dirty flag value
     */
    Material.AllDirtyFlag = 63;
    /**
     * MaterialTransparencyMode: No transparency mode, Alpha channel is not use.
     */
    Material.MATERIAL_OPAQUE = 0;
    /**
     * MaterialTransparencyMode: Alpha Test mode, pixel are discarded below a certain threshold defined by the alpha cutoff value.
     */
    Material.MATERIAL_ALPHATEST = 1;
    /**
     * MaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     */
    Material.MATERIAL_ALPHABLEND = 2;
    /**
     * MaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     * They are also discarded below the alpha cutoff threshold to improve performances.
     */
    Material.MATERIAL_ALPHATESTANDBLEND = 3;
    /**
     * The Whiteout method is used to blend normals.
     * Details of the algorithm can be found here: https://blog.selfshadow.com/publications/blending-in-detail/
     */
    Material.MATERIAL_NORMALBLENDMETHOD_WHITEOUT = 0;
    /**
     * The Reoriented Normal Mapping method is used to blend normals.
     * Details of the algorithm can be found here: https://blog.selfshadow.com/publications/blending-in-detail/
     */
    Material.MATERIAL_NORMALBLENDMETHOD_RNM = 1;
    /**
     * Event observable which raises global events common to all materials (like MaterialPluginEvent.Created)
     */
    Material.OnEventObservable = new Observable();
    Material._AllDirtyCallBack = function (defines) { return defines.markAllAsDirty(); };
    Material._ImageProcessingDirtyCallBack = function (defines) { return defines.markAsImageProcessingDirty(); };
    Material._TextureDirtyCallBack = function (defines) { return defines.markAsTexturesDirty(); };
    Material._FresnelDirtyCallBack = function (defines) { return defines.markAsFresnelDirty(); };
    Material._MiscDirtyCallBack = function (defines) { return defines.markAsMiscDirty(); };
    Material._PrePassDirtyCallBack = function (defines) { return defines.markAsPrePassDirty(); };
    Material._LightsDirtyCallBack = function (defines) { return defines.markAsLightDirty(); };
    Material._AttributeDirtyCallBack = function (defines) { return defines.markAsAttributesDirty(); };
    Material._FresnelAndMiscDirtyCallBack = function (defines) {
        Material._FresnelDirtyCallBack(defines);
        Material._MiscDirtyCallBack(defines);
    };
    Material._TextureAndMiscDirtyCallBack = function (defines) {
        Material._TextureDirtyCallBack(defines);
        Material._MiscDirtyCallBack(defines);
    };
    Material._DirtyCallbackArray = [];
    Material._RunDirtyCallBacks = function (defines) {
        for (var _i = 0, _a = Material._DirtyCallbackArray; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb(defines);
        }
    };
    __decorate([
        serialize()
    ], Material.prototype, "id", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "uniqueId", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "name", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "metadata", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "checkReadyOnEveryCall", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "checkReadyOnlyOnce", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "state", void 0);
    __decorate([
        serialize("alpha")
    ], Material.prototype, "_alpha", void 0);
    __decorate([
        serialize("backFaceCulling")
    ], Material.prototype, "_backFaceCulling", void 0);
    __decorate([
        serialize("cullBackFaces")
    ], Material.prototype, "_cullBackFaces", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "sideOrientation", void 0);
    __decorate([
        serialize("alphaMode")
    ], Material.prototype, "_alphaMode", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "_needDepthPrePass", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "disableDepthWrite", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "disableColorWrite", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "forceDepthWrite", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "depthFunction", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "separateCullingPass", void 0);
    __decorate([
        serialize("fogEnabled")
    ], Material.prototype, "_fogEnabled", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "pointSize", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "zOffset", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "zOffsetUnits", void 0);
    __decorate([
        serialize()
    ], Material.prototype, "pointsCloud", null);
    __decorate([
        serialize()
    ], Material.prototype, "fillMode", null);
    __decorate([
        serialize()
    ], Material.prototype, "transparencyMode", null);
    return Material;
}());

export { Material as M, MaterialHelper as a, MaterialPluginEvent as b };
