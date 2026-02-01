import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class AmbienteAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "ambiente",
      {
        alias: "ambiente",
        getQueryBuilder: () =>
          this.databaseContext.ambienteRepository.createQueryBuilder("ambiente"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
