import { Module } from "@nestjs/common";
import { KeycloakModule, OpenidConnectModule } from "@/modules/@core/identity-provider";
import { AutenticacaoService } from "@/modules/autenticacao";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { UsuarioModule } from "@/server/nest/modules/usuario";
import { AutenticacaoRestController } from "./rest";

/**
 * Módulo NestJS para Autenticacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller e service
 */
@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoRestController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
