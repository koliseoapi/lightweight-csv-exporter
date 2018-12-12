// null, undefined will translate to this value
const EMPTY = "";
const EOL = "\n";

function isNullOrUndefined(object) {
  return typeof object === "undefined" || object === null;
}

// if value is not 100% safe (may contain newline, double quotes, or commas)
// put between quotes and escape any quote
function escape(value) {
  return typeof value !== "string" || /^[a-z0-9 ?]+$/i.test(value)
    ? value
    : '"' + value.replace(/"/g, '""') + '"';
}

export function createCsvExporter(properties) {
  const columns = Object.keys(properties).map((propertyName, index) => {
    if (!propertyName) {
      throw new Error(`Expected property name at index #{index}`);
    }
    // function that will retrieve the value of propertyName
    const extractPropertyFrom =
      properties[propertyName] ||
      function(object) {
        return object[propertyName];
      };
    return function(object) {
      if (isNullOrUndefined(object)) return EMPTY;
      const value = extractPropertyFrom(object);
      return isNullOrUndefined(value) ? EMPTY : escape(value);
    };
  });

  return {
    export(data = []) {
      let result = Object.keys(properties).concat(",") + EOL;
      data.forEach(object => {
        result += columns.map(callback => callback(object)) + EOL;
      });
      return result;
    }
  };
}
