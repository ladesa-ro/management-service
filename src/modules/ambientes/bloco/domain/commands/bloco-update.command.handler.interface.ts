import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoUpdateInputDto,
} from "../../application/dtos";

export type IBlocoUpdateCommand = {
  accessContext: AccessContext;
  dto: BlocoFindOneInputDto & BlocoUpdateInputDto;
};

export type IBlocoUpdateCommandHandler = ICommandHandler<
  IBlocoUpdateCommand,
  BlocoFindOneOutputDto
>;
export const IBlocoUpdateCommandHandler = Symbol("IBlocoUpdateCommandHandler");
