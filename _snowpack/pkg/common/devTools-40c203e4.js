/**
 * @param name
 * @hidden
 */
function _WarnImport(name) {
    return "".concat(name, " needs to be imported before as it contains a side-effect required by your code.");
}

export { _WarnImport as _ };
