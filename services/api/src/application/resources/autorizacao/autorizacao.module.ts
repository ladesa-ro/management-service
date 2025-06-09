import { Module } from "@nestjs/common";
import { AutorizacaoController } from "./autorizacao.controller";
import { AutorizacaoService } from "./autorizacao.service";
import { PerfilModule } from "./perfil/perfil.module";

@Module({
  imports: [PerfilModule],
  controllers: [AutorizacaoController],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
