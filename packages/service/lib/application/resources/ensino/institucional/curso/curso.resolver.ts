import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CursoService } from "./curso.service";

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //

  async cursoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoFindAll") dto: IOperationInput<"CursoFindAll">,
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //

  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoFindOneById") dto: IOperationInput<"CursoFindOneById">,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async cursoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoCreate") dto: IOperationInput<"CursoCreate">,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoUpdate") dto: IOperationInput<"CursoUpdate">,
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoDeleteOneById") dto: IOperationInput<"CursoDeleteOneById">,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
