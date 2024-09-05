import Ajv from 'ajv';
import { InverterHttpClient } from './InverterHttpClient';

export interface InverterResponse {
    data: Record<string, any>;
    dongleSerialNumber: string;
    version: string;
    type: number;
    inverterSerialNumber: string | null;
}

// Enum for units
enum Units {
    V = 'V',
    A = 'A',
    W = 'W',
    KWH = 'kWh',
    C = '°C',
    PERCENT = '%',
    HZ = 'Hz',
    NONE = '',
}

type IndexType = number | number[] | ((value: number[]) => number);

export type ResponseDecoder = {
    [key: string]: [
        IndexType,
        Units | string,
        ...((value: number) => number | string)[]
    ];
};

interface RawResponse {
    data?: number[];
    Data?: number[];
    sn: string;
    ver: string;
    type: number;
    information?: string[];
    Information?: string[];
}

export class ResponseParser {
    private ajv: Ajv;

    constructor(
        private schema: Record<string, any>,
        private responseDecoder: ResponseDecoder,
        private inverterModel: string,
        private client: InverterHttpClient
    ) {
        this.ajv = new Ajv();
    }

    handleResponse(responseBuffer: Buffer): InverterResponse {
        const dataString = responseBuffer.toString('utf-8');
        let response: RawResponse;

        try {
            const parsedResponse = JSON.parse(dataString);

            if (!parsedResponse.data && parsedResponse.Data) {
                parsedResponse.data = parsedResponse.Data;
                delete parsedResponse.Data
            }

            if (!parsedResponse.information && parsedResponse.Information) {
                parsedResponse.information = parsedResponse.Information;
                delete parsedResponse.Information
            }

            if (!this.isValidResponse(parsedResponse)) {
                console.error(parsedResponse);
                throw new Error('Invalid response structure');
            }
            response = parsedResponse as RawResponse;
            console.log("Solax response");
            console.log(response);
        } catch (error) {
            console.error('Error parsing Solax response to JSON:', error);
            throw new Error('Failed to parse response');
        }

        const validate = this.ajv.compile(this.schema);
        if (!validate(response)) {
            throw new Error(`Invalid response: ${this.ajv.errorsText(validate.errors)}`);
        }

        const decodedData: Record<string, any> = {};
        for (const [key, [index, unit, ...processors]] of Object.entries(this.responseDecoder)) {
            let value: number | string;
            if (typeof index === 'function') {
                value = index(response.data ?? []);
            } else if (Array.isArray(index)) {
                value = index.reduce((acc, i) => (acc << 8) + (response.data?.[i] ?? 0), 0);
            } else {
                value = response.data?.[index] ?? 0;
            }
            for (const processor of processors) {
                value = processor(value as number);
            }
            decodedData[key] = { value, unit };
        }

        return {
            data: decodedData,
            dongleSerialNumber: this.dongleSerialNumberGetter(response),
            version: response.ver,
            type: response.type,
            inverterSerialNumber: this.inverterSerialNumberGetter(response),
        };
    }

    private isValidResponse(response: unknown): response is RawResponse {
        return (
            typeof response === 'object' &&
            response !== null &&
            Array.isArray((response as RawResponse).data) &&
            typeof (response as RawResponse).sn === 'string' &&
            typeof (response as RawResponse).ver === 'string' &&
            typeof (response as RawResponse).type === 'number'
        );
    }

    private dongleSerialNumberGetter(response: RawResponse): string {
        return response.sn || '';
    }

    private inverterSerialNumberGetter(response: RawResponse): string | null {
        return response.information && response.information[2] ? response.information[2] : null;
    }
}