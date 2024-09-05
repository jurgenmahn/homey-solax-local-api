import {  Driver } from 'homey';
import { PairSession } from 'homey/lib/Driver';
import { SolaxInverter } from '../../lib/SolaxInverter';
import { InverterModel } from '../../lib/inverterModels';

class SolaxInverterDriver extends Driver {
  async onInit() {
    this.log('SolaxInverterDriver has been initialized');
  }

  async onPair(session: PairSession) {
    let settings = {
      ip: '',
      port: 80,
      password: '',
      inverterType: '' as InverterModel,
      requestType: ''
    };

    session.setHandler('list_devices', async () => {
      console.log("list_devices")
      if (settings.inverterType) {
        console.log("Inverter selected in settings")
        console.log(settings.inverterType)

        return [{
          name: `Solax ${settings.inverterType} Inverter`,
          data: { id: settings.inverterType },
        }]
      }
 
      const devices = SolaxInverter.getAvailableModels().map(model => ({
        name: `Solax ${model} Inverter`,
        data: { id: model },
      }));

      return devices;
    });

    session.setHandler('list_devices_selection', async (data) => {
      console.log("list_devices_selection")
      settings.inverterType = data[0].data.id as InverterModel;
    });

    session.setHandler('manual_settings', async (data) => {
      settings = { ...settings, ...data };
      this.log('Attempting to connect with settings:', settings);
      
      try {
        const inverter = new SolaxInverter(
          settings.inverterType,
          settings.ip,
          settings.port,
          settings.password,
          settings.requestType
        );

        const connected = await inverter.connect();
        if (!connected) {
          throw new Error('Failed to connect to the inverter. Please check your settings and try again.');
        }
        this.log('Successfully connected to the inverter');
        return true;
      } catch (error) {
        this.error('Connection error:', error);
        if (error instanceof Error) {
          throw new Error(`Connection failed: ${error.message}`);
        } else {
          throw new Error('An unknown error occurred while trying to connect to the inverter.');
        }
      }
    });

    session.setHandler('add_device', async (data) => {
      console.log("add_device, data:")
      console.log(data)

      const devices = this.getDevices();

      // Find the device by its ID
      const device = devices.find(device => device.getData().id === data.data.id);
  
      if (device) {
        this.log(`Device found: ${device.getName()}`);
        await device.setSettings(settings);
        device.onInit();
      } else {
        this.log('Device not found');
      } 
    });    
  }
}

module.exports = SolaxInverterDriver;