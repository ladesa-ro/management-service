import { Inject, Injectable } from "@nestjs/common";
import type { IAbstractResourceService, IAuthorizationService, IRequestActor } from "../../di";
import { DomainTokens, type IAmbienteRepository } from "../../di";
import type { T } from "../../typings";

@Injectable()
export class AmbienteListService implements IAbstractResourceService<T.AmbienteListInput, T.AmbienteListOutput> {
  constructor(
    @Inject(DomainTokens.Repositories.Ambiente)
    private ambienteRepository: IAmbienteRepository,

    @Inject(DomainTokens.Authorization.Service)
    private authorizationService: IAuthorizationService,
  ) {
  }

  async execute(requestActor: IRequestActor, input: T.AmbienteListInput): Promise<T.AmbienteListOutput> {
    const contextFilters = await this.authorizationService.getContextFilters(requestActor, "ambiente:find")
    return this.ambienteRepository.list(input, contextFilters)
  }
}
