import { CampusFindOneByIdInputDto } from "@/features/campus/application/dtos";
import { CampusForbiddenDeleteError } from "@/features/campus/application/errors";
import { CampusFindOneByIdQuery } from "@/features/campus/application/queries";
import { CampusFindOneByIdInputSchema } from "@/features/campus/application/schemas";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import type { ICampusAuthorizationPort, ICampusRepositoryPort } from "../ports";

export class CampusDeleteOneByIdUseCase extends BaseUseCase {
  constructor(private readonly campusRepository: ICampusRepositoryPort) {
    super();
  }

  public async execute(authorization: ICampusAuthorizationPort, incomingDto: CampusFindOneByIdInputDto): Promise<CampusFindOneByIdInputDto> {
    const dto = (await validateDto(CampusFindOneByIdInputSchema, incomingDto)) as CampusFindOneByIdInputDto;

    const findOneByIdQuery = new CampusFindOneByIdQuery(this.campusRepository);
    await findOneByIdQuery.execute(authorization, dto);

    const canDelete = authorization.canDelete(dto.id);

    if (!canDelete) {
      throw new CampusForbiddenDeleteError();
    }

    const {id} = await this.campusRepository.deleteOneById(dto.id);

    return {id};
  }
}
