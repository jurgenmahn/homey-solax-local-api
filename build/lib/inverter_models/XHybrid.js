"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XHybrid = void 0;
class XHybrid {
    static processResponse(data) {
        // Basic validation
        if (!Array.isArray(data.data) || data.data.length < 57) {
            throw new Error('Invalid data format for XHybrid inverter');
        }
        return {
            'AC Power': data.data[6],
            'PV1 Current': data.data[0],
            'PV2 Current': data.data[1],
            'PV1 Voltage': data.data[2],
            'PV2 Voltage': data.data[3],
            'Output Current': data.data[4],
            'Network Voltage': data.data[5],
            'Power Now': data.data[6],
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
            'Battery Remaining Capacity': data.data[17],
            'Month\'s Energy': data.data[19],
            'Grid Exported Energy': data.data[41],
            'Grid Imported Energy': data.data[42],
            'Grid Frequency': data.data[50],
            'EPS Voltage': data.data[53],
            'EPS Current': data.data[54],
            'EPS Power': data.data[55],
            'EPS Frequency': data.data[56],
        };
    }
    static getInverterSerialNumber() {
        // XHybrid doesn't provide a serial number in the response
        return null;
    }
    static build(host, port) {
        // This method would typically set up the connection to the inverter
        // For now, we'll just return a new instance
        console.log(`Creating XHybrid instance for ${host}:${port}`);
        return new XHybrid();
    }
    static buildAllVariants(host, port) {
        // For XHybrid, we only have one variant
        return [this.build(host, port)];
    }
}
exports.XHybrid = XHybrid;
XHybrid.schema = {
// We'll implement a proper schema validation later if needed
};
//# sourceMappingURL=XHybrid.js.map