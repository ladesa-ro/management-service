import type { z } from "zod";
import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";
import { EstagioSolicitacaoDeferirSchema } from "../estagio-solicitacao.schemas";

export type EstagioSolicitacaoDeferirBody = z.infer<typeof EstagioSolicitacaoDeferirSchema.domain>;

export interface EstagioSolicitacaoDeferirCommand extends EstagioSolicitacaoDeferirBody {
  id: string;
}

export abstract class IEstagioSolicitacaoDeferirCommandHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoDeferirCommand,
  ): Promise<EstagioSolicitacao>;
}
