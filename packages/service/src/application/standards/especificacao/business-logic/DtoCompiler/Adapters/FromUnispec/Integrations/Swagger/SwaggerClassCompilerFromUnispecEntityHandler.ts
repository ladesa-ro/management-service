import {
  GenericClassCompilerFromUnispecEntityHandler,
  type IGenericClassCompilerFromUnispecEntityTypings,
} from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { SwaggerNodeCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/Swagger/SwaggerNodeCompiler";
import type { IDtoCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import type { INodeTypeObjectEntity } from "@/application/standards/especificacao/infrastructure";
import type { ICompileClassContext, ICompileClassPropertyContext } from "@/application/standards/especificacao/infrastructure/utils/class-compiler";
import { ApiProperty } from "@nestjs/swagger";

export class SwaggerClassCompilerFromUnispecEntityHandler extends GenericClassCompilerFromUnispecEntityHandler {
  public swaggerNodeCompiler = new SwaggerNodeCompiler();

  HandleClass(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<IGenericClassCompilerFromUnispecEntityTypings>): void {
    const dtoCompiler = classPropertyContext.classContext.classCompiler as IDtoCompiler;

    const dtoCompilerContext = dtoCompiler.GetContext("core");

    const entityNode: INodeTypeObjectEntity = classPropertyContext.classContext.node;

    const entityPropertyNode = classPropertyContext.propertyNode;

    const swaggerType = this.swaggerNodeCompiler.Handle(entityPropertyNode, dtoCompilerContext);

    const required = entityNode.required?.includes(classPropertyContext.propertyKey) ?? false;

    const representation = swaggerType.representation;

    if (representation.kind === "schema") {
      const schema = representation.schema;

      classPropertyContext.AddDecoratorToCurrentProperty(
        ApiProperty({
          ...swaggerType.metadata,
          ...schema,

          required: required,
          name: classPropertyContext.propertyKey,
        }),
      );
    } else {
      classPropertyContext.AddDecoratorToCurrentProperty(
        ApiProperty({
          ...swaggerType.metadata,
          ...representation,

          required: required,
          name: classPropertyContext.propertyKey,
        }),
      );
    }
  }
}
