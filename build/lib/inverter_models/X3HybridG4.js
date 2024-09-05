"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X3HybridG4 = void 0;
const utils_1 = require("../utils");
class X3HybridG4 {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 170) {
            throw new Error('Invalid data format for X3HybridG4 inverter');
        }
        return {
            'AC Power': data.data[6],
            'Grid 1 Voltage': (0, utils_1.div10)(data.data[0]),
            'Grid 2 Voltage': (0, utils_1.div10)(data.data[1]),
            'Grid 3 Voltage': (0, utils_1.div10)(data.data[2]),
            'Grid 1 Current': (0, utils_1.div10)(data.data[3]),
            'Grid 2 Current': (0, utils_1.div10)(data.data[4]),
            'Grid 3 Current': (0, utils_1.div10)(data.data[5]),
            'Inverter Temperature': data.data[7],
            'Today\'s Energy': (0, utils_1.div10)(data.data[8]),
            'Total Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[9], data.data[10])),
            'Exported Power': data.data[10],
            'PV1 Power': data.data[11],
            'PV2 Power': data.data[12],
            'Battery Voltage': (0, utils_1.div100)(data.data[13]),
            'Battery Current': (0, utils_1.div100)(data.data[14]),
            'Battery Power': data.data[15],
            'Battery Temperature': (0, utils_1.toSigned)(data.data[16]),
            'Battery Remaining Capacity': data.data[103],
            'Battery Remaining Energy': (0, utils_1.div10)(data.data[106]),
            'Battery mode': data.data[168],
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[2] ? response.information[2] : null;
    }
    static getBatteryModeText(mode) {
        return this.decodeBatteryMode(mode);
    }
    static decodeBatteryMode(mode) {
        // Implement the logic to decode the battery mode
        const modes = {
            0: "Self Use Mode",
            1: "Force Time Use",
            2: "Back Up Mode",
            3: "Feed-in Priority",
        };
        return modes[mode] || `Unknown mode: ${mode}`;
    }
}
exports.X3HybridG4 = X3HybridG4;
X3HybridG4.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X3HybridG4.js.map