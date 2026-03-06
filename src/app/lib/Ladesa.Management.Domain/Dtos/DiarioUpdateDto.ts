import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type CalendarioLetivo } from "@/Ladesa.Management.Domain/Entities/CalendarioLetivo";
import { type Disciplina } from "@/Ladesa.Management.Domain/Entities/Disciplina";
import { type Turma } from "@/Ladesa.Management.Domain/Entities/Turma";

export interface DiarioUpdateDto {
  ativo?: boolean;
  calendarioLetivo?: IFindOneByIdDto<CalendarioLetivo["id"]>;
  turma?: IFindOneByIdDto<Turma["id"]>;
  disciplina?: IFindOneByIdDto<Disciplina["id"]>;
  ambientePadrao?: IFindOneByIdDto<Ambiente["id"]> | null;
}
