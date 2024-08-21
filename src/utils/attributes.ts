type Attributes = Record<string, unknown>;

export const attributes = (attributes: Attributes) =>
  Object.keys(attributes)
    .filter((key) => attributes[key] !== false)
    .reduce((prev, key) => ({ ...prev, [key]: attributes[key] }), {});
