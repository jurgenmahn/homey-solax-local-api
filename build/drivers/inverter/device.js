"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = require("homey");
const SolaxInverter_1 = require("../../lib/SolaxInverter");
class SolaxInverterDevice extends homey_1.Device {
    constructor() {
        super(...arguments);
        this.inverter = null;
    }
    async onInit() {
        this.log('SolaxInverterDevice has been initialized');
        const settings = this.getSettings();
        const inverterType = settings.inverterType || 'X3'; // Default to X3 if not specified
        try {
            this.inverter = new SolaxInverter_1.SolaxInverter(inverterType);
            // Set up your capabilities and listeners here
            this.registerCapabilityListener('measure_power', this.onCapabilityMeasurePower.bind(this));
            this.pollDevice();
        }
        catch (error) {
            this.error('Failed to initialize SolaxInverter:', error);
        }
    }
    async onCapabilityMeasurePower(value) {
        this.log('Received measure_power capability:', value);
        // Handle the capability
    }
    async pollDevice() {
        try {
            if (this.inverter) {
                const data = await this.inverter.getData();
                // Update your capabilities here based on the data
                await this.setCapabilityValue('measure_power', data['AC Power']);
            }
        }
        catch (error) {
            this.error('Error polling device:', error);
        }
        // Schedule the next poll
        this.homey.setTimeout(() => this.pollDevice(), 60000); // Poll every minute
    }
}
module.exports = SolaxInverterDevice;
//# sourceMappingURL=device.js.map