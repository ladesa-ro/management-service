import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { HorarioGeradoAulaService } from "@/v2/core/horario-gerado-aula/application/use-cases/horario-gerado-aula.service";
import { DiarioProfessorModule } from "@/v2/server/modules/diario-professor";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { HorarioGeradoAulaController } from "./http";

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
