import { Module } from "@nestjs/common";
import { CidadeController } from "./cidade.controller";
import { CidadeResolver } from "./cidade.resolver";
import { CidadeService } from "./cidade.service";

@Module({
  imports: [],
  providers: [CidadeService, CidadeResolver],
  exports: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
