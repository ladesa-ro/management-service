import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQuery } from "../queries";

export const IEstagiarioDeleteCommandHandler = Symbol("IEstagiarioDeleteCommandHandler");

export type IEstagiarioDeleteCommandHandler = ICommandHandler<EstagiarioFindOneQuery, void>;
