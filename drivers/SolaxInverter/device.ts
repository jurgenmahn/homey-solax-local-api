import { Device } from 'homey';
import { SolaxInverter } from '../../lib/SolaxInverter';
import { InverterModel } from '../../lib/inverterModels';

interface InverterData {
  [key: string]: {
    value: number;
    unit: string;
  };
}

class SolaxInverterDevice extends Device {
  private inverter: SolaxInverter | null = null;
  private pollInterval: number = 60000; // 1 minute

  /**
   * Initialize the device
   */
  async onInit() {
    this.log('SolaxInverterDevice has been initialized');

    const settings = this.getSettings();
    this.log('Loaded settings:', settings);

    if (!settings.hasOwnProperty('inverterType')) {
      this.log('Pairing settings not saved yet, aborting init');
      return;
    }

    this.log('Settings found, initializing device');

    this.inverter = new SolaxInverter(
      settings.inverterType as InverterModel,
      settings.ip,
      settings.port,
      settings.password,
      settings.requestType
    );

    // Initialize capabilities
    await this.initializeCapabilities();

    // Start polling for data
    this.poll();
  }

  /**
   * Clean up when device is deleted
   */
  async onDeleted() {
    // Clean up polling when device is deleted
    this.inverter = null;
  }

  /**
   * Initialize device capabilities based on inverter data
   */
  async initializeCapabilities() {
    if (!this.inverter) throw new Error('Inverter not initialized');

    try {

      const data = await this.inverter.getData();
      if (!data || !data.data) throw new Error('No data received from inverter');

      const capabilities = this.getCapabilities();
      const inverterData = data.data as InverterData;

      let capabilitiesFound: string[] = [];

      for (const [key, value] of Object.entries(inverterData)) {
        capabilitiesFound.push(this.getCapabilityName(key)[0]);
      }

      // Remove obsolete capabilities
      for (const capability of capabilities) {
        if (!capabilitiesFound.includes(capability)) {
          await this.removeCapability(capability);
          this.log(`Removed capability: ${capability}`);
        } else {
          this.log(`Kept capability: ${capability}`);
        }
      }

      // Add new capabilities and set up listeners
      for (const [key, value] of Object.entries(inverterData)) {
        const capabilityName = this.getCapabilityName(key)[0];
 
        if (!capabilities.includes(capabilityName)) {

          await this.addCapability(capabilityName);
          this.log(`Added capability: ${capabilityName}`);
          capabilitiesFound.push(capabilityName);

          // Set the units and options for the capability
          await this.setCapabilityOptions(capabilityName, {
            units: value.unit,
            insights: true,
            visible: true,
            getable: true,
            uiComponent: "sensor",
            title: { en: this.getCapabilityName(key)[1] }
          });
          this.log(`Set options for ${capabilityName}`);

        } else {
          // Set the units and options for the capability
          await this.setCapabilityOptions(capabilityName, {
            units: value.unit,
            insights: true,
            visible: true,
            getable: true,
            uiComponent: "sensor",
            title: { en: this.getCapabilityName(key)[1] }
          });
          this.log(`Updated options for ${capabilityName}`);

        }

        this.registerCapabilityListener(capabilityName, async () => {
          const value = await this.onCapabilityRequest(key);
          await this.setCapabilityValue(capabilityName, value);
        });
      }

      this.log('Capabilities initialized');
    } catch (error) {
      this.error('Error initializing capabilities:', error);
    }
  }


