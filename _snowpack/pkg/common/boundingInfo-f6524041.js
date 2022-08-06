import { A as ArrayTools, E as Epsilon } from './arrayTools-18b75ee3.js';
import { M as Matrix, V as Vector3 } from './math.vector-92740b4e.js';

/**
 * Class used to store bounding box information
 */
var BoundingBox = /** @class */ (function () {
    /**
     * Creates a new bounding box
     * @param min defines the minimum vector (in local space)
     * @param max defines the maximum vector (in local space)
     * @param worldMatrix defines the new world matrix
     */
    function BoundingBox(min, max, worldMatrix) {
        /**
         * Gets the 8 vectors representing the bounding box in local space
         */
        this.vectors = ArrayTools.BuildArray(8, Vector3.Zero);
        /**
         * Gets the center of the bounding box in local space
         */
        this.center = Vector3.Zero();
        /**
         * Gets the center of the bounding box in world space
         */
        this.centerWorld = Vector3.Zero();
        /**
         * Gets the extend size in local space
         */
        this.extendSize = Vector3.Zero();
        /**
         * Gets the extend size in world space
         */
        this.extendSizeWorld = Vector3.Zero();
        /**
         * Gets the OBB (object bounding box) directions
         */
        this.directions = ArrayTools.BuildArray(3, Vector3.Zero);
        /**
         * Gets the 8 vectors representing the bounding box in world space
         */
        this.vectorsWorld = ArrayTools.BuildArray(8, Vector3.Zero);
        /**
         * Gets the minimum vector in world space
         */
        this.minimumWorld = Vector3.Zero();
        /**
         * Gets the maximum vector in world space
         */
        this.maximumWorld = Vector3.Zero();
        /**
         * Gets the minimum vector in local space
         */
        this.minimum = Vector3.Zero();
        /**
         * Gets the maximum vector in local space
         */
        this.maximum = Vector3.Zero();
        /** @hidden */
        this._drawWrapperFront = null;
        /** @hidden */
        this._drawWrapperBack = null;
        this.reConstruct(min, max, worldMatrix);
    }
    // Methods
    /**
     * Recreates the entire bounding box from scratch as if we call the constructor in place
     * @param min defines the new minimum vector (in local space)
     * @param max defines the new maximum vector (in local space)
     * @param worldMatrix defines the new world matrix
     */
    BoundingBox.prototype.reConstruct = function (min, max, worldMatrix) {
        var minX = min.x, minY = min.y, minZ = min.z, maxX = max.x, maxY = max.y, maxZ = max.z;
        var vectors = this.vectors;
        this.minimum.copyFromFloats(minX, minY, minZ);
        this.maximum.copyFromFloats(maxX, maxY, maxZ);
        vectors[0].copyFromFloats(minX, minY, minZ);
        vectors[1].copyFromFloats(maxX, maxY, maxZ);
        vectors[2].copyFromFloats(maxX, minY, minZ);
        vectors[3].copyFromFloats(minX, maxY, minZ);
        vectors[4].copyFromFloats(minX, minY, maxZ);
        vectors[5].copyFromFloats(maxX, maxY, minZ);
        vectors[6].copyFromFloats(minX, maxY, maxZ);
        vectors[7].copyFromFloats(maxX, minY, maxZ);
        // OBB
        max.addToRef(min, this.center).scaleInPlace(0.5);
        max.subtractToRef(min, this.extendSize).scaleInPlace(0.5);
        this._worldMatrix = worldMatrix || Matrix.IdentityReadOnly;
        this._update(this._worldMatrix);
    };
    /**
     * Scale the current bounding box by applying a scale factor
     * @param factor defines the scale factor to apply
     * @returns the current bounding box
     */
    BoundingBox.prototype.scale = function (factor) {
        var tmpVectors = BoundingBox._TmpVector3;
        var diff = this.maximum.subtractToRef(this.minimum, tmpVectors[0]);
        var len = diff.length();
        diff.normalizeFromLength(len);
        var distance = len * factor;
        var newRadius = diff.scaleInPlace(distance * 0.5);
        var min = this.center.subtractToRef(newRadius, tmpVectors[1]);
        var max = this.center.addToRef(newRadius, tmpVectors[2]);
        this.reConstruct(min, max, this._worldMatrix);
        return this;
    };
    /**
     * Gets the world matrix of the bounding box
     * @returns a matrix
     */
    BoundingBox.prototype.getWorldMatrix = function () {
        return this._worldMatrix;
    };
    /**
     * @param world
     * @hidden
     */
    BoundingBox.prototype._update = function (world) {
        var minWorld = this.minimumWorld;
        var maxWorld = this.maximumWorld;
        var directions = this.directions;
        var vectorsWorld = this.vectorsWorld;
        var vectors = this.vectors;
        if (!world.isIdentity()) {
            minWorld.setAll(Number.MAX_VALUE);
            maxWorld.setAll(-Number.MAX_VALUE);
            for (var index = 0; index < 8; ++index) {
                var v = vectorsWorld[index];
                Vector3.TransformCoordinatesToRef(vectors[index], world, v);
                minWorld.minimizeInPlace(v);
                maxWorld.maximizeInPlace(v);
            }
            // Extend
            maxWorld.subtractToRef(minWorld, this.extendSizeWorld).scaleInPlace(0.5);
            maxWorld.addToRef(minWorld, this.centerWorld).scaleInPlace(0.5);
        }
        else {
            minWorld.copyFrom(this.minimum);
            maxWorld.copyFrom(this.maximum);
            for (var index = 0; index < 8; ++index) {
                vectorsWorld[index].copyFrom(vectors[index]);
            }
            // Extend
            this.extendSizeWorld.copyFrom(this.extendSize);
            this.centerWorld.copyFrom(this.center);
        }
        Vector3.FromArrayToRef(world.m, 0, directions[0]);
        Vector3.FromArrayToRef(world.m, 4, directions[1]);
        Vector3.FromArrayToRef(world.m, 8, directions[2]);
        this._worldMatrix = world;
    };
    /**
     * Tests if the bounding box is intersecting the frustum planes
     * @param frustumPlanes defines the frustum planes to test
     * @returns true if there is an intersection
     */
    BoundingBox.prototype.isInFrustum = function (frustumPlanes) {
        return BoundingBox.IsInFrustum(this.vectorsWorld, frustumPlanes);
    };
    /**
     * Tests if the bounding box is entirely inside the frustum planes
     * @param frustumPlanes defines the frustum planes to test
     * @returns true if there is an inclusion
     */
    BoundingBox.prototype.isCompletelyInFrustum = function (frustumPlanes) {
        return BoundingBox.IsCompletelyInFrustum(this.vectorsWorld, frustumPlanes);
    };
    /**
     * Tests if a point is inside the bounding box
     * @param point defines the point to test
     * @returns true if the point is inside the bounding box
     */
    BoundingBox.prototype.intersectsPoint = function (point) {
        var min = this.minimumWorld;
        var max = this.maximumWorld;
        var minX = min.x, minY = min.y, minZ = min.z, maxX = max.x, maxY = max.y, maxZ = max.z;
        var pointX = point.x, pointY = point.y, pointZ = point.z;
        var delta = -Epsilon;
        if (maxX - pointX < delta || delta > pointX - minX) {
            return false;
        }
        if (maxY - pointY < delta || delta > pointY - minY) {
            return false;
        }
        if (maxZ - pointZ < delta || delta > pointZ - minZ) {
            return false;
        }
        return true;
    };
    /**
     * Tests if the bounding box intersects with a bounding sphere
     * @param sphere defines the sphere to test
     * @returns true if there is an intersection
     */
    BoundingBox.prototype.intersectsSphere = function (sphere) {
        return BoundingBox.IntersectsSphere(this.minimumWorld, this.maximumWorld, sphere.centerWorld, sphere.radiusWorld);
    };
    /**
     * Tests if the bounding box intersects with a box defined by a min and max vectors
     * @param min defines the min vector to use
     * @param max defines the max vector to use
     * @returns true if there is an intersection
     */
    BoundingBox.prototype.intersectsMinMax = function (min, max) {
        var myMin = this.minimumWorld;
        var myMax = this.maximumWorld;
        var myMinX = myMin.x, myMinY = myMin.y, myMinZ = myMin.z, myMaxX = myMax.x, myMaxY = myMax.y, myMaxZ = myMax.z;
        var minX = min.x, minY = min.y, minZ = min.z, maxX = max.x, maxY = max.y, maxZ = max.z;
        if (myMaxX < minX || myMinX > maxX) {
            return false;
        }
        if (myMaxY < minY || myMinY > maxY) {
            return false;
        }
        if (myMaxZ < minZ || myMinZ > maxZ) {
            return false;
        }
        return true;
    };
    /**
     * Disposes the resources of the class
     */
    BoundingBox.prototype.dispose = function () {
        var _a, _b;
        (_a = this._drawWrapperFront) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this._drawWrapperBack) === null || _b === void 0 ? void 0 : _b.dispose();
    };
    // Statics
    /**
     * Tests if two bounding boxes are intersections
     * @param box0 defines the first box to test
     * @param box1 defines the second box to test
     * @returns true if there is an intersection
     */
    BoundingBox.Intersects = function (box0, box1) {
        return box0.intersectsMinMax(box1.minimumWorld, box1.maximumWorld);
    };
    /**
     * Tests if a bounding box defines by a min/max vectors intersects a sphere
     * @param minPoint defines the minimum vector of the bounding box
     * @param maxPoint defines the maximum vector of the bounding box
     * @param sphereCenter defines the sphere center
     * @param sphereRadius defines the sphere radius
     * @returns true if there is an intersection
     */
    BoundingBox.IntersectsSphere = function (minPoint, maxPoint, sphereCenter, sphereRadius) {
        var vector = BoundingBox._TmpVector3[0];
        Vector3.ClampToRef(sphereCenter, minPoint, maxPoint, vector);
        var num = Vector3.DistanceSquared(sphereCenter, vector);
        return num <= sphereRadius * sphereRadius;
    };
    /**
     * Tests if a bounding box defined with 8 vectors is entirely inside frustum planes
     * @param boundingVectors defines an array of 8 vectors representing a bounding box
     * @param frustumPlanes defines the frustum planes to test
     * @return true if there is an inclusion
     */
    BoundingBox.IsCompletelyInFrustum = function (boundingVectors, frustumPlanes) {
        for (var p = 0; p < 6; ++p) {
            var frustumPlane = frustumPlanes[p];
            for (var i = 0; i < 8; ++i) {
                if (frustumPlane.dotCoordinate(boundingVectors[i]) < 0) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Tests if a bounding box defined with 8 vectors intersects frustum planes
     * @param boundingVectors defines an array of 8 vectors representing a bounding box
     * @param frustumPlanes defines the frustum planes to test
     * @return true if there is an intersection
     */
    BoundingBox.IsInFrustum = function (boundingVectors, frustumPlanes) {
        for (var p = 0; p < 6; ++p) {
            var canReturnFalse = true;
            var frustumPlane = frustumPlanes[p];
            for (var i = 0; i < 8; ++i) {
                if (frustumPlane.dotCoordinate(boundingVectors[i]) >= 0) {
                    canReturnFalse = false;
                    break;
                }
            }
            if (canReturnFalse) {
                return false;
            }
        }
        return true;
    };
    BoundingBox._TmpVector3 = ArrayTools.BuildArray(3, Vector3.Zero);
    return BoundingBox;
}());

/**
 * Class used to store bounding sphere information
 */
var BoundingSphere = /** @class */ (function () {
    /**
     * Creates a new bounding sphere
     * @param min defines the minimum vector (in local space)
     * @param max defines the maximum vector (in local space)
     * @param worldMatrix defines the new world matrix
     */
    function BoundingSphere(min, max, worldMatrix) {
        /**
         * Gets the center of the bounding sphere in local space
         */
        this.center = Vector3.Zero();
        /**
         * Gets the center of the bounding sphere in world space
         */
        this.centerWorld = Vector3.Zero();
        /**
         * Gets the minimum vector in local space
         */
        this.minimum = Vector3.Zero();
        /**
         * Gets the maximum vector in local space
         */
        this.maximum = Vector3.Zero();
        this.reConstruct(min, max, worldMatrix);
    }
    /**
     * Recreates the entire bounding sphere from scratch as if we call the constructor in place
     * @param min defines the new minimum vector (in local space)
     * @param max defines the new maximum vector (in local space)
     * @param worldMatrix defines the new world matrix
     */
    BoundingSphere.prototype.reConstruct = function (min, max, worldMatrix) {
        this.minimum.copyFrom(min);
        this.maximum.copyFrom(max);
        var distance = Vector3.Distance(min, max);
        max.addToRef(min, this.center).scaleInPlace(0.5);
        this.radius = distance * 0.5;
        this._update(worldMatrix || Matrix.IdentityReadOnly);
    };
    /**
     * Scale the current bounding sphere by applying a scale factor
     * @param factor defines the scale factor to apply
     * @returns the current bounding box
     */
    BoundingSphere.prototype.scale = function (factor) {
        var newRadius = this.radius * factor;
        var tmpVectors = BoundingSphere._TmpVector3;
        var tempRadiusVector = tmpVectors[0].setAll(newRadius);
        var min = this.center.subtractToRef(tempRadiusVector, tmpVectors[1]);
        var max = this.center.addToRef(tempRadiusVector, tmpVectors[2]);
        this.reConstruct(min, max, this._worldMatrix);
        return this;
    };
    /**
     * Gets the world matrix of the bounding box
     * @returns a matrix
     */
    BoundingSphere.prototype.getWorldMatrix = function () {
        return this._worldMatrix;
    };
    // Methods
    /**
     * @param worldMatrix
     * @hidden
     */
    BoundingSphere.prototype._update = function (worldMatrix) {
        if (!worldMatrix.isIdentity()) {
            Vector3.TransformCoordinatesToRef(this.center, worldMatrix, this.centerWorld);
            var tempVector = BoundingSphere._TmpVector3[0];
            Vector3.TransformNormalFromFloatsToRef(1.0, 1.0, 1.0, worldMatrix, tempVector);
            this.radiusWorld = Math.max(Math.abs(tempVector.x), Math.abs(tempVector.y), Math.abs(tempVector.z)) * this.radius;
        }
        else {
            this.centerWorld.copyFrom(this.center);
            this.radiusWorld = this.radius;
        }
    };
    /**
     * Tests if the bounding sphere is intersecting the frustum planes
     * @param frustumPlanes defines the frustum planes to test
     * @returns true if there is an intersection
     */
    BoundingSphere.prototype.isInFrustum = function (frustumPlanes) {
        var center = this.centerWorld;
        var radius = this.radiusWorld;
        for (var i = 0; i < 6; i++) {
            if (frustumPlanes[i].dotCoordinate(center) <= -radius) {
                return false;
            }
        }
        return true;
    };
    /**
     * Tests if the bounding sphere center is in between the frustum planes.
     * Used for optimistic fast inclusion.
     * @param frustumPlanes defines the frustum planes to test
     * @returns true if the sphere center is in between the frustum planes
     */
    BoundingSphere.prototype.isCenterInFrustum = function (frustumPlanes) {
        var center = this.centerWorld;
        for (var i = 0; i < 6; i++) {
            if (frustumPlanes[i].dotCoordinate(center) < 0) {
                return false;
            }
        }
        return true;
    };
    /**
     * Tests if a point is inside the bounding sphere
     * @param point defines the point to test
     * @returns true if the point is inside the bounding sphere
     */
    BoundingSphere.prototype.intersectsPoint = function (point) {
        var squareDistance = Vector3.DistanceSquared(this.centerWorld, point);
        if (this.radiusWorld * this.radiusWorld < squareDistance) {
            return false;
        }
        return true;
    };
    // Statics
    /**
     * Checks if two sphere intersect
     * @param sphere0 sphere 0
     * @param sphere1 sphere 1
     * @returns true if the spheres intersect
     */
    BoundingSphere.Intersects = function (sphere0, sphere1) {
        var squareDistance = Vector3.DistanceSquared(sphere0.centerWorld, sphere1.centerWorld);
        var radiusSum = sphere0.radiusWorld + sphere1.radiusWorld;
        if (radiusSum * radiusSum < squareDistance) {
            return false;
        }
        return true;
    };
    /**
     * Creates a sphere from a center and a radius
     * @param center The center
     * @param radius radius
     * @param matrix Optional worldMatrix
     * @returns The sphere
     */
    BoundingSphere.CreateFromCenterAndRadius = function (center, radius, matrix) {
        this._TmpVector3[0].copyFrom(center);
        this._TmpVector3[1].copyFromFloats(0, 0, radius);
        this._TmpVector3[2].copyFrom(center);
        this._TmpVector3[0].addInPlace(this._TmpVector3[1]);
        this._TmpVector3[2].subtractInPlace(this._TmpVector3[1]);
        var sphere = new BoundingSphere(this._TmpVector3[0], this._TmpVector3[2]);
        if (matrix) {
            sphere._worldMatrix = matrix;
        }
        else {
            sphere._worldMatrix = Matrix.Identity();
        }
        return sphere;
    };
    BoundingSphere._TmpVector3 = ArrayTools.BuildArray(3, Vector3.Zero);
    return BoundingSphere;
}());

var _result0 = { min: 0, max: 0 };
var _result1 = { min: 0, max: 0 };
var computeBoxExtents = function (axis, box, result) {
    var p = Vector3.Dot(box.centerWorld, axis);
    var r0 = Math.abs(Vector3.Dot(box.directions[0], axis)) * box.extendSize.x;
    var r1 = Math.abs(Vector3.Dot(box.directions[1], axis)) * box.extendSize.y;
    var r2 = Math.abs(Vector3.Dot(box.directions[2], axis)) * box.extendSize.z;
    var r = r0 + r1 + r2;
    result.min = p - r;
    result.max = p + r;
};
var axisOverlap = function (axis, box0, box1) {
    computeBoxExtents(axis, box0, _result0);
    computeBoxExtents(axis, box1, _result1);
    return !(_result0.min > _result1.max || _result1.min > _result0.max);
};
/**
 * Info for a bounding data of a mesh
 */
var BoundingInfo = /** @class */ (function () {
    /**
     * Constructs bounding info
     * @param minimum min vector of the bounding box/sphere
     * @param maximum max vector of the bounding box/sphere
     * @param worldMatrix defines the new world matrix
     */
    function BoundingInfo(minimum, maximum, worldMatrix) {
        this._isLocked = false;
        this.boundingBox = new BoundingBox(minimum, maximum, worldMatrix);
        this.boundingSphere = new BoundingSphere(minimum, maximum, worldMatrix);
    }
    /**
     * Recreates the entire bounding info from scratch as if we call the constructor in place
     * @param min defines the new minimum vector (in local space)
     * @param max defines the new maximum vector (in local space)
     * @param worldMatrix defines the new world matrix
     */
    BoundingInfo.prototype.reConstruct = function (min, max, worldMatrix) {
        this.boundingBox.reConstruct(min, max, worldMatrix);
        this.boundingSphere.reConstruct(min, max, worldMatrix);
    };
    Object.defineProperty(BoundingInfo.prototype, "minimum", {
        /**
         * min vector of the bounding box/sphere
         */
        get: function () {
            return this.boundingBox.minimum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingInfo.prototype, "maximum", {
        /**
         * max vector of the bounding box/sphere
         */
        get: function () {
            return this.boundingBox.maximum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingInfo.prototype, "isLocked", {
        /**
         * If the info is locked and won't be updated to avoid perf overhead
         */
        get: function () {
            return this._isLocked;
        },
        set: function (value) {
            this._isLocked = value;
        },
        enumerable: false,
        configurable: true
    });
    // Methods
    /**
     * Updates the bounding sphere and box
     * @param world world matrix to be used to update
     */
    BoundingInfo.prototype.update = function (world) {
        if (this._isLocked) {
            return;
        }
        this.boundingBox._update(world);
        this.boundingSphere._update(world);
    };
    /**
     * Recreate the bounding info to be centered around a specific point given a specific extend.
     * @param center New center of the bounding info
     * @param extend New extend of the bounding info
     * @returns the current bounding info
     */
    BoundingInfo.prototype.centerOn = function (center, extend) {
        var minimum = BoundingInfo._TmpVector3[0].copyFrom(center).subtractInPlace(extend);
        var maximum = BoundingInfo._TmpVector3[1].copyFrom(center).addInPlace(extend);
        this.boundingBox.reConstruct(minimum, maximum, this.boundingBox.getWorldMatrix());
        this.boundingSphere.reConstruct(minimum, maximum, this.boundingBox.getWorldMatrix());
        return this;
    };
    /**
     * Grows the bounding info to include the given point.
     * @param point The point that will be included in the current bounding info
     * @returns the current bounding info
     */
    BoundingInfo.prototype.encapsulate = function (point) {
        var minimum = Vector3.Minimize(this.minimum, point);
        var maximum = Vector3.Maximize(this.maximum, point);
        this.reConstruct(minimum, maximum, this.boundingBox.getWorldMatrix());
        return this;
    };
    /**
     * Grows the bounding info to encapsulate the given bounding info.
     * @param toEncapsulate The bounding info that will be encapsulated in the current bounding info
     * @returns the current bounding info
     */
    BoundingInfo.prototype.encapsulateBoundingInfo = function (toEncapsulate) {
        this.encapsulate(toEncapsulate.boundingBox.centerWorld.subtract(toEncapsulate.boundingBox.extendSizeWorld));
        this.encapsulate(toEncapsulate.boundingBox.centerWorld.add(toEncapsulate.boundingBox.extendSizeWorld));
        return this;
    };
    /**
     * Scale the current bounding info by applying a scale factor
     * @param factor defines the scale factor to apply
     * @returns the current bounding info
     */
    BoundingInfo.prototype.scale = function (factor) {
        this.boundingBox.scale(factor);
        this.boundingSphere.scale(factor);
        return this;
    };
    /**
     * Returns `true` if the bounding info is within the frustum defined by the passed array of planes.
     * @param frustumPlanes defines the frustum to test
     * @param strategy defines the strategy to use for the culling (default is BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD)
     * @returns true if the bounding info is in the frustum planes
     */
    BoundingInfo.prototype.isInFrustum = function (frustumPlanes, strategy) {
        if (strategy === void 0) { strategy = 0; }
        var inclusionTest = strategy === 2 || strategy === 3;
        if (inclusionTest) {
            if (this.boundingSphere.isCenterInFrustum(frustumPlanes)) {
                return true;
            }
        }
        if (!this.boundingSphere.isInFrustum(frustumPlanes)) {
            return false;
        }
        var bSphereOnlyTest = strategy === 1 || strategy === 3;
        if (bSphereOnlyTest) {
            return true;
        }
        return this.boundingBox.isInFrustum(frustumPlanes);
    };
    Object.defineProperty(BoundingInfo.prototype, "diagonalLength", {
        /**
         * Gets the world distance between the min and max points of the bounding box
         */
        get: function () {
            var boundingBox = this.boundingBox;
            var diag = boundingBox.maximumWorld.subtractToRef(boundingBox.minimumWorld, BoundingInfo._TmpVector3[0]);
            return diag.length();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Checks if a cullable object (mesh...) is in the camera frustum
     * Unlike isInFrustum this checks the full bounding box
     * @param frustumPlanes Camera near/planes
     * @returns true if the object is in frustum otherwise false
     */
    BoundingInfo.prototype.isCompletelyInFrustum = function (frustumPlanes) {
        return this.boundingBox.isCompletelyInFrustum(frustumPlanes);
    };
    /**
     * @param collider
     * @hidden
     */
    BoundingInfo.prototype._checkCollision = function (collider) {
        return collider._canDoCollision(this.boundingSphere.centerWorld, this.boundingSphere.radiusWorld, this.boundingBox.minimumWorld, this.boundingBox.maximumWorld);
    };
    /**
     * Checks if a point is inside the bounding box and bounding sphere or the mesh
     * @see https://doc.babylonjs.com/babylon101/intersect_collisions_-_mesh
     * @param point the point to check intersection with
     * @returns if the point intersects
     */
    BoundingInfo.prototype.intersectsPoint = function (point) {
        if (!this.boundingSphere.centerWorld) {
            return false;
        }
        if (!this.boundingSphere.intersectsPoint(point)) {
            return false;
        }
        if (!this.boundingBox.intersectsPoint(point)) {
            return false;
        }
        return true;
    };
    /**
     * Checks if another bounding info intersects the bounding box and bounding sphere or the mesh
     * @see https://doc.babylonjs.com/babylon101/intersect_collisions_-_mesh
     * @param boundingInfo the bounding info to check intersection with
     * @param precise if the intersection should be done using OBB
     * @returns if the bounding info intersects
     */
    BoundingInfo.prototype.intersects = function (boundingInfo, precise) {
        if (!BoundingSphere.Intersects(this.boundingSphere, boundingInfo.boundingSphere)) {
            return false;
        }
        if (!BoundingBox.Intersects(this.boundingBox, boundingInfo.boundingBox)) {
            return false;
        }
        if (!precise) {
            return true;
        }
        var box0 = this.boundingBox;
        var box1 = boundingInfo.boundingBox;
        if (!axisOverlap(box0.directions[0], box0, box1)) {
            return false;
        }
        if (!axisOverlap(box0.directions[1], box0, box1)) {
            return false;
        }
        if (!axisOverlap(box0.directions[2], box0, box1)) {
            return false;
        }
        if (!axisOverlap(box1.directions[0], box0, box1)) {
            return false;
        }
        if (!axisOverlap(box1.directions[1], box0, box1)) {
            return false;
        }
        if (!axisOverlap(box1.directions[2], box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[0], box1.directions[0]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[0], box1.directions[1]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[0], box1.directions[2]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[1], box1.directions[0]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[1], box1.directions[1]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[1], box1.directions[2]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[2], box1.directions[0]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[2], box1.directions[1]), box0, box1)) {
            return false;
        }
        if (!axisOverlap(Vector3.Cross(box0.directions[2], box1.directions[2]), box0, box1)) {
            return false;
        }
        return true;
    };
    BoundingInfo._TmpVector3 = ArrayTools.BuildArray(2, Vector3.Zero);
    return BoundingInfo;
}());

export { BoundingInfo as B };
