import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
} from "../../application/dtos";

export type ITurmaDisponibilidadeListQuery = {
  accessContext: AccessContext;
  dto: TurmaDisponibilidadeListInputDto | null;
  selection?: string[] | boolean;
};

export type ITurmaDisponibilidadeListQueryHandler = IQueryHandler<
  ITurmaDisponibilidadeListQuery,
  TurmaDisponibilidadeListOutputDto
>;
export const ITurmaDisponibilidadeListQueryHandler = Symbol(
  "ITurmaDisponibilidadeListQueryHandler",
);
