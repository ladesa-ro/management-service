import { Module } from "@nestjs/common";
import { NIVEL_FORMACAO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure/persistence/typeorm";
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
      provide: NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
