import * as Joi from "joi";

import { DeepPartial } from "@ulangi/extended-types";
import { MappedRules } from "./MappedRules";
import { Resolver } from "./Resolver";

export abstract class AbstractResolver<T extends object>
  implements Resolver<T> {
  protected abstract rules: MappedRules<T>;

  public getRules(): MappedRules<T> {
    return this.rules;
  }

  public isValid(data: any, stripUnknown: boolean): boolean {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: "required"
    });
    return error === null;
  }

  public isPartialValid(data: any, stripUnknown: boolean): boolean {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: "optional"
    });
    return error === null;
  }

  public isExactValid(data: any, stripUnknown: boolean): data is T {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: "required",
      convert: false
    });
    return error === null;
  }

  public isPartialExactValid(
    data: any,
    stripUnknown: boolean
  ): data is DeepPartial<T> {
    const { error } = Joi.validate(data, this.rules, {
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: "optional",
      convert: false
    });
    return error === null;
  }

  public resolve(data: any, stripUnknown: boolean): T {
    return Joi.attempt(
      data,
      Joi.object(this.rules).options({
        stripUnknown: {
          arrays: stripUnknown,
          objects: stripUnknown
        },
        presence: "required"
      })
    );
  }

  public resolvePartial(data: any, stripUnknown: boolean): DeepPartial<T> {
    return Joi.attempt(
      data,
      Joi.object(this.rules).options({
        stripUnknown: {
          arrays: stripUnknown,
          objects: stripUnknown
        },
        presence: "optional"
      })
    );
  }

  public resolveArray(data: any[], stripUnknown: boolean): ReadonlyArray<T> {
    return Joi.attempt(
      data,
      Joi.array()
        .items(Joi.object(this.rules))
        .options({
          stripUnknown: {
            arrays: stripUnknown,
            objects: stripUnknown
          },
          presence: "required"
        })
    );
  }

  public resolvePartialArray(
    data: any[],
    stripUnknown: boolean
  ): ReadonlyArray<DeepPartial<T>> {
    return Joi.attempt(
      data,
      Joi.array()
        .items(Joi.object(this.rules))
        .options({
          stripUnknown: {
            arrays: stripUnknown,
            objects: stripUnknown
          },
          presence: "optional"
        })
    );
  }

  public validate(
    data: any,
    stripUnknown: boolean
  ): { error: Joi.ValidationError; value: T } {
    return Joi.validate(
      data,
      Joi.object(this.rules).options({
        stripUnknown: {
          arrays: stripUnknown,
          objects: stripUnknown
        },
        presence: "required"
      })
    );
  }
}
