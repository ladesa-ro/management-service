import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import {
  HORARIO_GERADO_REPOSITORY_PORT,
  HorarioGeradoService,
} from "@/Ladesa.Management.Application/horarios/horario-gerado";
import { HorarioGeradoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/horario-gerado/infrastructure";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/horario-gerado/infrastructure/persistence/typeorm";
import { HorarioGeradoGraphqlResolver } from "@/Ladesa.Management.Application/horarios/horario-gerado/presentation/graphql/horario-gerado.graphql.resolver";
import { HorarioGeradoRestController } from "@/Ladesa.Management.Application/horarios/horario-gerado/presentation/rest/horario-gerado.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
