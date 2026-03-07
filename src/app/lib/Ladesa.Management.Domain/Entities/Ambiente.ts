import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { AmbienteCreateDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteCreateDto";
import type { AmbienteUpdateDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteUpdateDto";

/**
 * Entidade de Domínio: Ambiente
 * Implementa a tipagem IAmbiente e adiciona regras de negócio
 */
export class Ambiente extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public descricao: string | null,
    public codigo: string,
    public capacidade: number | null,
    public tipo: string | null,
    public blocoId: IdUuid,
    public imagemCapaId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Ambiente";
  }

  static criar(dados: AmbienteCreateDto): Ambiente {
    const instance = new Ambiente(
      dados.nome?.trim() ?? "",
      dados.descricao?.trim() || null,
      dados.codigo?.trim() ?? "",
      dados.capacidade ?? null,
      dados.tipo?.trim() || null,
      dados.bloco.id,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Ambiente): Ambiente {
    const instance = new Ambiente(
      data.nome,
      data.descricao,
      data.codigo,
      data.capacidade,
      data.tipo,
      data.blocoId,
      data.imagemCapaId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Ambiente.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    Ambiente.throwIfInvalid(result);
  }

  atualizar(dados: AmbienteUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.codigo !== undefined) {
      this.codigo = dados.codigo?.trim() ?? "";
    }

    if (dados.descricao !== undefined) {
      this.descricao = dados.descricao?.trim() || null;
    }

    if (dados.capacidade !== undefined) {
      this.capacidade = dados.capacidade;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }

  temCapacidade(): boolean {
    return this.capacidade !== null && this.capacidade > 0;
  }
}
