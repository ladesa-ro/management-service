import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "grade_horario_oferta_formacao_intervalo_de_tempo",
      {
        alias: "grade_horario_oferta_formacao_intervalo_de_tempo",
        getQueryBuilder: () =>
          this.databaseContext.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
            "grade_horario_oferta_formacao_intervalo_de_tempo",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
