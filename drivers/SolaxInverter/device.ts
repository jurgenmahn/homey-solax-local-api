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

  async onDeleted() {
    // Clean up polling when device is deleted
    this.inverter = null;
  }

  async initializeCapabilities() {
    if (!this.inverter) throw new Error('Inverter not initialized');

    try {
      const data = await this.inverter.getData();
      if (!data || !data.data) throw new Error('No data received from inverter');

      const capabilities = this.getCapabilities();
      const inverterData = data.data as InverterData;

      let capabilitiesFound = []

      for (const [key, value] of Object.entries(inverterData)) {
        capabilitiesFound.push(this.getCapabilityName(key));     
      }

      for (const [key, value] of Object.entries(capabilities)) {
        if (!capabilitiesFound.find(cap => cap == value)) {
          await this.removeCapability(value);
          this.log(`Removed capability: ${value}`);   
        } else {
          this.log(`Kept capability: ${value}`);   
        }
      }

      for (const [key, value] of Object.entries(inverterData)) {
        const capabilityName = this.getCapabilityName(key);
        if (!capabilities.includes(capabilityName)) {
          await this.addCapability(capabilityName);
          this.log(`Added capability: ${capabilityName}`);              
          capabilitiesFound.push(capabilityName);
          
          // Set the units for the capability
          if (value.unit) {
            await this.setCapabilityOptions(capabilityName, { units: value.unit });
            this.log(`Set unit for ${capabilityName}: ${value.unit}`);
          }
          await this.setCapabilityOptions(capabilityName, { insights: true });
          await this.setCapabilityOptions(capabilityName, { visible: true });
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

  getCapabilityName(key: string): string {
    // Convert to snake_case
    const snakeCase = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    
    // Map specific keys to Homey capability names
    const capabilityMap: { [key: string]: string } = {
      // Voltage measurements
      'network_voltage': 'measure_voltage',
      'pv1_voltage': 'measure_voltage.pv1',
      'pv2_voltage': 'measure_voltage.pv2',
      'pv3_voltage': 'measure_voltage.pv3',
      'battery_voltage': 'measure_voltage.battery',
      'eps_voltage': 'measure_voltage.eps',
    
      // Current measurements
      'output_current': 'measure_current',
      'pv1_current': 'measure_current.pv1',
      'pv2_current': 'measure_current.pv2',
      'pv3_current': 'measure_current.pv3',
      'battery_current': 'measure_current.battery',
      'eps_current': 'measure_current.eps',
    
      // Power measurements
      'ac_power': 'measure_power',
      'pv1_power': 'measure_power.pv1',
      'pv2_power': 'measure_power.pv2',
      'pv3_power': 'measure_power.pv3',
      'battery_power': 'measure_power.battery',
      'eps_power': 'measure_power.eps',
      'exported_power': 'measure_power.exported',
      'grid_power': 'measure_power.grid',
      'power_now': 'measure_power.now',
    
      // Frequency measurements
      'grid_frequency': 'measure_frequency',
      'eps_frequency': 'measure_frequency.eps',
    
      // Temperature measurements
      'inverter_temperature': 'measure_temperature',
      'battery_temperature': 'measure_temperature.battery',
      'radiator_temperature': 'measure_temperature.radiator',
    
      // Energy measurements (meter_power)
      'total_energy': 'meter_power.total',
      'today_energy': 'meter_power.today',
      'total_feed_in_energy': 'meter_power.feedin',
      'total_consumption': 'meter_power.consumption',
      'pv_energy_total': 'meter_power.pv.total',
      'eps_energy_total': 'meter_power.eps.total',
      'battery_charge_energy_total': 'meter_power.battery.charge.total',
      'battery_discharge_energy_total': 'meter_power.battery.discharge.total',
      'battery_charge_energy_today': 'meter_power.battery.charge.today',
      'battery_discharge_energy_today': 'meter_power.battery.discharge.today',
    
      // Battery specific
      'battery_remaining_capacity': 'measure_battery',
      'battery_soc': 'measure_battery',
    
      // Modes
      'run_mode': 'inverter_mode',
      'battery_mode': 'battery_mode'
    };

    return capabilityMap[snakeCase] || `measure_${snakeCase}`;
  }

  async poll() {
    while (this.inverter) {
      try {
        const data = await this.inverter.getData();
        if (data && data.data) {
          const inverterData = data.data as InverterData;
          for (const [key, value] of Object.entries(inverterData)) {
            const capabilityName = this.getCapabilityName(key);
            await this.setCapabilityValue(capabilityName, value.value);
          }
        }
      } catch (error) {
        this.error('Error polling inverter:', error);
      }
      await new Promise(resolve => setTimeout(resolve, this.pollInterval));
    }
  }

  async onCapabilityRequest(key: string): Promise<number | null> {
    if (!this.inverter) throw new Error('Inverter not initialized');
    const data = await this.inverter.getData();
    return data && data.data && (data.data as InverterData)[key] ? (data.data as InverterData)[key].value : null;
  }
}

module.exports = SolaxInverterDevice;