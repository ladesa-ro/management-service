import { Module } from "@nestjs/common";
import { AMBIENTE_REPOSITORY_PORT } from "@/core/ambiente/application/ports";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { BlocoModule } from "@/server/nest/modules/bloco";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { AmbienteTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { AmbienteRestController } from "./rest/ambiente.rest.controller";

@Module({
  imports: [BlocoModule, ImagemModule, ArquivoModule],
  controllers: [AmbienteRestController],
  providers: [
    NestJsPaginateAdapter,
    AmbienteService,
    {
      provide: AMBIENTE_REPOSITORY_PORT,
      useClass: AmbienteTypeOrmRepositoryAdapter,
    },
  ],
  exports: [AmbienteService],
})
export class AmbienteModule {}
