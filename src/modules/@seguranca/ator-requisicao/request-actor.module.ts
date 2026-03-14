import { Module } from "@nestjs/common";
import { IdentityProviderCoreModule } from "@/modules/@seguranca/provedor-identidade/identity-provider.module";
import { RequestActorResolverAdapter } from "./infrastructure";
import { IRequestActorResolver } from "./ports";

@Module({
  imports: [IdentityProviderCoreModule],
  providers: [
    {
      provide: IRequestActorResolver,
      useClass: RequestActorResolverAdapter,
    },
  ],
  exports: [IRequestActorResolver],
})
export class RequestActorCoreModule {}
