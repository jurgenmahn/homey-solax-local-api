"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QVOLTHYBG33P = void 0;
const utils_1 = require("../utils");
class QVOLTHYBG33P {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 170) {
            throw new Error('Invalid data format for QVOLTHYBG33P inverter');
        }
        return {
            'Network Voltage Phase 1': (0, utils_1.div10)(data.data[0]),
            'Network Voltage Phase 2': (0, utils_1.div10)(data.data[1]),
            'Network Voltage Phase 3': (0, utils_1.div10)(data.data[2]),
            'Output Current Phase 1': (0, utils_1.twowayDiv10)(data.data[3]),
            'Output Current Phase 2': (0, utils_1.twowayDiv10)(data.data[4]),
            'Output Current Phase 3': (0, utils_1.twowayDiv10)(data.data[5]),
            'Power Now Phase 1': (0, utils_1.toSigned)(data.data[6]),
            'Power Now Phase 2': (0, utils_1.toSigned)(data.data[7]),
            'Power Now Phase 3': (0, utils_1.toSigned)(data.data[8]),
            'AC Power': (0, utils_1.toSigned)(data.data[9]),
            'PV1 Voltage': (0, utils_1.div10)(data.data[10]),
            'PV2 Voltage': (0, utils_1.div10)(data.data[11]),
            'PV1 Current': (0, utils_1.div10)(data.data[12]),
            'PV2 Current': (0, utils_1.div10)(data.data[13]),
            'PV1 Power': data.data[14],
            'PV2 Power': data.data[15],
            'Grid Frequency Phase 1': (0, utils_1.div100)(data.data[16]),
            'Grid Frequency Phase 2': (0, utils_1.div100)(data.data[17]),
            'Grid Frequency Phase 3': (0, utils_1.div100)(data.data[18]),
            'Inverter Operation mode': data.data[19],
            'Exported Power': (0, utils_1.toSigned)(data.data[34]),
            'Battery Voltage': (0, utils_1.div100)(data.data[39]),
            'Battery Current': (0, utils_1.twowayDiv100)(data.data[40]),
            'Battery Power': (0, utils_1.toSigned)(data.data[41]),
            'Power Now': (0, utils_1.toSigned)(data.data[47]),
            'Total Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[68], data.data[69])),
            'Total Battery Discharge Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[74], data.data[75])),
            'Total Battery Charge Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[76], data.data[77])),
            'Today\'s Battery Discharge Energy': (0, utils_1.div10)(data.data[78]),
            'Today\'s Battery Charge Energy': (0, utils_1.div10)(data.data[79]),
            'Total PV Energy': (0, utils_1.div10)((0, utils_1.packU16)(data.data[80], data.data[81])),
            'Today\'s Energy': (0, utils_1.div10)(data.data[82]),
            'Total Feed-in Energy': (0, utils_1.div100)((0, utils_1.packU16)(data.data[86], data.data[87])),
            'Total Consumption': (0, utils_1.div100)((0, utils_1.packU16)(data.data[88], data.data[89])),
            'Today\'s Feed-in Energy': (0, utils_1.div100)(data.data[90]),
            'Today\'s Consumption': (0, utils_1.div100)(data.data[92]),
            'Battery Remaining Capacity': data.data[103],
            'Battery Temperature': data.data[105],
            'Battery Remaining Energy': (0, utils_1.div10)(data.data[106]),
            'Battery Operation mode': data.data[168], // Store as number
        };
    }
    static getInverterModeText(mode) {
        return this.inverterModes(mode);
    }
    static getBatteryModeText(mode) {
        return this.batteryModes(mode);
    }
    static inverterModes(value) {
        const modes = {
            0: "Waiting",
            1: "Checking",
            2: "Normal",
            3: "Off",
            4: "Permanent Fault",
            5: "Updating",
            6: "EPS Check",
            7: "EPS Mode",
            8: "Self Test",
            9: "Idle",
            10: "Standby",
        };
        return modes[value] || `unmapped value '${value}'`;
    }
    static batteryModes(value) {
        const modes = {
            0: "Self Use Mode",
            1: "Force Time Use",
            2: "Back Up Mode",
            3: "Feed-in Priority",
        };
        return modes[value] || `unmapped value '${value}'`;
    }
}
exports.QVOLTHYBG33P = QVOLTHYBG33P;
QVOLTHYBG33P.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=QVOLTHYBG33P.js.map