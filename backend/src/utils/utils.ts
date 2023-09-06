// @ts-ignore
export function formatZodError(object, path, value) {
  if (new Object(object) !== object) return object;

  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }
  // @ts-ignore
  const result = path.slice(0, -1).reduce((accumulator, key, index) => {
    return new Object(accumulator[key]) === accumulator[key]
      ? accumulator[key]
      : (accumulator[key] =
          Math.trunc(Math.abs(path[index - 1])) === +path[index + 1])
      ? []
      : {};
  }, object);

  result[path[path.length - 1]] = value;

  return object;
}
