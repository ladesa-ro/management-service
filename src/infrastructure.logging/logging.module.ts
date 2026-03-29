import { Global, Module } from "@nestjs/common";
import { ILoggerPort, IPerformanceHooks } from "@/domain/abstractions/logging";
import { NestJsLoggerAdapter } from "./nestjs-logger.adapter";
import { PerformanceHooksAdapter } from "./noop-performance-hooks";
import { OutgoingRequestLogger } from "./outgoing-request-logger";
import { UnhandledErrorLogger } from "./unhandled-error-logger";

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
    OutgoingRequestLogger,
    UnhandledErrorLogger,
  ],
  exports: [ILoggerPort, IPerformanceHooks],
})
export class LoggingModule {}
