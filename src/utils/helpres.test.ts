import { expect } from 'chai';
import { set } from './helpers';

describe('Helpers functions', () => {
  describe("set", () => {
    const keypath = 'a.b.c';
    const value = '123';
    let obj: Record<string, unknown>;

    beforeEach(() => {
     obj = {};
    });

    it('should return original object if it not an object', () => {
      const obj = "obj";
      const result = set(obj, keypath, value);

      expect(result).to.eq(obj);
    });

    it('should return null if null is passed as object', () => {
      const obj = null;
      const result = set(obj, keypath, value);

      expect(result).to.eq(obj);
    });

    it('should not return new object', () => {
      const result = set(obj, keypath, value);

      expect(result).to.eq(obj);
    });

    it('should not return new property to passed object with passed value', () => {
      const result = set(obj, keypath, value);

      expect((result as any).a.b.c).to.eq(value);
    });

    it('should return throw an error if path is not a string', () => {
      const keypath = 123 as any;
      const fn = () => set(obj, keypath, value);

      expect(fn).to.throw(Error);
    });
  });
});
