import { Module } from "@nestjs/common";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  HorarioGeradoAulaService,
} from "@/core/horario-gerado-aula";
import { DiarioProfessorModule } from "@/server/nest/modules/diario-professor";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { HorarioGeradoAulaRestController } from "./rest/horario-gerado-aula.rest.controller";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule, IntervaloDeTempoModule],
  controllers: [HorarioGeradoAulaRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoAulaService,
    {
      provide: HORARIO_GERADO_AULA_REPOSITORY_PORT,
      useClass: HorarioGeradoAulaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
