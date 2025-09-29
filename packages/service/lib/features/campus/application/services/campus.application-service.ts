import { Inject, Injectable } from "@nestjs/common";
import {
  CampusCreateInputDto,
  CampusDeleteOneByIdInputDto,
  CampusFindOneByIdInputDto,
  CampusListInputDto,
  CampusUpdateOneByIdInputDto
} from "@/features/campus/application/dtos";
import {
  CAMPUS_REPOSITORY,
  ICampusAuthorizationPort,
  type ICampusRepositoryPort
} from "@/features/campus/application/ports";
import { CampusFindOneByIdQuery, CampusListQuery } from "@/features/campus/application/queries";
import {
  CampusCreateUseCase,
  CampusDeleteOneByIdUseCase,
  CampusUpdateOneByIdUseCase
} from "@/features/campus/application/use-cases";

@Injectable()
export class CampusApplicationService {
  constructor(
    @Inject(CAMPUS_REPOSITORY)
    private campusRepository: ICampusRepositoryPort,
  ) {
  }

  campusList(authorization: ICampusAuthorizationPort, inputDto: CampusListInputDto) {
    const query = new CampusListQuery(this.campusRepository);
    return query.execute(authorization, inputDto);
  }

  campusFindOneById(authorization: ICampusAuthorizationPort, inputDto: CampusFindOneByIdInputDto) {
    const query = new CampusFindOneByIdQuery(this.campusRepository);
    return query.execute(authorization, inputDto);
  }

  campusCreate(authorization: ICampusAuthorizationPort, inputDto: CampusCreateInputDto) {
    const useCase = new CampusCreateUseCase(this.campusRepository);
    return useCase.execute(authorization, inputDto);
  }

  campusUpdateOneById(authorization: ICampusAuthorizationPort, inputDto: CampusUpdateOneByIdInputDto) {
    const useCase = new CampusUpdateOneByIdUseCase(this.campusRepository);
    return useCase.execute(authorization, inputDto);
  }

  campusDeleteOneById(authorization: ICampusAuthorizationPort, inputDto: CampusDeleteOneByIdInputDto) {
    const useCase = new CampusDeleteOneByIdUseCase(this.campusRepository);
    return useCase.execute(authorization, inputDto);
  }
}
