import { a as __extends, _ as __decorate, b as __assign } from '../../../../common/tslib.es6-2542203d.js';
import { s as serialize, h as expandToProperty, b as serializeAsTexture, g as serializeAsColor3, i as serializeAsVector2, j as serializeAsImageProcessingConfiguration, S as SerializationHelper } from '../../../../common/decorators-549f2b16.js';
import { T as Texture } from '../../../../common/texture-a93bc695.js';
import { R as RGBDTextureTools } from '../../../../common/baseTexture.polynomial-97d9cf1c.js';
import { T as Tools } from '../../../../common/tools-7eb5c69a.js';
import { C as Color3, T as TmpColors } from '../../../../common/math.color-1c350db4.js';
import { L as Logger } from '../../../../common/logger-bef9f4b6.js';
import { a as SmartArray } from '../../../../common/smartArray-23f1522f.js';
import { M as MaterialDefines, I as ImageProcessingConfiguration, a as Scene } from '../../../../common/scene-02f0c3e7.js';
import { a as Vector2, T as TmpVectors, b as Vector4 } from '../../../../common/math.vector-92740b4e.js';
import { V as VertexBuffer } from '../../../../common/buffer-82c85d65.js';
import { M as MaterialPluginBase, a as MaterialFlags, P as PrePassConfiguration, D as DetailMapConfiguration } from '../../../../common/material.detailMapConfiguration-44b683e2.js';
import { S as Scalar } from '../../../../common/math.scalar-e66d1d02.js';
import { a as MaterialHelper, b as MaterialPluginEvent, M as Material } from '../../../../common/material-68530d52.js';
import { P as PushMaterial, E as EffectFallbacks } from '../../../../common/effectFallbacks-a40d45c6.js';
import { d as ShaderStore } from '../../../../common/effect-95a5a78c.js';
import '../../../../common/helperFunctions-8f465fbc.js';
import { R as RegisterClass } from '../../../../common/typeStore-e0f83823.js';
import '../../../../common/devTools-40c203e4.js';
import '../../../../common/observable-08535f24.js';
import '../../../../common/engineStore-733743e8.js';
import '../../../../common/guid-586031d9.js';
import '../../../../common/fileTools-e883e409.js';
import '../../../../common/webRequest-2d96397b.js';
import '../../../../common/error-ec1bafe5.js';
import '../../../../common/stringTools-39526e6b.js';
import '../../../../common/dataBuffer-bed89e2d.js';
import '../../../../common/drawWrapper-5520764a.js';
import '../../../../common/math.size-6da31c23.js';
import '../../../../common/math.plane-b261e683.js';
import '../../../../common/compatibilityOptions-4310763a.js';
import '../../../../common/engine-6da2def3.js';
import '../../../../common/perfCounter-0abcf648.js';
import '../../../../common/renderTargetTexture-410d481a.js';
import '../../../../common/renderingManager-0400bd4b.js';
import '../../../../common/sphericalPolynomial-25a51db3.js';
import '../../../../common/math.axis-65421e97.js';
import '../../../../common/math.frustum-eeb481de.js';
import '../../../../common/math.viewport-b1e0df60.js';
import '../../../../common/arrayTools-18b75ee3.js';
import '../../../../common/uniformBuffer-c6105a9c.js';
import '../../../../common/pickingInfo-2221fa52.js';
import '../../../../common/deviceInputEvents-42cd30dd.js';
import '../../../../common/lightConstants-574d2608.js';
import '../../../../common/subMesh-a55557e5.js';
import '../../../../common/boundingInfo-f6524041.js';
import '../../../../common/math.functions-a28f00ce.js';
import '../../../../common/camera-8f300542.js';
import '../../../../common/node-0c79311f.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
var _environmentBRDFBase64Texture = "data:image/png;base64,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";
var _instanceNumber = 0;
/**
 * Gets a default environment BRDF for MS-BRDF Height Correlated BRDF
 * @param scene defines the hosting scene
 * @returns the environment BRDF texture
 */
var GetEnvironmentBRDFTexture = function (scene) {
    if (!scene.environmentBRDFTexture) {
        // Forces Delayed Texture Loading to prevent undefined error whilst setting RGBD values.
        var useDelayedTextureLoading = scene.useDelayedTextureLoading;
        scene.useDelayedTextureLoading = false;
        var previousState = scene._blockEntityCollection;
        scene._blockEntityCollection = false;
        var texture_1 = Texture.CreateFromBase64String(_environmentBRDFBase64Texture, "EnvironmentBRDFTexture" + _instanceNumber++, scene, true, false, Texture.BILINEAR_SAMPLINGMODE);
        scene._blockEntityCollection = previousState;
        // BRDF Texture should not be cached here due to pre processing and redundant scene caches.
        var texturesCache = scene.getEngine().getLoadedTexturesCache();
        var index = texturesCache.indexOf(texture_1.getInternalTexture());
        if (index !== -1) {
            texturesCache.splice(index, 1);
        }
        texture_1.isRGBD = true;
        texture_1.wrapU = Texture.CLAMP_ADDRESSMODE;
        texture_1.wrapV = Texture.CLAMP_ADDRESSMODE;
        scene.environmentBRDFTexture = texture_1;
        scene.useDelayedTextureLoading = useDelayedTextureLoading;
        RGBDTextureTools.ExpandRGBDTexture(texture_1);
        var observer_1 = scene.getEngine().onContextRestoredObservable.add(function () {
            texture_1.isRGBD = true;
            var checkReady = function () {
                if (texture_1.isReady()) {
                    RGBDTextureTools.ExpandRGBDTexture(texture_1);
                }
                else {
                    Tools.SetImmediate(checkReady);
                }
            };
            checkReady();
        });
        scene.onDisposeObservable.add(function () {
            scene.getEngine().onContextRestoredObservable.remove(observer_1);
        });
    }
    return scene.environmentBRDFTexture;
};

/**
 * @hidden
 */
var MaterialBRDFDefines = /** @class */ (function (_super) {
    __extends(MaterialBRDFDefines, _super);
    function MaterialBRDFDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BRDF_V_HEIGHT_CORRELATED = false;
        _this.MS_BRDF_ENERGY_CONSERVATION = false;
        _this.SPHERICAL_HARMONICS = false;
        _this.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION = false;
        return _this;
    }
    return MaterialBRDFDefines;
}(MaterialDefines));
/**
 * Plugin that implements the BRDF component of the PBR material
 */
var PBRBRDFConfiguration = /** @class */ (function (_super) {
    __extends(PBRBRDFConfiguration, _super);
    function PBRBRDFConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "PBRBRDF", 90, new MaterialBRDFDefines(), addToPluginList) || this;
        _this._useEnergyConservation = PBRBRDFConfiguration.DEFAULT_USE_ENERGY_CONSERVATION;
        /**
         * Defines if the material uses energy conservation.
         */
        _this.useEnergyConservation = PBRBRDFConfiguration.DEFAULT_USE_ENERGY_CONSERVATION;
        _this._useSmithVisibilityHeightCorrelated = PBRBRDFConfiguration.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED;
        /**
         * LEGACY Mode set to false
         * Defines if the material uses height smith correlated visibility term.
         * If you intent to not use our default BRDF, you need to load a separate BRDF Texture for the PBR
         * You can either load https://assets.babylonjs.com/environments/uncorrelatedBRDF.png
         * or https://assets.babylonjs.com/environments/uncorrelatedBRDF.dds to have more precision
         * Not relying on height correlated will also disable energy conservation.
         */
        _this.useSmithVisibilityHeightCorrelated = PBRBRDFConfiguration.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED;
        _this._useSphericalHarmonics = PBRBRDFConfiguration.DEFAULT_USE_SPHERICAL_HARMONICS;
        /**
         * LEGACY Mode set to false
         * Defines if the material uses spherical harmonics vs spherical polynomials for the
         * diffuse part of the IBL.
         * The harmonics despite a tiny bigger cost has been proven to provide closer results
         * to the ground truth.
         */
        _this.useSphericalHarmonics = PBRBRDFConfiguration.DEFAULT_USE_SPHERICAL_HARMONICS;
        _this._useSpecularGlossinessInputEnergyConservation = PBRBRDFConfiguration.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION;
        /**
         * Defines if the material uses energy conservation, when the specular workflow is active.
         * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
         * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
         * In the deactivated case, the material author has to ensure energy conservation, for a physically plausible rendering.
         */
        _this.useSpecularGlossinessInputEnergyConservation = PBRBRDFConfiguration.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION;
        _this._internalMarkAllSubMeshesAsMiscDirty = material._dirtyCallbacks[16];
        _this._enable(true);
        return _this;
    }
    /** @hidden */
    PBRBRDFConfiguration.prototype._markAllSubMeshesAsMiscDirty = function () {
        this._internalMarkAllSubMeshesAsMiscDirty();
    };
    PBRBRDFConfiguration.prototype.prepareDefines = function (defines) {
        defines.BRDF_V_HEIGHT_CORRELATED = this._useSmithVisibilityHeightCorrelated;
        defines.MS_BRDF_ENERGY_CONSERVATION = this._useEnergyConservation && this._useSmithVisibilityHeightCorrelated;
        defines.SPHERICAL_HARMONICS = this._useSphericalHarmonics;
        defines.SPECULAR_GLOSSINESS_ENERGY_CONSERVATION = this._useSpecularGlossinessInputEnergyConservation;
    };
    PBRBRDFConfiguration.prototype.getClassName = function () {
        return "PBRBRDFConfiguration";
    };
    /**
     * Default value used for the energy conservation.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    PBRBRDFConfiguration.DEFAULT_USE_ENERGY_CONSERVATION = true;
    /**
     * Default value used for the Smith Visibility Height Correlated mode.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    PBRBRDFConfiguration.DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED = true;
    /**
     * Default value used for the IBL diffuse part.
     * This can help switching back to the polynomials mode globally which is a tiny bit
     * less GPU intensive at the drawback of a lower quality.
     */
    PBRBRDFConfiguration.DEFAULT_USE_SPHERICAL_HARMONICS = true;
    /**
     * Default value used for activating energy conservation for the specular workflow.
     * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
     * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
     */
    PBRBRDFConfiguration.DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION = true;
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRBRDFConfiguration.prototype, "useEnergyConservation", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRBRDFConfiguration.prototype, "useSmithVisibilityHeightCorrelated", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRBRDFConfiguration.prototype, "useSphericalHarmonics", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRBRDFConfiguration.prototype, "useSpecularGlossinessInputEnergyConservation", void 0);
    return PBRBRDFConfiguration;
}(MaterialPluginBase));

// Do not edit.
var name = "pbrFragmentDeclaration";
var shader = "uniform vec4 vEyePosition;\nuniform vec3 vReflectionColor;\nuniform vec4 vAlbedoColor;\nuniform vec4 vLightingIntensity;\nuniform vec4 vReflectivityColor;\nuniform vec4 vMetallicReflectanceFactors;\nuniform vec3 vEmissiveColor;\nuniform float visibility;\nuniform vec3 vAmbientColor;\n#ifdef ALBEDO\nuniform vec2 vAlbedoInfos;\n#endif\n#ifdef AMBIENT\nuniform vec4 vAmbientInfos;\n#endif\n#ifdef BUMP\nuniform vec3 vBumpInfos;\nuniform vec2 vTangentSpaceParams;\n#endif\n#ifdef OPACITY\nuniform vec2 vOpacityInfos;\n#endif\n#ifdef EMISSIVE\nuniform vec2 vEmissiveInfos;\n#endif\n#ifdef LIGHTMAP\nuniform vec2 vLightmapInfos;\n#endif\n#ifdef REFLECTIVITY\nuniform vec3 vReflectivityInfos;\n#endif\n#ifdef MICROSURFACEMAP\nuniform vec2 vMicroSurfaceSamplerInfos;\n#endif\n#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(SS_REFRACTION) || defined(PREPASS)\nuniform mat4 view;\n#endif\n#ifdef REFLECTION\nuniform vec2 vReflectionInfos;\n#ifdef REALTIME_FILTERING\nuniform vec2 vReflectionFilteringInfo;\n#endif\nuniform mat4 reflectionMatrix;\nuniform vec3 vReflectionMicrosurfaceInfos;\n#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)\nuniform vec3 vReflectionPosition;\nuniform vec3 vReflectionSize; \n#endif\n#endif\n#if defined(SS_REFRACTION) && defined(SS_USE_LOCAL_REFRACTIONMAP_CUBIC)\nuniform vec3 vRefractionPosition;\nuniform vec3 vRefractionSize; \n#endif\n#ifdef CLEARCOAT\nuniform vec2 vClearCoatParams;\nuniform vec4 vClearCoatRefractionParams;\n#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)\nuniform vec4 vClearCoatInfos;\n#endif\n#ifdef CLEARCOAT_TEXTURE\nuniform mat4 clearCoatMatrix;\n#endif\n#ifdef CLEARCOAT_TEXTURE_ROUGHNESS\nuniform mat4 clearCoatRoughnessMatrix;\n#endif\n#ifdef CLEARCOAT_BUMP\nuniform vec2 vClearCoatBumpInfos;\nuniform vec2 vClearCoatTangentSpaceParams;\nuniform mat4 clearCoatBumpMatrix;\n#endif\n#ifdef CLEARCOAT_TINT\nuniform vec4 vClearCoatTintParams;\nuniform float clearCoatColorAtDistance;\n#ifdef CLEARCOAT_TINT_TEXTURE\nuniform vec2 vClearCoatTintInfos;\nuniform mat4 clearCoatTintMatrix;\n#endif\n#endif\n#endif\n#ifdef IRIDESCENCE\nuniform vec4 vIridescenceParams;\n#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)\nuniform vec4 vIridescenceInfos;\n#endif\n#ifdef IRIDESCENCE_TEXTURE\nuniform mat4 iridescenceMatrix;\n#endif\n#ifdef IRIDESCENCE_THICKNESS_TEXTURE\nuniform mat4 iridescenceThicknessMatrix;\n#endif\n#endif\n#ifdef ANISOTROPIC\nuniform vec3 vAnisotropy;\n#ifdef ANISOTROPIC_TEXTURE\nuniform vec2 vAnisotropyInfos;\nuniform mat4 anisotropyMatrix;\n#endif\n#endif\n#ifdef SHEEN\nuniform vec4 vSheenColor;\n#ifdef SHEEN_ROUGHNESS\nuniform float vSheenRoughness;\n#endif\n#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)\nuniform vec4 vSheenInfos;\n#endif\n#ifdef SHEEN_TEXTURE\nuniform mat4 sheenMatrix;\n#endif\n#ifdef SHEEN_TEXTURE_ROUGHNESS\nuniform mat4 sheenRoughnessMatrix;\n#endif\n#endif\n#ifdef SUBSURFACE\n#ifdef SS_REFRACTION\nuniform vec4 vRefractionMicrosurfaceInfos;\nuniform vec4 vRefractionInfos;\nuniform mat4 refractionMatrix;\n#ifdef REALTIME_FILTERING\nuniform vec2 vRefractionFilteringInfo;\n#endif\n#endif\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nuniform vec2 vThicknessInfos;\nuniform mat4 thicknessMatrix;\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\nuniform vec2 vRefractionIntensityInfos;\nuniform mat4 refractionIntensityMatrix;\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\nuniform vec2 vTranslucencyIntensityInfos;\nuniform mat4 translucencyIntensityMatrix;\n#endif\nuniform vec2 vThicknessParam;\nuniform vec3 vDiffusionDistance;\nuniform vec4 vTintColor;\nuniform vec3 vSubSurfaceIntensity;\n#endif\n#ifdef PREPASS\n#ifdef SS_SCATTERING\nuniform float scatteringDiffusionProfile;\n#endif\n#endif\n#if DEBUGMODE>0\nuniform vec2 vDebugMode;\n#endif\n#ifdef DETAIL\nuniform vec4 vDetailInfos;\n#endif\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#ifdef SPHERICAL_HARMONICS\nuniform vec3 vSphericalL00;\nuniform vec3 vSphericalL1_1;\nuniform vec3 vSphericalL10;\nuniform vec3 vSphericalL11;\nuniform vec3 vSphericalL2_2;\nuniform vec3 vSphericalL2_1;\nuniform vec3 vSphericalL20;\nuniform vec3 vSphericalL21;\nuniform vec3 vSphericalL22;\n#else\nuniform vec3 vSphericalX;\nuniform vec3 vSphericalY;\nuniform vec3 vSphericalZ;\nuniform vec3 vSphericalXX_ZZ;\nuniform vec3 vSphericalYY_ZZ;\nuniform vec3 vSphericalZZ;\nuniform vec3 vSphericalXY;\nuniform vec3 vSphericalYZ;\nuniform vec3 vSphericalZX;\n#endif\n#endif\n#define ADDITIONAL_FRAGMENT_DECLARATION\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;

// Do not edit.
var name$1 = "pbrUboDeclaration";
var shader$1 = "layout(std140,column_major) uniform;\nuniform Material {\nvec2 vAlbedoInfos;\nvec4 vAmbientInfos;\nvec2 vOpacityInfos;\nvec2 vEmissiveInfos;\nvec2 vLightmapInfos;\nvec3 vReflectivityInfos;\nvec2 vMicroSurfaceSamplerInfos;\nvec2 vReflectionInfos;\nvec2 vReflectionFilteringInfo;\nvec3 vReflectionPosition;\nvec3 vReflectionSize;\nvec3 vBumpInfos;\nmat4 albedoMatrix;\nmat4 ambientMatrix;\nmat4 opacityMatrix;\nmat4 emissiveMatrix;\nmat4 lightmapMatrix;\nmat4 reflectivityMatrix;\nmat4 microSurfaceSamplerMatrix;\nmat4 bumpMatrix;\nvec2 vTangentSpaceParams;\nmat4 reflectionMatrix;\nvec3 vReflectionColor;\nvec4 vAlbedoColor;\nvec4 vLightingIntensity;\nvec3 vReflectionMicrosurfaceInfos;\nfloat pointSize;\nvec4 vReflectivityColor;\nvec3 vEmissiveColor;\nvec3 vAmbientColor;\nvec2 vDebugMode;\nvec4 vMetallicReflectanceFactors;\nvec2 vMetallicReflectanceInfos;\nmat4 metallicReflectanceMatrix;\nvec2 vReflectanceInfos;\nmat4 reflectanceMatrix;\nvec3 vSphericalL00;\nvec3 vSphericalL1_1;\nvec3 vSphericalL10;\nvec3 vSphericalL11;\nvec3 vSphericalL2_2;\nvec3 vSphericalL2_1;\nvec3 vSphericalL20;\nvec3 vSphericalL21;\nvec3 vSphericalL22;\nvec3 vSphericalX;\nvec3 vSphericalY;\nvec3 vSphericalZ;\nvec3 vSphericalXX_ZZ;\nvec3 vSphericalYY_ZZ;\nvec3 vSphericalZZ;\nvec3 vSphericalXY;\nvec3 vSphericalYZ;\nvec3 vSphericalZX;\n#define ADDITIONAL_UBO_DECLARATION\n};\n#include<sceneUboDeclaration>\n#include<meshUboDeclaration>\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$1] = shader$1;

// Do not edit.
var name$2 = "pbrFragmentExtraDeclaration";
var shader$2 = "varying vec3 vPositionW;\n#if DEBUGMODE>0\nvarying vec4 vClipSpacePosition;\n#endif\n#include<mainUVVaryingDeclaration>[1..7]\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)\nvarying vec3 vEnvironmentIrradiance;\n#endif\n#endif\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR)\nvarying vec4 vColor;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$2] = shader$2;

// Do not edit.
var name$3 = "samplerFragmentAlternateDeclaration";
var shader$3 = "#ifdef _DEFINENAME_\n#if _DEFINENAME_DIRECTUV==1\n#define v_VARYINGNAME_UV vMainUV1\n#elif _DEFINENAME_DIRECTUV==2\n#define v_VARYINGNAME_UV vMainUV2\n#elif _DEFINENAME_DIRECTUV==3\n#define v_VARYINGNAME_UV vMainUV3\n#elif _DEFINENAME_DIRECTUV==4\n#define v_VARYINGNAME_UV vMainUV4\n#elif _DEFINENAME_DIRECTUV==5\n#define v_VARYINGNAME_UV vMainUV5\n#elif _DEFINENAME_DIRECTUV==6\n#define v_VARYINGNAME_UV vMainUV6\n#else\nvarying vec2 v_VARYINGNAME_UV;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$3] = shader$3;

// Do not edit.
var name$4 = "pbrFragmentSamplersDeclaration";
var shader$4 = "#include<samplerFragmentDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_SAMPLERNAME_,albedo)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_SAMPLERNAME_,reflectivity)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_SAMPLERNAME_,microSurface)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_SAMPLERNAME_,metallicReflectance)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_SAMPLERNAME_,reflectance)\n#ifdef CLEARCOAT\n#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_SAMPLERNAME_,clearCoat)\n#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)\n#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL)\nuniform sampler2D clearCoatRoughnessSampler;\n#endif\n#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_SAMPLERNAME_,clearCoatBump)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_SAMPLERNAME_,clearCoatTint)\n#endif\n#ifdef IRIDESCENCE\n#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_SAMPLERNAME_,iridescence)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_SAMPLERNAME_,iridescenceThickness)\n#endif\n#ifdef SHEEN\n#include<samplerFragmentDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_SAMPLERNAME_,sheen)\n#include<samplerFragmentAlternateDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)\n#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL)\nuniform sampler2D sheenRoughnessSampler;\n#endif\n#endif\n#ifdef ANISOTROPIC\n#include<samplerFragmentDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_SAMPLERNAME_,anisotropy)\n#endif\n#ifdef REFLECTION\n#ifdef REFLECTIONMAP_3D\n#define sampleReflection(s,c) textureCube(s,c)\nuniform samplerCube reflectionSampler;\n#ifdef LODBASEDMICROSFURACE\n#define sampleReflectionLod(s,c,l) textureCubeLodEXT(s,c,l)\n#else\nuniform samplerCube reflectionSamplerLow;\nuniform samplerCube reflectionSamplerHigh;\n#endif\n#ifdef USEIRRADIANCEMAP\nuniform samplerCube irradianceSampler;\n#endif\n#else\n#define sampleReflection(s,c) texture2D(s,c)\nuniform sampler2D reflectionSampler;\n#ifdef LODBASEDMICROSFURACE\n#define sampleReflectionLod(s,c,l) texture2DLodEXT(s,c,l)\n#else\nuniform sampler2D reflectionSamplerLow;\nuniform sampler2D reflectionSamplerHigh;\n#endif\n#ifdef USEIRRADIANCEMAP\nuniform sampler2D irradianceSampler;\n#endif\n#endif\n#ifdef REFLECTIONMAP_SKYBOX\nvarying vec3 vPositionUVW;\n#else\n#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)\nvarying vec3 vDirectionW;\n#endif\n#endif\n#endif\n#ifdef ENVIRONMENTBRDF\nuniform sampler2D environmentBrdfSampler;\n#endif\n#ifdef SUBSURFACE\n#ifdef SS_REFRACTION\n#ifdef SS_REFRACTIONMAP_3D\n#define sampleRefraction(s,c) textureCube(s,c)\nuniform samplerCube refractionSampler;\n#ifdef LODBASEDMICROSFURACE\n#define sampleRefractionLod(s,c,l) textureCubeLodEXT(s,c,l)\n#else\nuniform samplerCube refractionSamplerLow;\nuniform samplerCube refractionSamplerHigh;\n#endif\n#else\n#define sampleRefraction(s,c) texture2D(s,c)\nuniform sampler2D refractionSampler;\n#ifdef LODBASEDMICROSFURACE\n#define sampleRefractionLod(s,c,l) texture2DLodEXT(s,c,l)\n#else\nuniform sampler2D refractionSamplerLow;\nuniform sampler2D refractionSamplerHigh;\n#endif\n#endif\n#endif\n#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_SAMPLERNAME_,thickness)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_SAMPLERNAME_,refractionIntensity)\n#include<samplerFragmentDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_SAMPLERNAME_,translucencyIntensity)\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$4] = shader$4;

// Do not edit.
var name$5 = "subSurfaceScatteringFunctions";
var shader$5 = "bool testLightingForSSS(float diffusionProfile)\n{\nreturn diffusionProfile<1.;\n}";
// Sideeffect
ShaderStore.IncludesShadersStore[name$5] = shader$5;

// Do not edit.
var name$6 = "importanceSampling";
var shader$6 = "vec3 hemisphereCosSample(vec2 u) {\nfloat phi=2.*PI*u.x;\nfloat cosTheta2=1.-u.y;\nfloat cosTheta=sqrt(cosTheta2);\nfloat sinTheta=sqrt(1.-cosTheta2);\nreturn vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);\n}\nvec3 hemisphereImportanceSampleDggx(vec2 u,float a) {\nfloat phi=2.*PI*u.x;\nfloat cosTheta2=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));\nfloat cosTheta=sqrt(cosTheta2);\nfloat sinTheta=sqrt(1.-cosTheta2);\nreturn vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);\n}\nvec3 hemisphereImportanceSampleDCharlie(vec2 u,float a) { \nfloat phi=2.*PI*u.x;\nfloat sinTheta=pow(u.y,a/(2.*a+1.));\nfloat cosTheta=sqrt(1.-sinTheta*sinTheta);\nreturn vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);\n}";
// Sideeffect
ShaderStore.IncludesShadersStore[name$6] = shader$6;

// Do not edit.
var name$7 = "pbrHelperFunctions";
var shader$7 = "#define RECIPROCAL_PI2 0.15915494\n#define RECIPROCAL_PI 0.31830988618\n#define MINIMUMVARIANCE 0.0005\nfloat convertRoughnessToAverageSlope(float roughness)\n{\nreturn square(roughness)+MINIMUMVARIANCE;\n}\nfloat fresnelGrazingReflectance(float reflectance0) {\nfloat reflectance90=saturate(reflectance0*25.0);\nreturn reflectance90;\n}\nvec2 getAARoughnessFactors(vec3 normalVector) {\n#ifdef SPECULARAA\nvec3 nDfdx=dFdx(normalVector.xyz);\nvec3 nDfdy=dFdy(normalVector.xyz);\nfloat slopeSquare=max(dot(nDfdx,nDfdx),dot(nDfdy,nDfdy));\nfloat geometricRoughnessFactor=pow(saturate(slopeSquare),0.333);\nfloat geometricAlphaGFactor=sqrt(slopeSquare);\ngeometricAlphaGFactor*=0.75;\nreturn vec2(geometricRoughnessFactor,geometricAlphaGFactor);\n#else\nreturn vec2(0.);\n#endif\n}\n#ifdef ANISOTROPIC\nvec2 getAnisotropicRoughness(float alphaG,float anisotropy) {\nfloat alphaT=max(alphaG*(1.0+anisotropy),MINIMUMVARIANCE);\nfloat alphaB=max(alphaG*(1.0-anisotropy),MINIMUMVARIANCE);\nreturn vec2(alphaT,alphaB);\n}\nvec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy) {\nvec3 anisotropicFrameDirection=anisotropy>=0.0 ? B : T;\nvec3 anisotropicFrameTangent=cross(normalize(anisotropicFrameDirection),V);\nvec3 anisotropicFrameNormal=cross(anisotropicFrameTangent,anisotropicFrameDirection);\nvec3 anisotropicNormal=normalize(mix(N,anisotropicFrameNormal,abs(anisotropy)));\nreturn anisotropicNormal;\n}\n#endif\n#if defined(CLEARCOAT) || defined(SS_REFRACTION)\nvec3 cocaLambert(vec3 alpha,float distance) {\nreturn exp(-alpha*distance);\n}\nvec3 cocaLambert(float NdotVRefract,float NdotLRefract,vec3 alpha,float thickness) {\nreturn cocaLambert(alpha,(thickness*((NdotLRefract+NdotVRefract)/(NdotLRefract*NdotVRefract))));\n}\nvec3 computeColorAtDistanceInMedia(vec3 color,float distance) {\nreturn -log(color)/distance;\n}\nvec3 computeClearCoatAbsorption(float NdotVRefract,float NdotLRefract,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {\nvec3 clearCoatAbsorption=mix(vec3(1.0),\ncocaLambert(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness),\nclearCoatIntensity);\nreturn clearCoatAbsorption;\n}\n#endif\n#ifdef MICROSURFACEAUTOMATIC\nfloat computeDefaultMicroSurface(float microSurface,vec3 reflectivityColor)\n{\nconst float kReflectivityNoAlphaWorkflow_SmoothnessMax=0.95;\nfloat reflectivityLuminance=getLuminance(reflectivityColor);\nfloat reflectivityLuma=sqrt(reflectivityLuminance);\nmicroSurface=reflectivityLuma*kReflectivityNoAlphaWorkflow_SmoothnessMax;\nreturn microSurface;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$7] = shader$7;

// Do not edit.
var name$8 = "harmonicsFunctions";
var shader$8 = "#ifdef USESPHERICALFROMREFLECTIONMAP\n#ifdef SPHERICAL_HARMONICS\nvec3 computeEnvironmentIrradiance(vec3 normal) {\nreturn vSphericalL00\n+ vSphericalL1_1*(normal.y)\n+ vSphericalL10*(normal.z)\n+ vSphericalL11*(normal.x)\n+ vSphericalL2_2*(normal.y*normal.x)\n+ vSphericalL2_1*(normal.y*normal.z)\n+ vSphericalL20*((3.0*normal.z*normal.z)-1.0)\n+ vSphericalL21*(normal.z*normal.x)\n+ vSphericalL22*(normal.x*normal.x-(normal.y*normal.y));\n}\n#else\nvec3 computeEnvironmentIrradiance(vec3 normal) {\nfloat Nx=normal.x;\nfloat Ny=normal.y;\nfloat Nz=normal.z;\nvec3 C1=vSphericalZZ.rgb;\nvec3 Cx=vSphericalX.rgb;\nvec3 Cy=vSphericalY.rgb;\nvec3 Cz=vSphericalZ.rgb;\nvec3 Cxx_zz=vSphericalXX_ZZ.rgb;\nvec3 Cyy_zz=vSphericalYY_ZZ.rgb;\nvec3 Cxy=vSphericalXY.rgb;\nvec3 Cyz=vSphericalYZ.rgb;\nvec3 Czx=vSphericalZX.rgb;\nvec3 a1=Cyy_zz*Ny+Cy;\nvec3 a2=Cyz*Nz+a1;\nvec3 b1=Czx*Nz+Cx;\nvec3 b2=Cxy*Ny+b1;\nvec3 b3=Cxx_zz*Nx+b2;\nvec3 t1=Cz *Nz+C1;\nvec3 t2=a2 *Ny+t1;\nvec3 t3=b3 *Nx+t2;\nreturn t3;\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$8] = shader$8;

// Do not edit.
var name$9 = "pbrDirectLightingSetupFunctions";
var shader$9 = "struct preLightingInfo\n{\nvec3 lightOffset;\nfloat lightDistanceSquared;\nfloat lightDistance;\nfloat attenuation;\nvec3 L;\nvec3 H;\nfloat NdotV;\nfloat NdotLUnclamped;\nfloat NdotL;\nfloat VdotH;\nfloat roughness;\n#ifdef IRIDESCENCE\nfloat iridescenceIntensity;\n#endif\n};\npreLightingInfo computePointAndSpotPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {\npreLightingInfo result;\nresult.lightOffset=lightData.xyz-vPositionW;\nresult.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);\nresult.lightDistance=sqrt(result.lightDistanceSquared);\nresult.L=normalize(result.lightOffset);\nresult.H=normalize(V+result.L);\nresult.VdotH=saturate(dot(V,result.H));\nresult.NdotLUnclamped=dot(N,result.L);\nresult.NdotL=saturateEps(result.NdotLUnclamped);\nreturn result;\n}\npreLightingInfo computeDirectionalPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {\npreLightingInfo result;\nresult.lightDistance=length(-lightData.xyz);\nresult.L=normalize(-lightData.xyz);\nresult.H=normalize(V+result.L);\nresult.VdotH=saturate(dot(V,result.H));\nresult.NdotLUnclamped=dot(N,result.L);\nresult.NdotL=saturateEps(result.NdotLUnclamped);\nreturn result;\n}\npreLightingInfo computeHemisphericPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {\npreLightingInfo result;\nresult.NdotL=dot(N,lightData.xyz)*0.5+0.5;\nresult.NdotL=saturateEps(result.NdotL);\nresult.NdotLUnclamped=result.NdotL;\n#ifdef SPECULARTERM\nresult.L=normalize(lightData.xyz);\nresult.H=normalize(V+result.L);\nresult.VdotH=saturate(dot(V,result.H));\n#endif\nreturn result;\n}";
// Sideeffect
ShaderStore.IncludesShadersStore[name$9] = shader$9;

// Do not edit.
var name$a = "pbrDirectLightingFalloffFunctions";
var shader$a = "float computeDistanceLightFalloff_Standard(vec3 lightOffset,float range)\n{\nreturn max(0.,1.0-length(lightOffset)/range);\n}\nfloat computeDistanceLightFalloff_Physical(float lightDistanceSquared)\n{\nreturn 1.0/maxEps(lightDistanceSquared);\n}\nfloat computeDistanceLightFalloff_GLTF(float lightDistanceSquared,float inverseSquaredRange)\n{\nfloat lightDistanceFalloff=1.0/maxEps(lightDistanceSquared);\nfloat factor=lightDistanceSquared*inverseSquaredRange;\nfloat attenuation=saturate(1.0-factor*factor);\nattenuation*=attenuation;\nlightDistanceFalloff*=attenuation;\nreturn lightDistanceFalloff;\n}\nfloat computeDistanceLightFalloff(vec3 lightOffset,float lightDistanceSquared,float range,float inverseSquaredRange)\n{\n#ifdef USEPHYSICALLIGHTFALLOFF\nreturn computeDistanceLightFalloff_Physical(lightDistanceSquared);\n#elif defined(USEGLTFLIGHTFALLOFF)\nreturn computeDistanceLightFalloff_GLTF(lightDistanceSquared,inverseSquaredRange);\n#else\nreturn computeDistanceLightFalloff_Standard(lightOffset,range);\n#endif\n}\nfloat computeDirectionalLightFalloff_Standard(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent)\n{\nfloat falloff=0.0;\nfloat cosAngle=maxEps(dot(-lightDirection,directionToLightCenterW));\nif (cosAngle>=cosHalfAngle)\n{\nfalloff=max(0.,pow(cosAngle,exponent));\n}\nreturn falloff;\n}\nfloat computeDirectionalLightFalloff_Physical(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle)\n{\nconst float kMinusLog2ConeAngleIntensityRatio=6.64385618977; \nfloat concentrationKappa=kMinusLog2ConeAngleIntensityRatio/(1.0-cosHalfAngle);\nvec4 lightDirectionSpreadSG=vec4(-lightDirection*concentrationKappa,-concentrationKappa);\nfloat falloff=exp2(dot(vec4(directionToLightCenterW,1.0),lightDirectionSpreadSG));\nreturn falloff;\n}\nfloat computeDirectionalLightFalloff_GLTF(vec3 lightDirection,vec3 directionToLightCenterW,float lightAngleScale,float lightAngleOffset)\n{\nfloat cd=dot(-lightDirection,directionToLightCenterW);\nfloat falloff=saturate(cd*lightAngleScale+lightAngleOffset);\nfalloff*=falloff;\nreturn falloff;\n}\nfloat computeDirectionalLightFalloff(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent,float lightAngleScale,float lightAngleOffset)\n{\n#ifdef USEPHYSICALLIGHTFALLOFF\nreturn computeDirectionalLightFalloff_Physical(lightDirection,directionToLightCenterW,cosHalfAngle);\n#elif defined(USEGLTFLIGHTFALLOFF)\nreturn computeDirectionalLightFalloff_GLTF(lightDirection,directionToLightCenterW,lightAngleScale,lightAngleOffset);\n#else\nreturn computeDirectionalLightFalloff_Standard(lightDirection,directionToLightCenterW,cosHalfAngle,exponent);\n#endif\n}";
// Sideeffect
ShaderStore.IncludesShadersStore[name$a] = shader$a;

// Do not edit.
var name$b = "pbrBRDFFunctions";
var shader$b = "#define FRESNEL_MAXIMUM_ON_ROUGH 0.25\n#ifdef MS_BRDF_ENERGY_CONSERVATION\nvec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {\nreturn 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);\n}\n#endif\n#ifdef ENVIRONMENTBRDF\nvec3 getBRDFLookup(float NdotV,float perceptualRoughness) {\nvec2 UV=vec2(NdotV,perceptualRoughness);\nvec4 brdfLookup=texture2D(environmentBrdfSampler,UV);\n#ifdef ENVIRONMENTBRDF_RGBD\nbrdfLookup.rgb=fromRGBD(brdfLookup.rgba);\n#endif\nreturn brdfLookup.rgb;\n}\nvec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {\n#ifdef BRDF_V_HEIGHT_CORRELATED\nvec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;\n#else\nvec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;\n#endif\nreturn reflectance;\n}\nvec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {\n#ifdef BRDF_V_HEIGHT_CORRELATED\nvec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);\n#else\nvec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;\n#endif\nreturn reflectance;\n}\n#endif\n/* NOT USED\n#if defined(SHEEN) && defined(SHEEN_SOFTER)\nfloat getBRDFLookupCharlieSheen(float NdotV,float perceptualRoughness)\n{\nfloat c=1.0-NdotV;\nfloat c3=c*c*c;\nreturn 0.65584461*c3+1.0/(4.16526551+exp(-7.97291361*perceptualRoughness+6.33516894));\n}\n#endif\n*/\n#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)\nvec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)\n{\nfloat weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);\nreturn reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));\n}\n#endif\n#if defined(SHEEN) && defined(ENVIRONMENTBRDF)\n/**\n* The sheen BRDF not containing F can be easily stored in the blue channel of the BRDF texture.\n* The blue channel contains DCharlie*VAshikhmin*NdotL as a lokkup table\n*/\nvec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {\nvec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;\nreturn sheenEnvironmentReflectance;\n}\n#endif\nvec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)\n{\nreturn reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);\n}\nfloat fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)\n{\nreturn reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);\n}\n#ifdef CLEARCOAT\nvec3 getR0RemappedForClearCoat(vec3 f0) {\n#ifdef CLEARCOAT_DEFAULTIOR\n#ifdef MOBILE\nreturn saturate(f0*(f0*0.526868+0.529324)-0.0482256);\n#else\nreturn saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);\n#endif\n#else\nvec3 s=sqrt(f0);\nvec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);\nreturn square(t);\n#endif\n}\n#endif\n#ifdef IRIDESCENCE\nconst mat3 XYZ_TO_REC709=mat3(\n3.2404542,-0.9692660, 0.0556434,\n-1.5371385, 1.8760108,-0.2040259,\n-0.4985314, 0.0415560, 1.0572252\n);\nvec3 getIORTfromAirToSurfaceR0(vec3 f0) {\nvec3 sqrtF0=sqrt(f0);\nreturn (1.+sqrtF0)/(1.-sqrtF0);\n}\nvec3 getR0fromIORs(vec3 iorT,float iorI) {\nreturn square((iorT-vec3(iorI))/(iorT+vec3(iorI)));\n}\nfloat getR0fromIORs(float iorT,float iorI) {\nreturn square((iorT-iorI)/(iorT+iorI));\n}\nvec3 evalSensitivity(float opd,vec3 shift) {\nfloat phase=2.0*PI*opd*1.0e-9;\nconst vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);\nconst vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);\nconst vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);\nvec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-square(phase)*var);\nxyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*square(phase));\nxyz/=1.0685e-7;\nvec3 srgb=XYZ_TO_REC709*xyz;\nreturn srgb;\n}\nvec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0) {\nvec3 I=vec3(1.0);\nfloat iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));\nfloat sinTheta2Sq=square(outsideIOR/iridescenceIOR)*(1.0-square(cosTheta1));\nfloat cosTheta2Sq=1.0-sinTheta2Sq;\nif (cosTheta2Sq<0.0) {\nreturn I;\n}\nfloat cosTheta2=sqrt(cosTheta2Sq);\nfloat R0=getR0fromIORs(iridescenceIOR,outsideIOR);\nfloat R12=fresnelSchlickGGX(cosTheta1,R0,1.);\nfloat R21=R12;\nfloat T121=1.0-R12;\nfloat phi12=0.0;\nif (iridescenceIOR<outsideIOR) phi12=PI;\nfloat phi21=PI-phi12;\nvec3 baseIOR=getIORTfromAirToSurfaceR0(clamp(baseF0,0.0,0.9999)); \nvec3 R1=getR0fromIORs(baseIOR,iridescenceIOR);\nvec3 R23=fresnelSchlickGGX(cosTheta2,R1,vec3(1.));\nvec3 phi23=vec3(0.0);\nif (baseIOR[0]<iridescenceIOR) phi23[0]=PI;\nif (baseIOR[1]<iridescenceIOR) phi23[1]=PI;\nif (baseIOR[2]<iridescenceIOR) phi23[2]=PI;\nfloat opd=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;\nvec3 phi=vec3(phi21)+phi23;\nvec3 R123=clamp(R12*R23,1e-5,0.9999);\nvec3 r123=sqrt(R123);\nvec3 Rs=square(T121)*R23/(vec3(1.0)-R123);\nvec3 C0=R12+Rs;\nI=C0;\nvec3 Cm=Rs-T121;\nfor (int m=1; m<=2; ++m)\n{\nCm*=r123;\nvec3 Sm=2.0*evalSensitivity(float(m)*opd,float(m)*phi);\nI+=Cm*Sm;\n}\nreturn max(I,vec3(0.0));\n}\n#endif\nfloat normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)\n{\nfloat a2=square(alphaG);\nfloat d=NdotH*NdotH*(a2-1.0)+1.0;\nreturn a2/(PI*d*d);\n}\n#ifdef SHEEN\nfloat normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)\n{\nfloat invR=1./alphaG;\nfloat cos2h=NdotH*NdotH;\nfloat sin2h=1.-cos2h;\nreturn (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);\n}\n#endif\n#ifdef ANISOTROPIC\nfloat normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {\nfloat a2=alphaTB.x*alphaTB.y;\nvec3 v=vec3(alphaTB.y*TdotH,alphaTB.x *BdotH,a2*NdotH);\nfloat v2=dot(v,v);\nfloat w2=a2/v2;\nreturn a2*w2*w2*RECIPROCAL_PI;\n}\n#endif\n#ifdef BRDF_V_HEIGHT_CORRELATED\nfloat smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {\n#ifdef MOBILE\nfloat GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);\nfloat GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);\nreturn 0.5/(GGXV+GGXL);\n#else\nfloat a2=alphaG*alphaG;\nfloat GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);\nfloat GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);\nreturn 0.5/(GGXV+GGXL);\n#endif\n}\n#else\nfloat smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)\n{\n#ifdef MOBILE\nreturn 1.0/(dot+alphaG+(1.0-alphaG)*dot ));\n#else\nfloat alphaSquared=alphaG*alphaG;\nreturn 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));\n#endif\n}\nfloat smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)\n{\nfloat visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);\nreturn visibility;\n}\n#endif\n#ifdef ANISOTROPIC\nfloat smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {\nfloat lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));\nfloat lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));\nfloat v=0.5/(lambdaV+lambdaL);\nreturn v;\n}\n#endif\n#ifdef CLEARCOAT\nfloat visibility_Kelemen(float VdotH) {\nreturn 0.25/(VdotH*VdotH); \n}\n#endif\n#ifdef SHEEN\nfloat visibility_Ashikhmin(float NdotL,float NdotV)\n{\nreturn 1./(4.*(NdotL+NdotV-NdotL*NdotV));\n}\n/* NOT USED\n#ifdef SHEEN_SOFTER\nfloat l(float x,float alphaG)\n{\nfloat oneMinusAlphaSq=(1.0-alphaG)*(1.0-alphaG);\nfloat a=mix(21.5473,25.3245,oneMinusAlphaSq);\nfloat b=mix(3.82987,3.32435,oneMinusAlphaSq);\nfloat c=mix(0.19823,0.16801,oneMinusAlphaSq);\nfloat d=mix(-1.97760,-1.27393,oneMinusAlphaSq);\nfloat e=mix(-4.32054,-4.85967,oneMinusAlphaSq);\nreturn a/(1.0+b*pow(x,c))+d*x+e;\n}\nfloat lambdaSheen(float cosTheta,float alphaG)\n{\nreturn abs(cosTheta)<0.5 ? exp(l(cosTheta,alphaG)) : exp(2.0*l(0.5,alphaG)-l(1.0-cosTheta,alphaG));\n}\nfloat visibility_CharlieSheen(float NdotL,float NdotV,float alphaG)\n{\nfloat G=1.0/(1.0+lambdaSheen(NdotV,alphaG)+lambdaSheen(NdotL,alphaG));\nreturn G/(4.0*NdotV*NdotL);\n}\n#endif\n*/\n#endif\nfloat diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {\nfloat diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));\nfloat diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));\nfloat diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;\nfloat fresnel =\n(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *\n(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);\nreturn fresnel/PI;\n}\n#ifdef SS_TRANSLUCENCY\nvec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {\nvec3 S=1./maxEps(diffusionDistance);\nvec3 temp=exp((-0.333333333*thickness)*S);\nreturn tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);\n}\nfloat computeWrappedDiffuseNdotL(float NdotL,float w) {\nfloat t=1.0+w;\nfloat invt2=1.0/square(t);\nreturn saturate((NdotL+w)*invt2);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$b] = shader$b;

// Do not edit.
var name$c = "hdrFilteringFunctions";
var shader$c = "#ifdef NUM_SAMPLES\n#if NUM_SAMPLES>0\n#if defined(WEBGL2) || defined(WEBGPU)\nfloat radicalInverse_VdC(uint bits) \n{\nbits=(bits<<16u) | (bits>>16u);\nbits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);\nbits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);\nbits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);\nbits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);\nreturn float(bits)*2.3283064365386963e-10; \n}\nvec2 hammersley(uint i,uint N)\n{\nreturn vec2(float(i)/float(N),radicalInverse_VdC(i));\n}\n#else\nfloat vanDerCorpus(int n,int base)\n{\nfloat invBase=1.0/float(base);\nfloat denom =1.0;\nfloat result =0.0;\nfor(int i=0; i<32; ++i)\n{\nif(n>0)\n{\ndenom =mod(float(n),2.0);\nresult+=denom*invBase;\ninvBase=invBase/2.0;\nn =int(float(n)/2.0);\n}\n}\nreturn result;\n}\nvec2 hammersley(int i,int N)\n{\nreturn vec2(float(i)/float(N),vanDerCorpus(i,2));\n}\n#endif\nfloat log4(float x) {\nreturn log2(x)/2.;\n}\nconst float NUM_SAMPLES_FLOAT=float(NUM_SAMPLES);\nconst float NUM_SAMPLES_FLOAT_INVERSED=1./NUM_SAMPLES_FLOAT;\nconst float K=4.;\n#define inline\nvec3 irradiance(samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)\n{\nvec3 n=normalize(inputN);\nvec3 result=vec3(0.0);\nvec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);\ntangent=normalize(cross(tangent,n));\nvec3 bitangent=cross(n,tangent);\nmat3 tbn=mat3(tangent,bitangent,n);\nfloat maxLevel=filteringInfo.y;\nfloat dim0=filteringInfo.x;\nfloat omegaP=(4.*PI)/(6.*dim0*dim0);\n#if defined(WEBGL2) || defined(WEBGPU)\nfor(uint i=0u; i<NUM_SAMPLES; ++i)\n#else\nfor(int i=0; i<NUM_SAMPLES; ++i)\n#endif\n{\nvec2 Xi=hammersley(i,NUM_SAMPLES);\nvec3 Ls=hemisphereCosSample(Xi);\nLs=normalize(Ls);\nvec3 Ns=vec3(0.,0.,1.);\nfloat NoL=dot(Ns,Ls);\nif (NoL>0.) {\nfloat pdf_inversed=PI/NoL;\nfloat omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;\nfloat l=log4(omegaS)-log4(omegaP)+log4(K);\nfloat mipLevel=clamp(l,0.0,maxLevel);\nvec3 c=textureCubeLodEXT(inputTexture,tbn*Ls,mipLevel).rgb;\n#ifdef GAMMA_INPUT\nc=toLinearSpace(c);\n#endif\nresult+=c;\n}\n}\nresult=result*NUM_SAMPLES_FLOAT_INVERSED;\nreturn result;\n}\n#define inline\nvec3 radiance(float alphaG,samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)\n{\nvec3 n=normalize(inputN);\nif (alphaG==0.) {\nvec3 c=textureCube(inputTexture,n).rgb;\n#ifdef GAMMA_INPUT\nc=toLinearSpace(c);\n#endif\nreturn c;\n} else {\nvec3 result=vec3(0.);\nvec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);\ntangent=normalize(cross(tangent,n));\nvec3 bitangent=cross(n,tangent);\nmat3 tbn=mat3(tangent,bitangent,n);\nfloat maxLevel=filteringInfo.y;\nfloat dim0=filteringInfo.x;\nfloat omegaP=(4.*PI)/(6.*dim0*dim0);\nfloat weight=0.;\n#if defined(WEBGL2) || defined(WEBGPU)\nfor(uint i=0u; i<NUM_SAMPLES; ++i)\n#else\nfor(int i=0; i<NUM_SAMPLES; ++i)\n#endif\n{\nvec2 Xi=hammersley(i,NUM_SAMPLES);\nvec3 H=hemisphereImportanceSampleDggx(Xi,alphaG);\nfloat NoV=1.;\nfloat NoH=H.z;\nfloat NoH2=H.z*H.z;\nfloat NoL=2.*NoH2-1.;\nvec3 L=vec3(2.*NoH*H.x,2.*NoH*H.y,NoL);\nL=normalize(L);\nif (NoL>0.) {\nfloat pdf_inversed=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);\nfloat omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;\nfloat l=log4(omegaS)-log4(omegaP)+log4(K);\nfloat mipLevel=clamp(float(l),0.0,maxLevel);\nweight+=NoL;\nvec3 c=textureCubeLodEXT(inputTexture,tbn*L,mipLevel).rgb;\n#ifdef GAMMA_INPUT\nc=toLinearSpace(c);\n#endif\nresult+=c*NoL;\n}\n}\nresult=result/weight;\nreturn result;\n}\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$c] = shader$c;

// Do not edit.
var name$d = "pbrDirectLightingFunctions";
var shader$d = "#define CLEARCOATREFLECTANCE90 1.0\nstruct lightingInfo\n{\nvec3 diffuse;\n#ifdef SPECULARTERM\nvec3 specular;\n#endif\n#ifdef CLEARCOAT\nvec4 clearCoat;\n#endif\n#ifdef SHEEN\nvec3 sheen;\n#endif\n};\nfloat adjustRoughnessFromLightProperties(float roughness,float lightRadius,float lightDistance) {\n#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)\nfloat lightRoughness=lightRadius/lightDistance;\nfloat totalRoughness=saturate(lightRoughness+roughness);\nreturn totalRoughness;\n#else\nreturn roughness;\n#endif\n}\nvec3 computeHemisphericDiffuseLighting(preLightingInfo info,vec3 lightColor,vec3 groundColor) {\nreturn mix(groundColor,lightColor,info.NdotL);\n}\nvec3 computeDiffuseLighting(preLightingInfo info,vec3 lightColor) {\nfloat diffuseTerm=diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness);\nreturn diffuseTerm*info.attenuation*info.NdotL*lightColor;\n}\n#define inline\nvec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){\nvec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);\nstrq/=strq.w;\nvec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;\nreturn toLinearSpace(textureColor);\n}\n#ifdef SS_TRANSLUCENCY\nvec3 computeDiffuseAndTransmittedLighting(preLightingInfo info,vec3 lightColor,vec3 transmittance) {\nfloat NdotL=absEps(info.NdotLUnclamped);\nfloat wrapNdotL=computeWrappedDiffuseNdotL(NdotL,0.02);\nfloat trAdapt=step(0.,info.NdotLUnclamped);\nvec3 transmittanceNdotL=mix(transmittance*wrapNdotL,vec3(wrapNdotL),trAdapt);\nfloat diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);\nreturn diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;\n}\n#endif\n#ifdef SPECULARTERM\nvec3 computeSpecularLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {\nfloat NdotH=saturateEps(dot(N,info.H));\nfloat roughness=max(info.roughness,geometricRoughnessFactor);\nfloat alphaG=convertRoughnessToAverageSlope(roughness);\nvec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);\n#ifdef IRIDESCENCE\nfresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);\n#endif\nfloat distribution=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);\n#ifdef BRDF_V_HEIGHT_CORRELATED\nfloat smithVisibility=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);\n#else\nfloat smithVisibility=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);\n#endif\nvec3 specTerm=fresnel*distribution*smithVisibility;\nreturn specTerm*info.attenuation*info.NdotL*lightColor;\n}\n#endif\n#ifdef ANISOTROPIC\nvec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {\nfloat NdotH=saturateEps(dot(N,info.H));\nfloat TdotH=dot(T,info.H);\nfloat BdotH=dot(B,info.H);\nfloat TdotV=dot(T,V);\nfloat BdotV=dot(B,V);\nfloat TdotL=dot(T,info.L);\nfloat BdotL=dot(B,info.L);\nfloat alphaG=convertRoughnessToAverageSlope(info.roughness);\nvec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);\nalphaTB=max(alphaTB,square(geometricRoughnessFactor));\nvec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);\n#ifdef IRIDESCENCE\nfresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);\n#endif\nfloat distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);\nfloat smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);\nvec3 specTerm=fresnel*distribution*smithVisibility;\nreturn specTerm*info.attenuation*info.NdotL*lightColor;\n}\n#endif\n#ifdef CLEARCOAT\nvec4 computeClearCoatLighting(preLightingInfo info,vec3 Ncc,float geometricRoughnessFactor,float clearCoatIntensity,vec3 lightColor) {\nfloat NccdotL=saturateEps(dot(Ncc,info.L));\nfloat NccdotH=saturateEps(dot(Ncc,info.H));\nfloat clearCoatRoughness=max(info.roughness,geometricRoughnessFactor);\nfloat alphaG=convertRoughnessToAverageSlope(clearCoatRoughness);\nfloat fresnel=fresnelSchlickGGX(info.VdotH,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);\nfresnel*=clearCoatIntensity;\nfloat distribution=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);\nfloat kelemenVisibility=visibility_Kelemen(info.VdotH);\nfloat clearCoatTerm=fresnel*distribution*kelemenVisibility;\nreturn vec4(\nclearCoatTerm*info.attenuation*NccdotL*lightColor,\n1.0-fresnel\n);\n}\nvec3 computeClearCoatLightingAbsorption(float NdotVRefract,vec3 L,vec3 Ncc,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {\nvec3 LRefract=-refract(L,Ncc,vClearCoatRefractionParams.y);\nfloat NdotLRefract=saturateEps(dot(Ncc,LRefract));\nvec3 absorption=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);\nreturn absorption;\n}\n#endif\n#ifdef SHEEN\nvec3 computeSheenLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {\nfloat NdotH=saturateEps(dot(N,info.H));\nfloat roughness=max(info.roughness,geometricRoughnessFactor);\nfloat alphaG=convertRoughnessToAverageSlope(roughness);\nfloat fresnel=1.;\nfloat distribution=normalDistributionFunction_CharlieSheen(NdotH,alphaG);\n/*#ifdef SHEEN_SOFTER\nfloat visibility=visibility_CharlieSheen(info.NdotL,info.NdotV,alphaG);\n#else */\nfloat visibility=visibility_Ashikhmin(info.NdotL,info.NdotV);\n/* #endif */\nfloat sheenTerm=fresnel*distribution*visibility;\nreturn sheenTerm*info.attenuation*info.NdotL*lightColor;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$d] = shader$d;

// Do not edit.
var name$e = "pbrIBLFunctions";
var shader$e = "#if defined(REFLECTION) || defined(SS_REFRACTION)\nfloat getLodFromAlphaG(float cubeMapDimensionPixels,float microsurfaceAverageSlope) {\nfloat microsurfaceAverageSlopeTexels=cubeMapDimensionPixels*microsurfaceAverageSlope;\nfloat lod=log2(microsurfaceAverageSlopeTexels);\nreturn lod;\n}\nfloat getLinearLodFromRoughness(float cubeMapDimensionPixels,float roughness) {\nfloat lod=log2(cubeMapDimensionPixels)*roughness;\nreturn lod;\n}\n#endif\n#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)\nfloat environmentRadianceOcclusion(float ambientOcclusion,float NdotVUnclamped) {\nfloat temp=NdotVUnclamped+ambientOcclusion;\nreturn saturate(square(temp)-1.0+ambientOcclusion);\n}\n#endif\n#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)\nfloat environmentHorizonOcclusion(vec3 view,vec3 normal,vec3 geometricNormal) {\nvec3 reflection=reflect(view,normal);\nfloat temp=saturate(1.0+1.1*dot(reflection,geometricNormal));\nreturn square(temp);\n}\n#endif\n#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)\n#define UNPACK_LOD(x) (1.0-x)*255.0\nfloat getLodFromAlphaG(float cubeMapDimensionPixels,float alphaG,float NdotV) {\nfloat microsurfaceAverageSlope=alphaG;\nmicrosurfaceAverageSlope*=sqrt(abs(NdotV));\nreturn getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$e] = shader$e;

// Do not edit.
var name$f = "pbrBlockAlbedoOpacity";
var shader$f = "struct albedoOpacityOutParams\n{\nvec3 surfaceAlbedo;\nfloat alpha;\n};\n#define pbr_inline\nvoid albedoOpacityBlock(\nin vec4 vAlbedoColor,\n#ifdef ALBEDO\nin vec4 albedoTexture,\nin vec2 albedoInfos,\n#endif\n#ifdef OPACITY\nin vec4 opacityMap,\nin vec2 vOpacityInfos,\n#endif\n#ifdef DETAIL\nin vec4 detailColor,\nin vec4 vDetailInfos,\n#endif\nout albedoOpacityOutParams outParams\n)\n{\nvec3 surfaceAlbedo=vAlbedoColor.rgb;\nfloat alpha=vAlbedoColor.a;\n#ifdef ALBEDO\n#if defined(ALPHAFROMALBEDO) || defined(ALPHATEST)\nalpha*=albedoTexture.a;\n#endif\n#ifdef GAMMAALBEDO\nsurfaceAlbedo*=toLinearSpace(albedoTexture.rgb);\n#else\nsurfaceAlbedo*=albedoTexture.rgb;\n#endif\nsurfaceAlbedo*=albedoInfos.y;\n#endif\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR)\nsurfaceAlbedo*=vColor.rgb;\n#endif\n#ifdef DETAIL\nfloat detailAlbedo=2.0*mix(0.5,detailColor.r,vDetailInfos.y);\nsurfaceAlbedo.rgb=surfaceAlbedo.rgb*detailAlbedo*detailAlbedo; \n#endif\n#define CUSTOM_FRAGMENT_UPDATE_ALBEDO\n#ifdef OPACITY\n#ifdef OPACITYRGB\nalpha=getLuminance(opacityMap.rgb);\n#else\nalpha*=opacityMap.a;\n#endif\nalpha*=vOpacityInfos.y;\n#endif\n#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR)\nalpha*=vColor.a;\n#endif\n#if !defined(SS_LINKREFRACTIONTOTRANSPARENCY) && !defined(ALPHAFRESNEL)\n#ifdef ALPHATEST\nif (alpha<ALPHATESTVALUE)\ndiscard;\n#ifndef ALPHABLEND\nalpha=1.0;\n#endif\n#endif\n#endif\noutParams.surfaceAlbedo=surfaceAlbedo;\noutParams.alpha=alpha;\n}\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$f] = shader$f;

// Do not edit.
var name$g = "pbrBlockReflectivity";
var shader$g = "struct reflectivityOutParams\n{\nfloat microSurface;\nfloat roughness;\nvec3 surfaceReflectivityColor;\n#ifdef METALLICWORKFLOW\nvec3 surfaceAlbedo;\n#endif\n#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)\nvec3 ambientOcclusionColor;\n#endif\n#if DEBUGMODE>0\nvec4 surfaceMetallicColorMap;\nvec4 surfaceReflectivityColorMap;\nvec2 metallicRoughness;\nvec3 metallicF0;\n#endif\n};\n#define pbr_inline\nvoid reflectivityBlock(\nin vec4 vReflectivityColor,\n#ifdef METALLICWORKFLOW\nin vec3 surfaceAlbedo,\nin vec4 metallicReflectanceFactors,\n#endif\n#ifdef REFLECTIVITY\nin vec3 reflectivityInfos,\nin vec4 surfaceMetallicOrReflectivityColorMap,\n#endif\n#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)\nin vec3 ambientOcclusionColorIn,\n#endif\n#ifdef MICROSURFACEMAP\nin vec4 microSurfaceTexel,\n#endif\n#ifdef DETAIL\nin vec4 detailColor,\nin vec4 vDetailInfos,\n#endif\nout reflectivityOutParams outParams\n)\n{\nfloat microSurface=vReflectivityColor.a;\nvec3 surfaceReflectivityColor=vReflectivityColor.rgb;\n#ifdef METALLICWORKFLOW\nvec2 metallicRoughness=surfaceReflectivityColor.rg;\n#ifdef REFLECTIVITY\n#if DEBUGMODE>0\noutParams.surfaceMetallicColorMap=surfaceMetallicOrReflectivityColorMap;\n#endif\n#ifdef AOSTOREINMETALMAPRED\nvec3 aoStoreInMetalMap=vec3(surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r,surfaceMetallicOrReflectivityColorMap.r);\noutParams.ambientOcclusionColor=mix(ambientOcclusionColorIn,aoStoreInMetalMap,reflectivityInfos.z);\n#endif\n#ifdef METALLNESSSTOREINMETALMAPBLUE\nmetallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.b;\n#else\nmetallicRoughness.r*=surfaceMetallicOrReflectivityColorMap.r;\n#endif\n#ifdef ROUGHNESSSTOREINMETALMAPALPHA\nmetallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.a;\n#else\n#ifdef ROUGHNESSSTOREINMETALMAPGREEN\nmetallicRoughness.g*=surfaceMetallicOrReflectivityColorMap.g;\n#endif\n#endif\n#endif\n#ifdef DETAIL\nfloat detailRoughness=mix(0.5,detailColor.b,vDetailInfos.w);\nfloat loLerp=mix(0.,metallicRoughness.g,detailRoughness*2.);\nfloat hiLerp=mix(metallicRoughness.g,1.,(detailRoughness-0.5)*2.);\nmetallicRoughness.g=mix(loLerp,hiLerp,step(detailRoughness,0.5));\n#endif\n#ifdef MICROSURFACEMAP\nmetallicRoughness.g*=microSurfaceTexel.r;\n#endif\n#if DEBUGMODE>0\noutParams.metallicRoughness=metallicRoughness;\n#endif\n#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS\nmicroSurface=1.0-metallicRoughness.g;\nvec3 baseColor=surfaceAlbedo;\n#ifdef FROSTBITE_REFLECTANCE\noutParams.surfaceAlbedo=baseColor.rgb*(1.0-metallicRoughness.r);\nsurfaceReflectivityColor=mix(0.16*reflectance*reflectance,baseColor,metallicRoughness.r);\n#else\nvec3 metallicF0=metallicReflectanceFactors.rgb;\n#if DEBUGMODE>0\noutParams.metallicF0=metallicF0;\n#endif\noutParams.surfaceAlbedo=mix(baseColor.rgb*(1.0-metallicF0),vec3(0.,0.,0.),metallicRoughness.r);\nsurfaceReflectivityColor=mix(metallicF0,baseColor,metallicRoughness.r);\n#endif\n#else\n#ifdef REFLECTIVITY\nsurfaceReflectivityColor*=surfaceMetallicOrReflectivityColorMap.rgb;\n#if DEBUGMODE>0\noutParams.surfaceReflectivityColorMap=surfaceMetallicOrReflectivityColorMap;\n#endif\n#ifdef MICROSURFACEFROMREFLECTIVITYMAP\nmicroSurface*=surfaceMetallicOrReflectivityColorMap.a;\nmicroSurface*=reflectivityInfos.z;\n#else\n#ifdef MICROSURFACEAUTOMATIC\nmicroSurface*=computeDefaultMicroSurface(microSurface,surfaceReflectivityColor);\n#endif\n#ifdef MICROSURFACEMAP\nmicroSurface*=microSurfaceTexel.r;\n#endif\n#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE\n#endif\n#endif\n#endif\nmicroSurface=saturate(microSurface);\nfloat roughness=1.-microSurface;\noutParams.microSurface=microSurface;\noutParams.roughness=roughness;\noutParams.surfaceReflectivityColor=surfaceReflectivityColor;\n}\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$g] = shader$g;

// Do not edit.
var name$h = "pbrBlockAmbientOcclusion";
var shader$h = "struct ambientOcclusionOutParams\n{\nvec3 ambientOcclusionColor;\n#if DEBUGMODE>0\nvec3 ambientOcclusionColorMap;\n#endif\n};\n#define pbr_inline\nvoid ambientOcclusionBlock(\n#ifdef AMBIENT\nin vec3 ambientOcclusionColorMap_,\nin vec4 vAmbientInfos,\n#endif\nout ambientOcclusionOutParams outParams\n)\n{\nvec3 ambientOcclusionColor=vec3(1.,1.,1.);\n#ifdef AMBIENT\nvec3 ambientOcclusionColorMap=ambientOcclusionColorMap_*vAmbientInfos.y;\n#ifdef AMBIENTINGRAYSCALE\nambientOcclusionColorMap=vec3(ambientOcclusionColorMap.r,ambientOcclusionColorMap.r,ambientOcclusionColorMap.r);\n#endif\nambientOcclusionColor=mix(ambientOcclusionColor,ambientOcclusionColorMap,vAmbientInfos.z);\n#if DEBUGMODE>0\noutParams.ambientOcclusionColorMap=ambientOcclusionColorMap;\n#endif\n#endif\noutParams.ambientOcclusionColor=ambientOcclusionColor;\n}\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$h] = shader$h;

// Do not edit.
var name$i = "pbrBlockAlphaFresnel";
var shader$i = "#ifdef ALPHAFRESNEL\n#if defined(ALPHATEST) || defined(ALPHABLEND)\nstruct alphaFresnelOutParams\n{\nfloat alpha;\n};\n#define pbr_inline\nvoid alphaFresnelBlock(\nin vec3 normalW,\nin vec3 viewDirectionW,\nin float alpha,\nin float microSurface,\nout alphaFresnelOutParams outParams\n)\n{\nfloat opacityPerceptual=alpha;\n#ifdef LINEARALPHAFRESNEL\nfloat opacity0=opacityPerceptual;\n#else\nfloat opacity0=opacityPerceptual*opacityPerceptual;\n#endif\nfloat opacity90=fresnelGrazingReflectance(opacity0);\nvec3 normalForward=faceforward(normalW,-viewDirectionW,normalW);\noutParams.alpha=getReflectanceFromAnalyticalBRDFLookup_Jones(saturate(dot(viewDirectionW,normalForward)),vec3(opacity0),vec3(opacity90),sqrt(microSurface)).x;\n#ifdef ALPHATEST\nif (outParams.alpha<ALPHATESTVALUE)\ndiscard;\n#ifndef ALPHABLEND\noutParams.alpha=1.0;\n#endif\n#endif\n}\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$i] = shader$i;

// Do not edit.
var name$j = "pbrBlockAnisotropic";
var shader$j = "#ifdef ANISOTROPIC\nstruct anisotropicOutParams\n{\nfloat anisotropy;\nvec3 anisotropicTangent;\nvec3 anisotropicBitangent;\nvec3 anisotropicNormal;\n#if DEBUGMODE>0\nvec3 anisotropyMapData;\n#endif\n};\n#define pbr_inline\nvoid anisotropicBlock(\nin vec3 vAnisotropy,\n#ifdef ANISOTROPIC_TEXTURE\nin vec3 anisotropyMapData,\n#endif\nin mat3 TBN,\nin vec3 normalW,\nin vec3 viewDirectionW,\nout anisotropicOutParams outParams\n)\n{\nfloat anisotropy=vAnisotropy.b;\nvec3 anisotropyDirection=vec3(vAnisotropy.xy,0.);\n#ifdef ANISOTROPIC_TEXTURE\nanisotropy*=anisotropyMapData.b;\nanisotropyDirection.rg*=anisotropyMapData.rg*2.0-1.0;\n#if DEBUGMODE>0\noutParams.anisotropyMapData=anisotropyMapData;\n#endif\n#endif\nmat3 anisoTBN=mat3(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));\nvec3 anisotropicTangent=normalize(anisoTBN*anisotropyDirection);\nvec3 anisotropicBitangent=normalize(cross(anisoTBN[2],anisotropicTangent));\noutParams.anisotropy=anisotropy;\noutParams.anisotropicTangent=anisotropicTangent;\noutParams.anisotropicBitangent=anisotropicBitangent;\noutParams.anisotropicNormal=getAnisotropicBentNormals(anisotropicTangent,anisotropicBitangent,normalW,viewDirectionW,anisotropy);\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$j] = shader$j;

// Do not edit.
var name$k = "pbrBlockReflection";
var shader$k = "#ifdef REFLECTION\nstruct reflectionOutParams\n{\nvec4 environmentRadiance;\nvec3 environmentIrradiance;\n#ifdef REFLECTIONMAP_3D\nvec3 reflectionCoords;\n#else\nvec2 reflectionCoords;\n#endif\n#ifdef SS_TRANSLUCENCY\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)\nvec3 irradianceVector;\n#endif\n#endif\n#endif\n};\n#define pbr_inline\nvoid createReflectionCoords(\nin vec3 vPositionW,\nin vec3 normalW,\n#ifdef ANISOTROPIC\nin anisotropicOutParams anisotropicOut,\n#endif\n#ifdef REFLECTIONMAP_3D\nout vec3 reflectionCoords\n#else\nout vec2 reflectionCoords\n#endif\n)\n{\n#ifdef ANISOTROPIC\nvec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),anisotropicOut.anisotropicNormal);\n#else\nvec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),normalW);\n#endif\n#ifdef REFLECTIONMAP_OPPOSITEZ\nreflectionVector.z*=-1.0;\n#endif\n#ifdef REFLECTIONMAP_3D\nreflectionCoords=reflectionVector;\n#else\nreflectionCoords=reflectionVector.xy;\n#ifdef REFLECTIONMAP_PROJECTION\nreflectionCoords/=reflectionVector.z;\n#endif\nreflectionCoords.y=1.0-reflectionCoords.y;\n#endif\n}\n#define pbr_inline\n#define inline\nvoid sampleReflectionTexture(\nin float alphaG,\nin vec3 vReflectionMicrosurfaceInfos,\nin vec2 vReflectionInfos,\nin vec3 vReflectionColor,\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nin float NdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nin float roughness,\n#endif\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSampler,\nconst vec3 reflectionCoords,\n#else\nin sampler2D reflectionSampler,\nconst vec2 reflectionCoords,\n#endif\n#ifndef LODBASEDMICROSFURACE\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSamplerLow,\nin samplerCube reflectionSamplerHigh,\n#else\nin sampler2D reflectionSamplerLow,\nin sampler2D reflectionSamplerHigh,\n#endif\n#endif\n#ifdef REALTIME_FILTERING\nin vec2 vReflectionFilteringInfo,\n#endif\nout vec4 environmentRadiance\n)\n{\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nfloat reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,NdotVUnclamped);\n#elif defined(LINEARSPECULARREFLECTION)\nfloat reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);\n#else\nfloat reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);\n#endif\n#ifdef LODBASEDMICROSFURACE\nreflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;\n#ifdef LODINREFLECTIONALPHA\nfloat automaticReflectionLOD=UNPACK_LOD(sampleReflection(reflectionSampler,reflectionCoords).a);\nfloat requestedReflectionLOD=max(automaticReflectionLOD,reflectionLOD);\n#else\nfloat requestedReflectionLOD=reflectionLOD;\n#endif\n#ifdef REALTIME_FILTERING\nenvironmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);\n#else\nenvironmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);\n#endif\n#else\nfloat lodReflectionNormalized=saturate(reflectionLOD/log2(vReflectionMicrosurfaceInfos.x));\nfloat lodReflectionNormalizedDoubled=lodReflectionNormalized*2.0;\nvec4 environmentMid=sampleReflection(reflectionSampler,reflectionCoords);\nif (lodReflectionNormalizedDoubled<1.0){\nenvironmentRadiance=mix(\nsampleReflection(reflectionSamplerHigh,reflectionCoords),\nenvironmentMid,\nlodReflectionNormalizedDoubled\n);\n} else {\nenvironmentRadiance=mix(\nenvironmentMid,\nsampleReflection(reflectionSamplerLow,reflectionCoords),\nlodReflectionNormalizedDoubled-1.0\n);\n}\n#endif\n#ifdef RGBDREFLECTION\nenvironmentRadiance.rgb=fromRGBD(environmentRadiance);\n#endif\n#ifdef GAMMAREFLECTION\nenvironmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);\n#endif\nenvironmentRadiance.rgb*=vReflectionInfos.x;\nenvironmentRadiance.rgb*=vReflectionColor.rgb;\n}\n#define pbr_inline\n#define inline\nvoid reflectionBlock(\nin vec3 vPositionW,\nin vec3 normalW,\nin float alphaG,\nin vec3 vReflectionMicrosurfaceInfos,\nin vec2 vReflectionInfos,\nin vec3 vReflectionColor,\n#ifdef ANISOTROPIC\nin anisotropicOutParams anisotropicOut,\n#endif\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nin float NdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nin float roughness,\n#endif\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSampler,\n#else\nin sampler2D reflectionSampler,\n#endif\n#if defined(NORMAL) && defined(USESPHERICALINVERTEX)\nin vec3 vEnvironmentIrradiance,\n#endif\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)\nin mat4 reflectionMatrix,\n#endif\n#endif\n#ifdef USEIRRADIANCEMAP\n#ifdef REFLECTIONMAP_3D\nin samplerCube irradianceSampler,\n#else\nin sampler2D irradianceSampler,\n#endif\n#endif\n#ifndef LODBASEDMICROSFURACE\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSamplerLow,\nin samplerCube reflectionSamplerHigh,\n#else\nin sampler2D reflectionSamplerLow,\nin sampler2D reflectionSamplerHigh,\n#endif\n#endif\n#ifdef REALTIME_FILTERING\nin vec2 vReflectionFilteringInfo,\n#endif\nout reflectionOutParams outParams\n)\n{\nvec4 environmentRadiance=vec4(0.,0.,0.,0.);\n#ifdef REFLECTIONMAP_3D\nvec3 reflectionCoords=vec3(0.);\n#else\nvec2 reflectionCoords=vec2(0.);\n#endif\ncreateReflectionCoords(\nvPositionW,\nnormalW,\n#ifdef ANISOTROPIC\nanisotropicOut,\n#endif\nreflectionCoords\n);\nsampleReflectionTexture(\nalphaG,\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nNdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nroughness,\n#endif\n#ifdef REFLECTIONMAP_3D\nreflectionSampler,\nreflectionCoords,\n#else\nreflectionSampler,\nreflectionCoords,\n#endif\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\nenvironmentRadiance\n);\nvec3 environmentIrradiance=vec3(0.,0.,0.);\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if defined(NORMAL) && defined(USESPHERICALINVERTEX)\nenvironmentIrradiance=vEnvironmentIrradiance;\n#else\n#ifdef ANISOTROPIC\nvec3 irradianceVector=vec3(reflectionMatrix*vec4(anisotropicOut.anisotropicNormal,0)).xyz;\n#else\nvec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;\n#endif\n#ifdef REFLECTIONMAP_OPPOSITEZ\nirradianceVector.z*=-1.0;\n#endif\n#ifdef INVERTCUBICMAP\nirradianceVector.y*=-1.0;\n#endif\n#if defined(REALTIME_FILTERING)\nenvironmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo);\n#else\nenvironmentIrradiance=computeEnvironmentIrradiance(irradianceVector);\n#endif\n#ifdef SS_TRANSLUCENCY\noutParams.irradianceVector=irradianceVector;\n#endif\n#endif\n#elif defined(USEIRRADIANCEMAP)\nvec4 environmentIrradiance4=sampleReflection(irradianceSampler,reflectionCoords);\nenvironmentIrradiance=environmentIrradiance4.rgb;\n#ifdef RGBDREFLECTION\nenvironmentIrradiance.rgb=fromRGBD(environmentIrradiance4);\n#endif\n#ifdef GAMMAREFLECTION\nenvironmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);\n#endif\n#endif\nenvironmentIrradiance*=vReflectionColor.rgb;\noutParams.environmentRadiance=environmentRadiance;\noutParams.environmentIrradiance=environmentIrradiance;\noutParams.reflectionCoords=reflectionCoords;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$k] = shader$k;

// Do not edit.
var name$l = "pbrBlockSheen";
var shader$l = "#ifdef SHEEN\nstruct sheenOutParams\n{\nfloat sheenIntensity;\nvec3 sheenColor;\nfloat sheenRoughness;\n#ifdef SHEEN_LINKWITHALBEDO\nvec3 surfaceAlbedo;\n#endif\n#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)\nfloat sheenAlbedoScaling;\n#endif\n#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)\nvec3 finalSheenRadianceScaled;\n#endif\n#if DEBUGMODE>0\nvec4 sheenMapData;\nvec3 sheenEnvironmentReflectance;\n#endif\n};\n#define pbr_inline\n#define inline\nvoid sheenBlock(\nin vec4 vSheenColor,\n#ifdef SHEEN_ROUGHNESS\nin float vSheenRoughness,\n#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)\nin vec4 sheenMapRoughnessData,\n#endif\n#endif\nin float roughness,\n#ifdef SHEEN_TEXTURE\nin vec4 sheenMapData,\nin float sheenMapLevel,\n#endif\nin float reflectance,\n#ifdef SHEEN_LINKWITHALBEDO\nin vec3 baseColor,\nin vec3 surfaceAlbedo,\n#endif\n#ifdef ENVIRONMENTBRDF\nin float NdotV,\nin vec3 environmentBrdf,\n#endif\n#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)\nin vec2 AARoughnessFactors,\nin vec3 vReflectionMicrosurfaceInfos,\nin vec2 vReflectionInfos,\nin vec3 vReflectionColor,\nin vec4 vLightingIntensity,\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSampler,\nin vec3 reflectionCoords,\n#else\nin sampler2D reflectionSampler,\nin vec2 reflectionCoords,\n#endif\nin float NdotVUnclamped,\n#ifndef LODBASEDMICROSFURACE\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSamplerLow,\nin samplerCube reflectionSamplerHigh,\n#else\nin sampler2D reflectionSamplerLow,\nin sampler2D reflectionSamplerHigh,\n#endif\n#endif\n#ifdef REALTIME_FILTERING\nin vec2 vReflectionFilteringInfo,\n#endif\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)\nin float seo,\n#endif\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)\nin float eho,\n#endif\n#endif\nout sheenOutParams outParams\n)\n{\nfloat sheenIntensity=vSheenColor.a;\n#ifdef SHEEN_TEXTURE\n#if DEBUGMODE>0\noutParams.sheenMapData=sheenMapData;\n#endif\n#endif\n#ifdef SHEEN_LINKWITHALBEDO\nfloat sheenFactor=pow5(1.0-sheenIntensity);\nvec3 sheenColor=baseColor.rgb*(1.0-sheenFactor);\nfloat sheenRoughness=sheenIntensity;\noutParams.surfaceAlbedo=surfaceAlbedo*sheenFactor;\n#ifdef SHEEN_TEXTURE\nsheenIntensity*=sheenMapData.a;\n#endif\n#else\nvec3 sheenColor=vSheenColor.rgb;\n#ifdef SHEEN_TEXTURE\n#ifdef SHEEN_GAMMATEXTURE\nsheenColor.rgb*=toLinearSpace(sheenMapData.rgb);\n#else\nsheenColor.rgb*=sheenMapData.rgb;\n#endif\nsheenColor.rgb*=sheenMapLevel;\n#endif\n#ifdef SHEEN_ROUGHNESS\nfloat sheenRoughness=vSheenRoughness;\n#ifdef SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE\n#if defined(SHEEN_TEXTURE)\nsheenRoughness*=sheenMapData.a;\n#endif\n#elif defined(SHEEN_TEXTURE_ROUGHNESS)\n#ifdef SHEEN_TEXTURE_ROUGHNESS_IDENTICAL\nsheenRoughness*=sheenMapData.a;\n#else\nsheenRoughness*=sheenMapRoughnessData.a;\n#endif\n#endif\n#else\nfloat sheenRoughness=roughness;\n#ifdef SHEEN_TEXTURE\nsheenIntensity*=sheenMapData.a;\n#endif\n#endif\n#if !defined(SHEEN_ALBEDOSCALING)\nsheenIntensity*=(1.-reflectance);\n#endif\nsheenColor*=sheenIntensity;\n#endif\n#ifdef ENVIRONMENTBRDF\n/*#ifdef SHEEN_SOFTER\nvec3 environmentSheenBrdf=vec3(0.,0.,getBRDFLookupCharlieSheen(NdotV,sheenRoughness));\n#else*/\n#ifdef SHEEN_ROUGHNESS\nvec3 environmentSheenBrdf=getBRDFLookup(NdotV,sheenRoughness);\n#else\nvec3 environmentSheenBrdf=environmentBrdf;\n#endif\n/*#endif*/\n#endif\n#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)\nfloat sheenAlphaG=convertRoughnessToAverageSlope(sheenRoughness);\n#ifdef SPECULARAA\nsheenAlphaG+=AARoughnessFactors.y;\n#endif\nvec4 environmentSheenRadiance=vec4(0.,0.,0.,0.);\nsampleReflectionTexture(\nsheenAlphaG,\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nNdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nsheenRoughness,\n#endif\nreflectionSampler,\nreflectionCoords,\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\nenvironmentSheenRadiance\n);\nvec3 sheenEnvironmentReflectance=getSheenReflectanceFromBRDFLookup(sheenColor,environmentSheenBrdf);\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)\nsheenEnvironmentReflectance*=seo;\n#endif\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)\nsheenEnvironmentReflectance*=eho;\n#endif\n#if DEBUGMODE>0\noutParams.sheenEnvironmentReflectance=sheenEnvironmentReflectance;\n#endif\noutParams.finalSheenRadianceScaled=\nenvironmentSheenRadiance.rgb *\nsheenEnvironmentReflectance *\nvLightingIntensity.z;\n#endif\n#if defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)\noutParams.sheenAlbedoScaling=1.0-sheenIntensity*max(max(sheenColor.r,sheenColor.g),sheenColor.b)*environmentSheenBrdf.b;\n#endif\noutParams.sheenIntensity=sheenIntensity;\noutParams.sheenColor=sheenColor;\noutParams.sheenRoughness=sheenRoughness;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$l] = shader$l;

// Do not edit.
var name$m = "pbrBlockClearcoat";
var shader$m = "struct clearcoatOutParams\n{\nvec3 specularEnvironmentR0;\nfloat conservationFactor;\nvec3 clearCoatNormalW;\nvec2 clearCoatAARoughnessFactors;\nfloat clearCoatIntensity;\nfloat clearCoatRoughness;\n#ifdef REFLECTION\nvec3 finalClearCoatRadianceScaled;\n#endif\n#ifdef CLEARCOAT_TINT\nvec3 absorption;\nfloat clearCoatNdotVRefract;\nvec3 clearCoatColor;\nfloat clearCoatThickness;\n#endif\n#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)\nvec3 energyConservationFactorClearCoat;\n#endif\n#if DEBUGMODE>0\nmat3 TBNClearCoat;\nvec2 clearCoatMapData;\nvec4 clearCoatTintMapData;\nvec4 environmentClearCoatRadiance;\nfloat clearCoatNdotV;\nvec3 clearCoatEnvironmentReflectance;\n#endif\n};\n#ifdef CLEARCOAT\n#define pbr_inline\n#define inline\nvoid clearcoatBlock(\nin vec3 vPositionW,\nin vec3 geometricNormalW,\nin vec3 viewDirectionW,\nin vec2 vClearCoatParams,\n#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)\nin vec4 clearCoatMapRoughnessData,\n#endif\nin vec3 specularEnvironmentR0,\n#ifdef CLEARCOAT_TEXTURE\nin vec2 clearCoatMapData,\n#endif\n#ifdef CLEARCOAT_TINT\nin vec4 vClearCoatTintParams,\nin float clearCoatColorAtDistance,\nin vec4 vClearCoatRefractionParams,\n#ifdef CLEARCOAT_TINT_TEXTURE\nin vec4 clearCoatTintMapData,\n#endif\n#endif\n#ifdef CLEARCOAT_BUMP\nin vec2 vClearCoatBumpInfos,\nin vec4 clearCoatBumpMapData,\nin vec2 vClearCoatBumpUV,\n#if defined(TANGENT) && defined(NORMAL)\nin mat3 vTBN,\n#else\nin vec2 vClearCoatTangentSpaceParams,\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nin mat4 normalMatrix,\n#endif\n#endif\n#if defined(FORCENORMALFORWARD) && defined(NORMAL)\nin vec3 faceNormal,\n#endif\n#ifdef REFLECTION\nin vec3 vReflectionMicrosurfaceInfos,\nin vec2 vReflectionInfos,\nin vec3 vReflectionColor,\nin vec4 vLightingIntensity,\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSampler,\n#else\nin sampler2D reflectionSampler,\n#endif\n#ifndef LODBASEDMICROSFURACE\n#ifdef REFLECTIONMAP_3D\nin samplerCube reflectionSamplerLow,\nin samplerCube reflectionSamplerHigh,\n#else\nin sampler2D reflectionSamplerLow,\nin sampler2D reflectionSamplerHigh,\n#endif\n#endif\n#ifdef REALTIME_FILTERING\nin vec2 vReflectionFilteringInfo,\n#endif\n#endif\n#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\n#ifdef RADIANCEOCCLUSION\nin float ambientMonochrome,\n#endif\n#endif\n#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)\nin float frontFacingMultiplier,\n#endif\nout clearcoatOutParams outParams\n)\n{\nfloat clearCoatIntensity=vClearCoatParams.x;\nfloat clearCoatRoughness=vClearCoatParams.y;\n#ifdef CLEARCOAT_TEXTURE\nclearCoatIntensity*=clearCoatMapData.x;\n#ifdef CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE\nclearCoatRoughness*=clearCoatMapData.y;\n#endif\n#if DEBUGMODE>0\noutParams.clearCoatMapData=clearCoatMapData;\n#endif\n#endif\n#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)\n#ifdef CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL\nclearCoatRoughness*=clearCoatMapData.y;\n#else\nclearCoatRoughness*=clearCoatMapRoughnessData.y;\n#endif\n#endif\noutParams.clearCoatIntensity=clearCoatIntensity;\noutParams.clearCoatRoughness=clearCoatRoughness;\n#ifdef CLEARCOAT_TINT\nvec3 clearCoatColor=vClearCoatTintParams.rgb;\nfloat clearCoatThickness=vClearCoatTintParams.a;\n#ifdef CLEARCOAT_TINT_TEXTURE\n#ifdef CLEARCOAT_TINT_GAMMATEXTURE\nclearCoatColor*=toLinearSpace(clearCoatTintMapData.rgb);\n#else\nclearCoatColor*=clearCoatTintMapData.rgb;\n#endif\nclearCoatThickness*=clearCoatTintMapData.a;\n#if DEBUGMODE>0\noutParams.clearCoatTintMapData=clearCoatTintMapData;\n#endif\n#endif\noutParams.clearCoatColor=computeColorAtDistanceInMedia(clearCoatColor,clearCoatColorAtDistance);\noutParams.clearCoatThickness=clearCoatThickness;\n#endif\n#ifdef CLEARCOAT_REMAP_F0\nvec3 specularEnvironmentR0Updated=getR0RemappedForClearCoat(specularEnvironmentR0);\n#else\nvec3 specularEnvironmentR0Updated=specularEnvironmentR0;\n#endif\noutParams.specularEnvironmentR0=mix(specularEnvironmentR0,specularEnvironmentR0Updated,clearCoatIntensity);\nvec3 clearCoatNormalW=geometricNormalW;\n#ifdef CLEARCOAT_BUMP\n#ifdef NORMALXYSCALE\nfloat clearCoatNormalScale=1.0;\n#else\nfloat clearCoatNormalScale=vClearCoatBumpInfos.y;\n#endif\n#if defined(TANGENT) && defined(NORMAL)\nmat3 TBNClearCoat=vTBN;\n#else\nvec2 TBNClearCoatUV=vClearCoatBumpUV*frontFacingMultiplier;\nmat3 TBNClearCoat=cotangent_frame(clearCoatNormalW*clearCoatNormalScale,vPositionW,TBNClearCoatUV,vClearCoatTangentSpaceParams);\n#endif\n#if DEBUGMODE>0\noutParams.TBNClearCoat=TBNClearCoat;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nclearCoatNormalW=normalize(clearCoatBumpMapData.xyz *2.0-1.0);\nclearCoatNormalW=normalize(mat3(normalMatrix)*clearCoatNormalW);\n#else\nclearCoatNormalW=perturbNormal(TBNClearCoat,clearCoatBumpMapData.xyz,vClearCoatBumpInfos.y);\n#endif\n#endif\n#if defined(FORCENORMALFORWARD) && defined(NORMAL)\nclearCoatNormalW*=sign(dot(clearCoatNormalW,faceNormal));\n#endif\n#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\nclearCoatNormalW=clearCoatNormalW*frontFacingMultiplier;\n#endif\noutParams.clearCoatNormalW=clearCoatNormalW;\noutParams.clearCoatAARoughnessFactors=getAARoughnessFactors(clearCoatNormalW.xyz);\nfloat clearCoatNdotVUnclamped=dot(clearCoatNormalW,viewDirectionW);\nfloat clearCoatNdotV=absEps(clearCoatNdotVUnclamped);\n#if DEBUGMODE>0\noutParams.clearCoatNdotV=clearCoatNdotV;\n#endif\n#ifdef CLEARCOAT_TINT\nvec3 clearCoatVRefract=refract(-viewDirectionW,clearCoatNormalW,vClearCoatRefractionParams.y);\noutParams.clearCoatNdotVRefract=absEps(dot(clearCoatNormalW,clearCoatVRefract));\n#endif\n#if defined(ENVIRONMENTBRDF) && (!defined(REFLECTIONMAP_SKYBOX) || defined(MS_BRDF_ENERGY_CONSERVATION))\nvec3 environmentClearCoatBrdf=getBRDFLookup(clearCoatNdotV,clearCoatRoughness);\n#endif\n#if defined(REFLECTION)\nfloat clearCoatAlphaG=convertRoughnessToAverageSlope(clearCoatRoughness);\n#ifdef SPECULARAA\nclearCoatAlphaG+=outParams.clearCoatAARoughnessFactors.y;\n#endif\nvec4 environmentClearCoatRadiance=vec4(0.,0.,0.,0.);\nvec3 clearCoatReflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),clearCoatNormalW);\n#ifdef REFLECTIONMAP_OPPOSITEZ\nclearCoatReflectionVector.z*=-1.0;\n#endif\n#ifdef REFLECTIONMAP_3D\nvec3 clearCoatReflectionCoords=clearCoatReflectionVector;\n#else\nvec2 clearCoatReflectionCoords=clearCoatReflectionVector.xy;\n#ifdef REFLECTIONMAP_PROJECTION\nclearCoatReflectionCoords/=clearCoatReflectionVector.z;\n#endif\nclearCoatReflectionCoords.y=1.0-clearCoatReflectionCoords.y;\n#endif\nsampleReflectionTexture(\nclearCoatAlphaG,\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nclearCoatNdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nclearCoatRoughness,\n#endif\nreflectionSampler,\nclearCoatReflectionCoords,\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\nenvironmentClearCoatRadiance\n);\n#if DEBUGMODE>0\noutParams.environmentClearCoatRadiance=environmentClearCoatRadiance;\n#endif\n#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\nvec3 clearCoatEnvironmentReflectance=getReflectanceFromBRDFLookup(vec3(vClearCoatRefractionParams.x),environmentClearCoatBrdf);\n#ifdef RADIANCEOCCLUSION\nfloat clearCoatSeo=environmentRadianceOcclusion(ambientMonochrome,clearCoatNdotVUnclamped);\nclearCoatEnvironmentReflectance*=clearCoatSeo;\n#endif\n#ifdef HORIZONOCCLUSION\n#ifdef BUMP\n#ifdef REFLECTIONMAP_3D\nfloat clearCoatEho=environmentHorizonOcclusion(-viewDirectionW,clearCoatNormalW,geometricNormalW);\nclearCoatEnvironmentReflectance*=clearCoatEho;\n#endif\n#endif\n#endif\n#else\nvec3 clearCoatEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(clearCoatNdotV,vec3(1.),vec3(1.),sqrt(1.-clearCoatRoughness));\n#endif\nclearCoatEnvironmentReflectance*=clearCoatIntensity;\n#if DEBUGMODE>0\noutParams.clearCoatEnvironmentReflectance=clearCoatEnvironmentReflectance;\n#endif\noutParams.finalClearCoatRadianceScaled=\nenvironmentClearCoatRadiance.rgb *\nclearCoatEnvironmentReflectance *\nvLightingIntensity.z;\n#endif\n#if defined(CLEARCOAT_TINT)\noutParams.absorption=computeClearCoatAbsorption(outParams.clearCoatNdotVRefract,outParams.clearCoatNdotVRefract,outParams.clearCoatColor,clearCoatThickness,clearCoatIntensity);\n#endif\nfloat fresnelIBLClearCoat=fresnelSchlickGGX(clearCoatNdotV,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);\nfresnelIBLClearCoat*=clearCoatIntensity;\noutParams.conservationFactor=(1.-fresnelIBLClearCoat);\n#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)\noutParams.energyConservationFactorClearCoat=getEnergyConservationFactor(outParams.specularEnvironmentR0,environmentClearCoatBrdf);\n#endif\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$m] = shader$m;

// Do not edit.
var name$n = "pbrBlockIridescence";
var shader$n = "struct iridescenceOutParams\n{\nfloat iridescenceIntensity;\nfloat iridescenceIOR;\nfloat iridescenceThickness;\nvec3 specularEnvironmentR0;\n};\n#ifdef IRIDESCENCE\n#define pbr_inline\n#define inline\nvoid iridescenceBlock(\nin vec4 vIridescenceParams,\nin float viewAngle,\nin vec3 specularEnvironmentR0,\n#ifdef IRIDESCENCE_TEXTURE\nin vec2 iridescenceMapData,\n#endif\n#ifdef IRIDESCENCE_THICKNESS_TEXTURE\nin vec2 iridescenceThicknessMapData,\n#endif\n#ifdef CLEARCOAT\nin float NdotVUnclamped,\n#ifdef CLEARCOAT_TEXTURE\nin vec2 clearCoatMapData,\n#endif\n#endif\nout iridescenceOutParams outParams\n)\n{\nfloat iridescenceIntensity=vIridescenceParams.x;\nfloat iridescenceIOR=vIridescenceParams.y;\nfloat iridescenceThicknessMin=vIridescenceParams.z;\nfloat iridescenceThicknessMax=vIridescenceParams.w;\nfloat iridescenceThicknessWeight=1.;\n#ifdef IRIDESCENCE_TEXTURE\niridescenceIntensity*=iridescenceMapData.x;\n#ifdef IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE\niridescenceThicknessWeight=iridescenceMapData.g;\n#endif\n#endif\n#if defined(IRIDESCENCE_THICKNESS_TEXTURE)\niridescenceThicknessWeight=iridescenceThicknessMapData.g;\n#endif\nfloat iridescenceThickness=mix(iridescenceThicknessMin,iridescenceThicknessMax,iridescenceThicknessWeight);\nfloat topIor=1.; \n#ifdef CLEARCOAT\nfloat clearCoatIntensity=vClearCoatParams.x;\n#ifdef CLEARCOAT_TEXTURE\nclearCoatIntensity*=clearCoatMapData.x;\n#endif\ntopIor=mix(1.0,vClearCoatRefractionParams.w-1.,clearCoatIntensity);\nviewAngle=sqrt(1.0+square(1.0/topIor)*(square(NdotVUnclamped)-1.0));\n#endif\nvec3 iridescenceFresnel=evalIridescence(topIor,iridescenceIOR,viewAngle,iridescenceThickness,specularEnvironmentR0);\noutParams.specularEnvironmentR0=mix(specularEnvironmentR0,iridescenceFresnel,iridescenceIntensity);\noutParams.iridescenceIntensity=iridescenceIntensity;\noutParams.iridescenceThickness=iridescenceThickness;\noutParams.iridescenceIOR=iridescenceIOR;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$n] = shader$n;

// Do not edit.
var name$o = "pbrBlockSubSurface";
var shader$o = "struct subSurfaceOutParams\n{\nvec3 specularEnvironmentReflectance;\n#ifdef SS_REFRACTION\nvec3 finalRefraction;\nvec3 surfaceAlbedo;\n#ifdef SS_LINKREFRACTIONTOTRANSPARENCY\nfloat alpha;\n#endif\n#ifdef REFLECTION\nfloat refractionFactorForIrradiance;\n#endif\n#endif\n#ifdef SS_TRANSLUCENCY\nvec3 transmittance;\nfloat translucencyIntensity;\n#ifdef REFLECTION\nvec3 refractionIrradiance;\n#endif\n#endif\n#if DEBUGMODE>0\nvec4 thicknessMap;\nvec4 environmentRefraction;\nvec3 refractionTransmittance;\n#endif\n};\n#ifdef SUBSURFACE\n#define pbr_inline\n#define inline\nvoid subSurfaceBlock(\nin vec3 vSubSurfaceIntensity,\nin vec2 vThicknessParam,\nin vec4 vTintColor,\nin vec3 normalW,\nin vec3 specularEnvironmentReflectance,\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nin vec4 thicknessMap,\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\nin vec4 refractionIntensityMap,\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\nin vec4 translucencyIntensityMap,\n#endif\n#ifdef REFLECTION\n#ifdef SS_TRANSLUCENCY\nin mat4 reflectionMatrix,\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)\nin vec3 irradianceVector_,\n#endif\n#if defined(REALTIME_FILTERING)\nin samplerCube reflectionSampler,\nin vec2 vReflectionFilteringInfo,\n#endif\n#endif\n#ifdef USEIRRADIANCEMAP\n#ifdef REFLECTIONMAP_3D\nin samplerCube irradianceSampler,\n#else\nin sampler2D irradianceSampler,\n#endif\n#endif\n#endif\n#endif\n#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)\nin vec3 surfaceAlbedo,\n#endif\n#ifdef SS_REFRACTION\nin vec3 vPositionW,\nin vec3 viewDirectionW,\nin mat4 view,\nin vec4 vRefractionInfos,\nin mat4 refractionMatrix,\nin vec4 vRefractionMicrosurfaceInfos,\nin vec4 vLightingIntensity,\n#ifdef SS_LINKREFRACTIONTOTRANSPARENCY\nin float alpha,\n#endif\n#ifdef SS_LODINREFRACTIONALPHA\nin float NdotVUnclamped,\n#endif\n#ifdef SS_LINEARSPECULARREFRACTION\nin float roughness,\n#endif\nin float alphaG,\n#ifdef SS_REFRACTIONMAP_3D\nin samplerCube refractionSampler,\n#ifndef LODBASEDMICROSFURACE\nin samplerCube refractionSamplerLow,\nin samplerCube refractionSamplerHigh,\n#endif\n#else\nin sampler2D refractionSampler,\n#ifndef LODBASEDMICROSFURACE\nin sampler2D refractionSamplerLow,\nin sampler2D refractionSamplerHigh,\n#endif\n#endif\n#ifdef ANISOTROPIC\nin anisotropicOutParams anisotropicOut,\n#endif\n#ifdef REALTIME_FILTERING\nin vec2 vRefractionFilteringInfo,\n#endif\n#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC\nin vec3 refractionPosition,\nin vec3 refractionSize,\n#endif\n#endif\n#ifdef SS_TRANSLUCENCY\nin vec3 vDiffusionDistance,\n#endif\nout subSurfaceOutParams outParams\n)\n{\noutParams.specularEnvironmentReflectance=specularEnvironmentReflectance;\n#ifdef SS_REFRACTION\nfloat refractionIntensity=vSubSurfaceIntensity.x;\n#ifdef SS_LINKREFRACTIONTOTRANSPARENCY\nrefractionIntensity*=(1.0-alpha);\noutParams.alpha=1.0;\n#endif\n#endif\n#ifdef SS_TRANSLUCENCY\nfloat translucencyIntensity=vSubSurfaceIntensity.y;\n#endif\n#ifdef SS_THICKNESSANDMASK_TEXTURE\n#if defined(SS_USE_GLTF_TEXTURES)\nfloat thickness=thicknessMap.g*vThicknessParam.y+vThicknessParam.x;\n#else\nfloat thickness=thicknessMap.r*vThicknessParam.y+vThicknessParam.x;\n#endif\n#if DEBUGMODE>0\noutParams.thicknessMap=thicknessMap;\n#endif\n#ifdef SS_MASK_FROM_THICKNESS_TEXTURE\n#if defined(SS_REFRACTION) && defined(SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE)\n#if defined(SS_USE_GLTF_TEXTURES)\nrefractionIntensity*=thicknessMap.r;\n#else\nrefractionIntensity*=thicknessMap.g;\n#endif\n#endif\n#if defined(SS_TRANSLUCENCY) && defined(SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE)\ntranslucencyIntensity*=thicknessMap.b;\n#endif\n#endif\n#else\nfloat thickness=vThicknessParam.y;\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\n#ifdef SS_USE_GLTF_TEXTURES\nrefractionIntensity*=refractionIntensityMap.r;\n#else\nrefractionIntensity*=refractionIntensityMap.g;\n#endif\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\ntranslucencyIntensity*=translucencyIntensityMap.b;\n#endif\n#ifdef SS_TRANSLUCENCY\nthickness=maxEps(thickness);\nvec3 transmittance=transmittanceBRDF_Burley(vTintColor.rgb,vDiffusionDistance,thickness);\ntransmittance*=translucencyIntensity;\noutParams.transmittance=transmittance;\noutParams.translucencyIntensity=translucencyIntensity;\n#endif\n#ifdef SS_REFRACTION\nvec4 environmentRefraction=vec4(0.,0.,0.,0.);\n#ifdef ANISOTROPIC\nvec3 refractionVector=refract(-viewDirectionW,anisotropicOut.anisotropicNormal,vRefractionInfos.y);\n#else\nvec3 refractionVector=refract(-viewDirectionW,normalW,vRefractionInfos.y);\n#endif\n#ifdef SS_REFRACTIONMAP_OPPOSITEZ\nrefractionVector.z*=-1.0;\n#endif\n#ifdef SS_REFRACTIONMAP_3D\n#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC\nrefractionVector=parallaxCorrectNormal(vPositionW,refractionVector,refractionSize,refractionPosition);\n#endif\nrefractionVector.y=refractionVector.y*vRefractionInfos.w;\nvec3 refractionCoords=refractionVector;\nrefractionCoords=vec3(refractionMatrix*vec4(refractionCoords,0));\n#else\n#ifdef SS_USE_THICKNESS_AS_DEPTH\nvec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*thickness,1.0)));\n#else\nvec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));\n#endif\nvec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;\nrefractionCoords.y=1.0-refractionCoords.y;\n#endif\n#ifdef SS_HAS_THICKNESS\nfloat ior=vRefractionInfos.y;\n#else\nfloat ior=vRefractionMicrosurfaceInfos.w;\n#endif\n#ifdef SS_LODINREFRACTIONALPHA\nfloat refractionAlphaG=alphaG;\nrefractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));\nfloat refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG,NdotVUnclamped);\n#elif defined(SS_LINEARSPECULARREFRACTION)\nfloat refractionRoughness=alphaG;\nrefractionRoughness=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));\nfloat refractionLOD=getLinearLodFromRoughness(vRefractionMicrosurfaceInfos.x,refractionRoughness);\n#else\nfloat refractionAlphaG=alphaG;\nrefractionAlphaG=mix(alphaG,0.0,clamp(ior*3.0-2.0,0.0,1.0));\nfloat refractionLOD=getLodFromAlphaG(vRefractionMicrosurfaceInfos.x,refractionAlphaG);\n#endif\n#ifdef LODBASEDMICROSFURACE\nrefractionLOD=refractionLOD*vRefractionMicrosurfaceInfos.y+vRefractionMicrosurfaceInfos.z;\n#ifdef SS_LODINREFRACTIONALPHA\nfloat automaticRefractionLOD=UNPACK_LOD(sampleRefraction(refractionSampler,refractionCoords).a);\nfloat requestedRefractionLOD=max(automaticRefractionLOD,refractionLOD);\n#else\nfloat requestedRefractionLOD=refractionLOD;\n#endif\n#ifdef REALTIME_FILTERING\nenvironmentRefraction=vec4(radiance(alphaG,refractionSampler,refractionCoords,vRefractionFilteringInfo),1.0);\n#else\nenvironmentRefraction=sampleRefractionLod(refractionSampler,refractionCoords,requestedRefractionLOD);\n#endif\n#else\nfloat lodRefractionNormalized=saturate(refractionLOD/log2(vRefractionMicrosurfaceInfos.x));\nfloat lodRefractionNormalizedDoubled=lodRefractionNormalized*2.0;\nvec4 environmentRefractionMid=sampleRefraction(refractionSampler,refractionCoords);\nif (lodRefractionNormalizedDoubled<1.0){\nenvironmentRefraction=mix(\nsampleRefraction(refractionSamplerHigh,refractionCoords),\nenvironmentRefractionMid,\nlodRefractionNormalizedDoubled\n);\n} else {\nenvironmentRefraction=mix(\nenvironmentRefractionMid,\nsampleRefraction(refractionSamplerLow,refractionCoords),\nlodRefractionNormalizedDoubled-1.0\n);\n}\n#endif\n#ifdef SS_RGBDREFRACTION\nenvironmentRefraction.rgb=fromRGBD(environmentRefraction);\n#endif\n#ifdef SS_GAMMAREFRACTION\nenvironmentRefraction.rgb=toLinearSpace(environmentRefraction.rgb);\n#endif\nenvironmentRefraction.rgb*=vRefractionInfos.x;\n#endif\n#ifdef SS_REFRACTION\nvec3 refractionTransmittance=vec3(refractionIntensity);\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nvec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);\nrefractionTransmittance*=cocaLambert(volumeAlbedo,thickness);\n#elif defined(SS_LINKREFRACTIONTOTRANSPARENCY)\nfloat maxChannel=max(max(surfaceAlbedo.r,surfaceAlbedo.g),surfaceAlbedo.b);\nvec3 volumeAlbedo=saturate(maxChannel*surfaceAlbedo);\nenvironmentRefraction.rgb*=volumeAlbedo;\n#else\nvec3 volumeAlbedo=computeColorAtDistanceInMedia(vTintColor.rgb,vTintColor.w);\nrefractionTransmittance*=cocaLambert(volumeAlbedo,vThicknessParam.y);\n#endif\n#ifdef SS_ALBEDOFORREFRACTIONTINT\nenvironmentRefraction.rgb*=surfaceAlbedo.rgb;\n#endif\noutParams.surfaceAlbedo=surfaceAlbedo*(1.-refractionIntensity);\n#ifdef REFLECTION\noutParams.refractionFactorForIrradiance=(1.-refractionIntensity);\n#endif\n#ifdef UNUSED_MULTIPLEBOUNCES\nvec3 bounceSpecularEnvironmentReflectance=(2.0*specularEnvironmentReflectance)/(1.0+specularEnvironmentReflectance);\noutParams.specularEnvironmentReflectance=mix(bounceSpecularEnvironmentReflectance,specularEnvironmentReflectance,refractionIntensity);\n#endif\nrefractionTransmittance*=1.0-outParams.specularEnvironmentReflectance;\n#if DEBUGMODE>0\noutParams.refractionTransmittance=refractionTransmittance;\n#endif\noutParams.finalRefraction=environmentRefraction.rgb*refractionTransmittance*vLightingIntensity.z;\n#if DEBUGMODE>0\noutParams.environmentRefraction=environmentRefraction;\n#endif\n#endif\n#if defined(REFLECTION) && defined(SS_TRANSLUCENCY)\n#if defined(NORMAL) && defined(USESPHERICALINVERTEX) || !defined(USESPHERICALFROMREFLECTIONMAP)\nvec3 irradianceVector=vec3(reflectionMatrix*vec4(normalW,0)).xyz;\n#ifdef REFLECTIONMAP_OPPOSITEZ\nirradianceVector.z*=-1.0;\n#endif\n#ifdef INVERTCUBICMAP\nirradianceVector.y*=-1.0;\n#endif\n#else\nvec3 irradianceVector=irradianceVector_;\n#endif\n#if defined(USESPHERICALFROMREFLECTIONMAP)\n#if defined(REALTIME_FILTERING)\nvec3 refractionIrradiance=irradiance(reflectionSampler,-irradianceVector,vReflectionFilteringInfo);\n#else\nvec3 refractionIrradiance=computeEnvironmentIrradiance(-irradianceVector);\n#endif\n#elif defined(USEIRRADIANCEMAP)\n#ifdef REFLECTIONMAP_3D\nvec3 irradianceCoords=irradianceVector;\n#else\nvec2 irradianceCoords=irradianceVector.xy;\n#ifdef REFLECTIONMAP_PROJECTION\nirradianceCoords/=irradianceVector.z;\n#endif\nirradianceCoords.y=1.0-irradianceCoords.y;\n#endif\nvec4 refractionIrradiance=sampleReflection(irradianceSampler,-irradianceCoords);\n#ifdef RGBDREFLECTION\nrefractionIrradiance.rgb=fromRGBD(refractionIrradiance);\n#endif\n#ifdef GAMMAREFLECTION\nrefractionIrradiance.rgb=toLinearSpace(refractionIrradiance.rgb);\n#endif\n#else\nvec4 refractionIrradiance=vec4(0.);\n#endif\nrefractionIrradiance.rgb*=transmittance;\n#ifdef SS_ALBEDOFORTRANSLUCENCYTINT\nrefractionIrradiance.rgb*=surfaceAlbedo.rgb;\n#endif\noutParams.refractionIrradiance=refractionIrradiance.rgb;\n#endif\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$o] = shader$o;

// Do not edit.
var name$p = "pbrBlockNormalGeometric";
var shader$p = "vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;\n#endif\nvec3 geometricNormalW=normalW;\n#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\ngeometricNormalW=gl_FrontFacing ? geometricNormalW : -geometricNormalW;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$p] = shader$p;

// Do not edit.
var name$q = "pbrBlockNormalFinal";
var shader$q = "#if defined(FORCENORMALFORWARD) && defined(NORMAL)\nvec3 faceNormal=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;\n#if defined(TWOSIDEDLIGHTING)\nfaceNormal=gl_FrontFacing ? faceNormal : -faceNormal;\n#endif\nnormalW*=sign(dot(normalW,faceNormal));\n#endif\n#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\nnormalW=gl_FrontFacing ? normalW : -normalW;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$q] = shader$q;

// Do not edit.
var name$r = "pbrBlockLightmapInit";
var shader$r = "#ifdef LIGHTMAP\nvec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);\n#ifdef RGBDLIGHTMAP\nlightmapColor.rgb=fromRGBD(lightmapColor);\n#endif\n#ifdef GAMMALIGHTMAP\nlightmapColor.rgb=toLinearSpace(lightmapColor.rgb);\n#endif\nlightmapColor.rgb*=vLightmapInfos.y;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$r] = shader$r;

// Do not edit.
var name$s = "pbrBlockGeometryInfo";
var shader$s = "float NdotVUnclamped=dot(normalW,viewDirectionW);\nfloat NdotV=absEps(NdotVUnclamped);\nfloat alphaG=convertRoughnessToAverageSlope(roughness);\nvec2 AARoughnessFactors=getAARoughnessFactors(normalW.xyz);\n#ifdef SPECULARAA\nalphaG+=AARoughnessFactors.y;\n#endif\n#if defined(ENVIRONMENTBRDF)\nvec3 environmentBrdf=getBRDFLookup(NdotV,roughness);\n#endif\n#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\n#ifdef RADIANCEOCCLUSION\n#ifdef AMBIENTINGRAYSCALE\nfloat ambientMonochrome=aoOut.ambientOcclusionColor.r;\n#else\nfloat ambientMonochrome=getLuminance(aoOut.ambientOcclusionColor);\n#endif\nfloat seo=environmentRadianceOcclusion(ambientMonochrome,NdotVUnclamped);\n#endif\n#ifdef HORIZONOCCLUSION\n#ifdef BUMP\n#ifdef REFLECTIONMAP_3D\nfloat eho=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);\n#endif\n#endif\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$s] = shader$s;

// Do not edit.
var name$t = "pbrBlockReflectance0";
var shader$t = "float reflectance=max(max(reflectivityOut.surfaceReflectivityColor.r,reflectivityOut.surfaceReflectivityColor.g),reflectivityOut.surfaceReflectivityColor.b);\nvec3 specularEnvironmentR0=reflectivityOut.surfaceReflectivityColor.rgb;\n#ifdef METALLICWORKFLOW\nvec3 specularEnvironmentR90=vec3(metallicReflectanceFactors.a);\n#else \nvec3 specularEnvironmentR90=vec3(1.0,1.0,1.0);\n#endif\n#ifdef ALPHAFRESNEL\nfloat reflectance90=fresnelGrazingReflectance(reflectance);\nspecularEnvironmentR90=specularEnvironmentR90*reflectance90;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$t] = shader$t;

// Do not edit.
var name$u = "pbrBlockReflectance";
var shader$u = "#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\nvec3 specularEnvironmentReflectance=getReflectanceFromBRDFLookup(clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,environmentBrdf);\n#ifdef RADIANCEOCCLUSION\nspecularEnvironmentReflectance*=seo;\n#endif\n#ifdef HORIZONOCCLUSION\n#ifdef BUMP\n#ifdef REFLECTIONMAP_3D\nspecularEnvironmentReflectance*=eho;\n#endif\n#endif\n#endif\n#else\nvec3 specularEnvironmentReflectance=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,sqrt(microSurface));\n#endif\n#ifdef CLEARCOAT\nspecularEnvironmentReflectance*=clearcoatOut.conservationFactor;\n#if defined(CLEARCOAT_TINT)\nspecularEnvironmentReflectance*=clearcoatOut.absorption;\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$u] = shader$u;

// Do not edit.
var name$v = "pbrBlockDirectLighting";
var shader$v = "vec3 diffuseBase=vec3(0.,0.,0.);\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#ifdef CLEARCOAT\nvec3 clearCoatBase=vec3(0.,0.,0.);\n#endif\n#ifdef SHEEN\nvec3 sheenBase=vec3(0.,0.,0.);\n#endif\npreLightingInfo preInfo;\nlightingInfo info;\nfloat shadow=1.; \n#if defined(CLEARCOAT) && defined(CLEARCOAT_TINT)\nvec3 absorption=vec3(0.);\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$v] = shader$v;

// Do not edit.
var name$w = "pbrBlockFinalLitComponents";
var shader$w = "#if defined(ENVIRONMENTBRDF)\n#ifdef MS_BRDF_ENERGY_CONSERVATION\nvec3 energyConservationFactor=getEnergyConservationFactor(clearcoatOut.specularEnvironmentR0,environmentBrdf);\n#endif\n#endif\n#ifndef METALLICWORKFLOW\n#ifdef SPECULAR_GLOSSINESS_ENERGY_CONSERVATION\nsurfaceAlbedo.rgb=(1.-reflectance)*surfaceAlbedo.rgb;\n#endif\n#endif\n#if defined(SHEEN) && defined(SHEEN_ALBEDOSCALING) && defined(ENVIRONMENTBRDF)\nsurfaceAlbedo.rgb=sheenOut.sheenAlbedoScaling*surfaceAlbedo.rgb;\n#endif\n#ifdef REFLECTION\nvec3 finalIrradiance=reflectionOut.environmentIrradiance;\n#if defined(CLEARCOAT)\nfinalIrradiance*=clearcoatOut.conservationFactor;\n#if defined(CLEARCOAT_TINT)\nfinalIrradiance*=clearcoatOut.absorption;\n#endif\n#endif\n#if defined(SS_REFRACTION)\nfinalIrradiance*=subSurfaceOut.refractionFactorForIrradiance;\n#endif\n#if defined(SS_TRANSLUCENCY)\nfinalIrradiance*=(1.0-subSurfaceOut.translucencyIntensity);\nfinalIrradiance+=subSurfaceOut.refractionIrradiance;\n#endif\nfinalIrradiance*=surfaceAlbedo.rgb;\nfinalIrradiance*=vLightingIntensity.z;\nfinalIrradiance*=aoOut.ambientOcclusionColor;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase;\nfinalSpecular=max(finalSpecular,0.0);\nvec3 finalSpecularScaled=finalSpecular*vLightingIntensity.x*vLightingIntensity.w;\n#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)\nfinalSpecularScaled*=energyConservationFactor;\n#endif\n#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)\nfinalSpecularScaled*=sheenOut.sheenAlbedoScaling;\n#endif\n#endif\n#ifdef REFLECTION\nvec3 finalRadiance=reflectionOut.environmentRadiance.rgb;\nfinalRadiance*=subSurfaceOut.specularEnvironmentReflectance;\nvec3 finalRadianceScaled=finalRadiance*vLightingIntensity.z;\n#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)\nfinalRadianceScaled*=energyConservationFactor;\n#endif\n#if defined(SHEEN) && defined(ENVIRONMENTBRDF) && defined(SHEEN_ALBEDOSCALING)\nfinalRadianceScaled*=sheenOut.sheenAlbedoScaling;\n#endif\n#endif\n#ifdef SHEEN\nvec3 finalSheen=sheenBase*sheenOut.sheenColor;\nfinalSheen=max(finalSheen,0.0);\nvec3 finalSheenScaled=finalSheen*vLightingIntensity.x*vLightingIntensity.w;\n#if defined(CLEARCOAT) && defined(REFLECTION) && defined(ENVIRONMENTBRDF)\nsheenOut.finalSheenRadianceScaled*=clearcoatOut.conservationFactor;\n#if defined(CLEARCOAT_TINT)\nsheenOut.finalSheenRadianceScaled*=clearcoatOut.absorption;\n#endif\n#endif\n#endif\n#ifdef CLEARCOAT\nvec3 finalClearCoat=clearCoatBase;\nfinalClearCoat=max(finalClearCoat,0.0);\nvec3 finalClearCoatScaled=finalClearCoat*vLightingIntensity.x*vLightingIntensity.w;\n#if defined(ENVIRONMENTBRDF) && defined(MS_BRDF_ENERGY_CONSERVATION)\nfinalClearCoatScaled*=clearcoatOut.energyConservationFactorClearCoat;\n#endif\n#ifdef SS_REFRACTION\nsubSurfaceOut.finalRefraction*=clearcoatOut.conservationFactor;\n#ifdef CLEARCOAT_TINT\nsubSurfaceOut.finalRefraction*=clearcoatOut.absorption;\n#endif\n#endif\n#endif\n#ifdef ALPHABLEND\nfloat luminanceOverAlpha=0.0;\n#if defined(REFLECTION) && defined(RADIANCEOVERALPHA)\nluminanceOverAlpha+=getLuminance(finalRadianceScaled);\n#if defined(CLEARCOAT)\nluminanceOverAlpha+=getLuminance(clearcoatOut.finalClearCoatRadianceScaled);\n#endif\n#endif\n#if defined(SPECULARTERM) && defined(SPECULAROVERALPHA)\nluminanceOverAlpha+=getLuminance(finalSpecularScaled);\n#endif\n#if defined(CLEARCOAT) && defined(CLEARCOATOVERALPHA)\nluminanceOverAlpha+=getLuminance(finalClearCoatScaled);\n#endif\n#if defined(RADIANCEOVERALPHA) || defined(SPECULAROVERALPHA) || defined(CLEARCOATOVERALPHA)\nalpha=saturate(alpha+luminanceOverAlpha*luminanceOverAlpha);\n#endif\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$w] = shader$w;

// Do not edit.
var name$x = "pbrBlockFinalUnlitComponents";
var shader$x = "vec3 finalDiffuse=diffuseBase;\nfinalDiffuse*=surfaceAlbedo.rgb;\nfinalDiffuse=max(finalDiffuse,0.0);\nfinalDiffuse*=vLightingIntensity.x;\nvec3 finalAmbient=vAmbientColor;\nfinalAmbient*=surfaceAlbedo.rgb;\nvec3 finalEmissive=vEmissiveColor;\n#ifdef EMISSIVE\nvec3 emissiveColorTex=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb;\n#ifdef GAMMAEMISSIVE\nfinalEmissive*=toLinearSpace(emissiveColorTex.rgb);\n#else\nfinalEmissive*=emissiveColorTex.rgb;\n#endif\nfinalEmissive*= vEmissiveInfos.y;\n#endif\nfinalEmissive*=vLightingIntensity.y;\n#ifdef AMBIENT\nvec3 ambientOcclusionForDirectDiffuse=mix(vec3(1.),aoOut.ambientOcclusionColor,vAmbientInfos.w);\n#else\nvec3 ambientOcclusionForDirectDiffuse=aoOut.ambientOcclusionColor;\n#endif\nfinalAmbient*=aoOut.ambientOcclusionColor;\nfinalDiffuse*=ambientOcclusionForDirectDiffuse;\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$x] = shader$x;

// Do not edit.
var name$y = "pbrBlockFinalColorComposition";
var shader$y = "vec4 finalColor=vec4(\nfinalAmbient +\nfinalDiffuse +\n#ifndef UNLIT\n#ifdef REFLECTION\nfinalIrradiance +\n#endif\n#ifdef SPECULARTERM\nfinalSpecularScaled +\n#endif\n#ifdef SHEEN\nfinalSheenScaled +\n#endif\n#ifdef CLEARCOAT\nfinalClearCoatScaled +\n#endif\n#ifdef REFLECTION\nfinalRadianceScaled +\n#if defined(SHEEN) && defined(ENVIRONMENTBRDF)\nsheenOut.finalSheenRadianceScaled +\n#endif\n#ifdef CLEARCOAT\nclearcoatOut.finalClearCoatRadianceScaled +\n#endif\n#endif\n#ifdef SS_REFRACTION\nsubSurfaceOut.finalRefraction +\n#endif\n#endif\nfinalEmissive,\nalpha);\n#ifdef LIGHTMAP\n#ifndef LIGHTMAPEXCLUDED\n#ifdef USELIGHTMAPASSHADOWMAP\nfinalColor.rgb*=lightmapColor.rgb;\n#else\nfinalColor.rgb+=lightmapColor.rgb;\n#endif\n#endif\n#endif\n#define CUSTOM_FRAGMENT_BEFORE_FOG\nfinalColor=max(finalColor,0.0);\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$y] = shader$y;

// Do not edit.
var name$z = "pbrBlockImageProcessing";
var shader$z = "#if defined(IMAGEPROCESSINGPOSTPROCESS) || defined(SS_SCATTERING)\n#if !defined(SKIPFINALCOLORCLAMP)\nfinalColor.rgb=clamp(finalColor.rgb,0.,30.0);\n#endif\n#else\nfinalColor=applyImageProcessing(finalColor);\n#endif\nfinalColor.a*=visibility;\n#ifdef PREMULTIPLYALPHA\nfinalColor.rgb*=finalColor.a;\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$z] = shader$z;

// Do not edit.
var name$A = "pbrDebug";
var shader$A = "#if DEBUGMODE>0\nif (vClipSpacePosition.x/vClipSpacePosition.w>=vDebugMode.x) {\n#if DEBUGMODE==1\ngl_FragColor.rgb=vPositionW.rgb;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==2 && defined(NORMAL)\ngl_FragColor.rgb=vNormalW.rgb;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==3 && defined(BUMP) || DEBUGMODE==3 && defined(PARALLAX) || DEBUGMODE==3 && defined(ANISOTROPIC)\ngl_FragColor.rgb=TBN[0];\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==4 && defined(BUMP) || DEBUGMODE==4 && defined(PARALLAX) || DEBUGMODE==4 && defined(ANISOTROPIC)\ngl_FragColor.rgb=TBN[1];\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==5\ngl_FragColor.rgb=normalW;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==6 && defined(MAINUV1)\ngl_FragColor.rgb=vec3(vMainUV1,0.0);\n#elif DEBUGMODE==7 && defined(MAINUV2)\ngl_FragColor.rgb=vec3(vMainUV2,0.0);\n#elif DEBUGMODE==8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)\ngl_FragColor.rgb=clearcoatOut.TBNClearCoat[0];\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)\ngl_FragColor.rgb=clearcoatOut.TBNClearCoat[1];\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==10 && defined(CLEARCOAT)\ngl_FragColor.rgb=clearcoatOut.clearCoatNormalW;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==11 && defined(ANISOTROPIC)\ngl_FragColor.rgb=anisotropicOut.anisotropicNormal;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==12 && defined(ANISOTROPIC)\ngl_FragColor.rgb=anisotropicOut.anisotropicTangent;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==13 && defined(ANISOTROPIC)\ngl_FragColor.rgb=anisotropicOut.anisotropicBitangent;\n#define DEBUGMODE_NORMALIZE\n#elif DEBUGMODE==20 && defined(ALBEDO)\ngl_FragColor.rgb=albedoTexture.rgb;\n#elif DEBUGMODE==21 && defined(AMBIENT)\ngl_FragColor.rgb=aoOut.ambientOcclusionColorMap.rgb;\n#elif DEBUGMODE==22 && defined(OPACITY)\ngl_FragColor.rgb=opacityMap.rgb;\n#elif DEBUGMODE==23 && defined(EMISSIVE)\ngl_FragColor.rgb=emissiveColorTex.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==24 && defined(LIGHTMAP)\ngl_FragColor.rgb=lightmapColor.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)\ngl_FragColor.rgb=reflectivityOut.surfaceMetallicColorMap.rgb;\n#elif DEBUGMODE==26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)\ngl_FragColor.rgb=reflectivityOut.surfaceReflectivityColorMap.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)\ngl_FragColor.rgb=vec3(clearcoatOut.clearCoatMapData.rg,0.0);\n#elif DEBUGMODE==28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)\ngl_FragColor.rgb=clearcoatOut.clearCoatTintMapData.rgb;\n#elif DEBUGMODE==29 && defined(SHEEN) && defined(SHEEN_TEXTURE)\ngl_FragColor.rgb=sheenOut.sheenMapData.rgb;\n#elif DEBUGMODE==30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)\ngl_FragColor.rgb=anisotropicOut.anisotropyMapData.rgb;\n#elif DEBUGMODE==31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)\ngl_FragColor.rgb=subSurfaceOut.thicknessMap.rgb;\n#elif DEBUGMODE==40 && defined(SS_REFRACTION)\ngl_FragColor.rgb=subSurfaceOut.environmentRefraction.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==41 && defined(REFLECTION)\ngl_FragColor.rgb=reflectionOut.environmentRadiance.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==42 && defined(CLEARCOAT) && defined(REFLECTION)\ngl_FragColor.rgb=clearcoatOut.environmentClearCoatRadiance.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==50\ngl_FragColor.rgb=diffuseBase.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==51 && defined(SPECULARTERM)\ngl_FragColor.rgb=specularBase.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==52 && defined(CLEARCOAT)\ngl_FragColor.rgb=clearCoatBase.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==53 && defined(SHEEN)\ngl_FragColor.rgb=sheenBase.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==54 && defined(REFLECTION)\ngl_FragColor.rgb=reflectionOut.environmentIrradiance.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==60\ngl_FragColor.rgb=surfaceAlbedo.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==61\ngl_FragColor.rgb=clearcoatOut.specularEnvironmentR0;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==62 && defined(METALLICWORKFLOW)\ngl_FragColor.rgb=vec3(reflectivityOut.metallicRoughness.r);\n#elif DEBUGMODE==71 && defined(METALLICWORKFLOW)\ngl_FragColor.rgb=reflectivityOut.metallicF0;\n#elif DEBUGMODE==63\ngl_FragColor.rgb=vec3(roughness);\n#elif DEBUGMODE==64\ngl_FragColor.rgb=vec3(alphaG);\n#elif DEBUGMODE==65\ngl_FragColor.rgb=vec3(NdotV);\n#elif DEBUGMODE==66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)\ngl_FragColor.rgb=clearcoatOut.clearCoatColor.rgb;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==67 && defined(CLEARCOAT)\ngl_FragColor.rgb=vec3(clearcoatOut.clearCoatRoughness);\n#elif DEBUGMODE==68 && defined(CLEARCOAT)\ngl_FragColor.rgb=vec3(clearcoatOut.clearCoatNdotV);\n#elif DEBUGMODE==69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)\ngl_FragColor.rgb=subSurfaceOut.transmittance;\n#elif DEBUGMODE==70 && defined(SUBSURFACE) && defined(SS_REFRACTION)\ngl_FragColor.rgb=subSurfaceOut.refractionTransmittance;\n#elif DEBUGMODE==80 && defined(RADIANCEOCCLUSION)\ngl_FragColor.rgb=vec3(seo);\n#elif DEBUGMODE==81 && defined(HORIZONOCCLUSION)\ngl_FragColor.rgb=vec3(eho);\n#elif DEBUGMODE==82 && defined(MS_BRDF_ENERGY_CONSERVATION)\ngl_FragColor.rgb=vec3(energyConservationFactor);\n#elif DEBUGMODE==83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\ngl_FragColor.rgb=specularEnvironmentReflectance;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\ngl_FragColor.rgb=clearcoatOut.clearCoatEnvironmentReflectance;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==85 && defined(SHEEN) && defined(REFLECTION)\ngl_FragColor.rgb=sheenOut.sheenEnvironmentReflectance;\n#define DEBUGMODE_GAMMA\n#elif DEBUGMODE==86 && defined(ALPHABLEND)\ngl_FragColor.rgb=vec3(luminanceOverAlpha);\n#elif DEBUGMODE==87\ngl_FragColor.rgb=vec3(alpha);\n#endif\ngl_FragColor.rgb*=vDebugMode.y;\n#ifdef DEBUGMODE_NORMALIZE\ngl_FragColor.rgb=normalize(gl_FragColor.rgb)*0.5+0.5;\n#endif\n#ifdef DEBUGMODE_GAMMA\ngl_FragColor.rgb=toGammaSpace(gl_FragColor.rgb);\n#endif\ngl_FragColor.a=1.0;\n#ifdef PREPASS\ngl_FragData[0]=toLinearSpace(gl_FragColor); \ngl_FragData[1]=vec4(0.,0.,0.,0.); \n#endif\nreturn;\n}\n#endif\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$A] = shader$A;

// Do not edit.
var name$B = "pbrPixelShader";
var shader$B = "#if defined(BUMP) || !defined(NORMAL) || defined(FORCENORMALFORWARD) || defined(SPECULARAA) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)\n#extension GL_OES_standard_derivatives : enable\n#endif\n#ifdef LODBASEDMICROSFURACE\n#extension GL_EXT_shader_texture_lod : enable\n#endif\n#define CUSTOM_FRAGMENT_BEGIN\n#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\n#include<prePassDeclaration>[SCENE_MRT_COUNT]\nprecision highp float;\n#include<oitDeclaration>\n#ifndef FROMLINEARSPACE\n#define FROMLINEARSPACE\n#endif\n#include<__decl__pbrFragment>\n#include<pbrFragmentExtraDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<pbrFragmentSamplersDeclaration>\n#include<imageProcessingDeclaration>\n#include<clipPlaneFragmentDeclaration>\n#include<logDepthDeclaration>\n#include<fogFragmentDeclaration>\n#include<helperFunctions>\n#include<subSurfaceScatteringFunctions>\n#include<importanceSampling>\n#include<pbrHelperFunctions>\n#include<imageProcessingFunctions>\n#include<shadowsFragmentFunctions>\n#include<harmonicsFunctions>\n#include<pbrDirectLightingSetupFunctions>\n#include<pbrDirectLightingFalloffFunctions>\n#include<pbrBRDFFunctions>\n#include<hdrFilteringFunctions>\n#include<pbrDirectLightingFunctions>\n#include<pbrIBLFunctions>\n#include<bumpFragmentMainFunctions>\n#include<bumpFragmentFunctions>\n#ifdef REFLECTION\n#include<reflectionFunction>\n#endif\n#define CUSTOM_FRAGMENT_DEFINITIONS\n#include<pbrBlockAlbedoOpacity>\n#include<pbrBlockReflectivity>\n#include<pbrBlockAmbientOcclusion>\n#include<pbrBlockAlphaFresnel>\n#include<pbrBlockAnisotropic>\n#include<pbrBlockReflection>\n#include<pbrBlockSheen>\n#include<pbrBlockClearcoat>\n#include<pbrBlockIridescence>\n#include<pbrBlockSubSurface>\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\n#include<oitFragment>\n#include<clipPlaneFragment>\n#include<pbrBlockNormalGeometric>\n#include<bumpFragment>\n#include<pbrBlockNormalFinal>\nalbedoOpacityOutParams albedoOpacityOut;\n#ifdef ALBEDO\nvec4 albedoTexture=texture2D(albedoSampler,vAlbedoUV+uvOffset);\n#endif\n#ifdef OPACITY\nvec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);\n#endif\nalbedoOpacityBlock(\nvAlbedoColor,\n#ifdef ALBEDO\nalbedoTexture,\nvAlbedoInfos,\n#endif\n#ifdef OPACITY\nopacityMap,\nvOpacityInfos,\n#endif\n#ifdef DETAIL\ndetailColor,\nvDetailInfos,\n#endif\nalbedoOpacityOut\n);\nvec3 surfaceAlbedo=albedoOpacityOut.surfaceAlbedo;\nfloat alpha=albedoOpacityOut.alpha;\n#define CUSTOM_FRAGMENT_UPDATE_ALPHA\n#include<depthPrePass>\n#define CUSTOM_FRAGMENT_BEFORE_LIGHTS\nambientOcclusionOutParams aoOut;\n#ifdef AMBIENT\nvec3 ambientOcclusionColorMap=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb;\n#endif\nambientOcclusionBlock(\n#ifdef AMBIENT\nambientOcclusionColorMap,\nvAmbientInfos,\n#endif\naoOut\n);\n#include<pbrBlockLightmapInit>\n#ifdef UNLIT\nvec3 diffuseBase=vec3(1.,1.,1.);\n#else\nvec3 baseColor=surfaceAlbedo;\nreflectivityOutParams reflectivityOut;\n#if defined(REFLECTIVITY)\nvec4 surfaceMetallicOrReflectivityColorMap=texture2D(reflectivitySampler,vReflectivityUV+uvOffset);\nvec4 baseReflectivity=surfaceMetallicOrReflectivityColorMap;\n#ifndef METALLICWORKFLOW\n#ifdef REFLECTIVITY_GAMMA\nsurfaceMetallicOrReflectivityColorMap=toLinearSpace(surfaceMetallicOrReflectivityColorMap);\n#endif\nsurfaceMetallicOrReflectivityColorMap.rgb*=vReflectivityInfos.y;\n#endif\n#endif\n#if defined(MICROSURFACEMAP)\nvec4 microSurfaceTexel=texture2D(microSurfaceSampler,vMicroSurfaceSamplerUV+uvOffset)*vMicroSurfaceSamplerInfos.y;\n#endif\n#ifdef METALLICWORKFLOW\nvec4 metallicReflectanceFactors=vMetallicReflectanceFactors;\n#ifdef REFLECTANCE\nvec4 reflectanceFactorsMap=texture2D(reflectanceSampler,vReflectanceUV+uvOffset);\n#ifdef REFLECTANCE_GAMMA\nreflectanceFactorsMap=toLinearSpace(reflectanceFactorsMap);\n#endif\nmetallicReflectanceFactors.rgb*=reflectanceFactorsMap.rgb;\n#endif\n#ifdef METALLIC_REFLECTANCE\nvec4 metallicReflectanceFactorsMap=texture2D(metallicReflectanceSampler,vMetallicReflectanceUV+uvOffset);\n#ifdef METALLIC_REFLECTANCE_GAMMA\nmetallicReflectanceFactorsMap=toLinearSpace(metallicReflectanceFactorsMap);\n#endif\n#ifndef METALLIC_REFLECTANCE_USE_ALPHA_ONLY\nmetallicReflectanceFactors.rgb*=metallicReflectanceFactorsMap.rgb;\n#endif\nmetallicReflectanceFactors*=metallicReflectanceFactorsMap.a;\n#endif\n#endif\nreflectivityBlock(\nvReflectivityColor,\n#ifdef METALLICWORKFLOW\nsurfaceAlbedo,\nmetallicReflectanceFactors,\n#endif\n#ifdef REFLECTIVITY\nvReflectivityInfos,\nsurfaceMetallicOrReflectivityColorMap,\n#endif\n#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)\naoOut.ambientOcclusionColor,\n#endif\n#ifdef MICROSURFACEMAP\nmicroSurfaceTexel,\n#endif\n#ifdef DETAIL\ndetailColor,\nvDetailInfos,\n#endif\nreflectivityOut\n);\nfloat microSurface=reflectivityOut.microSurface;\nfloat roughness=reflectivityOut.roughness;\n#ifdef METALLICWORKFLOW\nsurfaceAlbedo=reflectivityOut.surfaceAlbedo;\n#endif\n#if defined(METALLICWORKFLOW) && defined(REFLECTIVITY) && defined(AOSTOREINMETALMAPRED)\naoOut.ambientOcclusionColor=reflectivityOut.ambientOcclusionColor;\n#endif\n#ifdef ALPHAFRESNEL\n#if defined(ALPHATEST) || defined(ALPHABLEND)\nalphaFresnelOutParams alphaFresnelOut;\nalphaFresnelBlock(\nnormalW,\nviewDirectionW,\nalpha,\nmicroSurface,\nalphaFresnelOut\n);\nalpha=alphaFresnelOut.alpha;\n#endif\n#endif\n#include<pbrBlockGeometryInfo>\n#ifdef ANISOTROPIC\nanisotropicOutParams anisotropicOut;\n#ifdef ANISOTROPIC_TEXTURE\nvec3 anisotropyMapData=texture2D(anisotropySampler,vAnisotropyUV+uvOffset).rgb*vAnisotropyInfos.y;\n#endif\nanisotropicBlock(\nvAnisotropy,\n#ifdef ANISOTROPIC_TEXTURE\nanisotropyMapData,\n#endif\nTBN,\nnormalW,\nviewDirectionW,\nanisotropicOut\n);\n#endif\n#ifdef REFLECTION\nreflectionOutParams reflectionOut;\n#ifndef USE_CUSTOM_REFLECTION\nreflectionBlock(\nvPositionW,\nnormalW,\nalphaG,\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\n#ifdef ANISOTROPIC\nanisotropicOut,\n#endif\n#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)\nNdotVUnclamped,\n#endif\n#ifdef LINEARSPECULARREFLECTION\nroughness,\n#endif\nreflectionSampler,\n#if defined(NORMAL) && defined(USESPHERICALINVERTEX)\nvEnvironmentIrradiance,\n#endif\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)\nreflectionMatrix,\n#endif\n#endif\n#ifdef USEIRRADIANCEMAP\nirradianceSampler,\n#endif\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\nreflectionOut\n);\n#else\n#define CUSTOM_REFLECTION\n#endif\n#endif\n#include<pbrBlockReflectance0>\n#ifdef SHEEN\nsheenOutParams sheenOut;\n#ifdef SHEEN_TEXTURE\nvec4 sheenMapData=texture2D(sheenSampler,vSheenUV+uvOffset);\n#endif\n#if defined(SHEEN_ROUGHNESS) && defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)\nvec4 sheenMapRoughnessData=texture2D(sheenRoughnessSampler,vSheenRoughnessUV+uvOffset)*vSheenInfos.w;\n#endif\nsheenBlock(\nvSheenColor,\n#ifdef SHEEN_ROUGHNESS\nvSheenRoughness,\n#if defined(SHEEN_TEXTURE_ROUGHNESS) && !defined(SHEEN_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE)\nsheenMapRoughnessData,\n#endif\n#endif\nroughness,\n#ifdef SHEEN_TEXTURE\nsheenMapData,\nvSheenInfos.y,\n#endif\nreflectance,\n#ifdef SHEEN_LINKWITHALBEDO\nbaseColor,\nsurfaceAlbedo,\n#endif\n#ifdef ENVIRONMENTBRDF\nNdotV,\nenvironmentBrdf,\n#endif\n#if defined(REFLECTION) && defined(ENVIRONMENTBRDF)\nAARoughnessFactors,\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\nvLightingIntensity,\nreflectionSampler,\nreflectionOut.reflectionCoords,\nNdotVUnclamped,\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(RADIANCEOCCLUSION)\nseo,\n#endif\n#if !defined(REFLECTIONMAP_SKYBOX) && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)\neho,\n#endif\n#endif\nsheenOut\n);\n#ifdef SHEEN_LINKWITHALBEDO\nsurfaceAlbedo=sheenOut.surfaceAlbedo;\n#endif\n#endif\n#ifdef CLEARCOAT\n#ifdef CLEARCOAT_TEXTURE\nvec2 clearCoatMapData=texture2D(clearCoatSampler,vClearCoatUV+uvOffset).rg*vClearCoatInfos.y;\n#endif\n#endif\n#ifdef IRIDESCENCE\niridescenceOutParams iridescenceOut;\n#ifdef IRIDESCENCE_TEXTURE\nvec2 iridescenceMapData=texture2D(iridescenceSampler,vIridescenceUV+uvOffset).rg*vIridescenceInfos.y;\n#endif\n#ifdef IRIDESCENCE_THICKNESS_TEXTURE\nvec2 iridescenceThicknessMapData=texture2D(iridescenceThicknessSampler,vIridescenceThicknessUV+uvOffset).rg*vIridescenceInfos.w;\n#endif\niridescenceBlock(\nvIridescenceParams,\nNdotV,\nspecularEnvironmentR0,\n#ifdef IRIDESCENCE_TEXTURE\niridescenceMapData,\n#endif\n#ifdef IRIDESCENCE_THICKNESS_TEXTURE\niridescenceThicknessMapData,\n#endif\n#ifdef CLEARCOAT\nNdotVUnclamped,\n#ifdef CLEARCOAT_TEXTURE\nclearCoatMapData,\n#endif\n#endif\niridescenceOut\n);\nfloat iridescenceIntensity=iridescenceOut.iridescenceIntensity;\nspecularEnvironmentR0=iridescenceOut.specularEnvironmentR0;\n#endif\nclearcoatOutParams clearcoatOut;\n#ifdef CLEARCOAT\n#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)\nvec4 clearCoatMapRoughnessData=texture2D(clearCoatRoughnessSampler,vClearCoatRoughnessUV+uvOffset)*vClearCoatInfos.w;\n#endif\n#if defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)\nvec4 clearCoatTintMapData=texture2D(clearCoatTintSampler,vClearCoatTintUV+uvOffset);\n#endif\n#ifdef CLEARCOAT_BUMP\nvec4 clearCoatBumpMapData=texture2D(clearCoatBumpSampler,vClearCoatBumpUV+uvOffset);\n#endif\nclearcoatBlock(\nvPositionW,\ngeometricNormalW,\nviewDirectionW,\nvClearCoatParams,\n#if defined(CLEARCOAT_TEXTURE_ROUGHNESS) && !defined(CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL) && !defined(CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE)\nclearCoatMapRoughnessData,\n#endif\nspecularEnvironmentR0,\n#ifdef CLEARCOAT_TEXTURE\nclearCoatMapData,\n#endif\n#ifdef CLEARCOAT_TINT\nvClearCoatTintParams,\nclearCoatColorAtDistance,\nvClearCoatRefractionParams,\n#ifdef CLEARCOAT_TINT_TEXTURE\nclearCoatTintMapData,\n#endif\n#endif\n#ifdef CLEARCOAT_BUMP\nvClearCoatBumpInfos,\nclearCoatBumpMapData,\nvClearCoatBumpUV,\n#if defined(TANGENT) && defined(NORMAL)\nvTBN,\n#else\nvClearCoatTangentSpaceParams,\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nnormalMatrix,\n#endif\n#endif\n#if defined(FORCENORMALFORWARD) && defined(NORMAL)\nfaceNormal,\n#endif\n#ifdef REFLECTION\nvReflectionMicrosurfaceInfos,\nvReflectionInfos,\nvReflectionColor,\nvLightingIntensity,\nreflectionSampler,\n#ifndef LODBASEDMICROSFURACE\nreflectionSamplerLow,\nreflectionSamplerHigh,\n#endif\n#ifdef REALTIME_FILTERING\nvReflectionFilteringInfo,\n#endif\n#endif\n#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)\n#ifdef RADIANCEOCCLUSION\nambientMonochrome,\n#endif\n#endif\n#if defined(CLEARCOAT_BUMP) || defined(TWOSIDEDLIGHTING)\n(gl_FrontFacing ? 1. : -1.),\n#endif\nclearcoatOut\n);\n#else\nclearcoatOut.specularEnvironmentR0=specularEnvironmentR0;\n#endif\n#include<pbrBlockReflectance>\nsubSurfaceOutParams subSurfaceOut;\n#ifdef SUBSURFACE\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nvec4 thicknessMap=texture2D(thicknessSampler,vThicknessUV+uvOffset);\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\nvec4 refractionIntensityMap=texture2D(refractionIntensitySampler,vRefractionIntensityUV+uvOffset);\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\nvec4 translucencyIntensityMap=texture2D(translucencyIntensitySampler,vTranslucencyIntensityUV+uvOffset);\n#endif\nsubSurfaceBlock(\nvSubSurfaceIntensity,\nvThicknessParam,\nvTintColor,\nnormalW,\nspecularEnvironmentReflectance,\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nthicknessMap,\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\nrefractionIntensityMap,\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\ntranslucencyIntensityMap,\n#endif\n#ifdef REFLECTION\n#ifdef SS_TRANSLUCENCY\nreflectionMatrix,\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#if !defined(NORMAL) || !defined(USESPHERICALINVERTEX)\nreflectionOut.irradianceVector,\n#endif\n#if defined(REALTIME_FILTERING)\nreflectionSampler,\nvReflectionFilteringInfo,\n#endif\n#endif\n#ifdef USEIRRADIANCEMAP\nirradianceSampler,\n#endif\n#endif\n#endif\n#if defined(SS_REFRACTION) || defined(SS_TRANSLUCENCY)\nsurfaceAlbedo,\n#endif\n#ifdef SS_REFRACTION\nvPositionW,\nviewDirectionW,\nview,\nvRefractionInfos,\nrefractionMatrix,\nvRefractionMicrosurfaceInfos,\nvLightingIntensity,\n#ifdef SS_LINKREFRACTIONTOTRANSPARENCY\nalpha,\n#endif\n#ifdef SS_LODINREFRACTIONALPHA\nNdotVUnclamped,\n#endif\n#ifdef SS_LINEARSPECULARREFRACTION\nroughness,\n#endif\nalphaG,\nrefractionSampler,\n#ifndef LODBASEDMICROSFURACE\nrefractionSamplerLow,\nrefractionSamplerHigh,\n#endif\n#ifdef ANISOTROPIC\nanisotropicOut,\n#endif\n#ifdef REALTIME_FILTERING\nvRefractionFilteringInfo,\n#endif\n#ifdef SS_USE_LOCAL_REFRACTIONMAP_CUBIC\nvRefractionPosition,\nvRefractionSize,\n#endif\n#endif\n#ifdef SS_TRANSLUCENCY\nvDiffusionDistance,\n#endif\nsubSurfaceOut\n);\n#ifdef SS_REFRACTION\nsurfaceAlbedo=subSurfaceOut.surfaceAlbedo;\n#ifdef SS_LINKREFRACTIONTOTRANSPARENCY\nalpha=subSurfaceOut.alpha;\n#endif\n#endif\n#else\nsubSurfaceOut.specularEnvironmentReflectance=specularEnvironmentReflectance;\n#endif\n#include<pbrBlockDirectLighting>\n#include<lightFragment>[0..maxSimultaneousLights]\n#include<pbrBlockFinalLitComponents>\n#endif \n#include<pbrBlockFinalUnlitComponents>\n#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION\n#include<pbrBlockFinalColorComposition>\n#include<logDepthFragment>\n#include<fogFragment>(color,finalColor)\n#include<pbrBlockImageProcessing>\n#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR\n#ifdef PREPASS\nfloat writeGeometryInfo=finalColor.a>0.4 ? 1.0 : 0.0;\n#ifdef PREPASS_POSITION\ngl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);\n#endif\n#ifdef PREPASS_VELOCITY\nvec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;\nvec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;\nvec2 velocity=abs(a-b);\nvelocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;\ngl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);\n#endif\n#ifdef PREPASS_ALBEDO_SQRT\nvec3 sqAlbedo=sqrt(surfaceAlbedo); \n#endif\n#ifdef PREPASS_IRRADIANCE\nvec3 irradiance=finalDiffuse;\n#ifndef UNLIT\n#ifdef REFLECTION\nirradiance+=finalIrradiance;\n#endif\n#endif\n#ifdef SS_SCATTERING\ngl_FragData[0]=vec4(finalColor.rgb-irradiance,finalColor.a); \nirradiance/=sqAlbedo;\n#else\ngl_FragData[0]=finalColor; \nfloat scatteringDiffusionProfile=255.;\n#endif\ngl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(clamp(irradiance,vec3(0.),vec3(1.)),writeGeometryInfo*scatteringDiffusionProfile/255.); \n#else\ngl_FragData[0]=vec4(finalColor.rgb,finalColor.a);\n#endif\n#ifdef PREPASS_DEPTH\ngl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); \n#endif\n#ifdef PREPASS_NORMAL\ngl_FragData[PREPASS_NORMAL_INDEX]=vec4((view*vec4(normalW,0.0)).rgb,writeGeometryInfo); \n#endif\n#ifdef PREPASS_ALBEDO_SQRT\ngl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(sqAlbedo,writeGeometryInfo); \n#endif\n#ifdef PREPASS_REFLECTIVITY\ngl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toGammaSpace(specularEnvironmentR0),microSurface)*writeGeometryInfo;\n#endif\n#endif\n#if !defined(PREPASS) || defined(WEBGL2)\ngl_FragColor=finalColor;\n#endif\n#if ORDER_INDEPENDENT_TRANSPARENCY\nif (fragDepth==nearestDepth) {\nfrontColor.rgb+=finalColor.rgb*finalColor.a*alphaMultiplier;\nfrontColor.a=1.0-alphaMultiplier*(1.0-finalColor.a);\n} else {\nbackColor+=finalColor;\n}\n#endif\n#include<pbrDebug>\n#define CUSTOM_FRAGMENT_MAIN_END\n}\n";
// Sideeffect
ShaderStore.ShadersStore[name$B] = shader$B;

// Do not edit.
var name$C = "pbrVertexDeclaration";
var shader$C = "uniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef ALBEDO\nuniform mat4 albedoMatrix;\nuniform vec2 vAlbedoInfos;\n#endif\n#ifdef AMBIENT\nuniform mat4 ambientMatrix;\nuniform vec4 vAmbientInfos;\n#endif\n#ifdef OPACITY\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\n#ifdef EMISSIVE\nuniform vec2 vEmissiveInfos;\nuniform mat4 emissiveMatrix;\n#endif\n#ifdef LIGHTMAP\nuniform vec2 vLightmapInfos;\nuniform mat4 lightmapMatrix;\n#endif\n#ifdef REFLECTIVITY \nuniform vec3 vReflectivityInfos;\nuniform mat4 reflectivityMatrix;\n#endif\n#ifdef METALLIC_REFLECTANCE\nuniform vec2 vMetallicReflectanceInfos;\nuniform mat4 metallicReflectanceMatrix;\n#endif\n#ifdef REFLECTANCE\nuniform vec2 vReflectanceInfos;\nuniform mat4 reflectanceMatrix;\n#endif\n#ifdef MICROSURFACEMAP\nuniform vec2 vMicroSurfaceSamplerInfos;\nuniform mat4 microSurfaceSamplerMatrix;\n#endif\n#ifdef BUMP\nuniform vec3 vBumpInfos;\nuniform mat4 bumpMatrix;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n#ifdef REFLECTION\nuniform vec2 vReflectionInfos;\nuniform mat4 reflectionMatrix;\n#endif\n#ifdef CLEARCOAT\n#if defined(CLEARCOAT_TEXTURE) || defined(CLEARCOAT_TEXTURE_ROUGHNESS)\nuniform vec4 vClearCoatInfos;\n#endif\n#ifdef CLEARCOAT_TEXTURE\nuniform mat4 clearCoatMatrix;\n#endif\n#ifdef CLEARCOAT_TEXTURE_ROUGHNESS\nuniform mat4 clearCoatRoughnessMatrix;\n#endif\n#ifdef CLEARCOAT_BUMP\nuniform vec2 vClearCoatBumpInfos;\nuniform mat4 clearCoatBumpMatrix;\n#endif\n#ifdef CLEARCOAT_TINT_TEXTURE\nuniform vec2 vClearCoatTintInfos;\nuniform mat4 clearCoatTintMatrix;\n#endif\n#endif\n#ifdef IRIDESCENCE\n#if defined(IRIDESCENCE_TEXTURE) || defined(IRIDESCENCE_THICKNESS_TEXTURE)\nuniform vec4 vIridescenceInfos;\n#endif\n#ifdef IRIDESCENCE_TEXTURE\nuniform mat4 iridescenceMatrix;\n#endif\n#ifdef IRIDESCENCE_THICKNESS_TEXTURE\nuniform mat4 iridescenceThicknessMatrix;\n#endif\n#endif\n#ifdef ANISOTROPIC\n#ifdef ANISOTROPIC_TEXTURE\nuniform vec2 vAnisotropyInfos;\nuniform mat4 anisotropyMatrix;\n#endif\n#endif\n#ifdef SHEEN\n#if defined(SHEEN_TEXTURE) || defined(SHEEN_TEXTURE_ROUGHNESS)\nuniform vec4 vSheenInfos;\n#endif\n#ifdef SHEEN_TEXTURE\nuniform mat4 sheenMatrix;\n#endif\n#ifdef SHEEN_TEXTURE_ROUGHNESS\nuniform mat4 sheenRoughnessMatrix;\n#endif\n#endif\n#ifdef SUBSURFACE\n#ifdef SS_REFRACTION\nuniform vec4 vRefractionInfos;\nuniform mat4 refractionMatrix;\n#endif\n#ifdef SS_THICKNESSANDMASK_TEXTURE\nuniform vec2 vThicknessInfos;\nuniform mat4 thicknessMatrix;\n#endif\n#ifdef SS_REFRACTIONINTENSITY_TEXTURE\nuniform vec2 vRefractionIntensityInfos;\nuniform mat4 refractionIntensityMatrix;\n#endif\n#ifdef SS_TRANSLUCENCYINTENSITY_TEXTURE\nuniform vec2 vTranslucencyIntensityInfos;\nuniform mat4 translucencyIntensityMatrix;\n#endif\n#endif\n#ifdef NORMAL\n#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)\n#ifdef USESPHERICALFROMREFLECTIONMAP\n#ifdef SPHERICAL_HARMONICS\nuniform vec3 vSphericalL00;\nuniform vec3 vSphericalL1_1;\nuniform vec3 vSphericalL10;\nuniform vec3 vSphericalL11;\nuniform vec3 vSphericalL2_2;\nuniform vec3 vSphericalL2_1;\nuniform vec3 vSphericalL20;\nuniform vec3 vSphericalL21;\nuniform vec3 vSphericalL22;\n#else\nuniform vec3 vSphericalX;\nuniform vec3 vSphericalY;\nuniform vec3 vSphericalZ;\nuniform vec3 vSphericalXX_ZZ;\nuniform vec3 vSphericalYY_ZZ;\nuniform vec3 vSphericalZZ;\nuniform vec3 vSphericalXY;\nuniform vec3 vSphericalYZ;\nuniform vec3 vSphericalZX;\n#endif\n#endif\n#endif\n#endif\n#ifdef DETAIL\nuniform vec4 vDetailInfos;\nuniform mat4 detailMatrix;\n#endif\n#define ADDITIONAL_VERTEX_DECLARATION\n";
// Sideeffect
ShaderStore.IncludesShadersStore[name$C] = shader$C;

// Do not edit.
var name$D = "pbrVertexShader";
var shader$D = "precision highp float;\n#include<__decl__pbrVertex>\n#define CUSTOM_VERTEX_BEGIN\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef TANGENT\nattribute vec4 tangent;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#include<uvAttributeDeclaration>[2..7]\n#include<mainUVVaryingDeclaration>[1..7]\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<helperFunctions>\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\n#include<instancesDeclaration>\n#include<prePassVertexDeclaration>\n#include<samplerVertexDeclaration>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo)\n#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)\n#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)\n#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)\n#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)\n#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)\n#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity)\n#include<samplerVertexDeclaration>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler)\n#include<samplerVertexDeclaration>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance)\n#include<samplerVertexDeclaration>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance)\n#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)\n#ifdef CLEARCOAT\n#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat)\n#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness)\n#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump)\n#include<samplerVertexDeclaration>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint)\n#endif\n#ifdef IRIDESCENCE\n#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence)\n#include<samplerVertexDeclaration>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness)\n#endif\n#ifdef SHEEN\n#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen)\n#include<samplerVertexDeclaration>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness)\n#endif\n#ifdef ANISOTROPIC\n#include<samplerVertexDeclaration>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy)\n#endif\n#ifdef SUBSURFACE\n#include<samplerVertexDeclaration>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness)\n#include<samplerVertexDeclaration>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity)\n#include<samplerVertexDeclaration>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity)\n#endif\nvarying vec3 vPositionW;\n#if DEBUGMODE>0\nvarying vec4 vClipSpacePosition;\n#endif\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)\nvarying vec3 vEnvironmentIrradiance;\n#include<harmonicsFunctions>\n#endif\n#endif\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR)\nvarying vec4 vColor;\n#endif\n#include<bumpVertexDeclaration>\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightVxFragment>[0..maxSimultaneousLights]\n#include<morphTargetsVertexGlobalDeclaration>\n#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]\n#ifdef REFLECTIONMAP_SKYBOX\nvarying vec3 vPositionUVW;\n#endif\n#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)\nvarying vec3 vDirectionW;\n#endif\n#include<logDepthDeclaration>\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\nvec3 positionUpdated=position;\n#ifdef NORMAL\nvec3 normalUpdated=normal;\n#endif\n#ifdef TANGENT\nvec4 tangentUpdated=tangent;\n#endif\n#ifdef UV1\nvec2 uvUpdated=uv;\n#endif\n#include<morphTargetsVertexGlobal>\n#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]\n#ifdef REFLECTIONMAP_SKYBOX\nvPositionUVW=positionUpdated;\n#endif\n#define CUSTOM_VERTEX_UPDATE_POSITION\n#define CUSTOM_VERTEX_UPDATE_NORMAL\n#include<instancesVertex>\n#if defined(PREPASS) && defined(PREPASS_VELOCITY) && !defined(BONES_VELOCITY_ENABLED)\nvCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);\nvPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);\n#endif\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nvec4 worldPos=finalWorld*vec4(positionUpdated,1.0);\nvPositionW=vec3(worldPos);\n#include<prePassVertex>\n#ifdef NORMAL\nmat3 normalWorld=mat3(finalWorld);\n#if defined(INSTANCES) && defined(THIN_INSTANCES)\nvNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));\nvNormalW=normalize(normalWorld*vNormalW);\n#else\n#ifdef NONUNIFORMSCALING\nnormalWorld=transposeMat3(inverseMat3(normalWorld));\n#endif\nvNormalW=normalize(normalWorld*normalUpdated);\n#endif\n#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)\nvec3 reflectionVector=vec3(reflectionMatrix*vec4(vNormalW,0)).xyz;\n#ifdef REFLECTIONMAP_OPPOSITEZ\nreflectionVector.z*=-1.0;\n#endif\nvEnvironmentIrradiance=computeEnvironmentIrradiance(reflectionVector);\n#endif\n#endif\n#define CUSTOM_VERTEX_UPDATE_WORLDPOS\n#ifdef MULTIVIEW\nif (gl_ViewID_OVR==0u) {\ngl_Position=viewProjection*worldPos;\n} else {\ngl_Position=viewProjectionR*worldPos;\n}\n#else\ngl_Position=viewProjection*worldPos;\n#endif\n#if DEBUGMODE>0\nvClipSpacePosition=gl_Position;\n#endif\n#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)\nvDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));\n#endif\n#ifndef UV1\nvec2 uvUpdated=vec2(0.,0.);\n#endif\n#ifdef MAINUV1\nvMainUV1=uvUpdated;\n#endif\n#include<uvVariableDeclaration>[2..7]\n#include<samplerVertexImplementation>(_DEFINENAME_,ALBEDO,_VARYINGNAME_,Albedo,_MATRIXNAME_,albedo,_INFONAME_,AlbedoInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTIVITY,_VARYINGNAME_,Reflectivity,_MATRIXNAME_,reflectivity,_INFONAME_,ReflectivityInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,MICROSURFACEMAP,_VARYINGNAME_,MicroSurfaceSampler,_MATRIXNAME_,microSurfaceSampler,_INFONAME_,MicroSurfaceSamplerInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,METALLIC_REFLECTANCE,_VARYINGNAME_,MetallicReflectance,_MATRIXNAME_,metallicReflectance,_INFONAME_,MetallicReflectanceInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,REFLECTANCE,_VARYINGNAME_,Reflectance,_MATRIXNAME_,reflectance,_INFONAME_,ReflectanceInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)\n#ifdef CLEARCOAT\n#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE,_VARYINGNAME_,ClearCoat,_MATRIXNAME_,clearCoat,_INFONAME_,ClearCoatInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TEXTURE_ROUGHNESS,_VARYINGNAME_,ClearCoatRoughness,_MATRIXNAME_,clearCoatRoughness,_INFONAME_,ClearCoatInfos.z)\n#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_BUMP,_VARYINGNAME_,ClearCoatBump,_MATRIXNAME_,clearCoatBump,_INFONAME_,ClearCoatBumpInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,CLEARCOAT_TINT_TEXTURE,_VARYINGNAME_,ClearCoatTint,_MATRIXNAME_,clearCoatTint,_INFONAME_,ClearCoatTintInfos.x)\n#endif\n#ifdef IRIDESCENCE\n#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_TEXTURE,_VARYINGNAME_,Iridescence,_MATRIXNAME_,iridescence,_INFONAME_,IridescenceInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,IRIDESCENCE_THICKNESS_TEXTURE,_VARYINGNAME_,IridescenceThickness,_MATRIXNAME_,iridescenceThickness,_INFONAME_,IridescenceInfos.z)\n#endif\n#ifdef SHEEN\n#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE,_VARYINGNAME_,Sheen,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,SHEEN_TEXTURE_ROUGHNESS,_VARYINGNAME_,SheenRoughness,_MATRIXNAME_,sheen,_INFONAME_,SheenInfos.z)\n#endif\n#ifdef ANISOTROPIC\n#include<samplerVertexImplementation>(_DEFINENAME_,ANISOTROPIC_TEXTURE,_VARYINGNAME_,Anisotropy,_MATRIXNAME_,anisotropy,_INFONAME_,AnisotropyInfos.x)\n#endif\n#ifdef SUBSURFACE\n#include<samplerVertexImplementation>(_DEFINENAME_,SS_THICKNESSANDMASK_TEXTURE,_VARYINGNAME_,Thickness,_MATRIXNAME_,thickness,_INFONAME_,ThicknessInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,SS_REFRACTIONINTENSITY_TEXTURE,_VARYINGNAME_,RefractionIntensity,_MATRIXNAME_,refractionIntensity,_INFONAME_,RefractionIntensityInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,SS_TRANSLUCENCYINTENSITY_TEXTURE,_VARYINGNAME_,TranslucencyIntensity,_MATRIXNAME_,translucencyIntensity,_INFONAME_,TranslucencyIntensityInfos.x)\n#endif\n#include<bumpVertex>\n#include<clipPlaneVertex>\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n#include<vertexColorMixing>\n#if defined(POINTSIZE) && !defined(WEBGPU)\ngl_PointSize=pointSize;\n#endif\n#include<logDepthVertex>\n#define CUSTOM_VERTEX_MAIN_END\n}";
// Sideeffect
ShaderStore.ShadersStore[name$D] = shader$D;

/**
 * @hidden
 */
var MaterialClearCoatDefines = /** @class */ (function (_super) {
    __extends(MaterialClearCoatDefines, _super);
    function MaterialClearCoatDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CLEARCOAT = false;
        _this.CLEARCOAT_DEFAULTIOR = false;
        _this.CLEARCOAT_TEXTURE = false;
        _this.CLEARCOAT_TEXTURE_ROUGHNESS = false;
        _this.CLEARCOAT_TEXTUREDIRECTUV = 0;
        _this.CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV = 0;
        _this.CLEARCOAT_BUMP = false;
        _this.CLEARCOAT_BUMPDIRECTUV = 0;
        _this.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE = false;
        _this.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL = false;
        _this.CLEARCOAT_REMAP_F0 = false;
        _this.CLEARCOAT_TINT = false;
        _this.CLEARCOAT_TINT_TEXTURE = false;
        _this.CLEARCOAT_TINT_TEXTUREDIRECTUV = 0;
        _this.CLEARCOAT_TINT_GAMMATEXTURE = false;
        return _this;
    }
    return MaterialClearCoatDefines;
}(MaterialDefines));
/**
 * Plugin that implements the clear coat component of the PBR material
 */
var PBRClearCoatConfiguration = /** @class */ (function (_super) {
    __extends(PBRClearCoatConfiguration, _super);
    function PBRClearCoatConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "PBRClearCoat", 100, new MaterialClearCoatDefines(), addToPluginList) || this;
        _this._isEnabled = false;
        /**
         * Defines if the clear coat is enabled in the material.
         */
        _this.isEnabled = false;
        /**
         * Defines the clear coat layer strength (between 0 and 1) it defaults to 1.
         */
        _this.intensity = 1;
        /**
         * Defines the clear coat layer roughness.
         */
        _this.roughness = 0;
        _this._indexOfRefraction = PBRClearCoatConfiguration._DefaultIndexOfRefraction;
        /**
         * Defines the index of refraction of the clear coat.
         * This defaults to 1.5 corresponding to a 0.04 f0 or a 4% reflectance at normal incidence
         * The default fits with a polyurethane material.
         * Changing the default value is more performance intensive.
         */
        _this.indexOfRefraction = PBRClearCoatConfiguration._DefaultIndexOfRefraction;
        _this._texture = null;
        /**
         * Stores the clear coat values in a texture (red channel is intensity and green channel is roughness)
         * If useRoughnessFromMainTexture is false, the green channel of texture is not used and the green channel of textureRoughness is used instead
         * if textureRoughness is not empty, else no texture roughness is used
         */
        _this.texture = null;
        _this._useRoughnessFromMainTexture = true;
        /**
         * Indicates that the green channel of the texture property will be used for roughness (default: true)
         * If false, the green channel from textureRoughness is used for roughness
         */
        _this.useRoughnessFromMainTexture = true;
        _this._textureRoughness = null;
        /**
         * Stores the clear coat roughness in a texture (green channel)
         * Not used if useRoughnessFromMainTexture is true
         */
        _this.textureRoughness = null;
        _this._remapF0OnInterfaceChange = true;
        /**
         * Defines if the F0 value should be remapped to account for the interface change in the material.
         */
        _this.remapF0OnInterfaceChange = true;
        _this._bumpTexture = null;
        /**
         * Define the clear coat specific bump texture.
         */
        _this.bumpTexture = null;
        _this._isTintEnabled = false;
        /**
         * Defines if the clear coat tint is enabled in the material.
         */
        _this.isTintEnabled = false;
        /**
         * Defines the clear coat tint of the material.
         * This is only use if tint is enabled
         */
        _this.tintColor = Color3.White();
        /**
         * Defines the distance at which the tint color should be found in the
         * clear coat media.
         * This is only use if tint is enabled
         */
        _this.tintColorAtDistance = 1;
        /**
         * Defines the clear coat layer thickness.
         * This is only use if tint is enabled
         */
        _this.tintThickness = 1;
        _this._tintTexture = null;
        /**
         * Stores the clear tint values in a texture.
         * rgb is tint
         * a is a thickness factor
         */
        _this.tintTexture = null;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        return _this;
    }
    /** @hidden */
    PBRClearCoatConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    PBRClearCoatConfiguration.prototype.isReadyForSubMesh = function (defines, scene, engine) {
        if (!this._isEnabled) {
            return true;
        }
        var disableBumpMap = this._material._disableBumpMap;
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this._texture && MaterialFlags.ClearCoatTextureEnabled) {
                    if (!this._texture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._textureRoughness && MaterialFlags.ClearCoatTextureEnabled) {
                    if (!this._textureRoughness.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (engine.getCaps().standardDerivatives && this._bumpTexture && MaterialFlags.ClearCoatBumpTextureEnabled && !disableBumpMap) {
                    // Bump texture cannot be not blocking.
                    if (!this._bumpTexture.isReady()) {
                        return false;
                    }
                }
                if (this._isTintEnabled && this._tintTexture && MaterialFlags.ClearCoatTintTextureEnabled) {
                    if (!this._tintTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PBRClearCoatConfiguration.prototype.prepareDefinesBeforeAttributes = function (defines, scene) {
        var _a;
        if (this._isEnabled) {
            defines.CLEARCOAT = true;
            defines.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE = this._useRoughnessFromMainTexture;
            defines.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL =
                this._texture !== null && this._texture._texture === ((_a = this._textureRoughness) === null || _a === void 0 ? void 0 : _a._texture) && this._texture.checkTransformsAreIdentical(this._textureRoughness);
            defines.CLEARCOAT_REMAP_F0 = this._remapF0OnInterfaceChange;
            if (defines._areTexturesDirty) {
                if (scene.texturesEnabled) {
                    if (this._texture && MaterialFlags.ClearCoatTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._texture, defines, "CLEARCOAT_TEXTURE");
                    }
                    else {
                        defines.CLEARCOAT_TEXTURE = false;
                    }
                    if (this._textureRoughness && MaterialFlags.ClearCoatTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._textureRoughness, defines, "CLEARCOAT_TEXTURE_ROUGHNESS");
                    }
                    else {
                        defines.CLEARCOAT_TEXTURE_ROUGHNESS = false;
                    }
                    if (this._bumpTexture && MaterialFlags.ClearCoatBumpTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._bumpTexture, defines, "CLEARCOAT_BUMP");
                    }
                    else {
                        defines.CLEARCOAT_BUMP = false;
                    }
                    defines.CLEARCOAT_DEFAULTIOR = this._indexOfRefraction === PBRClearCoatConfiguration._DefaultIndexOfRefraction;
                    if (this._isTintEnabled) {
                        defines.CLEARCOAT_TINT = true;
                        if (this._tintTexture && MaterialFlags.ClearCoatTintTextureEnabled) {
                            MaterialHelper.PrepareDefinesForMergedUV(this._tintTexture, defines, "CLEARCOAT_TINT_TEXTURE");
                            defines.CLEARCOAT_TINT_GAMMATEXTURE = this._tintTexture.gammaSpace;
                        }
                        else {
                            defines.CLEARCOAT_TINT_TEXTURE = false;
                        }
                    }
                    else {
                        defines.CLEARCOAT_TINT = false;
                        defines.CLEARCOAT_TINT_TEXTURE = false;
                    }
                }
            }
        }
        else {
            defines.CLEARCOAT = false;
            defines.CLEARCOAT_TEXTURE = false;
            defines.CLEARCOAT_TEXTURE_ROUGHNESS = false;
            defines.CLEARCOAT_BUMP = false;
            defines.CLEARCOAT_TINT = false;
            defines.CLEARCOAT_TINT_TEXTURE = false;
            defines.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE = false;
            defines.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL = false;
        }
    };
    PBRClearCoatConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene, engine, subMesh) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this._isEnabled) {
            return;
        }
        var defines = subMesh.materialDefines;
        var isFrozen = this._material.isFrozen;
        var disableBumpMap = this._material._disableBumpMap;
        var invertNormalMapX = this._material._invertNormalMapX;
        var invertNormalMapY = this._material._invertNormalMapY;
        var identicalTextures = defines.CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (identicalTextures && MaterialFlags.ClearCoatTextureEnabled) {
                uniformBuffer.updateFloat4("vClearCoatInfos", this._texture.coordinatesIndex, this._texture.level, -1, -1);
                MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "clearCoat");
            }
            else if ((this._texture || this._textureRoughness) && MaterialFlags.ClearCoatTextureEnabled) {
                uniformBuffer.updateFloat4("vClearCoatInfos", (_b = (_a = this._texture) === null || _a === void 0 ? void 0 : _a.coordinatesIndex) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this._texture) === null || _c === void 0 ? void 0 : _c.level) !== null && _d !== void 0 ? _d : 0, (_f = (_e = this._textureRoughness) === null || _e === void 0 ? void 0 : _e.coordinatesIndex) !== null && _f !== void 0 ? _f : 0, (_h = (_g = this._textureRoughness) === null || _g === void 0 ? void 0 : _g.level) !== null && _h !== void 0 ? _h : 0);
                if (this._texture) {
                    MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "clearCoat");
                }
                if (this._textureRoughness && !identicalTextures && !defines.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE) {
                    MaterialHelper.BindTextureMatrix(this._textureRoughness, uniformBuffer, "clearCoatRoughness");
                }
            }
            if (this._bumpTexture && engine.getCaps().standardDerivatives && MaterialFlags.ClearCoatTextureEnabled && !disableBumpMap) {
                uniformBuffer.updateFloat2("vClearCoatBumpInfos", this._bumpTexture.coordinatesIndex, this._bumpTexture.level);
                MaterialHelper.BindTextureMatrix(this._bumpTexture, uniformBuffer, "clearCoatBump");
                if (scene._mirroredCameraPosition) {
                    uniformBuffer.updateFloat2("vClearCoatTangentSpaceParams", invertNormalMapX ? 1.0 : -1.0, invertNormalMapY ? 1.0 : -1.0);
                }
                else {
                    uniformBuffer.updateFloat2("vClearCoatTangentSpaceParams", invertNormalMapX ? -1.0 : 1.0, invertNormalMapY ? -1.0 : 1.0);
                }
            }
            if (this._tintTexture && MaterialFlags.ClearCoatTintTextureEnabled) {
                uniformBuffer.updateFloat2("vClearCoatTintInfos", this._tintTexture.coordinatesIndex, this._tintTexture.level);
                MaterialHelper.BindTextureMatrix(this._tintTexture, uniformBuffer, "clearCoatTint");
            }
            // Clear Coat General params
            uniformBuffer.updateFloat2("vClearCoatParams", this.intensity, this.roughness);
            // Clear Coat Refraction params
            var a = 1 - this._indexOfRefraction;
            var b = 1 + this._indexOfRefraction;
            var f0 = Math.pow(-a / b, 2); // Schlicks approx: (ior1 - ior2) / (ior1 + ior2) where ior2 for air is close to vacuum = 1.
            var eta = 1 / this._indexOfRefraction;
            uniformBuffer.updateFloat4("vClearCoatRefractionParams", f0, eta, a, b);
            if (this._isTintEnabled) {
                uniformBuffer.updateFloat4("vClearCoatTintParams", this.tintColor.r, this.tintColor.g, this.tintColor.b, Math.max(0.00001, this.tintThickness));
                uniformBuffer.updateFloat("clearCoatColorAtDistance", Math.max(0.00001, this.tintColorAtDistance));
            }
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._texture && MaterialFlags.ClearCoatTextureEnabled) {
                uniformBuffer.setTexture("clearCoatSampler", this._texture);
            }
            if (this._textureRoughness && !identicalTextures && !defines.CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE && MaterialFlags.ClearCoatTextureEnabled) {
                uniformBuffer.setTexture("clearCoatRoughnessSampler", this._textureRoughness);
            }
            if (this._bumpTexture && engine.getCaps().standardDerivatives && MaterialFlags.ClearCoatBumpTextureEnabled && !disableBumpMap) {
                uniformBuffer.setTexture("clearCoatBumpSampler", this._bumpTexture);
            }
            if (this._isTintEnabled && this._tintTexture && MaterialFlags.ClearCoatTintTextureEnabled) {
                uniformBuffer.setTexture("clearCoatTintSampler", this._tintTexture);
            }
        }
    };
    PBRClearCoatConfiguration.prototype.hasTexture = function (texture) {
        if (this._texture === texture) {
            return true;
        }
        if (this._textureRoughness === texture) {
            return true;
        }
        if (this._bumpTexture === texture) {
            return true;
        }
        if (this._tintTexture === texture) {
            return true;
        }
        return false;
    };
    PBRClearCoatConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._texture) {
            activeTextures.push(this._texture);
        }
        if (this._textureRoughness) {
            activeTextures.push(this._textureRoughness);
        }
        if (this._bumpTexture) {
            activeTextures.push(this._bumpTexture);
        }
        if (this._tintTexture) {
            activeTextures.push(this._tintTexture);
        }
    };
    PBRClearCoatConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
            animatables.push(this._texture);
        }
        if (this._textureRoughness && this._textureRoughness.animations && this._textureRoughness.animations.length > 0) {
            animatables.push(this._textureRoughness);
        }
        if (this._bumpTexture && this._bumpTexture.animations && this._bumpTexture.animations.length > 0) {
            animatables.push(this._bumpTexture);
        }
        if (this._tintTexture && this._tintTexture.animations && this._tintTexture.animations.length > 0) {
            animatables.push(this._tintTexture);
        }
    };
    PBRClearCoatConfiguration.prototype.dispose = function (forceDisposeTextures) {
        var _a, _b, _c, _d;
        if (forceDisposeTextures) {
            (_a = this._texture) === null || _a === void 0 ? void 0 : _a.dispose();
            (_b = this._textureRoughness) === null || _b === void 0 ? void 0 : _b.dispose();
            (_c = this._bumpTexture) === null || _c === void 0 ? void 0 : _c.dispose();
            (_d = this._tintTexture) === null || _d === void 0 ? void 0 : _d.dispose();
        }
    };
    PBRClearCoatConfiguration.prototype.getClassName = function () {
        return "PBRClearCoatConfiguration";
    };
    PBRClearCoatConfiguration.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        if (defines.CLEARCOAT_BUMP) {
            fallbacks.addFallback(currentRank++, "CLEARCOAT_BUMP");
        }
        if (defines.CLEARCOAT_TINT) {
            fallbacks.addFallback(currentRank++, "CLEARCOAT_TINT");
        }
        if (defines.CLEARCOAT) {
            fallbacks.addFallback(currentRank++, "CLEARCOAT");
        }
        return currentRank;
    };
    PBRClearCoatConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("clearCoatSampler", "clearCoatRoughnessSampler", "clearCoatBumpSampler", "clearCoatTintSampler");
    };
    PBRClearCoatConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vClearCoatParams", size: 2, type: "vec2" },
                { name: "vClearCoatRefractionParams", size: 4, type: "vec4" },
                { name: "vClearCoatInfos", size: 4, type: "vec4" },
                { name: "clearCoatMatrix", size: 16, type: "mat4" },
                { name: "clearCoatRoughnessMatrix", size: 16, type: "mat4" },
                { name: "vClearCoatBumpInfos", size: 2, type: "vec2" },
                { name: "vClearCoatTangentSpaceParams", size: 2, type: "vec2" },
                { name: "clearCoatBumpMatrix", size: 16, type: "mat4" },
                { name: "vClearCoatTintParams", size: 4, type: "vec4" },
                { name: "clearCoatColorAtDistance", size: 1, type: "float" },
                { name: "vClearCoatTintInfos", size: 2, type: "vec2" },
                { name: "clearCoatTintMatrix", size: 16, type: "mat4" },
            ],
        };
    };
    /**
     * This defaults to 1.5 corresponding to a 0.04 f0 or a 4% reflectance at normal incidence
     * The default fits with a polyurethane material.
     * @hidden
     */
    PBRClearCoatConfiguration._DefaultIndexOfRefraction = 1.5;
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "isEnabled", void 0);
    __decorate([
        serialize()
    ], PBRClearCoatConfiguration.prototype, "intensity", void 0);
    __decorate([
        serialize()
    ], PBRClearCoatConfiguration.prototype, "roughness", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "indexOfRefraction", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "texture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "useRoughnessFromMainTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "textureRoughness", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "remapF0OnInterfaceChange", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "bumpTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "isTintEnabled", void 0);
    __decorate([
        serializeAsColor3()
    ], PBRClearCoatConfiguration.prototype, "tintColor", void 0);
    __decorate([
        serialize()
    ], PBRClearCoatConfiguration.prototype, "tintColorAtDistance", void 0);
    __decorate([
        serialize()
    ], PBRClearCoatConfiguration.prototype, "tintThickness", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRClearCoatConfiguration.prototype, "tintTexture", void 0);
    return PBRClearCoatConfiguration;
}(MaterialPluginBase));

/**
 * @hidden
 */
var MaterialIridescenceDefines = /** @class */ (function (_super) {
    __extends(MaterialIridescenceDefines, _super);
    function MaterialIridescenceDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IRIDESCENCE = false;
        _this.IRIDESCENCE_TEXTURE = false;
        _this.IRIDESCENCE_TEXTUREDIRECTUV = 0;
        _this.IRIDESCENCE_THICKNESS_TEXTURE = false;
        _this.IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV = 0;
        _this.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE = false;
        return _this;
    }
    return MaterialIridescenceDefines;
}(MaterialDefines));
/**
 * Plugin that implements the iridescence (thin film) component of the PBR material
 */
var PBRIridescenceConfiguration = /** @class */ (function (_super) {
    __extends(PBRIridescenceConfiguration, _super);
    function PBRIridescenceConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "PBRIridescence", 110, new MaterialIridescenceDefines(), addToPluginList) || this;
        _this._isEnabled = false;
        /**
         * Defines if the iridescence is enabled in the material.
         */
        _this.isEnabled = false;
        /**
         * Defines the iridescence layer strength (between 0 and 1) it defaults to 1.
         */
        _this.intensity = 1;
        /**
         * Defines the minimum thickness of the thin-film layer given in nanometers (nm).
         */
        _this.minimumThickness = PBRIridescenceConfiguration._DefaultMinimumThickness;
        /**
         * Defines the maximum thickness of the thin-film layer given in nanometers (nm). This will be the thickness used if not thickness texture has been set.
         */
        _this.maximumThickness = PBRIridescenceConfiguration._DefaultMaximumThickness;
        /**
         * Defines the maximum thickness of the thin-film layer given in nanometers (nm).
         */
        _this.indexOfRefraction = PBRIridescenceConfiguration._DefaultIndexOfRefraction;
        _this._texture = null;
        /**
         * Stores the iridescence intensity in a texture (red channel)
         */
        _this.texture = null;
        _this._thicknessTexture = null;
        /**
         * Stores the iridescence thickness in a texture (green channel)
         */
        _this.thicknessTexture = null;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        return _this;
    }
    /** @hidden */
    PBRIridescenceConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    PBRIridescenceConfiguration.prototype.isReadyForSubMesh = function (defines, scene) {
        if (!this._isEnabled) {
            return true;
        }
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this._texture && MaterialFlags.IridescenceTextureEnabled) {
                    if (!this._texture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._thicknessTexture && MaterialFlags.IridescenceTextureEnabled) {
                    if (!this._thicknessTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PBRIridescenceConfiguration.prototype.prepareDefinesBeforeAttributes = function (defines, scene) {
        var _a;
        if (this._isEnabled) {
            defines.IRIDESCENCE = true;
            defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE =
                this._texture !== null && this._texture._texture === ((_a = this._thicknessTexture) === null || _a === void 0 ? void 0 : _a._texture) && this._texture.checkTransformsAreIdentical(this._thicknessTexture);
            if (defines._areTexturesDirty) {
                if (scene.texturesEnabled) {
                    if (this._texture && MaterialFlags.IridescenceTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._texture, defines, "IRIDESCENCE_TEXTURE");
                    }
                    else {
                        defines.IRIDESCENCE_TEXTURE = false;
                    }
                    if (!defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE && this._thicknessTexture && MaterialFlags.IridescenceTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._thicknessTexture, defines, "IRIDESCENCE_THICKNESS_TEXTURE");
                    }
                    else {
                        defines.IRIDESCENCE_THICKNESS_TEXTURE = false;
                    }
                }
            }
        }
        else {
            defines.IRIDESCENCE = false;
            defines.IRIDESCENCE_TEXTURE = false;
            defines.IRIDESCENCE_THICKNESS_TEXTURE = false;
            defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE = false;
        }
    };
    PBRIridescenceConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene, engine, subMesh) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this._isEnabled) {
            return;
        }
        var defines = subMesh.materialDefines;
        var isFrozen = this._material.isFrozen;
        var identicalTextures = defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (identicalTextures && MaterialFlags.IridescenceTextureEnabled) {
                uniformBuffer.updateFloat4("vIridescenceInfos", this._texture.coordinatesIndex, this._texture.level, -1, -1);
                MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "iridescence");
            }
            else if ((this._texture || this._thicknessTexture) && MaterialFlags.IridescenceTextureEnabled) {
                uniformBuffer.updateFloat4("vIridescenceInfos", (_b = (_a = this._texture) === null || _a === void 0 ? void 0 : _a.coordinatesIndex) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this._texture) === null || _c === void 0 ? void 0 : _c.level) !== null && _d !== void 0 ? _d : 0, (_f = (_e = this._thicknessTexture) === null || _e === void 0 ? void 0 : _e.coordinatesIndex) !== null && _f !== void 0 ? _f : 0, (_h = (_g = this._thicknessTexture) === null || _g === void 0 ? void 0 : _g.level) !== null && _h !== void 0 ? _h : 0);
                if (this._texture) {
                    MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "iridescence");
                }
                if (this._thicknessTexture && !identicalTextures && !defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE) {
                    MaterialHelper.BindTextureMatrix(this._thicknessTexture, uniformBuffer, "iridescenceThickness");
                }
            }
            // Clear Coat General params
            uniformBuffer.updateFloat4("vIridescenceParams", this.intensity, this.indexOfRefraction, this.minimumThickness, this.maximumThickness);
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._texture && MaterialFlags.IridescenceTextureEnabled) {
                uniformBuffer.setTexture("iridescenceSampler", this._texture);
            }
            if (this._thicknessTexture && !identicalTextures && !defines.IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE && MaterialFlags.IridescenceTextureEnabled) {
                uniformBuffer.setTexture("iridescenceThicknessSampler", this._thicknessTexture);
            }
        }
    };
    PBRIridescenceConfiguration.prototype.hasTexture = function (texture) {
        if (this._texture === texture) {
            return true;
        }
        if (this._thicknessTexture === texture) {
            return true;
        }
        return false;
    };
    PBRIridescenceConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._texture) {
            activeTextures.push(this._texture);
        }
        if (this._thicknessTexture) {
            activeTextures.push(this._thicknessTexture);
        }
    };
    PBRIridescenceConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
            animatables.push(this._texture);
        }
        if (this._thicknessTexture && this._thicknessTexture.animations && this._thicknessTexture.animations.length > 0) {
            animatables.push(this._thicknessTexture);
        }
    };
    PBRIridescenceConfiguration.prototype.dispose = function (forceDisposeTextures) {
        var _a, _b;
        if (forceDisposeTextures) {
            (_a = this._texture) === null || _a === void 0 ? void 0 : _a.dispose();
            (_b = this._thicknessTexture) === null || _b === void 0 ? void 0 : _b.dispose();
        }
    };
    PBRIridescenceConfiguration.prototype.getClassName = function () {
        return "PBRIridescenceConfiguration";
    };
    PBRIridescenceConfiguration.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        if (defines.IRIDESCENCE) {
            fallbacks.addFallback(currentRank++, "IRIDESCENCE");
        }
        return currentRank;
    };
    PBRIridescenceConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("iridescenceSampler", "iridescenceThicknessSampler");
    };
    PBRIridescenceConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vIridescenceParams", size: 4, type: "vec4" },
                { name: "vIridescenceInfos", size: 4, type: "vec4" },
                { name: "iridescenceMatrix", size: 16, type: "mat4" },
                { name: "iridescenceThicknessMatrix", size: 16, type: "mat4" },
            ],
        };
    };
    /**
     * The default minimum thickness of the thin-film layer given in nanometers (nm).
     * Defaults to 100 nm.
     * @hidden
     */
    PBRIridescenceConfiguration._DefaultMinimumThickness = 100;
    /**
     * The default maximum thickness of the thin-film layer given in nanometers (nm).
     * Defaults to 400 nm.
     * @hidden
     */
    PBRIridescenceConfiguration._DefaultMaximumThickness = 400;
    /**
     * The default index of refraction of the thin-film layer.
     * Defaults to 1.3
     * @hidden
     */
    PBRIridescenceConfiguration._DefaultIndexOfRefraction = 1.3;
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRIridescenceConfiguration.prototype, "isEnabled", void 0);
    __decorate([
        serialize()
    ], PBRIridescenceConfiguration.prototype, "intensity", void 0);
    __decorate([
        serialize()
    ], PBRIridescenceConfiguration.prototype, "minimumThickness", void 0);
    __decorate([
        serialize()
    ], PBRIridescenceConfiguration.prototype, "maximumThickness", void 0);
    __decorate([
        serialize()
    ], PBRIridescenceConfiguration.prototype, "indexOfRefraction", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRIridescenceConfiguration.prototype, "texture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRIridescenceConfiguration.prototype, "thicknessTexture", void 0);
    return PBRIridescenceConfiguration;
}(MaterialPluginBase));

/**
 * @hidden
 */
var MaterialAnisotropicDefines = /** @class */ (function (_super) {
    __extends(MaterialAnisotropicDefines, _super);
    function MaterialAnisotropicDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ANISOTROPIC = false;
        _this.ANISOTROPIC_TEXTURE = false;
        _this.ANISOTROPIC_TEXTUREDIRECTUV = 0;
        _this.MAINUV1 = false;
        return _this;
    }
    return MaterialAnisotropicDefines;
}(MaterialDefines));
/**
 * Plugin that implements the anisotropic component of the PBR material
 */
var PBRAnisotropicConfiguration = /** @class */ (function (_super) {
    __extends(PBRAnisotropicConfiguration, _super);
    function PBRAnisotropicConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "PBRAnisotropic", 110, new MaterialAnisotropicDefines(), addToPluginList) || this;
        _this._isEnabled = false;
        /**
         * Defines if the anisotropy is enabled in the material.
         */
        _this.isEnabled = false;
        /**
         * Defines the anisotropy strength (between 0 and 1) it defaults to 1.
         */
        _this.intensity = 1;
        /**
         * Defines if the effect is along the tangents, bitangents or in between.
         * By default, the effect is "stretching" the highlights along the tangents.
         */
        _this.direction = new Vector2(1, 0);
        _this._texture = null;
        /**
         * Stores the anisotropy values in a texture.
         * rg is direction (like normal from -1 to 1)
         * b is a intensity
         */
        _this.texture = null;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        return _this;
    }
    /** @hidden */
    PBRAnisotropicConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    PBRAnisotropicConfiguration.prototype.isReadyForSubMesh = function (defines, scene) {
        if (!this._isEnabled) {
            return true;
        }
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this._texture && MaterialFlags.AnisotropicTextureEnabled) {
                    if (!this._texture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PBRAnisotropicConfiguration.prototype.prepareDefinesBeforeAttributes = function (defines, scene, mesh) {
        if (this._isEnabled) {
            defines.ANISOTROPIC = this._isEnabled;
            if (this._isEnabled && !mesh.isVerticesDataPresent(VertexBuffer.TangentKind)) {
                defines._needUVs = true;
                defines.MAINUV1 = true;
            }
            if (defines._areTexturesDirty) {
                if (scene.texturesEnabled) {
                    if (this._texture && MaterialFlags.AnisotropicTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._texture, defines, "ANISOTROPIC_TEXTURE");
                    }
                    else {
                        defines.ANISOTROPIC_TEXTURE = false;
                    }
                }
            }
        }
        else {
            defines.ANISOTROPIC = false;
            defines.ANISOTROPIC_TEXTURE = false;
        }
    };
    PBRAnisotropicConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene) {
        if (!this._isEnabled) {
            return;
        }
        var isFrozen = this._material.isFrozen;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (this._texture && MaterialFlags.AnisotropicTextureEnabled) {
                uniformBuffer.updateFloat2("vAnisotropyInfos", this._texture.coordinatesIndex, this._texture.level);
                MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "anisotropy");
            }
            // Anisotropy
            uniformBuffer.updateFloat3("vAnisotropy", this.direction.x, this.direction.y, this.intensity);
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._texture && MaterialFlags.AnisotropicTextureEnabled) {
                uniformBuffer.setTexture("anisotropySampler", this._texture);
            }
        }
    };
    PBRAnisotropicConfiguration.prototype.hasTexture = function (texture) {
        if (this._texture === texture) {
            return true;
        }
        return false;
    };
    PBRAnisotropicConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._texture) {
            activeTextures.push(this._texture);
        }
    };
    PBRAnisotropicConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
            animatables.push(this._texture);
        }
    };
    PBRAnisotropicConfiguration.prototype.dispose = function (forceDisposeTextures) {
        if (forceDisposeTextures) {
            if (this._texture) {
                this._texture.dispose();
            }
        }
    };
    PBRAnisotropicConfiguration.prototype.getClassName = function () {
        return "PBRAnisotropicConfiguration";
    };
    PBRAnisotropicConfiguration.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        if (defines.ANISOTROPIC) {
            fallbacks.addFallback(currentRank++, "ANISOTROPIC");
        }
        return currentRank;
    };
    PBRAnisotropicConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("anisotropySampler");
    };
    PBRAnisotropicConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vAnisotropy", size: 3, type: "vec3" },
                { name: "vAnisotropyInfos", size: 2, type: "vec2" },
                { name: "anisotropyMatrix", size: 16, type: "mat4" },
            ],
        };
    };
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRAnisotropicConfiguration.prototype, "isEnabled", void 0);
    __decorate([
        serialize()
    ], PBRAnisotropicConfiguration.prototype, "intensity", void 0);
    __decorate([
        serializeAsVector2()
    ], PBRAnisotropicConfiguration.prototype, "direction", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRAnisotropicConfiguration.prototype, "texture", void 0);
    return PBRAnisotropicConfiguration;
}(MaterialPluginBase));

/**
 * @hidden
 */
var MaterialSheenDefines = /** @class */ (function (_super) {
    __extends(MaterialSheenDefines, _super);
    function MaterialSheenDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SHEEN = false;
        _this.SHEEN_TEXTURE = false;
        _this.SHEEN_GAMMATEXTURE = false;
        _this.SHEEN_TEXTURE_ROUGHNESS = false;
        _this.SHEEN_TEXTUREDIRECTUV = 0;
        _this.SHEEN_TEXTURE_ROUGHNESSDIRECTUV = 0;
        _this.SHEEN_LINKWITHALBEDO = false;
        _this.SHEEN_ROUGHNESS = false;
        _this.SHEEN_ALBEDOSCALING = false;
        _this.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE = false;
        _this.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL = false;
        return _this;
    }
    return MaterialSheenDefines;
}(MaterialDefines));
/**
 * Plugin that implements the sheen component of the PBR material.
 */
var PBRSheenConfiguration = /** @class */ (function (_super) {
    __extends(PBRSheenConfiguration, _super);
    function PBRSheenConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "Sheen", 120, new MaterialSheenDefines(), addToPluginList) || this;
        _this._isEnabled = false;
        /**
         * Defines if the material uses sheen.
         */
        _this.isEnabled = false;
        _this._linkSheenWithAlbedo = false;
        /**
         * Defines if the sheen is linked to the sheen color.
         */
        _this.linkSheenWithAlbedo = false;
        /**
         * Defines the sheen intensity.
         */
        _this.intensity = 1;
        /**
         * Defines the sheen color.
         */
        _this.color = Color3.White();
        _this._texture = null;
        /**
         * Stores the sheen tint values in a texture.
         * rgb is tint
         * a is a intensity or roughness if the roughness property has been defined and useRoughnessFromTexture is true (in that case, textureRoughness won't be used)
         * If the roughness property has been defined and useRoughnessFromTexture is false then the alpha channel is not used to modulate roughness
         */
        _this.texture = null;
        _this._useRoughnessFromMainTexture = true;
        /**
         * Indicates that the alpha channel of the texture property will be used for roughness.
         * Has no effect if the roughness (and texture!) property is not defined
         */
        _this.useRoughnessFromMainTexture = true;
        _this._roughness = null;
        /**
         * Defines the sheen roughness.
         * It is not taken into account if linkSheenWithAlbedo is true.
         * To stay backward compatible, material roughness is used instead if sheen roughness = null
         */
        _this.roughness = null;
        _this._textureRoughness = null;
        /**
         * Stores the sheen roughness in a texture.
         * alpha channel is the roughness. This texture won't be used if the texture property is not empty and useRoughnessFromTexture is true
         */
        _this.textureRoughness = null;
        _this._albedoScaling = false;
        /**
         * If true, the sheen effect is layered above the base BRDF with the albedo-scaling technique.
         * It allows the strength of the sheen effect to not depend on the base color of the material,
         * making it easier to setup and tweak the effect
         */
        _this.albedoScaling = false;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        return _this;
    }
    /** @hidden */
    PBRSheenConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    PBRSheenConfiguration.prototype.isReadyForSubMesh = function (defines, scene) {
        if (!this._isEnabled) {
            return true;
        }
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this._texture && MaterialFlags.SheenTextureEnabled) {
                    if (!this._texture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._textureRoughness && MaterialFlags.SheenTextureEnabled) {
                    if (!this._textureRoughness.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PBRSheenConfiguration.prototype.prepareDefinesBeforeAttributes = function (defines, scene) {
        var _a;
        if (this._isEnabled) {
            defines.SHEEN = true;
            defines.SHEEN_LINKWITHALBEDO = this._linkSheenWithAlbedo;
            defines.SHEEN_ROUGHNESS = this._roughness !== null;
            defines.SHEEN_ALBEDOSCALING = this._albedoScaling;
            defines.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE = this._useRoughnessFromMainTexture;
            defines.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL =
                this._texture !== null && this._texture._texture === ((_a = this._textureRoughness) === null || _a === void 0 ? void 0 : _a._texture) && this._texture.checkTransformsAreIdentical(this._textureRoughness);
            if (defines._areTexturesDirty) {
                if (scene.texturesEnabled) {
                    if (this._texture && MaterialFlags.SheenTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._texture, defines, "SHEEN_TEXTURE");
                        defines.SHEEN_GAMMATEXTURE = this._texture.gammaSpace;
                    }
                    else {
                        defines.SHEEN_TEXTURE = false;
                    }
                    if (this._textureRoughness && MaterialFlags.SheenTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._textureRoughness, defines, "SHEEN_TEXTURE_ROUGHNESS");
                    }
                    else {
                        defines.SHEEN_TEXTURE_ROUGHNESS = false;
                    }
                }
            }
        }
        else {
            defines.SHEEN = false;
            defines.SHEEN_TEXTURE = false;
            defines.SHEEN_TEXTURE_ROUGHNESS = false;
            defines.SHEEN_LINKWITHALBEDO = false;
            defines.SHEEN_ROUGHNESS = false;
            defines.SHEEN_ALBEDOSCALING = false;
            defines.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE = false;
            defines.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL = false;
        }
    };
    PBRSheenConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene, engine, subMesh) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this._isEnabled) {
            return;
        }
        var defines = subMesh.materialDefines;
        var isFrozen = this._material.isFrozen;
        var identicalTextures = defines.SHEEN_TEXTURE_ROUGHNESS_IDENTICAL;
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (identicalTextures && MaterialFlags.SheenTextureEnabled) {
                uniformBuffer.updateFloat4("vSheenInfos", this._texture.coordinatesIndex, this._texture.level, -1, -1);
                MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "sheen");
            }
            else if ((this._texture || this._textureRoughness) && MaterialFlags.SheenTextureEnabled) {
                uniformBuffer.updateFloat4("vSheenInfos", (_b = (_a = this._texture) === null || _a === void 0 ? void 0 : _a.coordinatesIndex) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this._texture) === null || _c === void 0 ? void 0 : _c.level) !== null && _d !== void 0 ? _d : 0, (_f = (_e = this._textureRoughness) === null || _e === void 0 ? void 0 : _e.coordinatesIndex) !== null && _f !== void 0 ? _f : 0, (_h = (_g = this._textureRoughness) === null || _g === void 0 ? void 0 : _g.level) !== null && _h !== void 0 ? _h : 0);
                if (this._texture) {
                    MaterialHelper.BindTextureMatrix(this._texture, uniformBuffer, "sheen");
                }
                if (this._textureRoughness && !identicalTextures && !defines.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE) {
                    MaterialHelper.BindTextureMatrix(this._textureRoughness, uniformBuffer, "sheenRoughness");
                }
            }
            // Sheen
            uniformBuffer.updateFloat4("vSheenColor", this.color.r, this.color.g, this.color.b, this.intensity);
            if (this._roughness !== null) {
                uniformBuffer.updateFloat("vSheenRoughness", this._roughness);
            }
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._texture && MaterialFlags.SheenTextureEnabled) {
                uniformBuffer.setTexture("sheenSampler", this._texture);
            }
            if (this._textureRoughness && !identicalTextures && !defines.SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE && MaterialFlags.SheenTextureEnabled) {
                uniformBuffer.setTexture("sheenRoughnessSampler", this._textureRoughness);
            }
        }
    };
    PBRSheenConfiguration.prototype.hasTexture = function (texture) {
        if (this._texture === texture) {
            return true;
        }
        if (this._textureRoughness === texture) {
            return true;
        }
        return false;
    };
    PBRSheenConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._texture) {
            activeTextures.push(this._texture);
        }
        if (this._textureRoughness) {
            activeTextures.push(this._textureRoughness);
        }
    };
    PBRSheenConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._texture && this._texture.animations && this._texture.animations.length > 0) {
            animatables.push(this._texture);
        }
        if (this._textureRoughness && this._textureRoughness.animations && this._textureRoughness.animations.length > 0) {
            animatables.push(this._textureRoughness);
        }
    };
    PBRSheenConfiguration.prototype.dispose = function (forceDisposeTextures) {
        var _a, _b;
        if (forceDisposeTextures) {
            (_a = this._texture) === null || _a === void 0 ? void 0 : _a.dispose();
            (_b = this._textureRoughness) === null || _b === void 0 ? void 0 : _b.dispose();
        }
    };
    PBRSheenConfiguration.prototype.getClassName = function () {
        return "PBRSheenConfiguration";
    };
    PBRSheenConfiguration.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        if (defines.SHEEN) {
            fallbacks.addFallback(currentRank++, "SHEEN");
        }
        return currentRank;
    };
    PBRSheenConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("sheenSampler", "sheenRoughnessSampler");
    };
    PBRSheenConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vSheenColor", size: 4, type: "vec4" },
                { name: "vSheenRoughness", size: 1, type: "float" },
                { name: "vSheenInfos", size: 4, type: "vec4" },
                { name: "sheenMatrix", size: 16, type: "mat4" },
                { name: "sheenRoughnessMatrix", size: 16, type: "mat4" },
            ],
        };
    };
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "isEnabled", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "linkSheenWithAlbedo", void 0);
    __decorate([
        serialize()
    ], PBRSheenConfiguration.prototype, "intensity", void 0);
    __decorate([
        serializeAsColor3()
    ], PBRSheenConfiguration.prototype, "color", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "texture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "useRoughnessFromMainTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "roughness", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "textureRoughness", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSheenConfiguration.prototype, "albedoScaling", void 0);
    return PBRSheenConfiguration;
}(MaterialPluginBase));

/**
 * @hidden
 */
var MaterialSubSurfaceDefines = /** @class */ (function (_super) {
    __extends(MaterialSubSurfaceDefines, _super);
    function MaterialSubSurfaceDefines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SUBSURFACE = false;
        _this.SS_REFRACTION = false;
        _this.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE = false;
        _this.SS_TRANSLUCENCY = false;
        _this.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE = false;
        _this.SS_SCATTERING = false;
        _this.SS_THICKNESSANDMASK_TEXTURE = false;
        _this.SS_THICKNESSANDMASK_TEXTUREDIRECTUV = 0;
        _this.SS_HAS_THICKNESS = false;
        _this.SS_REFRACTIONINTENSITY_TEXTURE = false;
        _this.SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV = 0;
        _this.SS_TRANSLUCENCYINTENSITY_TEXTURE = false;
        _this.SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV = 0;
        _this.SS_REFRACTIONMAP_3D = false;
        _this.SS_REFRACTIONMAP_OPPOSITEZ = false;
        _this.SS_LODINREFRACTIONALPHA = false;
        _this.SS_GAMMAREFRACTION = false;
        _this.SS_RGBDREFRACTION = false;
        _this.SS_LINEARSPECULARREFRACTION = false;
        _this.SS_LINKREFRACTIONTOTRANSPARENCY = false;
        _this.SS_ALBEDOFORREFRACTIONTINT = false;
        _this.SS_ALBEDOFORTRANSLUCENCYTINT = false;
        _this.SS_USE_LOCAL_REFRACTIONMAP_CUBIC = false;
        _this.SS_USE_THICKNESS_AS_DEPTH = false;
        _this.SS_MASK_FROM_THICKNESS_TEXTURE = false;
        _this.SS_USE_GLTF_TEXTURES = false;
        return _this;
    }
    return MaterialSubSurfaceDefines;
}(MaterialDefines));
/**
 * Plugin that implements the sub surface component of the PBR material
 */
var PBRSubSurfaceConfiguration = /** @class */ (function (_super) {
    __extends(PBRSubSurfaceConfiguration, _super);
    function PBRSubSurfaceConfiguration(material, addToPluginList) {
        if (addToPluginList === void 0) { addToPluginList = true; }
        var _this = _super.call(this, material, "PBRSubSurface", 130, new MaterialSubSurfaceDefines(), addToPluginList) || this;
        _this._isRefractionEnabled = false;
        /**
         * Defines if the refraction is enabled in the material.
         */
        _this.isRefractionEnabled = false;
        _this._isTranslucencyEnabled = false;
        /**
         * Defines if the translucency is enabled in the material.
         */
        _this.isTranslucencyEnabled = false;
        _this._isScatteringEnabled = false;
        /**
         * Defines if the sub surface scattering is enabled in the material.
         */
        _this.isScatteringEnabled = false;
        _this._scatteringDiffusionProfileIndex = 0;
        /**
         * Defines the refraction intensity of the material.
         * The refraction when enabled replaces the Diffuse part of the material.
         * The intensity helps transitioning between diffuse and refraction.
         */
        _this.refractionIntensity = 1;
        /**
         * Defines the translucency intensity of the material.
         * When translucency has been enabled, this defines how much of the "translucency"
         * is added to the diffuse part of the material.
         */
        _this.translucencyIntensity = 1;
        /**
         * When enabled, transparent surfaces will be tinted with the albedo colour (independent of thickness)
         */
        _this.useAlbedoToTintRefraction = false;
        /**
         * When enabled, translucent surfaces will be tinted with the albedo colour (independent of thickness)
         */
        _this.useAlbedoToTintTranslucency = false;
        _this._thicknessTexture = null;
        /**
         * Stores the average thickness of a mesh in a texture (The texture is holding the values linearly).
         * The red (or green if useGltfStyleTextures=true) channel of the texture should contain the thickness remapped between 0 and 1.
         * 0 would mean minimumThickness
         * 1 would mean maximumThickness
         * The other channels might be use as a mask to vary the different effects intensity.
         */
        _this.thicknessTexture = null;
        _this._refractionTexture = null;
        /**
         * Defines the texture to use for refraction.
         */
        _this.refractionTexture = null;
        /** @hidden */
        _this._indexOfRefraction = 1.5;
        /**
         * Index of refraction of the material base layer.
         * https://en.wikipedia.org/wiki/List_of_refractive_indices
         *
         * This does not only impact refraction but also the Base F0 of Dielectric Materials.
         *
         * From dielectric fresnel rules: F0 = square((iorT - iorI) / (iorT + iorI))
         */
        _this.indexOfRefraction = 1.5;
        _this._volumeIndexOfRefraction = -1.0;
        _this._invertRefractionY = false;
        /**
         * Controls if refraction needs to be inverted on Y. This could be useful for procedural texture.
         */
        _this.invertRefractionY = false;
        /** @hidden */
        _this._linkRefractionWithTransparency = false;
        /**
         * This parameters will make the material used its opacity to control how much it is refracting against not.
         * Materials half opaque for instance using refraction could benefit from this control.
         */
        _this.linkRefractionWithTransparency = false;
        /**
         * Defines the minimum thickness stored in the thickness map.
         * If no thickness map is defined, this value will be used to simulate thickness.
         */
        _this.minimumThickness = 0;
        /**
         * Defines the maximum thickness stored in the thickness map.
         */
        _this.maximumThickness = 1;
        /**
         * Defines that the thickness should be used as a measure of the depth volume.
         */
        _this.useThicknessAsDepth = false;
        /**
         * Defines the volume tint of the material.
         * This is used for both translucency and scattering.
         */
        _this.tintColor = Color3.White();
        /**
         * Defines the distance at which the tint color should be found in the media.
         * This is used for refraction only.
         */
        _this.tintColorAtDistance = 1;
        /**
         * Defines how far each channel transmit through the media.
         * It is defined as a color to simplify it selection.
         */
        _this.diffusionDistance = Color3.White();
        _this._useMaskFromThicknessTexture = false;
        /**
         * Stores the intensity of the different subsurface effects in the thickness texture.
         * Note that if refractionIntensityTexture and/or translucencyIntensityTexture is provided it takes precedence over thicknessTexture + useMaskFromThicknessTexture
         * * the green (red if useGltfStyleTextures = true) channel is the refraction intensity.
         * * the blue channel is the translucency intensity.
         */
        _this.useMaskFromThicknessTexture = false;
        _this._refractionIntensityTexture = null;
        /**
         * Stores the intensity of the refraction. If provided, it takes precedence over thicknessTexture + useMaskFromThicknessTexture
         * * the green (red if useGltfStyleTextures = true) channel is the refraction intensity.
         */
        _this.refractionIntensityTexture = null;
        _this._translucencyIntensityTexture = null;
        /**
         * Stores the intensity of the translucency. If provided, it takes precedence over thicknessTexture + useMaskFromThicknessTexture
         * * the blue channel is the translucency intensity.
         */
        _this.translucencyIntensityTexture = null;
        _this._useGltfStyleTextures = false;
        /**
         * Use channels layout used by glTF:
         * * thicknessTexture: the green (instead of red) channel is the thickness
         * * thicknessTexture/refractionIntensityTexture: the red (instead of green) channel is the refraction intensity
         * * thicknessTexture/translucencyIntensityTexture: no change, use the blue channel for the translucency intensity
         */
        _this.useGltfStyleTextures = false;
        _this._scene = material.getScene();
        _this.registerForExtraEvents = true;
        _this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[1];
        _this._internalMarkScenePrePassDirty = material._dirtyCallbacks[32];
        return _this;
    }
    Object.defineProperty(PBRSubSurfaceConfiguration.prototype, "scatteringDiffusionProfile", {
        /**
         * Diffusion profile for subsurface scattering.
         * Useful for better scattering in the skins or foliages.
         */
        get: function () {
            if (!this._scene.subSurfaceConfiguration) {
                return null;
            }
            return this._scene.subSurfaceConfiguration.ssDiffusionProfileColors[this._scatteringDiffusionProfileIndex];
        },
        set: function (c) {
            if (!this._scene.enableSubSurfaceForPrePass()) {
                // Not supported
                return;
            }
            // addDiffusionProfile automatically checks for doubles
            if (c) {
                this._scatteringDiffusionProfileIndex = this._scene.subSurfaceConfiguration.addDiffusionProfile(c);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRSubSurfaceConfiguration.prototype, "volumeIndexOfRefraction", {
        /**
         * Index of refraction of the material's volume.
         * https://en.wikipedia.org/wiki/List_of_refractive_indices
         *
         * This ONLY impacts refraction. If not provided or given a non-valid value,
         * the volume will use the same IOR as the surface.
         */
        get: function () {
            if (this._volumeIndexOfRefraction >= 1.0) {
                return this._volumeIndexOfRefraction;
            }
            return this._indexOfRefraction;
        },
        set: function (value) {
            if (value >= 1.0) {
                this._volumeIndexOfRefraction = value;
            }
            else {
                this._volumeIndexOfRefraction = -1.0;
            }
        },
        enumerable: false,
        configurable: true
    });
    /** @hidden */
    PBRSubSurfaceConfiguration.prototype._markAllSubMeshesAsTexturesDirty = function () {
        this._enable(this._isRefractionEnabled || this._isTranslucencyEnabled || this._isScatteringEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    };
    /** @hidden */
    PBRSubSurfaceConfiguration.prototype._markScenePrePassDirty = function () {
        this._internalMarkAllSubMeshesAsTexturesDirty();
        this._internalMarkScenePrePassDirty();
    };
    PBRSubSurfaceConfiguration.prototype.isReadyForSubMesh = function (defines, scene) {
        if (!this._isRefractionEnabled && !this._isTranslucencyEnabled && !this._isScatteringEnabled) {
            return true;
        }
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this._thicknessTexture && MaterialFlags.ThicknessTextureEnabled) {
                    if (!this._thicknessTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                var refractionTexture = this._getRefractionTexture(scene);
                if (refractionTexture && MaterialFlags.RefractionTextureEnabled) {
                    if (!refractionTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    PBRSubSurfaceConfiguration.prototype.prepareDefinesBeforeAttributes = function (defines, scene) {
        if (!this._isRefractionEnabled && !this._isTranslucencyEnabled && !this._isScatteringEnabled) {
            defines.SUBSURFACE = false;
            defines.SS_TRANSLUCENCY = false;
            defines.SS_SCATTERING = false;
            defines.SS_REFRACTION = false;
            return;
        }
        if (defines._areTexturesDirty) {
            defines.SUBSURFACE = true;
            defines.SS_TRANSLUCENCY = this._isTranslucencyEnabled;
            defines.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE = false;
            defines.SS_SCATTERING = this._isScatteringEnabled;
            defines.SS_THICKNESSANDMASK_TEXTURE = false;
            defines.SS_REFRACTIONINTENSITY_TEXTURE = false;
            defines.SS_TRANSLUCENCYINTENSITY_TEXTURE = false;
            defines.SS_HAS_THICKNESS = false;
            defines.SS_MASK_FROM_THICKNESS_TEXTURE = false;
            defines.SS_USE_GLTF_TEXTURES = false;
            defines.SS_REFRACTION = false;
            defines.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE = false;
            defines.SS_REFRACTIONMAP_3D = false;
            defines.SS_GAMMAREFRACTION = false;
            defines.SS_RGBDREFRACTION = false;
            defines.SS_LINEARSPECULARREFRACTION = false;
            defines.SS_REFRACTIONMAP_OPPOSITEZ = false;
            defines.SS_LODINREFRACTIONALPHA = false;
            defines.SS_LINKREFRACTIONTOTRANSPARENCY = false;
            defines.SS_ALBEDOFORREFRACTIONTINT = false;
            defines.SS_ALBEDOFORTRANSLUCENCYTINT = false;
            defines.SS_USE_LOCAL_REFRACTIONMAP_CUBIC = false;
            defines.SS_USE_THICKNESS_AS_DEPTH = false;
            var refractionIntensityTextureIsThicknessTexture = !!this._thicknessTexture &&
                !!this._refractionIntensityTexture &&
                this._refractionIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture) &&
                this._refractionIntensityTexture._texture === this._thicknessTexture._texture;
            var translucencyIntensityTextureIsThicknessTexture = !!this._thicknessTexture &&
                !!this._translucencyIntensityTexture &&
                this._translucencyIntensityTexture.checkTransformsAreIdentical(this._thicknessTexture) &&
                this._translucencyIntensityTexture._texture === this._thicknessTexture._texture;
            // if true, it means the refraction/translucency textures are the same than the thickness texture so there's no need to pass them to the shader, only thicknessTexture
            var useOnlyThicknessTexture = (refractionIntensityTextureIsThicknessTexture || !this._refractionIntensityTexture) &&
                (translucencyIntensityTextureIsThicknessTexture || !this._translucencyIntensityTexture);
            if (defines._areTexturesDirty) {
                if (scene.texturesEnabled) {
                    if (this._thicknessTexture && MaterialFlags.ThicknessTextureEnabled) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._thicknessTexture, defines, "SS_THICKNESSANDMASK_TEXTURE");
                    }
                    if (this._refractionIntensityTexture && MaterialFlags.RefractionIntensityTextureEnabled && !useOnlyThicknessTexture) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._refractionIntensityTexture, defines, "SS_REFRACTIONINTENSITY_TEXTURE");
                    }
                    if (this._translucencyIntensityTexture && MaterialFlags.TranslucencyIntensityTextureEnabled && !useOnlyThicknessTexture) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._translucencyIntensityTexture, defines, "SS_TRANSLUCENCYINTENSITY_TEXTURE");
                    }
                }
            }
            defines.SS_HAS_THICKNESS = this.maximumThickness - this.minimumThickness !== 0.0;
            defines.SS_MASK_FROM_THICKNESS_TEXTURE =
                (this._useMaskFromThicknessTexture || !!this._refractionIntensityTexture || !!this._translucencyIntensityTexture) && useOnlyThicknessTexture;
            defines.SS_USE_GLTF_TEXTURES = this._useGltfStyleTextures;
            defines.SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE = (this._useMaskFromThicknessTexture || !!this._refractionIntensityTexture) && useOnlyThicknessTexture;
            defines.SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE = (this._useMaskFromThicknessTexture || !!this._translucencyIntensityTexture) && useOnlyThicknessTexture;
            if (this._isRefractionEnabled) {
                if (scene.texturesEnabled) {
                    var refractionTexture = this._getRefractionTexture(scene);
                    if (refractionTexture && MaterialFlags.RefractionTextureEnabled) {
                        defines.SS_REFRACTION = true;
                        defines.SS_REFRACTIONMAP_3D = refractionTexture.isCube;
                        defines.SS_GAMMAREFRACTION = refractionTexture.gammaSpace;
                        defines.SS_RGBDREFRACTION = refractionTexture.isRGBD;
                        defines.SS_LINEARSPECULARREFRACTION = refractionTexture.linearSpecularLOD;
                        defines.SS_REFRACTIONMAP_OPPOSITEZ = refractionTexture.invertZ;
                        defines.SS_LODINREFRACTIONALPHA = refractionTexture.lodLevelInAlpha;
                        defines.SS_LINKREFRACTIONTOTRANSPARENCY = this._linkRefractionWithTransparency;
                        defines.SS_ALBEDOFORREFRACTIONTINT = this.useAlbedoToTintRefraction;
                        defines.SS_USE_LOCAL_REFRACTIONMAP_CUBIC = refractionTexture.isCube && refractionTexture.boundingBoxSize;
                        defines.SS_USE_THICKNESS_AS_DEPTH = this.useThicknessAsDepth;
                    }
                }
            }
            if (this._isTranslucencyEnabled) {
                defines.SS_ALBEDOFORTRANSLUCENCYTINT = this.useAlbedoToTintTranslucency;
            }
        }
    };
    /**
     * Binds the material data (this function is called even if mustRebind() returns false)
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine defines the engine the material belongs to.
     * @param subMesh the submesh to bind data for
     */
    PBRSubSurfaceConfiguration.prototype.hardBindForSubMesh = function (uniformBuffer, scene, engine, subMesh) {
        if (!this._isRefractionEnabled && !this._isTranslucencyEnabled && !this._isScatteringEnabled) {
            return;
        }
        subMesh.getRenderingMesh().getWorldMatrix().decompose(TmpVectors.Vector3[0]);
        var thicknessScale = Math.max(Math.abs(TmpVectors.Vector3[0].x), Math.abs(TmpVectors.Vector3[0].y), Math.abs(TmpVectors.Vector3[0].z));
        uniformBuffer.updateFloat2("vThicknessParam", this.minimumThickness * thicknessScale, (this.maximumThickness - this.minimumThickness) * thicknessScale);
    };
    PBRSubSurfaceConfiguration.prototype.bindForSubMesh = function (uniformBuffer, scene, engine, subMesh) {
        if (!this._isRefractionEnabled && !this._isTranslucencyEnabled && !this._isScatteringEnabled) {
            return;
        }
        var defines = subMesh.materialDefines;
        var isFrozen = this._material.isFrozen;
        var realTimeFiltering = this._material.realTimeFiltering;
        var lodBasedMicrosurface = defines.LODBASEDMICROSFURACE;
        var refractionTexture = this._getRefractionTexture(scene);
        if (!uniformBuffer.useUbo || !isFrozen || !uniformBuffer.isSync) {
            if (this._thicknessTexture && MaterialFlags.ThicknessTextureEnabled) {
                uniformBuffer.updateFloat2("vThicknessInfos", this._thicknessTexture.coordinatesIndex, this._thicknessTexture.level);
                MaterialHelper.BindTextureMatrix(this._thicknessTexture, uniformBuffer, "thickness");
            }
            if (this._refractionIntensityTexture && MaterialFlags.RefractionIntensityTextureEnabled && defines.SS_REFRACTIONINTENSITY_TEXTURE) {
                uniformBuffer.updateFloat2("vRefractionIntensityInfos", this._refractionIntensityTexture.coordinatesIndex, this._refractionIntensityTexture.level);
                MaterialHelper.BindTextureMatrix(this._refractionIntensityTexture, uniformBuffer, "refractionIntensity");
            }
            if (this._translucencyIntensityTexture && MaterialFlags.TranslucencyIntensityTextureEnabled && defines.SS_TRANSLUCENCYINTENSITY_TEXTURE) {
                uniformBuffer.updateFloat2("vTranslucencyIntensityInfos", this._translucencyIntensityTexture.coordinatesIndex, this._translucencyIntensityTexture.level);
                MaterialHelper.BindTextureMatrix(this._translucencyIntensityTexture, uniformBuffer, "translucencyIntensity");
            }
            if (refractionTexture && MaterialFlags.RefractionTextureEnabled) {
                uniformBuffer.updateMatrix("refractionMatrix", refractionTexture.getReflectionTextureMatrix());
                var depth = 1.0;
                if (!refractionTexture.isCube) {
                    if (refractionTexture.depth) {
                        depth = refractionTexture.depth;
                    }
                }
                var width = refractionTexture.getSize().width;
                var refractionIor = this.volumeIndexOfRefraction;
                uniformBuffer.updateFloat4("vRefractionInfos", refractionTexture.level, 1 / refractionIor, depth, this._invertRefractionY ? -1 : 1);
                uniformBuffer.updateFloat4("vRefractionMicrosurfaceInfos", width, refractionTexture.lodGenerationScale, refractionTexture.lodGenerationOffset, 1.0 / this.indexOfRefraction);
                if (realTimeFiltering) {
                    uniformBuffer.updateFloat2("vRefractionFilteringInfo", width, Scalar.Log2(width));
                }
                if (refractionTexture.boundingBoxSize) {
                    var cubeTexture = refractionTexture;
                    uniformBuffer.updateVector3("vRefractionPosition", cubeTexture.boundingBoxPosition);
                    uniformBuffer.updateVector3("vRefractionSize", cubeTexture.boundingBoxSize);
                }
            }
            if (this._isScatteringEnabled) {
                uniformBuffer.updateFloat("scatteringDiffusionProfile", this._scatteringDiffusionProfileIndex);
            }
            uniformBuffer.updateColor3("vDiffusionDistance", this.diffusionDistance);
            uniformBuffer.updateFloat4("vTintColor", this.tintColor.r, this.tintColor.g, this.tintColor.b, Math.max(0.00001, this.tintColorAtDistance));
            uniformBuffer.updateFloat3("vSubSurfaceIntensity", this.refractionIntensity, this.translucencyIntensity, 0);
        }
        // Textures
        if (scene.texturesEnabled) {
            if (this._thicknessTexture && MaterialFlags.ThicknessTextureEnabled) {
                uniformBuffer.setTexture("thicknessSampler", this._thicknessTexture);
            }
            if (this._refractionIntensityTexture && MaterialFlags.RefractionIntensityTextureEnabled && defines.SS_REFRACTIONINTENSITY_TEXTURE) {
                uniformBuffer.setTexture("refractionIntensitySampler", this._refractionIntensityTexture);
            }
            if (this._translucencyIntensityTexture && MaterialFlags.TranslucencyIntensityTextureEnabled && defines.SS_TRANSLUCENCYINTENSITY_TEXTURE) {
                uniformBuffer.setTexture("translucencyIntensitySampler", this._translucencyIntensityTexture);
            }
            if (refractionTexture && MaterialFlags.RefractionTextureEnabled) {
                if (lodBasedMicrosurface) {
                    uniformBuffer.setTexture("refractionSampler", refractionTexture);
                }
                else {
                    uniformBuffer.setTexture("refractionSampler", refractionTexture._lodTextureMid || refractionTexture);
                    uniformBuffer.setTexture("refractionSamplerLow", refractionTexture._lodTextureLow || refractionTexture);
                    uniformBuffer.setTexture("refractionSamplerHigh", refractionTexture._lodTextureHigh || refractionTexture);
                }
            }
        }
    };
    /**
     * Returns the texture used for refraction or null if none is used.
     * @param scene defines the scene the material belongs to.
     * @returns - Refraction texture if present.  If no refraction texture and refraction
     * is linked with transparency, returns environment texture.  Otherwise, returns null.
     */
    PBRSubSurfaceConfiguration.prototype._getRefractionTexture = function (scene) {
        if (this._refractionTexture) {
            return this._refractionTexture;
        }
        if (this._isRefractionEnabled) {
            return scene.environmentTexture;
        }
        return null;
    };
    Object.defineProperty(PBRSubSurfaceConfiguration.prototype, "disableAlphaBlending", {
        /**
         * Returns true if alpha blending should be disabled.
         */
        get: function () {
            return this._isRefractionEnabled && this._linkRefractionWithTransparency;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Fills the list of render target textures.
     * @param renderTargets the list of render targets to update
     */
    PBRSubSurfaceConfiguration.prototype.fillRenderTargetTextures = function (renderTargets) {
        if (MaterialFlags.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
            renderTargets.push(this._refractionTexture);
        }
    };
    PBRSubSurfaceConfiguration.prototype.hasTexture = function (texture) {
        if (this._thicknessTexture === texture) {
            return true;
        }
        if (this._refractionTexture === texture) {
            return true;
        }
        return false;
    };
    PBRSubSurfaceConfiguration.prototype.hasRenderTargetTextures = function () {
        if (MaterialFlags.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget) {
            return true;
        }
        return false;
    };
    PBRSubSurfaceConfiguration.prototype.getActiveTextures = function (activeTextures) {
        if (this._thicknessTexture) {
            activeTextures.push(this._thicknessTexture);
        }
        if (this._refractionTexture) {
            activeTextures.push(this._refractionTexture);
        }
    };
    PBRSubSurfaceConfiguration.prototype.getAnimatables = function (animatables) {
        if (this._thicknessTexture && this._thicknessTexture.animations && this._thicknessTexture.animations.length > 0) {
            animatables.push(this._thicknessTexture);
        }
        if (this._refractionTexture && this._refractionTexture.animations && this._refractionTexture.animations.length > 0) {
            animatables.push(this._refractionTexture);
        }
    };
    PBRSubSurfaceConfiguration.prototype.dispose = function (forceDisposeTextures) {
        if (forceDisposeTextures) {
            if (this._thicknessTexture) {
                this._thicknessTexture.dispose();
            }
            if (this._refractionTexture) {
                this._refractionTexture.dispose();
            }
        }
    };
    PBRSubSurfaceConfiguration.prototype.getClassName = function () {
        return "PBRSubSurfaceConfiguration";
    };
    PBRSubSurfaceConfiguration.prototype.addFallbacks = function (defines, fallbacks, currentRank) {
        if (defines.SS_SCATTERING) {
            fallbacks.addFallback(currentRank++, "SS_SCATTERING");
        }
        if (defines.SS_TRANSLUCENCY) {
            fallbacks.addFallback(currentRank++, "SS_TRANSLUCENCY");
        }
        return currentRank;
    };
    PBRSubSurfaceConfiguration.prototype.getSamplers = function (samplers) {
        samplers.push("thicknessSampler", "refractionIntensitySampler", "translucencyIntensitySampler", "refractionSampler", "refractionSamplerLow", "refractionSamplerHigh");
    };
    PBRSubSurfaceConfiguration.prototype.getUniforms = function () {
        return {
            ubo: [
                { name: "vRefractionMicrosurfaceInfos", size: 4, type: "vec4" },
                { name: "vRefractionFilteringInfo", size: 2, type: "vec2" },
                { name: "vTranslucencyIntensityInfos", size: 2, type: "vec2" },
                { name: "vRefractionInfos", size: 4, type: "vec4" },
                { name: "refractionMatrix", size: 16, type: "mat4" },
                { name: "vThicknessInfos", size: 2, type: "vec2" },
                { name: "vRefractionIntensityInfos", size: 2, type: "vec2" },
                { name: "thicknessMatrix", size: 16, type: "mat4" },
                { name: "refractionIntensityMatrix", size: 16, type: "mat4" },
                { name: "translucencyIntensityMatrix", size: 16, type: "mat4" },
                { name: "vThicknessParam", size: 2, type: "vec2" },
                { name: "vDiffusionDistance", size: 3, type: "vec3" },
                { name: "vTintColor", size: 4, type: "vec4" },
                { name: "vSubSurfaceIntensity", size: 3, type: "vec3" },
                { name: "vRefractionPosition", size: 3, type: "vec3" },
                { name: "vRefractionSize", size: 3, type: "vec3" },
                { name: "scatteringDiffusionProfile", size: 1, type: "float" },
            ],
        };
    };
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "isRefractionEnabled", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "isTranslucencyEnabled", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markScenePrePassDirty")
    ], PBRSubSurfaceConfiguration.prototype, "isScatteringEnabled", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "_scatteringDiffusionProfileIndex", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "refractionIntensity", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "translucencyIntensity", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "useAlbedoToTintRefraction", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "useAlbedoToTintTranslucency", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "thicknessTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "refractionTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "indexOfRefraction", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "_volumeIndexOfRefraction", void 0);
    __decorate([
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "volumeIndexOfRefraction", null);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "invertRefractionY", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "linkRefractionWithTransparency", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "minimumThickness", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "maximumThickness", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "useThicknessAsDepth", void 0);
    __decorate([
        serializeAsColor3()
    ], PBRSubSurfaceConfiguration.prototype, "tintColor", void 0);
    __decorate([
        serialize()
    ], PBRSubSurfaceConfiguration.prototype, "tintColorAtDistance", void 0);
    __decorate([
        serializeAsColor3()
    ], PBRSubSurfaceConfiguration.prototype, "diffusionDistance", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "useMaskFromThicknessTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "refractionIntensityTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "translucencyIntensityTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRSubSurfaceConfiguration.prototype, "useGltfStyleTextures", void 0);
    return PBRSubSurfaceConfiguration;
}(MaterialPluginBase));

var onCreatedEffectParameters = { effect: null, subMesh: null };
/**
 * Manages the defines for the PBR Material.
 * @hidden
 */
var PBRMaterialDefines = /** @class */ (function (_super) {
    __extends(PBRMaterialDefines, _super);
    /**
     * Initializes the PBR Material defines.
     * @param externalProperties The external properties
     */
    function PBRMaterialDefines(externalProperties) {
        var _this = _super.call(this, externalProperties) || this;
        _this.PBR = true;
        _this.NUM_SAMPLES = "0";
        _this.REALTIME_FILTERING = false;
        _this.MAINUV1 = false;
        _this.MAINUV2 = false;
        _this.MAINUV3 = false;
        _this.MAINUV4 = false;
        _this.MAINUV5 = false;
        _this.MAINUV6 = false;
        _this.UV1 = false;
        _this.UV2 = false;
        _this.UV3 = false;
        _this.UV4 = false;
        _this.UV5 = false;
        _this.UV6 = false;
        _this.ALBEDO = false;
        _this.GAMMAALBEDO = false;
        _this.ALBEDODIRECTUV = 0;
        _this.VERTEXCOLOR = false;
        _this.BAKED_VERTEX_ANIMATION_TEXTURE = false;
        _this.AMBIENT = false;
        _this.AMBIENTDIRECTUV = 0;
        _this.AMBIENTINGRAYSCALE = false;
        _this.OPACITY = false;
        _this.VERTEXALPHA = false;
        _this.OPACITYDIRECTUV = 0;
        _this.OPACITYRGB = false;
        _this.ALPHATEST = false;
        _this.DEPTHPREPASS = false;
        _this.ALPHABLEND = false;
        _this.ALPHAFROMALBEDO = false;
        _this.ALPHATESTVALUE = "0.5";
        _this.SPECULAROVERALPHA = false;
        _this.RADIANCEOVERALPHA = false;
        _this.ALPHAFRESNEL = false;
        _this.LINEARALPHAFRESNEL = false;
        _this.PREMULTIPLYALPHA = false;
        _this.EMISSIVE = false;
        _this.EMISSIVEDIRECTUV = 0;
        _this.GAMMAEMISSIVE = false;
        _this.REFLECTIVITY = false;
        _this.REFLECTIVITY_GAMMA = false;
        _this.REFLECTIVITYDIRECTUV = 0;
        _this.SPECULARTERM = false;
        _this.MICROSURFACEFROMREFLECTIVITYMAP = false;
        _this.MICROSURFACEAUTOMATIC = false;
        _this.LODBASEDMICROSFURACE = false;
        _this.MICROSURFACEMAP = false;
        _this.MICROSURFACEMAPDIRECTUV = 0;
        _this.METALLICWORKFLOW = false;
        _this.ROUGHNESSSTOREINMETALMAPALPHA = false;
        _this.ROUGHNESSSTOREINMETALMAPGREEN = false;
        _this.METALLNESSSTOREINMETALMAPBLUE = false;
        _this.AOSTOREINMETALMAPRED = false;
        _this.METALLIC_REFLECTANCE = false;
        _this.METALLIC_REFLECTANCE_GAMMA = false;
        _this.METALLIC_REFLECTANCEDIRECTUV = 0;
        _this.METALLIC_REFLECTANCE_USE_ALPHA_ONLY = false;
        _this.REFLECTANCE = false;
        _this.REFLECTANCE_GAMMA = false;
        _this.REFLECTANCEDIRECTUV = 0;
        _this.ENVIRONMENTBRDF = false;
        _this.ENVIRONMENTBRDF_RGBD = false;
        _this.NORMAL = false;
        _this.TANGENT = false;
        _this.BUMP = false;
        _this.BUMPDIRECTUV = 0;
        _this.OBJECTSPACE_NORMALMAP = false;
        _this.PARALLAX = false;
        _this.PARALLAXOCCLUSION = false;
        _this.NORMALXYSCALE = true;
        _this.LIGHTMAP = false;
        _this.LIGHTMAPDIRECTUV = 0;
        _this.USELIGHTMAPASSHADOWMAP = false;
        _this.GAMMALIGHTMAP = false;
        _this.RGBDLIGHTMAP = false;
        _this.REFLECTION = false;
        _this.REFLECTIONMAP_3D = false;
        _this.REFLECTIONMAP_SPHERICAL = false;
        _this.REFLECTIONMAP_PLANAR = false;
        _this.REFLECTIONMAP_CUBIC = false;
        _this.USE_LOCAL_REFLECTIONMAP_CUBIC = false;
        _this.REFLECTIONMAP_PROJECTION = false;
        _this.REFLECTIONMAP_SKYBOX = false;
        _this.REFLECTIONMAP_EXPLICIT = false;
        _this.REFLECTIONMAP_EQUIRECTANGULAR = false;
        _this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
        _this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = false;
        _this.INVERTCUBICMAP = false;
        _this.USESPHERICALFROMREFLECTIONMAP = false;
        _this.USEIRRADIANCEMAP = false;
        _this.USESPHERICALINVERTEX = false;
        _this.REFLECTIONMAP_OPPOSITEZ = false;
        _this.LODINREFLECTIONALPHA = false;
        _this.GAMMAREFLECTION = false;
        _this.RGBDREFLECTION = false;
        _this.LINEARSPECULARREFLECTION = false;
        _this.RADIANCEOCCLUSION = false;
        _this.HORIZONOCCLUSION = false;
        _this.INSTANCES = false;
        _this.THIN_INSTANCES = false;
        _this.INSTANCESCOLOR = false;
        _this.PREPASS = false;
        _this.PREPASS_IRRADIANCE = false;
        _this.PREPASS_IRRADIANCE_INDEX = -1;
        _this.PREPASS_ALBEDO_SQRT = false;
        _this.PREPASS_ALBEDO_SQRT_INDEX = -1;
        _this.PREPASS_DEPTH = false;
        _this.PREPASS_DEPTH_INDEX = -1;
        _this.PREPASS_NORMAL = false;
        _this.PREPASS_NORMAL_INDEX = -1;
        _this.PREPASS_POSITION = false;
        _this.PREPASS_POSITION_INDEX = -1;
        _this.PREPASS_VELOCITY = false;
        _this.PREPASS_VELOCITY_INDEX = -1;
        _this.PREPASS_REFLECTIVITY = false;
        _this.PREPASS_REFLECTIVITY_INDEX = -1;
        _this.SCENE_MRT_COUNT = 0;
        _this.NUM_BONE_INFLUENCERS = 0;
        _this.BonesPerMesh = 0;
        _this.BONETEXTURE = false;
        _this.BONES_VELOCITY_ENABLED = false;
        _this.NONUNIFORMSCALING = false;
        _this.MORPHTARGETS = false;
        _this.MORPHTARGETS_NORMAL = false;
        _this.MORPHTARGETS_TANGENT = false;
        _this.MORPHTARGETS_UV = false;
        _this.NUM_MORPH_INFLUENCERS = 0;
        _this.MORPHTARGETS_TEXTURE = false;
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
        _this.SKIPFINALCOLORCLAMP = false;
        _this.EXPOSURE = false;
        _this.MULTIVIEW = false;
        _this.ORDER_INDEPENDENT_TRANSPARENCY = false;
        _this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = false;
        _this.USEPHYSICALLIGHTFALLOFF = false;
        _this.USEGLTFLIGHTFALLOFF = false;
        _this.TWOSIDEDLIGHTING = false;
        _this.SHADOWFLOAT = false;
        _this.CLIPPLANE = false;
        _this.CLIPPLANE2 = false;
        _this.CLIPPLANE3 = false;
        _this.CLIPPLANE4 = false;
        _this.CLIPPLANE5 = false;
        _this.CLIPPLANE6 = false;
        _this.POINTSIZE = false;
        _this.FOG = false;
        _this.LOGARITHMICDEPTH = false;
        _this.FORCENORMALFORWARD = false;
        _this.SPECULARAA = false;
        _this.UNLIT = false;
        _this.DEBUGMODE = 0;
        _this.rebuild();
        return _this;
    }
    /**
     * Resets the PBR Material defines.
     */
    PBRMaterialDefines.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.ALPHATESTVALUE = "0.5";
        this.PBR = true;
        this.NORMALXYSCALE = true;
    };
    return PBRMaterialDefines;
}(MaterialDefines));
/**
 * The Physically based material base class of BJS.
 *
 * This offers the main features of a standard PBR material.
 * For more information, please refer to the documentation :
 * https://doc.babylonjs.com/how_to/physically_based_rendering
 */
var PBRBaseMaterial = /** @class */ (function (_super) {
    __extends(PBRBaseMaterial, _super);
    /**
     * Instantiates a new PBRMaterial instance.
     *
     * @param name The material name
     * @param scene The scene the material will be use in.
     */
    function PBRBaseMaterial(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        /**
         * Intensity of the direct lights e.g. the four lights available in your scene.
         * This impacts both the direct diffuse and specular highlights.
         * @hidden
         */
        _this._directIntensity = 1.0;
        /**
         * Intensity of the emissive part of the material.
         * This helps controlling the emissive effect without modifying the emissive color.
         * @hidden
         */
        _this._emissiveIntensity = 1.0;
        /**
         * Intensity of the environment e.g. how much the environment will light the object
         * either through harmonics for rough material or through the reflection for shiny ones.
         * @hidden
         */
        _this._environmentIntensity = 1.0;
        /**
         * This is a special control allowing the reduction of the specular highlights coming from the
         * four lights of the scene. Those highlights may not be needed in full environment lighting.
         * @hidden
         */
        _this._specularIntensity = 1.0;
        /**
         * This stores the direct, emissive, environment, and specular light intensities into a Vector4.
         */
        _this._lightingInfos = new Vector4(_this._directIntensity, _this._emissiveIntensity, _this._environmentIntensity, _this._specularIntensity);
        /**
         * Debug Control allowing disabling the bump map on this material.
         * @hidden
         */
        _this._disableBumpMap = false;
        /**
         * AKA Diffuse Texture in standard nomenclature.
         * @hidden
         */
        _this._albedoTexture = null;
        /**
         * AKA Occlusion Texture in other nomenclature.
         * @hidden
         */
        _this._ambientTexture = null;
        /**
         * AKA Occlusion Texture Intensity in other nomenclature.
         * @hidden
         */
        _this._ambientTextureStrength = 1.0;
        /**
         * Defines how much the AO map is occluding the analytical lights (point spot...).
         * 1 means it completely occludes it
         * 0 mean it has no impact
         * @hidden
         */
        _this._ambientTextureImpactOnAnalyticalLights = PBRBaseMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS;
        /**
         * Stores the alpha values in a texture.
         * @hidden
         */
        _this._opacityTexture = null;
        /**
         * Stores the reflection values in a texture.
         * @hidden
         */
        _this._reflectionTexture = null;
        /**
         * Stores the emissive values in a texture.
         * @hidden
         */
        _this._emissiveTexture = null;
        /**
         * AKA Specular texture in other nomenclature.
         * @hidden
         */
        _this._reflectivityTexture = null;
        /**
         * Used to switch from specular/glossiness to metallic/roughness workflow.
         * @hidden
         */
        _this._metallicTexture = null;
        /**
         * Specifies the metallic scalar of the metallic/roughness workflow.
         * Can also be used to scale the metalness values of the metallic texture.
         * @hidden
         */
        _this._metallic = null;
        /**
         * Specifies the roughness scalar of the metallic/roughness workflow.
         * Can also be used to scale the roughness values of the metallic texture.
         * @hidden
         */
        _this._roughness = null;
        /**
         * In metallic workflow, specifies an F0 factor to help configuring the material F0.
         * By default the indexOfrefraction is used to compute F0;
         *
         * This is used as a factor against the default reflectance at normal incidence to tweak it.
         *
         * F0 = defaultF0 * metallicF0Factor * metallicReflectanceColor;
         * F90 = metallicReflectanceColor;
         * @hidden
         */
        _this._metallicF0Factor = 1;
        /**
         * In metallic workflow, specifies an F90 color to help configuring the material F90.
         * By default the F90 is always 1;
         *
         * Please note that this factor is also used as a factor against the default reflectance at normal incidence.
         *
         * F0 = defaultF0 * metallicF0Factor * metallicReflectanceColor
         * F90 = metallicReflectanceColor;
         * @hidden
         */
        _this._metallicReflectanceColor = Color3.White();
        /**
         * Specifies that only the A channel from _metallicReflectanceTexture should be used.
         * If false, both RGB and A channels will be used
         * @hidden
         */
        _this._useOnlyMetallicFromMetallicReflectanceTexture = false;
        /**
         * Defines to store metallicReflectanceColor in RGB and metallicF0Factor in A
         * This is multiply against the scalar values defined in the material.
         * @hidden
         */
        _this._metallicReflectanceTexture = null;
        /**
         * Defines to store reflectanceColor in RGB
         * This is multiplied against the scalar values defined in the material.
         * If both _reflectanceTexture and _metallicReflectanceTexture textures are provided and _useOnlyMetallicFromMetallicReflectanceTexture
         * is false, _metallicReflectanceTexture takes precedence and _reflectanceTexture is not used
         * @hidden
         */
        _this._reflectanceTexture = null;
        /**
         * Used to enable roughness/glossiness fetch from a separate channel depending on the current mode.
         * Gray Scale represents roughness in metallic mode and glossiness in specular mode.
         * @hidden
         */
        _this._microSurfaceTexture = null;
        /**
         * Stores surface normal data used to displace a mesh in a texture.
         * @hidden
         */
        _this._bumpTexture = null;
        /**
         * Stores the pre-calculated light information of a mesh in a texture.
         * @hidden
         */
        _this._lightmapTexture = null;
        /**
         * The color of a material in ambient lighting.
         * @hidden
         */
        _this._ambientColor = new Color3(0, 0, 0);
        /**
         * AKA Diffuse Color in other nomenclature.
         * @hidden
         */
        _this._albedoColor = new Color3(1, 1, 1);
        /**
         * AKA Specular Color in other nomenclature.
         * @hidden
         */
        _this._reflectivityColor = new Color3(1, 1, 1);
        /**
         * The color applied when light is reflected from a material.
         * @hidden
         */
        _this._reflectionColor = new Color3(1, 1, 1);
        /**
         * The color applied when light is emitted from a material.
         * @hidden
         */
        _this._emissiveColor = new Color3(0, 0, 0);
        /**
         * AKA Glossiness in other nomenclature.
         * @hidden
         */
        _this._microSurface = 0.9;
        /**
         * Specifies that the material will use the light map as a show map.
         * @hidden
         */
        _this._useLightmapAsShadowmap = false;
        /**
         * This parameters will enable/disable Horizon occlusion to prevent normal maps to look shiny when the normal
         * makes the reflect vector face the model (under horizon).
         * @hidden
         */
        _this._useHorizonOcclusion = true;
        /**
         * This parameters will enable/disable radiance occlusion by preventing the radiance to lit
         * too much the area relying on ambient texture to define their ambient occlusion.
         * @hidden
         */
        _this._useRadianceOcclusion = true;
        /**
         * Specifies that the alpha is coming form the albedo channel alpha channel for alpha blending.
         * @hidden
         */
        _this._useAlphaFromAlbedoTexture = false;
        /**
         * Specifies that the material will keeps the specular highlights over a transparent surface (only the most luminous ones).
         * A car glass is a good example of that. When sun reflects on it you can not see what is behind.
         * @hidden
         */
        _this._useSpecularOverAlpha = true;
        /**
         * Specifies if the reflectivity texture contains the glossiness information in its alpha channel.
         * @hidden
         */
        _this._useMicroSurfaceFromReflectivityMapAlpha = false;
        /**
         * Specifies if the metallic texture contains the roughness information in its alpha channel.
         * @hidden
         */
        _this._useRoughnessFromMetallicTextureAlpha = true;
        /**
         * Specifies if the metallic texture contains the roughness information in its green channel.
         * @hidden
         */
        _this._useRoughnessFromMetallicTextureGreen = false;
        /**
         * Specifies if the metallic texture contains the metallness information in its blue channel.
         * @hidden
         */
        _this._useMetallnessFromMetallicTextureBlue = false;
        /**
         * Specifies if the metallic texture contains the ambient occlusion information in its red channel.
         * @hidden
         */
        _this._useAmbientOcclusionFromMetallicTextureRed = false;
        /**
         * Specifies if the ambient texture contains the ambient occlusion information in its red channel only.
         * @hidden
         */
        _this._useAmbientInGrayScale = false;
        /**
         * In case the reflectivity map does not contain the microsurface information in its alpha channel,
         * The material will try to infer what glossiness each pixel should be.
         * @hidden
         */
        _this._useAutoMicroSurfaceFromReflectivityMap = false;
        /**
         * Defines the  falloff type used in this material.
         * It by default is Physical.
         * @hidden
         */
        _this._lightFalloff = PBRBaseMaterial.LIGHTFALLOFF_PHYSICAL;
        /**
         * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most luminous ones).
         * A car glass is a good example of that. When the street lights reflects on it you can not see what is behind.
         * @hidden
         */
        _this._useRadianceOverAlpha = true;
        /**
         * Allows using an object space normal map (instead of tangent space).
         * @hidden
         */
        _this._useObjectSpaceNormalMap = false;
        /**
         * Allows using the bump map in parallax mode.
         * @hidden
         */
        _this._useParallax = false;
        /**
         * Allows using the bump map in parallax occlusion mode.
         * @hidden
         */
        _this._useParallaxOcclusion = false;
        /**
         * Controls the scale bias of the parallax mode.
         * @hidden
         */
        _this._parallaxScaleBias = 0.05;
        /**
         * If sets to true, disables all the lights affecting the material.
         * @hidden
         */
        _this._disableLighting = false;
        /**
         * Number of Simultaneous lights allowed on the material.
         * @hidden
         */
        _this._maxSimultaneousLights = 4;
        /**
         * If sets to true, x component of normal map value will be inverted (x = 1.0 - x).
         * @hidden
         */
        _this._invertNormalMapX = false;
        /**
         * If sets to true, y component of normal map value will be inverted (y = 1.0 - y).
         * @hidden
         */
        _this._invertNormalMapY = false;
        /**
         * If sets to true and backfaceCulling is false, normals will be flipped on the backside.
         * @hidden
         */
        _this._twoSidedLighting = false;
        /**
         * Defines the alpha limits in alpha test mode.
         * @hidden
         */
        _this._alphaCutOff = 0.4;
        /**
         * Enforces alpha test in opaque or blend mode in order to improve the performances of some situations.
         * @hidden
         */
        _this._forceAlphaTest = false;
        /**
         * A fresnel is applied to the alpha of the model to ensure grazing angles edges are not alpha tested.
         * And/Or occlude the blended part. (alpha is converted to gamma to compute the fresnel)
         * @hidden
         */
        _this._useAlphaFresnel = false;
        /**
         * A fresnel is applied to the alpha of the model to ensure grazing angles edges are not alpha tested.
         * And/Or occlude the blended part. (alpha stays linear to compute the fresnel)
         * @hidden
         */
        _this._useLinearAlphaFresnel = false;
        /**
         * Specifies the environment BRDF texture used to compute the scale and offset roughness values
         * from cos theta and roughness:
         * http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
         * @hidden
         */
        _this._environmentBRDFTexture = null;
        /**
         * Force the shader to compute irradiance in the fragment shader in order to take bump in account.
         * @hidden
         */
        _this._forceIrradianceInFragment = false;
        _this._realTimeFiltering = false;
        _this._realTimeFilteringQuality = 8;
        /**
         * Force normal to face away from face.
         * @hidden
         */
        _this._forceNormalForward = false;
        /**
         * Enables specular anti aliasing in the PBR shader.
         * It will both interacts on the Geometry for analytical and IBL lighting.
         * It also prefilter the roughness map based on the bump values.
         * @hidden
         */
        _this._enableSpecularAntiAliasing = false;
        /**
         * Keep track of the image processing observer to allow dispose and replace.
         */
        _this._imageProcessingObserver = null;
        /**
         * Stores the available render targets.
         */
        _this._renderTargets = new SmartArray(16);
        /**
         * Sets the global ambient color for the material used in lighting calculations.
         */
        _this._globalAmbientColor = new Color3(0, 0, 0);
        /**
         * Enables the use of logarithmic depth buffers, which is good for wide depth buffers.
         */
        _this._useLogarithmicDepth = false;
        /**
         * If set to true, no lighting calculations will be applied.
         */
        _this._unlit = false;
        _this._debugMode = 0;
        /**
         * @hidden
         * This is reserved for the inspector.
         * Defines the material debug mode.
         * It helps seeing only some components of the material while troubleshooting.
         */
        _this.debugMode = 0;
        /**
         * @hidden
         * This is reserved for the inspector.
         * Specify from where on screen the debug mode should start.
         * The value goes from -1 (full screen) to 1 (not visible)
         * It helps with side by side comparison against the final render
         * This defaults to -1
         */
        _this._debugLimit = -1;
        /**
         * @hidden
         * This is reserved for the inspector.
         * As the default viewing range might not be enough (if the ambient is really small for instance)
         * You can use the factor to better multiply the final value.
         */
        _this._debugFactor = 1;
        _this._cacheHasRenderTargetTextures = false;
        _this.brdf = new PBRBRDFConfiguration(_this);
        _this.clearCoat = new PBRClearCoatConfiguration(_this);
        _this.iridescence = new PBRIridescenceConfiguration(_this);
        _this.anisotropy = new PBRAnisotropicConfiguration(_this);
        _this.sheen = new PBRSheenConfiguration(_this);
        _this.subSurface = new PBRSubSurfaceConfiguration(_this);
        _this.detailMap = new DetailMapConfiguration(_this);
        // Setup the default processing configuration to the scene.
        _this._attachImageProcessingConfiguration(null);
        _this.getRenderTargetTextures = function () {
            _this._renderTargets.reset();
            if (MaterialFlags.ReflectionTextureEnabled && _this._reflectionTexture && _this._reflectionTexture.isRenderTarget) {
                _this._renderTargets.push(_this._reflectionTexture);
            }
            _this._eventInfo.renderTargets = _this._renderTargets;
            _this._callbackPluginEventFillRenderTargetTextures(_this._eventInfo);
            return _this._renderTargets;
        };
        _this._environmentBRDFTexture = GetEnvironmentBRDFTexture(_this.getScene());
        _this.prePassConfiguration = new PrePassConfiguration();
        return _this;
    }
    Object.defineProperty(PBRBaseMaterial.prototype, "realTimeFiltering", {
        /**
         * Enables realtime filtering on the texture.
         */
        get: function () {
            return this._realTimeFiltering;
        },
        set: function (b) {
            this._realTimeFiltering = b;
            this.markAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRBaseMaterial.prototype, "realTimeFilteringQuality", {
        /**
         * Quality switch for realtime filtering
         */
        get: function () {
            return this._realTimeFilteringQuality;
        },
        set: function (n) {
            this._realTimeFilteringQuality = n;
            this.markAsDirty(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRBaseMaterial.prototype, "canRenderToMRT", {
        /**
         * Can this material render to several textures at once
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Attaches a new image processing configuration to the PBR Material.
     * @param configuration
     */
    PBRBaseMaterial.prototype._attachImageProcessingConfiguration = function (configuration) {
        var _this = this;
        if (configuration === this._imageProcessingConfiguration) {
            return;
        }
        // Detaches observer.
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
            this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        // Pick the scene configuration if needed.
        if (!configuration) {
            this._imageProcessingConfiguration = this.getScene().imageProcessingConfiguration;
        }
        else {
            this._imageProcessingConfiguration = configuration;
        }
        // Attaches observer.
        if (this._imageProcessingConfiguration) {
            this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(function () {
                _this._markAllSubMeshesAsImageProcessingDirty();
            });
        }
    };
    Object.defineProperty(PBRBaseMaterial.prototype, "hasRenderTargetTextures", {
        /**
         * Gets a boolean indicating that current material needs to register RTT
         */
        get: function () {
            if (MaterialFlags.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget) {
                return true;
            }
            return this._cacheHasRenderTargetTextures;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRBaseMaterial.prototype, "isPrePassCapable", {
        /**
         * Can this material render to prepass
         */
        get: function () {
            return !this.disableDepthWrite;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the name of the material class.
     */
    PBRBaseMaterial.prototype.getClassName = function () {
        return "PBRBaseMaterial";
    };
    Object.defineProperty(PBRBaseMaterial.prototype, "useLogarithmicDepth", {
        /**
         * Enabled the use of logarithmic depth buffers, which is good for wide depth buffers.
         */
        get: function () {
            return this._useLogarithmicDepth;
        },
        /**
         * Enabled the use of logarithmic depth buffers, which is good for wide depth buffers.
         */
        set: function (value) {
            this._useLogarithmicDepth = value && this.getScene().getEngine().getCaps().fragmentDepthSupported;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRBaseMaterial.prototype, "_disableAlphaBlending", {
        /**
         * Returns true if alpha blending should be disabled.
         */
        get: function () {
            var _a;
            return (this._transparencyMode === PBRBaseMaterial.PBRMATERIAL_OPAQUE ||
                this._transparencyMode === PBRBaseMaterial.PBRMATERIAL_ALPHATEST ||
                ((_a = this.subSurface) === null || _a === void 0 ? void 0 : _a.disableAlphaBlending));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Specifies whether or not this material should be rendered in alpha blend mode.
     */
    PBRBaseMaterial.prototype.needAlphaBlending = function () {
        if (this._disableAlphaBlending) {
            return false;
        }
        return this.alpha < 1.0 || this._opacityTexture != null || this._shouldUseAlphaFromAlbedoTexture();
    };
    /**
     * Specifies whether or not this material should be rendered in alpha test mode.
     */
    PBRBaseMaterial.prototype.needAlphaTesting = function () {
        var _a;
        if (this._forceAlphaTest) {
            return true;
        }
        if ((_a = this.subSurface) === null || _a === void 0 ? void 0 : _a.disableAlphaBlending) {
            return false;
        }
        return this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === PBRBaseMaterial.PBRMATERIAL_ALPHATEST);
    };
    /**
     * Specifies whether or not the alpha value of the albedo texture should be used for alpha blending.
     */
    PBRBaseMaterial.prototype._shouldUseAlphaFromAlbedoTexture = function () {
        return this._albedoTexture != null && this._albedoTexture.hasAlpha && this._useAlphaFromAlbedoTexture && this._transparencyMode !== PBRBaseMaterial.PBRMATERIAL_OPAQUE;
    };
    /**
     * Specifies whether or not there is a usable alpha channel for transparency.
     */
    PBRBaseMaterial.prototype._hasAlphaChannel = function () {
        return (this._albedoTexture != null && this._albedoTexture.hasAlpha) || this._opacityTexture != null;
    };
    /**
     * Gets the texture used for the alpha test.
     */
    PBRBaseMaterial.prototype.getAlphaTestTexture = function () {
        return this._albedoTexture;
    };
    /**
     * Specifies that the submesh is ready to be used.
     * @param mesh - BJS mesh.
     * @param subMesh - A submesh of the BJS mesh.  Used to check if it is ready.
     * @param useInstances - Specifies that instances should be used.
     * @returns - boolean indicating that the submesh is ready or not.
     */
    PBRBaseMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
        if (!this._uniformBufferLayoutBuilt) {
            this.buildUniformLayout();
        }
        if (subMesh.effect && this.isFrozen) {
            if (subMesh.effect._wasPreviouslyReady && subMesh.effect._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            this._callbackPluginEventGeneric(MaterialPluginEvent.GetDefineNames, this._eventInfo);
            subMesh.materialDefines = new PBRMaterialDefines(this._eventInfo.defineNames);
        }
        var defines = subMesh.materialDefines;
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        var scene = this.getScene();
        var engine = scene.getEngine();
        if (defines._areTexturesDirty) {
            this._eventInfo.hasRenderTargetTextures = false;
            this._callbackPluginEventHasRenderTargetTextures(this._eventInfo);
            this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures;
            if (scene.texturesEnabled) {
                if (this._albedoTexture && MaterialFlags.DiffuseTextureEnabled) {
                    if (!this._albedoTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._ambientTexture && MaterialFlags.AmbientTextureEnabled) {
                    if (!this._ambientTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
                    if (!this._opacityTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                var reflectionTexture = this._getReflectionTexture();
                if (reflectionTexture && MaterialFlags.ReflectionTextureEnabled) {
                    if (!reflectionTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                    if (reflectionTexture.irradianceTexture && !reflectionTexture.irradianceTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._lightmapTexture && MaterialFlags.LightmapTextureEnabled) {
                    if (!this._lightmapTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (this._emissiveTexture && MaterialFlags.EmissiveTextureEnabled) {
                    if (!this._emissiveTexture.isReadyOrNotBlocking()) {
                        return false;
                    }
                }
                if (MaterialFlags.SpecularTextureEnabled) {
                    if (this._metallicTexture) {
                        if (!this._metallicTexture.isReadyOrNotBlocking()) {
                            return false;
                        }
                    }
                    else if (this._reflectivityTexture) {
                        if (!this._reflectivityTexture.isReadyOrNotBlocking()) {
                            return false;
                        }
                    }
                    if (this._metallicReflectanceTexture) {
                        if (!this._metallicReflectanceTexture.isReadyOrNotBlocking()) {
                            return false;
                        }
                    }
                    if (this._reflectanceTexture) {
                        if (!this._reflectanceTexture.isReadyOrNotBlocking()) {
                            return false;
                        }
                    }
                    if (this._microSurfaceTexture) {
                        if (!this._microSurfaceTexture.isReadyOrNotBlocking()) {
                            return false;
                        }
                    }
                }
                if (engine.getCaps().standardDerivatives && this._bumpTexture && MaterialFlags.BumpTextureEnabled && !this._disableBumpMap) {
                    // Bump texture cannot be not blocking.
                    if (!this._bumpTexture.isReady()) {
                        return false;
                    }
                }
                if (this._environmentBRDFTexture && MaterialFlags.ReflectionTextureEnabled) {
                    // This is blocking.
                    if (!this._environmentBRDFTexture.isReady()) {
                        return false;
                    }
                }
            }
        }
        this._eventInfo.isReadyForSubMesh = true;
        this._eventInfo.defines = defines;
        this._callbackPluginEventIsReadyForSubMesh(this._eventInfo);
        if (!this._eventInfo.isReadyForSubMesh) {
            return false;
        }
        if (defines._areImageProcessingDirty && this._imageProcessingConfiguration) {
            if (!this._imageProcessingConfiguration.isReady()) {
                return false;
            }
        }
        if (!engine.getCaps().standardDerivatives && !mesh.isVerticesDataPresent(VertexBuffer.NormalKind)) {
            mesh.createNormals(true);
            Logger.Warn("PBRMaterial: Normals have been created for the mesh: " + mesh.name);
        }
        var previousEffect = subMesh.effect;
        var lightDisposed = defines._areLightsDisposed;
        var effect = this._prepareEffect(mesh, defines, this.onCompiled, this.onError, useInstances, null, subMesh.getRenderingMesh().hasThinInstances);
        if (effect) {
            if (this._onEffectCreatedObservable) {
                onCreatedEffectParameters.effect = effect;
                onCreatedEffectParameters.subMesh = subMesh;
                this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
            }
            // Use previous effect while new one is compiling
            if (this.allowShaderHotSwapping && previousEffect && !effect.isReady()) {
                effect = previousEffect;
                defines.markAsUnprocessed();
                if (lightDisposed) {
                    // re register in case it takes more than one frame.
                    defines._areLightsDisposed = true;
                    return false;
                }
            }
            else {
                scene.resetCachedMaterial();
                subMesh.setEffect(effect, defines, this._materialContext);
            }
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }
        defines._renderId = scene.getRenderId();
        subMesh.effect._wasPreviouslyReady = true;
        subMesh.effect._wasPreviouslyUsingInstances = !!useInstances;
        return true;
    };
    /**
     * Specifies if the material uses metallic roughness workflow.
     * @returns boolean specifying if the material uses metallic roughness workflow.
     */
    PBRBaseMaterial.prototype.isMetallicWorkflow = function () {
        if (this._metallic != null || this._roughness != null || this._metallicTexture) {
            return true;
        }
        return false;
    };
    PBRBaseMaterial.prototype._prepareEffect = function (mesh, defines, onCompiled, onError, useInstances, useClipPlane, useThinInstances) {
        if (onCompiled === void 0) { onCompiled = null; }
        if (onError === void 0) { onError = null; }
        if (useInstances === void 0) { useInstances = null; }
        if (useClipPlane === void 0) { useClipPlane = null; }
        this._prepareDefines(mesh, defines, useInstances, useClipPlane, useThinInstances);
        if (!defines.isDirty) {
            return null;
        }
        defines.markAsProcessed();
        var scene = this.getScene();
        var engine = scene.getEngine();
        // Fallbacks
        var fallbacks = new EffectFallbacks();
        var fallbackRank = 0;
        if (defines.USESPHERICALINVERTEX) {
            fallbacks.addFallback(fallbackRank++, "USESPHERICALINVERTEX");
        }
        if (defines.FOG) {
            fallbacks.addFallback(fallbackRank, "FOG");
        }
        if (defines.SPECULARAA) {
            fallbacks.addFallback(fallbackRank, "SPECULARAA");
        }
        if (defines.POINTSIZE) {
            fallbacks.addFallback(fallbackRank, "POINTSIZE");
        }
        if (defines.LOGARITHMICDEPTH) {
            fallbacks.addFallback(fallbackRank, "LOGARITHMICDEPTH");
        }
        if (defines.PARALLAX) {
            fallbacks.addFallback(fallbackRank, "PARALLAX");
        }
        if (defines.PARALLAXOCCLUSION) {
            fallbacks.addFallback(fallbackRank++, "PARALLAXOCCLUSION");
        }
        if (defines.ENVIRONMENTBRDF) {
            fallbacks.addFallback(fallbackRank++, "ENVIRONMENTBRDF");
        }
        if (defines.TANGENT) {
            fallbacks.addFallback(fallbackRank++, "TANGENT");
        }
        if (defines.BUMP) {
            fallbacks.addFallback(fallbackRank++, "BUMP");
        }
        fallbackRank = MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this._maxSimultaneousLights, fallbackRank++);
        if (defines.SPECULARTERM) {
            fallbacks.addFallback(fallbackRank++, "SPECULARTERM");
        }
        if (defines.USESPHERICALFROMREFLECTIONMAP) {
            fallbacks.addFallback(fallbackRank++, "USESPHERICALFROMREFLECTIONMAP");
        }
        if (defines.USEIRRADIANCEMAP) {
            fallbacks.addFallback(fallbackRank++, "USEIRRADIANCEMAP");
        }
        if (defines.LIGHTMAP) {
            fallbacks.addFallback(fallbackRank++, "LIGHTMAP");
        }
        if (defines.NORMAL) {
            fallbacks.addFallback(fallbackRank++, "NORMAL");
        }
        if (defines.AMBIENT) {
            fallbacks.addFallback(fallbackRank++, "AMBIENT");
        }
        if (defines.EMISSIVE) {
            fallbacks.addFallback(fallbackRank++, "EMISSIVE");
        }
        if (defines.VERTEXCOLOR) {
            fallbacks.addFallback(fallbackRank++, "VERTEXCOLOR");
        }
        if (defines.MORPHTARGETS) {
            fallbacks.addFallback(fallbackRank++, "MORPHTARGETS");
        }
        if (defines.MULTIVIEW) {
            fallbacks.addFallback(0, "MULTIVIEW");
        }
        //Attributes
        var attribs = [VertexBuffer.PositionKind];
        if (defines.NORMAL) {
            attribs.push(VertexBuffer.NormalKind);
        }
        if (defines.TANGENT) {
            attribs.push(VertexBuffer.TangentKind);
        }
        for (var i = 1; i <= 6; ++i) {
            if (defines["UV" + i]) {
                attribs.push("uv".concat(i === 1 ? "" : i));
            }
        }
        if (defines.VERTEXCOLOR) {
            attribs.push(VertexBuffer.ColorKind);
        }
        if (defines.INSTANCESCOLOR) {
            attribs.push(VertexBuffer.ColorInstanceKind);
        }
        MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
        MaterialHelper.PrepareAttributesForInstances(attribs, defines);
        MaterialHelper.PrepareAttributesForMorphTargets(attribs, mesh, defines);
        MaterialHelper.PrepareAttributesForBakedVertexAnimation(attribs, mesh, defines);
        var shaderName = "pbr";
        var uniforms = [
            "world",
            "view",
            "viewProjection",
            "vEyePosition",
            "vLightsType",
            "vAmbientColor",
            "vAlbedoColor",
            "vReflectivityColor",
            "vMetallicReflectanceFactors",
            "vEmissiveColor",
            "visibility",
            "vReflectionColor",
            "vFogInfos",
            "vFogColor",
            "pointSize",
            "vAlbedoInfos",
            "vAmbientInfos",
            "vOpacityInfos",
            "vReflectionInfos",
            "vReflectionPosition",
            "vReflectionSize",
            "vEmissiveInfos",
            "vReflectivityInfos",
            "vReflectionFilteringInfo",
            "vMetallicReflectanceInfos",
            "vReflectanceInfos",
            "vMicroSurfaceSamplerInfos",
            "vBumpInfos",
            "vLightmapInfos",
            "mBones",
            "vClipPlane",
            "vClipPlane2",
            "vClipPlane3",
            "vClipPlane4",
            "vClipPlane5",
            "vClipPlane6",
            "albedoMatrix",
            "ambientMatrix",
            "opacityMatrix",
            "reflectionMatrix",
            "emissiveMatrix",
            "reflectivityMatrix",
            "normalMatrix",
            "microSurfaceSamplerMatrix",
            "bumpMatrix",
            "lightmapMatrix",
            "metallicReflectanceMatrix",
            "reflectanceMatrix",
            "vLightingIntensity",
            "logarithmicDepthConstant",
            "vSphericalX",
            "vSphericalY",
            "vSphericalZ",
            "vSphericalXX_ZZ",
            "vSphericalYY_ZZ",
            "vSphericalZZ",
            "vSphericalXY",
            "vSphericalYZ",
            "vSphericalZX",
            "vSphericalL00",
            "vSphericalL1_1",
            "vSphericalL10",
            "vSphericalL11",
            "vSphericalL2_2",
            "vSphericalL2_1",
            "vSphericalL20",
            "vSphericalL21",
            "vSphericalL22",
            "vReflectionMicrosurfaceInfos",
            "vTangentSpaceParams",
            "boneTextureWidth",
            "vDebugMode",
            "morphTargetTextureInfo",
            "morphTargetTextureIndices",
        ];
        var samplers = [
            "albedoSampler",
            "reflectivitySampler",
            "ambientSampler",
            "emissiveSampler",
            "bumpSampler",
            "lightmapSampler",
            "opacitySampler",
            "reflectionSampler",
            "reflectionSamplerLow",
            "reflectionSamplerHigh",
            "irradianceSampler",
            "microSurfaceSampler",
            "environmentBrdfSampler",
            "boneSampler",
            "metallicReflectanceSampler",
            "reflectanceSampler",
            "morphTargets",
            "oitDepthSampler",
            "oitFrontColorSampler",
        ];
        var uniformBuffers = ["Material", "Scene", "Mesh"];
        this._eventInfo.fallbacks = fallbacks;
        this._eventInfo.fallbackRank = fallbackRank;
        this._eventInfo.defines = defines;
        this._eventInfo.uniforms = uniforms;
        this._eventInfo.attributes = attribs;
        this._eventInfo.samplers = samplers;
        this._eventInfo.uniformBuffersNames = uniformBuffers;
        this._eventInfo.customCode = undefined;
        this._eventInfo.mesh = mesh;
        this._callbackPluginEventGeneric(MaterialPluginEvent.PrepareEffect, this._eventInfo);
        PrePassConfiguration.AddUniforms(uniforms);
        PrePassConfiguration.AddSamplers(samplers);
        if (ImageProcessingConfiguration) {
            ImageProcessingConfiguration.PrepareUniforms(uniforms, defines);
            ImageProcessingConfiguration.PrepareSamplers(samplers, defines);
        }
        MaterialHelper.PrepareUniformsAndSamplersList({
            uniformsNames: uniforms,
            uniformBuffersNames: uniformBuffers,
            samplers: samplers,
            defines: defines,
            maxSimultaneousLights: this._maxSimultaneousLights,
        });
        var csnrOptions = {};
        if (this.customShaderNameResolve) {
            shaderName = this.customShaderNameResolve(shaderName, uniforms, uniformBuffers, samplers, defines, attribs, csnrOptions);
        }
        var join = defines.toString();
        return engine.createEffect(shaderName, {
            attributes: attribs,
            uniformsNames: uniforms,
            uniformBuffersNames: uniformBuffers,
            samplers: samplers,
            defines: join,
            fallbacks: fallbacks,
            onCompiled: onCompiled,
            onError: onError,
            indexParameters: { maxSimultaneousLights: this._maxSimultaneousLights, maxSimultaneousMorphTargets: defines.NUM_MORPH_INFLUENCERS },
            processFinalCode: csnrOptions.processFinalCode,
            processCodeAfterIncludes: this._eventInfo.customCode,
            multiTarget: defines.PREPASS,
        }, engine);
    };
    PBRBaseMaterial.prototype._prepareDefines = function (mesh, defines, useInstances, useClipPlane, useThinInstances) {
        var _a;
        if (useInstances === void 0) { useInstances = null; }
        if (useClipPlane === void 0) { useClipPlane = null; }
        if (useThinInstances === void 0) { useThinInstances = false; }
        var scene = this.getScene();
        var engine = scene.getEngine();
        // Lights
        MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, true, this._maxSimultaneousLights, this._disableLighting);
        defines._needNormals = true;
        // Multiview
        MaterialHelper.PrepareDefinesForMultiview(scene, defines);
        // PrePass
        var oit = this.needAlphaBlendingForMesh(mesh) && this.getScene().useOrderIndependentTransparency;
        MaterialHelper.PrepareDefinesForPrePass(scene, defines, this.canRenderToMRT && !oit);
        // Order independant transparency
        MaterialHelper.PrepareDefinesForOIT(scene, defines, oit);
        // Textures
        defines.METALLICWORKFLOW = this.isMetallicWorkflow();
        if (defines._areTexturesDirty) {
            defines._needUVs = false;
            if (scene.texturesEnabled) {
                if (engine.getCaps().textureLOD) {
                    defines.LODBASEDMICROSFURACE = true;
                }
                if (this._albedoTexture && MaterialFlags.DiffuseTextureEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._albedoTexture, defines, "ALBEDO");
                    defines.GAMMAALBEDO = this._albedoTexture.gammaSpace;
                }
                else {
                    defines.ALBEDO = false;
                }
                if (this._ambientTexture && MaterialFlags.AmbientTextureEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._ambientTexture, defines, "AMBIENT");
                    defines.AMBIENTINGRAYSCALE = this._useAmbientInGrayScale;
                }
                else {
                    defines.AMBIENT = false;
                }
                if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._opacityTexture, defines, "OPACITY");
                    defines.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
                }
                else {
                    defines.OPACITY = false;
                }
                var reflectionTexture = this._getReflectionTexture();
                if (reflectionTexture && MaterialFlags.ReflectionTextureEnabled) {
                    defines.REFLECTION = true;
                    defines.GAMMAREFLECTION = reflectionTexture.gammaSpace;
                    defines.RGBDREFLECTION = reflectionTexture.isRGBD;
                    defines.LODINREFLECTIONALPHA = reflectionTexture.lodLevelInAlpha;
                    defines.LINEARSPECULARREFLECTION = reflectionTexture.linearSpecularLOD;
                    if (this.realTimeFiltering && this.realTimeFilteringQuality > 0) {
                        defines.NUM_SAMPLES = "" + this.realTimeFilteringQuality;
                        if (engine._features.needTypeSuffixInShaderConstants) {
                            defines.NUM_SAMPLES = defines.NUM_SAMPLES + "u";
                        }
                        defines.REALTIME_FILTERING = true;
                    }
                    else {
                        defines.REALTIME_FILTERING = false;
                    }
                    if (reflectionTexture.coordinatesMode === Texture.INVCUBIC_MODE) {
                        defines.INVERTCUBICMAP = true;
                    }
                    defines.REFLECTIONMAP_3D = reflectionTexture.isCube;
                    defines.REFLECTIONMAP_OPPOSITEZ = defines.REFLECTIONMAP_3D && this.getScene().useRightHandedSystem ? !reflectionTexture.invertZ : reflectionTexture.invertZ;
                    defines.REFLECTIONMAP_CUBIC = false;
                    defines.REFLECTIONMAP_EXPLICIT = false;
                    defines.REFLECTIONMAP_PLANAR = false;
                    defines.REFLECTIONMAP_PROJECTION = false;
                    defines.REFLECTIONMAP_SKYBOX = false;
                    defines.REFLECTIONMAP_SPHERICAL = false;
                    defines.REFLECTIONMAP_EQUIRECTANGULAR = false;
                    defines.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
                    defines.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = false;
                    switch (reflectionTexture.coordinatesMode) {
                        case Texture.EXPLICIT_MODE:
                            defines.REFLECTIONMAP_EXPLICIT = true;
                            break;
                        case Texture.PLANAR_MODE:
                            defines.REFLECTIONMAP_PLANAR = true;
                            break;
                        case Texture.PROJECTION_MODE:
                            defines.REFLECTIONMAP_PROJECTION = true;
                            break;
                        case Texture.SKYBOX_MODE:
                            defines.REFLECTIONMAP_SKYBOX = true;
                            break;
                        case Texture.SPHERICAL_MODE:
                            defines.REFLECTIONMAP_SPHERICAL = true;
                            break;
                        case Texture.EQUIRECTANGULAR_MODE:
                            defines.REFLECTIONMAP_EQUIRECTANGULAR = true;
                            break;
                        case Texture.FIXED_EQUIRECTANGULAR_MODE:
                            defines.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = true;
                            break;
                        case Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                            defines.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = true;
                            break;
                        case Texture.CUBIC_MODE:
                        case Texture.INVCUBIC_MODE:
                        default:
                            defines.REFLECTIONMAP_CUBIC = true;
                            defines.USE_LOCAL_REFLECTIONMAP_CUBIC = reflectionTexture.boundingBoxSize ? true : false;
                            break;
                    }
                    if (reflectionTexture.coordinatesMode !== Texture.SKYBOX_MODE) {
                        if (reflectionTexture.irradianceTexture) {
                            defines.USEIRRADIANCEMAP = true;
                            defines.USESPHERICALFROMREFLECTIONMAP = false;
                        }
                        // Assume using spherical polynomial if the reflection texture is a cube map
                        else if (reflectionTexture.isCube) {
                            defines.USESPHERICALFROMREFLECTIONMAP = true;
                            defines.USEIRRADIANCEMAP = false;
                            if (this._forceIrradianceInFragment || this.realTimeFiltering || engine.getCaps().maxVaryingVectors <= 8) {
                                defines.USESPHERICALINVERTEX = false;
                            }
                            else {
                                defines.USESPHERICALINVERTEX = true;
                            }
                        }
                    }
                }
                else {
                    defines.REFLECTION = false;
                    defines.REFLECTIONMAP_3D = false;
                    defines.REFLECTIONMAP_SPHERICAL = false;
                    defines.REFLECTIONMAP_PLANAR = false;
                    defines.REFLECTIONMAP_CUBIC = false;
                    defines.USE_LOCAL_REFLECTIONMAP_CUBIC = false;
                    defines.REFLECTIONMAP_PROJECTION = false;
                    defines.REFLECTIONMAP_SKYBOX = false;
                    defines.REFLECTIONMAP_EXPLICIT = false;
                    defines.REFLECTIONMAP_EQUIRECTANGULAR = false;
                    defines.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
                    defines.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = false;
                    defines.INVERTCUBICMAP = false;
                    defines.USESPHERICALFROMREFLECTIONMAP = false;
                    defines.USEIRRADIANCEMAP = false;
                    defines.USESPHERICALINVERTEX = false;
                    defines.REFLECTIONMAP_OPPOSITEZ = false;
                    defines.LODINREFLECTIONALPHA = false;
                    defines.GAMMAREFLECTION = false;
                    defines.RGBDREFLECTION = false;
                    defines.LINEARSPECULARREFLECTION = false;
                }
                if (this._lightmapTexture && MaterialFlags.LightmapTextureEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._lightmapTexture, defines, "LIGHTMAP");
                    defines.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap;
                    defines.GAMMALIGHTMAP = this._lightmapTexture.gammaSpace;
                    defines.RGBDLIGHTMAP = this._lightmapTexture.isRGBD;
                }
                else {
                    defines.LIGHTMAP = false;
                }
                if (this._emissiveTexture && MaterialFlags.EmissiveTextureEnabled) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._emissiveTexture, defines, "EMISSIVE");
                    defines.GAMMAEMISSIVE = this._emissiveTexture.gammaSpace;
                }
                else {
                    defines.EMISSIVE = false;
                }
                if (MaterialFlags.SpecularTextureEnabled) {
                    if (this._metallicTexture) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._metallicTexture, defines, "REFLECTIVITY");
                        defines.ROUGHNESSSTOREINMETALMAPALPHA = this._useRoughnessFromMetallicTextureAlpha;
                        defines.ROUGHNESSSTOREINMETALMAPGREEN = !this._useRoughnessFromMetallicTextureAlpha && this._useRoughnessFromMetallicTextureGreen;
                        defines.METALLNESSSTOREINMETALMAPBLUE = this._useMetallnessFromMetallicTextureBlue;
                        defines.AOSTOREINMETALMAPRED = this._useAmbientOcclusionFromMetallicTextureRed;
                        defines.REFLECTIVITY_GAMMA = false;
                    }
                    else if (this._reflectivityTexture) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._reflectivityTexture, defines, "REFLECTIVITY");
                        defines.MICROSURFACEFROMREFLECTIVITYMAP = this._useMicroSurfaceFromReflectivityMapAlpha;
                        defines.MICROSURFACEAUTOMATIC = this._useAutoMicroSurfaceFromReflectivityMap;
                        defines.REFLECTIVITY_GAMMA = this._reflectivityTexture.gammaSpace;
                    }
                    else {
                        defines.REFLECTIVITY = false;
                    }
                    if (this._metallicReflectanceTexture || this._reflectanceTexture) {
                        var identicalTextures = this._metallicReflectanceTexture !== null &&
                            this._metallicReflectanceTexture._texture === ((_a = this._reflectanceTexture) === null || _a === void 0 ? void 0 : _a._texture) &&
                            this._metallicReflectanceTexture.checkTransformsAreIdentical(this._reflectanceTexture);
                        defines.METALLIC_REFLECTANCE_USE_ALPHA_ONLY = this._useOnlyMetallicFromMetallicReflectanceTexture && !identicalTextures;
                        if (this._metallicReflectanceTexture) {
                            MaterialHelper.PrepareDefinesForMergedUV(this._metallicReflectanceTexture, defines, "METALLIC_REFLECTANCE");
                            defines.METALLIC_REFLECTANCE_GAMMA = this._metallicReflectanceTexture.gammaSpace;
                        }
                        else {
                            defines.METALLIC_REFLECTANCE = false;
                        }
                        if (this._reflectanceTexture &&
                            !identicalTextures &&
                            (!this._metallicReflectanceTexture || (this._metallicReflectanceTexture && this._useOnlyMetallicFromMetallicReflectanceTexture))) {
                            MaterialHelper.PrepareDefinesForMergedUV(this._reflectanceTexture, defines, "REFLECTANCE");
                            defines.REFLECTANCE_GAMMA = this._reflectanceTexture.gammaSpace;
                        }
                        else {
                            defines.REFLECTANCE = false;
                        }
                    }
                    else {
                        defines.METALLIC_REFLECTANCE = false;
                        defines.REFLECTANCE = false;
                    }
                    if (this._microSurfaceTexture) {
                        MaterialHelper.PrepareDefinesForMergedUV(this._microSurfaceTexture, defines, "MICROSURFACEMAP");
                    }
                    else {
                        defines.MICROSURFACEMAP = false;
                    }
                }
                else {
                    defines.REFLECTIVITY = false;
                    defines.MICROSURFACEMAP = false;
                }
                if (engine.getCaps().standardDerivatives && this._bumpTexture && MaterialFlags.BumpTextureEnabled && !this._disableBumpMap) {
                    MaterialHelper.PrepareDefinesForMergedUV(this._bumpTexture, defines, "BUMP");
                    if (this._useParallax && this._albedoTexture && MaterialFlags.DiffuseTextureEnabled) {
                        defines.PARALLAX = true;
                        defines.PARALLAXOCCLUSION = !!this._useParallaxOcclusion;
                    }
                    else {
                        defines.PARALLAX = false;
                    }
                    defines.OBJECTSPACE_NORMALMAP = this._useObjectSpaceNormalMap;
                }
                else {
                    defines.BUMP = false;
                    defines.PARALLAX = false;
                    defines.PARALLAXOCCLUSION = false;
                    defines.PARALLAOBJECTSPACE_NORMALMAP = false;
                }
                if (this._environmentBRDFTexture && MaterialFlags.ReflectionTextureEnabled) {
                    defines.ENVIRONMENTBRDF = true;
                    defines.ENVIRONMENTBRDF_RGBD = this._environmentBRDFTexture.isRGBD;
                }
                else {
                    defines.ENVIRONMENTBRDF = false;
                    defines.ENVIRONMENTBRDF_RGBD = false;
                }
                if (this._shouldUseAlphaFromAlbedoTexture()) {
                    defines.ALPHAFROMALBEDO = true;
                }
                else {
                    defines.ALPHAFROMALBEDO = false;
                }
            }
            defines.SPECULAROVERALPHA = this._useSpecularOverAlpha;
            if (this._lightFalloff === PBRBaseMaterial.LIGHTFALLOFF_STANDARD) {
                defines.USEPHYSICALLIGHTFALLOFF = false;
                defines.USEGLTFLIGHTFALLOFF = false;
            }
            else if (this._lightFalloff === PBRBaseMaterial.LIGHTFALLOFF_GLTF) {
                defines.USEPHYSICALLIGHTFALLOFF = false;
                defines.USEGLTFLIGHTFALLOFF = true;
            }
            else {
                defines.USEPHYSICALLIGHTFALLOFF = true;
                defines.USEGLTFLIGHTFALLOFF = false;
            }
            defines.RADIANCEOVERALPHA = this._useRadianceOverAlpha;
            if (!this.backFaceCulling && this._twoSidedLighting) {
                defines.TWOSIDEDLIGHTING = true;
            }
            else {
                defines.TWOSIDEDLIGHTING = false;
            }
            defines.SPECULARAA = engine.getCaps().standardDerivatives && this._enableSpecularAntiAliasing;
        }
        if (defines._areTexturesDirty || defines._areMiscDirty) {
            defines.ALPHATESTVALUE = "".concat(this._alphaCutOff).concat(this._alphaCutOff % 1 === 0 ? "." : "");
            defines.PREMULTIPLYALPHA = this.alphaMode === 7 || this.alphaMode === 8;
            defines.ALPHABLEND = this.needAlphaBlendingForMesh(mesh);
            defines.ALPHAFRESNEL = this._useAlphaFresnel || this._useLinearAlphaFresnel;
            defines.LINEARALPHAFRESNEL = this._useLinearAlphaFresnel;
        }
        if (defines._areImageProcessingDirty && this._imageProcessingConfiguration) {
            this._imageProcessingConfiguration.prepareDefines(defines);
        }
        defines.FORCENORMALFORWARD = this._forceNormalForward;
        defines.RADIANCEOCCLUSION = this._useRadianceOcclusion;
        defines.HORIZONOCCLUSION = this._useHorizonOcclusion;
        // Misc.
        if (defines._areMiscDirty) {
            MaterialHelper.PrepareDefinesForMisc(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh) || this._forceAlphaTest, defines);
            defines.UNLIT = this._unlit || ((this.pointsCloud || this.wireframe) && !mesh.isVerticesDataPresent(VertexBuffer.NormalKind));
            defines.DEBUGMODE = this._debugMode;
        }
        // Values that need to be evaluated on every frame
        MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false, useClipPlane, useThinInstances);
        // External config
        this._eventInfo.defines = defines;
        this._eventInfo.mesh = mesh;
        this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo);
        // Attribs
        MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true, true, this._transparencyMode !== PBRBaseMaterial.PBRMATERIAL_OPAQUE);
        // External config
        this._callbackPluginEventPrepareDefines(this._eventInfo);
    };
    /**
     * Force shader compilation
     * @param mesh
     * @param onCompiled
     * @param options
     */
    PBRBaseMaterial.prototype.forceCompilation = function (mesh, onCompiled, options) {
        var _this = this;
        var localOptions = __assign({ clipPlane: false, useInstances: false }, options);
        if (!this._uniformBufferLayoutBuilt) {
            this.buildUniformLayout();
        }
        this._callbackPluginEventGeneric(MaterialPluginEvent.GetDefineNames, this._eventInfo);
        var defines = new PBRMaterialDefines(this._eventInfo.defineNames);
        var effect = this._prepareEffect(mesh, defines, undefined, undefined, localOptions.useInstances, localOptions.clipPlane, mesh.hasThinInstances);
        if (this._onEffectCreatedObservable) {
            onCreatedEffectParameters.effect = effect;
            onCreatedEffectParameters.subMesh = null;
            this._onEffectCreatedObservable.notifyObservers(onCreatedEffectParameters);
        }
        if (effect.isReady()) {
            if (onCompiled) {
                onCompiled(this);
            }
        }
        else {
            effect.onCompileObservable.add(function () {
                if (onCompiled) {
                    onCompiled(_this);
                }
            });
        }
    };
    /**
     * Initializes the uniform buffer layout for the shader.
     */
    PBRBaseMaterial.prototype.buildUniformLayout = function () {
        // Order is important !
        var ubo = this._uniformBuffer;
        ubo.addUniform("vAlbedoInfos", 2);
        ubo.addUniform("vAmbientInfos", 4);
        ubo.addUniform("vOpacityInfos", 2);
        ubo.addUniform("vEmissiveInfos", 2);
        ubo.addUniform("vLightmapInfos", 2);
        ubo.addUniform("vReflectivityInfos", 3);
        ubo.addUniform("vMicroSurfaceSamplerInfos", 2);
        ubo.addUniform("vReflectionInfos", 2);
        ubo.addUniform("vReflectionFilteringInfo", 2);
        ubo.addUniform("vReflectionPosition", 3);
        ubo.addUniform("vReflectionSize", 3);
        ubo.addUniform("vBumpInfos", 3);
        ubo.addUniform("albedoMatrix", 16);
        ubo.addUniform("ambientMatrix", 16);
        ubo.addUniform("opacityMatrix", 16);
        ubo.addUniform("emissiveMatrix", 16);
        ubo.addUniform("lightmapMatrix", 16);
        ubo.addUniform("reflectivityMatrix", 16);
        ubo.addUniform("microSurfaceSamplerMatrix", 16);
        ubo.addUniform("bumpMatrix", 16);
        ubo.addUniform("vTangentSpaceParams", 2);
        ubo.addUniform("reflectionMatrix", 16);
        ubo.addUniform("vReflectionColor", 3);
        ubo.addUniform("vAlbedoColor", 4);
        ubo.addUniform("vLightingIntensity", 4);
        ubo.addUniform("vReflectionMicrosurfaceInfos", 3);
        ubo.addUniform("pointSize", 1);
        ubo.addUniform("vReflectivityColor", 4);
        ubo.addUniform("vEmissiveColor", 3);
        ubo.addUniform("vAmbientColor", 3);
        ubo.addUniform("vDebugMode", 2);
        ubo.addUniform("vMetallicReflectanceFactors", 4);
        ubo.addUniform("vMetallicReflectanceInfos", 2);
        ubo.addUniform("metallicReflectanceMatrix", 16);
        ubo.addUniform("vReflectanceInfos", 2);
        ubo.addUniform("reflectanceMatrix", 16);
        ubo.addUniform("vSphericalL00", 3);
        ubo.addUniform("vSphericalL1_1", 3);
        ubo.addUniform("vSphericalL10", 3);
        ubo.addUniform("vSphericalL11", 3);
        ubo.addUniform("vSphericalL2_2", 3);
        ubo.addUniform("vSphericalL2_1", 3);
        ubo.addUniform("vSphericalL20", 3);
        ubo.addUniform("vSphericalL21", 3);
        ubo.addUniform("vSphericalL22", 3);
        ubo.addUniform("vSphericalX", 3);
        ubo.addUniform("vSphericalY", 3);
        ubo.addUniform("vSphericalZ", 3);
        ubo.addUniform("vSphericalXX_ZZ", 3);
        ubo.addUniform("vSphericalYY_ZZ", 3);
        ubo.addUniform("vSphericalZZ", 3);
        ubo.addUniform("vSphericalXY", 3);
        ubo.addUniform("vSphericalYZ", 3);
        ubo.addUniform("vSphericalZX", 3);
        _super.prototype.buildUniformLayout.call(this);
    };
    /**
     * Binds the submesh data.
     * @param world - The world matrix.
     * @param mesh - The BJS mesh.
     * @param subMesh - A submesh of the BJS mesh.
     */
    PBRBaseMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
        var _a, _b, _c, _d;
        var scene = this.getScene();
        var defines = subMesh.materialDefines;
        if (!defines) {
            return;
        }
        var effect = subMesh.effect;
        if (!effect) {
            return;
        }
        this._activeEffect = effect;
        // Matrices Mesh.
        mesh.getMeshUniformBuffer().bindToEffect(effect, "Mesh");
        mesh.transferToEffect(world);
        var engine = scene.getEngine();
        // Binding unconditionally
        this._uniformBuffer.bindToEffect(effect, "Material");
        this.prePassConfiguration.bindForSubMesh(this._activeEffect, scene, mesh, world, this.isFrozen);
        this._eventInfo.subMesh = subMesh;
        this._callbackPluginEventHardBindForSubMesh(this._eventInfo);
        // Normal Matrix
        if (defines.OBJECTSPACE_NORMALMAP) {
            world.toNormalMatrix(this._normalMatrix);
            this.bindOnlyNormalMatrix(this._normalMatrix);
        }
        var mustRebind = this._mustRebind(scene, effect, mesh.visibility);
        // Bones
        MaterialHelper.BindBonesParameters(mesh, this._activeEffect, this.prePassConfiguration);
        var reflectionTexture = null;
        var ubo = this._uniformBuffer;
        if (mustRebind) {
            this.bindViewProjection(effect);
            reflectionTexture = this._getReflectionTexture();
            if (!ubo.useUbo || !this.isFrozen || !ubo.isSync) {
                // Texture uniforms
                if (scene.texturesEnabled) {
                    if (this._albedoTexture && MaterialFlags.DiffuseTextureEnabled) {
                        ubo.updateFloat2("vAlbedoInfos", this._albedoTexture.coordinatesIndex, this._albedoTexture.level);
                        MaterialHelper.BindTextureMatrix(this._albedoTexture, ubo, "albedo");
                    }
                    if (this._ambientTexture && MaterialFlags.AmbientTextureEnabled) {
                        ubo.updateFloat4("vAmbientInfos", this._ambientTexture.coordinatesIndex, this._ambientTexture.level, this._ambientTextureStrength, this._ambientTextureImpactOnAnalyticalLights);
                        MaterialHelper.BindTextureMatrix(this._ambientTexture, ubo, "ambient");
                    }
                    if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
                        ubo.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level);
                        MaterialHelper.BindTextureMatrix(this._opacityTexture, ubo, "opacity");
                    }
                    if (reflectionTexture && MaterialFlags.ReflectionTextureEnabled) {
                        ubo.updateMatrix("reflectionMatrix", reflectionTexture.getReflectionTextureMatrix());
                        ubo.updateFloat2("vReflectionInfos", reflectionTexture.level, 0);
                        if (reflectionTexture.boundingBoxSize) {
                            var cubeTexture = reflectionTexture;
                            ubo.updateVector3("vReflectionPosition", cubeTexture.boundingBoxPosition);
                            ubo.updateVector3("vReflectionSize", cubeTexture.boundingBoxSize);
                        }
                        if (this.realTimeFiltering) {
                            var width = reflectionTexture.getSize().width;
                            ubo.updateFloat2("vReflectionFilteringInfo", width, Scalar.Log2(width));
                        }
                        if (!defines.USEIRRADIANCEMAP) {
                            var polynomials = reflectionTexture.sphericalPolynomial;
                            if (defines.USESPHERICALFROMREFLECTIONMAP && polynomials) {
                                if (defines.SPHERICAL_HARMONICS) {
                                    var preScaledHarmonics = polynomials.preScaledHarmonics;
                                    ubo.updateVector3("vSphericalL00", preScaledHarmonics.l00);
                                    ubo.updateVector3("vSphericalL1_1", preScaledHarmonics.l1_1);
                                    ubo.updateVector3("vSphericalL10", preScaledHarmonics.l10);
                                    ubo.updateVector3("vSphericalL11", preScaledHarmonics.l11);
                                    ubo.updateVector3("vSphericalL2_2", preScaledHarmonics.l2_2);
                                    ubo.updateVector3("vSphericalL2_1", preScaledHarmonics.l2_1);
                                    ubo.updateVector3("vSphericalL20", preScaledHarmonics.l20);
                                    ubo.updateVector3("vSphericalL21", preScaledHarmonics.l21);
                                    ubo.updateVector3("vSphericalL22", preScaledHarmonics.l22);
                                }
                                else {
                                    ubo.updateFloat3("vSphericalX", polynomials.x.x, polynomials.x.y, polynomials.x.z);
                                    ubo.updateFloat3("vSphericalY", polynomials.y.x, polynomials.y.y, polynomials.y.z);
                                    ubo.updateFloat3("vSphericalZ", polynomials.z.x, polynomials.z.y, polynomials.z.z);
                                    ubo.updateFloat3("vSphericalXX_ZZ", polynomials.xx.x - polynomials.zz.x, polynomials.xx.y - polynomials.zz.y, polynomials.xx.z - polynomials.zz.z);
                                    ubo.updateFloat3("vSphericalYY_ZZ", polynomials.yy.x - polynomials.zz.x, polynomials.yy.y - polynomials.zz.y, polynomials.yy.z - polynomials.zz.z);
                                    ubo.updateFloat3("vSphericalZZ", polynomials.zz.x, polynomials.zz.y, polynomials.zz.z);
                                    ubo.updateFloat3("vSphericalXY", polynomials.xy.x, polynomials.xy.y, polynomials.xy.z);
                                    ubo.updateFloat3("vSphericalYZ", polynomials.yz.x, polynomials.yz.y, polynomials.yz.z);
                                    ubo.updateFloat3("vSphericalZX", polynomials.zx.x, polynomials.zx.y, polynomials.zx.z);
                                }
                            }
                        }
                        ubo.updateFloat3("vReflectionMicrosurfaceInfos", reflectionTexture.getSize().width, reflectionTexture.lodGenerationScale, reflectionTexture.lodGenerationOffset);
                    }
                    if (this._emissiveTexture && MaterialFlags.EmissiveTextureEnabled) {
                        ubo.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level);
                        MaterialHelper.BindTextureMatrix(this._emissiveTexture, ubo, "emissive");
                    }
                    if (this._lightmapTexture && MaterialFlags.LightmapTextureEnabled) {
                        ubo.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level);
                        MaterialHelper.BindTextureMatrix(this._lightmapTexture, ubo, "lightmap");
                    }
                    if (MaterialFlags.SpecularTextureEnabled) {
                        if (this._metallicTexture) {
                            ubo.updateFloat3("vReflectivityInfos", this._metallicTexture.coordinatesIndex, this._metallicTexture.level, this._ambientTextureStrength);
                            MaterialHelper.BindTextureMatrix(this._metallicTexture, ubo, "reflectivity");
                        }
                        else if (this._reflectivityTexture) {
                            ubo.updateFloat3("vReflectivityInfos", this._reflectivityTexture.coordinatesIndex, this._reflectivityTexture.level, 1.0);
                            MaterialHelper.BindTextureMatrix(this._reflectivityTexture, ubo, "reflectivity");
                        }
                        if (this._metallicReflectanceTexture) {
                            ubo.updateFloat2("vMetallicReflectanceInfos", this._metallicReflectanceTexture.coordinatesIndex, this._metallicReflectanceTexture.level);
                            MaterialHelper.BindTextureMatrix(this._metallicReflectanceTexture, ubo, "metallicReflectance");
                        }
                        if (this._reflectanceTexture && defines.REFLECTANCE) {
                            ubo.updateFloat2("vReflectanceInfos", this._reflectanceTexture.coordinatesIndex, this._reflectanceTexture.level);
                            MaterialHelper.BindTextureMatrix(this._reflectanceTexture, ubo, "reflectance");
                        }
                        if (this._microSurfaceTexture) {
                            ubo.updateFloat2("vMicroSurfaceSamplerInfos", this._microSurfaceTexture.coordinatesIndex, this._microSurfaceTexture.level);
                            MaterialHelper.BindTextureMatrix(this._microSurfaceTexture, ubo, "microSurfaceSampler");
                        }
                    }
                    if (this._bumpTexture && engine.getCaps().standardDerivatives && MaterialFlags.BumpTextureEnabled && !this._disableBumpMap) {
                        ubo.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, this._bumpTexture.level, this._parallaxScaleBias);
                        MaterialHelper.BindTextureMatrix(this._bumpTexture, ubo, "bump");
                        if (scene._mirroredCameraPosition) {
                            ubo.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? 1.0 : -1.0, this._invertNormalMapY ? 1.0 : -1.0);
                        }
                        else {
                            ubo.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? -1.0 : 1.0, this._invertNormalMapY ? -1.0 : 1.0);
                        }
                    }
                }
                // Point size
                if (this.pointsCloud) {
                    ubo.updateFloat("pointSize", this.pointSize);
                }
                // Colors
                if (defines.METALLICWORKFLOW) {
                    TmpColors.Color3[0].r = this._metallic === undefined || this._metallic === null ? 1 : this._metallic;
                    TmpColors.Color3[0].g = this._roughness === undefined || this._roughness === null ? 1 : this._roughness;
                    ubo.updateColor4("vReflectivityColor", TmpColors.Color3[0], 1);
                    var ior = (_b = (_a = this.subSurface) === null || _a === void 0 ? void 0 : _a._indexOfRefraction) !== null && _b !== void 0 ? _b : 1.5;
                    var outsideIOR = 1; // consider air as clear coat and other layers would remap in the shader.
                    // We are here deriving our default reflectance from a common value for none metallic surface.
                    // Based of the schlick fresnel approximation model
                    // for dielectrics.
                    var f0 = Math.pow((ior - outsideIOR) / (ior + outsideIOR), 2);
                    // Tweak the default F0 and F90 based on our given setup
                    this._metallicReflectanceColor.scaleToRef(f0 * this._metallicF0Factor, TmpColors.Color3[0]);
                    var metallicF90 = this._metallicF0Factor;
                    ubo.updateColor4("vMetallicReflectanceFactors", TmpColors.Color3[0], metallicF90);
                }
                else {
                    ubo.updateColor4("vReflectivityColor", this._reflectivityColor, this._microSurface);
                }
                ubo.updateColor3("vEmissiveColor", MaterialFlags.EmissiveTextureEnabled ? this._emissiveColor : Color3.BlackReadOnly);
                ubo.updateColor3("vReflectionColor", this._reflectionColor);
                if (!defines.SS_REFRACTION && ((_c = this.subSurface) === null || _c === void 0 ? void 0 : _c._linkRefractionWithTransparency)) {
                    ubo.updateColor4("vAlbedoColor", this._albedoColor, 1);
                }
                else {
                    ubo.updateColor4("vAlbedoColor", this._albedoColor, this.alpha);
                }
                // Misc
                this._lightingInfos.x = this._directIntensity;
                this._lightingInfos.y = this._emissiveIntensity;
                this._lightingInfos.z = this._environmentIntensity * scene.environmentIntensity;
                this._lightingInfos.w = this._specularIntensity;
                ubo.updateVector4("vLightingIntensity", this._lightingInfos);
                // Colors
                scene.ambientColor.multiplyToRef(this._ambientColor, this._globalAmbientColor);
                ubo.updateColor3("vAmbientColor", this._globalAmbientColor);
                ubo.updateFloat2("vDebugMode", this._debugLimit, this._debugFactor);
            }
            // Textures
            if (scene.texturesEnabled) {
                if (this._albedoTexture && MaterialFlags.DiffuseTextureEnabled) {
                    ubo.setTexture("albedoSampler", this._albedoTexture);
                }
                if (this._ambientTexture && MaterialFlags.AmbientTextureEnabled) {
                    ubo.setTexture("ambientSampler", this._ambientTexture);
                }
                if (this._opacityTexture && MaterialFlags.OpacityTextureEnabled) {
                    ubo.setTexture("opacitySampler", this._opacityTexture);
                }
                if (reflectionTexture && MaterialFlags.ReflectionTextureEnabled) {
                    if (defines.LODBASEDMICROSFURACE) {
                        ubo.setTexture("reflectionSampler", reflectionTexture);
                    }
                    else {
                        ubo.setTexture("reflectionSampler", reflectionTexture._lodTextureMid || reflectionTexture);
                        ubo.setTexture("reflectionSamplerLow", reflectionTexture._lodTextureLow || reflectionTexture);
                        ubo.setTexture("reflectionSamplerHigh", reflectionTexture._lodTextureHigh || reflectionTexture);
                    }
                    if (defines.USEIRRADIANCEMAP) {
                        ubo.setTexture("irradianceSampler", reflectionTexture.irradianceTexture);
                    }
                }
                if (defines.ENVIRONMENTBRDF) {
                    ubo.setTexture("environmentBrdfSampler", this._environmentBRDFTexture);
                }
                if (this._emissiveTexture && MaterialFlags.EmissiveTextureEnabled) {
                    ubo.setTexture("emissiveSampler", this._emissiveTexture);
                }
                if (this._lightmapTexture && MaterialFlags.LightmapTextureEnabled) {
                    ubo.setTexture("lightmapSampler", this._lightmapTexture);
                }
                if (MaterialFlags.SpecularTextureEnabled) {
                    if (this._metallicTexture) {
                        ubo.setTexture("reflectivitySampler", this._metallicTexture);
                    }
                    else if (this._reflectivityTexture) {
                        ubo.setTexture("reflectivitySampler", this._reflectivityTexture);
                    }
                    if (this._metallicReflectanceTexture) {
                        ubo.setTexture("metallicReflectanceSampler", this._metallicReflectanceTexture);
                    }
                    if (this._reflectanceTexture && defines.REFLECTANCE) {
                        ubo.setTexture("reflectanceSampler", this._reflectanceTexture);
                    }
                    if (this._microSurfaceTexture) {
                        ubo.setTexture("microSurfaceSampler", this._microSurfaceTexture);
                    }
                }
                if (this._bumpTexture && engine.getCaps().standardDerivatives && MaterialFlags.BumpTextureEnabled && !this._disableBumpMap) {
                    ubo.setTexture("bumpSampler", this._bumpTexture);
                }
            }
            // OIT with depth peeling
            if (this.getScene().useOrderIndependentTransparency && this.needAlphaBlendingForMesh(mesh)) {
                this.getScene().depthPeelingRenderer.bind(effect);
            }
            this._eventInfo.subMesh = subMesh;
            this._callbackPluginEventBindForSubMesh(this._eventInfo);
            // Clip plane
            MaterialHelper.BindClipPlane(this._activeEffect, scene);
            this.bindEyePosition(effect);
        }
        else if (scene.getEngine()._features.needToAlwaysBindUniformBuffers) {
            this._needToBindSceneUbo = true;
        }
        if (mustRebind || !this.isFrozen) {
            // Lights
            if (scene.lightsEnabled && !this._disableLighting) {
                MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this._maxSimultaneousLights);
            }
            // View
            if ((scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) || reflectionTexture || mesh.receiveShadows || defines.PREPASS) {
                this.bindView(effect);
            }
            // Fog
            MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect, true);
            // Morph targets
            if (defines.NUM_MORPH_INFLUENCERS) {
                MaterialHelper.BindMorphTargetParameters(mesh, this._activeEffect);
            }
            if (defines.BAKED_VERTEX_ANIMATION_TEXTURE) {
                (_d = mesh.bakedVertexAnimationManager) === null || _d === void 0 ? void 0 : _d.bind(effect, defines.INSTANCES);
            }
            // image processing
            this._imageProcessingConfiguration.bind(this._activeEffect);
            // Log. depth
            MaterialHelper.BindLogDepth(defines, this._activeEffect, scene);
        }
        this._afterBind(mesh, this._activeEffect);
        ubo.update();
    };
    /**
     * Returns the animatable textures.
     * @returns - Array of animatable textures.
     */
    PBRBaseMaterial.prototype.getAnimatables = function () {
        var results = _super.prototype.getAnimatables.call(this);
        if (this._albedoTexture && this._albedoTexture.animations && this._albedoTexture.animations.length > 0) {
            results.push(this._albedoTexture);
        }
        if (this._ambientTexture && this._ambientTexture.animations && this._ambientTexture.animations.length > 0) {
            results.push(this._ambientTexture);
        }
        if (this._opacityTexture && this._opacityTexture.animations && this._opacityTexture.animations.length > 0) {
            results.push(this._opacityTexture);
        }
        if (this._reflectionTexture && this._reflectionTexture.animations && this._reflectionTexture.animations.length > 0) {
            results.push(this._reflectionTexture);
        }
        if (this._emissiveTexture && this._emissiveTexture.animations && this._emissiveTexture.animations.length > 0) {
            results.push(this._emissiveTexture);
        }
        if (this._metallicTexture && this._metallicTexture.animations && this._metallicTexture.animations.length > 0) {
            results.push(this._metallicTexture);
        }
        else if (this._reflectivityTexture && this._reflectivityTexture.animations && this._reflectivityTexture.animations.length > 0) {
            results.push(this._reflectivityTexture);
        }
        if (this._bumpTexture && this._bumpTexture.animations && this._bumpTexture.animations.length > 0) {
            results.push(this._bumpTexture);
        }
        if (this._lightmapTexture && this._lightmapTexture.animations && this._lightmapTexture.animations.length > 0) {
            results.push(this._lightmapTexture);
        }
        return results;
    };
    /**
     * Returns the texture used for reflections.
     * @returns - Reflection texture if present.  Otherwise, returns the environment texture.
     */
    PBRBaseMaterial.prototype._getReflectionTexture = function () {
        if (this._reflectionTexture) {
            return this._reflectionTexture;
        }
        return this.getScene().environmentTexture;
    };
    /**
     * Returns an array of the actively used textures.
     * @returns - Array of BaseTextures
     */
    PBRBaseMaterial.prototype.getActiveTextures = function () {
        var activeTextures = _super.prototype.getActiveTextures.call(this);
        if (this._albedoTexture) {
            activeTextures.push(this._albedoTexture);
        }
        if (this._ambientTexture) {
            activeTextures.push(this._ambientTexture);
        }
        if (this._opacityTexture) {
            activeTextures.push(this._opacityTexture);
        }
        if (this._reflectionTexture) {
            activeTextures.push(this._reflectionTexture);
        }
        if (this._emissiveTexture) {
            activeTextures.push(this._emissiveTexture);
        }
        if (this._reflectivityTexture) {
            activeTextures.push(this._reflectivityTexture);
        }
        if (this._metallicTexture) {
            activeTextures.push(this._metallicTexture);
        }
        if (this._metallicReflectanceTexture) {
            activeTextures.push(this._metallicReflectanceTexture);
        }
        if (this._reflectanceTexture) {
            activeTextures.push(this._reflectanceTexture);
        }
        if (this._microSurfaceTexture) {
            activeTextures.push(this._microSurfaceTexture);
        }
        if (this._bumpTexture) {
            activeTextures.push(this._bumpTexture);
        }
        if (this._lightmapTexture) {
            activeTextures.push(this._lightmapTexture);
        }
        return activeTextures;
    };
    /**
     * Checks to see if a texture is used in the material.
     * @param texture - Base texture to use.
     * @returns - Boolean specifying if a texture is used in the material.
     */
    PBRBaseMaterial.prototype.hasTexture = function (texture) {
        if (_super.prototype.hasTexture.call(this, texture)) {
            return true;
        }
        if (this._albedoTexture === texture) {
            return true;
        }
        if (this._ambientTexture === texture) {
            return true;
        }
        if (this._opacityTexture === texture) {
            return true;
        }
        if (this._reflectionTexture === texture) {
            return true;
        }
        if (this._reflectivityTexture === texture) {
            return true;
        }
        if (this._metallicTexture === texture) {
            return true;
        }
        if (this._metallicReflectanceTexture === texture) {
            return true;
        }
        if (this._reflectanceTexture === texture) {
            return true;
        }
        if (this._microSurfaceTexture === texture) {
            return true;
        }
        if (this._bumpTexture === texture) {
            return true;
        }
        if (this._lightmapTexture === texture) {
            return true;
        }
        return false;
    };
    /**
     * Sets the required values to the prepass renderer.
     */
    PBRBaseMaterial.prototype.setPrePassRenderer = function () {
        var _a;
        if ((_a = this.subSurface) === null || _a === void 0 ? void 0 : _a.isScatteringEnabled) {
            var subSurfaceConfiguration = this.getScene().enableSubSurfaceForPrePass();
            if (subSurfaceConfiguration) {
                subSurfaceConfiguration.enabled = true;
            }
            return true;
        }
        return false;
    };
    /**
     * Disposes the resources of the material.
     * @param forceDisposeEffect - Forces the disposal of effects.
     * @param forceDisposeTextures - Forces the disposal of all textures.
     */
    PBRBaseMaterial.prototype.dispose = function (forceDisposeEffect, forceDisposeTextures) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (forceDisposeTextures) {
            if (this._environmentBRDFTexture && this.getScene().environmentBRDFTexture !== this._environmentBRDFTexture) {
                this._environmentBRDFTexture.dispose();
            }
            (_a = this._albedoTexture) === null || _a === void 0 ? void 0 : _a.dispose();
            (_b = this._ambientTexture) === null || _b === void 0 ? void 0 : _b.dispose();
            (_c = this._opacityTexture) === null || _c === void 0 ? void 0 : _c.dispose();
            (_d = this._reflectionTexture) === null || _d === void 0 ? void 0 : _d.dispose();
            (_e = this._emissiveTexture) === null || _e === void 0 ? void 0 : _e.dispose();
            (_f = this._metallicTexture) === null || _f === void 0 ? void 0 : _f.dispose();
            (_g = this._reflectivityTexture) === null || _g === void 0 ? void 0 : _g.dispose();
            (_h = this._bumpTexture) === null || _h === void 0 ? void 0 : _h.dispose();
            (_j = this._lightmapTexture) === null || _j === void 0 ? void 0 : _j.dispose();
            (_k = this._metallicReflectanceTexture) === null || _k === void 0 ? void 0 : _k.dispose();
            (_l = this._reflectanceTexture) === null || _l === void 0 ? void 0 : _l.dispose();
            (_m = this._microSurfaceTexture) === null || _m === void 0 ? void 0 : _m.dispose();
        }
        this._renderTargets.dispose();
        if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
            this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
        }
        _super.prototype.dispose.call(this, forceDisposeEffect, forceDisposeTextures);
    };
    /**
     * PBRMaterialTransparencyMode: No transparency mode, Alpha channel is not use.
     */
    PBRBaseMaterial.PBRMATERIAL_OPAQUE = Material.MATERIAL_OPAQUE;
    /**
     * PBRMaterialTransparencyMode: Alpha Test mode, pixel are discarded below a certain threshold defined by the alpha cutoff value.
     */
    PBRBaseMaterial.PBRMATERIAL_ALPHATEST = Material.MATERIAL_ALPHATEST;
    /**
     * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     */
    PBRBaseMaterial.PBRMATERIAL_ALPHABLEND = Material.MATERIAL_ALPHABLEND;
    /**
     * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     * They are also discarded below the alpha cutoff threshold to improve performances.
     */
    PBRBaseMaterial.PBRMATERIAL_ALPHATESTANDBLEND = Material.MATERIAL_ALPHATESTANDBLEND;
    /**
     * Defines the default value of how much AO map is occluding the analytical lights
     * (point spot...).
     */
    PBRBaseMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS = 0;
    /**
     * PBRMaterialLightFalloff Physical: light is falling off following the inverse squared distance law.
     */
    PBRBaseMaterial.LIGHTFALLOFF_PHYSICAL = 0;
    /**
     * PBRMaterialLightFalloff gltf: light is falling off as described in the gltf moving to PBR document
     * to enhance interoperability with other engines.
     */
    PBRBaseMaterial.LIGHTFALLOFF_GLTF = 1;
    /**
     * PBRMaterialLightFalloff Standard: light is falling off like in the standard material
     * to enhance interoperability with other materials.
     */
    PBRBaseMaterial.LIGHTFALLOFF_STANDARD = 2;
    __decorate([
        serializeAsImageProcessingConfiguration()
    ], PBRBaseMaterial.prototype, "_imageProcessingConfiguration", void 0);
    __decorate([
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRBaseMaterial.prototype, "debugMode", void 0);
    __decorate([
        serialize()
    ], PBRBaseMaterial.prototype, "useLogarithmicDepth", null);
    return PBRBaseMaterial;
}(PushMaterial));

/**
 * The Physically based material of BJS.
 *
 * This offers the main features of a standard PBR material.
 * For more information, please refer to the documentation :
 * https://doc.babylonjs.com/how_to/physically_based_rendering
 */
var PBRMaterial = /** @class */ (function (_super) {
    __extends(PBRMaterial, _super);
    /**
     * Instantiates a new PBRMaterial instance.
     *
     * @param name The material name
     * @param scene The scene the material will be use in.
     */
    function PBRMaterial(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        /**
         * Intensity of the direct lights e.g. the four lights available in your scene.
         * This impacts both the direct diffuse and specular highlights.
         */
        _this.directIntensity = 1.0;
        /**
         * Intensity of the emissive part of the material.
         * This helps controlling the emissive effect without modifying the emissive color.
         */
        _this.emissiveIntensity = 1.0;
        /**
         * Intensity of the environment e.g. how much the environment will light the object
         * either through harmonics for rough material or through the reflection for shiny ones.
         */
        _this.environmentIntensity = 1.0;
        /**
         * This is a special control allowing the reduction of the specular highlights coming from the
         * four lights of the scene. Those highlights may not be needed in full environment lighting.
         */
        _this.specularIntensity = 1.0;
        /**
         * Debug Control allowing disabling the bump map on this material.
         */
        _this.disableBumpMap = false;
        /**
         * AKA Occlusion Texture Intensity in other nomenclature.
         */
        _this.ambientTextureStrength = 1.0;
        /**
         * Defines how much the AO map is occluding the analytical lights (point spot...).
         * 1 means it completely occludes it
         * 0 mean it has no impact
         */
        _this.ambientTextureImpactOnAnalyticalLights = PBRMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS;
        /**
         * In metallic workflow, specifies an F0 factor to help configuring the material F0.
         * By default the indexOfrefraction is used to compute F0;
         *
         * This is used as a factor against the default reflectance at normal incidence to tweak it.
         *
         * F0 = defaultF0 * metallicF0Factor * metallicReflectanceColor;
         * F90 = metallicReflectanceColor;
         */
        _this.metallicF0Factor = 1;
        /**
         * In metallic workflow, specifies an F90 color to help configuring the material F90.
         * By default the F90 is always 1;
         *
         * Please note that this factor is also used as a factor against the default reflectance at normal incidence.
         *
         * F0 = defaultF0 * metallicF0Factor * metallicReflectanceColor
         * F90 = metallicReflectanceColor;
         */
        _this.metallicReflectanceColor = Color3.White();
        /**
         * Specifies that only the A channel from metallicReflectanceTexture should be used.
         * If false, both RGB and A channels will be used
         */
        _this.useOnlyMetallicFromMetallicReflectanceTexture = false;
        /**
         * The color of a material in ambient lighting.
         */
        _this.ambientColor = new Color3(0, 0, 0);
        /**
         * AKA Diffuse Color in other nomenclature.
         */
        _this.albedoColor = new Color3(1, 1, 1);
        /**
         * AKA Specular Color in other nomenclature.
         */
        _this.reflectivityColor = new Color3(1, 1, 1);
        /**
         * The color reflected from the material.
         */
        _this.reflectionColor = new Color3(1.0, 1.0, 1.0);
        /**
         * The color emitted from the material.
         */
        _this.emissiveColor = new Color3(0, 0, 0);
        /**
         * AKA Glossiness in other nomenclature.
         */
        _this.microSurface = 1.0;
        /**
         * If true, the light map contains occlusion information instead of lighting info.
         */
        _this.useLightmapAsShadowmap = false;
        /**
         * Specifies that the alpha is coming form the albedo channel alpha channel for alpha blending.
         */
        _this.useAlphaFromAlbedoTexture = false;
        /**
         * Enforces alpha test in opaque or blend mode in order to improve the performances of some situations.
         */
        _this.forceAlphaTest = false;
        /**
         * Defines the alpha limits in alpha test mode.
         */
        _this.alphaCutOff = 0.4;
        /**
         * Specifies that the material will keep the specular highlights over a transparent surface (only the most luminous ones).
         * A car glass is a good example of that. When sun reflects on it you can not see what is behind.
         */
        _this.useSpecularOverAlpha = true;
        /**
         * Specifies if the reflectivity texture contains the glossiness information in its alpha channel.
         */
        _this.useMicroSurfaceFromReflectivityMapAlpha = false;
        /**
         * Specifies if the metallic texture contains the roughness information in its alpha channel.
         */
        _this.useRoughnessFromMetallicTextureAlpha = true;
        /**
         * Specifies if the metallic texture contains the roughness information in its green channel.
         */
        _this.useRoughnessFromMetallicTextureGreen = false;
        /**
         * Specifies if the metallic texture contains the metallness information in its blue channel.
         */
        _this.useMetallnessFromMetallicTextureBlue = false;
        /**
         * Specifies if the metallic texture contains the ambient occlusion information in its red channel.
         */
        _this.useAmbientOcclusionFromMetallicTextureRed = false;
        /**
         * Specifies if the ambient texture contains the ambient occlusion information in its red channel only.
         */
        _this.useAmbientInGrayScale = false;
        /**
         * In case the reflectivity map does not contain the microsurface information in its alpha channel,
         * The material will try to infer what glossiness each pixel should be.
         */
        _this.useAutoMicroSurfaceFromReflectivityMap = false;
        /**
         * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most luminous ones).
         * A car glass is a good example of that. When the street lights reflects on it you can not see what is behind.
         */
        _this.useRadianceOverAlpha = true;
        /**
         * Allows using an object space normal map (instead of tangent space).
         */
        _this.useObjectSpaceNormalMap = false;
        /**
         * Allows using the bump map in parallax mode.
         */
        _this.useParallax = false;
        /**
         * Allows using the bump map in parallax occlusion mode.
         */
        _this.useParallaxOcclusion = false;
        /**
         * Controls the scale bias of the parallax mode.
         */
        _this.parallaxScaleBias = 0.05;
        /**
         * If sets to true, disables all the lights affecting the material.
         */
        _this.disableLighting = false;
        /**
         * Force the shader to compute irradiance in the fragment shader in order to take bump in account.
         */
        _this.forceIrradianceInFragment = false;
        /**
         * Number of Simultaneous lights allowed on the material.
         */
        _this.maxSimultaneousLights = 4;
        /**
         * If sets to true, x component of normal map value will invert (x = 1.0 - x).
         */
        _this.invertNormalMapX = false;
        /**
         * If sets to true, y component of normal map value will invert (y = 1.0 - y).
         */
        _this.invertNormalMapY = false;
        /**
         * If sets to true and backfaceCulling is false, normals will be flipped on the backside.
         */
        _this.twoSidedLighting = false;
        /**
         * A fresnel is applied to the alpha of the model to ensure grazing angles edges are not alpha tested.
         * And/Or occlude the blended part. (alpha is converted to gamma to compute the fresnel)
         */
        _this.useAlphaFresnel = false;
        /**
         * A fresnel is applied to the alpha of the model to ensure grazing angles edges are not alpha tested.
         * And/Or occlude the blended part. (alpha stays linear to compute the fresnel)
         */
        _this.useLinearAlphaFresnel = false;
        /**
         * Let user defines the brdf lookup texture used for IBL.
         * A default 8bit version is embedded but you could point at :
         * * Default texture: https://assets.babylonjs.com/environments/correlatedMSBRDF_RGBD.png
         * * Default 16bit pixel depth texture: https://assets.babylonjs.com/environments/correlatedMSBRDF.dds
         * * LEGACY Default None correlated https://assets.babylonjs.com/environments/uncorrelatedBRDF_RGBD.png
         * * LEGACY Default None correlated 16bit pixel depth https://assets.babylonjs.com/environments/uncorrelatedBRDF.dds
         */
        _this.environmentBRDFTexture = null;
        /**
         * Force normal to face away from face.
         */
        _this.forceNormalForward = false;
        /**
         * Enables specular anti aliasing in the PBR shader.
         * It will both interacts on the Geometry for analytical and IBL lighting.
         * It also prefilter the roughness map based on the bump values.
         */
        _this.enableSpecularAntiAliasing = false;
        /**
         * This parameters will enable/disable Horizon occlusion to prevent normal maps to look shiny when the normal
         * makes the reflect vector face the model (under horizon).
         */
        _this.useHorizonOcclusion = true;
        /**
         * This parameters will enable/disable radiance occlusion by preventing the radiance to lit
         * too much the area relying on ambient texture to define their ambient occlusion.
         */
        _this.useRadianceOcclusion = true;
        /**
         * If set to true, no lighting calculations will be applied.
         */
        _this.unlit = false;
        _this._environmentBRDFTexture = GetEnvironmentBRDFTexture(_this.getScene());
        return _this;
    }
    Object.defineProperty(PBRMaterial.prototype, "refractionTexture", {
        /**
         * Stores the refracted light information in a texture.
         */
        get: function () {
            return this.subSurface.refractionTexture;
        },
        set: function (value) {
            this.subSurface.refractionTexture = value;
            if (value) {
                this.subSurface.isRefractionEnabled = true;
            }
            else if (!this.subSurface.linkRefractionWithTransparency) {
                this.subSurface.isRefractionEnabled = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "indexOfRefraction", {
        /**
         * Index of refraction of the material base layer.
         * https://en.wikipedia.org/wiki/List_of_refractive_indices
         *
         * This does not only impact refraction but also the Base F0 of Dielectric Materials.
         *
         * From dielectric fresnel rules: F0 = square((iorT - iorI) / (iorT + iorI))
         */
        get: function () {
            return this.subSurface.indexOfRefraction;
        },
        set: function (value) {
            this.subSurface.indexOfRefraction = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "invertRefractionY", {
        /**
         * Controls if refraction needs to be inverted on Y. This could be useful for procedural texture.
         */
        get: function () {
            return this.subSurface.invertRefractionY;
        },
        set: function (value) {
            this.subSurface.invertRefractionY = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "linkRefractionWithTransparency", {
        /**
         * This parameters will make the material used its opacity to control how much it is refracting against not.
         * Materials half opaque for instance using refraction could benefit from this control.
         */
        get: function () {
            return this.subSurface.linkRefractionWithTransparency;
        },
        set: function (value) {
            this.subSurface.linkRefractionWithTransparency = value;
            if (value) {
                this.subSurface.isRefractionEnabled = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "usePhysicalLightFalloff", {
        /**
         * BJS is using an hardcoded light falloff based on a manually sets up range.
         * In PBR, one way to represents the falloff is to use the inverse squared root algorithm.
         * This parameter can help you switch back to the BJS mode in order to create scenes using both materials.
         */
        get: function () {
            return this._lightFalloff === PBRBaseMaterial.LIGHTFALLOFF_PHYSICAL;
        },
        /**
         * BJS is using an hardcoded light falloff based on a manually sets up range.
         * In PBR, one way to represents the falloff is to use the inverse squared root algorithm.
         * This parameter can help you switch back to the BJS mode in order to create scenes using both materials.
         */
        set: function (value) {
            if (value !== this.usePhysicalLightFalloff) {
                // Ensure the effect will be rebuilt.
                this._markAllSubMeshesAsTexturesDirty();
                if (value) {
                    this._lightFalloff = PBRBaseMaterial.LIGHTFALLOFF_PHYSICAL;
                }
                else {
                    this._lightFalloff = PBRBaseMaterial.LIGHTFALLOFF_STANDARD;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "useGLTFLightFalloff", {
        /**
         * In order to support the falloff compatibility with gltf, a special mode has been added
         * to reproduce the gltf light falloff.
         */
        get: function () {
            return this._lightFalloff === PBRBaseMaterial.LIGHTFALLOFF_GLTF;
        },
        /**
         * In order to support the falloff compatibility with gltf, a special mode has been added
         * to reproduce the gltf light falloff.
         */
        set: function (value) {
            if (value !== this.useGLTFLightFalloff) {
                // Ensure the effect will be rebuilt.
                this._markAllSubMeshesAsTexturesDirty();
                if (value) {
                    this._lightFalloff = PBRBaseMaterial.LIGHTFALLOFF_GLTF;
                }
                else {
                    this._lightFalloff = PBRBaseMaterial.LIGHTFALLOFF_STANDARD;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "imageProcessingConfiguration", {
        /**
         * Gets the image processing configuration used either in this material.
         */
        get: function () {
            return this._imageProcessingConfiguration;
        },
        /**
         * Sets the Default image processing configuration used either in the this material.
         *
         * If sets to null, the scene one is in use.
         */
        set: function (value) {
            this._attachImageProcessingConfiguration(value);
            // Ensure the effect will be rebuilt.
            this._markAllSubMeshesAsTexturesDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraColorCurvesEnabled", {
        /**
         * Gets whether the color curves effect is enabled.
         */
        get: function () {
            return this.imageProcessingConfiguration.colorCurvesEnabled;
        },
        /**
         * Sets whether the color curves effect is enabled.
         */
        set: function (value) {
            this.imageProcessingConfiguration.colorCurvesEnabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraColorGradingEnabled", {
        /**
         * Gets whether the color grading effect is enabled.
         */
        get: function () {
            return this.imageProcessingConfiguration.colorGradingEnabled;
        },
        /**
         * Gets whether the color grading effect is enabled.
         */
        set: function (value) {
            this.imageProcessingConfiguration.colorGradingEnabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraToneMappingEnabled", {
        /**
         * Gets whether tonemapping is enabled or not.
         */
        get: function () {
            return this._imageProcessingConfiguration.toneMappingEnabled;
        },
        /**
         * Sets whether tonemapping is enabled or not
         */
        set: function (value) {
            this._imageProcessingConfiguration.toneMappingEnabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraExposure", {
        /**
         * The camera exposure used on this material.
         * This property is here and not in the camera to allow controlling exposure without full screen post process.
         * This corresponds to a photographic exposure.
         */
        get: function () {
            return this._imageProcessingConfiguration.exposure;
        },
        /**
         * The camera exposure used on this material.
         * This property is here and not in the camera to allow controlling exposure without full screen post process.
         * This corresponds to a photographic exposure.
         */
        set: function (value) {
            this._imageProcessingConfiguration.exposure = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraContrast", {
        /**
         * Gets The camera contrast used on this material.
         */
        get: function () {
            return this._imageProcessingConfiguration.contrast;
        },
        /**
         * Sets The camera contrast used on this material.
         */
        set: function (value) {
            this._imageProcessingConfiguration.contrast = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraColorGradingTexture", {
        /**
         * Gets the Color Grading 2D Lookup Texture.
         */
        get: function () {
            return this._imageProcessingConfiguration.colorGradingTexture;
        },
        /**
         * Sets the Color Grading 2D Lookup Texture.
         */
        set: function (value) {
            this._imageProcessingConfiguration.colorGradingTexture = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PBRMaterial.prototype, "cameraColorCurves", {
        /**
         * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
         * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
         * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
         * corresponding to low luminance, medium luminance, and high luminance areas respectively.
         */
        get: function () {
            return this._imageProcessingConfiguration.colorCurves;
        },
        /**
         * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
         * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
         * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
         * corresponding to low luminance, medium luminance, and high luminance areas respectively.
         */
        set: function (value) {
            this._imageProcessingConfiguration.colorCurves = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the name of this material class.
     */
    PBRMaterial.prototype.getClassName = function () {
        return "PBRMaterial";
    };
    /**
     * Makes a duplicate of the current material.
     * @param name - name to use for the new material.
     */
    PBRMaterial.prototype.clone = function (name) {
        var _this = this;
        var clone = SerializationHelper.Clone(function () { return new PBRMaterial(name, _this.getScene()); }, this);
        clone.id = name;
        clone.name = name;
        this.stencil.copyTo(clone.stencil);
        this.clearCoat.copyTo(clone.clearCoat);
        this.anisotropy.copyTo(clone.anisotropy);
        this.brdf.copyTo(clone.brdf);
        this.sheen.copyTo(clone.sheen);
        this.subSurface.copyTo(clone.subSurface);
        return clone;
    };
    /**
     * Serializes this PBR Material.
     * @returns - An object with the serialized material.
     */
    PBRMaterial.prototype.serialize = function () {
        var serializationObject = _super.prototype.serialize.call(this);
        serializationObject.customType = "BABYLON.PBRMaterial";
        serializationObject.clearCoat = this.clearCoat.serialize();
        serializationObject.anisotropy = this.anisotropy.serialize();
        serializationObject.brdf = this.brdf.serialize();
        serializationObject.sheen = this.sheen.serialize();
        serializationObject.subSurface = this.subSurface.serialize();
        serializationObject.iridescence = this.iridescence.serialize();
        return serializationObject;
    };
    // Statics
    /**
     * Parses a PBR Material from a serialized object.
     * @param source - Serialized object.
     * @param scene - BJS scene instance.
     * @param rootUrl - url for the scene object
     * @returns - PBRMaterial
     */
    PBRMaterial.Parse = function (source, scene, rootUrl) {
        var material = SerializationHelper.Parse(function () { return new PBRMaterial(source.name, scene); }, source, scene, rootUrl);
        if (source.stencil) {
            material.stencil.parse(source.stencil, scene, rootUrl);
        }
        if (source.clearCoat) {
            material.clearCoat.parse(source.clearCoat, scene, rootUrl);
        }
        if (source.anisotropy) {
            material.anisotropy.parse(source.anisotropy, scene, rootUrl);
        }
        if (source.brdf) {
            material.brdf.parse(source.brdf, scene, rootUrl);
        }
        if (source.sheen) {
            material.sheen.parse(source.sheen, scene, rootUrl);
        }
        if (source.subSurface) {
            material.subSurface.parse(source.subSurface, scene, rootUrl);
        }
        if (source.iridescence) {
            material.iridescence.parse(source.iridescence, scene, rootUrl);
        }
        return material;
    };
    /**
     * PBRMaterialTransparencyMode: No transparency mode, Alpha channel is not use.
     */
    PBRMaterial.PBRMATERIAL_OPAQUE = PBRBaseMaterial.PBRMATERIAL_OPAQUE;
    /**
     * PBRMaterialTransparencyMode: Alpha Test mode, pixel are discarded below a certain threshold defined by the alpha cutoff value.
     */
    PBRMaterial.PBRMATERIAL_ALPHATEST = PBRBaseMaterial.PBRMATERIAL_ALPHATEST;
    /**
     * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     */
    PBRMaterial.PBRMATERIAL_ALPHABLEND = PBRBaseMaterial.PBRMATERIAL_ALPHABLEND;
    /**
     * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
     * They are also discarded below the alpha cutoff threshold to improve performances.
     */
    PBRMaterial.PBRMATERIAL_ALPHATESTANDBLEND = PBRBaseMaterial.PBRMATERIAL_ALPHATESTANDBLEND;
    /**
     * Defines the default value of how much AO map is occluding the analytical lights
     * (point spot...).
     */
    PBRMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS = PBRBaseMaterial.DEFAULT_AO_ON_ANALYTICAL_LIGHTS;
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "directIntensity", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "emissiveIntensity", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "environmentIntensity", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "specularIntensity", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "disableBumpMap", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "albedoTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "ambientTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "ambientTextureStrength", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "ambientTextureImpactOnAnalyticalLights", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], PBRMaterial.prototype, "opacityTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "reflectionTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "emissiveTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "reflectivityTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "metallicTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "metallic", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "roughness", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "metallicF0Factor", void 0);
    __decorate([
        serializeAsColor3(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "metallicReflectanceColor", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useOnlyMetallicFromMetallicReflectanceTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "metallicReflectanceTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "reflectanceTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "microSurfaceTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "bumpTexture", void 0);
    __decorate([
        serializeAsTexture(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty", null)
    ], PBRMaterial.prototype, "lightmapTexture", void 0);
    __decorate([
        serializeAsColor3("ambient"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "ambientColor", void 0);
    __decorate([
        serializeAsColor3("albedo"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "albedoColor", void 0);
    __decorate([
        serializeAsColor3("reflectivity"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "reflectivityColor", void 0);
    __decorate([
        serializeAsColor3("reflection"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "reflectionColor", void 0);
    __decorate([
        serializeAsColor3("emissive"),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "emissiveColor", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "microSurface", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useLightmapAsShadowmap", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], PBRMaterial.prototype, "useAlphaFromAlbedoTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], PBRMaterial.prototype, "forceAlphaTest", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesAndMiscDirty")
    ], PBRMaterial.prototype, "alphaCutOff", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useSpecularOverAlpha", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useMicroSurfaceFromReflectivityMapAlpha", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useRoughnessFromMetallicTextureAlpha", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useRoughnessFromMetallicTextureGreen", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useMetallnessFromMetallicTextureBlue", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useAmbientOcclusionFromMetallicTextureRed", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useAmbientInGrayScale", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useAutoMicroSurfaceFromReflectivityMap", void 0);
    __decorate([
        serialize()
    ], PBRMaterial.prototype, "usePhysicalLightFalloff", null);
    __decorate([
        serialize()
    ], PBRMaterial.prototype, "useGLTFLightFalloff", null);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useRadianceOverAlpha", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useObjectSpaceNormalMap", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useParallax", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useParallaxOcclusion", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "parallaxScaleBias", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsLightsDirty")
    ], PBRMaterial.prototype, "disableLighting", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "forceIrradianceInFragment", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsLightsDirty")
    ], PBRMaterial.prototype, "maxSimultaneousLights", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "invertNormalMapX", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "invertNormalMapY", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "twoSidedLighting", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useAlphaFresnel", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useLinearAlphaFresnel", void 0);
    __decorate([
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "environmentBRDFTexture", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "forceNormalForward", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "enableSpecularAntiAliasing", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useHorizonOcclusion", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsTexturesDirty")
    ], PBRMaterial.prototype, "useRadianceOcclusion", void 0);
    __decorate([
        serialize(),
        expandToProperty("_markAllSubMeshesAsMiscDirty")
    ], PBRMaterial.prototype, "unlit", void 0);
    return PBRMaterial;
}(PBRBaseMaterial));
RegisterClass("BABYLON.PBRMaterial", PBRMaterial);

export { PBRMaterial };
