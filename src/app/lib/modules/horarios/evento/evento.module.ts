import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import { EVENTO_REPOSITORY_PORT, EventoService } from "@/modules/horarios/evento";
import { EventoAuthzRegistrySetup } from "@/modules/horarios/evento/infrastructure";
import { EventoTypeOrmRepositoryAdapter } from "@/modules/horarios/evento/infrastructure/persistence/typeorm";
import { EventoGraphqlResolver } from "@/modules/horarios/evento/presentation/graphql/evento.graphql.resolver";
import { EventoRestController } from "@/modules/horarios/evento/presentation/rest";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    EventoService,
    EventoGraphqlResolver,
    EventoAuthzRegistrySetup,
    {
      provide: EVENTO_REPOSITORY_PORT,
      useClass: EventoTypeOrmRepositoryAdapter,
    },
  ],
  controllers: [EventoRestController],
  exports: [EventoService],
})
export class EventoModule {}
