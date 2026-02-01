import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class CidadeAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "cidade",
      {
        alias: "cidade",
        getQueryBuilder: () => this.databaseContext.cidadeRepository.createQueryBuilder("cidade"),
      },
      { find: true },
    );
  }
}
