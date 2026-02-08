import {
  DiarioCreateInput,
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
  DiarioUpdateInput,
} from "@/modules/diario";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "./diario.rest.dto";

export class DiarioRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DiarioFindOneInputDto): DiarioFindOneInput {
    const input = new DiarioFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DiarioListInputDto | null): DiarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.turma.id"] = dto["filter.turma.id"];
    input["filter.disciplina.id"] = dto["filter.disciplina.id"];
    input["filter.calendarioLetivo.id"] = dto["filter.calendarioLetivo.id"] as any;
    return input;
  }

  static toCreateInput(dto: DiarioCreateInputDto): DiarioCreateInput {
    const input = new DiarioCreateInput();
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
    params: DiarioFindOneInputDto,
    dto: DiarioUpdateInputDto,
  ): DiarioFindOneInput & DiarioUpdateInput {
    const input = new DiarioFindOneInput() as DiarioFindOneInput & DiarioUpdateInput;
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

  static toFindOneOutputDto(output: DiarioFindOneOutput): DiarioFindOneOutputDto {
    const dto = new DiarioFindOneOutputDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.calendarioLetivo = output.calendarioLetivo as any;
    dto.turma = output.turma as any;
    dto.disciplina = output.disciplina as any;
    dto.ambientePadrao = output.ambientePadrao as any;
    dto.imagemCapa = output.imagemCapa as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DiarioListOutput): DiarioListOutputDto {
    const dto = new DiarioListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
