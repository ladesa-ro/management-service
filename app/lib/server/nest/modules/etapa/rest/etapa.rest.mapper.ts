import type {
  EtapaCreateInput,
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  EtapaUpdateInput,
} from "@/modules/etapa";
import type {
  EtapaCreateInputRestDto,
  EtapaFindOneInputRestDto,
  EtapaFindOneOutputRestDto,
  EtapaListInputRestDto,
  EtapaListOutputRestDto,
  EtapaUpdateInputRestDto,
} from "./etapa.rest.dto";

export class EtapaRestMapper {
  static toCoreFindOneInput(dto: EtapaFindOneInputRestDto): EtapaFindOneInput {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(output: EtapaFindOneOutput): EtapaFindOneOutputRestDto {
    return output as unknown as EtapaFindOneOutputRestDto;
  }

  static toCoreListInput(dto: EtapaListInputRestDto): EtapaListInput {
    return dto as EtapaListInput;
  }

  static toRestListOutput(output: EtapaListOutput): EtapaListOutputRestDto {
    return output as unknown as EtapaListOutputRestDto;
  }

  static toCoreCreateInput(dto: EtapaCreateInputRestDto): EtapaCreateInput {
    return dto as unknown as EtapaCreateInput;
  }

  static toCoreUpdateInput(dto: EtapaUpdateInputRestDto): EtapaUpdateInput {
    return dto as unknown as EtapaUpdateInput;
  }
}
