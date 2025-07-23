import { Module } from "@nestjs/common";
import { CidadeModule } from "./cidade/cidade.module";
import { EnderecoModule } from "./endereco/endereco.module";
import { EstadoModule } from "./estado/estado.module";

@Module({
  imports: [EstadoModule, CidadeModule, EnderecoModule],
})
export class BaseLugaresModule {}
