import { InverterHttpClient, Method } from './InverterHttpClient';
import { ResponseParser, InverterResponse } from './ResponseParser';
import { INVERTER_MODELS, InverterModel } from './inverterModels';
import { JSONSchemaType } from 'ajv';

export class SolaxInverter {
  private client: InverterHttpClient;
  private responseParser: ResponseParser;

  constructor(
    private inverterType: InverterModel,
    private ip: string,
    private port: number,
    private password: string,
    private requestType: string
  ) {
    this.client = new InverterHttpClient({
      url: `http://${ip}:${port}`,
      method: (requestType == "POST" ? Method.POST : Method.GET),
      pwd: password
    });

    const modelConfig = INVERTER_MODELS[inverterType];
    if (!modelConfig) {
      const availableModels = Object.keys(INVERTER_MODELS).join(', ');
      throw new Error(`Unsupported inverter model: ${inverterType}. Available models are: ${availableModels}`);
    }

    this.responseParser = new ResponseParser(
      modelConfig.schema as unknown as JSONSchemaType<unknown>,
      modelConfig.decoder,
      inverterType,
      this.client
    );
  }

  async connect(): Promise<boolean> {
    try {
      console.log(`Attempting to connect to inverter at ${this.ip}:${this.port}`);
      let response: Buffer

      if (this.requestType == "POST") {
        response = await this.client.withDefaultData().request();
      } else {
        response = await this.client.withDefaultQuery().request();
      }
      const parsedResponse = this.responseParser.handleResponse(response);
      console.log('Parsed response:', parsedResponse);
      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }

  async getData(): Promise<InverterResponse|null> {
    try {
      console.log(`Attempting to connect to inverter at ${this.ip}:${this.port}`);
      let response: Buffer

      if (this.requestType == "POST") {
        response = await this.client.withDefaultData().request();
      } else {
        response = await this.client.withDefaultQuery().request();
      }
      const parsedResponse = this.responseParser.handleResponse(response);
      console.log('Parsed response:', parsedResponse);
      return parsedResponse;
    } catch (error) {
      console.error('Connection failed:', error);
      return null;
    }
  }

  static getAvailableModels(): string[] {
    return Object.keys(INVERTER_MODELS);
  }
}