import { Module } from "@nestjs/common";
import { AutorizacaoService } from "@/modules/autorizacao";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { AutorizacaoRestController } from "./rest";

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
  controllers: [AutorizacaoRestController],
  providers: [AutorizacaoService],
  exports: [AutorizacaoService],
})
export class AutorizacaoModule {}
