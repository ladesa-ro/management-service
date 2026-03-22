import type { ICommandHandler } from "@/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioCreateCommand } from "./estagiario-create.command";

export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  EstagiarioCreateCommand,
  EstagiarioFindOneQueryResult
>;
