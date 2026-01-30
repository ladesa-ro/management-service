import { Module } from "@nestjs/common";
import { BLOCO_REPOSITORY_PORT } from "@/core/bloco/application/ports";
import { BlocoService } from "@/core/bloco/application/use-cases/bloco.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { BlocoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { BlocoRestController } from "./rest/bloco.rest.controller";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoRestController],
  providers: [
    NestJsPaginateAdapter,
    BlocoService,
    {
      provide: BLOCO_REPOSITORY_PORT,
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [BlocoService],
})
export class BlocoModule {}
