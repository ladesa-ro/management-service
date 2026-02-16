import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DIA_CALENDARIO_REPOSITORY_PORT } from "@/modules/sisgha/dia-calendario/application/ports";
import { DiaCalendarioService } from "@/modules/sisgha/dia-calendario/application/use-cases/dia-calendario.service";
import { DiaCalendarioAuthzRegistrySetup } from "@/modules/sisgha/dia-calendario/infrastructure";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/modules/sisgha/dia-calendario/infrastructure/persistence/typeorm";
import { DiaCalendarioGraphqlResolver } from "@/modules/sisgha/dia-calendario/presentation/graphql/dia-calendario.graphql.resolver";
import { DiaCalendarioRestController } from "@/modules/sisgha/dia-calendario/presentation/rest/dia-calendario.rest.controller";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIA_CALENDARIO_REPOSITORY_PORT,
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
    DiaCalendarioGraphqlResolver,
    DiaCalendarioAuthzRegistrySetup,
  ],
  controllers: [DiaCalendarioRestController],
  exports: [DiaCalendarioService],
})
export class DiaCalendarioModule {}
