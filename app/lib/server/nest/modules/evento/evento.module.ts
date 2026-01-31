import { Module } from "@nestjs/common";
import { EVENTO_REPOSITORY_PORT, EventoService } from "@/core/evento";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EventoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EventoRestController } from "./rest";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    EventoService,
    {
      provide: EVENTO_REPOSITORY_PORT,
      useClass: EventoTypeOrmRepositoryAdapter,
    },
  ],
  controllers: [EventoRestController],
  exports: [EventoService],
})
export class EventoModule {}
