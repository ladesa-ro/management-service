import {
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
} from "@/modules/ambiente";
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
    dto.bloco = output.bloco as any;
    dto.imagemCapa = output.imagemCapa as any;
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: AmbienteListOutput): AmbienteListOutputGqlDto {
    const dto = new AmbienteListOutputGqlDto();
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
