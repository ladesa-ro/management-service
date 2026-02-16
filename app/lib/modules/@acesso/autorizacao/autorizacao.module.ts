import { Module } from "@nestjs/common";
import { AutorizacaoService } from "@/modules/@acesso/autorizacao";
import { PerfilModule } from "@/modules/@acesso/perfil/perfil.module";

@Module({
  imports: [PerfilModule],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
