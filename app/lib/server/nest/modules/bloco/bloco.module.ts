import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { BLOCO_REPOSITORY_PORT } from "@/modules/bloco/application/ports";
import { BlocoService } from "@/modules/bloco/application/use-cases/bloco.service";
import { BlocoTypeOrmRepositoryAdapter } from "@/modules/bloco/infrastructure/persistence/typeorm";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
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
