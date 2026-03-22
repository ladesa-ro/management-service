import { NivelFormacaoRestMapper } from "@/modules/ensino/nivel-formacao/presentation.rest";
import { createListOutputMapper } from "@/shared/mapping";
import { getNow } from "@/utils/date";
import {
  OfertaFormacaoNivelFormacaoBulkReplaceCommand,
  OfertaFormacaoNivelFormacaoListQuery,
} from "../domain";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "../domain/queries";
import { OfertaFormacaoRestMapper } from "./oferta-formacao.rest.mapper";
import {
  OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListInputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoParentParamsRestDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";

export class OfertaFormacaoNivelFormacaoRestMapper {
  static toListInput(
    parentParams: OfertaFormacaoNivelFormacaoParentParamsRestDto,
    dto: OfertaFormacaoNivelFormacaoListInputRestDto,
  ): OfertaFormacaoNivelFormacaoListQuery {
    const input = new OfertaFormacaoNivelFormacaoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto["filter.id"];
    input["filter.ofertaFormacao.id"] = [parentParams.ofertaFormacaoId];
    input["filter.nivelFormacao.id"] = dto["filter.nivelFormacao.id"];
    return input;
  }

  static toBulkReplaceInput(
    parentParams: OfertaFormacaoNivelFormacaoParentParamsRestDto,
    dto: OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto,
  ): OfertaFormacaoNivelFormacaoBulkReplaceCommand {
    const input = new OfertaFormacaoNivelFormacaoBulkReplaceCommand();
    input.ofertaFormacaoId = parentParams.ofertaFormacaoId;
    input.niveis = dto.niveis.map((n) => ({
      nivelFormacaoId: n.nivelFormacaoId,
    }));
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneQueryResult,
  ): OfertaFormacaoNivelFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nivelFormacao = NivelFormacaoRestMapper.toFindOneOutputDto(output.nivelFormacao);
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : getNow();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : getNow();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputRestDto,
    OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto,
  );
}
