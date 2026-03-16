import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { INivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";

export interface IOfertaFormacaoNivelFormacao extends IEntityBaseUuid {
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
}

export interface IOfertaFormacaoNivelFormacaoCreate {
  nivelFormacao: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}

export class OfertaFormacaoNivelFormacao implements IEntityBaseUuid {
  static readonly entityName = "OfertaFormacaoNivelFormacao";

  id!: IdUuid;
  nivelFormacao!: INivelFormacao;
  ofertaFormacao!: IOfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor() {
    this.id = generateUuidV7();
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {}

  static create(
    _dados: IOfertaFormacaoNivelFormacaoCreate,
    validar: boolean = true,
  ): OfertaFormacaoNivelFormacao {
    const instance = new OfertaFormacaoNivelFormacao();
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): OfertaFormacaoNivelFormacao {
    const instance = Object.create(
      OfertaFormacaoNivelFormacao.prototype,
    ) as OfertaFormacaoNivelFormacao;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nivelFormacao !== undefined) instance.nivelFormacao = dados.nivelFormacao;
    if (dados.ofertaFormacao !== undefined) instance.ofertaFormacao = dados.ofertaFormacao;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }
}
