import {
  ReservaCreateInput,
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
  ReservaUpdateInput,
} from "@/modules/reserva";
import { AmbienteFindOneOutputDto } from "@/server/nest/modules/ambiente/rest";
import { UsuarioFindOneOutputDto } from "@/server/nest/modules/usuario/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ReservaCreateInputDto,
  ReservaFindOneOutputDto,
  ReservaUpdateInputDto,
} from "../rest/reserva.rest.dto";
import { ReservaListInputGqlDto, ReservaListOutputGqlDto } from "./reserva.graphql.dto";

export class ReservaGraphqlMapper {
  static toListInput(dto: ReservaListInputGqlDto | null): ReservaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new ReservaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.ambiente.id"] = dto.filterAmbienteId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ReservaFindOneInput {
    const input = new ReservaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: ReservaCreateInputDto): ReservaCreateInput {
    const input = new ReservaCreateInput();
    input.situacao = dto.situacao;
    input.motivo = dto.motivo;
    input.tipo = dto.tipo;
    input.rrule = dto.rrule;
    input.usuario = { id: dto.usuario.id };
    input.ambiente = { id: dto.ambiente.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: ReservaUpdateInputDto,
  ): ReservaFindOneInput & ReservaUpdateInput {
    const input = new ReservaFindOneInput() as ReservaFindOneInput & ReservaUpdateInput;
    input.id = id;
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

  static toFindOneOutputDto(output: ReservaFindOneOutput): ReservaFindOneOutputDto {
    const dto = new ReservaFindOneOutputDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.motivo = output.motivo;
    dto.tipo = output.tipo;
    dto.rrule = output.rrule;
    dto.usuario = output.usuario as unknown as UsuarioFindOneOutputDto;
    dto.ambiente = output.ambiente as unknown as AmbienteFindOneOutputDto;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: ReservaListOutput): ReservaListOutputGqlDto {
    const dto = new ReservaListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
