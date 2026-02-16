import type { ImagemFindOneOutputDto } from "@/modules/base/armazenamento/imagem";
import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoUpdateInputDto,
} from "@/modules/sisgea/bloco";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
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

  static toFindOneInput = createFindOneInputMapper(BlocoFindOneInputDto);

  static toListInput = createListInputMapper(BlocoListInputDto, ["filter.id", "filter.campus.id"]);

  static toCreateInput(dto: BlocoCreateInputRestDto): BlocoCreateInputDto {
    const input = new BlocoCreateInputDto();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.campus = { id: dto.campus.id };
    return input;
  }

  static toUpdateInput(
    params: BlocoFindOneInputRestDto,
    dto: BlocoUpdateInputRestDto,
  ): BlocoFindOneInputDto & BlocoUpdateInputDto {
    const input = new BlocoFindOneInputDto() as BlocoFindOneInputDto & BlocoUpdateInputDto;
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

  static toFindOneOutputDto(output: BlocoFindOneOutputDto): BlocoFindOneOutputRestDto {
    const dto = new BlocoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.codigo = output.codigo;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.imagemCapa = output.imagemCapa ? this.toImagemOutputDto(output.imagemCapa) : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toImagemOutputDto(output: ImagemFindOneOutputDto): ImagemFindOneOutputRestDto {
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
