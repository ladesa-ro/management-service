import {
  AmbienteCreateInput,
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
  AmbienteUpdateInput,
} from "@/modules/ambiente";
import {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "./ambiente.rest.dto";

export class AmbienteRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: AmbienteFindOneInputDto): AmbienteFindOneInput {
    const input = new AmbienteFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: AmbienteListInputDto | null): AmbienteListInput | null {
    if (!dto) {
      return null;
    }

    const input = new AmbienteListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.bloco.id"] = dto["filter.bloco.id"];
    input["filter.bloco.campus.id"] = dto["filter.bloco.campus.id"];
    return input;
  }

  static toCreateInput(dto: AmbienteCreateInputDto): AmbienteCreateInput {
    const input = new AmbienteCreateInput();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.descricao = dto.descricao;
    input.capacidade = dto.capacidade;
    input.tipo = dto.tipo;
    input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toUpdateInput(
    params: AmbienteFindOneInputDto,
    dto: AmbienteUpdateInputDto,
  ): AmbienteFindOneInput & AmbienteUpdateInput {
    const input = new AmbienteFindOneInput() as AmbienteFindOneInput & AmbienteUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.codigo !== undefined) {
      input.codigo = dto.codigo;
    }
    if (dto.descricao !== undefined) {
      input.descricao = dto.descricao;
    }
    if (dto.capacidade !== undefined) {
      input.capacidade = dto.capacidade;
    }
    if (dto.tipo !== undefined) {
      input.tipo = dto.tipo;
    }
    if (dto.bloco !== undefined) {
      input.bloco = { id: dto.bloco.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

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

  static toListOutputDto(output: AmbienteListOutput): AmbienteListOutputDto {
    const dto = new AmbienteListOutputDto();
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
