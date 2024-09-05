"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X1 = void 0;
class X1 {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 60) {
            throw new Error('Invalid data format for X1 inverter');
        }
        return {
            'AC Power': 0,
            'PV1 Current': data.data[0],
            'PV2 Current': data.data[1],
            'PV1 Voltage': data.data[2],
            'PV2 Voltage': data.data[3],
            'Output Current': data.data[4],
            'Network Voltage': data.data[5],
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
            'Power Now': data.data[43],
            'Grid Frequency': data.data[50],
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
exports.X1 = X1;
X1.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X1.js.map