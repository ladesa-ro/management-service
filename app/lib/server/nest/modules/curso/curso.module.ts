import { Module } from "@nestjs/common";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/core/curso";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CursoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CursoRestController } from "./rest/curso.rest.controller";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule, OfertaFormacaoModule],
  controllers: [CursoRestController],
  providers: [
    NestJsPaginateAdapter,
    CursoService,
    {
      provide: CURSO_REPOSITORY_PORT,
      useClass: CursoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CursoService],
})
export class CursoModule {}
