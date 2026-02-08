import {
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
} from "@/modules/ambiente";
import { BlocoFindOneOutputDto, ImagemFindOneOutputDto } from "@/server/nest/modules/bloco/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { AmbienteFindOneOutputDto } from "../rest/ambiente.rest.dto";
import { AmbienteListInputGqlDto, AmbienteListOutputGqlDto } from "./ambiente.graphql.dto";

export class AmbienteGraphqlMapper {
  static toListInput(dto: AmbienteListInputGqlDto | null): AmbienteListInput | null {
    if (!dto) {
      return null;
    }

    const input = new AmbienteListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.bloco.id"] = dto.filterBlocoId;
    input["filter.bloco.campus.id"] = dto.filterBlocoCampusId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): AmbienteFindOneInput {
    const input = new AmbienteFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: AmbienteFindOneOutput): AmbienteFindOneOutputDto {
    const dto = new AmbienteFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.descricao = output.descricao;
    dto.codigo = output.codigo;
    dto.capacidade = output.capacidade;
    dto.tipo = output.tipo;
    dto.bloco = output.bloco as unknown as BlocoFindOneOutputDto;
    dto.imagemCapa = output.imagemCapa as unknown as ImagemFindOneOutputDto | null;
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: AmbienteListOutput): AmbienteListOutputGqlDto {
    const dto = new AmbienteListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
