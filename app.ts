import Homey from 'homey';

class SolaxLocalWifiApp extends Homey.App {
  async onInit() {
    this.log('Solax Local Wifi app is running...');
  }
}

module.exports = SolaxLocalWifiApp;