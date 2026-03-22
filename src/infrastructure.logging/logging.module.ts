import { Global, Module } from "@nestjs/common";
import { ILoggerPort, IPerformanceHooks } from "@/domain/abstractions/logging";
import { NestJsLoggerAdapter } from "./nestjs-logger.adapter";
import { PerformanceHooksAdapter } from "./noop-performance-hooks";

@Global()
@Module({
  providers: [
    {
      provide: ILoggerPort,
      useClass: NestJsLoggerAdapter,
    },
    {
      provide: IPerformanceHooks,
      useClass: PerformanceHooksAdapter,
    },
  ],
  exports: [ILoggerPort, IPerformanceHooks],
})
export class LoggingModule {}
