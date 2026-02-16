import { UsuarioRestMapper } from "@/modules/acesso/usuario/presentation/rest";
import { AmbienteRestMapper } from "@/modules/sisgea/ambiente/presentation/rest";
import {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaUpdateInputDto,
} from "@/modules/sisgea/reserva";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  ReservaCreateInputRestDto,
  ReservaFindOneInputRestDto,
  ReservaFindOneOutputRestDto,
  ReservaListOutputRestDto,
  ReservaUpdateInputRestDto,
} from "./reserva.rest.dto";

export class ReservaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(ReservaFindOneInputDto);

  static toListInput = createListInputMapper(ReservaListInputDto, [
    "filter.id",
    "filter.situacao",
    "filter.tipo",
    "filter.ambiente.id",
    "filter.ambiente.bloco.id",
    "filter.ambiente.bloco.campus.id",
    "filter.usuario.id",
  ]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ReservaListOutputRestDto,
    ReservaRestMapper.toFindOneOutputDto,
  );
}
