import { Module } from "@nestjs/common";
import { AutorizacaoController } from "@/v2/adapters/in/http/autorizacao/autorizacao.controller";
import { AutorizacaoService } from "@/v2/core/autorizacao/application/use-cases/autorizacao.service";
import { PerfilModule } from "@/v2/server/modules/perfil.module";

/**
 * Módulo NestJS para Autorizacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller e service
 */
@Module({
  imports: [PerfilModule],
  controllers: [AutorizacaoController],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
