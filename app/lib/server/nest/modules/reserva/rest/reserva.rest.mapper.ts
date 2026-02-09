import {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "@/modules/reserva";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { UsuarioRestMapper } from "@/server/nest/modules/usuario/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ReservaCreateInputRestDto,
  ReservaFindOneInputRestDto,
  ReservaFindOneOutputRestDto,
  ReservaListInputRestDto,
  ReservaListOutputRestDto,
  ReservaUpdateInputRestDto,
} from "./reserva.rest.dto";

export class ReservaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: ReservaFindOneInputRestDto): ReservaFindOneInputDto {
    const input = new ReservaFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: ReservaListInputRestDto | null): ReservaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ReservaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.situacao"] = dto["filter.situacao"];
    input["filter.tipo"] = dto["filter.tipo"];
    input["filter.ambiente.id"] = dto["filter.ambiente.id"];
    input["filter.ambiente.bloco.id"] = dto["filter.ambiente.bloco.id"];
    input["filter.ambiente.bloco.campus.id"] = dto["filter.ambiente.bloco.campus.id"];
    input["filter.usuario.id"] = dto["filter.usuario.id"];
    return input;
  }

  static toCreateInput(dto: ReservaCreateInputRestDto): ReservaCreateInputDto {
    const input = new ReservaCreateInputDto();
    input.situacao = dto.situacao;
    input.motivo = dto.motivo;
    input.tipo = dto.tipo;
    input.rrule = dto.rrule;
    input.usuario = { id: dto.usuario.id };
    input.ambiente = { id: dto.ambiente.id };
    return input;
  }

  static toUpdateInput(
    params: ReservaFindOneInputRestDto,
    dto: ReservaUpdateInputRestDto,
  ): ReservaFindOneInputDto & ReservaUpdateInputDto {
    const input = new ReservaFindOneInputDto() as ReservaFindOneInputDto & ReservaUpdateInputDto;
    input.id = params.id;
    if (dto.situacao !== undefined) {
      input.situacao = dto.situacao;
    }
    if (dto.motivo !== undefined) {
      input.motivo = dto.motivo;
    }
    if (dto.tipo !== undefined) {
      input.tipo = dto.tipo;
    }
    if (dto.rrule !== undefined) {
      input.rrule = dto.rrule;
    }
    if (dto.usuario !== undefined) {
      input.usuario = { id: dto.usuario.id };
    }
    if (dto.ambiente !== undefined) {
      input.ambiente = { id: dto.ambiente.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: ReservaFindOneOutputDto): ReservaFindOneOutputRestDto {
    const dto = new ReservaFindOneOutputRestDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.motivo = output.motivo;
    dto.tipo = output.tipo;
    dto.rrule = output.rrule;
    dto.usuario = UsuarioRestMapper.toFindOneOutputDto(output.usuario);
    dto.ambiente = AmbienteRestMapper.toFindOneOutputDto(output.ambiente);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: ReservaListOutputDto): ReservaListOutputRestDto {
    const dto = new ReservaListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
