import { Module } from "@nestjs/common";
import { NIVEL_FORMACAO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure/persistence/typeorm";
import { NivelFormacaoGraphqlResolver } from "@/Ladesa.Management.Application/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "@/Ladesa.Management.Application/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
