import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface ICalendarioLetivo extends IEntityBaseUuid {
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao | null;
}

export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}

export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid } | null;
}

export class CalendarioLetivo implements IEntityBaseUuid {
  static readonly entityName = "CalendarioLetivo";

  id!: IdUuid;
  nome!: string;
  ano!: number;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; ano: number }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.ano = dados.ano;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("CalendarioLetivo");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.requiredNumber(this.ano, "ano");
    rules.min(this.ano, "ano", 1);
    throwIfInvalid("CalendarioLetivo", result);
  }

  static create(dados: ICalendarioLetivoCreate, validar: boolean = true): CalendarioLetivo {
    const instance = new CalendarioLetivo(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): CalendarioLetivo {
    const instance = Object.create(CalendarioLetivo.prototype) as CalendarioLetivo;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.ano !== undefined) instance.ano = dados.ano;
    if (dados.campus !== undefined) instance.campus = dados.campus;
    if (dados.ofertaFormacao !== undefined) instance.ofertaFormacao = dados.ofertaFormacao;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: ICalendarioLetivoUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.ano !== undefined) this.ano = dados.ano;
    touchUpdated(this);
    this.validate();
  }
}
