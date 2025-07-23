import { SetMetadata } from "@nestjs/common";

export const COMBINED_INPUT_PARAM = "combined_input";

export type ICombinedInputParamMetadata = {
  parameterIndex: number;
};

export const CombinedInput = (): ParameterDecorator => {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    if (propertyKey) {
      const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

      if (descriptor) {
        SetMetadata(COMBINED_INPUT_PARAM, { parameterIndex })(target, propertyKey, descriptor);
      }
    }
  };
};
