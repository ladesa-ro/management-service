import { BaseDatedEntity } from "@/modules/@shared";
import type { NivelFormacao } from "@/modules/nivel-formacao/domain/nivel-formacao.domain";
import type { OfertaFormacao } from "@/modules/oferta-formacao/domain/oferta-formacao.domain";
import type {
  IOfertaFormacaoNivelFormacao,
  IOfertaFormacaoNivelFormacaoCreate,
} from "./oferta-formacao-nivel-formacao.types";

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

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de OfertaFormacaoNivelFormacao
   */
  static criar(_dados: IOfertaFormacaoNivelFormacaoCreate): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao();
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }
}
