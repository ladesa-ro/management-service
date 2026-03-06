import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type DiarioProfessor } from "@/Ladesa.Management.Domain/Entities/DiarioProfessor";
import { type HorarioGerado } from "@/Ladesa.Management.Domain/Entities/HorarioGerado";
import { type IntervaloDeTempo } from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

export interface HorarioGeradoAulaUpdateDto {
  data?: ScalarDateTimeString;
  diarioProfessor?: IFindOneByIdDto<DiarioProfessor["id"]>;
  horarioGerado?: IFindOneByIdDto<HorarioGerado["id"]>;
  intervaloDeTempo?: IFindOneByIdDto<IntervaloDeTempo["id"]>;
}
