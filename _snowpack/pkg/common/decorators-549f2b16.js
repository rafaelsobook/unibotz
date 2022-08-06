import { M as Matrix, Q as Quaternion, V as Vector3, a as Vector2 } from './math.vector-92740b4e.js';
import { _ as _WarnImport } from './devTools-40c203e4.js';
import { a as Color4, C as Color3 } from './math.color-1c350db4.js';

/**
 * Class used to evaluate queries containing `and` and `or` operators
 */
var AndOrNotEvaluator = /** @class */ (function () {
    function AndOrNotEvaluator() {
    }
    /**
     * Evaluate a query
     * @param query defines the query to evaluate
     * @param evaluateCallback defines the callback used to filter result
     * @returns true if the query matches
     */
    AndOrNotEvaluator.Eval = function (query, evaluateCallback) {
        if (!query.match(/\([^()]*\)/g)) {
            query = AndOrNotEvaluator._HandleParenthesisContent(query, evaluateCallback);
        }
        else {
            query = query.replace(/\([^()]*\)/g, function (r) {
                // remove parenthesis
                r = r.slice(1, r.length - 1);
                return AndOrNotEvaluator._HandleParenthesisContent(r, evaluateCallback);
            });
        }
        if (query === "true") {
            return true;
        }
        if (query === "false") {
            return false;
        }
        return AndOrNotEvaluator.Eval(query, evaluateCallback);
    };
    AndOrNotEvaluator._HandleParenthesisContent = function (parenthesisContent, evaluateCallback) {
        evaluateCallback =
            evaluateCallback ||
                (function (r) {
                    return r === "true" ? true : false;
                });
        var result;
        var or = parenthesisContent.split("||");
        for (var i in or) {
            if (Object.prototype.hasOwnProperty.call(or, i)) {
                var ori = AndOrNotEvaluator._SimplifyNegation(or[i].trim());
                var and = ori.split("&&");
                if (and.length > 1) {
                    for (var j = 0; j < and.length; ++j) {
                        var andj = AndOrNotEvaluator._SimplifyNegation(and[j].trim());
                        if (andj !== "true" && andj !== "false") {
                            if (andj[0] === "!") {
                                result = !evaluateCallback(andj.substring(1));
                            }
                            else {
                                result = evaluateCallback(andj);
                            }
                        }
                        else {
                            result = andj === "true" ? true : false;
                        }
                        if (!result) {
                            // no need to continue since 'false && ... && ...' will always return false
                            ori = "false";
                            break;
                        }
                    }
                }
                if (result || ori === "true") {
                    // no need to continue since 'true || ... || ...' will always return true
                    result = true;
                    break;
                }
                // result equals false (or undefined)
                if (ori !== "true" && ori !== "false") {
                    if (ori[0] === "!") {
                        result = !evaluateCallback(ori.substring(1));
                    }
                    else {
                        result = evaluateCallback(ori);
                    }
                }
                else {
                    result = ori === "true" ? true : false;
                }
            }
        }
        // the whole parenthesis scope is replaced by 'true' or 'false'
        return result ? "true" : "false";
    };
    AndOrNotEvaluator._SimplifyNegation = function (booleanString) {
        booleanString = booleanString.replace(/^[\s!]+/, function (r) {
            // remove whitespaces
            r = r.replace(/[\s]/g, function () { return ""; });
            return r.length % 2 ? "!" : "";
        });
        booleanString = booleanString.trim();
        if (booleanString === "!true") {
            booleanString = "false";
        }
        else if (booleanString === "!false") {
            booleanString = "true";
        }
        return booleanString;
    };
    return AndOrNotEvaluator;
}());

/**
 * Class used to store custom tags
 */
