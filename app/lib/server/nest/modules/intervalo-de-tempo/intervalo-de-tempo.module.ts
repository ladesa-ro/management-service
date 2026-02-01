import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { INTERVALO_DE_TEMPO_REPOSITORY_PORT } from "@/modules/intervalo-de-tempo/application/ports";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { IntervaloDeTempoTypeOrmRepositoryAdapter } from "@/modules/intervalo-de-tempo/infrastructure/persistence/typeorm";
import { IntervaloDeTempoGraphqlResolver } from "./graphql/intervalo-de-tempo.graphql.resolver";
import { IntervaloDeTempoRestController } from "./rest/intervalo-de-tempo.rest.controller";

@Module({
  imports: [],
  controllers: [IntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    IntervaloDeTempoService,
    IntervaloDeTempoGraphqlResolver,
    {
      provide: INTERVALO_DE_TEMPO_REPOSITORY_PORT,
      useClass: IntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [IntervaloDeTempoService],
})
export class IntervaloDeTempoModule {}
