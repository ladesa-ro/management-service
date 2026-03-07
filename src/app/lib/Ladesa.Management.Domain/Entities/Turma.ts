import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { TurmaCreateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaCreateDto";
import type { TurmaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaUpdateDto";

/**
 * Entidade de Domínio: Turma
 * Implementa a tipagem ITurma e adiciona regras de negócio
 */
export class Turma extends BaseDatedEntity {
  private constructor(
    public periodo: string,
    public cursoId: IdUuid,
    public ambientePadraoAulaId: IdUuid | null,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Turma";
  }

  static criar(dados: TurmaCreateDto): Turma {
    const instance = new Turma(
      dados.periodo,
      dados.curso.id,
      dados.ambientePadraoAula?.id ?? null,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Turma): Turma {
    const instance = new Turma(
      data.periodo,
      data.cursoId,
      data.ambientePadraoAulaId,
      data.imagemCapaId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Turma.createValidation();
    rules.required(this.periodo, "periodo");
    rules.minLength(this.periodo, "periodo", 1);
    Turma.throwIfInvalid(result);
  }

  atualizar(dados: TurmaUpdateDto): void {
    if (dados.periodo !== undefined) {
      this.periodo = dados.periodo;
    }

    this.touchUpdated();
    this.validar();
  }

  temAmbientePadraoAula(): boolean {
    return this.ambientePadraoAulaId !== null;
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }
}
