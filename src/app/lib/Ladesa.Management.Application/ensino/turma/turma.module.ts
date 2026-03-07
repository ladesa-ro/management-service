import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { CursoModule } from "@/Ladesa.Management.Application/ensino/curso/curso.module";
import { ITurmaRepository } from "@/Ladesa.Management.Application/ensino/turma/application/ports";
import { TurmaService } from "@/Ladesa.Management.Application/ensino/turma/application/use-cases/turma.service";
import {
  TurmaAuthzRegistrySetup,
  TurmaTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/turma/infrastructure";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { TurmaGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/TurmaGraphqlResolver";
import { TurmaRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/TurmaRestController";

@Module({
  imports: [AmbienteModule, CursoModule, ImagemModule, ArquivoModule],
  controllers: [TurmaRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaService,
    TurmaGraphqlResolver,
    TurmaAuthzRegistrySetup,
    {
      provide: ITurmaRepository,
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaService],
})
export class TurmaModule {}
