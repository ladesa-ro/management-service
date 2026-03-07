import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { BlocoCreateDto } from "@/Ladesa.Management.Domain/Dtos/BlocoCreateDto";
import type { BlocoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/BlocoUpdateDto";

/**
 * Entidade de Domínio: Bloco
 * Implementa a tipagem IBloco e adiciona regras de negócio
 */
export class Bloco extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public codigo: string,
    public campusId: IdUuid,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Bloco";
  }

  static criar(dados: BlocoCreateDto): Bloco {
    const instance = new Bloco(
      dados.nome?.trim() ?? "",
      dados.codigo?.trim() ?? "",
      dados.campus.id,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Bloco): Bloco {
    const instance = new Bloco(data.nome, data.codigo, data.campusId, data.imagemCapaId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Bloco.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    Bloco.throwIfInvalid(result);
  }

  atualizar(dados: BlocoUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.codigo !== undefined) {
      this.codigo = dados.codigo?.trim() ?? "";
    }

    this.touchUpdated();
    this.validar();
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }
}
