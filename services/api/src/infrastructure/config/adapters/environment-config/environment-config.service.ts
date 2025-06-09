import { join } from "path";
import * as entities from "@/infrastructure/integrations/database/typeorm/entities";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import type { DataSourceOptions } from "typeorm";
import pkg from "../../../../../package.json";
import type { IConfig } from "../../types";
import type { IConfigIntegrateAuthKeycloakCredentials, IConfigIntegrateAuthOidcClientCredentials } from "../../types/IConfigIntegrateAuth";

const now = new Date();

@Injectable()
export class EnvironmentConfigService implements IConfig {
  constructor(
    // ...
    @Inject(NestConfigService)
    private nestConfigService: NestConfigService,
  ) {}

  getRootSrc(): string {
    return join(__dirname, "../../../..");
  }

  getRuntimeVersion(): string {
    return this.nestConfigService.get<string>("LADESA_API_VERSION") ?? pkg.version;
  }

  getRuntimePort(): number {
    const configPort = this.nestConfigService.get<number | string>("PORT") ?? null;

    if (configPort !== null) {
      const configPortAsNumber = Number.parseInt(String(configPort));

      if (!Number.isNaN(configPortAsNumber)) {
        return configPortAsNumber;
      }
    }

    return 3471;
  }

  getRuntimeNodeEnv(): string {
    const runtimeNodeEnv = (this.nestConfigService.get<string>("NODE_ENV") ?? "production").trim().toLocaleLowerCase();

    return runtimeNodeEnv;
  }

  getRuntimeBuildTime() {
    const buildTime = this.nestConfigService.get<string>("BUILD_TIME");

    if (buildTime) {
      return new Date(buildTime);
    }

    return now;
  }

  getRuntimeGitCommitHash() {
    const gitCommitHash = this.nestConfigService.get<string>("GIT_COMMIT_HASH");

    if (gitCommitHash) {
      return gitCommitHash;
    }

    return null;
  }

  getStoragePath(): string {
    const storagePath = this.nestConfigService.get<string>("STORAGE_PATH");

    if (!storagePath) {
      throw new Error("Please provide env.STORAGE_PATH (e.g. /tmp/uploaded)");
    }

    return storagePath;
  }

  getRuntimePrefix(): string {
    const apiPrefix = this.nestConfigService.get<string>("API_PREFIX");

    if (apiPrefix) {
      return apiPrefix;
    }

    return "";
  }

  getRuntimeIsProduction(): boolean {
    return this.getRuntimeNodeEnv() === "production";
  }

  getRuntimeIsDevelopment(): boolean {
    return !this.getRuntimeIsProduction();
  }

  getSwaggerServers(): string[] | null {
    const swaggerServersRaw = this.nestConfigService.get<string>("SWAGGER_SERVERS");

    if (typeof swaggerServersRaw === "string") {
      const servers = swaggerServersRaw
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      return servers;
    }

    return null;
  }

  getTypeOrmBasePath(): string {
    return join(this.getRootSrc(), "./infrastructure/integrations/database/typeorm");
  }

  getTypeOrmPathEntities(): string {
    return join(this.getTypeOrmBasePath(), "entities");
  }

  getTypeOrmPathMigrations(): string {
    return join(this.getTypeOrmBasePath(), "migrations");
  }

  getTypeOrmPathSubscribers(): string {
    return join(this.getTypeOrmBasePath(), "subscribers");
  }

  // ...

  getDbDatabase(): string | undefined {
    return this.nestConfigService.get<string>("DB_DATABASE");
  }

  getDbHost(): string | undefined {
    return this.nestConfigService.get<string>("DB_HOST");
  }

  getDbPassword(): string | undefined {
    return this.nestConfigService.get<string>("DB_PASSWORD");
  }

  getDbPort(): string | undefined {
    return this.nestConfigService.get<string>("DB_PORT");
  }

  getDbSchema(): string | undefined {
    return this.nestConfigService.get<string>("DB_SCHEMA");
  }

  getDbUsername(): string | undefined {
    return this.nestConfigService.get<string>("DB_USERNAME");
  }

