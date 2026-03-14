import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
} from "../../application/dtos";

export type IDisponibilidadeListQuery = {
  accessContext: AccessContext;
  dto: DisponibilidadeListInputDto | null;
  selection?: string[] | boolean;
};

export type IDisponibilidadeListQueryHandler = IQueryHandler<
  IDisponibilidadeListQuery,
  DisponibilidadeListOutputDto
>;
export const IDisponibilidadeListQueryHandler = Symbol("IDisponibilidadeListQueryHandler");
