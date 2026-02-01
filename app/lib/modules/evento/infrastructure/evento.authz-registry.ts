import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class EventoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "evento",
      {
        alias: "evento",
        getQueryBuilder: () => this.databaseContext.eventoRepository.createQueryBuilder("evento"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
