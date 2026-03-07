import { Module } from "@nestjs/common";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import {
  CalendarioLetivoService,
  ICalendarioLetivoRepository,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { CalendarioLetivoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/calendario-letivo/infrastructure";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/CalendarioLetivoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { CalendarioLetivoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/CalendarioLetivoGraphqlResolver";
import { CalendarioLetivoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/CalendarioLetivoRestController";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CalendarioLetivoRestController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioLetivoService,
    CalendarioLetivoGraphqlResolver,
    CalendarioLetivoAuthzRegistrySetup,
    {
      provide: ICalendarioLetivoRepository,
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CalendarioLetivoService],
})
export class CalendarioLetivoModule {}
