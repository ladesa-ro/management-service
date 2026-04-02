import { Injectable } from "@nestjs/common";

const decorator = (): ClassDecorator => {
  return Injectable();
};

export const DeclareImplementation = decorator;
export const Impl = DeclareImplementation;
