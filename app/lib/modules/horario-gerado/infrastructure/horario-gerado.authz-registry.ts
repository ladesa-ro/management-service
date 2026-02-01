import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class HorarioGeradoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "horario_gerado",
      {
        alias: "horario_gerado",
        getQueryBuilder: () =>
          this.databaseContext.horarioGeradoRepository.createQueryBuilder("horario_gerado"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
