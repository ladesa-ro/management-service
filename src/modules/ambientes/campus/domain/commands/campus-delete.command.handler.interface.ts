import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneInputDto } from "../../application/dtos";

export type ICampusDeleteCommand = {
  accessContext: AccessContext;
  dto: CampusFindOneInputDto;
};

export type ICampusDeleteCommandHandler = ICommandHandler<ICampusDeleteCommand, boolean>;
export const ICampusDeleteCommandHandler = Symbol("ICampusDeleteCommandHandler");
