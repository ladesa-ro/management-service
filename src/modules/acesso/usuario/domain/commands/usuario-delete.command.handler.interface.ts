import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export type IUsuarioDeleteCommandHandler = ICommandHandler<UsuarioFindOneQuery, boolean>;
export const IUsuarioDeleteCommandHandler = Symbol("IUsuarioDeleteCommandHandler");
