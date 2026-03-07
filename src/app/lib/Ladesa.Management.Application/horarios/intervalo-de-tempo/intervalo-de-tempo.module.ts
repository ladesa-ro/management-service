import { Module } from "@nestjs/common";
import { IIntervaloDeTempoRepository } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/ports";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { IntervaloDeTempoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/IntervaloDeTempoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { IntervaloDeTempoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/IntervaloDeTempoGraphqlResolver";
import { IntervaloDeTempoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/IntervaloDeTempoRestController";

@Module({
  imports: [],
  controllers: [IntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    IntervaloDeTempoService,
    IntervaloDeTempoGraphqlResolver,
    {
      provide: IIntervaloDeTempoRepository,
      useClass: IntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [IntervaloDeTempoService],
})
export class IntervaloDeTempoModule {}
