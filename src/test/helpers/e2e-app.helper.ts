import { Global, type INestApplication, Module, type Type } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { Test, type TestingModule } from "@nestjs/testing";
import { vi } from "vitest";
import { ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import { IRequestActorResolver } from "@/domain/abstractions/request-actor";
import { IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime/runtime-options.interface";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { AccessContextCoreModule } from "@/server/nest/access-context/access-context.module";
import { AccessTokenStrategyAdapter } from "@/server/nest/auth/access-token-strategy.adapter";
import { AuthGuardAdapter } from "@/server/nest/auth/auth-guard.adapter";
import { AuthSerializerAdapter } from "@/server/nest/auth/auth-serializer.adapter";
import { AuthStrategy } from "@/server/nest/auth/auth-strategy.types";
import { ApplicationErrorFilter } from "@/server/nest/filters/application-error.filter";
import { GlobalExceptionFilter } from "@/server/nest/filters/global-exception.filter";
import { ValidationExceptionFilter } from "@/server/nest/filters/validation.filter";
import { ZodGlobalValidationPipe } from "@/shared/validation/zod-global-validation.pipe";
import { createTestId } from "./factories";

export const TEST_AUTH_TOKEN = "valid-test-token";

export const mockTestAdminActor: IRequestActor = {
  id: createTestId(),
  nome: "Admin Test",
  matricula: "20260001",
  email: "admin@ladesa.edu.br",
  isSuperUser: true,
};

export const mockE2ERuntimeOptions = {
  port: 3000,
  prefix: "/api",
  version: "1.0.0-test",
  buildTime: new Date("2026-01-31"),
  gitCommitHash: "test-commit-hash",
  nodeEnv: "test",
  swaggerServers: null,
  storagePath: "/tmp/test",
  enableMockAccessToken: true,
};

export const mockE2EDataSource = {
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
      select: () => ({
        where: () => ({
          andWhere: () => ({ getOne: () => Promise.resolve(null) }),
        }),
      }),
    }),
  }),
};

export interface CreateE2EAppOptions {
  controllers: Type<any>[];
  providers?: any[];
}

@Global()
@Module({
  providers: [
    {
      provide: IAppTypeormConnection,
      useValue: mockE2EDataSource,
    },
  ],
  exports: [IAppTypeormConnection],
})
class GlobalTypeormTestModule {}

export async function createE2ETestApp(options: CreateE2EAppOptions): Promise<INestApplication> {
  const mockActorResolver: IRequestActorResolver = {
    resolveFromAccessToken: vi.fn().mockImplementation(async (token?: string) => {
      if (token === TEST_AUTH_TOKEN) {
        return mockTestAdminActor;
      }
      return null;
    }),
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      GlobalTypeormTestModule,
      AccessContextCoreModule,
      PassportModule.register({
        defaultStrategy: AuthStrategy.ACCESS_TOKEN,
      }),
    ],
    controllers: options.controllers,
    providers: [
      {
        provide: IRuntimeOptionsToken,
        useValue: mockE2ERuntimeOptions,
      },
      {
        provide: IAppTypeormConnection,
        useValue: mockE2EDataSource,
      },
      {
        provide: ILoggerPortToken,
        useValue: {
          log: vi.fn(),
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
          debug: vi.fn(),
        },
      },
      {
        provide: IRequestActorResolver,
        useValue: mockActorResolver,
      },
      AccessTokenStrategyAdapter,
      AuthSerializerAdapter,
      {
        provide: APP_GUARD,
        useClass: AuthGuardAdapter,
      },
      {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
      },
      {
        provide: APP_FILTER,
        useClass: ApplicationErrorFilter,
      },
      {
        provide: APP_FILTER,
        useClass: ValidationExceptionFilter,
      },
      ...(options.providers ?? []),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(new ZodGlobalValidationPipe());

  await app.init();
  return app;
}
