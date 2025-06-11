import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "./nivel-formacao.controller";
import { NivelFormacaoService } from "./nivel-formacao.service";

@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [NivelFormacaoService],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
