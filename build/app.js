"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
class SolaxLocalWifiApp extends homey_1.default.App {
    async onInit() {
        this.log('Solax Local Wifi app is running...');
    }
}
module.exports = SolaxLocalWifiApp;
//# sourceMappingURL=app.js.map