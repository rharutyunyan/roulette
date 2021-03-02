export interface IServiceConfig {
  environment: string;
  isMicroservice: boolean;
  port: number;
  swagger: {
    Name: string;
    Description: string;
    Version: string;
    Path: string;
  };
  globalPrefix: string;
  print();
}
