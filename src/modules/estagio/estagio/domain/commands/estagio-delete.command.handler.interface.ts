import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioFindOneQuery } from "../queries";

export const EstagioDeleteCommandMetadata = createOperationMetadata({
  operationId: "estagioDelete",
  summary: "Deleta um estágio",
});

export const IEstagioDeleteCommandHandler = Symbol("IEstagioDeleteCommandHandler");

export type IEstagioDeleteCommandHandler = ICommandHandler<EstagioFindOneQuery, void>;
