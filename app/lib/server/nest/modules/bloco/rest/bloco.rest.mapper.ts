import {
  BlocoCreateInput,
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
  BlocoUpdateInput,
} from "@/modules/bloco";
import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
  ImagemArquivoFindOneFromImagemOutputDto,
  ImagemFindOneOutputDto,
} from "./bloco.rest.dto";

export class BlocoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: BlocoFindOneInputDto): BlocoFindOneInput {
    const input = new BlocoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: BlocoListInputDto | null): BlocoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new BlocoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.campus.id"] = dto["filter.campus.id"];
    return input;
  }

  static toCreateInput(dto: BlocoCreateInputDto): BlocoCreateInput {
    const input = new BlocoCreateInput();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.campus = { id: dto.campus.id };
    return input;
  }

  static toUpdateInput(
    params: BlocoFindOneInputDto,
    dto: BlocoUpdateInputDto,
  ): BlocoFindOneInput & BlocoUpdateInput {
    const input = new BlocoFindOneInput() as BlocoFindOneInput & BlocoUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.codigo !== undefined) {
      input.codigo = dto.codigo;
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: BlocoFindOneOutput): BlocoFindOneOutputDto {
    const dto = new BlocoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.codigo = output.codigo;
    dto.campus = output.campus as any;
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

  static toListOutputDto(output: BlocoListOutput): BlocoListOutputDto {
    const dto = new BlocoListOutputDto();
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
