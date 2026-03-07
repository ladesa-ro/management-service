import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { TurmaDisponibilidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaDisponibilidadeCreateDto";

/**
 * Entidade de Domínio: TurmaDisponibilidade
 * Entidade de relacionamento N:N entre Turma e Disponibilidade
 */
export class TurmaDisponibilidade extends BaseDatedEntity {
  private constructor(
    public turmaId: IdUuid,
    public disponibilidadeId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "TurmaDisponibilidade";
  }

  static criar(dados: TurmaDisponibilidadeCreateDto): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade(dados.turma.id, dados.disponibilidade.id);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: TurmaDisponibilidade): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade(data.turmaId, data.disponibilidadeId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }
}
