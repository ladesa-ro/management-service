import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/curso";
import {
  CursoCreateInputRestDto,
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  CursoListOutputRestDto,
  CursoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/CursoRestDto";
import { BlocoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/BlocoRestMapper";
import { CampusRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/CampusRestMapper";
import { OfertaFormacaoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/OfertaFormacaoRestMapper";

export class CursoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(CursoFindOneInputDto);

  static toListInput = createListInputMapper(CursoListInputDto, [
    "filter.id",
    "filter.campus.id",
    "filter.ofertaFormacao.id",
  ]);

  static toCreateInput(dto: CursoCreateInputRestDto): CursoCreateInputDto {
    const input = new CursoCreateInputDto();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: CursoFindOneInputRestDto,
    dto: CursoUpdateInputRestDto,
  ): CursoFindOneInputDto & CursoUpdateInputDto {
    const input = new CursoFindOneInputDto() as CursoFindOneInputDto & CursoUpdateInputDto;
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
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CursoFindOneOutputDto): CursoFindOneOutputRestDto {
    const dto = new CursoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CursoListOutputRestDto,
    CursoRestMapper.toFindOneOutputDto,
  );
}
