import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaService } from "./turma.service";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  async turmaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaList") dto: IAppRequest<"TurmaList">) {
    const domain: IDomain.TurmaListInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async turmaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaFindById") dto: IAppRequest<"TurmaFindOneById">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async turmaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaCreate") dto: IAppRequest<"TurmaCreate">) {
    const domain: IDomain.TurmaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async turmaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaUpdate") dto: IAppRequest<"TurmaUpdateOneById">) {
    const domain: IDomain.TurmaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async turmaGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaGetImagemCapa") dto: IAppRequest<"TurmaGetImagemCapa">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaGetImagemCapa(accessContext, domain);
  }

  @Put("/:id/imagem/capa")
  async turmaImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaSetImagemCapa") dto: IAppRequest<"TurmaSetImagemCapa">, @UploadedFile() file: Express.Multer.File) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async turmaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDeleteOneById") dto: IAppRequest<"TurmaDeleteOneById">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaDeleteOneById(accessContext, domain);
  }
}
