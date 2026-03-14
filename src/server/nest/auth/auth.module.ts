import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { IRequestActorResolver } from "@/domain/abstractions/request-actor";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { AccessTokenStrategyAdapter } from "./passport/access-token-strategy.adapter";
import { AuthGuardAdapter } from "./passport/auth-guard.adapter";
import { AuthSerializerAdapter } from "./passport/auth-serializer.adapter";
import { RequestActorResolverAdapter } from "./request-actor/request-actor-resolver.adapter";
import { AuthStrategy } from "./types/auth-strategy.types";

@Module({
  imports: [
    IdentityProviderModule,
    PassportModule.register({
      defaultStrategy: AuthStrategy.ACCESS_TOKEN,
    }),
  ],
  providers: [
    AccessTokenStrategyAdapter,
    AuthSerializerAdapter,
    RequestActorResolverAdapter,
    {
      provide: IRequestActorResolver,
      useExisting: RequestActorResolverAdapter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuardAdapter,
    },
  ],
  exports: [IRequestActorResolver, AuthSerializerAdapter],
})
export class AuthModule {}
