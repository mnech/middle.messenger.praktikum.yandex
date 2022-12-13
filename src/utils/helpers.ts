type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  console.log("hi");
  console.log(JSON.stringify(object), path, value);
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
  
  const res = merge(object as Indexed, newValue);
  console.log(JSON.stringify(object), path, value, JSON.stringify(res));
  return ;
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
  return typeof value === "object" && (value as Object).constructor === Object;
} 

