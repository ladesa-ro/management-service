import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { IOfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import type { CalendarioLetivoCreateDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoCreateDto";
import type { CalendarioLetivoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoUpdateDto";

/**
 * Interface que define a estrutura de dados de CalendarioLetivo
 * Tipagem pura sem implementacao de regras
 */
export interface ICalendarioLetivo extends IEntityBase {
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao | null;
}

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

  /**
   * Cria uma nova instancia valida de CalendarioLetivo
   * @throws EntityValidationError se os dados forem invalidos
   */
  static criar(dados: CalendarioLetivoCreateDto): CalendarioLetivo {
    const instance = new CalendarioLetivo();
    instance.nome = dados.nome?.trim() ?? "";
    instance.ano = dados.ano;
    instance.initDates();
    instance.validar();

    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): CalendarioLetivo {
    const instance = new CalendarioLetivo();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = CalendarioLetivo.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.requiredNumber(this.ano, "ano");
    rules.min(this.ano, "ano", 1);
    CalendarioLetivo.throwIfInvalid(result);
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Atualiza os dados do calendario letivo
   * @throws EntityValidationError se os dados forem invalidos
   */
  atualizar(dados: CalendarioLetivoUpdateDto): void {
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
