import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { AutorizacaoController } from "@/v2/adapters/in/http/autorizacao/autorizacao.controller";
import { AutorizacaoService } from "@/v2/core/autorizacao/application/use-cases/autorizacao.service";

@Module({
  imports: [PerfilModule],
  controllers: [AutorizacaoController],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
