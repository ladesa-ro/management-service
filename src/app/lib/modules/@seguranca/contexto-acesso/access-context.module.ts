import { Global, Module } from "@nestjs/common";
import { RequestActorCoreModule } from "@/modules/@seguranca/ator-requisicao";
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
    ResourceAuthzRegistry,
    {
      provide: RESOURCE_AUTHZ_REGISTRY,
      useExisting: ResourceAuthzRegistry,
    },
  ],
  exports: [ResolveAccessContextPipe, ResourceAuthzRegistry, RESOURCE_AUTHZ_REGISTRY],
})
export class AccessContextCoreModule {}
