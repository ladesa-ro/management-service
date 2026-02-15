import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "@/modules/ensino/etapa";
import type {
  EtapaCreateInputRestDto,
  EtapaFindOneInputRestDto,
  EtapaFindOneOutputRestDto,
  EtapaListInputRestDto,
  EtapaListOutputRestDto,
  EtapaUpdateInputRestDto,
} from "./etapa.rest.dto";

export class EtapaRestMapper {
  static toCoreFindOneInput(dto: EtapaFindOneInputRestDto): EtapaFindOneInputDto {
    return {
      id: dto.id,
    };
  }

  static toRestFindOneOutput(output: EtapaFindOneOutputDto): EtapaFindOneOutputRestDto {
    return output as unknown as EtapaFindOneOutputRestDto;
  }

  static toCoreListInput(dto: EtapaListInputRestDto): EtapaListInputDto {
    return dto as EtapaListInputDto;
  }

  static toRestListOutput(output: EtapaListOutputDto): EtapaListOutputRestDto {
    return output as unknown as EtapaListOutputRestDto;
  }

  static toCoreCreateInput(dto: EtapaCreateInputRestDto): EtapaCreateInputDto {
    return dto as unknown as EtapaCreateInputDto;
  }

  static toCoreUpdateInput(dto: EtapaUpdateInputRestDto): EtapaUpdateInputDto {
    return dto as unknown as EtapaUpdateInputDto;
  }
}