var Tags = /** @class */ (function () {
    function Tags() {
    }
    /**
     * Adds support for tags on the given object
     * @param obj defines the object to use
     */
    Tags.EnableFor = function (obj) {
        obj._tags = obj._tags || {};
        obj.hasTags = function () {
            return Tags.HasTags(obj);
        };
        obj.addTags = function (tagsString) {
            return Tags.AddTagsTo(obj, tagsString);
        };
        obj.removeTags = function (tagsString) {
            return Tags.RemoveTagsFrom(obj, tagsString);
        };
        obj.matchesTagsQuery = function (tagsQuery) {
            return Tags.MatchesQuery(obj, tagsQuery);
        };
    };
    /**
     * Removes tags support
     * @param obj defines the object to use
     */
    Tags.DisableFor = function (obj) {
        delete obj._tags;
        delete obj.hasTags;
        delete obj.addTags;
        delete obj.removeTags;
        delete obj.matchesTagsQuery;
    };
    /**
     * Gets a boolean indicating if the given object has tags
     * @param obj defines the object to use
     * @returns a boolean
     */
    Tags.HasTags = function (obj) {
        if (!obj._tags) {
            return false;
        }
        var tags = obj._tags;
        for (var i in tags) {
            if (Object.prototype.hasOwnProperty.call(tags, i)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Gets the tags available on a given object
     * @param obj defines the object to use
     * @param asString defines if the tags must be returned as a string instead of an array of strings
     * @returns the tags
     */
    Tags.GetTags = function (obj, asString) {
        if (asString === void 0) { asString = true; }
        if (!obj._tags) {
            return null;
        }
        if (asString) {
            var tagsArray = [];
            for (var tag in obj._tags) {
                if (Object.prototype.hasOwnProperty.call(obj._tags, tag) && obj._tags[tag] === true) {
                    tagsArray.push(tag);
                }
            }
            return tagsArray.join(" ");
        }
        else {
            return obj._tags;
        }
    };
    /**
     * Adds tags to an object
     * @param obj defines the object to use
     * @param tagsString defines the tag string. The tags 'true' and 'false' are reserved and cannot be used as tags.
     * A tag cannot start with '||', '&&', and '!'. It cannot contain whitespaces
     */
    Tags.AddTagsTo = function (obj, tagsString) {
        if (!tagsString) {
            return;
        }
        if (typeof tagsString !== "string") {
            return;
        }
        var tags = tagsString.split(" ");
        tags.forEach(function (tag) {
            Tags._AddTagTo(obj, tag);
        });
    };
    /**
     * @param obj
     * @param tag
     * @hidden
     */
    Tags._AddTagTo = function (obj, tag) {
        tag = tag.trim();
        if (tag === "" || tag === "true" || tag === "false") {
            return;
        }
        if (tag.match(/[\s]/) || tag.match(/^([!]|([|]|[&]){2})/)) {
            return;
        }
        Tags.EnableFor(obj);
        obj._tags[tag] = true;
    };
    /**
     * Removes specific tags from a specific object
     * @param obj defines the object to use
     * @param tagsString defines the tags to remove
     */
    Tags.RemoveTagsFrom = function (obj, tagsString) {
        if (!Tags.HasTags(obj)) {
            return;
        }
        var tags = tagsString.split(" ");
        for (var t in tags) {
            Tags._RemoveTagFrom(obj, tags[t]);
        }
    };
    /**
     * @param obj
     * @param tag
     * @hidden
     */
    Tags._RemoveTagFrom = function (obj, tag) {
        delete obj._tags[tag];
    };
    /**
     * Defines if tags hosted on an object match a given query
     * @param obj defines the object to use
     * @param tagsQuery defines the tag query
     * @returns a boolean
     */
    Tags.MatchesQuery = function (obj, tagsQuery) {
        if (tagsQuery === undefined) {
            return true;
        }
        if (tagsQuery === "") {
            return Tags.HasTags(obj);
        }
        return AndOrNotEvaluator.Eval(tagsQuery, function (r) { return Tags.HasTags(obj) && obj._tags[r]; });
    };
    return Tags;
}());

/* eslint-disable @typescript-eslint/no-unused-vars */
var __decoratorInitialStore = {};
var __mergedStore = {};
var _copySource = function (creationFunction, source, instanciate) {
    var destination = creationFunction();
    // Tags
    if (Tags) {
        Tags.AddTagsTo(destination, source.tags);
    }
    var classStore = getMergedStore(destination);
    // Properties
    for (var property in classStore) {
        var propertyDescriptor = classStore[property];
        var sourceProperty = source[property];
        var propertyType = propertyDescriptor.type;
        if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
            switch (propertyType) {
                case 0: // Value
                case 6: // Mesh reference
                case 11: // Camera reference
                    destination[property] = sourceProperty;
                    break;
                case 1: // Texture
                    destination[property] = instanciate || sourceProperty.isRenderTarget ? sourceProperty : sourceProperty.clone();
                    break;
                case 2: // Color3
                case 3: // FresnelParameters
                case 4: // Vector2
                case 5: // Vector3
                case 7: // Color Curves
                case 10: // Quaternion
                case 12: // Matrix
                    destination[property] = instanciate ? sourceProperty : sourceProperty.clone();
                    break;
            }
        }
    }
    return destination;
};
function getDirectStore(target) {
    var classKey = target.getClassName();
    if (!__decoratorInitialStore[classKey]) {
        __decoratorInitialStore[classKey] = {};
    }
    return __decoratorInitialStore[classKey];
}
/**
 * Return the list of properties flagged as serializable
 * @param target host object
 */
function getMergedStore(target) {
    var classKey = target.getClassName();
    if (__mergedStore[classKey]) {
        return __mergedStore[classKey];
    }
    __mergedStore[classKey] = {};
    var store = __mergedStore[classKey];
    var currentTarget = target;
    var currentKey = classKey;
    while (currentKey) {
        var initialStore = __decoratorInitialStore[currentKey];
        for (var property in initialStore) {
            store[property] = initialStore[property];
        }
        var parent_1 = void 0;
        var done = false;
        do {
            parent_1 = Object.getPrototypeOf(currentTarget);
            if (!parent_1.getClassName) {
                done = true;
                break;
            }
            if (parent_1.getClassName() !== currentKey) {
                break;
            }
            currentTarget = parent_1;
        } while (parent_1);
        if (done) {
            break;
        }
        currentKey = parent_1.getClassName();
        currentTarget = parent_1;
    }
    return store;
}
function generateSerializableMember(type, sourceName) {
    return function (target, propertyKey) {
        var classStore = getDirectStore(target);
        if (!classStore[propertyKey]) {
            classStore[propertyKey] = { type: type, sourceName: sourceName };
        }
    };
}
function generateExpandMember(setCallback, targetKey) {
    if (targetKey === void 0) { targetKey = null; }
    return function (target, propertyKey) {
        var key = targetKey || "_" + propertyKey;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[key];
            },
            set: function (value) {
                // does this object (i.e. vector3) has an equals function? use it!
                // Note - not using "with epsilon" here, it is expected te behave like the internal cache does.
                if (typeof this.equals === "function") {
                    if (this.equals(value)) {
                        return;
                    }
                }
                if (this[key] === value) {
                    return;
                }
                this[key] = value;
                target[setCallback].apply(this);
            },
            enumerable: true,
            configurable: true,
        });
    };
}
function expandToProperty(callback, targetKey) {
    if (targetKey === void 0) { targetKey = null; }
    return generateExpandMember(callback, targetKey);
}
function serialize(sourceName) {
    return generateSerializableMember(0, sourceName); // value member
}
function serializeAsTexture(sourceName) {
    return generateSerializableMember(1, sourceName); // texture member
}
function serializeAsColor3(sourceName) {
    return generateSerializableMember(2, sourceName); // color3 member
}
function serializeAsFresnelParameters(sourceName) {
    return generateSerializableMember(3, sourceName); // fresnel parameters member
}
function serializeAsVector2(sourceName) {
    return generateSerializableMember(4, sourceName); // vector2 member
}
function serializeAsVector3(sourceName) {
    return generateSerializableMember(5, sourceName); // vector3 member
}
function serializeAsMeshReference(sourceName) {
    return generateSerializableMember(6, sourceName); // mesh reference member
}
function serializeAsColorCurves(sourceName) {
    return generateSerializableMember(7, sourceName); // color curves
}
function serializeAsColor4(sourceName) {
    return generateSerializableMember(8, sourceName); // color 4
}
function serializeAsImageProcessingConfiguration(sourceName) {
    return generateSerializableMember(9, sourceName); // image processing
}
function serializeAsQuaternion(sourceName) {
    return generateSerializableMember(10, sourceName); // quaternion member
}
function serializeAsMatrix(sourceName) {
    return generateSerializableMember(12, sourceName); // matrix member
}
/**
 * Class used to help serialization objects
 */
