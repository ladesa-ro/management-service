import { Module } from "@nestjs/common";
import {
  KeycloakModule,
  OpenidConnectModule,
} from "@/infrastructure/integrations/identity-provider";
import { AutenticacaoService } from "@/v2/core/autenticacao/application/use-cases/autenticacao.service";
import { PerfilModule } from "@/v2/server/modules/perfil";
import { UsuarioModule } from "@/v2/server/modules/usuario";
import { AutenticacaoController } from "./http";

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
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
