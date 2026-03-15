import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export type IAmbienteDeleteCommandHandler = ICommandHandler<AmbienteFindOneQuery, boolean>;
export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");
