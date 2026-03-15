import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQuery } from "../queries";

export type IEstagiarioDeleteCommandHandler = ICommandHandler<EstagiarioFindOneQuery, void>;
export const IEstagiarioDeleteCommandHandler = Symbol("IEstagiarioDeleteCommandHandler");
