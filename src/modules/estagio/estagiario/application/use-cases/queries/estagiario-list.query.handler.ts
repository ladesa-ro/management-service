import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstagiarioListQuery,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import {
  ESTAGIARIO_REPOSITORY_PORT,
  type IEstagiarioRepositoryPort,
} from "../../../domain/repositories";
import type { EstagiarioListOutputDto } from "../../dtos";

@Injectable()
export class EstagiarioListQueryHandlerImpl implements IEstagiarioListQueryHandler {
  constructor(
    @Inject(ESTAGIARIO_REPOSITORY_PORT)
    private readonly repository: IEstagiarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEstagiarioListQuery): Promise<EstagiarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
