import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class BlocoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "bloco",
      {
        alias: "bloco",
        getQueryBuilder: () => this.databaseContext.blocoRepository.createQueryBuilder("bloco"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
