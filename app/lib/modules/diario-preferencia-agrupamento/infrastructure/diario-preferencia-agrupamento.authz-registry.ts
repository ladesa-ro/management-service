import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DiarioPreferenciaAgrupamentoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "diario_preferencia_agrupamento",
      {
        alias: "diario_preferencia_agrupamento",
        getQueryBuilder: () =>
          this.databaseContext.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
            "diario_preferencia_agrupamento",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
