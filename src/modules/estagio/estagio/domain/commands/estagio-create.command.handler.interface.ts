import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioFindOneQueryResult } from "../queries";
import type { EstagioCreateCommand } from "./estagio-create.command";

export const EstagioCreateCommandMetadata = createOperationMetadata({
  operationId: "estagioCreate",
  summary: "Cria um estágio",
});

export const IEstagioCreateCommandHandler = Symbol("IEstagioCreateCommandHandler");

export type IEstagioCreateCommandHandler = ICommandHandler<
  EstagioCreateCommand,
  EstagioFindOneQueryResult
>;
