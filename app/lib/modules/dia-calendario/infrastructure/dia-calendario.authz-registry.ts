import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DiaCalendarioAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "dia_calendario",
      {
        alias: "diaCalendario",
        getQueryBuilder: () =>
          this.databaseContext.diaCalendarioRepository.createQueryBuilder("diaCalendario"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
