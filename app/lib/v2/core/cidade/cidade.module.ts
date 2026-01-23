import { Module } from "@nestjs/common";
import { CidadeController } from "@/v2/core/cidade/api/cidade.controller";
import { CidadeService } from "./domain/cidade.service";

@Module({
  imports: [],
  providers: [CidadeService],
  exports: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
