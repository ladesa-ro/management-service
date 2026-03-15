import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { ICampus } from "@/modules/ambientes/campus";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IBloco extends IEntityBaseUuid {
  nome: string;
  codigo: string;
  campus: ICampus;
  imagemCapa: { id: IdUuid } | null;
}

export interface IBlocoCreate {
  nome: string;
  codigo: string;
  campus: { id: IdUuid };
}

export interface IBlocoUpdate {
  nome?: string;
  codigo?: string;
}

export class Bloco implements IEntityBaseUuid {
  static readonly entityName = "Bloco";

  id!: IdUuid;
  nome!: string;
  codigo!: string;
  campus!: ICampus;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; codigo: string }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.codigo = dados.codigo;
    this.imagemCapa = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Bloco");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    throwIfInvalid("Bloco", result);
  }

  static create(dados: IBlocoCreate, validar: boolean = true): Bloco {
    const instance = new Bloco(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Bloco {
    const instance = Object.create(Bloco.prototype) as Bloco;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.codigo !== undefined) instance.codigo = dados.codigo;
    if (dados.campus !== undefined) instance.campus = dados.campus;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IBlocoUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.codigo !== undefined) this.codigo = dados.codigo;
    touchUpdated(this);
    this.validate();
  }
}
