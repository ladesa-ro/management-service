import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { DiarioProfessorCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorCreateDto";
import type { DiarioProfessorUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorUpdateDto";

/**
 * Entidade de Domínio: DiarioProfessor
 * Implementa a tipagem IDiarioProfessor e adiciona regras de negócio
 */
export class DiarioProfessor extends BaseDatedEntity {
  private constructor(
    public situacao: boolean,
    public diarioId: IdUuid,
    public perfilId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "DiarioProfessor";
  }

  static criar(dados: DiarioProfessorCreateDto): DiarioProfessor {
    const instance = new DiarioProfessor(dados.situacao, dados.diario.id, dados.perfil.id);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: DiarioProfessor): DiarioProfessor {
    const instance = new DiarioProfessor(data.situacao, data.diarioId, data.perfilId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Sem validações de campos escalares
  }

  atualizar(dados: DiarioProfessorUpdateDto): void {
    if (dados.situacao !== undefined) {
      this.situacao = dados.situacao;
    }

    this.touchUpdated();
    this.validar();
  }
}
