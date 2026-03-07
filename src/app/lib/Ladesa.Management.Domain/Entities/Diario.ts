import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { DiarioCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioCreateDto";
import type { DiarioUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioUpdateDto";

/**
 * Entidade de Domínio: Diario
 * Implementa a tipagem IDiario e adiciona regras de negócio
 */
export class Diario extends BaseDatedEntity {
  private constructor(
    public ativo: boolean,
    public calendarioLetivoId: IdUuid,
    public turmaId: IdUuid,
    public disciplinaId: IdUuid,
    public ambientePadraoId: IdUuid | null,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Diario";
  }

  static criar(dados: DiarioCreateDto): Diario {
    const instance = new Diario(
      dados.ativo ?? true,
      dados.calendarioLetivo.id,
      dados.turma.id,
      dados.disciplina.id,
      dados.ambientePadrao?.id ?? null,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Diario): Diario {
    const instance = new Diario(
      data.ativo,
      data.calendarioLetivoId,
      data.turmaId,
      data.disciplinaId,
      data.ambientePadraoId,
      data.imagemCapaId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Sem validações de campos escalares
  }

  atualizar(dados: DiarioUpdateDto): void {
    if (dados.ativo !== undefined) {
      this.ativo = dados.ativo;
    }

    this.touchUpdated();
    this.validar();
  }

  override isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  ativar(): void {
    this.ativo = true;
    this.touchUpdated();
  }

  desativar(): void {
    this.ativo = false;
    this.touchUpdated();
  }
}
