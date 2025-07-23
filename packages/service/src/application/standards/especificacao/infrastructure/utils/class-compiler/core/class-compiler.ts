import {
  IClassCompiler,
  IClassCompilerHandler,
  IClassCompilerTypings,
  IClassCompilerTypingsInferNode,
  ICompileClassContext,
  ICompileClassPropertyContext,
  INodeProperty,
} from "@/application/standards/especificacao/infrastructure/utils/class-compiler/typings/core";
import { __decorate, __metadata } from "tslib";

const CreateEmptyClassWithName = (name: string) => {
  // Object.defineProperty(CompiledClassCtor, "name", { value: dtoClassName });

  return {
    [name]: class {},
  }[name];
};

export abstract class ClassCompiler<ClassCompilerTypings extends IClassCompilerTypings<any, any>> implements IClassCompiler<ClassCompilerTypings> {
  #handlers = new Set<IClassCompilerHandler<ClassCompilerTypings>>();

  *GetHandlers(): Iterable<IClassCompilerHandler<ClassCompilerTypings>> {
    yield* this.#handlers;
  }

  AddHandler(handler?: IClassCompilerHandler<ClassCompilerTypings>) {
    if (handler) {
      this.#handlers.add(handler);
    }
    return this;
  }

  AddHandlers(handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>) {
    if (handlers) {
      for (const handler of handlers) {
        this.AddHandler(handler);
      }
    }

    return this;
  }

  constructor(handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>) {
    this.AddHandlers(handlers);
  }

  CompileClass(node: IClassCompilerTypingsInferNode<ClassCompilerTypings>, classesMap: Map<string, any> = new Map()) {
    //
    const classContext = {
      node,
      classesMap,
      classCompiler: this,

      classDecorators: [],
      classPropertiesMetadata: new Map(),

      EnsurePropertyMetadata(propertyKey) {
        this.GetPropertyMetadata(propertyKey);

        return this;
      },

      GetPropertyMetadata(propertyKey) {
        const propertiesMetadata = this.classPropertiesMetadata;

        if (!propertiesMetadata.has(propertyKey)) {
          propertiesMetadata.set(propertyKey, {
            designType: Object,
            decorators: [],
          });
        }

        const propertyMetadata = propertiesMetadata.get(propertyKey)!;

        return propertyMetadata;
      },

      AddDecoratorsToProperty(propertyKey, decorators) {
        for (const decorator of decorators) {
          this.AddDecoratorToProperty(propertyKey, decorator);
        }

        return this;
      },

      AddDecoratorToProperty(propertyKey, decorator) {
        const propertyMetadata = this.GetPropertyMetadata(propertyKey);
        propertyMetadata.decorators.push(decorator);
        return this;
      },
    } satisfies ICompileClassContext<ClassCompilerTypings>;

    const identifier = this.GetNodeIdentifier(classContext);

    if (classContext.classesMap.has(identifier)) {
      return classContext.classesMap.get(identifier);
    }

    const CompiledClass = CreateEmptyClassWithName(identifier);

    classContext.classesMap.set(identifier, CompiledClass);

    this.CompileClassHandler(classContext);
    this.CompileClassHandleProperties(classContext);

    for (const [propertyKey, propertyMetadata] of classContext.classPropertiesMetadata.entries()) {
      __decorate([...propertyMetadata.decorators, __metadata("design:type", propertyMetadata.designType)], CompiledClass.prototype, propertyKey, void 0);
    }

    __decorate(classContext.classDecorators, CompiledClass);

    return CompiledClass;
  }

  CompileClassHandler(classContext: ICompileClassContext<ClassCompilerTypings>): void {
    for (const handler of this.GetHandlers()) {
      handler.HandleClass(classContext);
    }
  }

  CompileClassHandleProperties(classContext: ICompileClassContext<ClassCompilerTypings>): void {
    for (const nodeProperty of this.GetNodeProperties(classContext)) {
      const classPropertyContext = {
        classContext: classContext,

        propertyKey: nodeProperty.propertyKey,
        propertyNode: nodeProperty.propertyNode,

        AddDecoratorsToCurrentProperty(decorators: Iterable<Function>) {
          this.classContext.AddDecoratorsToProperty(this.propertyKey, decorators);
          return this;
        },

        AddDecoratorToCurrentProperty(decorator: Function) {
          this.classContext.AddDecoratorToProperty(this.propertyKey, decorator);
          return this;
        },
      } satisfies ICompileClassPropertyContext<ClassCompilerTypings>;

      this.CompileClassHandleProperty(classPropertyContext);
    }
  }

  CompileClassHandleProperty(classPropertyContext: ICompileClassPropertyContext<ClassCompilerTypings>) {
    for (const handler of this.GetHandlers()) {
      handler.HandleClassProperty(classPropertyContext);
    }
  }

  abstract GetNodeProperties(context: ICompileClassContext<ClassCompilerTypings>): Iterable<INodeProperty<ClassCompilerTypings>>;

  abstract GetNodeIdentifier(classContext: ICompileClassContext<ClassCompilerTypings>): string;
}
