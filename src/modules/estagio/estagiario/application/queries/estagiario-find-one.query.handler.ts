import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstagiarioFindOneQuery,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import { IEstagiarioRepository } from "../../domain/repositories";
import type { EstagiarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class EstagiarioFindOneQueryHandlerImpl implements IEstagiarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEstagiarioFindOneQuery): Promise<EstagiarioFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
