import type { ICommandHandler } from "@/domain/abstractions/operations/cqrs/command-handler.interface";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";
import type { EstagioSolicitarCommand } from "./estagio-solicitar.command";

export const IEstagioSolicitarCommandHandler = Symbol("IEstagioSolicitarCommandHandler");

export const EstagioSolicitarCommandMetadata = {
  swaggerMetadata: {
    operationId: "estagioSolicitar",
    summary: "Solicita um estágio informando os dados da empresa onde deseja estagiar",
    description:
      "Permite que um estagiário autenticado solicite um estágio cadastrando ou vinculando a empresa desejada.",
  },
};

export interface IEstagioSolicitarCommandHandler
  extends ICommandHandler<EstagioSolicitarCommand, EstagioFindOneQueryResult> {}
