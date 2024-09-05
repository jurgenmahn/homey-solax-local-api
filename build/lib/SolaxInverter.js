"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolaxInverter = void 0;
const X1_1 = require("./inverter_models/X1");
const X3_1 = require("./inverter_models/X3");
const X3HybridG4_1 = require("./inverter_models/X3HybridG4");
class SolaxInverter {
    constructor(inverterType) {
        switch (inverterType) {
            case 'X1':
                this.inverterModel = X1_1.X1;
                break;
            case 'X3':
                this.inverterModel = X3_1.X3;
                break;
            case 'X3HybridG4':
                this.inverterModel = X3HybridG4_1.X3HybridG4;
                break;
            default:
                throw new Error(`Unsupported inverter type: ${inverterType}`);
        }
    }
    async getData() {
        // Implement the logic to fetch data from the inverter
        const rawData = await this.fetchDataFromInverter();
        return this.inverterModel.processResponse(rawData);
    }
    async fetchDataFromInverter() {
        // Implement the logic to fetch raw data from the inverter
        return { data: [] };
    }
}
exports.SolaxInverter = SolaxInverter;
//# sourceMappingURL=SolaxInverter.js.map