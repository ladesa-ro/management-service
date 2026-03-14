import { Inject, Injectable } from "@nestjs/common";
import {
  type IEtapaFindOneQuery,
  IEtapaFindOneQueryHandler,
} from "@/modules/ensino/etapa/domain/queries/etapa-find-one.query.handler.interface";
import type { EtapaFindOneOutputDto } from "../../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../../ports";

@Injectable()
export class EtapaFindOneQueryHandlerImpl implements IEtapaFindOneQueryHandler {
  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    private readonly repository: IEtapaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEtapaFindOneQuery): Promise<EtapaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
