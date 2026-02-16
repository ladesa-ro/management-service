import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  HORARIO_GERADO_REPOSITORY_PORT,
  HorarioGeradoService,
} from "@/modules/sisgha/horario-gerado";
import { HorarioGeradoAuthzRegistrySetup } from "@/modules/sisgha/horario-gerado/infrastructure";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/modules/sisgha/horario-gerado/infrastructure/persistence/typeorm";
import { HorarioGeradoGraphqlResolver } from "@/modules/sisgha/horario-gerado/presentation/graphql/horario-gerado.graphql.resolver";
import { HorarioGeradoRestController } from "@/modules/sisgha/horario-gerado/presentation/rest/horario-gerado.rest.controller";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";

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
