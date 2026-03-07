import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { DisciplinaCreateDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaCreateDto";
import type { DisciplinaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaUpdateDto";

/**
 * Entidade de Domínio: Disciplina
 * Implementa a tipagem IDisciplina e adiciona regras de negócio
 */
export class Disciplina extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public nomeAbreviado: string,
    public cargaHoraria: number,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Disciplina";
  }

  static criar(dados: DisciplinaCreateDto): Disciplina {
    const instance = new Disciplina(
      dados.nome?.trim() ?? "",
      dados.nomeAbreviado?.trim() ?? "",
      dados.cargaHoraria ?? 0,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Disciplina): Disciplina {
    const instance = new Disciplina(
      data.nome,
      data.nomeAbreviado,
      data.cargaHoraria,
      data.imagemCapaId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Disciplina.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    rules.requiredNumber(this.cargaHoraria, "cargaHoraria");
    rules.min(this.cargaHoraria, "cargaHoraria", 1);
    Disciplina.throwIfInvalid(result);
  }

  atualizar(dados: DisciplinaUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    }

    if (dados.cargaHoraria !== undefined) {
      this.cargaHoraria = dados.cargaHoraria ?? 0;
    }

    this.touchUpdated();
    this.validar();
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }

  temCargaHorariaValida(): boolean {
    return this.cargaHoraria > 0;
  }
}
