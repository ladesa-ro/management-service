import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class EtapaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "etapa",
      {
        alias: "etapa",
        getQueryBuilder: () => this.databaseContext.etapaRepository.createQueryBuilder("etapa"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
