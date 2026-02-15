import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { TURMA_REPOSITORY_PORT } from "@/modules/ensino/turma/application/ports";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import {
  TurmaAuthzRegistrySetup,
  TurmaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/turma/infrastructure";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CursoModule } from "@/server/nest/modules/curso";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { TurmaGraphqlResolver } from "./graphql/turma.graphql.resolver";
import { TurmaRestController } from "./rest/turma.rest.controller";

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
