import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { getNowISO } from "@/utils/date";

export type EmpresaAvaliacaoAcao = "CRIACAO" | "EDICAO" | "REMOCAO";

export interface IEmpresaAvaliacaoHistorico {
  id: string;
  avaliacao: { id: string };
  usuario: { id: string };
  ratingAnterior: number | null;
  ratingNovo: number;
  comentarioAnterior: string | null;
  comentarioNovo: string | null;
  acao: EmpresaAvaliacaoAcao;
  dateCreated: string;
}

export class EmpresaAvaliacaoHistorico {
  static readonly entityName = "EmpresaAvaliacaoHistorico";

  id!: IdUuid;
  avaliacao!: { id: string };
  usuario!: { id: string };
  ratingAnterior!: number | null;
  ratingNovo!: number;
  comentarioAnterior!: string | null;
  comentarioNovo!: string | null;
  acao!: EmpresaAvaliacaoAcao;
  dateCreated!: ScalarDateTimeString;

  private constructor() {}

  static create(dados: {
    avaliacaoId: string;
    usuarioId: string;
    ratingAnterior: number | null;
    ratingNovo: number;
    comentarioAnterior: string | null;
    comentarioNovo: string | null;
    acao: EmpresaAvaliacaoAcao;
  }): EmpresaAvaliacaoHistorico {
    const instance = new EmpresaAvaliacaoHistorico();
    instance.id = generateUuidV7();
    instance.avaliacao = { id: dados.avaliacaoId };
    instance.usuario = { id: dados.usuarioId };
    instance.ratingAnterior = dados.ratingAnterior;
    instance.ratingNovo = dados.ratingNovo;
    instance.comentarioAnterior = dados.comentarioAnterior;
    instance.comentarioNovo = dados.comentarioNovo;
    instance.acao = dados.acao;
    instance.dateCreated = getNowISO();
    return instance;
  }

  static load(dados: {
    id: string;
    avaliacao: { id: string };
    usuario: { id: string };
    ratingAnterior: number | null;
    ratingNovo: number;
    comentarioAnterior: string | null;
    comentarioNovo: string | null;
    acao: EmpresaAvaliacaoAcao;
    dateCreated: string;
  }): EmpresaAvaliacaoHistorico {
    const instance = new EmpresaAvaliacaoHistorico();
    instance.id = dados.id;
    instance.avaliacao = dados.avaliacao;
    instance.usuario = dados.usuario;
    instance.ratingAnterior = dados.ratingAnterior;
    instance.ratingNovo = dados.ratingNovo;
    instance.comentarioAnterior = dados.comentarioAnterior;
    instance.comentarioNovo = dados.comentarioNovo;
    instance.acao = dados.acao;
    instance.dateCreated = dados.dateCreated;
    return instance;
  }
}
