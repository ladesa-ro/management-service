import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { TURMA_REPOSITORY_PORT } from "@/modules/turma/application/ports";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";
import { TurmaTypeOrmRepositoryAdapter } from "@/modules/turma/infrastructure/persistence/typeorm";
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
