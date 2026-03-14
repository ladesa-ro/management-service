import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { IProfessorIndisponibilidadeFindOneQueryHandler } from "@/modules/ensino/professor-indisponibilidade/domain/queries/professor-indisponibilidade-find-one.query.handler.interface";
import { IProfessorIndisponibilidadeListQueryHandler } from "@/modules/ensino/professor-indisponibilidade/domain/queries/professor-indisponibilidade-list.query.handler.interface";
import type {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "../dtos";
import type { IProfessorIndisponibilidadeUseCasePort } from "../ports";

@Injectable()
export class ProfessorIndisponibilidadeService implements IProfessorIndisponibilidadeUseCasePort {
  constructor(
    @Inject(IProfessorIndisponibilidadeListQueryHandler)
    private readonly listHandler: IProfessorIndisponibilidadeListQueryHandler,
    @Inject(IProfessorIndisponibilidadeFindOneQueryHandler)
    private readonly findOneHandler: IProfessorIndisponibilidadeFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeListInputDto | null = null,
  ): Promise<ProfessorIndisponibilidadeListOutputDto> {
    return this.listHandler.execute({ accessContext, dto });
  }

  findById(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto });
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("ProfessorIndisponibilidade", dto.id);
    }

    return entity;
  }
}
