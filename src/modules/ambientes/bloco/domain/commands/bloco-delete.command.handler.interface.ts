import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export type IBlocoDeleteCommandHandler = ICommandHandler<BlocoFindOneQuery, boolean>;
export const IBlocoDeleteCommandHandler = Symbol("IBlocoDeleteCommandHandler");
