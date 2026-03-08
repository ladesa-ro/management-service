import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ProfessorIndisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListInputDto";
import type { ProfessorIndisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListOutputDto";

export interface IProfessorIndisponibilidadeListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeListInputDto | null,
  ): Promise<ProfessorIndisponibilidadeListOutputDto>;
}
