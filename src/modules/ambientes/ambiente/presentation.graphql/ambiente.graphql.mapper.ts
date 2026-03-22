import {
  AmbienteCreateCommand,
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteUpdateCommand,
} from "@/modules/ambientes/ambiente";
import { BlocoGraphqlMapper } from "@/modules/ambientes/bloco/presentation.graphql/bloco.graphql.mapper";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";

export class AmbienteGraphqlMapper {
  static toListInput(dto: AmbienteListInputGraphQlDto | null): AmbienteListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new AmbienteListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.bloco.id"] = dto.filterBlocoId;
    input["filter.bloco.campus.id"] = dto.filterBlocoCampusId;
    return input;
  }

  static toFindOneInput = createFindOneInputMapper(AmbienteFindOneQuery);

  static toCreateInput(dto: AmbienteCreateInputGraphQlDto): AmbienteCreateCommand {
    const input = new AmbienteCreateCommand();
    input.nome = dto.nome;
    input.descricao = dto.descricao ?? null;
    input.codigo = dto.codigo;
    input.capacidade = dto.capacidade ?? null;
    input.tipo = dto.tipo ?? null;
    input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: AmbienteUpdateInputGraphQlDto,
  ): AmbienteFindOneQuery & AmbienteUpdateCommand {
    const input = new AmbienteFindOneQuery() as AmbienteFindOneQuery & AmbienteUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.descricao !== undefined) input.descricao = dto.descricao ?? null;
    if (dto.codigo !== undefined) input.codigo = dto.codigo;
    if (dto.capacidade !== undefined) input.capacidade = dto.capacidade ?? null;
    if (dto.tipo !== undefined) input.tipo = dto.tipo ?? null;
    if (dto.bloco !== undefined) input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toFindOneOutputDto(output: AmbienteFindOneQueryResult): AmbienteFindOneOutputGraphQlDto {
    const dto = new AmbienteFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.descricao = output.descricao;
    dto.codigo = output.codigo;
    dto.capacidade = output.capacidade;
    dto.tipo = output.tipo;
    dto.bloco = BlocoGraphqlMapper.toFindOneOutputDto(output.bloco);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    AmbienteListOutputGraphQlDto,
    AmbienteGraphqlMapper.toFindOneOutputDto,
  );
}
