import { error } from "../types/interfaces";
import Store from "./Store";

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (typeof path !== "string") {
      throw new Error("path must be string");
  }

  if (!isObject(object)) {
    return object;
  }
  
  const newValue: Indexed = path.split(".").reduceRight((res, el) => {
    if (!Object.keys(res).length) {
      return {[el]: value};
    } else {
      return {[el]: res};
    }
  }, {});

  return merge(object as Indexed, newValue);
}

function merge(lhs: Indexed = {}, rhs: Indexed): Indexed {
  for (let key of Object.keys(rhs)) {
    if (isObject(rhs[key])) {
      lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      lhs[key] = rhs[key];
    }
  }

  return lhs;
}

function isObject(value: unknown): value is Object {
  return value !== null && typeof value === "object" && (value as Object).constructor === Object;
} 

export function isEqual(a: object, b: object): boolean {
  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    return checkObjects(a, b);
  } else {
    return false;
  } 
}

function checkObjects(a: object, b: object) {
  return Object.keys(a).reduce((equal, key) => {
    const keyA = a[key as keyof typeof a];
    const keyB = b[key as keyof typeof b];
    if (isObject(keyA) && isObject(keyB)) {
      return equal && isEqual(keyA, keyB);
    }
    return equal && keyA === keyB;
  }, true);
}

export async function request(path: string, req: () => void) {
  try {
    setError(null, path);
    await req();
  } catch(e) {
    setError(e as error, path);
  } 
}

export function setError(e: error | null, path: string): void {
  if (e) {
    Store.set(path, e.reason);
  } else {
    Store.set(path, e);
  } 
}
