// null, undefined will translate to this value
const EMPTY = "";
const EOL = "\n";

function isNullOrUndefined(object?: any) {
  return typeof object === "undefined" || object === null;
}

// if value is not 100% safe (may contain newline, double quotes, or commas)
// put between quotes and escape any quote
function escape(value?: any) {
  return typeof value !== "string" ||
    !value.length ||
    /^[a-z0-9.@\/+\- ?]+$/i.test(value)
    ? value
    : '"' + value.replace(/"/g, '""') + '"';
}

type PropertyReturnType = string | number | boolean | bigint | null | undefined;

function createExtractor<T>(
  property: string
): (param: T) => PropertyReturnType {
  if (property.indexOf(".") === -1) {
    return function (object?: any) {
      return object[property];
    };
  }
  const parts = property.split(".");
  return function (object: any) {
    let result = object;
    let i = 0;
    while (!isNullOrUndefined(result) && i < parts.length) {
      result = result[parts[i++]];
    }
    return result;
  };
}

interface ConfigEntry<T> {
  property: string | ((param: T) => PropertyReturnType);
  label: string;
}

export default function createCsvExporter<T>(
  config: (string | ConfigEntry<T>)[]
) {
  const labels: string[] = [];
  const columns = config.map((configEntry, index) => {
    let property, label;
    if (typeof configEntry === "string") {
      label = property = configEntry;
    } else {
      property = configEntry.property;
      label = configEntry.label || property;
    }
    if (!property) {
      throw new Error(`Missing property at index ${index}`);
    }
    labels.push(escape(label));
    // function that will retrieve the value of item[property]
    const extractPropertyFrom =
      typeof property === "function" ? property : createExtractor(property);
    return function (object: T) {
      if (isNullOrUndefined(object)) return EMPTY;
      const value = extractPropertyFrom(object);
      return isNullOrUndefined(value) ? EMPTY : escape(value);
    };
  });

  return {
    export(data: T[] = []) {
      let result = labels.join(",") + EOL;
      data.forEach((object) => {
        result += columns.map((callback) => callback(object)).join(",") + EOL;
      });
      return result;
    },
  };
}
