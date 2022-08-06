/** @hidden */
var PerformanceConfigurator = /** @class */ (function () {
    function PerformanceConfigurator() {
    }
    /**
     * @param use64bits
     * @hidden
     */
    PerformanceConfigurator.SetMatrixPrecision = function (use64bits) {
        PerformanceConfigurator.MatrixTrackPrecisionChange = false;
        if (use64bits && !PerformanceConfigurator.MatrixUse64Bits) {
            if (PerformanceConfigurator.MatrixTrackedMatrices) {
                for (var m = 0; m < PerformanceConfigurator.MatrixTrackedMatrices.length; ++m) {
                    var matrix = PerformanceConfigurator.MatrixTrackedMatrices[m];
                    var values = matrix._m;
                    matrix._m = new Array(16);
                    for (var i = 0; i < 16; ++i) {
                        matrix._m[i] = values[i];
                    }
                }
            }
        }
        PerformanceConfigurator.MatrixUse64Bits = use64bits;
        PerformanceConfigurator.MatrixCurrentType = PerformanceConfigurator.MatrixUse64Bits ? Array : Float32Array;
        PerformanceConfigurator.MatrixTrackedMatrices = null; // reclaim some memory, as we don't need _TrackedMatrices anymore
    };
    /** @hidden */
    PerformanceConfigurator.MatrixUse64Bits = false;
    /** @hidden */
    PerformanceConfigurator.MatrixTrackPrecisionChange = true;
    /** @hidden */
    PerformanceConfigurator.MatrixCurrentType = Float32Array;
    /** @hidden */
    PerformanceConfigurator.MatrixTrackedMatrices = [];
    return PerformanceConfigurator;
}());

/**
 * The engine store class is responsible to hold all the instances of Engine and Scene created
 * during the life time of the application.
 */
var EngineStore = /** @class */ (function () {
    function EngineStore() {
    }
    Object.defineProperty(EngineStore, "LastCreatedEngine", {
        /**
         * Gets the latest created engine
         */
        get: function () {
            if (this.Instances.length === 0) {
                return null;
            }
            return this.Instances[this.Instances.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineStore, "LastCreatedScene", {
        /**
         * Gets the latest created scene
         */
        get: function () {
            return this._LastCreatedScene;
        },
        enumerable: false,
        configurable: true
    });
    /** Gets the list of created engines */
    EngineStore.Instances = new Array();
    /** @hidden */
    EngineStore._LastCreatedScene = null;
    /**
     * Gets or sets a global variable indicating if fallback texture must be used when a texture cannot be loaded
     * @ignorenaming
     */
    EngineStore.UseFallbackTexture = true;
    /**
     * Texture content used if a texture cannot loaded
     * @ignorenaming
     */
    EngineStore.FallbackTexture = "";
    return EngineStore;
}());

export { EngineStore as E, PerformanceConfigurator as P };
