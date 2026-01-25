import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { HorarioGeradoService } from "@/v2/core/horario-gerado/application/use-cases/horario-gerado.service";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo";
import { HorarioGeradoController } from "./controllers";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IHorarioGeradoRepositoryPort",
      useClass: HorarioGeradoTypeOrmRepositoryAdapter,
    },
    HorarioGeradoService,
  ],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
