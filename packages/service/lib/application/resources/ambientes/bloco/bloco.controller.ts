import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { BlocoService } from "./bloco.service";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  @Get("/")
  async blocoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoFindAll") dto: IAppRequest<"BlocoFindAll">): Promise<LadesaTypings.BlocoListOperationOutput["success"]> {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  @Get("/:id")
  async blocoFindById(@AccessContextHttp() accessContext: AccessContext) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  @Post("/")
  async blocoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoCreate") dto: IAppRequest<"BlocoCreate">) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  @Patch("/:id")
  async blocoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoUpdate") dto: IAppRequest<"BlocoUpdate">) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async blocoGetImagemCapa(@AccessContextHttp() accessContext: AccessContext) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async blocoImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @UploadedFile() file: Express.Multer.File) {
    return this.blocoService.blocoUpdateImagemCapa(accessContext, { id }, file);
  }

  @Delete("/:id")
  async blocoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoDeleteOneById") dto: IAppRequest<"BlocoDeleteOneById">) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
