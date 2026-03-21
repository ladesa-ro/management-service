import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagioFindOneQuery, EstagioFindOneQueryResult } from "../queries";
import type { EstagioUpdateCommand } from "./estagio-update.command";

export const IEstagioUpdateCommandHandler = Symbol("IEstagioUpdateCommandHandler");

export type IEstagioUpdateCommandHandler = ICommandHandler<
  EstagioFindOneQuery & EstagioUpdateCommand,
  EstagioFindOneQueryResult
>;
