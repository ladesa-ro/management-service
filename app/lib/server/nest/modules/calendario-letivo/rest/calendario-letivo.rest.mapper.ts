import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/modules/sisgha/calendario-letivo";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import { OfertaFormacaoRestMapper } from "@/server/nest/modules/oferta-formacao/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  CalendarioLetivoCreateInputRestDto,
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
  CalendarioLetivoListInputRestDto,
  CalendarioLetivoListOutputRestDto,
  CalendarioLetivoUpdateInputRestDto,
} from "./calendario-letivo.rest.dto";

export class CalendarioLetivoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CalendarioLetivoFindOneInputRestDto): CalendarioLetivoFindOneInputDto {
    const input = new CalendarioLetivoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: CalendarioLetivoListInputRestDto | null,
  ): CalendarioLetivoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CalendarioLetivoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.campus.id"] = dto["filter.campus.id"];
    input["filter.ofertaFormacao.id"] = dto["filter.ofertaFormacao.id"];
    return input;
  }

  static toCreateInput(dto: CalendarioLetivoCreateInputRestDto): CalendarioLetivoCreateInputDto {
    const input = new CalendarioLetivoCreateInputDto();
    input.nome = dto.nome;
    input.ano = dto.ano;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: CalendarioLetivoFindOneInputRestDto,
    dto: CalendarioLetivoUpdateInputRestDto,
  ): CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto {
    const input = new CalendarioLetivoFindOneInputDto() as CalendarioLetivoFindOneInputDto &
      CalendarioLetivoUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.ano !== undefined) {
      input.ano = dto.ano;
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: CalendarioLetivoFindOneOutputDto,
  ): CalendarioLetivoFindOneOutputRestDto {
    const dto = new CalendarioLetivoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.ano = output.ano;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CalendarioLetivoListOutputDto): CalendarioLetivoListOutputRestDto {
    const dto = new CalendarioLetivoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
