import { CampusCreateInputDto } from "@/features/campus/application/dtos";
import { CampusForbiddenCreateError } from "@/features/campus/application/errors";
import { CampusFindOneByIdQuery } from "@/features/campus/application/queries";
import { CampusCreateInputSchema } from "@/features/campus/application/schemas";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import { CampusFindOneByIdOutputDto } from "../dtos/campus-find-one-by-id-output.dto";
import type { ICampusAuthorizationPort, ICampusRepositoryPort } from "../ports";

export class CampusCreateUseCase extends BaseUseCase {
  constructor(private readonly campusRepository: ICampusRepositoryPort) {
    super();
  }

  public async execute(authorization: ICampusAuthorizationPort, incomingDto: CampusCreateInputDto): Promise<CampusFindOneByIdOutputDto> {
    const dto = (await validateDto(CampusCreateInputSchema, incomingDto)) as CampusCreateInputDto;

    const canCreate = authorization.canCreate(dto);

    if (!canCreate) {
      throw new CampusForbiddenCreateError();
    }

    const {id} = await this.campusRepository.create(dto);

    const findOneByIdQuery = new CampusFindOneByIdQuery(this.campusRepository);
    return findOneByIdQuery.execute(authorization, {id});
  }
}
