import { Module } from "@nestjs/common";
import { EnderecoModule } from "@/modules/endereco/endereco.module";
import { CampusController } from "./api/campus.controller";
import { CampusResolver } from "./campus.resolver";
import { CampusService } from "./domain/campus.service";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [CampusService, CampusResolver],
  exports: [CampusService],
})
export class CampusModule {
}
