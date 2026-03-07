import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { GradeHorarioOfertaFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoCreateDto";

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacao
 * Representa uma grade horária associada a uma oferta de formação e um campus
 */
export class GradeHorarioOfertaFormacao extends BaseDatedEntity {
  private constructor(
    public campusId: IdUuid,
    public ofertaFormacaoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "GradeHorarioOfertaFormacao";
  }

  static criar(dados: GradeHorarioOfertaFormacaoCreateDto): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao(dados.campus.id, dados.ofertaFormacao.id);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: GradeHorarioOfertaFormacao): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao(data.campusId, data.ofertaFormacaoId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }
}
