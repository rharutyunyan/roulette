export interface IDatabaseConfig {
  database: string;
  host: string;
  port: number;
  user: string;
  ssl?: ISSLConfig;
}

export interface ISSLConfig {
  ca?: any;
}
