import type {
  HorarioGeradoAulaCreateInput,
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
  HorarioGeradoAulaUpdateInput,
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
  ): HorarioGeradoAulaFindOneInput {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(
    output: HorarioGeradoAulaFindOneOutput,
  ): HorarioGeradoAulaFindOneOutputRestDto {
    return output as unknown as HorarioGeradoAulaFindOneOutputRestDto;
  }

  static toCoreListInput(dto: HorarioGeradoAulaListInputRestDto): HorarioGeradoAulaListInput {
    return dto as HorarioGeradoAulaListInput;
  }

  static toRestListOutput(output: HorarioGeradoAulaListOutput): HorarioGeradoAulaListOutputRestDto {
    return output as unknown as HorarioGeradoAulaListOutputRestDto;
  }

  static toCoreCreateInput(dto: HorarioGeradoAulaCreateInputRestDto): HorarioGeradoAulaCreateInput {
    return dto as unknown as HorarioGeradoAulaCreateInput;
  }

  static toCoreUpdateInput(dto: HorarioGeradoAulaUpdateInputRestDto): HorarioGeradoAulaUpdateInput {
    return dto as unknown as HorarioGeradoAulaUpdateInput;
  }
}
