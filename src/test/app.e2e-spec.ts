import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm/providers/app-data-source.provider";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";

/**
 * Mock RuntimeOptions for E2E tests
 */
const mockRuntimeOptions = {
  port: 3000,
  prefix: "/api",
  version: "1.0.0-test",
  buildTime: new Date("2026-01-31"),
  gitCommitHash: "test-commit-hash",
  nodeEnv: "test",
  swaggerServers: null,
  storagePath: "/tmp/test",
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
          provide: IRuntimeOptionsToken,
          useValue: mockRuntimeOptions,
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
