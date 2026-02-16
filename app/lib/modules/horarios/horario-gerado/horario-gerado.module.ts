import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo";
import {
  HORARIO_GERADO_REPOSITORY_PORT,
  HorarioGeradoService,
} from "@/modules/horarios/horario-gerado";
import { HorarioGeradoAuthzRegistrySetup } from "@/modules/horarios/horario-gerado/infrastructure";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/modules/horarios/horario-gerado/infrastructure/persistence/typeorm";
import { HorarioGeradoGraphqlResolver } from "@/modules/horarios/horario-gerado/presentation/graphql/horario-gerado.graphql.resolver";
import { HorarioGeradoRestController } from "@/modules/horarios/horario-gerado/presentation/rest/horario-gerado.rest.controller";

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
