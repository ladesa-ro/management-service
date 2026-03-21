import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioCreateCommand } from "./estagiario-create.command";

export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  EstagiarioCreateCommand,
  EstagiarioFindOneQueryResult
>;
