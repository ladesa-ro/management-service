import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IImagemSaveImageCommandHandler,
  type IImagemSaveImagemCapaCommand,
  type IImagemSaveImagemCapaCommandHandler,
} from "@/modules/armazenamento/imagem/domain/commands";

@DeclareImplementation()
export class ImagemSaveImagemCapaCommandHandlerImpl implements IImagemSaveImagemCapaCommandHandler {
  constructor(
    @DeclareDependency(IImagemSaveImageCommandHandler)
    private readonly saveImageHandler: IImagemSaveImageCommandHandler,
  ) {}

  async execute({ file }: IImagemSaveImagemCapaCommand): Promise<{ imagem: { id: string } }> {
    return this.saveImageHandler.execute({
      file,
      options: {
        minWidth: 1,
        minHeight: 1,
        transforms: [
          {
            outputAs: "jpeg",
          },
        ],
      },
    });
  }
}
