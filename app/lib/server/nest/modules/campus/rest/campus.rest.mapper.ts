import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "@/modules/sisgea/campus";
import { EnderecoRestMapper } from "@/server/nest/modules/endereco/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListInputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "./campus.rest.dto";

export class CampusRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CampusFindOneInputRestDto): CampusFindOneInputDto {
    const input = new CampusFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CampusListInputRestDto | null): CampusListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CampusListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: CampusCreateInputRestDto): CampusCreateInputDto {
    const input = new CampusCreateInputDto();
    input.nomeFantasia = dto.nomeFantasia;
    input.razaoSocial = dto.razaoSocial;
    input.apelido = dto.apelido;
    input.cnpj = dto.cnpj;
    input.endereco = EnderecoRestMapper.toCreateInput(dto.endereco);
    return input;
  }

  static toUpdateInput(
    params: CampusFindOneInputRestDto,
    dto: CampusUpdateInputRestDto,
  ): CampusFindOneInputDto & CampusUpdateInputDto {
    const input = new CampusFindOneInputDto() as CampusFindOneInputDto & CampusUpdateInputDto;
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
      input.endereco = EnderecoRestMapper.toCreateInput(dto.endereco);
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CampusFindOneOutputDto): CampusFindOneOutputRestDto {
    const dto = new CampusFindOneOutputRestDto();
    dto.id = output.id;
    dto.nomeFantasia = output.nomeFantasia;
    dto.razaoSocial = output.razaoSocial;
    dto.apelido = output.apelido;
    dto.cnpj = output.cnpj;
    dto.endereco = EnderecoRestMapper.toFindOneOutputDto(output.endereco);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CampusListOutputDto): CampusListOutputRestDto {
    const dto = new CampusListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
