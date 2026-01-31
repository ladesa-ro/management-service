import {
  CampusCreateInput,
  CampusFindOneInput,
  CampusFindOneOutput,
  CampusListInput,
  CampusListOutput,
  CampusUpdateInput,
} from "@/modules/campus";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "./campus.rest.dto";

export class CampusRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CampusFindOneInputDto): CampusFindOneInput {
    const input = new CampusFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CampusListInputDto | null): CampusListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CampusListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: CampusCreateInputDto): CampusCreateInput {
    const input = new CampusCreateInput();
    input.nomeFantasia = dto.nomeFantasia;
    input.razaoSocial = dto.razaoSocial;
    input.apelido = dto.apelido;
    input.cnpj = dto.cnpj;
    input.endereco = dto.endereco as any;
    return input;
  }

  static toUpdateInput(
    params: CampusFindOneInputDto,
    dto: CampusUpdateInputDto,
  ): CampusFindOneInput & CampusUpdateInput {
    const input = new CampusFindOneInput() as CampusFindOneInput & CampusUpdateInput;
    input.id = params.id;
    if (dto.nomeFantasia !== undefined) {
      input.nomeFantasia = dto.nomeFantasia;
    }
    if (dto.razaoSocial !== undefined) {
      input.razaoSocial = dto.razaoSocial;
    }
    if (dto.apelido !== undefined) {
      input.apelido = dto.apelido;
    }
    if (dto.cnpj !== undefined) {
      input.cnpj = dto.cnpj;
    }
    if (dto.endereco !== undefined) {
      input.endereco = dto.endereco as any;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CampusFindOneOutput): CampusFindOneOutputDto {
    const dto = new CampusFindOneOutputDto();
    dto.id = output.id;
    dto.nomeFantasia = output.nomeFantasia;
    dto.razaoSocial = output.razaoSocial;
    dto.apelido = output.apelido;
    dto.cnpj = output.cnpj;
    dto.endereco = output.endereco as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CampusListOutput): CampusListOutputDto {
    const dto = new CampusListOutputDto();
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
