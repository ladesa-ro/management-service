import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DiarioProfessorAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "diario_professor",
      {
        alias: "diario_professor",
        getQueryBuilder: () =>
          this.databaseContext.diarioProfessorRepository.createQueryBuilder("diario_professor"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
