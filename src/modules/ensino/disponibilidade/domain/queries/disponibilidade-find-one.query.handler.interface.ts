import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
} from "../../application/dtos";

export type IDisponibilidadeFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DisponibilidadeFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDisponibilidadeFindOneQueryHandler = IQueryHandler<
  IDisponibilidadeFindOneQuery,
  DisponibilidadeFindOneOutputDto | null
>;
export const IDisponibilidadeFindOneQueryHandler = Symbol("IDisponibilidadeFindOneQueryHandler");
