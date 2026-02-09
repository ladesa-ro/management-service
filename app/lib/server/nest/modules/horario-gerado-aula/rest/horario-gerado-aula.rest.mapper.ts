import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "@/modules/horario-gerado-aula";
import type {
  HorarioGeradoAulaCreateInputRestDto,
  HorarioGeradoAulaFindOneInputRestDto,
  HorarioGeradoAulaFindOneOutputRestDto,
  HorarioGeradoAulaListInputRestDto,
  HorarioGeradoAulaListOutputRestDto,
  HorarioGeradoAulaUpdateInputRestDto,
} from "./horario-gerado-aula.rest.dto";

export class HorarioGeradoAulaRestMapper {
  static toCoreFindOneInput(
    dto: HorarioGeradoAulaFindOneInputRestDto,
  ): HorarioGeradoAulaFindOneInputDto {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(
    output: HorarioGeradoAulaFindOneOutputDto,
  ): HorarioGeradoAulaFindOneOutputRestDto {
    return output as unknown as HorarioGeradoAulaFindOneOutputRestDto;
  }

  static toCoreListInput(dto: HorarioGeradoAulaListInputRestDto): HorarioGeradoAulaListInputDto {
    return dto as HorarioGeradoAulaListInputDto;
  }

  static toRestListOutput(
    output: HorarioGeradoAulaListOutputDto,
  ): HorarioGeradoAulaListOutputRestDto {
    return output as unknown as HorarioGeradoAulaListOutputRestDto;
  }

  static toCoreCreateInput(
    dto: HorarioGeradoAulaCreateInputRestDto,
  ): HorarioGeradoAulaCreateInputDto {
    return dto as unknown as HorarioGeradoAulaCreateInputDto;
  }

  static toCoreUpdateInput(
    dto: HorarioGeradoAulaUpdateInputRestDto,
  ): HorarioGeradoAulaUpdateInputDto {
    return dto as unknown as HorarioGeradoAulaUpdateInputDto;
  }
}
