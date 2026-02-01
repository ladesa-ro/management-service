import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  HorarioGeradoAulaService,
} from "@/modules/horario-gerado-aula";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/modules/horario-gerado-aula/infrastructure/persistence/typeorm";
import { DiarioProfessorModule } from "@/server/nest/modules/diario-professor";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { HorarioGeradoAulaGraphqlResolver } from "./graphql/horario-gerado-aula.graphql.resolver";
import { HorarioGeradoAulaRestController } from "./rest/horario-gerado-aula.rest.controller";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule, IntervaloDeTempoModule],
  controllers: [HorarioGeradoAulaRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoAulaService,
    HorarioGeradoAulaGraphqlResolver,
    {
      provide: HORARIO_GERADO_AULA_REPOSITORY_PORT,
      useClass: HorarioGeradoAulaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
