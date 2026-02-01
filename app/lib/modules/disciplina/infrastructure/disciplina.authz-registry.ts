import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DisciplinaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "disciplina",
      {
        alias: "disciplina",
        getQueryBuilder: () =>
          this.databaseContext.disciplinaRepository.createQueryBuilder("disciplina"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
