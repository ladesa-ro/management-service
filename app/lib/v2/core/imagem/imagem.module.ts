import { Global, Module } from "@nestjs/common";
import { ArquivoModule } from "../arquivo/arquivo.module";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";

@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [ImagemService],
  exports: [ImagemService],
})
export class ImagemModule {}
