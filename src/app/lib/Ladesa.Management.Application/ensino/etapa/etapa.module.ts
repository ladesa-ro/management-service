import { Module } from "@nestjs/common";
import { EtapaService, IEtapaRepository } from "@/Ladesa.Management.Application/ensino/etapa";
import { EtapaAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/etapa/infrastructure";
import { EtapaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/etapa/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { EtapaGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/EtapaGraphqlResolver";
import { EtapaRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/EtapaRestController";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [EtapaRestController],
  providers: [
    NestJsPaginateAdapter,
    EtapaService,
    EtapaGraphqlResolver,
    EtapaAuthzRegistrySetup,
    {
      provide: IEtapaRepository,
      useClass: EtapaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EtapaService],
})
export class EtapaModule {}
