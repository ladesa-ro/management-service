import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
} from "@/modules/@base/localidades/cidade";
import { EstadoRestMapper } from "@/modules/@base/localidades/estado/presentation/rest/estado.rest.mapper";
import {
  createListInputMapper,
  createListOutputMapper,
} from "@/modules/@shared/application/mappers";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";

export class CidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CidadeFindOneInputRestDto): CidadeFindOneInputDto {
    const input = new CidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput = createListInputMapper(CidadeListInputDto, [
    "filter.id",
    "filter.estado.id",
    "filter.estado.nome",
    "filter.estado.sigla",
  ]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CidadeFindOneOutputDto): CidadeFindOneOutputRestDto {
    const dto = new CidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoRestMapper.toFindOneOutputDto(output.estado);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CidadeListOutputRestDto,
    CidadeRestMapper.toFindOneOutputDto,
  );
}
