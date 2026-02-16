import { Module } from "@nestjs/common";
import { AutorizacaoService } from "@/modules/@acesso/autorizacao";
import { PerfilModule } from "@/server/nest/modules/perfil";

@Module({
  imports: [PerfilModule],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
