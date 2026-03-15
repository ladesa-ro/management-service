import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagioFindOneQueryResult } from "../queries";
import type { EstagioCreateCommand } from "./estagio-create.command";

export type IEstagioCreateCommandHandler = ICommandHandler<
  EstagioCreateCommand,
  EstagioFindOneQueryResult
>;
export const IEstagioCreateCommandHandler = Symbol("IEstagioCreateCommandHandler");
