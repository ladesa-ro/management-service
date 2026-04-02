import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImageCommandHandler,
  type IImagemSaveImagemCapaCommand,
  type IImagemSaveImagemCapaCommandHandler,
} from "@/modules/armazenamento/imagem/domain/commands";

@Impl()
export class ImagemSaveImagemCapaCommandHandlerImpl implements IImagemSaveImagemCapaCommandHandler {
  constructor(
    @Dep(IImagemSaveImageCommandHandler)
    private readonly saveImageHandler: IImagemSaveImageCommandHandler,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { file }: IImagemSaveImagemCapaCommand,
  ): Promise<{ imagem: { id: string } }> {
    return this.saveImageHandler.execute(null, {
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
