import {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "@/modules/sisgea/ambiente";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  AmbienteCreateInputRestDto,
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";

export class AmbienteRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: AmbienteFindOneInputRestDto): AmbienteFindOneInputDto {
    const input = new AmbienteFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: AmbienteListInputRestDto | null): AmbienteListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new AmbienteListInputDto();
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
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: AmbienteListOutputDto): AmbienteListOutputRestDto {
    const dto = new AmbienteListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
