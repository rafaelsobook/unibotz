import { V as VertexBuffer } from './buffer-82c85d65.js';
import { a as SmartArray, S as SmartArrayNoDuplicate } from './smartArray-23f1522f.js';
import { V as Vector3 } from './math.vector-92740b4e.js';

/**
 * PostProcessManager is used to manage one or more post processes or post process pipelines
 * See https://doc.babylonjs.com/how_to/how_to_use_postprocesses
 */
var PostProcessManager = /** @class */ (function () {
    /**
     * Creates a new instance PostProcess
     * @param scene The scene that the post process is associated with.
     */
    function PostProcessManager(scene) {
        this._vertexBuffers = {};
        this._scene = scene;
    }
    PostProcessManager.prototype._prepareBuffers = function () {
        if (this._vertexBuffers[VertexBuffer.PositionKind]) {
            return;
        }
        // VBO
        var vertices = [];
        vertices.push(1, 1);
        vertices.push(-1, 1);
        vertices.push(-1, -1);
        vertices.push(1, -1);
        this._vertexBuffers[VertexBuffer.PositionKind] = new VertexBuffer(this._scene.getEngine(), vertices, VertexBuffer.PositionKind, false, false, 2);
        this._buildIndexBuffer();
    };
    PostProcessManager.prototype._buildIndexBuffer = function () {
        // Indices
        var indices = [];
        indices.push(0);
        indices.push(1);
        indices.push(2);
        indices.push(0);
        indices.push(2);
        indices.push(3);
        this._indexBuffer = this._scene.getEngine().createIndexBuffer(indices);
    };
    /**
     * Rebuilds the vertex buffers of the manager.
     * @hidden
     */
    PostProcessManager.prototype._rebuild = function () {
        var vb = this._vertexBuffers[VertexBuffer.PositionKind];
        if (!vb) {
            return;
        }
        vb._rebuild();
        this._buildIndexBuffer();
    };
    // Methods
    /**
     * Prepares a frame to be run through a post process.
     * @param sourceTexture The input texture to the post processes. (default: null)
     * @param postProcesses An array of post processes to be run. (default: null)
     * @returns True if the post processes were able to be run.
     * @hidden
     */
    PostProcessManager.prototype._prepareFrame = function (sourceTexture, postProcesses) {
        if (sourceTexture === void 0) { sourceTexture = null; }
        if (postProcesses === void 0) { postProcesses = null; }
        var camera = this._scene.activeCamera;
        if (!camera) {
            return false;
        }
        postProcesses = postProcesses || camera._postProcesses.filter(function (pp) {
            return pp != null;
        });
        if (!postProcesses || postProcesses.length === 0 || !this._scene.postProcessesEnabled) {
            return false;
        }
        postProcesses[0].activate(camera, sourceTexture, postProcesses !== null && postProcesses !== undefined);
        return true;
    };
    /**
     * Manually render a set of post processes to a texture.
     * Please note, the frame buffer won't be unbound after the call in case you have more render to do.
     * @param postProcesses An array of post processes to be run.
     * @param targetTexture The render target wrapper to render to.
     * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight
     * @param faceIndex defines the face to render to if a cubemap is defined as the target
     * @param lodLevel defines which lod of the texture to render to
     * @param doNotBindFrambuffer If set to true, assumes that the framebuffer has been bound previously
     */
    PostProcessManager.prototype.directRender = function (postProcesses, targetTexture, forceFullscreenViewport, faceIndex, lodLevel, doNotBindFrambuffer) {
        var _a;
        if (targetTexture === void 0) { targetTexture = null; }
        if (forceFullscreenViewport === void 0) { forceFullscreenViewport = false; }
        if (faceIndex === void 0) { faceIndex = 0; }
        if (lodLevel === void 0) { lodLevel = 0; }
        if (doNotBindFrambuffer === void 0) { doNotBindFrambuffer = false; }
        var engine = this._scene.getEngine();
        for (var index = 0; index < postProcesses.length; index++) {
            if (index < postProcesses.length - 1) {
                postProcesses[index + 1].activate(this._scene.activeCamera, targetTexture === null || targetTexture === void 0 ? void 0 : targetTexture.texture);
            }
            else {
                if (targetTexture) {
                    engine.bindFramebuffer(targetTexture, faceIndex, undefined, undefined, forceFullscreenViewport, lodLevel);
                }
                else if (!doNotBindFrambuffer) {
                    engine.restoreDefaultFramebuffer();
                }
                (_a = engine._debugInsertMarker) === null || _a === void 0 ? void 0 : _a.call(engine, "post process ".concat(postProcesses[index].name, " output"));
            }
            var pp = postProcesses[index];
            var effect = pp.apply();
            if (effect) {
                pp.onBeforeRenderObservable.notifyObservers(effect);
                // VBOs
                this._prepareBuffers();
                engine.bindBuffers(this._vertexBuffers, this._indexBuffer, effect);
                // Draw order
                engine.drawElementsType(0, 0, 6);
                pp.onAfterRenderObservable.notifyObservers(effect);
            }
        }
        // Restore depth buffer
        engine.setDepthBuffer(true);
        engine.setDepthWrite(true);
    };
    /**
     * Finalize the result of the output of the postprocesses.
     * @param doNotPresent If true the result will not be displayed to the screen.
     * @param targetTexture The render target wrapper to render to.
     * @param faceIndex The index of the face to bind the target texture to.
     * @param postProcesses The array of post processes to render.
     * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight (default: false)
     * @hidden
     */
    PostProcessManager.prototype._finalizeFrame = function (doNotPresent, targetTexture, faceIndex, postProcesses, forceFullscreenViewport) {
        var _a;
        if (forceFullscreenViewport === void 0) { forceFullscreenViewport = false; }
        var camera = this._scene.activeCamera;
        if (!camera) {
            return;
        }
        postProcesses = postProcesses || camera._postProcesses.filter(function (pp) {
            return pp != null;
        });
        if (postProcesses.length === 0 || !this._scene.postProcessesEnabled) {
            return;
        }
        var engine = this._scene.getEngine();
        for (var index = 0, len = postProcesses.length; index < len; index++) {
            var pp = postProcesses[index];
            if (index < len - 1) {
                pp._outputTexture = postProcesses[index + 1].activate(camera, targetTexture === null || targetTexture === void 0 ? void 0 : targetTexture.texture);
            }
            else {
                if (targetTexture) {
                    engine.bindFramebuffer(targetTexture, faceIndex, undefined, undefined, forceFullscreenViewport);
                    pp._outputTexture = targetTexture;
                }
                else {
                    engine.restoreDefaultFramebuffer();
                    pp._outputTexture = null;
                }
                (_a = engine._debugInsertMarker) === null || _a === void 0 ? void 0 : _a.call(engine, "post process ".concat(postProcesses[index].name, " output"));
            }
            if (doNotPresent) {
                break;
            }
            var effect = pp.apply();
            if (effect) {
                pp.onBeforeRenderObservable.notifyObservers(effect);
                // VBOs
                this._prepareBuffers();
                engine.bindBuffers(this._vertexBuffers, this._indexBuffer, effect);
                // Draw order
                engine.drawElementsType(0, 0, 6);
                pp.onAfterRenderObservable.notifyObservers(effect);
            }
        }
        // Restore states
        engine.setDepthBuffer(true);
        engine.setDepthWrite(true);
        engine.setAlphaMode(0);
    };
    /**
     * Disposes of the post process manager.
     */
    PostProcessManager.prototype.dispose = function () {
        var buffer = this._vertexBuffers[VertexBuffer.PositionKind];
        if (buffer) {
            buffer.dispose();
            this._vertexBuffers[VertexBuffer.PositionKind] = null;
        }
        if (this._indexBuffer) {
            this._scene.getEngine()._releaseBuffer(this._indexBuffer);
            this._indexBuffer = null;
        }
    };
    return PostProcessManager;
}());

