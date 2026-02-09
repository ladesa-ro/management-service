import {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "@/modules/reserva";
import { AmbienteGraphqlMapper } from "@/server/nest/modules/ambiente/graphql/ambiente.graphql.mapper";
import { UsuarioGraphqlMapper } from "@/server/nest/modules/usuario/graphql/usuario.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ReservaCreateInputGraphQlDto,
  ReservaFindOneOutputGraphQlDto,
  ReservaListInputGraphQlDto,
  ReservaListOutputGraphQlDto,
  ReservaUpdateInputGraphQlDto,
} from "./reserva.graphql.dto";

export class ReservaGraphqlMapper {
  static toListInput(dto: ReservaListInputGraphQlDto | null): ReservaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ReservaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.situacao"] = dto.filterSituacao;
    input["filter.tipo"] = dto.filterTipo;
    input["filter.ambiente.id"] = dto.filterAmbienteId;
    input["filter.ambiente.bloco.id"] = dto.filterAmbienteBlocoId;
    input["filter.ambiente.bloco.campus.id"] = dto.filterAmbienteBlocoCampusId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ReservaFindOneInputDto {
    const input = new ReservaFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: ReservaCreateInputGraphQlDto): ReservaCreateInputDto {
    const input = new ReservaCreateInputDto();
    input.situacao = dto.situacao;
    input.motivo = dto.motivo ?? null;
    input.tipo = dto.tipo ?? null;
    input.rrule = dto.rrule;
    input.ambiente = { id: dto.ambiente.id };
    input.usuario = { id: dto.usuario.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: ReservaUpdateInputGraphQlDto,
  ): ReservaFindOneInputDto & ReservaUpdateInputDto {
    const input = new ReservaFindOneInputDto() as ReservaFindOneInputDto & ReservaUpdateInputDto;
    input.id = params.id;
    if (dto.situacao !== undefined) input.situacao = dto.situacao;
    if (dto.motivo !== undefined) input.motivo = dto.motivo ?? null;
    if (dto.tipo !== undefined) input.tipo = dto.tipo ?? null;
    if (dto.rrule !== undefined) input.rrule = dto.rrule;
    if (dto.ambiente !== undefined) input.ambiente = { id: dto.ambiente.id };
    if (dto.usuario !== undefined) input.usuario = { id: dto.usuario.id };
    return input;
  }

  static toFindOneOutputDto(output: ReservaFindOneOutputDto): ReservaFindOneOutputGraphQlDto {
    const dto = new ReservaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.motivo = output.motivo;
    dto.tipo = output.tipo;
    dto.rrule = output.rrule;
    dto.ambiente = AmbienteGraphqlMapper.toFindOneOutputDto(output.ambiente);
    dto.usuario = UsuarioGraphqlMapper.toFindOneOutputDto(output.usuario);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: ReservaListOutputDto): ReservaListOutputGraphQlDto {
    const dto = new ReservaListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
