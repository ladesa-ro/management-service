import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class AulaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "aula",
      {
        alias: "aula",
        getQueryBuilder: () => this.databaseContext.aulaRepository.createQueryBuilder("aula"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
