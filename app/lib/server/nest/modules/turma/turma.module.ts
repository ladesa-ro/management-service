import { Module } from "@nestjs/common";
import { TURMA_REPOSITORY_PORT } from "@/core/turma/application/ports";
import { TurmaService } from "@/core/turma/application/use-cases/turma.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { TurmaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CursoModule } from "@/server/nest/modules/curso";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { TurmaRestController } from "./rest/turma.rest.controller";

@Module({
  imports: [AmbienteModule, CursoModule, ImagemModule, ArquivoModule],
  controllers: [TurmaRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaService,
    {
      provide: TURMA_REPOSITORY_PORT,
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaService],
})
export class TurmaModule {}
