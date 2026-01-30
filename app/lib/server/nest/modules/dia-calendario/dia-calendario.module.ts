import { Module } from "@nestjs/common";
import { DIA_CALENDARIO_REPOSITORY_PORT } from "@/core/dia-calendario/application/ports";
import { DiaCalendarioService } from "@/core/dia-calendario/application/use-cases/dia-calendario.service";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiaCalendarioRestController } from "./rest/dia-calendario.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIA_CALENDARIO_REPOSITORY_PORT,
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
  ],
  controllers: [DiaCalendarioRestController],
  exports: [DiaCalendarioService],
})
export class DiaCalendarioModule {}
