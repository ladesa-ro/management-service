export interface IConfigRuntime {
  //
  getRuntimeVersion(): string;
  //
  getRuntimePort(): number;
  getRuntimeNodeEnv(): string;
  getRuntimeIsProduction(): boolean;
  getRuntimeIsDevelopment(): boolean;
  //
  getRuntimePrefix(): null | string;
  //
  getSwaggerServers(): null | string[];
  //
  getStoragePath(): string;
  //
  getRuntimeBuildTime(): Date;
  getRuntimeGitCommitHash(): string | null;
}
