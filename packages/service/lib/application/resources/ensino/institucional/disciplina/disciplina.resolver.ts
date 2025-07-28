import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisciplinaService } from "./disciplina.service";

@Resolver()
export class DisciplinaResolver {
  constructor(private disciplinaService: DisciplinaService) {}

  async disciplinaFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DisciplinaFindAll") dto: IAppRequest<"DisciplinaFindAll">) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  async disciplinaFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DisciplinaFindOneById") dto: IAppRequest<"DisciplinaFindOneById">) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, dto);
  }

  async disciplinaCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DisciplinaCreate") dto: IAppRequest<"DisciplinaCreate">) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  async disciplinaUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DisciplinaUpdate") dto: IAppRequest<"DisciplinaUpdateOneById">) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  async disciplinaDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DisciplinaDeleteOneById") dto: IAppRequest<"DisciplinaDeleteOneById">) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, dto);
  }
}
