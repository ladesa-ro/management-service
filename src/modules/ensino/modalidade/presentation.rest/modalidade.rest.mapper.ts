import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/shared/mapping";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";

export class ModalidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(ModalidadeFindOneQuery);

  static toListInput = createListInputMapper(ModalidadeListQuery, ["filter.id"]);

  static toCreateInput(dto: ModalidadeCreateInputRestDto): ModalidadeCreateCommand {
    const input = new ModalidadeCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: ModalidadeFindOneInputRestDto,
    dto: ModalidadeUpdateInputRestDto,
  ): ModalidadeFindOneQuery & ModalidadeUpdateCommand {
    const input = new ModalidadeFindOneQuery() as ModalidadeFindOneQuery & ModalidadeUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: ModalidadeFindOneQueryResult): ModalidadeFindOneOutputRestDto {
    const dto = new ModalidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ModalidadeListOutputRestDto,
    ModalidadeRestMapper.toFindOneOutputDto,
  );
}
