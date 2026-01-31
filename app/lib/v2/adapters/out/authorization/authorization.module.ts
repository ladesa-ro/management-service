import { Global, Module } from "@nestjs/common";
import { AUTHORIZATION_SERVICE_PORT } from "@/core/@shared";
import { AuthorizationServiceAdapter } from "./authorization-service.adapter";

/**
 * Módulo global de autorização.
 *
 * Fornece o serviço de autorização para toda a aplicação,
 * permitindo que os services do core layer verifiquem permissões
 * através do port IAuthorizationServicePort.
 */
@Global()
@Module({
  providers: [
    {
      provide: AUTHORIZATION_SERVICE_PORT,
      useClass: AuthorizationServiceAdapter,
    },
    AuthorizationServiceAdapter,
  ],
  exports: [AUTHORIZATION_SERVICE_PORT, AuthorizationServiceAdapter],
})
export class AuthorizationModule {}
