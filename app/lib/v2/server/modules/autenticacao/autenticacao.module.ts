import { Module } from "@nestjs/common";
import { AutenticacaoService } from "@/v2/core/autenticacao/application/use-cases/autenticacao.service";
import {
  KeycloakModule,
  OpenidConnectModule,
} from "@/v2/old/infrastructure/integrations/identity-provider";
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
