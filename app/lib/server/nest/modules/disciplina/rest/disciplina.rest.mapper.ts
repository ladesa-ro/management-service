import {
  DisciplinaCreateInput,
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaListInput,
  DisciplinaListOutput,
  DisciplinaUpdateInput,
} from "@/core/disciplina";
import {
  ImagemArquivoFindOneFromImagemOutputDto,
  ImagemFindOneOutputDto,
} from "@/server/nest/modules/bloco/rest";
import {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "./disciplina.rest.dto";

export class DisciplinaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DisciplinaFindOneInputDto): DisciplinaFindOneInput {
    const input = new DisciplinaFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DisciplinaListInputDto | null): DisciplinaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DisciplinaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: DisciplinaCreateInputDto): DisciplinaCreateInput {
    const input = new DisciplinaCreateInput();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.cargaHoraria = dto.cargaHoraria;
    return input;
  }

  static toUpdateInput(
    params: DisciplinaFindOneInputDto,
    dto: DisciplinaUpdateInputDto,
  ): DisciplinaFindOneInput & DisciplinaUpdateInput {
    const input = new DisciplinaFindOneInput() as DisciplinaFindOneInput & DisciplinaUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.nomeAbreviado !== undefined) {
      input.nomeAbreviado = dto.nomeAbreviado;
    }
    if (dto.cargaHoraria !== undefined) {
      input.cargaHoraria = dto.cargaHoraria;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: DisciplinaFindOneOutput): DisciplinaFindOneOutputDto {
    const dto = new DisciplinaFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.cargaHoraria = output.cargaHoraria;
    dto.imagemCapa = output.imagemCapa ? this.toImagemOutputDto(output.imagemCapa as any) : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toImagemOutputDto(output: any): ImagemFindOneOutputDto {
    const dto = new ImagemFindOneOutputDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    dto.versoes = (output.versoes || []).map((v: any) => {
      const versaoDto = new ImagemArquivoFindOneFromImagemOutputDto();
      versaoDto.id = v.id;
      versaoDto.largura = v.largura;
      versaoDto.altura = v.altura;
      versaoDto.formato = v.formato;
      versaoDto.mimeType = v.mimeType;
      versaoDto.arquivo = { id: v.arquivo?.id };
      return versaoDto;
    });
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DisciplinaListOutput): DisciplinaListOutputDto {
    const dto = new DisciplinaListOutputDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
