/**
 * Divides the input value by 10.
 * @param value The value to divide.
 * @returns The result of the division.
 */
export function div10(value: number): number {
    return value / 10;
  }
  
  /**
   * Divides the input value by 100.
   * @param value The value to divide.
   * @returns The result of the division.
   */
  export function div100(value: number): number {
    return value / 100;
  }
  
  /**
   * Packs two 16-bit values into a single 32-bit value.
   * @param high The high 16 bits.
   * @param low The low 16 bits.
   * @returns The packed 32-bit value.
   */
  export function packU16(high: number, low: number): number {
    return (high << 16) | low;
  }
  
  /**
   * Converts an unsigned 16-bit value to a signed 16-bit value.
   * @param value The unsigned value to convert.
   * @returns The signed value.
   */
  export function toSigned(value: number): number {
    if (value > 32767) {
      return value - 65536;
    }
    return value;
  }
  
  /**
   * Divides the input value by 10, preserving the sign.
   * @param value The value to divide.
   * @returns The result of the division.
   */
  export function twowayDiv10(value: number): number {
    return value >= 0 ? value / 10 : -(-value / 10);
  }
  
  /**
   * Divides the input value by 100, preserving the sign.
   * @param value The value to divide.
   * @returns The result of the division.
   */
  export function twowayDiv100(value: number): number {
    return value >= 0 ? value / 100 : -(-value / 100);
  }