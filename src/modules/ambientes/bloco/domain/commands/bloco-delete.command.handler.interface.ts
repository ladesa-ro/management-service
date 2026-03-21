import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export const IBlocoDeleteCommandHandler = Symbol("IBlocoDeleteCommandHandler");

export type IBlocoDeleteCommandHandler = ICommandHandler<BlocoFindOneQuery, boolean>;
