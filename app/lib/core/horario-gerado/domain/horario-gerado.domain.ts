import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type {
  IHorarioGerado,
  IHorarioGeradoCreate,
  IHorarioGeradoUpdate,
} from "./horario-gerado.types";

/**
 * Entidade de Domínio: HorarioGerado
 * Implementa a tipagem IHorarioGerado e adiciona regras de negócio
 */
export class HorarioGerado extends BaseEntity implements IHorarioGerado {
  id!: IdUuid;
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDateTimeString | null;
  vigenciaInicio!: ScalarDateTimeString | null;
  vigenciaFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "HorarioGerado";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de HorarioGerado
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IHorarioGeradoCreate): HorarioGerado {
    const { rules } = this.createValidation();

    const instance = new HorarioGerado();
    instance.status = rules.optional(dados.status);
    instance.tipo = rules.optional(dados.tipo);
    instance.dataGeracao = dados.dataGeracao ?? null;
    instance.vigenciaInicio = dados.vigenciaInicio ?? null;
    instance.vigenciaFim = dados.vigenciaFim ?? null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IHorarioGerado): HorarioGerado {
    const instance = new HorarioGerado();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do horário gerado
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IHorarioGeradoUpdate): void {
    const { rules } = HorarioGerado.createValidation();

    if (dados.status !== undefined) {
      this.status = rules.optional(dados.status);
    }

    if (dados.tipo !== undefined) {
      this.tipo = rules.optional(dados.tipo);
    }

    if (dados.dataGeracao !== undefined) {
      this.dataGeracao = dados.dataGeracao;
    }

    if (dados.vigenciaInicio !== undefined) {
      this.vigenciaInicio = dados.vigenciaInicio;
    }

    if (dados.vigenciaFim !== undefined) {
      this.vigenciaFim = dados.vigenciaFim;
    }

    this.dateUpdated = new Date().toISOString();
  }
}
