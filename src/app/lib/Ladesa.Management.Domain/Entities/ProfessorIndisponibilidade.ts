import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ProfessorIndisponibilidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeCreateDto";
import type { ProfessorIndisponibilidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeUpdateDto";

/**
 * Entidade de Domínio: ProfessorIndisponibilidade
 * Implementa a tipagem IProfessorIndisponibilidade e adiciona regras de negócio
 */
export class ProfessorIndisponibilidade extends BaseDatedEntity {
  private constructor(
    public diaDaSemana: number,
    public horaInicio: string,
    public horaFim: string,
    public motivo: string,
    public perfilId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "ProfessorIndisponibilidade";
  }

  static criar(dados: ProfessorIndisponibilidadeCreateDto): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade(
      dados.diaDaSemana,
      dados.horaInicio,
      dados.horaFim,
      dados.motivo,
      dados.perfil.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: ProfessorIndisponibilidade): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade(
      data.diaDaSemana,
      data.horaInicio,
      data.horaFim,
      data.motivo,
      data.perfilId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = ProfessorIndisponibilidade.createValidation();
    rules.requiredNumber(this.diaDaSemana, "diaDaSemana");
    rules.range(this.diaDaSemana, "diaDaSemana", 0, 6);
    rules.required(this.horaInicio, "horaInicio");
    rules.timeFormat(this.horaInicio, "horaInicio");
    rules.required(this.horaFim, "horaFim");
    rules.timeFormat(this.horaFim, "horaFim");
    rules.required(this.motivo, "motivo");
    ProfessorIndisponibilidade.throwIfInvalid(result);
  }

  atualizar(dados: ProfessorIndisponibilidadeUpdateDto): void {
    if (dados.diaDaSemana !== undefined) {
      this.diaDaSemana = dados.diaDaSemana;
    }

    if (dados.horaInicio !== undefined) {
      this.horaInicio = dados.horaInicio;
    }

    if (dados.horaFim !== undefined) {
      this.horaFim = dados.horaFim;
    }

    if (dados.motivo !== undefined) {
      this.motivo = dados.motivo;
    }

    this.touchUpdated();
    this.validar();
  }
}
