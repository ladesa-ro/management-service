import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ETAPA_REPOSITORY_PORT, EtapaService } from "@/modules/ensino/etapa";
import { EtapaAuthzRegistrySetup } from "@/modules/ensino/etapa/infrastructure";
import { EtapaTypeOrmRepositoryAdapter } from "@/modules/ensino/etapa/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { EtapaGraphqlResolver } from "./graphql/etapa.graphql.resolver";
import { EtapaRestController } from "./rest/etapa.rest.controller";

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
