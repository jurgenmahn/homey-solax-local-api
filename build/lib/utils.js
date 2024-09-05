"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twowayDiv100 = exports.twowayDiv10 = exports.toSigned = exports.packU16 = exports.div100 = exports.div10 = void 0;
/**
 * Divides the input value by 10.
 * @param value The value to divide.
 * @returns The result of the division.
 */
function div10(value) {
    return value / 10;
}
exports.div10 = div10;
/**
 * Divides the input value by 100.
 * @param value The value to divide.
 * @returns The result of the division.
 */
function div100(value) {
    return value / 100;
}
exports.div100 = div100;
/**
 * Packs two 16-bit values into a single 32-bit value.
 * @param high The high 16 bits.
 * @param low The low 16 bits.
 * @returns The packed 32-bit value.
 */
function packU16(high, low) {
    return (high << 16) | low;
}
exports.packU16 = packU16;
/**
 * Converts an unsigned 16-bit value to a signed 16-bit value.
 * @param value The unsigned value to convert.
 * @returns The signed value.
 */
function toSigned(value) {
    if (value > 32767) {
        return value - 65536;
    }
    return value;
}
exports.toSigned = toSigned;
/**
 * Divides the input value by 10, preserving the sign.
 * @param value The value to divide.
 * @returns The result of the division.
 */
function twowayDiv10(value) {
    return value >= 0 ? value / 10 : -(-value / 10);
}
exports.twowayDiv10 = twowayDiv10;
/**
 * Divides the input value by 100, preserving the sign.
 * @param value The value to divide.
 * @returns The result of the division.
 */
function twowayDiv100(value) {
    return value >= 0 ? value / 100 : -(-value / 100);
}
exports.twowayDiv100 = twowayDiv100;
//# sourceMappingURL=utils.js.map