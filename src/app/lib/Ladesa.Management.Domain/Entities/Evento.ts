import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import {
  BaseDatedEntity,
  type ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type {
  CalendarioLetivo,
  ICalendarioLetivo,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type { EventoCreateDto } from "@/Ladesa.Management.Domain/Dtos/EventoCreateDto";
import type { EventoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EventoUpdateDto";
import type { Ambiente, IAmbiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";

/**
 * Interface que define a estrutura de um Evento
 */
export interface IEvento extends IEntityBase {
  nome: string | null;
  rrule: string;
  cor: string | null;
  dataInicio: ScalarDateTimeString | null;
  dataFim: ScalarDateTimeString | null;
  calendario: ICalendarioLetivo;
  ambiente: IAmbiente | null;
}

/**
 * Entidade de Domínio: Evento
 * Implementa a tipagem IEvento e adiciona regras de negócio
 */
export class Evento extends BaseDatedEntity implements IEvento {
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;
  ambiente!: Ambiente | null;

  protected static get entityName(): string {
    return "Evento";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Evento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: EventoCreateDto): Evento {
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

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Evento {
    const instance = new Evento();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Evento.createValidation();
    rules.required(this.rrule, "rrule");
    Evento.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do evento
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: EventoUpdateDto): void {
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
