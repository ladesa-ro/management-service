import {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "@/modules/sisgha/aula";
import { DiarioGraphqlMapper } from "@/server/nest/modules/diario/graphql/diario.graphql.mapper";
import { IntervaloDeTempoGraphqlMapper } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  AmbienteFindOneOutputForAulaGraphQlDto,
  AulaCreateInputGraphQlDto,
  AulaFindOneOutputGraphQlDto,
  AulaListInputGraphQlDto,
  AulaListOutputGraphQlDto,
  AulaUpdateInputGraphQlDto,
} from "./aula.graphql.dto";

export class AulaGraphqlMapper {
  static toListInput(dto: AulaListInputGraphQlDto | null): AulaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new AulaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.intervaloDeTempo.id"] = dto.filterIntervaloDeTempoId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): AulaFindOneInputDto {
    const input = new AulaFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: AulaCreateInputGraphQlDto): AulaCreateInputDto {
    const input = new AulaCreateInputDto();
    input.data = dto.data;
    input.modalidade = dto.modalidade ?? null;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diario = { id: dto.diario.id };
    input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: AulaUpdateInputGraphQlDto,
  ): AulaFindOneInputDto & AulaUpdateInputDto {
    const input = new AulaFindOneInputDto() as AulaFindOneInputDto & AulaUpdateInputDto;
    input.id = id;
    if (dto.data !== undefined) {
      input.data = dto.data;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = dto.modalidade;
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    if (dto.ambiente !== undefined) {
      input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    }
    return input;
  }

  private static mapAmbiente(ambiente: any | null): AmbienteFindOneOutputForAulaGraphQlDto | null {
    if (!ambiente) return null;
    const dto = new AmbienteFindOneOutputForAulaGraphQlDto();
    dto.id = ambiente.id;
    dto.nome = ambiente.nome;
    dto.descricao = ambiente.descricao;
    dto.codigo = ambiente.codigo;
    dto.capacidade = ambiente.capacidade;
    dto.tipo = ambiente.tipo;
    dto.dateCreated = ambiente.dateCreated as unknown as Date;
    dto.dateUpdated = ambiente.dateUpdated as unknown as Date;
    dto.dateDeleted = ambiente.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toFindOneOutputDto(output: AulaFindOneOutputDto): AulaFindOneOutputGraphQlDto {
    const dto = new AulaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.data = output.data as string;
    dto.modalidade = output.modalidade;
    dto.intervaloDeTempo = IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(
      output.intervaloDeTempo,
    );
    dto.diario = DiarioGraphqlMapper.toFindOneOutputDto(output.diario);
    dto.ambiente = this.mapAmbiente(output.ambiente);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: AulaListOutputDto): AulaListOutputGraphQlDto {
    const dto = new AulaListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
