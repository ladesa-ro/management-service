import { Module } from "@nestjs/common";
import { EnderecoModule } from "@/v2/core/endereco/endereco.module";
import { CampusController } from "@/v2/adapters/in/http/campus/campus.controller";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [CampusService],
})
export class CampusModule {}
