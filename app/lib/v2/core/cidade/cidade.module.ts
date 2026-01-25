import { Module } from "@nestjs/common";
import { CidadeController } from "@/v2/adapters/in/http/cidade/cidade.controller";
import { CidadeService } from "@/v2/core/cidade/application/use-cases/cidade.service";

@Module({
  imports: [],
  providers: [CidadeService],
  exports: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule {}
