import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusUpdateInputDto,
} from "../../application/dtos";

export type ICampusUpdateCommand = {
  accessContext: AccessContext;
  dto: CampusFindOneInputDto & CampusUpdateInputDto;
};

export type ICampusUpdateCommandHandler = ICommandHandler<
  ICampusUpdateCommand,
  CampusFindOneOutputDto
>;
export const ICampusUpdateCommandHandler = Symbol("ICampusUpdateCommandHandler");
