"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
//import { SolaxInverter } from '../../lib/SolaxInverter';
class SolaxInverterDriver extends homey_1.default.Driver {
    async onInit() {
        this.log('Solax Inverter driver initialized');
    }
    async onPairListDevices() {
        // Implement device discovery logic here
        // This is a placeholder and should be replaced with actual discovery logic
        return [
            {
                name: 'Solax Inverter',
                data: {
                    id: 'solax-1',
                },
                settings: {
                    ip: '192.168.113.2',
                    port: 888,
                    password: '',
                },
            },
        ];
    }
}
module.exports = SolaxInverterDriver;
//# sourceMappingURL=driver.js.map