import { Module } from "@nestjs/common";
import { KeycloakModule, OpenidConnectModule } from "@/modules/@seguranca/provedor-identidade";
import {
  AutenticacaoDefinirSenhaCommandHandlerImpl,
  AutenticacaoLoginCommandHandlerImpl,
  AutenticacaoRecoverPasswordCommandHandlerImpl,
  AutenticacaoRefreshCommandHandlerImpl,
} from "@/modules/acesso/autenticacao/application/commands";
import { AutenticacaoWhoAmIQueryHandlerImpl } from "@/modules/acesso/autenticacao/application/queries";
import {
  IAutenticacaoDefinirSenhaCommandHandler,
  IAutenticacaoLoginCommandHandler,
  IAutenticacaoRecoverPasswordCommandHandler,
  IAutenticacaoRefreshCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands";
import { IAutenticacaoWhoAmIQueryHandler } from "@/modules/acesso/autenticacao/domain/queries";
import { AutenticacaoRestController } from "@/modules/acesso/autenticacao/presentation/rest";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";

/**
 * Módulo NestJS para Autenticacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller e handlers
 */
@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoRestController],
  providers: [
    // Commands
    { provide: IAutenticacaoLoginCommandHandler, useClass: AutenticacaoLoginCommandHandlerImpl },
    {
      provide: IAutenticacaoRefreshCommandHandler,
      useClass: AutenticacaoRefreshCommandHandlerImpl,
    },
    {
      provide: IAutenticacaoDefinirSenhaCommandHandler,
      useClass: AutenticacaoDefinirSenhaCommandHandlerImpl,
    },
    {
      provide: IAutenticacaoRecoverPasswordCommandHandler,
      useClass: AutenticacaoRecoverPasswordCommandHandlerImpl,
    },
    // Queries
    { provide: IAutenticacaoWhoAmIQueryHandler, useClass: AutenticacaoWhoAmIQueryHandlerImpl },
  ],
  exports: [],
})
export class AutenticacaoModule {}
