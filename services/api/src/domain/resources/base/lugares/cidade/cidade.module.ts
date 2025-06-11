import { Module } from "@nestjs/common";
import { CidadeController } from "./cidade.controller";
import { CidadeService } from "./cidade.service";

@Module({
  imports: [],
  providers: [CidadeService],
  exports: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
