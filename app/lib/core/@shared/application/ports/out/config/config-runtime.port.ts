/**
 * Port de configuração de runtime
 * Define as configurações do ambiente de execução
 */
export interface IConfigRuntimePort {
  getRuntimeVersion(): string;
  getRuntimePort(): number;
  getRuntimeNodeEnv(): string;
  getRuntimeIsProduction(): boolean;
  getRuntimeIsDevelopment(): boolean;
  getRuntimePrefix(): string;
  withRuntimePrefix(path: string): string;
  getRuntimeBuildTime(): Date;
  getRuntimeGitCommitHash(): string | null;
  getSwaggerServers(): string[] | null;
  getStoragePath(): string;
  getPermissionCheckEnabled(): boolean;
}
