import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  HorarioGeradoAulaService,
} from "@/modules/horarios/horario-gerado-aula";
import { HorarioGeradoAulaAuthzRegistrySetup } from "@/modules/horarios/horario-gerado-aula/infrastructure";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/modules/horarios/horario-gerado-aula/infrastructure/persistence/typeorm";
import { HorarioGeradoAulaGraphqlResolver } from "@/modules/horarios/horario-gerado-aula/presentation/graphql/horario-gerado-aula.graphql.resolver";
import { HorarioGeradoAulaRestController } from "@/modules/horarios/horario-gerado-aula/presentation/rest/horario-gerado-aula.rest.controller";
import { DiarioProfessorModule } from "@/server/nest/modules/diario-professor";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule, IntervaloDeTempoModule],
  controllers: [HorarioGeradoAulaRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoAulaService,
    HorarioGeradoAulaAuthzRegistrySetup,
    HorarioGeradoAulaGraphqlResolver,
    {
      provide: HORARIO_GERADO_AULA_REPOSITORY_PORT,
      useClass: HorarioGeradoAulaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
