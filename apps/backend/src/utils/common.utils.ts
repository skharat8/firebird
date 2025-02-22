function assertObjectExists<T>(x: T | undefined): asserts x is T {
  if (typeof x === "undefined") throw new Error("Object is not defined");
}

export { assertObjectExists };
