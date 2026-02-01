import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class TurmaDisponibilidadeAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "turma_disponibilidade",
      {
        alias: "turma_disponibilidade",
        getQueryBuilder: () =>
          this.databaseContext.turmaDisponibilidadeRepository.createQueryBuilder(
            "turma_disponibilidade",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
