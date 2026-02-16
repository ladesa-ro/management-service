import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ETAPA_REPOSITORY_PORT, EtapaService } from "@/modules/ensino/etapa";
import { EtapaAuthzRegistrySetup } from "@/modules/ensino/etapa/infrastructure";
import { EtapaTypeOrmRepositoryAdapter } from "@/modules/ensino/etapa/infrastructure/persistence/typeorm";
import { EtapaGraphqlResolver } from "@/modules/ensino/etapa/presentation/graphql/etapa.graphql.resolver";
import { EtapaRestController } from "@/modules/ensino/etapa/presentation/rest/etapa.rest.controller";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [EtapaRestController],
  providers: [
    NestJsPaginateAdapter,
    EtapaService,
    EtapaGraphqlResolver,
    EtapaAuthzRegistrySetup,
    {
      provide: ETAPA_REPOSITORY_PORT,
      useClass: EtapaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EtapaService],
})
export class EtapaModule {}
