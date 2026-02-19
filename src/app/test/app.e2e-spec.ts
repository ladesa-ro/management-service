import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { CONFIG_PORT } from "@/modules/@shared/application/ports/out/config";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm/providers/app-data-source.provider";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";

/**
 * Mock ConfigService for E2E tests
 */
const mockConfigService = {
  // Runtime config
  getRuntimePort: () => 3000,
  getRuntimeHost: () => "localhost",
  getRuntimePrefix: () => "/api",
  getRuntimeVersion: () => "1.0.0-test",
  getRuntimeBuildTime: () => new Date("2026-01-31"),
  getRuntimeGitCommitHash: () => "test-commit-hash",
  // Auth config
  getAuthOidcIssuerUri: () => "http://localhost:8080/realms/test",
  getAuthOidcClientId: () => "test-client",
  getAuthOidcJwksUri: () => "http://localhost:8080/realms/test/protocol/openid-connect/certs",
  // Database config
  getDatabaseHost: () => "localhost",
  getDatabasePort: () => 5432,
  getDatabaseDatabase: () => "test",
  getDatabaseUsername: () => "test",
  getDatabasePassword: () => "test",
  getDatabaseType: () => "better-sqlite3",
  // TypeORM config
  getTypeOrmAppDataSourceOptions: () => ({
    type: "better-sqlite3" as const,
    database: ":memory:",
    entities: [],
    synchronize: true,
    logging: false,
  }),
};

/**
 * Mock DataSource for E2E tests
 */
const mockDataSource = {
  isInitialized: true,
  manager: {
    transaction: (fn: any) => fn({ save: () => Promise.resolve() }),
  },
  getRepository: () => ({
    find: () => Promise.resolve([]),
    findOne: () => Promise.resolve(null),
    save: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    createQueryBuilder: () => ({
      where: () => ({ getMany: () => Promise.resolve([]) }),
    }),
  }),
};

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: CONFIG_PORT,
          useValue: mockConfigService,
        },
        {
          provide: APP_DATA_SOURCE_TOKEN,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200);
  });
});
