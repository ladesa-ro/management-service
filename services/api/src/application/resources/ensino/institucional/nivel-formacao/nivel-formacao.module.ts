import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "./nivel-formacao.controller";
import { NivelFormacaoResolver } from "./nivel-formacao.resolver";
import { NivelFormacaoService } from "./nivel-formacao.service";

@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [NivelFormacaoService, NivelFormacaoResolver],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
