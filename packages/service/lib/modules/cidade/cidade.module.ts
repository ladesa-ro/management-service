import { Module } from "@nestjs/common";
import { CidadeController } from "@/modules/cidade/api/cidade.controller";
import { CidadeService } from "./domain/cidade.service";

@Module({
  imports: [],
  providers: [CidadeService],
  exports: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
