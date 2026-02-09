import {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/modules/diario";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import { CalendarioLetivoRestMapper } from "@/server/nest/modules/calendario-letivo/rest";
import { DisciplinaRestMapper } from "@/server/nest/modules/disciplina/rest";
import { TurmaRestMapper } from "@/server/nest/modules/turma/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiarioCreateInputRestDto,
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  DiarioListInputRestDto,
  DiarioListOutputRestDto,
  DiarioUpdateInputRestDto,
} from "./diario.rest.dto";

export class DiarioRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DiarioFindOneInputRestDto): DiarioFindOneInputDto {
    const input = new DiarioFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DiarioListInputRestDto | null): DiarioListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.turma.id"] = dto["filter.turma.id"];
    input["filter.disciplina.id"] = dto["filter.disciplina.id"];
    input["filter.calendarioLetivo.id"] = dto["filter.calendarioLetivo.id"];
    return input;
  }

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
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DiarioListOutputDto): DiarioListOutputRestDto {
    const dto = new DiarioListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
