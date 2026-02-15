import {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/modules/ensino/curso";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import { OfertaFormacaoRestMapper } from "@/server/nest/modules/oferta-formacao/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  CursoCreateInputRestDto,
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  CursoListInputRestDto,
  CursoListOutputRestDto,
  CursoUpdateInputRestDto,
} from "./curso.rest.dto";

export class CursoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CursoFindOneInputRestDto): CursoFindOneInputDto {
    const input = new CursoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CursoListInputRestDto | null): CursoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CursoListInputDto();
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

  static toCreateInput(dto: CursoCreateInputRestDto): CursoCreateInputDto {
    const input = new CursoCreateInputDto();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: CursoFindOneInputRestDto,
    dto: CursoUpdateInputRestDto,
  ): CursoFindOneInputDto & CursoUpdateInputDto {
    const input = new CursoFindOneInputDto() as CursoFindOneInputDto & CursoUpdateInputDto;
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

  static toFindOneOutputDto(output: CursoFindOneOutputDto): CursoFindOneOutputRestDto {
    const dto = new CursoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CursoListOutputDto): CursoListOutputRestDto {
    const dto = new CursoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
