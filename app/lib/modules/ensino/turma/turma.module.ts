import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/modules/ambientes/ambiente";
import { CursoModule } from "@/modules/ensino/curso";
import { TURMA_REPOSITORY_PORT } from "@/modules/ensino/turma/application/ports";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import {
  TurmaAuthzRegistrySetup,
  TurmaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/turma/infrastructure";
import { TurmaGraphqlResolver } from "@/modules/ensino/turma/presentation/graphql/turma.graphql.resolver";
import { TurmaRestController } from "@/modules/ensino/turma/presentation/rest/turma.rest.controller";

@Module({
  imports: [AmbienteModule, CursoModule, ImagemModule, ArquivoModule],
  controllers: [TurmaRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaService,
    TurmaGraphqlResolver,
    TurmaAuthzRegistrySetup,
    {
      provide: TURMA_REPOSITORY_PORT,
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaService],
})
export class TurmaModule {}
