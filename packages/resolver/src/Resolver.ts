import * as Joi from "joi";

import { DeepPartial } from "@ulangi/extended-types";

export interface Resolver<T> {
  getRules(): Joi.SchemaLike;
  canResolve(data: any, stripUnknown: boolean): boolean;
  resolve(data: any, stripUnknown: boolean): T;
  isValid(data: any, stripUnknown: boolean): data is T;

  resolvePartial(data: any, stripUnknown: boolean): DeepPartial<T>;
  canResolvePartial(data: any, stripUnknown: boolean): boolean;
  isValidPartial(data: any, stripUnknown: boolean): data is DeepPartial<T>;

  resolveArray(data: any[], stripUnknown: boolean): ReadonlyArray<T>;
  resolvePartialArray(
    data: any[],
    stripUnknown: boolean
  ): ReadonlyArray<DeepPartial<T>>;
}
