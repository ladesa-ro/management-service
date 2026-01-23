import { Module } from "@nestjs/common";
import { ModalidadeController } from "./api/modalidade.controller";
import { ModalidadeService } from "./domain/modalidade.service";

@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [ModalidadeService],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
