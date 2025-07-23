export interface IConfigDatabase {
  getDbConnection(): string | undefined;
  getDbHost(): string | undefined;
  getDbPort(): string | undefined;
  getDbUsername(): string | undefined;
  getDbPassword(): string | undefined;
  getDbDatabase(): string | undefined;
  getDbSchema(): string | undefined;
  getDbUrl(): string | undefined;
  getDbUseSSL(): string | undefined;
}
