import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { AutorizacaoController } from "./api/autorizacao.controller";
import { AutorizacaoService } from "./domain/autorizacao.service";

@Module({
  imports: [PerfilModule],
  controllers: [AutorizacaoController],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
