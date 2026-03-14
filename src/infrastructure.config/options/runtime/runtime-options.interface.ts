export const IRuntimeOptions = Symbol();

export interface IRuntimeOptions {
  version: string;
  port: number;
  nodeEnv: string;
  prefix: string;
  buildTime: Date | null;
  gitCommitHash: string | null;
  swaggerServers: string[] | null;
  storagePath: string;
}
