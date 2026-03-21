import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagioFindOneQueryResult } from "../queries";
import type { EstagioCreateCommand } from "./estagio-create.command";

export const IEstagioCreateCommandHandler = Symbol("IEstagioCreateCommandHandler");

export type IEstagioCreateCommandHandler = ICommandHandler<
  EstagioCreateCommand,
  EstagioFindOneQueryResult
>;
