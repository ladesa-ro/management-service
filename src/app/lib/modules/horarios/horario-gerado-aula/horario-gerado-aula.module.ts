import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DiarioProfessorModule } from "@/modules/ensino/diario-professor/diario-professor.module";
import { HorarioGeradoModule } from "@/modules/horarios/horario-gerado/horario-gerado.module";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  HorarioGeradoAulaService,
} from "@/modules/horarios/horario-gerado-aula";
import { HorarioGeradoAulaAuthzRegistrySetup } from "@/modules/horarios/horario-gerado-aula/infrastructure";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/modules/horarios/horario-gerado-aula/infrastructure/persistence/typeorm";
import { HorarioGeradoAulaGraphqlResolver } from "@/modules/horarios/horario-gerado-aula/presentation/graphql/horario-gerado-aula.graphql.resolver";
import { HorarioGeradoAulaRestController } from "@/modules/horarios/horario-gerado-aula/presentation/rest/horario-gerado-aula.rest.controller";
import { IntervaloDeTempoModule } from "@/modules/horarios/intervalo-de-tempo/intervalo-de-tempo.module";

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
