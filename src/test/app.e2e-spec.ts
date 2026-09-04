import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";

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
          provide: IAppTypeormConnection,
          useValue: mockDataSource,
        },
        {
          provide: IConnectionHealthRegistry,
          useValue: {
            register: () => {},
            markHealthy: () => {},
            markUnavailable: () => {},
            getStatus: () => "healthy",
            getAllEntries: () => [],
            isAvailable: () => true,
          },
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

  it("/health (GET) returns 200 when healthy", () => {
    return request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe("healthy");
      });
  });

  it("/health/live (GET) returns 200 and up status", () => {
    return request(app.getHttpServer())
      .get("/health/live")
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe("up");
      });
  });

  it("/health/ready (GET) returns 200 when healthy", () => {
    return request(app.getHttpServer())
      .get("/health/ready")
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe("healthy");
      });
  });
});
