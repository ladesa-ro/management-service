import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IDisciplina extends IEntityBaseUuid {
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
  imagemCapa: IImagem | null;
}

export interface IDisciplinaCreate {
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
}

export interface IDisciplinaUpdate {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
}

export class Disciplina implements IEntityBaseUuid {
  static readonly entityName = "Disciplina";

  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; nomeAbreviado: string; cargaHoraria: number }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.nomeAbreviado = dados.nomeAbreviado;
    this.cargaHoraria = dados.cargaHoraria;
    this.imagemCapa = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Disciplina");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    rules.requiredNumber(this.cargaHoraria, "cargaHoraria");
    rules.min(this.cargaHoraria, "cargaHoraria", 1);
    throwIfInvalid("Disciplina", result);
  }

  static create(dados: IDisciplinaCreate, validar: boolean = true): Disciplina {
    const instance = new Disciplina({
      nome: dados.nome?.trim() ?? "",
      nomeAbreviado: dados.nomeAbreviado?.trim() ?? "",
      cargaHoraria: dados.cargaHoraria ?? 0,
    });
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Disciplina {
    const instance = Object.create(Disciplina.prototype) as Disciplina;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.nomeAbreviado !== undefined) instance.nomeAbreviado = dados.nomeAbreviado;
    if (dados.cargaHoraria !== undefined) instance.cargaHoraria = dados.cargaHoraria;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IDisciplinaUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome?.trim() ?? "";
    if (dados.nomeAbreviado !== undefined) this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    if (dados.cargaHoraria !== undefined) this.cargaHoraria = dados.cargaHoraria ?? 0;
    touchUpdated(this);
    this.validate();
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  temCargaHorariaValida(): boolean {
    return this.cargaHoraria > 0;
  }
}
