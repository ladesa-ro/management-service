import { CampusListInputDto, CampusListOutputDto } from "@/features/campus/application/dtos";
import { ICampusAuthorizationPort, type ICampusRepositoryPort } from "@/features/campus/application/ports";
import { CampusListInputSchema, CampusListOutputItemSchema } from "@/features/campus/application/schemas";
import { BaseQuery, getAllowedSelectionFromSchema, validateDto } from "@/shared";

export class CampusListQuery extends BaseQuery {
  constructor(private readonly campusRepository: ICampusRepositoryPort) {
    super();
  }

  public async execute(authorization: ICampusAuthorizationPort, incomingInputDto: CampusListInputDto | unknown): Promise<CampusListOutputDto> {
    const validatedInputDto: CampusListInputDto = await validateDto(CampusListInputSchema, incomingInputDto);

    const selection = getAllowedSelectionFromSchema(CampusListOutputItemSchema, validatedInputDto.selection);
    const readFilters = await authorization.getReadFilters();

    return this.campusRepository.list(readFilters, validatedInputDto, selection);
  }
}
