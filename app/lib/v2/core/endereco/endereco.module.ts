import { Module } from "@nestjs/common";
import { EnderecoService } from "@/v2/core/endereco/application/use-cases/endereco.service";

@Module({
  imports: [],
  controllers: [],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
