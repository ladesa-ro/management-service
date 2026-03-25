import { Module } from "@nestjs/common";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
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
import { AutenticacaoRestController } from "@/modules/acesso/autenticacao/presentation.rest";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";

@Module({
  imports: [UsuarioModule, IdentityProviderModule],
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
