import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";

export interface EstagioSolicitacaoCancelarCommand {
  id: string;
}

export abstract class IEstagioSolicitacaoCancelarCommandHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoCancelarCommand,
  ): Promise<EstagioSolicitacao>;
}
