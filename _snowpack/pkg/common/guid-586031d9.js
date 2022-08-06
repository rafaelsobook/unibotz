import { L as Logger } from './logger-bef9f4b6.js';
import { G as GetClass } from './typeStore-e0f83823.js';

/**
 * Class used to enable instantiation of objects by class name
 */
var InstantiationTools = /** @class */ (function () {
    function InstantiationTools() {
    }
    /**
     * Tries to instantiate a new object from a given class name
     * @param className defines the class name to instantiate
     * @returns the new object or null if the system was not able to do the instantiation
     */
    InstantiationTools.Instantiate = function (className) {
        if (this.RegisteredExternalClasses && this.RegisteredExternalClasses[className]) {
            return this.RegisteredExternalClasses[className];
        }
        var internalClass = GetClass(className);
        if (internalClass) {
            return internalClass;
        }
        Logger.Warn(className + " not found, you may have missed an import.");
        var arr = className.split(".");
        var fn = window || this;
        for (var i = 0, len = arr.length; i < len; i++) {
            fn = fn[arr[i]];
        }
        if (typeof fn !== "function") {
            return null;
        }
        return fn;
    };
    /**
     * Use this object to register external classes like custom textures or material
     * to allow the loaders to instantiate them
     */
    InstantiationTools.RegisteredExternalClasses = {};
    return InstantiationTools;
}());

/**
 * Implementation from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
 * Be aware Math.random() could cause collisions, but:
 * "All but 6 of the 128 bits of the ID are randomly generated, which means that for any two ids, there's a 1 in 2^^122 (or 5.3x10^^36) chance they'll collide"
 * @returns a pseudo random id
 */
function RandomGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export { InstantiationTools as I, RandomGUID as R };
