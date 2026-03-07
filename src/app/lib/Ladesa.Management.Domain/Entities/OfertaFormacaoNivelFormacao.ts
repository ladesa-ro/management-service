import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { OfertaFormacaoNivelFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoCreateDto";

/**
 * Entidade de Domínio: OfertaFormacaoNivelFormacao
 * Entidade de relacionamento N:N entre OfertaFormacao e NivelFormacao
 */
export class OfertaFormacaoNivelFormacao extends BaseDatedEntity {
  private constructor(
    public nivelFormacaoId: IdUuid,
    public ofertaFormacaoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "OfertaFormacaoNivelFormacao";
  }

  static criar(dados: OfertaFormacaoNivelFormacaoCreateDto): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao(
      dados.nivelFormacao.id,
      dados.ofertaFormacao.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: OfertaFormacaoNivelFormacao): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao(data.nivelFormacaoId, data.ofertaFormacaoId);
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
