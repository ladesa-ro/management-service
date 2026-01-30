import {
  CursoCreateInput,
  CursoFindOneInput,
  CursoFindOneOutput,
  CursoListInput,
  CursoListOutput,
  CursoUpdateInput,
} from "@/core/curso";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "./curso.rest.dto";

export class CursoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CursoFindOneInputDto): CursoFindOneInput {
    const input = new CursoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CursoListInputDto | null): CursoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CursoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.campus.id"] = dto["filter.campus.id"];
    input["filter.ofertaFormacao.id"] = dto["filter.ofertaFormacao.id"];
    return input;
  }

  static toCreateInput(dto: CursoCreateInputDto): CursoCreateInput {
    const input = new CursoCreateInput();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: CursoFindOneInputDto,
    dto: CursoUpdateInputDto,
  ): CursoFindOneInput & CursoUpdateInput {
    const input = new CursoFindOneInput() as CursoFindOneInput & CursoUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.nomeAbreviado !== undefined) {
      input.nomeAbreviado = dto.nomeAbreviado;
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CursoFindOneOutput): CursoFindOneOutputDto {
    const dto = new CursoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.campus = output.campus as any;
    dto.ofertaFormacao = output.ofertaFormacao as any;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa as any)
      : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CursoListOutput): CursoListOutputDto {
    const dto = new CursoListOutputDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
