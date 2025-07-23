import { Module } from "@nestjs/common";
import { IntervaloDeTempoModule } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.module";
import { ArquivoModule } from "./arquivo/arquivo.module";
import { HealthModule } from "./health/health.module";
import { ImagemModule } from "./imagem/imagem.module";
import { ImagemArquivoModule } from "./imagem-arquivo/imagem-arquivo.module";

@Module({
  imports: [HealthModule, ImagemModule, ArquivoModule, ImagemArquivoModule, IntervaloDeTempoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BaseModule {}
