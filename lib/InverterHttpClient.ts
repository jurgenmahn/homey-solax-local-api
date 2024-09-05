import axios, { AxiosResponse } from 'axios';

enum Method {
  GET = 'GET',
  POST = 'POST'
}

interface InverterHttpClientOptions {
  url: string;
  method: Method;
  pwd: string;
  headers?: Record<string, string>;
  data?: string;
  query?: string;
}

class InverterHttpClient {
  private url: string;
  private method: Method;
  private pwd: string;
  private headers: Record<string, string>;
  private data?: string;
  private query: string;

  constructor(options: InverterHttpClientOptions) {
    this.url = options.url;
    this.method = options.method;
    this.pwd = options.pwd;
    this.headers = options.headers || {};
    this.data = options.data;
    this.query = options.query || '';
  }

  withHeaders(headers: Record<string, string>): InverterHttpClient {
    return new InverterHttpClient({ ...this, headers: { ...this.headers, ...headers } });
  }

  withDefaultData(): InverterHttpClient {
    let data = 'optType=ReadRealTimeData';
    if (this.pwd) {
      data += `&pwd=${this.pwd}`;
    }
    return this.withData(data);
  }

  withData(data: string): InverterHttpClient {
    return new InverterHttpClient({ ...this, data });
  }

  withQuery(query: string): InverterHttpClient {
    return new InverterHttpClient({ ...this, query });
  }

  withDefaultQuery(): InverterHttpClient {
    let query = this.pwd ? `optType=ReadRealTimeData&pwd=${this.pwd}&` : 'optType=ReadRealTimeData';
    return this.withQuery(query);
  }

  async request(): Promise<Buffer> {
    const url = this.query ? `${this.url}?${this.query}` : this.url;
    const config = {
      method: this.method,
      url,
      headers: this.headers,
      data: this.data,
      responseType: 'arraybuffer' as 'arraybuffer',
      timeout: 5000 // 5 seconds timeout
    };

    try {
      const response: AxiosResponse<Buffer> = await axios(config);
      return response.data;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }
}

export { InverterHttpClient, Method };