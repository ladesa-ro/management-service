import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { IRequestActorResolver } from "@/domain/abstractions/request-actor";
import { IdentityProviderModule } from "@/infrastructure.identity-provider/identity-provider.module";
import { AccessTokenStrategyAdapter } from "./access-token-strategy.adapter";
import { AuthGuardAdapter } from "./auth-guard.adapter";
import { AuthSerializerAdapter } from "./auth-serializer.adapter";
import { AuthStrategy } from "./auth-strategy.types";
import { RequestActorResolverAdapter } from "./request-actor-resolver.adapter";

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
