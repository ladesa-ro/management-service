import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { EmpresaAvaliacaoFields } from "../empresa-avaliacao.fields";

export const EmpresaAvaliacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EmpresaAvaliacaoFields,
};

export class EmpresaAvaliacaoAutorQueryResult {
  id!: string;
  nome!: string | null;
  email!: string | null;
  matricula!: string | null;
}

export class EmpresaAvaliacaoFindOneQueryResult extends EntityQueryResult {
  empresaId!: string;
  estagiarioId!: string;
  autor!: EmpresaAvaliacaoAutorQueryResult;
  rating!: number;
  comentario!: string | null;
  relevanceScore!: number;
  likesCount!: number;
  isLikedByCurrentUser?: boolean;
}
