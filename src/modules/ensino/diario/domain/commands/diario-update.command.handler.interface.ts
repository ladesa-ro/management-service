import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioUpdateInputDto,
} from "../../application/dtos";

export type IDiarioUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioFindOneInputDto & DiarioUpdateInputDto;
};

export type IDiarioUpdateCommandHandler = ICommandHandler<
  IDiarioUpdateCommand,
  DiarioFindOneOutputDto
>;
export const IDiarioUpdateCommandHandler = Symbol("IDiarioUpdateCommandHandler");