  /**
   * Map inverter data keys to Homey capability names
   * @param key The inverter data key
   * @returns The corresponding Homey capability name
   */
  getCapabilityName(key: string): [string, string] {
    // Convert to snake_case
    const snakeCase = key.replace(/([A-Z])/g, '_$1').toLowerCase();

    // Map specific keys to Homey capability names and user-friendly names
    const capabilityMap: { [key: string]: [string, string] } = {
      // Voltage measurements
      'network_voltage': ['measure_voltage', 'Network Voltage'],
      'pv1_voltage': ['measure_voltage.pv1', 'PV1 Voltage'],
      'pv2_voltage': ['measure_voltage.pv2', 'PV2 Voltage'],
      'pv3_voltage': ['measure_voltage.pv3', 'PV3 Voltage'],
      'battery_voltage': ['measure_voltage.battery', 'Battery Voltage'],
      'eps_voltage': ['measure_voltage.eps', 'EPS Voltage'],

      // Current measurements
      'output_current': ['measure_current', 'Output Current'],
      'pv1_current': ['measure_current.pv1', 'PV1 Current'],
      'pv2_current': ['measure_current.pv2', 'PV2 Current'],
      'pv3_current': ['measure_current.pv3', 'PV3 Current'],
      'battery_current': ['measure_current.battery', 'Battery Current'],
      'eps_current': ['measure_current.eps', 'EPS Current'],

      // Power measurements
      'ac_power': ['measure_power', 'AC Power'],
      'pv1_power': ['measure_power.pv1', 'PV1 Power'],
      'pv2_power': ['measure_power.pv2', 'PV2 Power'],
      'pv3_power': ['measure_power.pv3', 'PV3 Power'],
      'battery_power': ['measure_power.battery', 'Battery Power'],
      'eps_power': ['measure_power.eps', 'EPS Power'],
      'exported_power': ['measure_power.exported', 'Exported Power'],
      'grid_power': ['measure_power.grid', 'Grid Power'],
      'power_now': ['measure_power.now', 'Current Power'],

      // Frequency measurements
      'grid_frequency': ['measure_frequency', 'Grid Frequency'],
      'eps_frequency': ['measure_frequency.eps', 'EPS Frequency'],

      // Temperature measurements
      'inverter_temperature': ['measure_temperature', 'Inverter Temperature'],
      'battery_temperature': ['measure_temperature.battery', 'Battery Temperature'],
      'radiator_temperature': ['measure_temperature.radiator', 'Radiator Temperature'],

      // Energy measurements (meter_power)
      'total_energy': ['meter_power.total', 'Total Energy'],
      'today_energy': ['meter_power.today', 'Today\'s Energy'],
      'total_feed_in_energy': ['meter_power.feedin', 'Total Feed-in Energy'],
      'total_consumption': ['meter_power.consumption', 'Total Consumption'],
      'pv_energy_total': ['meter_power.pv.total', 'Total PV Energy'],
      'eps_energy_total': ['meter_power.eps.total', 'Total EPS Energy'],
      'battery_charge_energy_total': ['meter_power.battery.charge.total', 'Total Battery Charge Energy'],
      'battery_discharge_energy_total': ['meter_power.battery.discharge.total', 'Total Battery Discharge Energy'],
      'battery_charge_energy_today': ['meter_power.battery.charge.today', 'Today\'s Battery Charge Energy'],
      'battery_discharge_energy_today': ['meter_power.battery.discharge.today', 'Today\'s Battery Discharge Energy'],

      // Battery specific
      'battery_remaining_capacity': ['measure_battery', 'Battery Remaining Capacity'],
      'battery_soc': ['measure_battery', 'Battery State of Charge'],

      // Modes
      'run_mode': ['inverter_mode', 'Inverter Run Mode'],
      'battery_mode': ['battery_mode', 'Battery Mode']
    };

    // Return the mapped values if they exist, otherwise return the original key and a capitalized version
    return capabilityMap[snakeCase] || [snakeCase, key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())];
  }

  /**
   * Poll the inverter for data and update capabilities
   */
  async poll() {
    while (this.inverter) {
      try {
        const data = await this.inverter.getData();
        if (data && data.data) {
          const inverterData = data.data as InverterData;
          for (const [key, value] of Object.entries(inverterData)) {
            const capabilityName = this.getCapabilityName(key)[0];
            await this.setCapabilityValue(capabilityName, value.value);
          }
        }
      } catch (error) {
        this.error('Error polling inverter:', error);
      }
      await new Promise(resolve => setTimeout(resolve, this.pollInterval));
    }
  }

  /**
   * Handle capability request
   * @param key The capability key
   * @returns The capability value
   */
  async onCapabilityRequest(key: string): Promise<number | null> {
    if (!this.inverter) throw new Error('Inverter not initialized');
    const data = await this.inverter.getData();
    return data && data.data && (data.data as InverterData)[key] ? (data.data as InverterData)[key].value : null;
  }
}

module.exports = SolaxInverterDevice;
