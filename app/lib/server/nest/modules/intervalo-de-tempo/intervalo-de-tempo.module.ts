import { Module } from "@nestjs/common";
import { INTERVALO_DE_TEMPO_REPOSITORY_PORT } from "@/core/intervalo-de-tempo/application/ports";
import { IntervaloDeTempoService } from "@/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { IntervaloDeTempoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { IntervaloDeTempoRestController } from "./rest/intervalo-de-tempo.rest.controller";

@Module({
  imports: [],
  controllers: [IntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    IntervaloDeTempoService,
    {
      provide: INTERVALO_DE_TEMPO_REPOSITORY_PORT,
      useClass: IntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [IntervaloDeTempoService],
})
export class IntervaloDeTempoModule {}