  getDbConnection(): string | undefined {
    return this.nestConfigService.get<string>("DB_CONNECTION");
  }

  getDbUrl(): string | undefined {
    return this.nestConfigService.get<string>("DATABASE_URL");
  }

  getDbUseSSL(): string | undefined {
    return this.nestConfigService.get<string>("DATABASE_USE_SSL");
  }

  getTypeOrmLogging(): string | undefined {
    return this.nestConfigService.get<string>("TYPEORM_LOGGING");
  }

  getTypeOrmSharedDataSourceOptions(): Partial<DataSourceOptions> {
    const sharedEnvConfig = {};

    const DB_CONNECTION = this.getDbConnection();

    if (DB_CONNECTION !== undefined) {
      const DB_HOST = this.getDbHost();
      const DB_PORT = this.getDbPort();
      const DB_USERNAME = this.getDbUsername();
      const DB_PASSWORD = this.getDbPassword();
      const DB_DATABASE = this.getDbDatabase();
      const DB_SCHEMA = this.getDbSchema();

      const TYPEORM_LOGGING = this.getTypeOrmLogging();

      const DATABASE_URL = this.getDbUrl();
      const DATABASE_USE_SSL = this.getDbUseSSL();

      Object.assign(sharedEnvConfig, {
        type: DB_CONNECTION,

        host: DB_HOST,
        port: DB_PORT && Number.parseInt(DB_PORT),

        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        schema: DB_SCHEMA,

        synchronize: false,

        logging: TYPEORM_LOGGING,
      } as Partial<DataSourceOptions>);

      if (DATABASE_URL) {
        Object.assign(sharedEnvConfig, {
          url: DATABASE_URL,
        });
      }

      if (DATABASE_USE_SSL !== "false") {
        Object.assign(sharedEnvConfig, {
          options: {
            validateConnection: false,
            trustServerCertificate: true,
          },

          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        });
      }
    }

    return {
      ...sharedEnvConfig,
    };
  }

  getTypeOrmAppDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getTypeOrmSharedDataSourceOptions(),
      entities: [...Object.values(entities)],
      // entities: [`${this.getTypeOrmPathEntities()}/**/*{.ts,.js}`],
      // subscribers: [`${this.getTypeOrmPathSubscribers()}/**/*{.ts,.js}`],
    };

    return options as DataSourceOptions;
  }

  getTypeOrmMigrationDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getTypeOrmSharedDataSourceOptions(),
      migrations: [`${this.getTypeOrmPathMigrations()}/*{.ts,.js}`],
      migrationsTableName: "app_migration_db",
    };

    return options as DataSourceOptions;
  }

  //

  //

  getOidcClientCredentials(): IConfigIntegrateAuthOidcClientCredentials {
    const issuer = this.nestConfigService.get<string>("OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER");
    const clientId = this.nestConfigService.get<string>("OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID");
    const clientSecret = this.nestConfigService.get<string>("OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET");

    if (issuer === undefined || clientId === undefined || clientSecret === undefined) {
      throw new Error("Please provide correct OAUTH2_CLIENT credentials.");
    }

    return {
      issuer,
      clientId,
      clientSecret,
    };
  }

  //

  getKeycloakConfigCredentials(): IConfigIntegrateAuthKeycloakCredentials {
    const baseUrl = this.nestConfigService.get<string>("KC_BASE_URL");
    const realm = this.nestConfigService.get<string>("KC_REALM");
    const clientId = this.nestConfigService.get<string>("KC_CLIENT_ID");
    const clientSecret = this.nestConfigService.get<string>("KC_CLIENT_SECRET");

    if (!baseUrl) {
      throw new Error("KeyCloak baseUrl config not provided.");
    }

    if (!realm) {
      throw new Error("KeyCloak realm config not provided.");
    }

    if (!clientId) {
      throw new Error("KeyCloak clientId config not provided.");
    }

    if (!clientSecret) {
      throw new Error("KeyCloak clientSecret config not provided.");
    }

    return {
      baseUrl,
      realm,
      clientId,
      clientSecret,
    };
  }

  //
}
