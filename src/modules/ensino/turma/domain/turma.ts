import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IAmbiente } from "@/modules/ambientes/ambiente";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem";
import type { ICurso } from "@/modules/ensino/curso";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface ITurma extends IEntityBaseUuid {
  periodo: string;
  ambientePadraoAula: IAmbiente | null;
  curso: ICurso;
  imagemCapa: IImagem | null;
}

export interface ITurmaCreate {
  periodo: string;
  curso: { id: IdUuid };
  ambientePadraoAula?: { id: IdUuid } | null;
}

export interface ITurmaUpdate {
  periodo?: string;
  curso?: { id: IdUuid };
  ambientePadraoAula?: { id: IdUuid } | null;
}

export class Turma implements IEntityBaseUuid {
  static readonly entityName = "Turma";

  id!: IdUuid;
  periodo!: string;
  ambientePadraoAula!: IAmbiente | null;
  curso!: ICurso;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { periodo: string }) {
    this.id = generateUuidV7();
    this.periodo = dados.periodo;
    this.ambientePadraoAula = null;
    this.imagemCapa = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Turma");
    rules.required(this.periodo, "periodo");
    rules.minLength(this.periodo, "periodo", 1);
    throwIfInvalid("Turma", result);
  }

  static create(dados: ITurmaCreate, validar: boolean = true): Turma {
    const instance = new Turma({ periodo: dados.periodo });
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Turma {
    const instance = Object.create(Turma.prototype) as Turma;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.periodo !== undefined) instance.periodo = dados.periodo;
    if (dados.ambientePadraoAula !== undefined)
      instance.ambientePadraoAula = dados.ambientePadraoAula;
    if (dados.curso !== undefined) instance.curso = dados.curso;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: ITurmaUpdate): void {
    if (dados.periodo !== undefined) this.periodo = dados.periodo;
    touchUpdated(this);
    this.validate();
  }

  temAmbientePadraoAula(): boolean {
    return this.ambientePadraoAula !== null;
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
