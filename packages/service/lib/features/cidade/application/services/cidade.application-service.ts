import { Inject, Injectable } from "@nestjs/common";
import { CidadeFindOneByIdInputDto, CidadeListInputDto } from "../dtos";
import { CIDADE_REPOSITORY, type ICidadeAuthorizationPort, type ICidadeRepositoryPort } from "../ports";
import { CidadeFindOneByIdQuery, CidadeListQuery } from "../queries";

@Injectable()
export class CidadeApplicationService {
  constructor(
    @Inject(CIDADE_REPOSITORY)
    readonly cidadeRepository: ICidadeRepositoryPort,
  ) {
  }

  cidadeList(authorization: ICidadeAuthorizationPort, inputDto: CidadeListInputDto) {
    const findAllQuery = new CidadeListQuery(this.cidadeRepository);
    return findAllQuery.execute(authorization, inputDto);
  }

  cidadeFindOneById(authorization: ICidadeAuthorizationPort, inputDto: CidadeFindOneByIdInputDto) {
    const findOneByIdQuery = new CidadeFindOneByIdQuery(this.cidadeRepository);
    return findOneByIdQuery.execute(authorization, inputDto);
  }
}
