import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { NivelFormacaoRestMapper } from "@/modules/ensino/nivel-formacao/presentation/rest";
import { OfertaFormacaoRestMapper } from "@/modules/ensino/oferta-formacao/presentation/rest";
import {
  OfertaFormacaoNivelFormacaoCreateCommand,
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoUpdateInputRestDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";

export class OfertaFormacaoNivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoNivelFormacaoFindOneQuery);

  static toListInput = createListInputMapper(OfertaFormacaoNivelFormacaoListQuery, ["filter.id"]);

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputRestDto,
  ): OfertaFormacaoNivelFormacaoCreateCommand {
    const input = new OfertaFormacaoNivelFormacaoCreateCommand();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
    dto: OfertaFormacaoNivelFormacaoUpdateInputRestDto,
  ): OfertaFormacaoNivelFormacaoFindOneQuery & OfertaFormacaoNivelFormacaoUpdateCommand {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneQuery() as OfertaFormacaoNivelFormacaoFindOneQuery &
        OfertaFormacaoNivelFormacaoUpdateCommand;
    input.id = params.id;
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.nivelFormacao !== undefined) {
      input.nivelFormacao = { id: dto.nivelFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneQueryResult,
  ): OfertaFormacaoNivelFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.nivelFormacao = NivelFormacaoRestMapper.toFindOneOutputDto(output.nivelFormacao);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputRestDto,
    OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto,
  );
}
