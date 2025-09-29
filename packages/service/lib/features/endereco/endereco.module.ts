import { Module } from "@nestjs/common";
import { EnderecoRepositoryProvider } from "@/features/endereco/infrastructure";
import { EnderecoApplicationService } from "./application/services/endereco.application.service";

@Module({
  imports: [],
  controllers: [],
  providers: [EnderecoApplicationService, EnderecoRepositoryProvider],
  exports: [EnderecoApplicationService],
})
export class EnderecoModule {
}
