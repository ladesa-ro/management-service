import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { CursoCreateDto } from "@/Ladesa.Management.Domain/Dtos/CursoCreateDto";
import type { CursoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CursoUpdateDto";

/**
 * Entidade de Dominio: Curso
 * Implementa a tipagem ICurso e adiciona regras de negocio
 */
export class Curso extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public nomeAbreviado: string,
    public campusId: IdUuid,
    public ofertaFormacaoId: IdUuid,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Curso";
  }

  static criar(dados: CursoCreateDto): Curso {
    const instance = new Curso(
      dados.nome?.trim() ?? "",
      dados.nomeAbreviado?.trim() ?? "",
      dados.campus.id,
      dados.ofertaFormacao.id,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Curso): Curso {
    const instance = new Curso(
      data.nome,
      data.nomeAbreviado,
      data.campusId,
      data.ofertaFormacaoId,
      data.imagemCapaId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Curso.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    Curso.throwIfInvalid(result);
  }

  atualizar(dados: CursoUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    }

    this.touchUpdated();
    this.validar();
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }
}
