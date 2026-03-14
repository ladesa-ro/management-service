import { Global, Module } from "@nestjs/common";
import { AccessContextCoreModule } from "@/modules/@seguranca/contexto-acesso";
import { IAuthorizationService } from "@/modules/@shared";
import { AuthorizationServiceAdapter } from "./infrastructure";

/**
 * Módulo global de autorização.
 *
 * Fornece o serviço de autorização para toda a aplicação,
 * permitindo que os services do core layer verifiquem permissões
 * através do port IAuthorizationService.
 */
@Global()
@Module({
  imports: [AccessContextCoreModule],
  providers: [
    {
      provide: IAuthorizationService,
      useClass: AuthorizationServiceAdapter,
    },
    AuthorizationServiceAdapter,
  ],
  exports: [IAuthorizationService, AuthorizationServiceAdapter],
})
export class AuthorizationCoreModule {}
