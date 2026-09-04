import type { z } from "zod";
import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";
import { EstagioSolicitacaoExternoCreateSchema } from "../estagio-solicitacao.schemas";

export type EstagioSolicitacaoExternoCreateCommand = z.infer<
  typeof EstagioSolicitacaoExternoCreateSchema.domain
>;

export abstract class IEstagioSolicitacaoExternoCreateCommandHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoExternoCreateCommand,
  ): Promise<EstagioSolicitacao>;
}
