import { Global, Module } from "@nestjs/common";
import { IIdempotencyRecordRepository } from "./domain";
import { IdempotencyService } from "./idempotency.service";
import { IIdempotencyService } from "./idempotency.service.interface";
import { IdempotencyRecordTypeOrmRepositoryAdapter } from "./infrastructure.database";

@Global()
@Module({
  providers: [
    {
      provide: IIdempotencyRecordRepository,
      useClass: IdempotencyRecordTypeOrmRepositoryAdapter,
    },
    {
      provide: IIdempotencyService,
      useClass: IdempotencyService,
    },
  ],
  exports: [IIdempotencyService],
})
export class IdempotencyModule {}
