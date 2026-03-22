import type { ICommandHandler } from "@/domain/abstractions";
import type { EstagiarioFindOneQuery } from "../queries";

export const IEstagiarioDeleteCommandHandler = Symbol("IEstagiarioDeleteCommandHandler");

export type IEstagiarioDeleteCommandHandler = ICommandHandler<EstagiarioFindOneQuery, void>;
