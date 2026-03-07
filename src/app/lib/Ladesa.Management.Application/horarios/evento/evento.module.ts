import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import {
  EVENTO_REPOSITORY_PORT,
  EventoService,
} from "@/Ladesa.Management.Application/horarios/evento";
import { EventoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/evento/infrastructure";
import { EventoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/evento/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { EventoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/EventoGraphqlResolver";
import { EventoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/EventoRestController";

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
