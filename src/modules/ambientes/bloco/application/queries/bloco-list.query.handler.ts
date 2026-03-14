import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IBlocoListQuery,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import { IBlocoRepository } from "../../domain/repositories";
import type { BlocoListOutputDto } from "../dtos";

@DeclareImplementation()
export class BlocoListQueryHandlerImpl implements IBlocoListQueryHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
  ) {}

  async execute({ accessContext, dto, selection }: IBlocoListQuery): Promise<BlocoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
