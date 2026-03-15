import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IImagem } from "@/modules/armazenamento/imagem";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface ICurso extends IEntityBaseUuid {
  nome: string;
  nomeAbreviado: string;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  imagemCapa: IImagem | null;
}

export interface ICursoCreate {
  nome: string;
  nomeAbreviado: string;
  campus: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}

export interface ICursoUpdate {
  nome?: string;
  nomeAbreviado?: string;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}

export class Curso implements IEntityBaseUuid {
  static readonly entityName = "Curso";

  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; nomeAbreviado: string }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.nomeAbreviado = dados.nomeAbreviado;
    this.imagemCapa = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Curso");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    throwIfInvalid("Curso", result);
  }

  static create(dados: ICursoCreate, validar: boolean = true): Curso {
    const instance = new Curso({
      nome: dados.nome?.trim() ?? "",
      nomeAbreviado: dados.nomeAbreviado?.trim() ?? "",
    });
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Curso {
    const instance = Object.create(Curso.prototype) as Curso;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.nomeAbreviado !== undefined) instance.nomeAbreviado = dados.nomeAbreviado;
    if (dados.campus !== undefined) instance.campus = dados.campus;
    if (dados.ofertaFormacao !== undefined) instance.ofertaFormacao = dados.ofertaFormacao;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: ICursoUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome?.trim() ?? "";
    if (dados.nomeAbreviado !== undefined) this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    touchUpdated(this);
    this.validate();
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
