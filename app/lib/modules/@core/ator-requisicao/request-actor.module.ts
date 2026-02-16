import { Module } from "@nestjs/common";
import { IdentityProviderCoreModule } from "@/modules/@core/provedor-identidade/identity-provider.module";
import { REQUEST_ACTOR_RESOLVER_PORT } from "./ports";
import { RequestActorResolverAdapter } from "./infrastructure";

@Module({
  imports: [IdentityProviderCoreModule],
  providers: [
    {
      provide: REQUEST_ACTOR_RESOLVER_PORT,
      useClass: RequestActorResolverAdapter,
    },
  ],
  exports: [REQUEST_ACTOR_RESOLVER_PORT],
})
export class RequestActorCoreModule {}
