import { Module } from "@nestjs/common";
import { EnderecoModule } from "../../base/lugares/endereco/endereco.module";
import { CampusController } from "./campus.controller";
import { CampusService } from "./campus.service";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [CampusService],
})
export class CampusModule {}
