import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class CampusAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "campus",
      {
        alias: "campus",
        getQueryBuilder: () => this.databaseContext.campusRepository.createQueryBuilder("campus"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
