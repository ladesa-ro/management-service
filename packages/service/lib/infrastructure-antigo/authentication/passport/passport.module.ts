import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { RequestActorModule } from "../request-actor";
import { AuthGuardJwt } from "./AuthGuardJwt";
import { AuthSerializer } from "./AuthSerializer";
import { AuthStrategy } from "./AuthStrategy";
import { AuthStrategyAccessToken } from "./AuthStrategyAccessToken";

@Module({
  imports: [
    RequestActorModule,
    PassportModule.register({
      defaultStrategy: AuthStrategy.ACCESS_TOKEN,
    }),
  ],

  providers: [
    AuthStrategyAccessToken,
    AuthSerializer,
    {
      provide: APP_GUARD,
      useClass: AuthGuardJwt,
    },
  ],

  exports: [AuthSerializer],
})
export class AuthenticationPassportModule {}
