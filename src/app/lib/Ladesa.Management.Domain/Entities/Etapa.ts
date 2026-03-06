import type { IEntityBase, ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type {
  CalendarioLetivo,
  ICalendarioLetivo,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type { EtapaCreateDto } from "@/Ladesa.Management.Domain/Dtos/EtapaCreateDto";
import type { EtapaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EtapaUpdateDto";

export interface IEtapa extends IEntityBase {
  numero: number | null;
  dataInicio: ScalarDateTimeString;
  dataTermino: ScalarDateTimeString;
  cor: string | null;
  calendario: ICalendarioLetivo;
}

/**
 * Entidade de Domínio: Etapa
 * Implementa a tipagem IEtapa e adiciona regras de negócio
 */
export class Etapa extends BaseDatedEntity implements IEtapa {
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivo;

  protected static get entityName(): string {
    return "Etapa";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Etapa
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: EtapaCreateDto): Etapa {
    const instance = new Etapa();
    instance.dataInicio = dados.dataInicio;
    instance.dataTermino = dados.dataTermino;
    instance.numero = dados.numero ?? null;
    instance.cor = dados.cor?.trim() || null;
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
  static fromData(dados: Record<string, any>): Etapa {
    const instance = new Etapa();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Etapa.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.required(this.dataTermino, "dataTermino");
    rules.dateFormat(this.dataTermino, "dataTermino");
    Etapa.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da etapa
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: EtapaUpdateDto): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataTermino !== undefined) {
      this.dataTermino = dados.dataTermino;
    }

    if (dados.numero !== undefined) {
      this.numero = dados.numero;
    }

    if (dados.cor !== undefined) {
      this.cor = dados.cor?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }
}
