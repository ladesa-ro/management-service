import { Module } from "@nestjs/common";
import { ModalidadeController } from "@/v2/adapters/in/http/modalidade/modalidade.controller";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";

@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [ModalidadeService],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
