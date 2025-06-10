import { Module } from "@nestjs/common";
import { EnderecoResolver } from "./endereco.resolver";
import { EnderecoService } from "./endereco.service";

@Module({
  imports: [],
  controllers: [],
  providers: [EnderecoService, EnderecoResolver],
  exports: [EnderecoService],
})
export class EnderecoModule {}
