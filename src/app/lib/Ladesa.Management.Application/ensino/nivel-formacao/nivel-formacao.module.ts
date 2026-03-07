import { Module } from "@nestjs/common";
import { INivelFormacaoRepository } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/NivelFormacaoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { NivelFormacaoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/NivelFormacaoGraphqlResolver";
import { NivelFormacaoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/NivelFormacaoRestController";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoService,
    NivelFormacaoAuthzRegistrySetup,
    NivelFormacaoGraphqlResolver,
    {
      provide: INivelFormacaoRepository,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
