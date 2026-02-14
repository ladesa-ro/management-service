import { BaseDatedEntity } from "@/modules/@shared";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import type { ICampus } from "@/modules/sisgea/campus";
import type {
  ICalendarioLetivo,
  ICalendarioLetivoCreate,
  ICalendarioLetivoUpdate,
} from "./calendario-letivo.types";

/**
 * Entidade de Dominio: CalendarioLetivo
 * Implementa a tipagem ICalendarioLetivo e adiciona regras de negocio
 */
export class CalendarioLetivo extends BaseDatedEntity implements ICalendarioLetivo {
  nome!: string;
  ano!: number;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;

  protected static get entityName(): string {
    return "CalendarioLetivo";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = CalendarioLetivo.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.requiredNumber(this.ano, "ano");
    rules.min(this.ano, "ano", 1);
    CalendarioLetivo.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de CalendarioLetivo
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: ICalendarioLetivoCreate): CalendarioLetivo {
    const instance = new CalendarioLetivo();
    instance.nome = dados.nome?.trim() ?? "";
    instance.ano = dados.ano;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): CalendarioLetivo {
    const instance = new CalendarioLetivo();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados do calendario letivo
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: ICalendarioLetivoUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.ano !== undefined) {
      this.ano = dados.ano;
    }

    this.touchUpdated();
    this.validar();
  }
}
