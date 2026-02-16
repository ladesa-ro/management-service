import {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteUpdateInputDto,
} from "@/modules/sisgea/ambiente";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  AmbienteCreateInputRestDto,
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  AmbienteListOutputRestDto,
  AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";

export class AmbienteRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(AmbienteFindOneInputDto);

  static toListInput = createListInputMapper(AmbienteListInputDto, [
    "filter.id",
    "filter.bloco.id",
    "filter.bloco.campus.id",
  ]);

  static toCreateInput(dto: AmbienteCreateInputRestDto): AmbienteCreateInputDto {
    const input = new AmbienteCreateInputDto();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.descricao = dto.descricao;
    input.capacidade = dto.capacidade;
    input.tipo = dto.tipo;
    input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toUpdateInput(
    params: AmbienteFindOneInputRestDto,
    dto: AmbienteUpdateInputRestDto,
  ): AmbienteFindOneInputDto & AmbienteUpdateInputDto {
    const input = new AmbienteFindOneInputDto() as AmbienteFindOneInputDto & AmbienteUpdateInputDto;
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

  static toFindOneOutputDto(output: AmbienteFindOneOutputDto): AmbienteFindOneOutputRestDto {
    const dto = new AmbienteFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.descricao = output.descricao;
    dto.codigo = output.codigo;
    dto.capacidade = output.capacidade;
    dto.tipo = output.tipo;
    dto.bloco = BlocoRestMapper.toFindOneOutputDto(output.bloco);
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    AmbienteListOutputRestDto,
    AmbienteRestMapper.toFindOneOutputDto,
  );
}
