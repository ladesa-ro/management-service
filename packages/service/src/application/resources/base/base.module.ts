import { IntervaloDeTempoModule } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.module";
import { Module } from "@nestjs/common";
import { ArquivoModule } from "./arquivo/arquivo.module";
import { HealthModule } from "./health/health.module";
import { ImagemArquivoModule } from "./imagem-arquivo/imagem-arquivo.module";
import { ImagemModule } from "./imagem/imagem.module";

@Module({
  imports: [HealthModule, ImagemModule, ArquivoModule, ImagemArquivoModule, IntervaloDeTempoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BaseModule {}
