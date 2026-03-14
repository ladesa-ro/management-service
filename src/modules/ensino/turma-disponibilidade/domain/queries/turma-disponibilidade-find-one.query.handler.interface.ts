import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
} from "../../application/dtos";

export type ITurmaDisponibilidadeFindOneQuery = {
  accessContext: AccessContext | null;
  dto: TurmaDisponibilidadeFindOneInputDto;
  selection?: string[] | boolean;
};

export type ITurmaDisponibilidadeFindOneQueryHandler = IQueryHandler<
  ITurmaDisponibilidadeFindOneQuery,
  TurmaDisponibilidadeFindOneOutputDto | null
>;
export const ITurmaDisponibilidadeFindOneQueryHandler = Symbol(
  "ITurmaDisponibilidadeFindOneQueryHandler",
);
