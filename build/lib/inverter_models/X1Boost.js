"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X1Boost = void 0;
const utils_1 = require("../utils");
class X1Boost {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 54) {
            throw new Error('Invalid data format for X1Boost inverter');
        }
        return {
            'AC Power': data.data[2],
            'AC Voltage': (0, utils_1.div10)(data.data[0]),
            'AC Output Current': (0, utils_1.div10)(data.data[1]),
            'AC Output Power': data.data[2],
            'PV1 Voltage': (0, utils_1.div10)(data.data[3]),
            'PV2 Voltage': (0, utils_1.div10)(data.data[4]),
            'PV1 Current': (0, utils_1.div10)(data.data[5]),
            'PV2 Current': (0, utils_1.div10)(data.data[6]),
            'PV1 Power': data.data[7],
            'PV2 Power': data.data[8],
            'AC Frequency': (0, utils_1.div100)(data.data[9]),
            'Total Generated Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[11], data.data[12])),
            'Today\'s Generated Energy': (0, utils_1.div10)(data.data[13]),
            'Inverter Temperature': data.data[39],
            'Exported Power': (0, utils_1.toSigned)(data.data[48]),
            'Total Export Energy': (0, utils_1.div100)((0, utils_1.packU16)(data.data[50], data.data[51])),
            'Total Import Energy': (0, utils_1.div100)((0, utils_1.packU16)(data.data[52], data.data[53])),
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[2] ? response.information[2] : null;
    }
}
exports.X1Boost = X1Boost;
X1Boost.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X1Boost.js.map