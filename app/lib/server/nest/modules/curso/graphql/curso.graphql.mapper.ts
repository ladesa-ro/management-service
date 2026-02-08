import {
  CursoFindOneInput,
  CursoFindOneOutput,
  CursoListInput,
  CursoListOutput,
} from "@/modules/curso";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { CursoFindOneOutputDto } from "../rest/curso.rest.dto";
import { CursoRestMapper } from "../rest/curso.rest.mapper";
import { CursoListInputGqlDto, CursoListOutputGqlDto } from "./curso.graphql.dto";

export class CursoGraphqlMapper {
  static toListInput(dto: CursoListInputGqlDto | null): CursoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CursoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CursoFindOneInput {
    const input = new CursoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CursoFindOneOutput): CursoFindOneOutputDto {
    return CursoRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: CursoListOutput): CursoListOutputGqlDto {
    const dto = new CursoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
