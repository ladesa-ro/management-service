import { Injectable } from "@nestjs/common";

export const DeclareImplementation = (): ClassDecorator => {
  return Injectable();
};
