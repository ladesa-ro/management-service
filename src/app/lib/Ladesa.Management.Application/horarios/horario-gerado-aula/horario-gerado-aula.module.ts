import { Module } from "@nestjs/common";
import { DiarioProfessorModule } from "@/Ladesa.Management.Application/ensino/diario-professor/diario-professor.module";
import { HorarioGeradoModule } from "@/Ladesa.Management.Application/horarios/horario-gerado/horario-gerado.module";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  HorarioGeradoAulaService,
} from "@/Ladesa.Management.Application/horarios/horario-gerado-aula";
import { HorarioGeradoAulaAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/infrastructure";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/infrastructure/persistence/typeorm";
import { HorarioGeradoAulaGraphqlResolver } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/presentation/graphql/horario-gerado-aula.graphql.resolver";
import { HorarioGeradoAulaRestController } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/presentation/rest/horario-gerado-aula.rest.controller";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
