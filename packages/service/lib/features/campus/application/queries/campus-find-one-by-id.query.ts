import { CampusFindOneByIdInputDto, CampusFindOneByIdOutputDto } from "@/features/campus/application/dtos";
import { CampusForbiddenReadError, CampusNotFoundError } from "@/features/campus/application/errors/campus.errors";
import type { ICampusAuthorizationPort, ICampusRepositoryPort } from "@/features/campus/application/ports";
import { CampusFindOneByIdOutputSchema } from "@/features/campus/application/schemas";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared";

export class CampusFindOneByIdQuery extends BaseQuery {
  constructor(private readonly campusRepository: ICampusRepositoryPort) {
    super();
  }

  public async execute(authorization: ICampusAuthorizationPort, inputDto: CampusFindOneByIdInputDto): Promise<CampusFindOneByIdOutputDto> {
    const selection = getAllowedSelectionFromSchema(CampusFindOneByIdOutputSchema, inputDto.selection);

    const campus = await this.campusRepository.findOneById(inputDto.id, selection);

    if (!campus) {
      throw new CampusNotFoundError();
    }

    const canRead = await authorization.canRead(campus.id);

    if (!canRead) {
      throw new CampusForbiddenReadError();
    }

    return campus;
  }
}
