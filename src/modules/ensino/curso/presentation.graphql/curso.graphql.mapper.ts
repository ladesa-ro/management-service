import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  CursoCreateCommand,
  CursoFindOneQuery,
  CursoFindOneQueryResult,
  CursoListQuery,
  CursoUpdateCommand,
} from "@/modules/ensino/curso";
import { OfertaFormacaoGraphqlMapper } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.mapper";
import {
  CursoCreateInputGraphQlDto,
  CursoFindOneOutputGraphQlDto,
  CursoListInputGraphQlDto,
  CursoListOutputGraphQlDto,
  CursoUpdateInputGraphQlDto,
} from "./curso.graphql.dto";

function mapImagemOutput(imagem: any): any {
  if (!imagem) return null;
  return {
    id: imagem.id,
    descricao: imagem.descricao,
    versoes: (imagem.versoes || []).map((v: any) => ({
      id: v.id,
      largura: v.largura,
      altura: v.altura,
      formato: v.formato,
      mimeType: v.mimeType,
      arquivo: {
        id: v.arquivo.id,
        name: v.arquivo.name,
        mimeType: v.arquivo.mimeType,
        sizeBytes: v.arquivo.sizeBytes,
        storageType: v.arquivo.storageType,
        dateCreated: v.arquivo.dateCreated,
        dateUpdated: v.arquivo.dateUpdated,
        dateDeleted: v.arquivo.dateDeleted,
      },
      dateCreated: v.dateCreated,
      dateUpdated: v.dateUpdated,
      dateDeleted: v.dateDeleted,
    })),
    dateCreated: imagem.dateCreated,
    dateUpdated: imagem.dateUpdated,
    dateDeleted: imagem.dateDeleted,
  };
}

export class CursoGraphqlMapper {
  static toListInput(dto: CursoListInputGraphQlDto | null): CursoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new CursoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CursoFindOneQuery {
    const input = new CursoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: CursoCreateInputGraphQlDto): CursoCreateCommand {
    const input = new CursoCreateCommand();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: CursoUpdateInputGraphQlDto,
  ): CursoFindOneQuery & CursoUpdateCommand {
    const input = new CursoFindOneQuery() as CursoFindOneQuery & CursoUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.nomeAbreviado !== undefined) {
      input.nomeAbreviado = dto.nomeAbreviado;
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.imagemCapa !== undefined) {
      input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    }
    return input;
  }

  static toFindOneOutputDto(output: CursoFindOneQueryResult): CursoFindOneOutputGraphQlDto {
    const dto = new CursoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoGraphqlMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CursoListOutputGraphQlDto,
    CursoGraphqlMapper.toFindOneOutputDto,
  );
}
