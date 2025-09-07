import { CidadeListInputSchema, CidadeListOutputItemSchema } from "@/features/cidade/application/schemas";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";
import { CidadeListInputDto, CidadeListOutputDto } from "../dtos";
import type { ICidadeAuthorizationPort, ICidadeRepositoryPort } from "../ports";

export class CidadeListQuery extends BaseQuery {
  constructor(private readonly cidadeRepository: ICidadeRepositoryPort) {
    super();
  }

  public async execute(authorization: ICidadeAuthorizationPort, incomingInputDto: CidadeListInputDto | unknown): Promise<CidadeListOutputDto> {
    const validatedInputDto: CidadeListInputDto = await validateDto(CidadeListInputSchema, incomingInputDto);

    const selection = getAllowedSelectionFromSchema(CidadeListOutputItemSchema, validatedInputDto.selection);
    const readFilters = await authorization.getReadFilters();

    return this.cidadeRepository.list(readFilters, validatedInputDto, selection);
  }
}
