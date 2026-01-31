import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { EVENTO_REPOSITORY_PORT, EventoService } from "@/modules/evento";
import { EventoTypeOrmRepositoryAdapter } from "@/modules/evento/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
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
