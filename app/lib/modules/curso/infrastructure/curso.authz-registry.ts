import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class CursoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "curso",
      {
        alias: "curso",
        getQueryBuilder: () => this.databaseContext.cursoRepository.createQueryBuilder("curso"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
