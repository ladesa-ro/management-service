import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ProfessorIndisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneInputDto";
import type { ProfessorIndisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneOutputDto";

export interface IProfessorIndisponibilidadeFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto>;
}
