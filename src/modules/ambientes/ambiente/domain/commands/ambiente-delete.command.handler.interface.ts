import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");

export type IAmbienteDeleteCommandHandler = ICommandHandler<AmbienteFindOneQuery, boolean>;
