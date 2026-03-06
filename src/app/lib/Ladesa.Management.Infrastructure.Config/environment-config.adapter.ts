import { Inject, Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import type {
  IConfigPort,
  IKeycloakCredentials,
  IOidcClientCredentials,
} from "@/Ladesa.Management.Application/@shared/application/ports/out/config";
import pkg from "../../package.json";

/**
 * Adapter de configuração baseado em variáveis de ambiente
 * Implementa IConfigPort lendo configurações de process.env
 */
@Injectable()
export class EnvironmentConfigAdapter implements IConfigPort {
  constructor(
    @Inject(NestConfigService)
    private nestConfigService: NestConfigService,
  ) {}

  // ========================================
  // Runtime
  // ========================================

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
    const runtimeNodeEnv = (this.nestConfigService.get<string>("NODE_ENV") ?? "production")
      .trim()
      .toLocaleLowerCase();

    return runtimeNodeEnv;
  }

  getRuntimeBuildTime(): Date | null {
    const buildTime = this.nestConfigService.get<string>("BUILD_TIME");

    if (buildTime) {
      return new Date(buildTime);
    }

    return null;
  }

  getRuntimeGitCommitHash(): string | null {
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
      return apiPrefix.endsWith("/") ? apiPrefix : `${apiPrefix}/`;
    }

    return "/";
  }

  withRuntimePrefix(path: string): string {
    const prefix = this.getRuntimePrefix();
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${prefix}${normalizedPath}`;
  }

  getRuntimeIsProduction(): boolean {
    return this.getRuntimeNodeEnv() === "production";
  }

  getRuntimeIsDevelopment(): boolean {
    return !this.getRuntimeIsProduction();
  }

  getPermissionCheckEnabled(): boolean {
    const envValue = this.nestConfigService.get<string>("ENABLE_PERMISSION_CHECK");

    if (this.getRuntimeIsProduction()) {
      return envValue !== "false";
    }

    return envValue === "true";
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

  // ========================================
  // Database
  // ========================================

  getDbSchema(): string | undefined {
    return this.nestConfigService.get<string>("DB_SCHEMA");
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

  getDbLogging(): string | undefined {
    return this.nestConfigService.get<string>("TYPEORM_LOGGING");
  }

  // ========================================
  // Auth
  // ========================================

  getOidcClientCredentials(): IOidcClientCredentials {
    const issuer = this.nestConfigService.get<string>("OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER");
    const clientId = this.nestConfigService.get<string>(
      "OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID",
    );
    const clientSecret = this.nestConfigService.get<string>(
      "OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET",
    );

    if (issuer === undefined || clientId === undefined || clientSecret === undefined) {
      throw new Error("Please provide correct OAUTH2_CLIENT credentials.");
    }

    return {
      issuer,
      clientId,
      clientSecret,
    };
  }

  getKeycloakConfigCredentials(): IKeycloakCredentials {
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

  // ========================================
  // Message Broker
  // ========================================

  getMessageBrokerUrl(): string {
    const url = this.nestConfigService.get<string>("MESSAGE_BROKER_URL");

    if (!url) {
      throw new Error("Please provide env.MESSAGE_BROKER_URL (e.g. amqp://admin:admin@localhost)");
    }

    return url;
  }

  getMessageBrokerQueueTimetableRequest(): string {
    return (
      this.nestConfigService.get<string>("MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST") ??
      "dev.timetable_generate.request"
    );
  }

  getMessageBrokerQueueTimetableResponse(): string {
    return (
      this.nestConfigService.get<string>("MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE") ??
      "dev.timetable_generate.response"
    );
  }
}
