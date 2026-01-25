import { Module } from "@nestjs/common";
import { CampusModule } from "../campus/campus.module";
import { BlocoController } from "@/v2/adapters/in/http/bloco/bloco.controller";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";

@Module({
  imports: [CampusModule],
  controllers: [BlocoController],
  providers: [BlocoService],
  exports: [BlocoService],
})
export class BlocoModule {}
