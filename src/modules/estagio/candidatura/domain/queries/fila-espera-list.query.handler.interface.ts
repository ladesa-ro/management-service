import type { IAccessContext } from "@/domain/abstractions";
import type { FilaEsperaListQuery } from "./fila-espera-list.query";
import type { FilaEsperaListQueryResult } from "./fila-espera-list.query.result";

export const IFilaEsperaListQueryHandler = Symbol("IFilaEsperaListQueryHandler");

export interface IFilaEsperaListQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: FilaEsperaListQuery,
  ): Promise<FilaEsperaListQueryResult>;
}

export const FilaEsperaListQueryMetadata = {
  swaggerMetadata: {
    summary: "Listar fila de espera de um estágio (CIEC)",
    description:
      "Permite à equipe da CIEC ou coordenadores listarem todos os candidatos da fila de espera de uma vaga específica com ordenação por posição na fila e dados acadêmicos.",
  },
};
