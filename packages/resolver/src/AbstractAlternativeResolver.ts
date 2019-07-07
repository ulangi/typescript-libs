import * as Joi from "joi";

import { DeepPartial } from "@ulangi/extended-types";
import { Resolver } from "./Resolver";

export abstract class AbstractAlternativeResolver<T> implements Resolver<T> {
  protected abstract rules: Joi.AlternativesSchema;

  public getRules(): Joi.AlternativesSchema {
    return this.rules;
  }

  public isValid(data: any, stripUnknown: boolean): boolean {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown,
      presence: "required"
    });
    return error !== null;
  }

  public isPartialValid(data: any, stripUnknown: boolean): boolean {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown,
      presence: "optional"
    });
    return error !== null;
  }

  public isExactValid(data: any, stripUnknown: boolean): data is T {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown,
      presence: "required",
      convert: false
    });
    return error !== null;
  }

  public isPartialExactValid(
    data: any,
    stripUnknown: boolean
  ): data is DeepPartial<T> {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown,
      presence: "optional",
      convert: false
    });
    return error !== null;
  }

  public resolve(data: any, stripUnknown: boolean): T {
    return Joi.attempt(
      data,
      this.rules.options({ stripUnknown, presence: "required" })
    );
  }

  public resolvePartial(data: any, stripUnknown: boolean): DeepPartial<T> {
    return Joi.attempt(
      data,
      this.rules.options({ stripUnknown, presence: "optional" })
    );
  }

  public resolveArray(data: any[], stripUnknown: boolean): ReadonlyArray<T> {
    return Joi.attempt(
      data,
      Joi.array().items(
        this.rules.options({ stripUnknown, presence: "required" })
      )
    );
  }

  public resolvePartialArray(
    data: any[],
    stripUnknown: boolean
  ): ReadonlyArray<DeepPartial<T>> {
    return Joi.attempt(
      data,
      Joi.array().items(
        this.rules.options({ stripUnknown, presence: "optional" })
      )
    );
  }

  public validate(
    data: any,
    stripUnknown: boolean
  ): { error: Joi.ValidationError; value: T } {
    return Joi.validate(
      data,
      this.rules.options({ stripUnknown, presence: "required" })
    );
  }
}
