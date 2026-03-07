import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import {
  BaseDatedEntity,
  type ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type { HorarioGeradoCreateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoCreateDto";
import type { HorarioGeradoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoUpdateDto";

/**
 * Entidade de Domínio: HorarioGerado
 * Implementa a tipagem IHorarioGerado e adiciona regras de negócio
 */
export class HorarioGerado extends BaseDatedEntity {
  private constructor(
    public status: string | null,
    public tipo: string | null,
    public dataGeracao: ScalarDateTimeString | null,
    public vigenciaInicio: ScalarDateTimeString | null,
    public vigenciaFim: ScalarDateTimeString | null,
    public calendarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "HorarioGerado";
  }

  static criar(dados: HorarioGeradoCreateDto): HorarioGerado {
    const instance = new HorarioGerado(
      dados.status?.trim() || null,
      dados.tipo?.trim() || null,
      dados.dataGeracao ?? null,
      dados.vigenciaInicio ?? null,
      dados.vigenciaFim ?? null,
      dados.calendario.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: HorarioGerado): HorarioGerado {
    const instance = new HorarioGerado(
      data.status,
      data.tipo,
      data.dataGeracao,
      data.vigenciaInicio,
      data.vigenciaFim,
      data.calendarioId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Campos são opcionais, sem validações obrigatórias
  }

  atualizar(dados: HorarioGeradoUpdateDto): void {
    if (dados.status !== undefined) {
      this.status = dados.status?.trim() || null;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo?.trim() || null;
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

    this.touchUpdated();
    this.validar();
  }
}
