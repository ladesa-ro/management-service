import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Resolver()
export class HorarioGeradoAulaResolver {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  async horarioGeradoAulaFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaList") dto: IAppRequest<"HorarioGeradoAulaList">) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }

  async horarioGeradoAulaFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaFindOneById") dto: IAppRequest<"HorarioGeradoAulaFindOneById">) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.path.id });
  }

  async horarioGeradoAulaCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaCreate") dto: IAppRequest<"HorarioGeradoAulaCreate">) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  async horarioGeradoAulaUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("HorarioGeradoAulaUpdate") dto: IAppRequest<"HorarioGeradoAulaUpdateOneById">,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  async horarioGeradoAulaOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("HorarioGeradoAulaOneById") dto: IAppRequest<"HorarioGeradoAulaOneById">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.path.id });
  }
}
