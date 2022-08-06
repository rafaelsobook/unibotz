import { a as __extends } from './tslib.es6-2542203d.js';
import { O as Observable } from './observable-08535f24.js';
import { V as Vector3, M as Matrix, Q as Quaternion, T as TmpVectors } from './math.vector-92740b4e.js';
import { E as Engine } from './engine-6da2def3.js';
import { V as VertexBuffer } from './buffer-82c85d65.js';
import { V as VertexData } from './mesh.vertexData-2eb0b9d2.js';
import { T as TransformNode } from './transformNode-44d4ede4.js';
import { P as PickingInfo } from './pickingInfo-2221fa52.js';
import { B as BoundingInfo } from './boundingInfo-f6524041.js';
import { U as UniformBuffer } from './uniformBuffer-c6105a9c.js';
import { _ as _WarnImport } from './devTools-40c203e4.js';
import { e as extractMinAndMax } from './math.functions-a28f00ce.js';
import { C as Color3, a as Color4 } from './math.color-1c350db4.js';
import { E as Epsilon } from './arrayTools-18b75ee3.js';
import { A as Axis } from './math.axis-65421e97.js';
import { R as RegisterClass } from './typeStore-e0f83823.js';

/**
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _MeshCollisionData = /** @class */ (function () {
    function _MeshCollisionData() {
        this._checkCollisions = false;
        this._collisionMask = -1;
        this._collisionGroup = -1;
        this._surroundingMeshes = null;
        this._collider = null;
        this._oldPositionForCollisions = new Vector3(0, 0, 0);
        this._diffPositionForCollisions = new Vector3(0, 0, 0);
        this._collisionResponse = true;
    }
    return _MeshCollisionData;
}());

/** @hidden */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _FacetDataStorage = /** @class */ (function () {
    function _FacetDataStorage() {
        this.facetNb = 0; // facet number
        this.partitioningSubdivisions = 10; // number of subdivisions per axis in the partitioning space
        this.partitioningBBoxRatio = 1.01; // the partitioning array space is by default 1% bigger than the bounding box
        this.facetDataEnabled = false; // is the facet data feature enabled on this mesh ?
        this.facetParameters = {}; // keep a reference to the object parameters to avoid memory re-allocation
        this.bbSize = Vector3.Zero(); // bbox size approximated for facet data
        this.subDiv = {
            // actual number of subdivisions per axis for ComputeNormals()
            max: 1,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            X: 1,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Y: 1,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Z: 1,
        };
        this.facetDepthSort = false; // is the facet depth sort to be computed
        this.facetDepthSortEnabled = false; // is the facet depth sort initialized
    }
    return _FacetDataStorage;
}());
/**
 * @hidden
 **/
// eslint-disable-next-line @typescript-eslint/naming-convention
var _InternalAbstractMeshDataInfo = /** @class */ (function () {
    function _InternalAbstractMeshDataInfo() {
        this._hasVertexAlpha = false;
        this._useVertexColors = true;
        this._numBoneInfluencers = 4;
        this._applyFog = true;
        this._receiveShadows = false;
        this._facetData = new _FacetDataStorage();
        this._visibility = 1.0;
        this._skeleton = null;
        this._layerMask = 0x0fffffff;
        this._computeBonesUsingShaders = true;
        this._isActive = false;
        this._onlyForInstances = false;
        this._isActiveIntermediate = false;
        this._onlyForInstancesIntermediate = false;
        this._actAsRegularMesh = false;
        this._currentLOD = null;
        this._currentLODIsUpToDate = false;
        this._collisionRetryCount = 3;
        this._morphTargetManager = null;
        this._renderingGroupId = 0;
        this._bakedVertexAnimationManager = null;
        this._material = null;
        this._positions = null;
        // Collisions
        this._meshCollisionData = new _MeshCollisionData();
        this._enableDistantPicking = false;
    }
    return _InternalAbstractMeshDataInfo;
}());
/**
 * Class used to store all common mesh properties
 */
