import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { DISCIPLINA_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/disciplina/application/ports";
import { DisciplinaService } from "@/Ladesa.Management.Application/ensino/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaAuthzRegistrySetup,
  DisciplinaTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/disciplina/infrastructure";
import { DisciplinaGraphqlResolver } from "@/Ladesa.Management.Application/ensino/disciplina/presentation/graphql/disciplina.graphql.resolver";
import { DisciplinaRestController } from "@/Ladesa.Management.Application/ensino/disciplina/presentation/rest/disciplina.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaRestController],
  providers: [
    NestJsPaginateAdapter,
    DisciplinaService,
    DisciplinaGraphqlResolver,
    DisciplinaAuthzRegistrySetup,
    {
      provide: DISCIPLINA_REPOSITORY_PORT,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
