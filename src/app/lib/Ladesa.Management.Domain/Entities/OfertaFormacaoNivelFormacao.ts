import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { OfertaFormacaoNivelFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoCreateDto";
import type {
  INivelFormacao,
  NivelFormacao,
} from "@/Ladesa.Management.Domain/Entities/NivelFormacao";
import type {
  IOfertaFormacao,
  OfertaFormacao,
} from "@/Ladesa.Management.Domain/Entities/OfertaFormacao";

export interface IOfertaFormacaoNivelFormacao extends IEntityBase {
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
}

/**
 * Entidade de Domínio: OfertaFormacaoNivelFormacao
 * Entidade de relacionamento N:N entre OfertaFormacao e NivelFormacao
 */
export class OfertaFormacaoNivelFormacao
  extends BaseDatedEntity
  implements IOfertaFormacaoNivelFormacao
{
  nivelFormacao!: NivelFormacao;
  ofertaFormacao!: OfertaFormacao;

  protected static get entityName(): string {
    return "OfertaFormacaoNivelFormacao";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de OfertaFormacaoNivelFormacao
   */
  static criar(_dados: OfertaFormacaoNivelFormacaoCreateDto): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao();
    instance.initDates();
    instance.validar();
    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }
}