var SerializationHelper = /** @class */ (function () {
    function SerializationHelper() {
    }
    /**
     * Appends the serialized animations from the source animations
     * @param source Source containing the animations
     * @param destination Target to store the animations
     */
    SerializationHelper.AppendSerializedAnimations = function (source, destination) {
        if (source.animations) {
            destination.animations = [];
            for (var animationIndex = 0; animationIndex < source.animations.length; animationIndex++) {
                var animation = source.animations[animationIndex];
                destination.animations.push(animation.serialize());
            }
        }
    };
    /**
     * Static function used to serialized a specific entity
     * @param entity defines the entity to serialize
     * @param serializationObject defines the optional target object where serialization data will be stored
     * @returns a JSON compatible object representing the serialization of the entity
     */
    SerializationHelper.Serialize = function (entity, serializationObject) {
        if (!serializationObject) {
            serializationObject = {};
        }
        // Tags
        if (Tags) {
            serializationObject.tags = Tags.GetTags(entity);
        }
        var serializedProperties = getMergedStore(entity);
        // Properties
        for (var property in serializedProperties) {
            var propertyDescriptor = serializedProperties[property];
            var targetPropertyName = propertyDescriptor.sourceName || property;
            var propertyType = propertyDescriptor.type;
            var sourceProperty = entity[property];
            if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
                switch (propertyType) {
                    case 0: // Value
                        serializationObject[targetPropertyName] = sourceProperty;
                        break;
                    case 1: // Texture
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 2: // Color3
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 3: // FresnelParameters
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 4: // Vector2
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 5: // Vector3
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 6: // Mesh reference
                        serializationObject[targetPropertyName] = sourceProperty.id;
                        break;
                    case 7: // Color Curves
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 8: // Color 4
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 9: // Image Processing
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 10: // Quaternion
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 11: // Camera reference
                        serializationObject[targetPropertyName] = sourceProperty.id;
                        break;
                    case 12: // Matrix
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                }
            }
        }
        return serializationObject;
    };
    /**
     * Creates a new entity from a serialization data object
     * @param creationFunction defines a function used to instanciated the new entity
     * @param source defines the source serialization data
     * @param scene defines the hosting scene
     * @param rootUrl defines the root url for resources
     * @returns a new entity
     */
    SerializationHelper.Parse = function (creationFunction, source, scene, rootUrl) {
        if (rootUrl === void 0) { rootUrl = null; }
        var destination = creationFunction();
        if (!rootUrl) {
            rootUrl = "";
        }
        // Tags
        if (Tags) {
            Tags.AddTagsTo(destination, source.tags);
        }
        var classStore = getMergedStore(destination);
        // Properties
        for (var property in classStore) {
            var propertyDescriptor = classStore[property];
            var sourceProperty = source[propertyDescriptor.sourceName || property];
            var propertyType = propertyDescriptor.type;
            if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
                var dest = destination;
                switch (propertyType) {
                    case 0: // Value
                        dest[property] = sourceProperty;
                        break;
                    case 1: // Texture
                        if (scene) {
                            dest[property] = SerializationHelper._TextureParser(sourceProperty, scene, rootUrl);
                        }
                        break;
                    case 2: // Color3
                        dest[property] = Color3.FromArray(sourceProperty);
                        break;
                    case 3: // FresnelParameters
                        dest[property] = SerializationHelper._FresnelParametersParser(sourceProperty);
                        break;
                    case 4: // Vector2
                        dest[property] = Vector2.FromArray(sourceProperty);
                        break;
                    case 5: // Vector3
                        dest[property] = Vector3.FromArray(sourceProperty);
                        break;
                    case 6: // Mesh reference
                        if (scene) {
                            dest[property] = scene.getLastMeshById(sourceProperty);
                        }
                        break;
                    case 7: // Color Curves
                        dest[property] = SerializationHelper._ColorCurvesParser(sourceProperty);
                        break;
                    case 8: // Color 4
                        dest[property] = Color4.FromArray(sourceProperty);
                        break;
                    case 9: // Image Processing
                        dest[property] = SerializationHelper._ImageProcessingConfigurationParser(sourceProperty);
                        break;
                    case 10: // Quaternion
                        dest[property] = Quaternion.FromArray(sourceProperty);
                        break;
                    case 11: // Camera reference
                        if (scene) {
                            dest[property] = scene.getCameraById(sourceProperty);
                        }
                        break;
                    case 12: // Matrix
                        dest[property] = Matrix.FromArray(sourceProperty);
                        break;
                }
            }
        }
        return destination;
    };
    /**
     * Clones an object
     * @param creationFunction defines the function used to instanciate the new object
     * @param source defines the source object
     * @returns the cloned object
     */
    SerializationHelper.Clone = function (creationFunction, source) {
        return _copySource(creationFunction, source, false);
    };
    /**
     * Instanciates a new object based on a source one (some data will be shared between both object)
     * @param creationFunction defines the function used to instanciate the new object
     * @param source defines the source object
     * @returns the new object
     */
    SerializationHelper.Instanciate = function (creationFunction, source) {
        return _copySource(creationFunction, source, true);
    };
    /**
     * Gets or sets a boolean to indicate if the UniqueId property should be serialized
     */
    SerializationHelper.AllowLoadingUniqueId = false;
    /**
     * @param sourceProperty
     * @hidden
     */
    SerializationHelper._ImageProcessingConfigurationParser = function (sourceProperty) {
        throw _WarnImport("ImageProcessingConfiguration");
    };
    /**
     * @param sourceProperty
     * @hidden
     */
    SerializationHelper._FresnelParametersParser = function (sourceProperty) {
        throw _WarnImport("FresnelParameters");
    };
    /**
     * @param sourceProperty
     * @hidden
     */
    SerializationHelper._ColorCurvesParser = function (sourceProperty) {
        throw _WarnImport("ColorCurves");
    };
    /**
     * @param sourceProperty
     * @param scene
     * @param rootUrl
     * @hidden
     */
    SerializationHelper._TextureParser = function (sourceProperty, scene, rootUrl) {
        throw _WarnImport("Texture");
    };
    return SerializationHelper;
}());
/**
 * Decorator used to redirect a function to a native implementation if available.
 * @param target
 * @param propertyKey
 * @param descriptor
 * @param predicate
 * @hidden
 */
