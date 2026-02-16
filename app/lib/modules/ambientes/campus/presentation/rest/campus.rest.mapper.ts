import { EnderecoRestMapper } from "@/modules/@base/localidades/endereco/presentation/rest";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusUpdateInputDto,
} from "@/modules/ambientes/campus";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "./campus.rest.dto";

export class CampusRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(CampusFindOneInputDto);

  static toListInput = createListInputMapper(CampusListInputDto, ["filter.id"]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CampusListOutputRestDto,
    CampusRestMapper.toFindOneOutputDto,
  );
}
