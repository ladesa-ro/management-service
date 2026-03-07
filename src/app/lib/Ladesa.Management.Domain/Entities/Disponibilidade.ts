import {
  BaseDatedEntity,
  type ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type { DisponibilidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeCreateDto";
import type { DisponibilidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeUpdateDto";

/**
 * Entidade de Domínio: Disponibilidade
 * Implementa a tipagem IDisponibilidade e adiciona regras de negócio
 */
export class Disponibilidade extends BaseDatedEntity {
  private constructor(
    public dataInicio: ScalarDateTimeString,
    public dataFim: ScalarDateTimeString | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Disponibilidade";
  }

  static criar(dados: DisponibilidadeCreateDto): Disponibilidade {
    const instance = new Disponibilidade(dados.dataInicio, dados.dataFim ?? null);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Disponibilidade): Disponibilidade {
    const instance = new Disponibilidade(data.dataInicio, data.dataFim);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Disponibilidade.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    Disponibilidade.throwIfInvalid(result);
  }

  atualizar(dados: DisponibilidadeUpdateDto): void {
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
