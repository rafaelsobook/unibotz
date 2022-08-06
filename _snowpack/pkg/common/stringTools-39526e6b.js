/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Decodes a buffer into a string
 * @param buffer The buffer to decode
 * @returns The decoded string
 */
var Decode = function (buffer) {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(buffer);
    }
    var result = "";
    for (var i = 0; i < buffer.byteLength; i++) {
        result += String.fromCharCode(buffer[i]);
    }
    return result;
};
/**
 * Encode a buffer to a base64 string
 * @param buffer defines the buffer to encode
 * @returns the encoded string
 */
var EncodeArrayBufferToBase64 = function (buffer) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var bytes = ArrayBuffer.isView(buffer) ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) : new Uint8Array(buffer);
    while (i < bytes.length) {
        chr1 = bytes[i++];
        chr2 = i < bytes.length ? bytes[i++] : Number.NaN;
        chr3 = i < bytes.length ? bytes[i++] : Number.NaN;
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
};
/**
 * Converts a given base64 string as an ASCII encoded stream of data
 * @param base64Data The base64 encoded string to decode
 * @returns Decoded ASCII string
 */
var DecodeBase64ToString = function (base64Data) {
    return atob(base64Data);
};
/**
 * Converts a given base64 string into an ArrayBuffer of raw byte data
 * @param base64Data The base64 encoded string to decode
 * @returns ArrayBuffer of byte data
 */
var DecodeBase64ToBinary = function (base64Data) {
    var decodedString = DecodeBase64ToString(base64Data);
    var bufferLength = decodedString.length;
    var bufferView = new Uint8Array(new ArrayBuffer(bufferLength));
    for (var i = 0; i < bufferLength; i++) {
        bufferView[i] = decodedString.charCodeAt(i);
    }
    return bufferView.buffer;
};

export { DecodeBase64ToBinary as D, EncodeArrayBufferToBase64 as E, DecodeBase64ToString as a, Decode as b };
