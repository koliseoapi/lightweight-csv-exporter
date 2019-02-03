// null, undefined will translate to this value
const EMPTY = "";
const EOL = "\n";

function isNullOrUndefined(object) {
  return typeof object === "undefined" || object === null;
}

// if value is not 100% safe (may contain newline, double quotes, or commas)
// put between quotes and escape any quote
function escape(value) {
  return typeof value !== "string" || !value.length || /^[a-z0-9.@\/+\- ?]+$/i.test(value)
    ? value
    : '"' + value.replace(/"/g, '""') + '"';
}

function createExtractor(property) {
  if (property.indexOf('.') === -1) {
    return function (object) {
      return object[property];
    }
  }
  const parts = property.split('.');
  return function (object) {
    let result = object;
    let i = 0;
    while (!isNullOrUndefined(result) && i < parts.length) {
      result = result[parts[i++]]
    }
    return result;
  }
}

export default function createCsvExporter(config) {
  const labels = [];
  const columns = config.map((configEntry, index) => {
    let property, label;
    if (typeof configEntry === 'string') {
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
      typeof property === 'function' ? property : createExtractor(property);
    return function (object) {
      if (isNullOrUndefined(object)) return EMPTY;
      const value = extractPropertyFrom(object);
      return isNullOrUndefined(value) ? EMPTY : escape(value);
    };
  });

  return {
    export(data = []) {
      let result = labels.join(",") + EOL;
      data.forEach(object => {
        result += columns.map(callback => callback(object)).join(",") + EOL;
      });
      return result;
    }
  };
}
