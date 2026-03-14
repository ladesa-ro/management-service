import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDisciplinaCreateCommand,
  IDisciplinaCreateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import {
  type IDisciplinaDeleteCommand,
  IDisciplinaDeleteCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import {
  type IDisciplinaUpdateCommand,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import {
  type IDisciplinaUpdateImagemCapaCommand,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { IDisciplinaGetImagemCapaQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-get-imagem-capa.query.handler.interface";
import { IDisciplinaListQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "../dtos";

@Injectable()
export class DisciplinaService {
  constructor(
    @Inject(IDisciplinaCreateCommandHandler)
    private readonly createHandler: IDisciplinaCreateCommandHandler,
    @Inject(IDisciplinaUpdateCommandHandler)
    private readonly updateHandler: IDisciplinaUpdateCommandHandler,
    @Inject(IDisciplinaDeleteCommandHandler)
    private readonly deleteHandler: IDisciplinaDeleteCommandHandler,
    @Inject(IDisciplinaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IDisciplinaUpdateImagemCapaCommandHandler,
    @Inject(IDisciplinaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IDisciplinaGetImagemCapaQueryHandler,
    @Inject(IDisciplinaListQueryHandler)
    private readonly listHandler: IDisciplinaListQueryHandler,
    @Inject(IDisciplinaFindOneQueryHandler)
    private readonly findOneHandler: IDisciplinaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Disciplina", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as DisciplinaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as DisciplinaFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IDisciplinaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IDisciplinaUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: DisciplinaFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IDisciplinaDeleteCommand);
  }

  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    return this.getImagemCapaHandler.execute({ accessContext, id });
  }

  updateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({
      accessContext,
      dto,
      file,
    } satisfies IDisciplinaUpdateImagemCapaCommand);
  }
}
