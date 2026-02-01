import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DiarioAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "diario",
      {
        alias: "diario",
        getQueryBuilder: () => this.databaseContext.diarioRepository.createQueryBuilder("diario"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
