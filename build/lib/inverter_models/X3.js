"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X3 = void 0;
class X3 {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 107) {
            throw new Error('Invalid data format for X3 inverter');
        }
        return {
            'PV1 Current': data.data[0],
            'PV2 Current': data.data[1],
            'PV1 Voltage': data.data[2],
            'PV2 Voltage': data.data[3],
            'Output Current Phase 1': data.data[4],
            'Network Voltage Phase 1': data.data[5],
            'AC Power': data.data[6],
            'Inverter Temperature': data.data[7],
            'Today\'s Energy': data.data[8],
            'Total Energy': data.data[9],
            'Exported Power': data.data[10],
            'PV1 Power': data.data[11],
            'PV2 Power': data.data[12],
            'Battery Voltage': data.data[13],
            'Battery Current': data.data[14],
            'Battery Power': data.data[15],
            'Battery Temperature': data.data[16],
            'Battery Remaining Capacity': data.data[21],
            'Total Feed-in Energy': data.data[41],
            'Total Consumption': data.data[42],
            'Power Now Phase 1': data.data[43],
            'Power Now Phase 2': data.data[44],
            'Power Now Phase 3': data.data[45],
            'Output Current Phase 2': data.data[46],
            'Output Current Phase 3': data.data[47],
            'Network Voltage Phase 2': data.data[48],
            'Network Voltage Phase 3': data.data[49],
            'Grid Frequency Phase 1': data.data[50],
            'Grid Frequency Phase 2': data.data[51],
            'Grid Frequency Phase 3': data.data[52],
            'EPS Voltage': data.data[53],
            'EPS Current': data.data[54],
            'EPS Power': data.data[55],
            'EPS Frequency': data.data[56],
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[3] ? response.information[3] : null;
    }
}
exports.X3 = X3;
X3.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X3.js.map