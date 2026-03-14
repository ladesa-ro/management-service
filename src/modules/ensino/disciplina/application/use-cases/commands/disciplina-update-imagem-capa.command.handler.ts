import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
  saveEntityImagemField,
} from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type IDisciplinaUpdateImagemCapaCommand,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "../../../domain/repositories";

@Injectable()
export class DisciplinaUpdateImagemCapaCommandHandlerImpl
  implements IDisciplinaUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({
    accessContext,
    dto,
    file,
  }: IDisciplinaUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    if (!current) {
      throw new ResourceNotFoundError("Disciplina", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "disciplina:update",
      { dto: { id: current.id } },
      current.id,
    );

    return saveEntityImagemField(
      current.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}
