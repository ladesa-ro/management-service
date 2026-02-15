import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { EVENTO_REPOSITORY_PORT, EventoService } from "@/modules/sisgha/evento";
import { EventoAuthzRegistrySetup } from "@/modules/sisgha/evento/infrastructure";
import { EventoTypeOrmRepositoryAdapter } from "@/modules/sisgha/evento/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { EventoGraphqlResolver } from "./graphql/evento.graphql.resolver";
import { EventoRestController } from "./rest";

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
