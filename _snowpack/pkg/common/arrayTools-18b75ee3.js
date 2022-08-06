/**
 * Constant used to convert a value to gamma space
 * @ignorenaming
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var ToGammaSpace = 1 / 2.2;
/**
 * Constant used to convert a value to linear space
 * @ignorenaming
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var ToLinearSpace = 2.2;
/**
 * Constant used to define the minimal number value in Babylon.js
 * @ignorenaming
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var Epsilon = 0.001;

/**
 * Class containing a set of static utilities functions for arrays.
 */
var ArrayTools = /** @class */ (function () {
    function ArrayTools() {
    }
    /**
     * Returns an array of the given size filled with elements built from the given constructor and the parameters.
     * @param size the number of element to construct and put in the array.
     * @param itemBuilder a callback responsible for creating new instance of item. Called once per array entry.
     * @returns a new array filled with new objects.
     */
    ArrayTools.BuildArray = function (size, itemBuilder) {
        var a = [];
        for (var i = 0; i < size; ++i) {
            a.push(itemBuilder());
        }
        return a;
    };
    /**
     * Returns a tuple of the given size filled with elements built from the given constructor and the parameters.
     * @param size he number of element to construct and put in the tuple.
     * @param itemBuilder a callback responsible for creating new instance of item. Called once per tuple entry.
     * @returns a new tuple filled with new objects.
     */
    ArrayTools.BuildTuple = function (size, itemBuilder) {
        return ArrayTools.BuildArray(size, itemBuilder);
    };
    return ArrayTools;
}());

export { ArrayTools as A, Epsilon as E, ToLinearSpace as T, ToGammaSpace as a };