/**
 * This represents the object necessary to create a rendering group.
 * This is exclusively used and created by the rendering manager.
 * To modify the behavior, you use the available helpers in your scene or meshes.
 * @hidden
 */
var RenderingGroup = /** @class */ (function () {
    /**
     * Creates a new rendering group.
     * @param index The rendering group index
     * @param scene
     * @param opaqueSortCompareFn The opaque sort comparison function. If null no order is applied
     * @param alphaTestSortCompareFn The alpha test sort comparison function. If null no order is applied
     * @param transparentSortCompareFn The transparent sort comparison function. If null back to front + alpha index sort is applied
     */
    function RenderingGroup(index, scene, opaqueSortCompareFn, alphaTestSortCompareFn, transparentSortCompareFn) {
        if (opaqueSortCompareFn === void 0) { opaqueSortCompareFn = null; }
        if (alphaTestSortCompareFn === void 0) { alphaTestSortCompareFn = null; }
        if (transparentSortCompareFn === void 0) { transparentSortCompareFn = null; }
        this.index = index;
        this._opaqueSubMeshes = new SmartArray(256);
        this._transparentSubMeshes = new SmartArray(256);
        this._alphaTestSubMeshes = new SmartArray(256);
        this._depthOnlySubMeshes = new SmartArray(256);
        this._particleSystems = new SmartArray(256);
        this._spriteManagers = new SmartArray(256);
        /** @hidden */
        this._empty = true;
        /** @hidden */
        this._edgesRenderers = new SmartArrayNoDuplicate(16);
        this._scene = scene;
        this.opaqueSortCompareFn = opaqueSortCompareFn;
        this.alphaTestSortCompareFn = alphaTestSortCompareFn;
        this.transparentSortCompareFn = transparentSortCompareFn;
    }
    Object.defineProperty(RenderingGroup.prototype, "opaqueSortCompareFn", {
        /**
         * Set the opaque sort comparison function.
         * If null the sub meshes will be render in the order they were created
         */
        set: function (value) {
            if (value) {
                this._opaqueSortCompareFn = value;
            }
            else {
                this._opaqueSortCompareFn = RenderingGroup.PainterSortCompare;
            }
            this._renderOpaque = this._renderOpaqueSorted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderingGroup.prototype, "alphaTestSortCompareFn", {
        /**
         * Set the alpha test sort comparison function.
         * If null the sub meshes will be render in the order they were created
         */
        set: function (value) {
            if (value) {
                this._alphaTestSortCompareFn = value;
            }
            else {
                this._alphaTestSortCompareFn = RenderingGroup.PainterSortCompare;
            }
            this._renderAlphaTest = this._renderAlphaTestSorted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderingGroup.prototype, "transparentSortCompareFn", {
        /**
         * Set the transparent sort comparison function.
         * If null the sub meshes will be render in the order they were created
         */
        set: function (value) {
            if (value) {
                this._transparentSortCompareFn = value;
            }
            else {
                this._transparentSortCompareFn = RenderingGroup.defaultTransparentSortCompare;
            }
            this._renderTransparent = this._renderTransparentSorted;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Render all the sub meshes contained in the group.
     * @param customRenderFunction Used to override the default render behaviour of the group.
     * @param renderSprites
     * @param renderParticles
     * @param activeMeshes
     * @returns true if rendered some submeshes.
     */
    RenderingGroup.prototype.render = function (customRenderFunction, renderSprites, renderParticles, activeMeshes) {
        if (customRenderFunction) {
            customRenderFunction(this._opaqueSubMeshes, this._alphaTestSubMeshes, this._transparentSubMeshes, this._depthOnlySubMeshes);
            return;
        }
        var engine = this._scene.getEngine();
        // Depth only
        if (this._depthOnlySubMeshes.length !== 0) {
            engine.setColorWrite(false);
            this._renderAlphaTest(this._depthOnlySubMeshes);
            engine.setColorWrite(true);
        }
        // Opaque
        if (this._opaqueSubMeshes.length !== 0) {
            this._renderOpaque(this._opaqueSubMeshes);
        }
        // Alpha test
        if (this._alphaTestSubMeshes.length !== 0) {
            this._renderAlphaTest(this._alphaTestSubMeshes);
        }
        var stencilState = engine.getStencilBuffer();
        engine.setStencilBuffer(false);
        // Sprites
        if (renderSprites) {
            this._renderSprites();
        }
        // Particles
        if (renderParticles) {
            this._renderParticles(activeMeshes);
        }
        if (this.onBeforeTransparentRendering) {
            this.onBeforeTransparentRendering();
        }
        // Transparent
        if (this._transparentSubMeshes.length !== 0 || this._scene.useOrderIndependentTransparency) {
            engine.setStencilBuffer(stencilState);
            if (this._scene.useOrderIndependentTransparency) {
                var excludedMeshes = this._scene.depthPeelingRenderer.render(this._transparentSubMeshes);
                if (excludedMeshes.length) {
                    // Render leftover meshes that could not be processed by depth peeling
                    this._renderTransparent(excludedMeshes);
                }
            }
            else {
                this._renderTransparent(this._transparentSubMeshes);
            }
            engine.setAlphaMode(0);
        }
        // Set back stencil to false in case it changes before the edge renderer.
        engine.setStencilBuffer(false);
        // Edges
        if (this._edgesRenderers.length) {
            for (var edgesRendererIndex = 0; edgesRendererIndex < this._edgesRenderers.length; edgesRendererIndex++) {
                this._edgesRenderers.data[edgesRendererIndex].render();
            }
            engine.setAlphaMode(0);
        }
        // Restore Stencil state.
        engine.setStencilBuffer(stencilState);
    };
    /**
     * Renders the opaque submeshes in the order from the opaqueSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    RenderingGroup.prototype._renderOpaqueSorted = function (subMeshes) {
        return RenderingGroup._RenderSorted(subMeshes, this._opaqueSortCompareFn, this._scene.activeCamera, false);
    };
    /**
     * Renders the opaque submeshes in the order from the alphatestSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    RenderingGroup.prototype._renderAlphaTestSorted = function (subMeshes) {
        return RenderingGroup._RenderSorted(subMeshes, this._alphaTestSortCompareFn, this._scene.activeCamera, false);
    };
    /**
     * Renders the opaque submeshes in the order from the transparentSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    RenderingGroup.prototype._renderTransparentSorted = function (subMeshes) {
        return RenderingGroup._RenderSorted(subMeshes, this._transparentSortCompareFn, this._scene.activeCamera, true);
    };
    /**
     * Renders the submeshes in a specified order.
     * @param subMeshes The submeshes to sort before render
     * @param sortCompareFn The comparison function use to sort
     * @param camera The camera position use to preprocess the submeshes to help sorting
     * @param transparent Specifies to activate blending if true
     */
    RenderingGroup._RenderSorted = function (subMeshes, sortCompareFn, camera, transparent) {
        var subIndex = 0;
        var subMesh;
        var cameraPosition = camera ? camera.globalPosition : RenderingGroup._ZeroVector;
        if (transparent) {
            for (; subIndex < subMeshes.length; subIndex++) {
                subMesh = subMeshes.data[subIndex];
                subMesh._alphaIndex = subMesh.getMesh().alphaIndex;
                subMesh._distanceToCamera = Vector3.Distance(subMesh.getBoundingInfo().boundingSphere.centerWorld, cameraPosition);
            }
        }
        var sortedArray = subMeshes.length === subMeshes.data.length ? subMeshes.data : subMeshes.data.slice(0, subMeshes.length);
        if (sortCompareFn) {
            sortedArray.sort(sortCompareFn);
        }
        var scene = sortedArray[0].getMesh().getScene();
        for (subIndex = 0; subIndex < sortedArray.length; subIndex++) {
            subMesh = sortedArray[subIndex];
            if (scene._activeMeshesFrozenButKeepClipping && !subMesh.isInFrustum(scene._frustumPlanes)) {
                continue;
            }
            if (transparent) {
                var material = subMesh.getMaterial();
                if (material && material.needDepthPrePass) {
                    var engine = material.getScene().getEngine();
                    engine.setColorWrite(false);
                    engine.setAlphaMode(0);
                    subMesh.render(false);
                    engine.setColorWrite(true);
                }
            }
            subMesh.render(transparent);
        }
    };
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered back to front if in the same alpha index.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RenderingGroup.defaultTransparentSortCompare = function (a, b) {
        // Alpha index first
        if (a._alphaIndex > b._alphaIndex) {
            return 1;
        }
        if (a._alphaIndex < b._alphaIndex) {
            return -1;
        }
        // Then distance to camera
        return RenderingGroup.backToFrontSortCompare(a, b);
    };
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered back to front.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RenderingGroup.backToFrontSortCompare = function (a, b) {
        // Then distance to camera
        if (a._distanceToCamera < b._distanceToCamera) {
            return 1;
        }
        if (a._distanceToCamera > b._distanceToCamera) {
            return -1;
        }
        return 0;
    };
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered front to back (prevent overdraw).
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RenderingGroup.frontToBackSortCompare = function (a, b) {
        // Then distance to camera
        if (a._distanceToCamera < b._distanceToCamera) {
            return -1;
        }
        if (a._distanceToCamera > b._distanceToCamera) {
            return 1;
        }
        return 0;
    };
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are grouped by material then geometry.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    RenderingGroup.PainterSortCompare = function (a, b) {
        var meshA = a.getMesh();
        var meshB = b.getMesh();
        if (meshA.material && meshB.material) {
            return meshA.material.uniqueId - meshB.material.uniqueId;
        }
        return meshA.uniqueId - meshB.uniqueId;
    };
    /**
     * Resets the different lists of submeshes to prepare a new frame.
     */
    RenderingGroup.prototype.prepare = function () {
        this._opaqueSubMeshes.reset();
        this._transparentSubMeshes.reset();
        this._alphaTestSubMeshes.reset();
        this._depthOnlySubMeshes.reset();
        this._particleSystems.reset();
        this._spriteManagers.reset();
        this._edgesRenderers.reset();
        this._empty = true;
    };
    RenderingGroup.prototype.dispose = function () {
        this._opaqueSubMeshes.dispose();
        this._transparentSubMeshes.dispose();
        this._alphaTestSubMeshes.dispose();
        this._depthOnlySubMeshes.dispose();
        this._particleSystems.dispose();
        this._spriteManagers.dispose();
        this._edgesRenderers.dispose();
    };
    /**
     * Inserts the submesh in its correct queue depending on its material.
     * @param subMesh The submesh to dispatch
     * @param [mesh] Optional reference to the submeshes's mesh. Provide if you have an exiting reference to improve performance.
     * @param [material] Optional reference to the submeshes's material. Provide if you have an exiting reference to improve performance.
     */
    RenderingGroup.prototype.dispatch = function (subMesh, mesh, material) {
        // Get mesh and materials if not provided
        if (mesh === undefined) {
            mesh = subMesh.getMesh();
        }
        if (material === undefined) {
            material = subMesh.getMaterial();
        }
        if (material === null || material === undefined) {
            return;
        }
        if (material.needAlphaBlendingForMesh(mesh)) {
            // Transparent
            this._transparentSubMeshes.push(subMesh);
        }
        else if (material.needAlphaTesting()) {
            // Alpha test
            if (material.needDepthPrePass) {
                this._depthOnlySubMeshes.push(subMesh);
            }
            this._alphaTestSubMeshes.push(subMesh);
        }
        else {
            if (material.needDepthPrePass) {
                this._depthOnlySubMeshes.push(subMesh);
            }
            this._opaqueSubMeshes.push(subMesh); // Opaque
        }
        mesh._renderingGroup = this;
        if (mesh._edgesRenderer && mesh._edgesRenderer.isEnabled) {
            this._edgesRenderers.pushNoDuplicate(mesh._edgesRenderer);
        }
        this._empty = false;
    };
    RenderingGroup.prototype.dispatchSprites = function (spriteManager) {
        this._spriteManagers.push(spriteManager);
        this._empty = false;
    };
    RenderingGroup.prototype.dispatchParticles = function (particleSystem) {
        this._particleSystems.push(particleSystem);
        this._empty = false;
    };
    RenderingGroup.prototype._renderParticles = function (activeMeshes) {
        if (this._particleSystems.length === 0) {
            return;
        }
        // Particles
        var activeCamera = this._scene.activeCamera;
        this._scene.onBeforeParticlesRenderingObservable.notifyObservers(this._scene);
        for (var particleIndex = 0; particleIndex < this._particleSystems.length; particleIndex++) {
            var particleSystem = this._particleSystems.data[particleIndex];
            if ((activeCamera && activeCamera.layerMask & particleSystem.layerMask) === 0) {
                continue;
            }
            var emitter = particleSystem.emitter;
            if (!emitter.position || !activeMeshes || activeMeshes.indexOf(emitter) !== -1) {
                this._scene._activeParticles.addCount(particleSystem.render(), false);
            }
        }
        this._scene.onAfterParticlesRenderingObservable.notifyObservers(this._scene);
    };
    RenderingGroup.prototype._renderSprites = function () {
        if (!this._scene.spritesEnabled || this._spriteManagers.length === 0) {
            return;
        }
        // Sprites
        var activeCamera = this._scene.activeCamera;
        this._scene.onBeforeSpritesRenderingObservable.notifyObservers(this._scene);
        for (var id = 0; id < this._spriteManagers.length; id++) {
            var spriteManager = this._spriteManagers.data[id];
            if ((activeCamera && activeCamera.layerMask & spriteManager.layerMask) !== 0) {
                spriteManager.render();
            }
        }
        this._scene.onAfterSpritesRenderingObservable.notifyObservers(this._scene);
    };
    RenderingGroup._ZeroVector = Vector3.Zero();
    return RenderingGroup;
}());

/**
 * This class is used by the onRenderingGroupObservable
 */
var RenderingGroupInfo = /** @class */ (function () {
    function RenderingGroupInfo() {
    }
    return RenderingGroupInfo;
}());
/**
 * This is the manager responsible of all the rendering for meshes sprites and particles.
 * It is enable to manage the different groups as well as the different necessary sort functions.
 * This should not be used directly aside of the few static configurations
 */
var RenderingManager = /** @class */ (function () {
    /**
     * Instantiates a new rendering group for a particular scene
     * @param scene Defines the scene the groups belongs to
     */
    function RenderingManager(scene) {
        /**
         * @hidden
         */
        this._useSceneAutoClearSetup = false;
        this._renderingGroups = new Array();
        this._autoClearDepthStencil = {};
        this._customOpaqueSortCompareFn = {};
        this._customAlphaTestSortCompareFn = {};
        this._customTransparentSortCompareFn = {};
        this._renderingGroupInfo = new RenderingGroupInfo();
        this._scene = scene;
        for (var i = RenderingManager.MIN_RENDERINGGROUPS; i < RenderingManager.MAX_RENDERINGGROUPS; i++) {
            this._autoClearDepthStencil[i] = { autoClear: true, depth: true, stencil: true };
        }
    }
    RenderingManager.prototype._clearDepthStencilBuffer = function (depth, stencil) {
        if (depth === void 0) { depth = true; }
        if (stencil === void 0) { stencil = true; }
        if (this._depthStencilBufferAlreadyCleaned) {
            return;
        }
        this._scene.getEngine().clear(null, false, depth, stencil);
        this._depthStencilBufferAlreadyCleaned = true;
    };
    /**
     * Renders the entire managed groups. This is used by the scene or the different render targets.
     * @param customRenderFunction
     * @param activeMeshes
     * @param renderParticles
     * @param renderSprites
     * @hidden
     */
    RenderingManager.prototype.render = function (customRenderFunction, activeMeshes, renderParticles, renderSprites) {
        // Update the observable context (not null as it only goes away on dispose)
        var info = this._renderingGroupInfo;
        info.scene = this._scene;
        info.camera = this._scene.activeCamera;
        // Dispatch sprites
        if (this._scene.spriteManagers && renderSprites) {
            for (var index = 0; index < this._scene.spriteManagers.length; index++) {
                var manager = this._scene.spriteManagers[index];
                this.dispatchSprites(manager);
            }
        }
        // Render
        for (var index = RenderingManager.MIN_RENDERINGGROUPS; index < RenderingManager.MAX_RENDERINGGROUPS; index++) {
            this._depthStencilBufferAlreadyCleaned = index === RenderingManager.MIN_RENDERINGGROUPS;
            var renderingGroup = this._renderingGroups[index];
            if (!renderingGroup || renderingGroup._empty) {
                continue;
            }
            var renderingGroupMask = Math.pow(2, index);
            info.renderingGroupId = index;
            // Before Observable
            this._scene.onBeforeRenderingGroupObservable.notifyObservers(info, renderingGroupMask);
            // Clear depth/stencil if needed
            if (RenderingManager.AUTOCLEAR) {
                var autoClear = this._useSceneAutoClearSetup ? this._scene.getAutoClearDepthStencilSetup(index) : this._autoClearDepthStencil[index];
                if (autoClear && autoClear.autoClear) {
                    this._clearDepthStencilBuffer(autoClear.depth, autoClear.stencil);
                }
            }
            // Render
            for (var _i = 0, _a = this._scene._beforeRenderingGroupDrawStage; _i < _a.length; _i++) {
                var step = _a[_i];
                step.action(index);
            }
            renderingGroup.render(customRenderFunction, renderSprites, renderParticles, activeMeshes);
            for (var _b = 0, _c = this._scene._afterRenderingGroupDrawStage; _b < _c.length; _b++) {
                var step = _c[_b];
                step.action(index);
            }
            // After Observable
            this._scene.onAfterRenderingGroupObservable.notifyObservers(info, renderingGroupMask);
        }
    };
    /**
     * Resets the different information of the group to prepare a new frame
     * @hidden
     */
    RenderingManager.prototype.reset = function () {
        for (var index = RenderingManager.MIN_RENDERINGGROUPS; index < RenderingManager.MAX_RENDERINGGROUPS; index++) {
            var renderingGroup = this._renderingGroups[index];
            if (renderingGroup) {
                renderingGroup.prepare();
            }
        }
    };
    /**
     * Dispose and release the group and its associated resources.
     * @hidden
     */
    RenderingManager.prototype.dispose = function () {
        this.freeRenderingGroups();
        this._renderingGroups.length = 0;
        this._renderingGroupInfo = null;
    };
    /**
     * Clear the info related to rendering groups preventing retention points during dispose.
     */
    RenderingManager.prototype.freeRenderingGroups = function () {
        for (var index = RenderingManager.MIN_RENDERINGGROUPS; index < RenderingManager.MAX_RENDERINGGROUPS; index++) {
            var renderingGroup = this._renderingGroups[index];
            if (renderingGroup) {
                renderingGroup.dispose();
            }
        }
    };
    RenderingManager.prototype._prepareRenderingGroup = function (renderingGroupId) {
        if (this._renderingGroups[renderingGroupId] === undefined) {
            this._renderingGroups[renderingGroupId] = new RenderingGroup(renderingGroupId, this._scene, this._customOpaqueSortCompareFn[renderingGroupId], this._customAlphaTestSortCompareFn[renderingGroupId], this._customTransparentSortCompareFn[renderingGroupId]);
        }
    };
    /**
     * Add a sprite manager to the rendering manager in order to render it this frame.
     * @param spriteManager Define the sprite manager to render
     */
    RenderingManager.prototype.dispatchSprites = function (spriteManager) {
        var renderingGroupId = spriteManager.renderingGroupId || 0;
        this._prepareRenderingGroup(renderingGroupId);
        this._renderingGroups[renderingGroupId].dispatchSprites(spriteManager);
    };
    /**
     * Add a particle system to the rendering manager in order to render it this frame.
     * @param particleSystem Define the particle system to render
     */
    RenderingManager.prototype.dispatchParticles = function (particleSystem) {
        var renderingGroupId = particleSystem.renderingGroupId || 0;
        this._prepareRenderingGroup(renderingGroupId);
        this._renderingGroups[renderingGroupId].dispatchParticles(particleSystem);
    };
    /**
     * Add a submesh to the manager in order to render it this frame
     * @param subMesh The submesh to dispatch
     * @param mesh Optional reference to the submeshes's mesh. Provide if you have an exiting reference to improve performance.
     * @param material Optional reference to the submeshes's material. Provide if you have an exiting reference to improve performance.
     */
    RenderingManager.prototype.dispatch = function (subMesh, mesh, material) {
        if (mesh === undefined) {
            mesh = subMesh.getMesh();
        }
        var renderingGroupId = mesh.renderingGroupId || 0;
        this._prepareRenderingGroup(renderingGroupId);
        this._renderingGroups[renderingGroupId].dispatch(subMesh, mesh, material);
    };
    /**
     * Overrides the default sort function applied in the rendering group to prepare the meshes.
     * This allowed control for front to back rendering or reversely depending of the special needs.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
     * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
     * @param transparentSortCompareFn The transparent queue comparison function use to sort.
     */
    RenderingManager.prototype.setRenderingOrder = function (renderingGroupId, opaqueSortCompareFn, alphaTestSortCompareFn, transparentSortCompareFn) {
        if (opaqueSortCompareFn === void 0) { opaqueSortCompareFn = null; }
        if (alphaTestSortCompareFn === void 0) { alphaTestSortCompareFn = null; }
        if (transparentSortCompareFn === void 0) { transparentSortCompareFn = null; }
        this._customOpaqueSortCompareFn[renderingGroupId] = opaqueSortCompareFn;
        this._customAlphaTestSortCompareFn[renderingGroupId] = alphaTestSortCompareFn;
        this._customTransparentSortCompareFn[renderingGroupId] = transparentSortCompareFn;
        if (this._renderingGroups[renderingGroupId]) {
            var group = this._renderingGroups[renderingGroupId];
            group.opaqueSortCompareFn = this._customOpaqueSortCompareFn[renderingGroupId];
            group.alphaTestSortCompareFn = this._customAlphaTestSortCompareFn[renderingGroupId];
            group.transparentSortCompareFn = this._customTransparentSortCompareFn[renderingGroupId];
        }
    };
    /**
     * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
     * @param depth Automatically clears depth between groups if true and autoClear is true.
     * @param stencil Automatically clears stencil between groups if true and autoClear is true.
     */
    RenderingManager.prototype.setRenderingAutoClearDepthStencil = function (renderingGroupId, autoClearDepthStencil, depth, stencil) {
        if (depth === void 0) { depth = true; }
        if (stencil === void 0) { stencil = true; }
        this._autoClearDepthStencil[renderingGroupId] = {
            autoClear: autoClearDepthStencil,
            depth: depth,
            stencil: stencil,
        };
    };
    /**
     * Gets the current auto clear configuration for one rendering group of the rendering
     * manager.
     * @param index the rendering group index to get the information for
     * @returns The auto clear setup for the requested rendering group
     */
    RenderingManager.prototype.getAutoClearDepthStencilSetup = function (index) {
        return this._autoClearDepthStencil[index];
    };
    /**
     * The max id used for rendering groups (not included)
     */
    RenderingManager.MAX_RENDERINGGROUPS = 4;
    /**
     * The min id used for rendering groups (included)
     */
    RenderingManager.MIN_RENDERINGGROUPS = 0;
    /**
     * Used to globally prevent autoclearing scenes.
     */
    RenderingManager.AUTOCLEAR = true;
    return RenderingManager;
}());

export { PostProcessManager as P, RenderingManager as R };
