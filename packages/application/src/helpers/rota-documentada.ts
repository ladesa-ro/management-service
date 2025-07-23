import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOperationOptions } from "@nestjs/swagger";


export const RotaDocumentada = (operation: ApiOperationOptions | any): MethodDecorator => {
  const decorators: MethodDecorator[] = [];

  decorators.push(
    ApiOperation({
      ...operation
    })
  )

  return applyDecorators(...decorators)
}