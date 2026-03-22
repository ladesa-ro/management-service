import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioFindOneQuery, DiarioFindOneQueryResult } from "../queries";
import type { DiarioUpdateCommand } from "./diario-update.command";

export const DiarioUpdateCommandMetadata = createOperationMetadata({
  operationId: "diarioUpdate",
  summary: "Atualiza um diario",
});

export const IDiarioUpdateCommandHandler = Symbol("IDiarioUpdateCommandHandler");

export type IDiarioUpdateCommandHandler = ICommandHandler<
  DiarioFindOneQuery & DiarioUpdateCommand,
  DiarioFindOneQueryResult
>;
