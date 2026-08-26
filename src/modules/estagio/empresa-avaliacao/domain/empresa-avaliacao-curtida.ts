import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { getNowISO } from "@/utils/date";

export interface IEmpresaAvaliacaoCurtida {
  id: string;
  avaliacao: { id: string };
  usuario: { id: string };
  dateCreated: string;
  dateDeleted: string | null;
}

export class EmpresaAvaliacaoCurtida {
  static readonly entityName = "EmpresaAvaliacaoCurtida";

  id!: IdUuid;
  avaliacao!: { id: string };
  usuario!: { id: string };
  dateCreated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: { avaliacaoId: string; usuarioId: string }): EmpresaAvaliacaoCurtida {
    const instance = new EmpresaAvaliacaoCurtida();
    instance.id = generateUuidV7();
    instance.avaliacao = { id: dados.avaliacaoId };
    instance.usuario = { id: dados.usuarioId };
    instance.dateCreated = getNowISO();
    instance.dateDeleted = null;
    return instance;
  }

  static load(dados: {
    id: string;
    avaliacao: { id: string };
    usuario: { id: string };
    dateCreated: string;
    dateDeleted: string | null;
  }): EmpresaAvaliacaoCurtida {
    const instance = new EmpresaAvaliacaoCurtida();
    instance.id = dados.id;
    instance.avaliacao = dados.avaliacao;
    instance.usuario = dados.usuario;
    instance.dateCreated = dados.dateCreated;
    instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  softDelete(): void {
    this.dateDeleted = getNowISO();
  }

  reactivate(): void {
    this.dateDeleted = null;
  }

  get ativo(): boolean {
    return this.dateDeleted === null;
  }
}
