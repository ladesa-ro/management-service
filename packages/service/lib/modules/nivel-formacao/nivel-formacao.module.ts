import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "./api/nivel-formacao.controller";
import { NivelFormacaoService } from "./domain/nivel-formacao.service";

@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [NivelFormacaoService],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
