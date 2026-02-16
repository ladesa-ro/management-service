import { CampusRestMapper } from "@/modules/ambientes/campus/presentation/rest";
import { OfertaFormacaoRestMapper } from "@/modules/ensino/oferta-formacao/presentation/rest";
import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/modules/horarios/calendario-letivo";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  CalendarioLetivoCreateInputRestDto,
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
  CalendarioLetivoListOutputRestDto,
  CalendarioLetivoUpdateInputRestDto,
} from "./calendario-letivo.rest.dto";

export class CalendarioLetivoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(CalendarioLetivoFindOneInputDto);

  static toListInput = createListInputMapper(CalendarioLetivoListInputDto, [
    "filter.id",
    "filter.campus.id",
    "filter.ofertaFormacao.id",
  ]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CalendarioLetivoListOutputRestDto,
    CalendarioLetivoRestMapper.toFindOneOutputDto,
  );
}
