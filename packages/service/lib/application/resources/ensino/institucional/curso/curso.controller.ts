import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CursoService } from "./curso.service";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  @Get("/")
  async cursoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoList") dto: IAppRequest<"CursoList">) {
    const domain: IDomain.CursoListInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async cursoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoFindById") dto: IAppRequest<"CursoFindOneById">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async cursoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoCreate") dto: IAppRequest<"CursoCreate">) {
    const domain: IDomain.CursoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoUpdate") dto: IAppRequest<"CursoUpdateOneById">) {
    const domain: IDomain.CursoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async cursoGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoGetImagemCapa") dto: IAppRequest<"CursoGetImagemCapa">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoGetImagemCapa(accessContext, domain);
  }

  @Put("/:id/imagem/capa")
  async cursoImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoSetImagemCapa") dto: IAppRequest<"CursoSetImagemCapa">, @UploadedFile() file: Express.Multer.File) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async cursoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoDeleteOneById") dto: IAppRequest<"CursoDeleteOneById">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoDeleteOneById(accessContext, domain);
  }
}
