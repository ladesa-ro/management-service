import { Module } from "@nestjs/common";
import { EnderecoService } from "./domain/endereco.service";
import { EnderecoResolver } from "./endereco.resolver";

@Module({
  imports: [],
  controllers: [],
  providers: [EnderecoService, EnderecoResolver],
  exports: [EnderecoService],
})
export class EnderecoModule {}
