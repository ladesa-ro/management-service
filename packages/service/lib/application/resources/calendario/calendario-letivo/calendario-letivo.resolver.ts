import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@Resolver()
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  //

  async calendarioLetivoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CalendarioLetivoFindAll") dto: IAppRequest<"CalendarioLetivoFindAll">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, dto);
  }

  //

  async calendarioLetivoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("CalendarioLetivoFindOneById") dto: IAppRequest<"CalendarioLetivoFindOneById">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async calendarioLetivoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CalendarioLetivoCreate") dto: IAppRequest<"CalendarioLetivoCreate">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  async calendarioLetivoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CalendarioLetivoUpdate") dto: IAppRequest<"CalendarioLetivoUpdate">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  async calendarioLetivoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CalendarioLetivoDeleteOneById") dto: IAppRequest<"CalendarioLetivoDeleteOneById">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
