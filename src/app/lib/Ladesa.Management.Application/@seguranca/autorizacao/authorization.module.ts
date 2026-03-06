import { Global, Module } from "@nestjs/common";
import { AccessContextCoreModule } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { AUTHORIZATION_SERVICE_PORT } from "@/Ladesa.Management.Application/@shared";
import { AuthorizationServiceAdapter } from "./infrastructure";

/**
 * Módulo global de autorização.
 *
 * Fornece o serviço de autorização para toda a aplicação,
 * permitindo que os services do core layer verifiquem permissões
 * através do port IAuthorizationServicePort.
 */
@Global()
@Module({
  imports: [AccessContextCoreModule],
  providers: [
    {
      provide: AUTHORIZATION_SERVICE_PORT,
      useClass: AuthorizationServiceAdapter,
    },
    AuthorizationServiceAdapter,
  ],
  exports: [AUTHORIZATION_SERVICE_PORT, AuthorizationServiceAdapter],
})
export class AuthorizationCoreModule {}
