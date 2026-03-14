import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AulaCreateInputDto, AulaFindOneOutputDto } from "../../application/dtos";

export type IAulaCreateCommand = {
  accessContext: AccessContext;
  dto: AulaCreateInputDto;
};

export type IAulaCreateCommandHandler = ICommandHandler<IAulaCreateCommand, AulaFindOneOutputDto>;
export const IAulaCreateCommandHandler = Symbol("IAulaCreateCommandHandler");
