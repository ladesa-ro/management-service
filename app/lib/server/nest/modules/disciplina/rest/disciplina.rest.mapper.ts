import {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/modules/ensino/disciplina";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DisciplinaCreateInputRestDto,
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  DisciplinaListInputRestDto,
  DisciplinaListOutputRestDto,
  DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";

export class DisciplinaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DisciplinaFindOneInputRestDto): DisciplinaFindOneInputDto {
    const input = new DisciplinaFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DisciplinaListInputRestDto | null): DisciplinaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DisciplinaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: DisciplinaCreateInputRestDto): DisciplinaCreateInputDto {
    const input = new DisciplinaCreateInputDto();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.cargaHoraria = dto.cargaHoraria;
    return input;
  }

  static toUpdateInput(
    params: DisciplinaFindOneInputRestDto,
    dto: DisciplinaUpdateInputRestDto,
  ): DisciplinaFindOneInputDto & DisciplinaUpdateInputDto {
    const input = new DisciplinaFindOneInputDto() as DisciplinaFindOneInputDto &
      DisciplinaUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.nomeAbreviado !== undefined) {
      input.nomeAbreviado = dto.nomeAbreviado;
    }
    if (dto.cargaHoraria !== undefined) {
      input.cargaHoraria = dto.cargaHoraria;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: DisciplinaFindOneOutputDto): DisciplinaFindOneOutputRestDto {
    const dto = new DisciplinaFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.cargaHoraria = output.cargaHoraria;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DisciplinaListOutputDto): DisciplinaListOutputRestDto {
    const dto = new DisciplinaListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
