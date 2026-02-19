import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { RequestActorCoreModule } from "@/modules/@seguranca/ator-requisicao";
import { AuthStrategy } from "./domain";
import {
  AccessTokenStrategyAdapter,
  AuthGuardAdapter,
  AuthSerializerAdapter,
} from "./infrastructure";

/**
 * Módulo de autenticação.
 * Configura Passport com estratégia de Bearer Token.
 */
@Module({
  imports: [
    RequestActorCoreModule,
    PassportModule.register({
      defaultStrategy: AuthStrategy.ACCESS_TOKEN,
    }),
  ],
  providers: [
    AccessTokenStrategyAdapter,
    AuthSerializerAdapter,
    {
      provide: APP_GUARD,
      useClass: AuthGuardAdapter,
    },
  ],
  exports: [AuthSerializerAdapter],
})
export class AuthenticationCoreModule {}
