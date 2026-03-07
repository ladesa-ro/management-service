import { Module } from "@nestjs/common";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/Ladesa.Management.Application/ensino/curso";
import {
  CursoAuthzRegistrySetup,
  CursoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/curso/infrastructure";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { CursoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/CursoGraphqlResolver";
import { CursoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/CursoRestController";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule, OfertaFormacaoModule],
  controllers: [CursoRestController],
  providers: [
    NestJsPaginateAdapter,
    CursoService,
    CursoGraphqlResolver,
    CursoAuthzRegistrySetup,
    {
      provide: CURSO_REPOSITORY_PORT,
      useClass: CursoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CursoService],
})
export class CursoModule {}
