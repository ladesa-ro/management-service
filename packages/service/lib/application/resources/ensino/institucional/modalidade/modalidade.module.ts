import { Module } from "@nestjs/common";
import { ModalidadeController } from "./modalidade.controller";
import { ModalidadeResolver } from "./modalidade.resolver";
import { ModalidadeService } from "./modalidade.service";

@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [ModalidadeService, ModalidadeResolver],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
