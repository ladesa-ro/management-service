import { CampusUpdateOneByIdInputDto } from "@/features/campus/application/dtos";
import { CampusForbiddenCreateError } from "@/features/campus/application/errors";
import { CampusFindOneByIdQuery } from "@/features/campus/application/queries";
import { CampusUpdateOneByIdInputSchema } from "@/features/campus/application/schemas";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import { CampusFindOneByIdOutputDto } from "../dtos/campus-find-one-by-id-output.dto";
import type { ICampusAuthorizationPort, ICampusRepositoryPort } from "../ports";

export class CampusUpdateOneByIdUseCase extends BaseUseCase {
  constructor(private readonly campusRepository: ICampusRepositoryPort) {
    super();
  }

  public async execute(authorization: ICampusAuthorizationPort, incomingDto: CampusUpdateOneByIdInputDto): Promise<CampusFindOneByIdOutputDto> {
    const dto = (await validateDto(CampusUpdateOneByIdInputSchema, incomingDto)) as CampusUpdateOneByIdInputDto;

    const canUpdate = authorization.canUpdate(dto);

    if (!canUpdate) {
      throw new CampusForbiddenCreateError();
    }

    const {id} = await this.campusRepository.updateOneById(dto);

    const findOneByIdQuery = new CampusFindOneByIdQuery(this.campusRepository);
    return findOneByIdQuery.execute(authorization, {id});
  }
}
