import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import { ProfessorIndisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneInputDto";
import { ProfessorIndisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneOutputDto";
import { ProfessorIndisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListInputDto";
import {
  ProfessorIndisponibilidadeFindOneOutputRestDto,
  ProfessorIndisponibilidadeListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/ProfessorIndisponibilidadeRestDto";

export class ProfessorIndisponibilidadeRestMapper {
  static toFindOneInput = createFindOneInputMapper(ProfessorIndisponibilidadeFindOneInputDto);

  static toListInput = createListInputMapper(ProfessorIndisponibilidadeListInputDto, [
    "filter.id",
    "filter.perfil.id",
  ]);
  static toListOutputDto = createListOutputMapper(
    ProfessorIndisponibilidadeListOutputRestDto,
    ProfessorIndisponibilidadeRestMapper.toFindOneOutputDto,
  );

  static toFindOneOutputDto(
    output: ProfessorIndisponibilidadeFindOneOutputDto,
  ): ProfessorIndisponibilidadeFindOneOutputRestDto {
    const dto = new ProfessorIndisponibilidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.idPerfilFk = output.perfil?.id ?? "";
    dto.diaDaSemana = output.diaDaSemana;
    dto.horaInicio = output.horaInicio;
    dto.horaFim = output.horaFim;
    dto.motivo = output.motivo;
    mapDatedFields(dto, output);
    return dto;
  }
}