var AbstractMesh = /** @class */ (function (_super) {
    __extends(AbstractMesh, _super);
    // Constructor
    /**
     * Creates a new AbstractMesh
     * @param name defines the name of the mesh
     * @param scene defines the hosting scene
     */
    function AbstractMesh(name, scene) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, name, scene, false) || this;
        // Internal data
        /** @hidden */
        _this._internalAbstractMeshDataInfo = new _InternalAbstractMeshDataInfo();
        /** @hidden */
        _this._waitingMaterialId = null;
        /**
         * The culling strategy to use to check whether the mesh must be rendered or not.
         * This value can be changed at any time and will be used on the next render mesh selection.
         * The possible values are :
         * - AbstractMesh.CULLINGSTRATEGY_STANDARD
         * - AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
         * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION
         * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
         * Please read each static variable documentation to get details about the culling process.
         * */
        _this.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
        // Events
        /**
         * An event triggered when this mesh collides with another one
         */
        _this.onCollideObservable = new Observable();
        /**
         * An event triggered when the collision's position changes
         */
        _this.onCollisionPositionChangeObservable = new Observable();
        /**
         * An event triggered when material is changed
         */
        _this.onMaterialChangedObservable = new Observable();
        // Properties
        /**
         * Gets or sets the orientation for POV movement & rotation
         */
        _this.definedFacingForward = true;
        /** @hidden */
        _this._occlusionQuery = null;
        /** @hidden */
        _this._renderingGroup = null;
        /** Gets or sets the alpha index used to sort transparent meshes
         * @see https://doc.babylonjs.com/resources/transparency_and_how_meshes_are_rendered#alpha-index
         */
        _this.alphaIndex = Number.MAX_VALUE;
        /**
         * Gets or sets a boolean indicating if the mesh is visible (renderable). Default is true
         */
        _this.isVisible = true;
        /**
         * Gets or sets a boolean indicating if the mesh can be picked (by scene.pick for instance or through actions). Default is true
         */
        _this.isPickable = true;
        /**
         * Gets or sets a boolean indicating if the mesh can be near picked. Default is false
         */
        _this.isNearPickable = false;
        /**
         * Gets or sets a boolean indicating if the mesh can be near grabbed. Default is false
         */
        _this.isNearGrabbable = false;
        /** Gets or sets a boolean indicating that bounding boxes of subMeshes must be rendered as well (false by default) */
        _this.showSubMeshesBoundingBox = false;
        /** Gets or sets a boolean indicating if the mesh must be considered as a ray blocker for lens flares (false by default)
         * @see https://doc.babylonjs.com/how_to/how_to_use_lens_flares
         */
        _this.isBlocker = false;
        /**
         * Gets or sets a boolean indicating that pointer move events must be supported on this mesh (false by default)
         */
        _this.enablePointerMoveEvents = false;
        /** Defines color to use when rendering outline */
        _this.outlineColor = Color3.Red();
        /** Define width to use when rendering outline */
        _this.outlineWidth = 0.02;
        /** Defines color to use when rendering overlay */
        _this.overlayColor = Color3.Red();
        /** Defines alpha to use when rendering overlay */
        _this.overlayAlpha = 0.5;
        /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes selection (true by default) */
        _this.useOctreeForRenderingSelection = true;
        /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes picking (true by default) */
        _this.useOctreeForPicking = true;
        /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes collision (true by default) */
        _this.useOctreeForCollisions = true;
        /**
         * True if the mesh must be rendered in any case (this will shortcut the frustum clipping phase)
         */
        _this.alwaysSelectAsActiveMesh = false;
        /**
         * Gets or sets a boolean indicating that the bounding info does not need to be kept in sync (for performance reason)
         */
        _this.doNotSyncBoundingInfo = false;
        /**
         * Gets or sets the current action manager
         * @see https://doc.babylonjs.com/how_to/how_to_use_actions
         */
        _this.actionManager = null;
        /**
         * Gets or sets the ellipsoid used to impersonate this mesh when using collision engine (default is (0.5, 1, 0.5))
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        _this.ellipsoid = new Vector3(0.5, 1, 0.5);
        /**
         * Gets or sets the ellipsoid offset used to impersonate this mesh when using collision engine (default is (0, 0, 0))
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        _this.ellipsoidOffset = new Vector3(0, 0, 0);
        // Edges
        /**
         * Defines edge width used when edgesRenderer is enabled
         * @see https://www.babylonjs-playground.com/#10OJSG#13
         */
        _this.edgesWidth = 1;
        /**
         * Defines edge color used when edgesRenderer is enabled
         * @see https://www.babylonjs-playground.com/#10OJSG#13
         */
        _this.edgesColor = new Color4(1, 0, 0, 1);
        /** @hidden */
        _this._edgesRenderer = null;
        /** @hidden */
        _this._masterMesh = null;
        _this._boundingInfo = null;
        _this._boundingInfoIsDirty = true;
        /** @hidden */
        _this._renderId = 0;
        /** @hidden */
        _this._intersectionsInProgress = new Array();
        /** @hidden */
        _this._unIndexed = false;
        /** @hidden */
        _this._lightSources = new Array();
        // Loading properties
        /** @hidden */
        _this._waitingData = {
            lods: null,
            actions: null,
            freezeWorldMatrix: null,
        };
        /** @hidden */
        _this._bonesTransformMatrices = null;
        /** @hidden */
        _this._transformMatrixTexture = null;
        /**
         * An event triggered when the mesh is rebuilt.
         */
        _this.onRebuildObservable = new Observable();
        _this._onCollisionPositionChange = function (collisionId, newPosition, collidedMesh) {
            if (collidedMesh === void 0) { collidedMesh = null; }
            newPosition.subtractToRef(_this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions, _this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions);
            if (_this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions.length() > Engine.CollisionsEpsilon) {
                _this.position.addInPlace(_this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions);
            }
            if (collidedMesh) {
                _this.onCollideObservable.notifyObservers(collidedMesh);
            }
            _this.onCollisionPositionChangeObservable.notifyObservers(_this.position);
        };
        _this.getScene().addMesh(_this);
        _this._resyncLightSources();
        // Mesh Uniform Buffer.
        _this._uniformBuffer = new UniformBuffer(_this.getScene().getEngine(), undefined, undefined, name, !_this.getScene().getEngine().isWebGPU);
        _this._buildUniformLayout();
        return _this;
    }
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_NONE", {
        /**
         * No billboard
         */
        get: function () {
            return TransformNode.BILLBOARDMODE_NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_X", {
        /** Billboard on X axis */
        get: function () {
            return TransformNode.BILLBOARDMODE_X;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_Y", {
        /** Billboard on Y axis */
        get: function () {
            return TransformNode.BILLBOARDMODE_Y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_Z", {
        /** Billboard on Z axis */
        get: function () {
            return TransformNode.BILLBOARDMODE_Z;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_ALL", {
        /** Billboard on all axes */
        get: function () {
            return TransformNode.BILLBOARDMODE_ALL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh, "BILLBOARDMODE_USE_POSITION", {
        /** Billboard on using position instead of orientation */
        get: function () {
            return TransformNode.BILLBOARDMODE_USE_POSITION;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "facetNb", {
        /**
         * Gets the number of facets in the mesh
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#what-is-a-mesh-facet
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.facetNb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "partitioningSubdivisions", {
        /**
         * Gets or set the number (integer) of subdivisions per axis in the partitioning space
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#tweaking-the-partitioning
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.partitioningSubdivisions;
        },
        set: function (nb) {
            this._internalAbstractMeshDataInfo._facetData.partitioningSubdivisions = nb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "partitioningBBoxRatio", {
        /**
         * The ratio (float) to apply to the bounding box size to set to the partitioning space.
         * Ex : 1.01 (default) the partitioning space is 1% bigger than the bounding box
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#tweaking-the-partitioning
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.partitioningBBoxRatio;
        },
        set: function (ratio) {
            this._internalAbstractMeshDataInfo._facetData.partitioningBBoxRatio = ratio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "mustDepthSortFacets", {
        /**
         * Gets or sets a boolean indicating that the facets must be depth sorted on next call to `updateFacetData()`.
         * Works only for updatable meshes.
         * Doesn't work with multi-materials
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#facet-depth-sort
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.facetDepthSort;
        },
        set: function (sort) {
            this._internalAbstractMeshDataInfo._facetData.facetDepthSort = sort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "facetDepthSortFrom", {
        /**
         * The location (Vector3) where the facet depth sort must be computed from.
         * By default, the active camera position.
         * Used only when facet depth sort is enabled
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#facet-depth-sort
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.facetDepthSortFrom;
        },
        set: function (location) {
            this._internalAbstractMeshDataInfo._facetData.facetDepthSortFrom = location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "collisionRetryCount", {
        /** number of collision detection tries. Change this value if not all collisions are detected and handled properly */
        get: function () {
            return this._internalAbstractMeshDataInfo._collisionRetryCount;
        },
        set: function (retryCount) {
            this._internalAbstractMeshDataInfo._collisionRetryCount = retryCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "isFacetDataEnabled", {
        /**
         * gets a boolean indicating if facetData is enabled
         * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata#what-is-a-mesh-facet
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._facetData.facetDataEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "morphTargetManager", {
        /**
         * Gets or sets the morph target manager
         * @see https://doc.babylonjs.com/how_to/how_to_use_morphtargets
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._morphTargetManager;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._morphTargetManager === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._morphTargetManager = value;
            this._syncGeometryWithMorphTargetManager();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "bakedVertexAnimationManager", {
        /**
         * Gets or sets the baked vertex animation manager
         * @see https://doc.babylonjs.com/divingDeeper/animation/baked_texture_animations
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._bakedVertexAnimationManager;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._bakedVertexAnimationManager === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._bakedVertexAnimationManager = value;
            this._markSubMeshesAsAttributesDirty();
        },
        enumerable: false,
        configurable: true
    });
    /** @hidden */
    AbstractMesh.prototype._syncGeometryWithMorphTargetManager = function () { };
    /**
     * @param value
     * @hidden
     */
    AbstractMesh.prototype._updateNonUniformScalingState = function (value) {
        if (!_super.prototype._updateNonUniformScalingState.call(this, value)) {
            return false;
        }
        this._markSubMeshesAsMiscDirty();
        return true;
    };
    Object.defineProperty(AbstractMesh.prototype, "onCollide", {
        /** Set a function to call when this mesh collides with another one */
        set: function (callback) {
            if (this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver) {
                this.onCollideObservable.remove(this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver);
            }
            this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver = this.onCollideObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "onCollisionPositionChange", {
        /** Set a function to call when the collision's position changes */
        set: function (callback) {
            if (this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver) {
                this.onCollisionPositionChangeObservable.remove(this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver);
            }
            this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver = this.onCollisionPositionChangeObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "visibility", {
        /**
         * Gets or sets mesh visibility between 0 and 1 (default is 1)
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._visibility;
        },
        /**
         * Gets or sets mesh visibility between 0 and 1 (default is 1)
         */
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._visibility === value) {
                return;
            }
            var oldValue = this._internalAbstractMeshDataInfo._visibility;
            this._internalAbstractMeshDataInfo._visibility = value;
            if ((oldValue === 1 && value !== 1) || (oldValue !== 1 && value === 1)) {
                this._markSubMeshesAsMiscDirty();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "renderingGroupId", {
        /**
         * Specifies the rendering group id for this mesh (0 by default)
         * @see https://doc.babylonjs.com/resources/transparency_and_how_meshes_are_rendered#rendering-groups
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._renderingGroupId;
        },
        set: function (value) {
            this._internalAbstractMeshDataInfo._renderingGroupId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "material", {
        /** Gets or sets current material */
        get: function () {
            return this._internalAbstractMeshDataInfo._material;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._material === value) {
                return;
            }
            // remove from material mesh map id needed
            if (this._internalAbstractMeshDataInfo._material && this._internalAbstractMeshDataInfo._material.meshMap) {
                this._internalAbstractMeshDataInfo._material.meshMap[this.uniqueId] = undefined;
            }
            this._internalAbstractMeshDataInfo._material = value;
            if (value && value.meshMap) {
                value.meshMap[this.uniqueId] = this;
            }
            if (this.onMaterialChangedObservable.hasObservers()) {
                this.onMaterialChangedObservable.notifyObservers(this);
            }
            if (!this.subMeshes) {
                return;
            }
            this.resetDrawCache();
            this._unBindEffect();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the material used to render the mesh in a specific render pass
     * @param renderPassId render pass id
     * @returns material used for the render pass. If no specific material is used for this render pass, undefined is returned (meaning mesh.material is used for this pass)
     */
    AbstractMesh.prototype.getMaterialForRenderPass = function (renderPassId) {
        var _a;
        return (_a = this._internalAbstractMeshDataInfo._materialForRenderPass) === null || _a === void 0 ? void 0 : _a[renderPassId];
    };
    /**
     * Sets the material to be used to render the mesh in a specific render pass
     * @param renderPassId render pass id
     * @param material material to use for this render pass. If undefined is passed, no specific material will be used for this render pass but the regular material will be used instead (mesh.material)
     */
    AbstractMesh.prototype.setMaterialForRenderPass = function (renderPassId, material) {
        this.resetDrawCache(renderPassId);
        if (!this._internalAbstractMeshDataInfo._materialForRenderPass) {
            this._internalAbstractMeshDataInfo._materialForRenderPass = [];
        }
        this._internalAbstractMeshDataInfo._materialForRenderPass[renderPassId] = material;
    };
    Object.defineProperty(AbstractMesh.prototype, "receiveShadows", {
        /**
         * Gets or sets a boolean indicating that this mesh can receive realtime shadows
         * @see https://doc.babylonjs.com/babylon101/shadows
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._receiveShadows;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._receiveShadows === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._receiveShadows = value;
            this._markSubMeshesAsLightDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "hasVertexAlpha", {
        /** Gets or sets a boolean indicating that this mesh contains vertex color data with alpha values */
        get: function () {
            return this._internalAbstractMeshDataInfo._hasVertexAlpha;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._hasVertexAlpha === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._hasVertexAlpha = value;
            this._markSubMeshesAsAttributesDirty();
            this._markSubMeshesAsMiscDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "useVertexColors", {
        /** Gets or sets a boolean indicating that this mesh needs to use vertex color data to render (if this kind of vertex data is available in the geometry) */
        get: function () {
            return this._internalAbstractMeshDataInfo._useVertexColors;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._useVertexColors === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._useVertexColors = value;
            this._markSubMeshesAsAttributesDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "computeBonesUsingShaders", {
        /**
         * Gets or sets a boolean indicating that bone animations must be computed by the CPU (false by default)
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._computeBonesUsingShaders;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._computeBonesUsingShaders === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._computeBonesUsingShaders = value;
            this._markSubMeshesAsAttributesDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "numBoneInfluencers", {
        /** Gets or sets the number of allowed bone influences per vertex (4 by default) */
        get: function () {
            return this._internalAbstractMeshDataInfo._numBoneInfluencers;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._numBoneInfluencers === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._numBoneInfluencers = value;
            this._markSubMeshesAsAttributesDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "applyFog", {
        /** Gets or sets a boolean indicating that this mesh will allow fog to be rendered on it (true by default) */
        get: function () {
            return this._internalAbstractMeshDataInfo._applyFog;
        },
        set: function (value) {
            if (this._internalAbstractMeshDataInfo._applyFog === value) {
                return;
            }
            this._internalAbstractMeshDataInfo._applyFog = value;
            this._markSubMeshesAsMiscDirty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "enableDistantPicking", {
        /** When enabled, decompose picking matrices for better precision with large values for mesh position and scling */
        get: function () {
            return this._internalAbstractMeshDataInfo._enableDistantPicking;
        },
        set: function (value) {
            this._internalAbstractMeshDataInfo._enableDistantPicking = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "layerMask", {
        /**
         * Gets or sets the current layer mask (default is 0x0FFFFFFF)
         * @see https://doc.babylonjs.com/divingDeeper/cameras/layerMasksAndMultiCam
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._layerMask;
        },
        set: function (value) {
            if (value === this._internalAbstractMeshDataInfo._layerMask) {
                return;
            }
            this._internalAbstractMeshDataInfo._layerMask = value;
            this._resyncLightSources();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "collisionMask", {
        /**
         * Gets or sets a collision mask used to mask collisions (default is -1).
         * A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._collisionMask;
        },
        set: function (mask) {
            this._internalAbstractMeshDataInfo._meshCollisionData._collisionMask = !isNaN(mask) ? mask : -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "collisionResponse", {
        /**
         * Gets or sets a collision response flag (default is true).
         * when collisionResponse is false, events are still triggered but colliding entity has no response
         * This helps creating trigger volume when user wants collision feedback events but not position/velocity
         * to respond to the collision.
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._collisionResponse;
        },
        set: function (response) {
            this._internalAbstractMeshDataInfo._meshCollisionData._collisionResponse = response;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "collisionGroup", {
        /**
         * Gets or sets the current collision group mask (-1 by default).
         * A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._collisionGroup;
        },
        set: function (mask) {
            this._internalAbstractMeshDataInfo._meshCollisionData._collisionGroup = !isNaN(mask) ? mask : -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "surroundingMeshes", {
        /**
         * Gets or sets current surrounding meshes (null by default).
         *
         * By default collision detection is tested against every mesh in the scene.
         * It is possible to set surroundingMeshes to a defined list of meshes and then only these specified
         * meshes will be tested for the collision.
         *
         * Note: if set to an empty array no collision will happen when this mesh is moved.
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._surroundingMeshes;
        },
        set: function (meshes) {
            this._internalAbstractMeshDataInfo._meshCollisionData._surroundingMeshes = meshes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "lightSources", {
        /** Gets the list of lights affecting that mesh */
        get: function () {
            return this._lightSources;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "_positions", {
        /** @hidden */
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "skeleton", {
        get: function () {
            return this._internalAbstractMeshDataInfo._skeleton;
        },
        /**
         * Gets or sets a skeleton to apply skinning transformations
         * @see https://doc.babylonjs.com/how_to/how_to_use_bones_and_skeletons
         */
        set: function (value) {
            var skeleton = this._internalAbstractMeshDataInfo._skeleton;
            if (skeleton && skeleton.needInitialSkinMatrix) {
                skeleton._unregisterMeshWithPoseMatrix(this);
            }
            if (value && value.needInitialSkinMatrix) {
                value._registerMeshWithPoseMatrix(this);
            }
            this._internalAbstractMeshDataInfo._skeleton = value;
            if (!this._internalAbstractMeshDataInfo._skeleton) {
                this._bonesTransformMatrices = null;
            }
            this._markSubMeshesAsAttributesDirty();
        },
        enumerable: false,
        configurable: true
    });
    AbstractMesh.prototype._buildUniformLayout = function () {
        this._uniformBuffer.addUniform("world", 16);
        this._uniformBuffer.addUniform("visibility", 1);
        this._uniformBuffer.create();
    };
    /**
     * Transfer the mesh values to its UBO.
     * @param world The world matrix associated with the mesh
     */
    AbstractMesh.prototype.transferToEffect = function (world) {
        var ubo = this._uniformBuffer;
        ubo.updateMatrix("world", world);
        ubo.updateFloat("visibility", this._internalAbstractMeshDataInfo._visibility);
        ubo.update();
    };
    /**
     * Gets the mesh uniform buffer.
     * @return the uniform buffer of the mesh.
     */
    AbstractMesh.prototype.getMeshUniformBuffer = function () {
        return this._uniformBuffer;
    };
    /**
     * Returns the string "AbstractMesh"
     * @returns "AbstractMesh"
     */
    AbstractMesh.prototype.getClassName = function () {
        return "AbstractMesh";
    };
    /**
     * Gets a string representation of the current mesh
     * @param fullDetails defines a boolean indicating if full details must be included
     * @returns a string representation of the current mesh
     */
    AbstractMesh.prototype.toString = function (fullDetails) {
        var ret = "Name: " + this.name + ", isInstance: " + (this.getClassName() !== "InstancedMesh" ? "YES" : "NO");
        ret += ", # of submeshes: " + (this.subMeshes ? this.subMeshes.length : 0);
        var skeleton = this._internalAbstractMeshDataInfo._skeleton;
        if (skeleton) {
            ret += ", skeleton: " + skeleton.name;
        }
        if (fullDetails) {
            ret += ", billboard mode: " + ["NONE", "X", "Y", null, "Z", null, null, "ALL"][this.billboardMode];
            ret += ", freeze wrld mat: " + (this._isWorldMatrixFrozen || this._waitingData.freezeWorldMatrix ? "YES" : "NO");
        }
        return ret;
    };
    /**
     * @hidden
     */
    AbstractMesh.prototype._getEffectiveParent = function () {
        if (this._masterMesh && this.billboardMode !== TransformNode.BILLBOARDMODE_NONE) {
            return this._masterMesh;
        }
        return _super.prototype._getEffectiveParent.call(this);
    };
    /**
     * @param trigger
     * @param initialCall
     * @hidden
     */
    AbstractMesh.prototype._getActionManagerForTrigger = function (trigger, initialCall) {
        if (initialCall === void 0) { initialCall = true; }
        if (this.actionManager && (initialCall || this.actionManager.isRecursive)) {
            if (trigger) {
                if (this.actionManager.hasSpecificTrigger(trigger)) {
                    return this.actionManager;
                }
            }
            else {
                return this.actionManager;
            }
        }
        if (!this.parent) {
            return null;
        }
        return this.parent._getActionManagerForTrigger(trigger, false);
    };
    /**
     * @param dispose
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype._rebuild = function (dispose) {
        this.onRebuildObservable.notifyObservers(this);
        if (this._occlusionQuery !== null) {
            this._occlusionQuery = null;
        }
        if (!this.subMeshes) {
            return;
        }
        for (var _i = 0, _a = this.subMeshes; _i < _a.length; _i++) {
            var subMesh = _a[_i];
            subMesh._rebuild();
        }
    };
    /** @hidden */
    AbstractMesh.prototype._resyncLightSources = function () {
        this._lightSources.length = 0;
        for (var _i = 0, _a = this.getScene().lights; _i < _a.length; _i++) {
            var light = _a[_i];
            if (!light.isEnabled()) {
                continue;
            }
            if (light.canAffectMesh(this)) {
                this._lightSources.push(light);
            }
        }
        this._markSubMeshesAsLightDirty();
    };
    /**
     * @param light
     * @hidden
     */
    AbstractMesh.prototype._resyncLightSource = function (light) {
        var isIn = light.isEnabled() && light.canAffectMesh(this);
        var index = this._lightSources.indexOf(light);
        var removed = false;
        if (index === -1) {
            if (!isIn) {
                return;
            }
            this._lightSources.push(light);
        }
        else {
            if (isIn) {
                return;
            }
            removed = true;
            this._lightSources.splice(index, 1);
        }
        this._markSubMeshesAsLightDirty(removed);
    };
    /** @hidden */
    AbstractMesh.prototype._unBindEffect = function () {
        for (var _i = 0, _a = this.subMeshes; _i < _a.length; _i++) {
            var subMesh = _a[_i];
            subMesh.setEffect(null);
        }
    };
    /**
     * @param light
     * @param dispose
     * @hidden
     */
    AbstractMesh.prototype._removeLightSource = function (light, dispose) {
        var index = this._lightSources.indexOf(light);
        if (index === -1) {
            return;
        }
        this._lightSources.splice(index, 1);
        this._markSubMeshesAsLightDirty(dispose);
    };
    AbstractMesh.prototype._markSubMeshesAsDirty = function (func) {
        if (!this.subMeshes) {
            return;
        }
        for (var _i = 0, _a = this.subMeshes; _i < _a.length; _i++) {
            var subMesh = _a[_i];
            for (var i = 0; i < subMesh._drawWrappers.length; ++i) {
                var drawWrapper = subMesh._drawWrappers[i];
                if (!drawWrapper || !drawWrapper.defines || !drawWrapper.defines.markAllAsDirty) {
                    continue;
                }
                func(drawWrapper.defines);
            }
        }
    };
    /**
     * @param dispose
     * @hidden
     */
    AbstractMesh.prototype._markSubMeshesAsLightDirty = function (dispose) {
        if (dispose === void 0) { dispose = false; }
        this._markSubMeshesAsDirty(function (defines) { return defines.markAsLightDirty(dispose); });
    };
    /** @hidden */
    AbstractMesh.prototype._markSubMeshesAsAttributesDirty = function () {
        this._markSubMeshesAsDirty(function (defines) { return defines.markAsAttributesDirty(); });
    };
    /** @hidden */
    AbstractMesh.prototype._markSubMeshesAsMiscDirty = function () {
        this._markSubMeshesAsDirty(function (defines) { return defines.markAsMiscDirty(); });
    };
    /**
     * Flag the AbstractMesh as dirty (Forcing it to update everything)
     * @param property if set to "rotation" the objects rotationQuaternion will be set to null
     * @returns this AbstractMesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.markAsDirty = function (property) {
        this._currentRenderId = Number.MAX_VALUE;
        this._isDirty = true;
        return this;
    };
    /**
     * Resets the draw wrappers cache for all submeshes of this abstract mesh
     * @param passId If provided, releases only the draw wrapper corresponding to this render pass id
     */
    AbstractMesh.prototype.resetDrawCache = function (passId) {
        if (!this.subMeshes) {
            return;
        }
        for (var _i = 0, _a = this.subMeshes; _i < _a.length; _i++) {
            var subMesh = _a[_i];
            subMesh.resetDrawCache(passId);
        }
    };
    Object.defineProperty(AbstractMesh.prototype, "isBlocked", {
        // Methods
        /**
         * Returns true if the mesh is blocked. Implemented by child classes
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the mesh itself by default. Implemented by child classes
     * @param camera defines the camera to use to pick the right LOD level
     * @returns the currentAbstractMesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.getLOD = function (camera) {
        return this;
    };
    /**
     * Returns 0 by default. Implemented by child classes
     * @returns an integer
     */
    AbstractMesh.prototype.getTotalVertices = function () {
        return 0;
    };
    /**
     * Returns a positive integer : the total number of indices in this mesh geometry.
     * @returns the number of indices or zero if the mesh has no geometry.
     */
    AbstractMesh.prototype.getTotalIndices = function () {
        return 0;
    };
    /**
     * Returns null by default. Implemented by child classes
     * @returns null
     */
    AbstractMesh.prototype.getIndices = function () {
        return null;
    };
    /**
     * Returns the array of the requested vertex data kind. Implemented by child classes
     * @param kind defines the vertex data kind to use
     * @returns null
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.getVerticesData = function (kind) {
        return null;
    };
    /**
     * Sets the vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, a new Geometry object is set to the mesh and then passed this vertex data.
     * Note that a new underlying VertexBuffer object is created each call.
     * If the `kind` is the `PositionKind`, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
     * @param kind defines vertex data kind:
     * * VertexBuffer.PositionKind
     * * VertexBuffer.UVKind
     * * VertexBuffer.UV2Kind
     * * VertexBuffer.UV3Kind
     * * VertexBuffer.UV4Kind
     * * VertexBuffer.UV5Kind
     * * VertexBuffer.UV6Kind
     * * VertexBuffer.ColorKind
     * * VertexBuffer.MatricesIndicesKind
     * * VertexBuffer.MatricesIndicesExtraKind
     * * VertexBuffer.MatricesWeightsKind
     * * VertexBuffer.MatricesWeightsExtraKind
     * @param data defines the data source
     * @param updatable defines if the data must be flagged as updatable (or static)
     * @param stride defines the vertex stride (size of an entire vertex). Can be null and in this case will be deduced from vertex data kind
     * @returns the current mesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.setVerticesData = function (kind, data, updatable, stride) {
        return this;
    };
    /**
     * Updates the existing vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, it is simply returned as it is.
     * @param kind defines vertex data kind:
     * * VertexBuffer.PositionKind
     * * VertexBuffer.UVKind
     * * VertexBuffer.UV2Kind
     * * VertexBuffer.UV3Kind
     * * VertexBuffer.UV4Kind
     * * VertexBuffer.UV5Kind
     * * VertexBuffer.UV6Kind
     * * VertexBuffer.ColorKind
     * * VertexBuffer.MatricesIndicesKind
     * * VertexBuffer.MatricesIndicesExtraKind
     * * VertexBuffer.MatricesWeightsKind
     * * VertexBuffer.MatricesWeightsExtraKind
     * @param data defines the data source
     * @param updateExtends If `kind` is `PositionKind` and if `updateExtends` is true, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed
     * @param makeItUnique If true, a new global geometry is created from this data and is set to the mesh
     * @returns the current mesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.updateVerticesData = function (kind, data, updateExtends, makeItUnique) {
        return this;
    };
    /**
     * Sets the mesh indices,
     * If the mesh has no geometry, a new Geometry object is created and set to the mesh.
     * @param indices Expects an array populated with integers or a typed array (Int32Array, Uint32Array, Uint16Array)
     * @param totalVertices Defines the total number of vertices
     * @returns the current mesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.setIndices = function (indices, totalVertices) {
        return this;
    };
    /**
     * Gets a boolean indicating if specific vertex data is present
     * @param kind defines the vertex data kind to use
     * @returns true is data kind is present
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.isVerticesDataPresent = function (kind) {
        return false;
    };
    /**
     * Returns the mesh BoundingInfo object or creates a new one and returns if it was undefined.
     * Note that it returns a shallow bounding of the mesh (i.e. it does not include children).
     * To get the full bounding of all children, call `getHierarchyBoundingVectors` instead.
     * @returns a BoundingInfo
     */
    AbstractMesh.prototype.getBoundingInfo = function () {
        if (this._masterMesh) {
            return this._masterMesh.getBoundingInfo();
        }
        if (this._boundingInfoIsDirty) {
            this._boundingInfoIsDirty = false;
            // this._boundingInfo is being created if undefined
            this._updateBoundingInfo();
        }
        // cannot be null.
        return this._boundingInfo;
    };
    /**
     * Overwrite the current bounding info
     * @param boundingInfo defines the new bounding info
     * @returns the current mesh
     */
    AbstractMesh.prototype.setBoundingInfo = function (boundingInfo) {
        this._boundingInfo = boundingInfo;
        return this;
    };
    Object.defineProperty(AbstractMesh.prototype, "hasBoundingInfo", {
        /**
         * Returns true if there is already a bounding info
         */
        get: function () {
            return this._boundingInfo !== null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a new bounding info for the mesh
     * @param minimum min vector of the bounding box/sphere
     * @param maximum max vector of the bounding box/sphere
     * @param worldMatrix defines the new world matrix
     * @returns the new bounding info
     */
    AbstractMesh.prototype.buildBoundingInfo = function (minimum, maximum, worldMatrix) {
        this._boundingInfo = new BoundingInfo(minimum, maximum, worldMatrix);
        return this._boundingInfo;
    };
    /**
     * Uniformly scales the mesh to fit inside of a unit cube (1 X 1 X 1 units)
     * @param includeDescendants Use the hierarchy's bounding box instead of the mesh's bounding box. Default is false
     * @param ignoreRotation ignore rotation when computing the scale (ie. object will be axis aligned). Default is false
     * @param predicate predicate that is passed in to getHierarchyBoundingVectors when selecting which object should be included when scaling
     * @returns the current mesh
     */
    AbstractMesh.prototype.normalizeToUnitCube = function (includeDescendants, ignoreRotation, predicate) {
        if (includeDescendants === void 0) { includeDescendants = true; }
        if (ignoreRotation === void 0) { ignoreRotation = false; }
        return _super.prototype.normalizeToUnitCube.call(this, includeDescendants, ignoreRotation, predicate);
    };
    Object.defineProperty(AbstractMesh.prototype, "useBones", {
        /** Gets a boolean indicating if this mesh has skinning data and an attached skeleton */
        get: function () {
            return ((this.skeleton &&
                this.getScene().skeletonsEnabled &&
                this.isVerticesDataPresent(VertexBuffer.MatricesIndicesKind) &&
                this.isVerticesDataPresent(VertexBuffer.MatricesWeightsKind)));
        },
        enumerable: false,
        configurable: true
    });
    /** @hidden */
    AbstractMesh.prototype._preActivate = function () { };
    /**
     * @param renderId
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype._preActivateForIntermediateRendering = function (renderId) { };
    /**
     * @param renderId
     * @param intermediateRendering
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype._activate = function (renderId, intermediateRendering) {
        this._renderId = renderId;
        return true;
    };
    /** @hidden */
    AbstractMesh.prototype._postActivate = function () {
        // Do nothing
    };
    /** @hidden */
    AbstractMesh.prototype._freeze = function () {
        // Do nothing
    };
    /** @hidden */
    AbstractMesh.prototype._unFreeze = function () {
        // Do nothing
    };
    /**
     * Gets the current world matrix
     * @returns a Matrix
     */
    AbstractMesh.prototype.getWorldMatrix = function () {
        if (this._masterMesh && this.billboardMode === TransformNode.BILLBOARDMODE_NONE) {
            return this._masterMesh.getWorldMatrix();
        }
        return _super.prototype.getWorldMatrix.call(this);
    };
    /** @hidden */
    AbstractMesh.prototype._getWorldMatrixDeterminant = function () {
        if (this._masterMesh) {
            return this._masterMesh._getWorldMatrixDeterminant();
        }
        return _super.prototype._getWorldMatrixDeterminant.call(this);
    };
    Object.defineProperty(AbstractMesh.prototype, "isAnInstance", {
        /**
         * Gets a boolean indicating if this mesh is an instance or a regular mesh
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "hasInstances", {
        /**
         * Gets a boolean indicating if this mesh has instances
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "hasThinInstances", {
        /**
         * Gets a boolean indicating if this mesh has thin instances
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // ================================== Point of View Movement =================================
    /**
     * Perform relative position change from the point of view of behind the front of the mesh.
     * This is performed taking into account the meshes current rotation, so you do not have to care.
     * Supports definition of mesh facing forward or backward
     * @param amountRight defines the distance on the right axis
     * @param amountUp defines the distance on the up axis
     * @param amountForward defines the distance on the forward axis
     * @returns the current mesh
     */
    AbstractMesh.prototype.movePOV = function (amountRight, amountUp, amountForward) {
        this.position.addInPlace(this.calcMovePOV(amountRight, amountUp, amountForward));
        return this;
    };
    /**
     * Calculate relative position change from the point of view of behind the front of the mesh.
     * This is performed taking into account the meshes current rotation, so you do not have to care.
     * Supports definition of mesh facing forward or backward
     * @param amountRight defines the distance on the right axis
     * @param amountUp defines the distance on the up axis
     * @param amountForward defines the distance on the forward axis
     * @returns the new displacement vector
     */
    AbstractMesh.prototype.calcMovePOV = function (amountRight, amountUp, amountForward) {
        var rotMatrix = new Matrix();
        var rotQuaternion = this.rotationQuaternion ? this.rotationQuaternion : Quaternion.RotationYawPitchRoll(this.rotation.y, this.rotation.x, this.rotation.z);
        rotQuaternion.toRotationMatrix(rotMatrix);
        var translationDelta = Vector3.Zero();
        var defForwardMult = this.definedFacingForward ? -1 : 1;
        Vector3.TransformCoordinatesFromFloatsToRef(amountRight * defForwardMult, amountUp, amountForward * defForwardMult, rotMatrix, translationDelta);
        return translationDelta;
    };
    // ================================== Point of View Rotation =================================
    /**
     * Perform relative rotation change from the point of view of behind the front of the mesh.
     * Supports definition of mesh facing forward or backward
     * @param flipBack defines the flip
     * @param twirlClockwise defines the twirl
     * @param tiltRight defines the tilt
     * @returns the current mesh
     */
    AbstractMesh.prototype.rotatePOV = function (flipBack, twirlClockwise, tiltRight) {
        this.rotation.addInPlace(this.calcRotatePOV(flipBack, twirlClockwise, tiltRight));
        return this;
    };
    /**
     * Calculate relative rotation change from the point of view of behind the front of the mesh.
     * Supports definition of mesh facing forward or backward.
     * @param flipBack defines the flip
     * @param twirlClockwise defines the twirl
     * @param tiltRight defines the tilt
     * @returns the new rotation vector
     */
    AbstractMesh.prototype.calcRotatePOV = function (flipBack, twirlClockwise, tiltRight) {
        var defForwardMult = this.definedFacingForward ? 1 : -1;
        return new Vector3(flipBack * defForwardMult, twirlClockwise, tiltRight * defForwardMult);
    };
    /**
     * This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
     * This means the mesh underlying bounding box and sphere are recomputed.
     * @param applySkeleton defines whether to apply the skeleton before computing the bounding info
     * @param applyMorph  defines whether to apply the morph target before computing the bounding info
     * @returns the current mesh
     */
    AbstractMesh.prototype.refreshBoundingInfo = function (applySkeleton, applyMorph) {
        if (applySkeleton === void 0) { applySkeleton = false; }
        if (applyMorph === void 0) { applyMorph = false; }
        if (this._boundingInfo && this._boundingInfo.isLocked) {
            return this;
        }
        this._refreshBoundingInfo(this._getPositionData(applySkeleton, applyMorph), null);
        return this;
    };
    /**
     * @param data
     * @param bias
     * @hidden
     */
    AbstractMesh.prototype._refreshBoundingInfo = function (data, bias) {
        if (data) {
            var extend = extractMinAndMax(data, 0, this.getTotalVertices(), bias);
            if (this._boundingInfo) {
                this._boundingInfo.reConstruct(extend.minimum, extend.maximum);
            }
            else {
                this._boundingInfo = new BoundingInfo(extend.minimum, extend.maximum);
            }
        }
        if (this.subMeshes) {
            for (var index = 0; index < this.subMeshes.length; index++) {
                this.subMeshes[index].refreshBoundingInfo(data);
            }
        }
        this._updateBoundingInfo();
    };
    /**
     * Internal function to get buffer data and possibly apply morphs and normals
     * @param applySkeleton
     * @param applyMorph
     * @param data
     * @param kind the kind of data you want. Can be Normal or Position
     */
    AbstractMesh.prototype._getData = function (applySkeleton, applyMorph, data, kind) {
        if (applySkeleton === void 0) { applySkeleton = false; }
        if (applyMorph === void 0) { applyMorph = false; }
        if (kind === void 0) { kind = VertexBuffer.PositionKind; }
        data = data !== null && data !== void 0 ? data : this.getVerticesData(kind).slice();
        if (data && applyMorph && this.morphTargetManager) {
            var faceIndexCount = 0;
            var positionIndex = 0;
            for (var vertexCount = 0; vertexCount < data.length; vertexCount++) {
                for (var targetCount = 0; targetCount < this.morphTargetManager.numTargets; targetCount++) {
                    var targetMorph = this.morphTargetManager.getTarget(targetCount);
                    var influence = targetMorph.influence;
                    if (influence > 0.0) {
                        var morphTargetPositions = targetMorph.getPositions();
                        if (morphTargetPositions) {
                            data[vertexCount] += (morphTargetPositions[vertexCount] - data[vertexCount]) * influence;
                        }
                    }
                }
                faceIndexCount++;
                if (kind === VertexBuffer.PositionKind) {
                    if (this._positions && faceIndexCount === 3) {
                        // We want to merge into positions every 3 indices starting (but not 0)
                        faceIndexCount = 0;
                        var index = positionIndex * 3;
                        this._positions[positionIndex++].copyFromFloats(data[index], data[index + 1], data[index + 2]);
                    }
                }
            }
        }
        if (data && applySkeleton && this.skeleton) {
            var matricesIndicesData = this.getVerticesData(VertexBuffer.MatricesIndicesKind);
            var matricesWeightsData = this.getVerticesData(VertexBuffer.MatricesWeightsKind);
            if (matricesWeightsData && matricesIndicesData) {
                var needExtras = this.numBoneInfluencers > 4;
                var matricesIndicesExtraData = needExtras ? this.getVerticesData(VertexBuffer.MatricesIndicesExtraKind) : null;
                var matricesWeightsExtraData = needExtras ? this.getVerticesData(VertexBuffer.MatricesWeightsExtraKind) : null;
                var skeletonMatrices = this.skeleton.getTransformMatrices(this);
                var tempVector = TmpVectors.Vector3[0];
                var finalMatrix = TmpVectors.Matrix[0];
                var tempMatrix = TmpVectors.Matrix[1];
                var matWeightIdx = 0;
                for (var index = 0; index < data.length; index += 3, matWeightIdx += 4) {
                    finalMatrix.reset();
                    var inf = void 0;
                    var weight = void 0;
                    for (inf = 0; inf < 4; inf++) {
                        weight = matricesWeightsData[matWeightIdx + inf];
                        if (weight > 0) {
                            Matrix.FromFloat32ArrayToRefScaled(skeletonMatrices, Math.floor(matricesIndicesData[matWeightIdx + inf] * 16), weight, tempMatrix);
                            finalMatrix.addToSelf(tempMatrix);
                        }
                    }
                    if (needExtras) {
                        for (inf = 0; inf < 4; inf++) {
                            weight = matricesWeightsExtraData[matWeightIdx + inf];
                            if (weight > 0) {
                                Matrix.FromFloat32ArrayToRefScaled(skeletonMatrices, Math.floor(matricesIndicesExtraData[matWeightIdx + inf] * 16), weight, tempMatrix);
                                finalMatrix.addToSelf(tempMatrix);
                            }
                        }
                    }
                    if (kind === VertexBuffer.NormalKind) {
                        Vector3.TransformNormalFromFloatsToRef(data[index], data[index + 1], data[index + 2], finalMatrix, tempVector);
                    }
                    else {
                        Vector3.TransformCoordinatesFromFloatsToRef(data[index], data[index + 1], data[index + 2], finalMatrix, tempVector);
                    }
                    tempVector.toArray(data, index);
                    if (kind === VertexBuffer.PositionKind && this._positions) {
                        this._positions[index / 3].copyFrom(tempVector);
                    }
                }
            }
        }
        return data;
    };
    /**
     * Get the normals vertex data and optionally apply skeleton and morphing.
     * @param applySkeleton defines whether to apply the skeleton
     * @param applyMorph  defines whether to apply the morph target
     * @returns the normals data
     */
    AbstractMesh.prototype.getNormalsData = function (applySkeleton, applyMorph) {
        if (applySkeleton === void 0) { applySkeleton = false; }
        if (applyMorph === void 0) { applyMorph = false; }
        return this._getData(applySkeleton, applyMorph, null, VertexBuffer.NormalKind);
    };
    /**
     * Get the position vertex data and optionally apply skeleton and morphing.
     * @param applySkeleton defines whether to apply the skeleton
     * @param applyMorph  defines whether to apply the morph target
     * @param data defines the position data to apply the skeleton and morph to
     * @returns the position data
     */
    AbstractMesh.prototype.getPositionData = function (applySkeleton, applyMorph, data) {
        if (applySkeleton === void 0) { applySkeleton = false; }
        if (applyMorph === void 0) { applyMorph = false; }
        return this._getData(applySkeleton, applyMorph, data, VertexBuffer.PositionKind);
    };
    /**
     * @param applySkeleton
     * @param applyMorph
     * @hidden
     */
    AbstractMesh.prototype._getPositionData = function (applySkeleton, applyMorph) {
        var _a;
        var data = this.getVerticesData(VertexBuffer.PositionKind);
        if (this._internalAbstractMeshDataInfo._positions) {
            this._internalAbstractMeshDataInfo._positions = null;
        }
        if (data && ((applySkeleton && this.skeleton) || (applyMorph && this.morphTargetManager))) {
            data = data.slice();
            this._generatePointsArray();
            if (this._positions) {
                var pos = this._positions;
                this._internalAbstractMeshDataInfo._positions = new Array(pos.length);
                for (var i = 0; i < pos.length; i++) {
                    this._internalAbstractMeshDataInfo._positions[i] = ((_a = pos[i]) === null || _a === void 0 ? void 0 : _a.clone()) || new Vector3();
                }
            }
            return this.getPositionData(applySkeleton, applyMorph, data);
        }
        return data;
    };
    /** @hidden */
    AbstractMesh.prototype._updateBoundingInfo = function () {
        if (this._boundingInfo) {
            this._boundingInfo.update(this.worldMatrixFromCache);
        }
        else {
            this._boundingInfo = new BoundingInfo(Vector3.Zero(), Vector3.Zero(), this.worldMatrixFromCache);
        }
        this._updateSubMeshesBoundingInfo(this.worldMatrixFromCache);
        return this;
    };
    /**
     * @param matrix
     * @hidden
     */
    AbstractMesh.prototype._updateSubMeshesBoundingInfo = function (matrix) {
        if (!this.subMeshes) {
            return this;
        }
        var count = this.subMeshes.length;
        for (var subIndex = 0; subIndex < count; subIndex++) {
            var subMesh = this.subMeshes[subIndex];
            if (count > 1 || !subMesh.IsGlobal) {
                subMesh.updateBoundingInfo(matrix);
            }
        }
        return this;
    };
    /** @hidden */
    AbstractMesh.prototype._afterComputeWorldMatrix = function () {
        if (this.doNotSyncBoundingInfo) {
            return;
        }
        // Bounding info
        this._boundingInfoIsDirty = true;
    };
    /**
     * Returns `true` if the mesh is within the frustum defined by the passed array of planes.
     * A mesh is in the frustum if its bounding box intersects the frustum
     * @param frustumPlanes defines the frustum to test
     * @returns true if the mesh is in the frustum planes
     */
    AbstractMesh.prototype.isInFrustum = function (frustumPlanes) {
        return this.getBoundingInfo().isInFrustum(frustumPlanes, this.cullingStrategy);
    };
    /**
     * Returns `true` if the mesh is completely in the frustum defined be the passed array of planes.
     * A mesh is completely in the frustum if its bounding box it completely inside the frustum.
     * @param frustumPlanes defines the frustum to test
     * @returns true if the mesh is completely in the frustum planes
     */
    AbstractMesh.prototype.isCompletelyInFrustum = function (frustumPlanes) {
        return this.getBoundingInfo().isCompletelyInFrustum(frustumPlanes);
    };
    /**
     * True if the mesh intersects another mesh or a SolidParticle object
     * @param mesh defines a target mesh or SolidParticle to test
     * @param precise Unless the parameter `precise` is set to `true` the intersection is computed according to Axis Aligned Bounding Boxes (AABB), else according to OBB (Oriented BBoxes)
     * @param includeDescendants Can be set to true to test if the mesh defined in parameters intersects with the current mesh or any child meshes
     * @returns true if there is an intersection
     */
    AbstractMesh.prototype.intersectsMesh = function (mesh, precise, includeDescendants) {
        if (precise === void 0) { precise = false; }
        var boundingInfo = this.getBoundingInfo();
        var otherBoundingInfo = mesh.getBoundingInfo();
        if (boundingInfo.intersects(otherBoundingInfo, precise)) {
            return true;
        }
        if (includeDescendants) {
            for (var _i = 0, _a = this.getChildMeshes(); _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.intersectsMesh(mesh, precise, true)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns true if the passed point (Vector3) is inside the mesh bounding box
     * @param point defines the point to test
     * @returns true if there is an intersection
     */
    AbstractMesh.prototype.intersectsPoint = function (point) {
        return this.getBoundingInfo().intersectsPoint(point);
    };
    Object.defineProperty(AbstractMesh.prototype, "checkCollisions", {
        // Collisions
        /**
         * Gets or sets a boolean indicating that this mesh can be used in the collision engine
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._checkCollisions;
        },
        set: function (collisionEnabled) {
            this._internalAbstractMeshDataInfo._meshCollisionData._checkCollisions = collisionEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMesh.prototype, "collider", {
        /**
         * Gets Collider object used to compute collisions (not physics)
         * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
         */
        get: function () {
            return this._internalAbstractMeshDataInfo._meshCollisionData._collider;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Move the mesh using collision engine
     * @see https://doc.babylonjs.com/babylon101/cameras,_mesh_collisions_and_gravity
     * @param displacement defines the requested displacement vector
     * @returns the current mesh
     */
    AbstractMesh.prototype.moveWithCollisions = function (displacement) {
        var globalPosition = this.getAbsolutePosition();
        globalPosition.addToRef(this.ellipsoidOffset, this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions);
        var coordinator = this.getScene().collisionCoordinator;
        if (!this._internalAbstractMeshDataInfo._meshCollisionData._collider) {
            this._internalAbstractMeshDataInfo._meshCollisionData._collider = coordinator.createCollider();
        }
        this._internalAbstractMeshDataInfo._meshCollisionData._collider._radius = this.ellipsoid;
        coordinator.getNewPosition(this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions, displacement, this._internalAbstractMeshDataInfo._meshCollisionData._collider, this.collisionRetryCount, this, this._onCollisionPositionChange, this.uniqueId);
        return this;
    };
    // Collisions
    /**
     * @param subMesh
     * @param transformMatrix
     * @param collider
     * @hidden
     */
    AbstractMesh.prototype._collideForSubMesh = function (subMesh, transformMatrix, collider) {
        var _a;
        this._generatePointsArray();
        if (!this._positions) {
            return this;
        }
        // Transformation
        if (!subMesh._lastColliderWorldVertices || !subMesh._lastColliderTransformMatrix.equals(transformMatrix)) {
            subMesh._lastColliderTransformMatrix = transformMatrix.clone();
            subMesh._lastColliderWorldVertices = [];
            subMesh._trianglePlanes = [];
            var start = subMesh.verticesStart;
            var end = subMesh.verticesStart + subMesh.verticesCount;
            for (var i = start; i < end; i++) {
                subMesh._lastColliderWorldVertices.push(Vector3.TransformCoordinates(this._positions[i], transformMatrix));
            }
        }
        // Collide
        collider._collide(subMesh._trianglePlanes, subMesh._lastColliderWorldVertices, this.getIndices(), subMesh.indexStart, subMesh.indexStart + subMesh.indexCount, subMesh.verticesStart, !!subMesh.getMaterial(), this, this._shouldConvertRHS(), ((_a = subMesh.getMaterial()) === null || _a === void 0 ? void 0 : _a.fillMode) === 7);
        return this;
    };
    /**
     * @param collider
     * @param transformMatrix
     * @hidden
     */
    AbstractMesh.prototype._processCollisionsForSubMeshes = function (collider, transformMatrix) {
        var subMeshes = this._scene.getCollidingSubMeshCandidates(this, collider);
        var len = subMeshes.length;
        for (var index = 0; index < len; index++) {
            var subMesh = subMeshes.data[index];
            // Bounding test
            if (len > 1 && !subMesh._checkCollision(collider)) {
                continue;
            }
            this._collideForSubMesh(subMesh, transformMatrix, collider);
        }
        return this;
    };
    /** @hidden */
    AbstractMesh.prototype._shouldConvertRHS = function () {
        return false;
    };
    /**
     * @param collider
     * @hidden
     */
    AbstractMesh.prototype._checkCollision = function (collider) {
        // Bounding box test
        if (!this.getBoundingInfo()._checkCollision(collider)) {
            return this;
        }
        // Transformation matrix
        var collisionsScalingMatrix = TmpVectors.Matrix[0];
        var collisionsTransformMatrix = TmpVectors.Matrix[1];
        Matrix.ScalingToRef(1.0 / collider._radius.x, 1.0 / collider._radius.y, 1.0 / collider._radius.z, collisionsScalingMatrix);
        this.worldMatrixFromCache.multiplyToRef(collisionsScalingMatrix, collisionsTransformMatrix);
        this._processCollisionsForSubMeshes(collider, collisionsTransformMatrix);
        return this;
    };
    // Picking
    /** @hidden */
    AbstractMesh.prototype._generatePointsArray = function () {
        return false;
    };
    /**
     * Checks if the passed Ray intersects with the mesh
     * @param ray defines the ray to use
     * @param fastCheck defines if fast mode (but less precise) must be used (false by default)
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
     * @param worldToUse defines the world matrix to use to get the world coordinate of the intersection point
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @returns the picking info
     * @see https://doc.babylonjs.com/babylon101/intersect_collisions_-_mesh
     */
    AbstractMesh.prototype.intersects = function (ray, fastCheck, trianglePredicate, onlyBoundingInfo, worldToUse, skipBoundingInfo) {
        if (onlyBoundingInfo === void 0) { onlyBoundingInfo = false; }
        if (skipBoundingInfo === void 0) { skipBoundingInfo = false; }
        var pickingInfo = new PickingInfo();
        var intersectionThreshold = this.getClassName() === "InstancedLinesMesh" || this.getClassName() === "LinesMesh" ? this.intersectionThreshold : 0;
        var boundingInfo = this.getBoundingInfo();
        if (!this.subMeshes) {
            return pickingInfo;
        }
        if (!skipBoundingInfo &&
            (!ray.intersectsSphere(boundingInfo.boundingSphere, intersectionThreshold) || !ray.intersectsBox(boundingInfo.boundingBox, intersectionThreshold))) {
            return pickingInfo;
        }
        if (onlyBoundingInfo) {
            pickingInfo.hit = skipBoundingInfo ? false : true;
            pickingInfo.pickedMesh = skipBoundingInfo ? null : this;
            pickingInfo.distance = skipBoundingInfo ? 0 : Vector3.Distance(ray.origin, boundingInfo.boundingSphere.center);
            pickingInfo.subMeshId = 0;
            return pickingInfo;
        }
        if (!this._generatePointsArray()) {
            return pickingInfo;
        }
        var intersectInfo = null;
        var subMeshes = this._scene.getIntersectingSubMeshCandidates(this, ray);
        var len = subMeshes.length;
        // Check if all submeshes are using a material that don't allow picking (point/lines rendering)
        // if no submesh can be picked that way, then fallback to BBox picking
        var anySubmeshSupportIntersect = false;
        for (var index = 0; index < len; index++) {
            var subMesh = subMeshes.data[index];
            var material = subMesh.getMaterial();
            if (!material) {
                continue;
            }
            if (material.fillMode == 7 ||
                material.fillMode == 0 ||
                material.fillMode == 1 ||
                material.fillMode == 2 ||
                material.fillMode == 4) {
                anySubmeshSupportIntersect = true;
                break;
            }
        }
        // no sub mesh support intersection, fallback to BBox that has already be done
        if (!anySubmeshSupportIntersect) {
            pickingInfo.hit = true;
            pickingInfo.pickedMesh = this;
            pickingInfo.distance = Vector3.Distance(ray.origin, boundingInfo.boundingSphere.center);
            pickingInfo.subMeshId = -1;
            return pickingInfo;
        }
        // at least 1 submesh supports intersection, keep going
        for (var index = 0; index < len; index++) {
            var subMesh = subMeshes.data[index];
            // Bounding test
            if (len > 1 && !subMesh.canIntersects(ray)) {
                continue;
            }
            var currentIntersectInfo = subMesh.intersects(ray, this._positions, this.getIndices(), fastCheck, trianglePredicate);
            if (currentIntersectInfo) {
                if (fastCheck || !intersectInfo || currentIntersectInfo.distance < intersectInfo.distance) {
                    intersectInfo = currentIntersectInfo;
                    intersectInfo.subMeshId = index;
                    if (fastCheck) {
                        break;
                    }
                }
            }
        }
        if (intersectInfo) {
            // Get picked point
            var world = worldToUse !== null && worldToUse !== void 0 ? worldToUse : this.getWorldMatrix();
            var worldOrigin = TmpVectors.Vector3[0];
            var direction = TmpVectors.Vector3[1];
            Vector3.TransformCoordinatesToRef(ray.origin, world, worldOrigin);
            ray.direction.scaleToRef(intersectInfo.distance, direction);
            var worldDirection = Vector3.TransformNormal(direction, world);
            var pickedPoint = worldDirection.addInPlace(worldOrigin);
            // Return result
            pickingInfo.hit = true;
            pickingInfo.distance = Vector3.Distance(worldOrigin, pickedPoint);
            pickingInfo.pickedPoint = pickedPoint;
            pickingInfo.pickedMesh = this;
            pickingInfo.bu = intersectInfo.bu || 0;
            pickingInfo.bv = intersectInfo.bv || 0;
            pickingInfo.subMeshFaceId = intersectInfo.faceId;
            pickingInfo.faceId = intersectInfo.faceId + subMeshes.data[intersectInfo.subMeshId].indexStart / (this.getClassName().indexOf("LinesMesh") !== -1 ? 2 : 3);
            pickingInfo.subMeshId = intersectInfo.subMeshId;
            return pickingInfo;
        }
        return pickingInfo;
    };
    /**
     * Clones the current mesh
     * @param name defines the mesh name
     * @param newParent defines the new mesh parent
     * @param doNotCloneChildren defines a boolean indicating that children must not be cloned (false by default)
     * @returns the new mesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.clone = function (name, newParent, doNotCloneChildren) {
        return null;
    };
    /**
     * Disposes all the submeshes of the current meshnp
     * @returns the current mesh
     */
    AbstractMesh.prototype.releaseSubMeshes = function () {
        if (this.subMeshes) {
            while (this.subMeshes.length) {
                this.subMeshes[0].dispose();
            }
        }
        else {
            this.subMeshes = new Array();
        }
        return this;
    };
    /**
     * Releases resources associated with this abstract mesh.
     * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
     * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
     */
    AbstractMesh.prototype.dispose = function (doNotRecurse, disposeMaterialAndTextures) {
        var _this = this;
        if (disposeMaterialAndTextures === void 0) { disposeMaterialAndTextures = false; }
        var index;
        // mesh map release.
        if (this._scene.useMaterialMeshMap) {
            // remove from material mesh map id needed
            if (this._internalAbstractMeshDataInfo._material && this._internalAbstractMeshDataInfo._material.meshMap) {
                this._internalAbstractMeshDataInfo._material.meshMap[this.uniqueId] = undefined;
            }
        }
        // Smart Array Retainers.
        this.getScene().freeActiveMeshes();
        this.getScene().freeRenderingGroups();
        // Action manager
        if (this.actionManager !== undefined && this.actionManager !== null) {
            this.actionManager.dispose();
            this.actionManager = null;
        }
        // Skeleton
        this._internalAbstractMeshDataInfo._skeleton = null;
        if (this._transformMatrixTexture) {
            this._transformMatrixTexture.dispose();
            this._transformMatrixTexture = null;
        }
        // Intersections in progress
        for (index = 0; index < this._intersectionsInProgress.length; index++) {
            var other = this._intersectionsInProgress[index];
            var pos = other._intersectionsInProgress.indexOf(this);
            other._intersectionsInProgress.splice(pos, 1);
        }
        this._intersectionsInProgress = [];
        // Lights
        var lights = this.getScene().lights;
        lights.forEach(function (light) {
            var meshIndex = light.includedOnlyMeshes.indexOf(_this);
            if (meshIndex !== -1) {
                light.includedOnlyMeshes.splice(meshIndex, 1);
            }
            meshIndex = light.excludedMeshes.indexOf(_this);
            if (meshIndex !== -1) {
                light.excludedMeshes.splice(meshIndex, 1);
            }
            // Shadow generators
            var generator = light.getShadowGenerator();
            if (generator) {
                var shadowMap = generator.getShadowMap();
                if (shadowMap && shadowMap.renderList) {
                    meshIndex = shadowMap.renderList.indexOf(_this);
                    if (meshIndex !== -1) {
                        shadowMap.renderList.splice(meshIndex, 1);
                    }
                }
            }
        });
        // SubMeshes
        if (this.getClassName() !== "InstancedMesh" || this.getClassName() !== "InstancedLinesMesh") {
            this.releaseSubMeshes();
        }
        // Query
        var engine = this.getScene().getEngine();
        if (this._occlusionQuery !== null) {
            this.isOcclusionQueryInProgress = false;
            engine.deleteQuery(this._occlusionQuery);
            this._occlusionQuery = null;
        }
        // Engine
        engine.wipeCaches();
        // Remove from scene
        this.getScene().removeMesh(this);
        if (this._parentContainer) {
            var index_1 = this._parentContainer.meshes.indexOf(this);
            if (index_1 > -1) {
                this._parentContainer.meshes.splice(index_1, 1);
            }
            this._parentContainer = null;
        }
        if (disposeMaterialAndTextures) {
            if (this.material) {
                if (this.material.getClassName() === "MultiMaterial") {
                    this.material.dispose(false, true, true);
                }
                else {
                    this.material.dispose(false, true);
                }
            }
        }
        if (!doNotRecurse) {
            // Particles
            for (index = 0; index < this.getScene().particleSystems.length; index++) {
                if (this.getScene().particleSystems[index].emitter === this) {
                    this.getScene().particleSystems[index].dispose();
                    index--;
                }
            }
        }
        // facet data
        if (this._internalAbstractMeshDataInfo._facetData.facetDataEnabled) {
            this.disableFacetData();
        }
        this._uniformBuffer.dispose();
        this.onAfterWorldMatrixUpdateObservable.clear();
        this.onCollideObservable.clear();
        this.onCollisionPositionChangeObservable.clear();
        this.onRebuildObservable.clear();
        _super.prototype.dispose.call(this, doNotRecurse, disposeMaterialAndTextures);
    };
    /**
     * Adds the passed mesh as a child to the current mesh
     * @param mesh defines the child mesh
     * @param preserveScalingSign if true, keep scaling sign of child. Otherwise, scaling sign might change.
     * @returns the current mesh
     */
    AbstractMesh.prototype.addChild = function (mesh, preserveScalingSign) {
        if (preserveScalingSign === void 0) { preserveScalingSign = false; }
        mesh.setParent(this, preserveScalingSign);
        return this;
    };
    /**
     * Removes the passed mesh from the current mesh children list
     * @param mesh defines the child mesh
     * @param preserveScalingSign if true, keep scaling sign of child. Otherwise, scaling sign might change.
     * @returns the current mesh
     */
    AbstractMesh.prototype.removeChild = function (mesh, preserveScalingSign) {
        if (preserveScalingSign === void 0) { preserveScalingSign = false; }
        mesh.setParent(null, preserveScalingSign);
        return this;
    };
    // Facet data
    /** @hidden */
    AbstractMesh.prototype._initFacetData = function () {
        var data = this._internalAbstractMeshDataInfo._facetData;
        if (!data.facetNormals) {
            data.facetNormals = new Array();
        }
        if (!data.facetPositions) {
            data.facetPositions = new Array();
        }
        if (!data.facetPartitioning) {
            data.facetPartitioning = new Array();
        }
        data.facetNb = (this.getIndices().length / 3) | 0;
        data.partitioningSubdivisions = data.partitioningSubdivisions ? data.partitioningSubdivisions : 10; // default nb of partitioning subdivisions = 10
        data.partitioningBBoxRatio = data.partitioningBBoxRatio ? data.partitioningBBoxRatio : 1.01; // default ratio 1.01 = the partitioning is 1% bigger than the bounding box
        for (var f = 0; f < data.facetNb; f++) {
            data.facetNormals[f] = Vector3.Zero();
            data.facetPositions[f] = Vector3.Zero();
        }
        data.facetDataEnabled = true;
        return this;
    };
    /**
     * Updates the mesh facetData arrays and the internal partitioning when the mesh is morphed or updated.
     * This method can be called within the render loop.
     * You don't need to call this method by yourself in the render loop when you update/morph a mesh with the methods CreateXXX() as they automatically manage this computation
     * @returns the current mesh
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.updateFacetData = function () {
        var data = this._internalAbstractMeshDataInfo._facetData;
        if (!data.facetDataEnabled) {
            this._initFacetData();
        }
        var positions = this.getVerticesData(VertexBuffer.PositionKind);
        var indices = this.getIndices();
        var normals = this.getVerticesData(VertexBuffer.NormalKind);
        var bInfo = this.getBoundingInfo();
        if (data.facetDepthSort && !data.facetDepthSortEnabled) {
            // init arrays, matrix and sort function on first call
            data.facetDepthSortEnabled = true;
            if (indices instanceof Uint16Array) {
                data.depthSortedIndices = new Uint16Array(indices);
            }
            else if (indices instanceof Uint32Array) {
                data.depthSortedIndices = new Uint32Array(indices);
            }
            else {
                var needs32bits = false;
                for (var i = 0; i < indices.length; i++) {
                    if (indices[i] > 65535) {
                        needs32bits = true;
                        break;
                    }
                }
                if (needs32bits) {
                    data.depthSortedIndices = new Uint32Array(indices);
                }
                else {
                    data.depthSortedIndices = new Uint16Array(indices);
                }
            }
            data.facetDepthSortFunction = function (f1, f2) {
                return f2.sqDistance - f1.sqDistance;
            };
            if (!data.facetDepthSortFrom) {
                var camera = this.getScene().activeCamera;
                data.facetDepthSortFrom = camera ? camera.position : Vector3.Zero();
            }
            data.depthSortedFacets = [];
            for (var f = 0; f < data.facetNb; f++) {
                var depthSortedFacet = { ind: f * 3, sqDistance: 0.0 };
                data.depthSortedFacets.push(depthSortedFacet);
            }
            data.invertedMatrix = Matrix.Identity();
            data.facetDepthSortOrigin = Vector3.Zero();
        }
        data.bbSize.x = bInfo.maximum.x - bInfo.minimum.x > Epsilon ? bInfo.maximum.x - bInfo.minimum.x : Epsilon;
        data.bbSize.y = bInfo.maximum.y - bInfo.minimum.y > Epsilon ? bInfo.maximum.y - bInfo.minimum.y : Epsilon;
        data.bbSize.z = bInfo.maximum.z - bInfo.minimum.z > Epsilon ? bInfo.maximum.z - bInfo.minimum.z : Epsilon;
        var bbSizeMax = data.bbSize.x > data.bbSize.y ? data.bbSize.x : data.bbSize.y;
        bbSizeMax = bbSizeMax > data.bbSize.z ? bbSizeMax : data.bbSize.z;
        data.subDiv.max = data.partitioningSubdivisions;
        data.subDiv.X = Math.floor((data.subDiv.max * data.bbSize.x) / bbSizeMax); // adjust the number of subdivisions per axis
        data.subDiv.Y = Math.floor((data.subDiv.max * data.bbSize.y) / bbSizeMax); // according to each bbox size per axis
        data.subDiv.Z = Math.floor((data.subDiv.max * data.bbSize.z) / bbSizeMax);
        data.subDiv.X = data.subDiv.X < 1 ? 1 : data.subDiv.X; // at least one subdivision
        data.subDiv.Y = data.subDiv.Y < 1 ? 1 : data.subDiv.Y;
        data.subDiv.Z = data.subDiv.Z < 1 ? 1 : data.subDiv.Z;
        // set the parameters for ComputeNormals()
        data.facetParameters.facetNormals = this.getFacetLocalNormals();
        data.facetParameters.facetPositions = this.getFacetLocalPositions();
        data.facetParameters.facetPartitioning = this.getFacetLocalPartitioning();
        data.facetParameters.bInfo = bInfo;
        data.facetParameters.bbSize = data.bbSize;
        data.facetParameters.subDiv = data.subDiv;
        data.facetParameters.ratio = this.partitioningBBoxRatio;
        data.facetParameters.depthSort = data.facetDepthSort;
        if (data.facetDepthSort && data.facetDepthSortEnabled) {
            this.computeWorldMatrix(true);
            this._worldMatrix.invertToRef(data.invertedMatrix);
            Vector3.TransformCoordinatesToRef(data.facetDepthSortFrom, data.invertedMatrix, data.facetDepthSortOrigin);
            data.facetParameters.distanceTo = data.facetDepthSortOrigin;
        }
        data.facetParameters.depthSortedFacets = data.depthSortedFacets;
        if (normals) {
            VertexData.ComputeNormals(positions, indices, normals, data.facetParameters);
        }
        if (data.facetDepthSort && data.facetDepthSortEnabled) {
            data.depthSortedFacets.sort(data.facetDepthSortFunction);
            var l = (data.depthSortedIndices.length / 3) | 0;
            for (var f = 0; f < l; f++) {
                var sind = data.depthSortedFacets[f].ind;
                data.depthSortedIndices[f * 3] = indices[sind];
                data.depthSortedIndices[f * 3 + 1] = indices[sind + 1];
                data.depthSortedIndices[f * 3 + 2] = indices[sind + 2];
            }
            this.updateIndices(data.depthSortedIndices, undefined, true);
        }
        return this;
    };
    /**
     * Returns the facetLocalNormals array.
     * The normals are expressed in the mesh local spac
     * @returns an array of Vector3
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetLocalNormals = function () {
        var facetData = this._internalAbstractMeshDataInfo._facetData;
        if (!facetData.facetNormals) {
            this.updateFacetData();
        }
        return facetData.facetNormals;
    };
    /**
     * Returns the facetLocalPositions array.
     * The facet positions are expressed in the mesh local space
     * @returns an array of Vector3
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetLocalPositions = function () {
        var facetData = this._internalAbstractMeshDataInfo._facetData;
        if (!facetData.facetPositions) {
            this.updateFacetData();
        }
        return facetData.facetPositions;
    };
    /**
     * Returns the facetLocalPartitioning array
     * @returns an array of array of numbers
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetLocalPartitioning = function () {
        var facetData = this._internalAbstractMeshDataInfo._facetData;
        if (!facetData.facetPartitioning) {
            this.updateFacetData();
        }
        return facetData.facetPartitioning;
    };
    /**
     * Returns the i-th facet position in the world system.
     * This method allocates a new Vector3 per call
     * @param i defines the facet index
     * @returns a new Vector3
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetPosition = function (i) {
        var pos = Vector3.Zero();
        this.getFacetPositionToRef(i, pos);
        return pos;
    };
    /**
     * Sets the reference Vector3 with the i-th facet position in the world system
     * @param i defines the facet index
     * @param ref defines the target vector
     * @returns the current mesh
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetPositionToRef = function (i, ref) {
        var localPos = this.getFacetLocalPositions()[i];
        var world = this.getWorldMatrix();
        Vector3.TransformCoordinatesToRef(localPos, world, ref);
        return this;
    };
    /**
     * Returns the i-th facet normal in the world system.
     * This method allocates a new Vector3 per call
     * @param i defines the facet index
     * @returns a new Vector3
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetNormal = function (i) {
        var norm = Vector3.Zero();
        this.getFacetNormalToRef(i, norm);
        return norm;
    };
    /**
     * Sets the reference Vector3 with the i-th facet normal in the world system
     * @param i defines the facet index
     * @param ref defines the target vector
     * @returns the current mesh
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetNormalToRef = function (i, ref) {
        var localNorm = this.getFacetLocalNormals()[i];
        Vector3.TransformNormalToRef(localNorm, this.getWorldMatrix(), ref);
        return this;
    };
    /**
     * Returns the facets (in an array) in the same partitioning block than the one the passed coordinates are located (expressed in the mesh local system)
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @returns the array of facet indexes
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetsAtLocalCoordinates = function (x, y, z) {
        var bInfo = this.getBoundingInfo();
        var data = this._internalAbstractMeshDataInfo._facetData;
        var ox = Math.floor(((x - bInfo.minimum.x * data.partitioningBBoxRatio) * data.subDiv.X * data.partitioningBBoxRatio) / data.bbSize.x);
        var oy = Math.floor(((y - bInfo.minimum.y * data.partitioningBBoxRatio) * data.subDiv.Y * data.partitioningBBoxRatio) / data.bbSize.y);
        var oz = Math.floor(((z - bInfo.minimum.z * data.partitioningBBoxRatio) * data.subDiv.Z * data.partitioningBBoxRatio) / data.bbSize.z);
        if (ox < 0 || ox > data.subDiv.max || oy < 0 || oy > data.subDiv.max || oz < 0 || oz > data.subDiv.max) {
            return null;
        }
        return data.facetPartitioning[ox + data.subDiv.max * oy + data.subDiv.max * data.subDiv.max * oz];
    };
    /**
     * Returns the closest mesh facet index at (x,y,z) World coordinates, null if not found
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @param projected sets as the (x,y,z) world projection on the facet
     * @param checkFace if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned
     * @param facing if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position
     * @returns the face index if found (or null instead)
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getClosestFacetAtCoordinates = function (x, y, z, projected, checkFace, facing) {
        if (checkFace === void 0) { checkFace = false; }
        if (facing === void 0) { facing = true; }
        var world = this.getWorldMatrix();
        var invMat = TmpVectors.Matrix[5];
        world.invertToRef(invMat);
        var invVect = TmpVectors.Vector3[8];
        Vector3.TransformCoordinatesFromFloatsToRef(x, y, z, invMat, invVect); // transform (x,y,z) to coordinates in the mesh local space
        var closest = this.getClosestFacetAtLocalCoordinates(invVect.x, invVect.y, invVect.z, projected, checkFace, facing);
        if (projected) {
            // transform the local computed projected vector to world coordinates
            Vector3.TransformCoordinatesFromFloatsToRef(projected.x, projected.y, projected.z, world, projected);
        }
        return closest;
    };
    /**
     * Returns the closest mesh facet index at (x,y,z) local coordinates, null if not found
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @param projected sets as the (x,y,z) local projection on the facet
     * @param checkFace if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned
     * @param facing if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position
     * @returns the face index if found (or null instead)
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getClosestFacetAtLocalCoordinates = function (x, y, z, projected, checkFace, facing) {
        if (checkFace === void 0) { checkFace = false; }
        if (facing === void 0) { facing = true; }
        var closest = null;
        var tmpx = 0.0;
        var tmpy = 0.0;
        var tmpz = 0.0;
        var d = 0.0; // tmp dot facet normal * facet position
        var t0 = 0.0;
        var projx = 0.0;
        var projy = 0.0;
        var projz = 0.0;
        // Get all the facets in the same partitioning block than (x, y, z)
        var facetPositions = this.getFacetLocalPositions();
        var facetNormals = this.getFacetLocalNormals();
        var facetsInBlock = this.getFacetsAtLocalCoordinates(x, y, z);
        if (!facetsInBlock) {
            return null;
        }
        // Get the closest facet to (x, y, z)
        var shortest = Number.MAX_VALUE; // init distance vars
        var tmpDistance = shortest;
        var fib; // current facet in the block
        var norm; // current facet normal
        var p0; // current facet barycenter position
        // loop on all the facets in the current partitioning block
        for (var idx = 0; idx < facetsInBlock.length; idx++) {
            fib = facetsInBlock[idx];
            norm = facetNormals[fib];
            p0 = facetPositions[fib];
            d = (x - p0.x) * norm.x + (y - p0.y) * norm.y + (z - p0.z) * norm.z;
            if (!checkFace || (checkFace && facing && d >= 0.0) || (checkFace && !facing && d <= 0.0)) {
                // compute (x,y,z) projection on the facet = (projx, projy, projz)
                d = norm.x * p0.x + norm.y * p0.y + norm.z * p0.z;
                t0 = -(norm.x * x + norm.y * y + norm.z * z - d) / (norm.x * norm.x + norm.y * norm.y + norm.z * norm.z);
                projx = x + norm.x * t0;
                projy = y + norm.y * t0;
                projz = z + norm.z * t0;
                tmpx = projx - x;
                tmpy = projy - y;
                tmpz = projz - z;
                tmpDistance = tmpx * tmpx + tmpy * tmpy + tmpz * tmpz; // compute length between (x, y, z) and its projection on the facet
                if (tmpDistance < shortest) {
                    // just keep the closest facet to (x, y, z)
                    shortest = tmpDistance;
                    closest = fib;
                    if (projected) {
                        projected.x = projx;
                        projected.y = projy;
                        projected.z = projz;
                    }
                }
            }
        }
        return closest;
    };
    /**
     * Returns the object "parameter" set with all the expected parameters for facetData computation by ComputeNormals()
     * @returns the parameters
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.getFacetDataParameters = function () {
        return this._internalAbstractMeshDataInfo._facetData.facetParameters;
    };
    /**
     * Disables the feature FacetData and frees the related memory
     * @returns the current mesh
     * @see https://doc.babylonjs.com/how_to/how_to_use_facetdata
     */
    AbstractMesh.prototype.disableFacetData = function () {
        var facetData = this._internalAbstractMeshDataInfo._facetData;
        if (facetData.facetDataEnabled) {
            facetData.facetDataEnabled = false;
            facetData.facetPositions = new Array();
            facetData.facetNormals = new Array();
            facetData.facetPartitioning = new Array();
            facetData.facetParameters = null;
            facetData.depthSortedIndices = new Uint32Array(0);
        }
        return this;
    };
    /**
     * Updates the AbstractMesh indices array
     * @param indices defines the data source
     * @param offset defines the offset in the index buffer where to store the new data (can be null)
     * @param gpuMemoryOnly defines a boolean indicating that only the GPU memory must be updated leaving the CPU version of the indices unchanged (false by default)
     * @returns the current mesh
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.updateIndices = function (indices, offset, gpuMemoryOnly) {
        return this;
    };
    /**
     * Creates new normals data for the mesh
     * @param updatable defines if the normal vertex buffer must be flagged as updatable
     * @returns the current mesh
     */
    AbstractMesh.prototype.createNormals = function (updatable) {
        var positions = this.getVerticesData(VertexBuffer.PositionKind);
        var indices = this.getIndices();
        var normals;
        if (this.isVerticesDataPresent(VertexBuffer.NormalKind)) {
            normals = this.getVerticesData(VertexBuffer.NormalKind);
        }
        else {
            normals = [];
        }
        VertexData.ComputeNormals(positions, indices, normals, { useRightHandedSystem: this.getScene().useRightHandedSystem });
        this.setVerticesData(VertexBuffer.NormalKind, normals, updatable);
        return this;
    };
    /**
     * Align the mesh with a normal
     * @param normal defines the normal to use
     * @param upDirection can be used to redefined the up vector to use (will use the (0, 1, 0) by default)
     * @returns the current mesh
     */
    AbstractMesh.prototype.alignWithNormal = function (normal, upDirection) {
        if (!upDirection) {
            upDirection = Axis.Y;
        }
        var axisX = TmpVectors.Vector3[0];
        var axisZ = TmpVectors.Vector3[1];
        Vector3.CrossToRef(upDirection, normal, axisZ);
        Vector3.CrossToRef(normal, axisZ, axisX);
        if (this.rotationQuaternion) {
            Quaternion.RotationQuaternionFromAxisToRef(axisX, normal, axisZ, this.rotationQuaternion);
        }
        else {
            Vector3.RotationFromAxisToRef(axisX, normal, axisZ, this.rotation);
        }
        return this;
    };
    /** @hidden */
    AbstractMesh.prototype._checkOcclusionQuery = function () {
        // Will be replaced by correct code if Occlusion queries are referenced
        return false;
    };
    /**
     * Disables the mesh edge rendering mode
     * @returns the currentAbstractMesh
     */
    AbstractMesh.prototype.disableEdgesRendering = function () {
        throw _WarnImport("EdgesRenderer");
    };
    /**
     * Enables the edge rendering mode on the mesh.
     * This mode makes the mesh edges visible
     * @param epsilon defines the maximal distance between two angles to detect a face
     * @param checkVerticesInsteadOfIndices indicates that we should check vertex list directly instead of faces
     * @param options options to the edge renderer
     * @returns the currentAbstractMesh
     * @see https://www.babylonjs-playground.com/#19O9TU#0
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AbstractMesh.prototype.enableEdgesRendering = function (epsilon, checkVerticesInsteadOfIndices, options) {
        throw _WarnImport("EdgesRenderer");
    };
    /**
     * This function returns all of the particle systems in the scene that use the mesh as an emitter.
     * @returns an array of particle systems in the scene that use the mesh as an emitter
     */
    AbstractMesh.prototype.getConnectedParticleSystems = function () {
        var _this = this;
        return this._scene.particleSystems.filter(function (particleSystem) { return particleSystem.emitter === _this; });
    };
    /** No occlusion */
    AbstractMesh.OCCLUSION_TYPE_NONE = 0;
    /** Occlusion set to optimistic */
    AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC = 1;
    /** Occlusion set to strict */
    AbstractMesh.OCCLUSION_TYPE_STRICT = 2;
    /** Use an accurate occlusion algorithm */
    AbstractMesh.OCCLUSION_ALGORITHM_TYPE_ACCURATE = 0;
    /** Use a conservative occlusion algorithm */
    AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE = 1;
    /** Default culling strategy : this is an exclusion test and it's the more accurate.
     *  Test order :
     *  Is the bounding sphere outside the frustum ?
     *  If not, are the bounding box vertices outside the frustum ?
     *  It not, then the cullable object is in the frustum.
     */
    AbstractMesh.CULLINGSTRATEGY_STANDARD = 0;
    /** Culling strategy : Bounding Sphere Only.
     *  This is an exclusion test. It's faster than the standard strategy because the bounding box is not tested.
     *  It's also less accurate than the standard because some not visible objects can still be selected.
     *  Test : is the bounding sphere outside the frustum ?
     *  If not, then the cullable object is in the frustum.
     */
    AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY = 1;
    /** Culling strategy : Optimistic Inclusion.
     *  This in an inclusion test first, then the standard exclusion test.
     *  This can be faster when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the standard test when the tested object center is not the frustum but one of its bounding box vertex is still inside.
     *  Anyway, it's as accurate as the standard strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the default culling strategy.
     */
    AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION = 2;
    /** Culling strategy : Optimistic Inclusion then Bounding Sphere Only.
     *  This in an inclusion test first, then the bounding sphere only exclusion test.
     *  This can be the fastest test when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the BoundingSphereOnly strategy when the tested object center is not in the frustum but its bounding sphere still intersects it.
     *  It's less accurate than the standard strategy and as accurate as the BoundingSphereOnly strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the Bounding Sphere Only strategy. No Bounding Box is tested here.
     */
    AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY = 3;
    return AbstractMesh;
}(TransformNode));
RegisterClass("BABYLON.AbstractMesh", AbstractMesh);

export { AbstractMesh as A };
