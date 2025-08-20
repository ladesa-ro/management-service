import { Module } from "@nestjs/common";
import { EnderecoModule } from "@/modules/endereco/endereco.module";
import { CampusController } from "./api/campus.controller";
import { CampusService } from "./domain/campus.service";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [CampusService],
})
export class CampusModule {}
