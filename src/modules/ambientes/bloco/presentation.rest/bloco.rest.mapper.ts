import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  BlocoCreateCommand,
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoUpdateCommand,
} from "@/modules/ambientes/bloco";
import { CampusRestMapper } from "@/modules/ambientes/campus/presentation.rest";
import type { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import {
  BlocoCreateInputRestDto,
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  BlocoListOutputRestDto,
  BlocoUpdateInputRestDto,
  ImagemArquivoFindOneFromImagemOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "./bloco.rest.dto";

export class BlocoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(BlocoFindOneQuery);

  static toListInput = createListInputMapper(BlocoListQuery, ["filter.id", "filter.campus.id"]);

  static toCreateInput(dto: BlocoCreateInputRestDto): BlocoCreateCommand {
    const input = new BlocoCreateCommand();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.campus = { id: dto.campus.id };
    return input;
  }

  static toUpdateInput(
    params: BlocoFindOneInputRestDto,
    dto: BlocoUpdateInputRestDto,
  ): BlocoFindOneQuery & BlocoUpdateCommand {
    const input = new BlocoFindOneQuery() as BlocoFindOneQuery & BlocoUpdateCommand;
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

  static toFindOneOutputDto(output: BlocoFindOneQueryResult): BlocoFindOneOutputRestDto {
    const dto = new BlocoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.codigo = output.codigo;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.imagemCapa = output.imagemCapa ? this.toImagemOutputDto(output.imagemCapa) : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toImagemOutputDto(output: ImagemFindOneQueryResult): ImagemFindOneOutputRestDto {
    const dto = new ImagemFindOneOutputRestDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    dto.versoes = (output.versoes || []).map((v) => {
      const versaoDto = new ImagemArquivoFindOneFromImagemOutputRestDto();
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

  static toListOutputDto = createListOutputMapper(
    BlocoListOutputRestDto,
    BlocoRestMapper.toFindOneOutputDto,
  );
}
