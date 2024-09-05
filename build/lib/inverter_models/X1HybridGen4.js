"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X1HybridGen4 = void 0;
const utils_1 = require("../utils");
class X1HybridGen4 {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 38) {
            throw new Error('Invalid data format for X1HybridGen4 inverter');
        }
        return {
            'AC Power': data.data[2],
            'AC voltage R': (0, utils_1.div10)(data.data[0]),
            'AC current': (0, utils_1.div10)(data.data[1]),
            'AC power': (0, utils_1.toSigned)(data.data[2]),
            'Grid frequency': (0, utils_1.div100)(data.data[3]),
            'PV1 voltage': (0, utils_1.div10)(data.data[4]),
            'PV2 voltage': (0, utils_1.div10)(data.data[5]),
            'PV1 current': (0, utils_1.div10)(data.data[6]),
            'PV2 current': (0, utils_1.div10)(data.data[7]),
            'PV1 power': data.data[8],
            'PV2 power': data.data[9],
            'On-grid total yield': (0, utils_1.div10)((0, utils_1.packU16)(data.data[11], data.data[12])),
            'On-grid daily yield': (0, utils_1.div10)(data.data[13]),
            'Battery voltage': (0, utils_1.div100)(data.data[14]),
            'Battery current': (0, utils_1.div100)(data.data[15]),
            'Battery power': data.data[16],
            'Battery temperature': data.data[17],
            'Battery SoC': data.data[18],
            'Inverter Temperature': data.data[26],
            'Grid power': (0, utils_1.toSigned)(data.data[32]),
            'Total feed-in energy': (0, utils_1.div100)((0, utils_1.packU16)(data.data[34], data.data[35])),
            'Total consumption': (0, utils_1.div100)((0, utils_1.packU16)(data.data[36], data.data[37])),
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[2] ? response.information[2] : null;
    }
}
exports.X1HybridGen4 = X1HybridGen4;
X1HybridGen4.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X1HybridGen4.js.map