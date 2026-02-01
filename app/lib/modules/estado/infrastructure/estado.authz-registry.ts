import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

/**
 * Registra as ações de autorização do recurso Estado.
 */
@Injectable()
export class EstadoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "estado",
      {
        alias: "estado",
        getQueryBuilder: () => this.databaseContext.estadoRepository.createQueryBuilder("estado"),
      },
      { find: true },
    );
  }
}
