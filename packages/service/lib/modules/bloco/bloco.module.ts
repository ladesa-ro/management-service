import { Module } from "@nestjs/common";
import { CampusModule } from "../campus/campus.module";
import { BlocoController } from "./api/bloco.controller";
import { BlocoResolver } from "./bloco.resolver";
import { BlocoService } from "./domain/bloco.service";

@Module({
  imports: [CampusModule],
  controllers: [BlocoController],
  providers: [BlocoService, BlocoResolver],
  exports: [BlocoService],
})
export class BlocoModule {
}
