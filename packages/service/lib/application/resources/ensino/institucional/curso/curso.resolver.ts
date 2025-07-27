import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CursoService } from "./curso.service";

@Resolver()
export class CursoResolver {
  constructor(private cursoService: CursoService) {}

  async cursoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CursoFindAll") dto: IAppRequest<"CursoFindAll">) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  async cursoFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CursoFindOneById") dto: IAppRequest<"CursoFindOneById">) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  async cursoCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CursoCreate") dto: IAppRequest<"CursoCreate">) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  async cursoUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CursoUpdate") dto: IAppRequest<"CursoUpdate">) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  async cursoDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CursoDeleteOneById") dto: IAppRequest<"CursoDeleteOneById">) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
