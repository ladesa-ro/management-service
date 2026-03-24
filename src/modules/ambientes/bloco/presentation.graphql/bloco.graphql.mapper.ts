import {
  BlocoCreateCommand,
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoUpdateCommand,
} from "@/modules/ambientes/bloco";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import { createListOutputMapper, mapDatedFields, mapImagemOutput } from "@/shared/mapping";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";

export class BlocoGraphqlMapper {
  static toListInput(dto: BlocoListInputGraphQlDto | null): BlocoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new BlocoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    return input;
  }

  static toFindOneInput(id: string): BlocoFindOneQuery {
    const input = new BlocoFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: BlocoCreateInputGraphQlDto): BlocoCreateCommand {
    const input = new BlocoCreateCommand();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.campus = { id: dto.campus.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: BlocoUpdateInputGraphQlDto,
  ): BlocoFindOneQuery & BlocoUpdateCommand {
    const input = new BlocoFindOneQuery() as BlocoFindOneQuery & BlocoUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.codigo !== undefined) input.codigo = dto.codigo;
    if (dto.campus !== undefined) input.campus = { id: dto.campus.id };
    return input;
  }

  static toFindOneOutputDto(output: BlocoFindOneQueryResult): BlocoFindOneOutputGraphQlDto {
    const dto = new BlocoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.codigo = output.codigo;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    BlocoListOutputGraphQlDto,
    BlocoGraphqlMapper.toFindOneOutputDto,
  );
}
