import type { z } from "zod";
import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";
import { EstagioSolicitacaoIndeferirSchema } from "../estagio-solicitacao.schemas";

export type EstagioSolicitacaoIndeferirBody = z.infer<
  typeof EstagioSolicitacaoIndeferirSchema.domain
>;

export interface EstagioSolicitacaoIndeferirCommand extends EstagioSolicitacaoIndeferirBody {
  id: string;
}

export abstract class IEstagioSolicitacaoIndeferirCommandHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoIndeferirCommand,
  ): Promise<EstagioSolicitacao>;
}
