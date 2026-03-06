export interface IConfigInfrastructureDatabase {
  getDbConnection(): string | undefined;
  getDbSchema(): string | undefined;
  getDbUrl(): string | undefined;
  getDbUseSSL(): string | undefined;
  getDbLogging(): string | undefined;
}

export const CONFIG_INFRASTRUCTURE_DATABASE = Symbol.for("CONFIG_INFRASTRUCTURE_DATABASE");
