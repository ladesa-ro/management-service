import { Global, Module } from "@nestjs/common";
import { RESOURCE_AUTHZ_REGISTRY, ResourceAuthzRegistry } from "./infrastructure";
import { ResolveAccessContextPipe } from "./infrastructure/pipes";

@Global()
@Module({
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
