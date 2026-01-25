import { Module } from "@nestjs/common";
import { HorarioGeradoAulaController } from "@/v2/adapters/in/http/horario-gerado-aula/horario-gerado-aula.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { HorarioGeradoAulaService } from "@/v2/core/horario-gerado-aula/application/use-cases/horario-gerado-aula.service";
import { DiarioProfessorModule } from "@/v2/server/modules/diario-professor.module";
import { HorarioGeradoModule } from "@/v2/server/modules/horario-gerado.module";
import { IntervaloDeTempoModule } from "@/v2/server/modules/intervalo-de-tempo.module";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule, IntervaloDeTempoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IHorarioGeradoAulaRepositoryPort",
      useClass: HorarioGeradoAulaTypeOrmRepositoryAdapter,
    },
    HorarioGeradoAulaService,
  ],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
