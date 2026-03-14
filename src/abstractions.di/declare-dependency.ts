import { applyDecorators, Inject as NestjsInject } from "@nestjs/common";

export const DeclareDependency = (token: any) => {
  const decorators: PropertyDecorator[] = [];

  decorators.push(NestjsInject(token));

  return applyDecorators(...decorators);
};

export const Inject = DeclareDependency;
