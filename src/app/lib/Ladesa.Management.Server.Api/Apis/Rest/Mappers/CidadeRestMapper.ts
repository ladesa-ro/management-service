import {
  createListInputMapper,
  createListOutputMapper,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
} from "@/Ladesa.Management.Application/localidades/cidade";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/CidadeRestDto";
import { EstadoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/EstadoRestMapper";

export class CidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toListInput = createListInputMapper(CidadeListInputDto, [
    "filter.id",
    "filter.estado.id",
    "filter.estado.nome",
    "filter.estado.sigla",
  ]);
  static toListOutputDto = createListOutputMapper(
    CidadeListOutputRestDto,
    CidadeRestMapper.toFindOneOutputDto,
  );

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneInput(dto: CidadeFindOneInputRestDto): CidadeFindOneInputDto {
    const input = new CidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toFindOneOutputDto(output: CidadeFindOneOutputDto): CidadeFindOneOutputRestDto {
    const dto = new CidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoRestMapper.toFindOneOutputDto(output.estado);
    return dto;
  }
}
