import { Module } from "@nestjs/common";
import { HORARIO_GERADO_REPOSITORY_PORT, HorarioGeradoService } from "@/core/horario-gerado";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { HorarioGeradoRestController } from "./rest/horario-gerado.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [HorarioGeradoRestController],
  providers: [
    NestJsPaginateAdapter,
    HorarioGeradoService,
    {
      provide: HORARIO_GERADO_REPOSITORY_PORT,
      useClass: HorarioGeradoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
