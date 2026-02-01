import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class HorarioGeradoAulaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "horario_gerado_aula",
      {
        alias: "horario_gerado_aula",
        getQueryBuilder: () =>
          this.databaseContext.horarioGeradoAulaRepository.createQueryBuilder(
            "horario_gerado_aula",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
