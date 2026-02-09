import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Ambiente } from "@/modules/ambiente/domain/ambiente.domain";
import type { CalendarioLetivo } from "@/modules/calendario-letivo";
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
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Evento.createValidation();
    rules.required(this.rrule, "rrule");
    Evento.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Evento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEventoCreate): Evento {
    const instance = new Evento();
    instance.rrule = dados.rrule?.trim() ?? "";
    instance.nome = dados.nome?.trim() || null;
    instance.cor = dados.cor?.trim() || null;
    instance.dataInicio = dados.dataInicio ?? null;
    instance.dataFim = dados.dataFim ?? null;
    instance.ambiente = null;
    instance.initDates();
    instance.validar();

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
    if (dados.rrule !== undefined) {
      this.rrule = dados.rrule?.trim() ?? "";
    }

    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() || null;
    }

    if (dados.cor !== undefined) {
      this.cor = dados.cor?.trim() || null;
    }

    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    this.touchUpdated();
    this.validar();
  }
}
