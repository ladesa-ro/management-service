import { Module } from "@nestjs/common";
import { IDisponibilidadeRepository } from "@/Ladesa.Management.Application/ensino/disponibilidade/application/ports";
import { DisponibilidadeService } from "@/Ladesa.Management.Application/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/disponibilidade/infrastructure";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/DisponibilidadeRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { DisponibilidadeGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/DisponibilidadeGraphqlResolver";
import { DisponibilidadeRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/DisponibilidadeRestController";

@Module({
  imports: [],
  controllers: [DisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    DisponibilidadeService,
    DisponibilidadeGraphqlResolver,
    DisponibilidadeAuthzRegistrySetup,
    {
      provide: IDisponibilidadeRepository,
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
