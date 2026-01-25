import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "@/v2/adapters/in/http/nivel-formacao/nivel-formacao.controller";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";

@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [NivelFormacaoService],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
