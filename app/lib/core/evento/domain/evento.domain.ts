import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { Ambiente } from "@/core/ambiente/domain/ambiente.domain";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type { IEvento, IEventoCreate, IEventoUpdate } from "./evento.types";

/**
 * Entidade de Domínio: Evento
 * Implementa a tipagem IEvento e adiciona regras de negócio
 */
export class Evento extends BaseEntity implements IEvento {
  id!: IdUuid;
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;
  ambiente!: Ambiente | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Evento";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Evento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEventoCreate): Evento {
    const { result, rules } = this.createValidation();

    const instance = new Evento();
    instance.rrule = rules.required(dados.rrule, "rrule");

    this.throwIfInvalid(result);

    instance.nome = rules.optional(dados.nome);
    instance.cor = rules.optional(dados.cor);
    instance.dataInicio = dados.dataInicio ?? null;
    instance.dataFim = dados.dataFim ?? null;
    instance.ambiente = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IEvento): Evento {
    const instance = new Evento();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do evento
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IEventoUpdate): void {
    const { result, rules } = Evento.createValidation();

    if (dados.rrule !== undefined) {
      this.rrule = rules.required(dados.rrule, "rrule");
    }

    if (dados.nome !== undefined) {
      this.nome = rules.optional(dados.nome);
    }

    if (dados.cor !== undefined) {
      this.cor = rules.optional(dados.cor);
    }

    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    Evento.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
