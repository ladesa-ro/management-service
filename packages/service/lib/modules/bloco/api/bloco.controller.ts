import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { BlocoService } from "./domain/bloco.service";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {
  }

  @Get("/")
  async blocoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoList") dto: IAppRequest<"BlocoList">) {
    const domain: IDomain.BlocoListInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async blocoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoCreate") dto: IAppRequest<"BlocoCreate">) {
    const domain: IDomain.BlocoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async blocoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoCreate") dto: IAppRequest<"BlocoCreate">) {
    const domain: IDomain.BlocoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async blocoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoUpdate") dto: IAppRequest<"BlocoUpdateOneById">) {
    const domain: IDomain.BlocoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async blocoGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoGetImagemCapa") dto: IAppRequest<"BlocoGetImagemCapa">) {
    const domain: IDomain.BlocoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoGetImagemCapa(accessContext, domain.id);
  }

  @Put("/:id/imagem/capa")
  async blocoImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoSetImagemCapa") dto: IAppRequest<"BlocoSetImagemCapa">, @UploadedFile() file: Express.Multer.File) {
    const domain: IDomain.BlocoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async blocoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("BlocoDeleteOneById") dto: IAppRequest<"BlocoDeleteOneById">) {
    const domain: IDomain.BlocoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.blocoService.blocoDeleteOneById(accessContext, domain);
  }
}
