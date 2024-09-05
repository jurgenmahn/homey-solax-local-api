"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X1Mini = void 0;
class X1Mini {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 51) {
            throw new Error('Invalid data format for X1Mini inverter');
        }
        return {
            'PV1 Current': data.data[0],
            'PV2 Current': data.data[1],
            'PV1 Voltage': data.data[2],
            'PV2 Voltage': data.data[3],
            'Output Current': data.data[4],
            'Network Voltage': data.data[5],
            'AC Power': data.data[6],
            'Inverter Temperature': data.data[7],
            'Today\'s Energy': data.data[8],
            'Total Energy': data.data[9],
            'Exported Power': data.data[10],
            'PV1 Power': data.data[11],
            'PV2 Power': data.data[12],
            'Total Feed-in Energy': data.data[41],
            'Total Consumption': data.data[42],
            'Power Now': data.data[43],
            'Grid Frequency': data.data[50],
        };
    }
    static getInverterSerialNumber(response) {
        return response.information && response.information[3] ? response.information[3] : null;
    }
}
exports.X1Mini = X1Mini;
X1Mini.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=X1Mini.js.map