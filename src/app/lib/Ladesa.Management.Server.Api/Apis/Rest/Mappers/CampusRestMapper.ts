import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusUpdateInputDto,
} from "@/Ladesa.Management.Application/ambientes/campus";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/CampusRestDto";
import { EnderecoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/EnderecoRestMapper";

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
