import { a as __extends } from './tslib.es6-2542203d.js';
import { a as Vector2 } from './math.vector-92740b4e.js';

/**
 * Gather the list of pointer event types as constants.
 */
var PointerEventTypes = /** @class */ (function () {
    function PointerEventTypes() {
    }
    /**
     * The pointerdown event is fired when a pointer becomes active. For mouse, it is fired when the device transitions from no buttons depressed to at least one button depressed. For touch, it is fired when physical contact is made with the digitizer. For pen, it is fired when the stylus makes physical contact with the digitizer.
     */
    PointerEventTypes.POINTERDOWN = 0x01;
    /**
     * The pointerup event is fired when a pointer is no longer active.
     */
    PointerEventTypes.POINTERUP = 0x02;
    /**
     * The pointermove event is fired when a pointer changes coordinates.
     */
    PointerEventTypes.POINTERMOVE = 0x04;
    /**
     * The pointerwheel event is fired when a mouse wheel has been rotated.
     */
    PointerEventTypes.POINTERWHEEL = 0x08;
    /**
     * The pointerpick event is fired when a mesh or sprite has been picked by the pointer.
     */
    PointerEventTypes.POINTERPICK = 0x10;
    /**
     * The pointertap event is fired when a the object has been touched and released without drag.
     */
    PointerEventTypes.POINTERTAP = 0x20;
    /**
     * The pointerdoubletap event is fired when a the object has been touched and released twice without drag.
     */
    PointerEventTypes.POINTERDOUBLETAP = 0x40;
    return PointerEventTypes;
}());
/**
 * Base class of pointer info types.
 */
var PointerInfoBase = /** @class */ (function () {
    /**
     * Instantiates the base class of pointers info.
     * @param type Defines the type of event (PointerEventTypes)
     * @param event Defines the related dom event
     */
    function PointerInfoBase(
    /**
     * Defines the type of event (PointerEventTypes)
     */
    type, 
    /**
     * Defines the related dom event
     */
    event) {
        this.type = type;
        this.event = event;
    }
    return PointerInfoBase;
}());
/**
 * This class is used to store pointer related info for the onPrePointerObservable event.
 * Set the skipOnPointerObservable property to true if you want the engine to stop any process after this event is triggered, even not calling onPointerObservable
 */
var PointerInfoPre = /** @class */ (function (_super) {
    __extends(PointerInfoPre, _super);
    /**
     * Instantiates a PointerInfoPre to store pointer related info to the onPrePointerObservable event.
     * @param type Defines the type of event (PointerEventTypes)
     * @param event Defines the related dom event
     * @param localX Defines the local x coordinates of the pointer when the event occured
     * @param localY Defines the local y coordinates of the pointer when the event occured
     */
    function PointerInfoPre(type, event, localX, localY) {
        var _this = _super.call(this, type, event) || this;
        /**
         * Ray from a pointer if available (eg. 6dof controller)
         */
        _this.ray = null;
        _this.skipOnPointerObservable = false;
        _this.localPosition = new Vector2(localX, localY);
        return _this;
    }
    return PointerInfoPre;
}(PointerInfoBase));
/**
 * This type contains all the data related to a pointer event in Babylon.js.
 * The event member is an instance of PointerEvent for all types except PointerWheel and is of type MouseWheelEvent when type equals PointerWheel. The different event types can be found in the PointerEventTypes class.
 */
var PointerInfo = /** @class */ (function (_super) {
    __extends(PointerInfo, _super);
    /**
     * Instantiates a PointerInfo to store pointer related info to the onPointerObservable event.
     * @param type Defines the type of event (PointerEventTypes)
     * @param event Defines the related dom event
     * @param pickInfo Defines the picking info associated to the info (if any)\
     */
    function PointerInfo(type, event, 
    /**
     * Defines the picking info associated to the info (if any)\
     */
    pickInfo) {
        var _this = _super.call(this, type, event) || this;
        _this.pickInfo = pickInfo;
        return _this;
    }
    return PointerInfo;
}(PointerInfoBase));

/**
 * Gather the list of keyboard event types as constants.
 */
var KeyboardEventTypes = /** @class */ (function () {
    function KeyboardEventTypes() {
    }
    /**
     * The keydown event is fired when a key becomes active (pressed).
     */
    KeyboardEventTypes.KEYDOWN = 0x01;
    /**
     * The keyup event is fired when a key has been released.
     */
    KeyboardEventTypes.KEYUP = 0x02;
    return KeyboardEventTypes;
}());
/**
 * This class is used to store keyboard related info for the onKeyboardObservable event.
 */
var KeyboardInfo = /** @class */ (function () {
    /**
     * Instantiates a new keyboard info.
     * This class is used to store keyboard related info for the onKeyboardObservable event.
     * @param type Defines the type of event (KeyboardEventTypes)
     * @param event Defines the related dom event
     */
    function KeyboardInfo(
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type, 
    /**
     * Defines the related dom event
     */
    event) {
        this.type = type;
        this.event = event;
    }
    return KeyboardInfo;
}());
/**
 * This class is used to store keyboard related info for the onPreKeyboardObservable event.
 * Set the skipOnKeyboardObservable property to true if you want the engine to stop any process after this event is triggered, even not calling onKeyboardObservable
 */
var KeyboardInfoPre = /** @class */ (function (_super) {
    __extends(KeyboardInfoPre, _super);
    /**
     * Instantiates a new keyboard pre info.
     * This class is used to store keyboard related info for the onPreKeyboardObservable event.
     * @param type Defines the type of event (KeyboardEventTypes)
     * @param event Defines the related dom event
     */
    function KeyboardInfoPre(
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type, 
    /**
     * Defines the related dom event
     */
    event) {
        var _this = _super.call(this, type, event) || this;
        _this.type = type;
        _this.event = event;
        _this.skipOnKeyboardObservable = false;
        return _this;
    }
    Object.defineProperty(KeyboardInfoPre.prototype, "skipOnPointerObservable", {
        /**
         * Defines whether the engine should skip the next onKeyboardObservable associated to this pre.
         * @deprecated use skipOnKeyboardObservable property instead
         */
        get: function () {
            return this.skipOnKeyboardObservable;
        },
        set: function (value) {
            this.skipOnKeyboardObservable = value;
        },
        enumerable: false,
        configurable: true
    });
    return KeyboardInfoPre;
}(KeyboardInfo));

/**
 * Event Types
 */
var DeviceInputEventType;
(function (DeviceInputEventType) {
    // Pointers
    /** PointerMove */
    DeviceInputEventType[DeviceInputEventType["PointerMove"] = 0] = "PointerMove";
    /** PointerDown */
    DeviceInputEventType[DeviceInputEventType["PointerDown"] = 1] = "PointerDown";
    /** PointerUp */
    DeviceInputEventType[DeviceInputEventType["PointerUp"] = 2] = "PointerUp";
})(DeviceInputEventType || (DeviceInputEventType = {}));
/**
 * Constants used for Events
 */
var EventConstants = /** @class */ (function () {
    function EventConstants() {
    }
    /**
     * Pixel delta for Wheel Events (Default)
     */
    EventConstants.DOM_DELTA_PIXEL = 0x00;
    /**
     * Line delta for Wheel Events
     */
    EventConstants.DOM_DELTA_LINE = 0x01;
    /**
     * Page delta for Wheel Events
     */
    EventConstants.DOM_DELTA_PAGE = 0x02;
    return EventConstants;
}());

export { EventConstants as E, KeyboardInfoPre as K, PointerEventTypes as P, PointerInfo as a, PointerInfoPre as b, KeyboardInfo as c, KeyboardEventTypes as d };
