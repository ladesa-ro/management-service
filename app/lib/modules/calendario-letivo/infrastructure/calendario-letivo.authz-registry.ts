import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class CalendarioLetivoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "calendario_letivo",
      {
        alias: "calendarioLetivo",
        getQueryBuilder: () =>
          this.databaseContext.calendarioLetivoRepository.createQueryBuilder("calendarioLetivo"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
