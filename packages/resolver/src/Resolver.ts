import * as Joi from "joi";

import { DeepPartial } from "@ulangi/extended-types";

export interface Resolver<T> {
  getRules(): Joi.SchemaLike;
  isValid(data: any, stripUnknown: boolean): boolean;
  isPartialValid(data: any, stripUnknown: boolean): boolean;
  isExactValid(data: any, stripUnknown: boolean): data is T;
  isPartialExactValid(data: any, stripUnknown: boolean): data is DeepPartial<T>;

  resolve(data: any, stripUnknown: boolean): T;
  resolvePartial(data: any, stripUnknown: boolean): DeepPartial<T>;

  resolveArray(data: any[], stripUnknown: boolean): ReadonlyArray<T>;
  resolvePartialArray(
    data: any[],
    stripUnknown: boolean
  ): ReadonlyArray<DeepPartial<T>>;

  validate(
    data: any,
    stripUnknown: boolean
  ): { error: Joi.ValidationError; value: T };
}
