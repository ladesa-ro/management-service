import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import {
  HORARIO_GERADO_REPOSITORY_PORT,
  HorarioGeradoService,
} from "@/Ladesa.Management.Application/horarios/horario-gerado";
import { HorarioGeradoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/horario-gerado/infrastructure";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/horario-gerado/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { HorarioGeradoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/HorarioGeradoGraphqlResolver";
import { HorarioGeradoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/HorarioGeradoRestController";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [HorarioGeradoRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoService,
    HorarioGeradoAuthzRegistrySetup,
    HorarioGeradoGraphqlResolver,
    {
      provide: HORARIO_GERADO_REPOSITORY_PORT,
      useClass: HorarioGeradoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
