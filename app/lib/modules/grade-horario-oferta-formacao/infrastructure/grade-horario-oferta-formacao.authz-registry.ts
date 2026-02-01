import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class GradeHorarioOfertaFormacaoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "grade_horario_oferta_formacao",
      {
        alias: "grade_horario_oferta_formacao",
        getQueryBuilder: () =>
          this.databaseContext.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(
            "grade_horario_oferta_formacao",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
