import {
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoUpdateCommand,
} from "@/modules/ensino/nivel-formacao";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/shared/mapping";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";

export class NivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(NivelFormacaoFindOneQuery);

  static toListInput = createListInputMapper(NivelFormacaoListQuery, ["filter.id"]);

  static toCreateInput(dto: NivelFormacaoCreateInputRestDto): NivelFormacaoCreateCommand {
    const input = new NivelFormacaoCreateCommand();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(dto: NivelFormacaoUpdateInputRestDto): NivelFormacaoUpdateCommand {
    const input = new NivelFormacaoUpdateCommand();
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: NivelFormacaoFindOneQueryResult,
  ): NivelFormacaoFindOneOutputRestDto {
    const dto = new NivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    NivelFormacaoListOutputRestDto,
    NivelFormacaoRestMapper.toFindOneOutputDto,
  );
}
