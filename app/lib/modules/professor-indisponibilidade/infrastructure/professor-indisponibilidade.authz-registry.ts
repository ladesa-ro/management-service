import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

/**
 * Registra as ações de autorização do recurso Professor Disponibilidade.
 * Nota: A ação é "professor_disponibilidade:*" mas usa professorIndisponibilidadeRepository.
 */
@Injectable()
export class ProfessorIndisponibilidadeAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "professor_disponibilidade",
      {
        alias: "professor_indisponibilidade",
        getQueryBuilder: () =>
          this.databaseContext.professorIndisponibilidadeRepository.createQueryBuilder(
            "professor_indisponibilidade",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
