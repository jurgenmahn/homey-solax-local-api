"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X1MiniV34 = void 0;
const utils_1 = require("../utils");
class X1MiniV34 {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 63) {
            throw new Error('Invalid data format for X1MiniV34 inverter');
        }
        return {
            'Network Voltage': (0, utils_1.div10)(data.data[0]),
            'Output Current': (0, utils_1.div10)(data.data[1]),
            'AC Power': data.data[2],
            'PV1 Voltage': (0, utils_1.div10)(data.data[3]),
            'PV2 Voltage': (0, utils_1.div10)(data.data[4]),
            'PV1 Current': (0, utils_1.div10)(data.data[5]),
            'PV2 Current': (0, utils_1.div10)(data.data[6]),
            'PV1 Power': data.data[7],
            'PV2 Power': data.data[8],
            'Grid Frequency': (0, utils_1.div100)(data.data[9]),
            'Total Energy': (0, utils_1.div10)(data.data[11]),
            'Today\'s Energy': (0, utils_1.div10)(data.data[13]),
            'Total Feed-in Energy': (0, utils_1.div10)(data.data[41]),
            'Total Consumption': (0, utils_1.div10)(data.data[42]),
            'Power Now': (0, utils_1.div10)(data.data[43]),
            'Inverter Temperature': data.data[55],
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[2] ? response.information[2] : null;
    }
}
exports.X1MiniV34 = X1MiniV34;
X1MiniV34.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X1MiniV34.js.map