import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class TurmaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "turma",
      {
        alias: "turma",
        getQueryBuilder: () => this.databaseContext.turmaRepository.createQueryBuilder("turma"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
