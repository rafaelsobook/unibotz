/** @hidden */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _RegisteredTypes = {};
/**
 * @param className
 * @param type
 * @hidden
 */
function RegisterClass(className, type) {
    _RegisteredTypes[className] = type;
}
/**
 * @param fqdn
 * @hidden
 */
function GetClass(fqdn) {
    return _RegisteredTypes[fqdn];
}

export { GetClass as G, RegisterClass as R };
