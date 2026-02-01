import { Global, Module } from "@nestjs/common";
import { RequestActorCoreModule } from "@/modules/@core/request-actor";
import { RESOURCE_AUTHZ_REGISTRY, ResourceAuthzRegistry } from "./infrastructure";
import { ResolveAccessContextPipe } from "./infrastructure/pipes";

/**
 * Módulo core para AccessContext.
 * Fornece o pipe e registry para autorização.
 */
@Global()
@Module({
  imports: [RequestActorCoreModule],
  providers: [
    ResolveAccessContextPipe,
    {
      provide: RESOURCE_AUTHZ_REGISTRY,
      useClass: ResourceAuthzRegistry,
    },
  ],
  exports: [ResolveAccessContextPipe, RESOURCE_AUTHZ_REGISTRY],
})
export class AccessContextCoreModule {}
