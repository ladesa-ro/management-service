import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
} from "../../application/dtos";

export type IProfessorIndisponibilidadeFindOneQuery = {
  accessContext: AccessContext;
  dto: ProfessorIndisponibilidadeFindOneInputDto;
};

export type IProfessorIndisponibilidadeFindOneQueryHandler = IQueryHandler<
  IProfessorIndisponibilidadeFindOneQuery,
  ProfessorIndisponibilidadeFindOneOutputDto | null
>;
export const IProfessorIndisponibilidadeFindOneQueryHandler = Symbol(
  "IProfessorIndisponibilidadeFindOneQueryHandler",
);
