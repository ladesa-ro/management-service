import { Module } from "@nestjs/common";
import { EnderecoService } from "./domain/endereco.service";

@Module({
  imports: [],
  controllers: [],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
