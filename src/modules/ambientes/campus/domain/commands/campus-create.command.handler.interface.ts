import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusCreateInputDto, CampusFindOneOutputDto } from "../../application/dtos";

export type ICampusCreateCommand = {
  accessContext: AccessContext;
  dto: CampusCreateInputDto;
};

export type ICampusCreateCommandHandler = ICommandHandler<
  ICampusCreateCommand,
  CampusFindOneOutputDto
>;
export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");
