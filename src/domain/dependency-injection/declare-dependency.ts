import { Inject as NestjsInject } from "@nestjs/common";

export const DeclareDependency = (token: any): ParameterDecorator => {
  const injectDecorator = NestjsInject(token);

  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    return injectDecorator(target, propertyKey!, parameterIndex);
  };
};
