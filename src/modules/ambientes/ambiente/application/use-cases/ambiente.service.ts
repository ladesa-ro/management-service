import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IAmbienteCreateCommand,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import {
  type IAmbienteDeleteCommand,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import {
  type IAmbienteUpdateCommand,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import {
  type IAmbienteUpdateImagemCapaCommand,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { IAmbienteGetImagemCapaQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-get-imagem-capa.query.handler.interface";
import { IAmbienteListQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "../dtos";
import type { IAmbienteUseCasePort } from "../ports";

@Injectable()
export class AmbienteService implements IAmbienteUseCasePort {
  constructor(
    @Inject(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @Inject(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @Inject(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
    @Inject(IAmbienteUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IAmbienteUpdateImagemCapaCommandHandler,
    @Inject(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @Inject(IAmbienteGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IAmbienteGetImagemCapaQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Ambiente", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null> {
    return this.findById(accessContext, { id }, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id }, selection);
  }

  create(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IAmbienteCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IAmbienteUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: AmbienteFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IAmbienteDeleteCommand);
  }

  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    return this.getImagemCapaHandler.execute({ accessContext, id });
  }

  updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({
      accessContext,
      dto,
      file,
    } satisfies IAmbienteUpdateImagemCapaCommand);
  }
}
