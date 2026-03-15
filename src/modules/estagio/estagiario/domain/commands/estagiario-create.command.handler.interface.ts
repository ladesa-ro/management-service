import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioCreateCommand } from "./estagiario-create.command";

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  EstagiarioCreateCommand,
  EstagiarioFindOneQueryResult
>;
export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");