function nativeOverride(target, propertyKey, descriptor, predicate) {
    // Cache the original JS function for later.
    var jsFunc = descriptor.value;
    // Override the JS function to check for a native override on first invocation. Setting descriptor.value overrides the function at the early stage of code being loaded/imported.
    descriptor.value = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        // Assume the resolved function will be the original JS function, then we will check for the Babylon Native context.
        var func = jsFunc;
        // Check if we are executing in a Babylon Native context (e.g. check the presence of the _native global property) and if so also check if a function override is available.
        if (typeof _native !== "undefined" && _native[propertyKey]) {
            var nativeFunc_1 = _native[propertyKey];
            // If a predicate was provided, then we'll need to invoke the predicate on each invocation of the underlying function to determine whether to call the native function or the JS function.
            if (predicate) {
                // The resolved function will execute the predicate and then either execute the native function or the JS function.
                func = function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return (predicate.apply(void 0, params) ? nativeFunc_1.apply(void 0, params) : jsFunc.apply(void 0, params));
                };
            }
            else {
                // The resolved function will directly execute the native function.
                func = nativeFunc_1;
            }
        }
        // Override the JS function again with the final resolved target function.
        target[propertyKey] = func;
        // The JS function has now been overridden based on whether we're executing in the context of Babylon Native, but we still need to invoke that function.
        // Future invocations of the function will just directly invoke the final overridden function, not any of the decorator setup logic above.
        return func.apply(void 0, params);
    };
}
/**
 * Decorator factory that applies the nativeOverride decorator, but determines whether to redirect to the native implementation based on a filter function that evaluates the function arguments.
 * @param predicate
 * @example @nativeOverride.filter((...[arg1]: Parameters<typeof someClass.someMethod>) => arg1.length > 20)
 *          public someMethod(arg1: string, arg2: number): string {
 * @hidden
 */
nativeOverride.filter = function (predicate) {
    return function (target, propertyKey, descriptor) {
        return nativeOverride(target, propertyKey, descriptor, predicate);
    };
};

export { SerializationHelper as S, Tags as T, serializeAsColorCurves as a, serializeAsTexture as b, serializeAsColor4 as c, serializeAsVector3 as d, serializeAsQuaternion as e, serializeAsMeshReference as f, serializeAsColor3 as g, expandToProperty as h, serializeAsVector2 as i, serializeAsImageProcessingConfiguration as j, serializeAsFresnelParameters as k, serializeAsMatrix as l, nativeOverride as n, serialize as s };
