import { Inject as NestjsInject } from "@nestjs/common";

const decorator = (token: any): ParameterDecorator => {
  const injectDecorator = NestjsInject(token);

  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    return injectDecorator(target, propertyKey!, parameterIndex);
  };
};

export const DeclareDependency = decorator;
export const Dep = DeclareDependency;
