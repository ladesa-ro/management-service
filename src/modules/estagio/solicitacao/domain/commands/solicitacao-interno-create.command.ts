import type { z } from "zod";
import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";
import { EstagioSolicitacaoInternoCreateSchema } from "../estagio-solicitacao.schemas";

export type EstagioSolicitacaoInternoCreateCommand = z.infer<
  typeof EstagioSolicitacaoInternoCreateSchema.domain
>;

export abstract class IEstagioSolicitacaoInternoCreateCommandHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoInternoCreateCommand,
  ): Promise<EstagioSolicitacao>;
}
