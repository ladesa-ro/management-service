import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { HORARIO_GERADO_REPOSITORY_PORT, HorarioGeradoService } from "@/modules/horario-gerado";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/modules/horario-gerado/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
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
