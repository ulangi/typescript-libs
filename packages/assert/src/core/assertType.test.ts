import { assertType } from "./assertType";

describe("assertType", (): void => {
  describe("assert with context", (): void => {
    class TestClass {
      public isNumber(value: any): value is number {
        return typeof value === "number";
      }

      public isString(value: any): value is string {
        return typeof value === "string";
      }
    }

    let context: TestClass;
    beforeEach(
      (): void => {
        context = new TestClass();
      }
    );

    test("assert with context pass", (): void => {
      const value = assertType(123, [context, context.isNumber]);
      expect(value).toEqual(123);

      const value2 = assertType("123", [context, context.isString]);
      expect(value2).toEqual("123");
    });

    test("assert with context fail", (): void => {
      expect(
        (): void => {
          assertType("123", [context, context.isNumber]);
        }
      ).toThrow();
    });
  });

  describe("assert with function", (): void => {
    function isNumber(value: any): value is number {
      return typeof value === "number";
    }

    test("assert with function pass", (): void => {
      const value = assertType(123, isNumber);
      expect(value).toEqual(123);
    });

    test("assert with function fail", (): void => {
      expect(
        (): void => {
          assertType("123", isNumber);
        }
      ).toThrow();
    });
  });
});
