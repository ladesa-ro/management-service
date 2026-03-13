import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioUpdateInputDto,
} from "@/modules/ensino/diario";
import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.mapper";
import {
  AmbienteFindOneOutputForDiarioGraphQlDto,
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
  DisciplinaFindOneOutputForDiarioGraphQlDto,
  TurmaFindOneOutputForDiarioGraphQlDto,
} from "./diario.graphql.dto";

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

export class DiarioGraphqlMapper {
  static toListInput(dto: DiarioListInputGraphQlDto | null): DiarioListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.turma.id"] = dto.filterTurmaId;
    input["filter.disciplina.id"] = dto.filterDisciplinaId;
    input["filter.calendarioLetivo.id"] = dto.filterCalendarioLetivoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiarioFindOneInputDto {
    const input = new DiarioFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DiarioCreateInputGraphQlDto): DiarioCreateInputDto {
    const input = new DiarioCreateInputDto();
    input.ativo = dto.ativo;
    input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    input.turma = { id: dto.turma.id };
    input.disciplina = { id: dto.disciplina.id };
    input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: DiarioUpdateInputGraphQlDto,
  ): DiarioFindOneInputDto & DiarioUpdateInputDto {
    const input = new DiarioFindOneInputDto() as DiarioFindOneInputDto & DiarioUpdateInputDto;
    input.id = id;
    if (dto.ativo !== undefined) {
      input.ativo = dto.ativo;
    }
    if (dto.calendarioLetivo !== undefined) {
      input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.disciplina !== undefined) {
      input.disciplina = { id: dto.disciplina.id };
    }
    if (dto.ambientePadrao !== undefined) {
      input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    }
    if (dto.imagemCapa !== undefined) {
      input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    }
    return input;
  }

  private static mapTurma(turma: any): TurmaFindOneOutputForDiarioGraphQlDto {
    const dto = new TurmaFindOneOutputForDiarioGraphQlDto();
    dto.id = turma.id;
    dto.periodo = turma.periodo;
    mapDatedFields(dto, turma);
    return dto;
  }

  private static mapDisciplina(disciplina: any): DisciplinaFindOneOutputForDiarioGraphQlDto {
    const dto = new DisciplinaFindOneOutputForDiarioGraphQlDto();
    dto.id = disciplina.id;
    dto.nome = disciplina.nome;
    dto.nomeAbreviado = disciplina.nomeAbreviado;
    dto.cargaHoraria = disciplina.cargaHoraria;
    mapDatedFields(dto, disciplina);
    return dto;
  }

  private static mapAmbiente(
    ambiente: any | null,
  ): AmbienteFindOneOutputForDiarioGraphQlDto | null {
    if (!ambiente) return null;
    const dto = new AmbienteFindOneOutputForDiarioGraphQlDto();
    dto.id = ambiente.id;
    dto.nome = ambiente.nome;
    dto.descricao = ambiente.descricao;
    dto.codigo = ambiente.codigo;
    dto.capacidade = ambiente.capacidade;
    dto.tipo = ambiente.tipo;
    mapDatedFields(dto, ambiente);
    return dto;
  }

  static toFindOneOutputDto(output: DiarioFindOneOutputDto): DiarioFindOneOutputGraphQlDto {
    const dto = new DiarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.calendarioLetivo = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(
      output.calendarioLetivo,
    );
    dto.turma = this.mapTurma(output.turma);
    dto.disciplina = this.mapDisciplina(output.disciplina);
    dto.ambientePadrao = this.mapAmbiente(output.ambientePadrao);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioListOutputGraphQlDto,
    DiarioGraphqlMapper.toFindOneOutputDto,
  );
}
