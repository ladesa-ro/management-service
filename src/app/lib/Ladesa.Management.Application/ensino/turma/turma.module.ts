import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { CursoModule } from "@/Ladesa.Management.Application/ensino/curso/curso.module";
import { TURMA_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/turma/application/ports";
import { TurmaService } from "@/Ladesa.Management.Application/ensino/turma/application/use-cases/turma.service";
import {
  TurmaAuthzRegistrySetup,
  TurmaTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/turma/infrastructure";
import { TurmaGraphqlResolver } from "@/Ladesa.Management.Application/ensino/turma/presentation/graphql/turma.graphql.resolver";
import { TurmaRestController } from "@/Ladesa.Management.Application/ensino/turma/presentation/rest/turma.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
