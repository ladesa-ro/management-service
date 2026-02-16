import { AmbienteRestMapper } from "@/modules/ambientes/ambiente/presentation/rest";
import { BlocoRestMapper } from "@/modules/ambientes/bloco/presentation/rest";
import {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioUpdateInputDto,
} from "@/modules/ensino/diario";
import { DisciplinaRestMapper } from "@/modules/ensino/disciplina/presentation/rest";
import { TurmaRestMapper } from "@/modules/ensino/turma/presentation/rest";
import { CalendarioLetivoRestMapper } from "@/modules/horarios/calendario-letivo/presentation/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  DiarioCreateInputRestDto,
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  DiarioListOutputRestDto,
  DiarioUpdateInputRestDto,
} from "./diario.rest.dto";

export class DiarioRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(DiarioFindOneInputDto);

  static toListInput = createListInputMapper(DiarioListInputDto, [
    "filter.id",
    "filter.turma.id",
    "filter.disciplina.id",
    "filter.calendarioLetivo.id",
  ]);

  static toCreateInput(dto: DiarioCreateInputRestDto): DiarioCreateInputDto {
    const input = new DiarioCreateInputDto();
    input.ativo = dto.ativo;
    input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    input.turma = { id: dto.turma.id };
    input.disciplina = { id: dto.disciplina.id };
    if (dto.ambientePadrao !== undefined) {
      input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    }
    return input;
  }

  static toUpdateInput(
    params: DiarioFindOneInputRestDto,
    dto: DiarioUpdateInputRestDto,
  ): DiarioFindOneInputDto & DiarioUpdateInputDto {
    const input = new DiarioFindOneInputDto() as DiarioFindOneInputDto & DiarioUpdateInputDto;
    input.id = params.id;
    if (dto.ativo !== undefined) {
      input.ativo = dto.ativo;
    }
    if (dto.calendarioLetivo !== undefined) {
      input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.disciplina !== undefined) {
      input.disciplina = { id: dto.disciplina.id };
    }
    if (dto.ambientePadrao !== undefined) {
      input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: DiarioFindOneOutputDto): DiarioFindOneOutputRestDto {
    const dto = new DiarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.calendarioLetivo = CalendarioLetivoRestMapper.toFindOneOutputDto(output.calendarioLetivo);
    dto.turma = TurmaRestMapper.toFindOneOutputDto(output.turma);
    dto.disciplina = DisciplinaRestMapper.toFindOneOutputDto(output.disciplina);
    dto.ambientePadrao = output.ambientePadrao
      ? AmbienteRestMapper.toFindOneOutputDto(output.ambientePadrao)
      : null;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioListOutputRestDto,
    DiarioRestMapper.toFindOneOutputDto,
  );
}
