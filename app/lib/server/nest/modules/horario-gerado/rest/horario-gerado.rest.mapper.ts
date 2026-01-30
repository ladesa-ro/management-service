import type {
  HorarioGeradoCreateInput,
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  HorarioGeradoUpdateInput,
} from "@/core/horario-gerado";
import type {
  HorarioGeradoCreateInputRestDto,
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
  HorarioGeradoListInputRestDto,
  HorarioGeradoListOutputRestDto,
  HorarioGeradoUpdateInputRestDto,
} from "./horario-gerado.rest.dto";

export class HorarioGeradoRestMapper {
  static toCoreFindOneInput(dto: HorarioGeradoFindOneInputRestDto): HorarioGeradoFindOneInput {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(
    output: HorarioGeradoFindOneOutput,
  ): HorarioGeradoFindOneOutputRestDto {
    return output as unknown as HorarioGeradoFindOneOutputRestDto;
  }

  static toCoreListInput(dto: HorarioGeradoListInputRestDto): HorarioGeradoListInput {
    return dto as HorarioGeradoListInput;
  }

  static toRestListOutput(output: HorarioGeradoListOutput): HorarioGeradoListOutputRestDto {
    return output as unknown as HorarioGeradoListOutputRestDto;
  }

  static toCoreCreateInput(dto: HorarioGeradoCreateInputRestDto): HorarioGeradoCreateInput {
    return dto as unknown as HorarioGeradoCreateInput;
  }

  static toCoreUpdateInput(dto: HorarioGeradoUpdateInputRestDto): HorarioGeradoUpdateInput {
    return dto as unknown as HorarioGeradoUpdateInput;
  }
}
