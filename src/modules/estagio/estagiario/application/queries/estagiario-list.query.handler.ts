import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstagiarioListQuery,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import { IEstagiarioRepository } from "../../domain/repositories";
import type { EstagiarioListOutputDto } from "../dtos";

@DeclareImplementation()
export class EstagiarioListQueryHandlerImpl implements IEstagiarioListQueryHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEstagiarioListQuery): Promise<EstagiarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
