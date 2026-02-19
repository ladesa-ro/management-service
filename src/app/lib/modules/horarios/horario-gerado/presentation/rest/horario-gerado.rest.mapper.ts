import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "@/modules/horarios/horario-gerado";
import type {
  HorarioGeradoCreateInputRestDto,
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
  HorarioGeradoListInputRestDto,
  HorarioGeradoListOutputRestDto,
  HorarioGeradoUpdateInputRestDto,
} from "./horario-gerado.rest.dto";

export class HorarioGeradoRestMapper {
  static toCoreFindOneInput(dto: HorarioGeradoFindOneInputRestDto): HorarioGeradoFindOneInputDto {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(
    output: HorarioGeradoFindOneOutputDto,
  ): HorarioGeradoFindOneOutputRestDto {
    return output as unknown as HorarioGeradoFindOneOutputRestDto;
  }

  static toCoreListInput(dto: HorarioGeradoListInputRestDto): HorarioGeradoListInputDto {
    return dto as HorarioGeradoListInputDto;
  }

  static toRestListOutput(output: HorarioGeradoListOutputDto): HorarioGeradoListOutputRestDto {
    return output as unknown as HorarioGeradoListOutputRestDto;
  }

  static toCoreCreateInput(dto: HorarioGeradoCreateInputRestDto): HorarioGeradoCreateInputDto {
    return dto as unknown as HorarioGeradoCreateInputDto;
  }

  static toCoreUpdateInput(dto: HorarioGeradoUpdateInputRestDto): HorarioGeradoUpdateInputDto {
    return dto as unknown as HorarioGeradoUpdateInputDto;
  }
}
