import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiaCalendarioService } from "@/v2/core/dia-calendario/application/use-cases/dia-calendario.service";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo";
import { DiaCalendarioController } from "./http";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDiaCalendarioRepositoryPort",
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
  ],
  controllers: [DiaCalendarioController],
  exports: [DiaCalendarioService],
})
export class DiaCalendarioModule {}
