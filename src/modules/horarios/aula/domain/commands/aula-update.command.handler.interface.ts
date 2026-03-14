import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaUpdateInputDto,
} from "../../application/dtos";

export type IAulaUpdateCommand = {
  accessContext: AccessContext;
  dto: AulaFindOneInputDto & AulaUpdateInputDto;
};

export type IAulaUpdateCommandHandler = ICommandHandler<IAulaUpdateCommand, AulaFindOneOutputDto>;
export const IAulaUpdateCommandHandler = Symbol("IAulaUpdateCommandHandler");
