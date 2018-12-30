# CSV Exporter

This small library will export any list of objects into CSV.

## Use

Receives a config object with a property for each exported value. The following example processes a set of instances with properties named `name`, `age`, `created`, `description`. You can specify a function that will be used to format the property (otherwise the value will be used as is). `null` and `undefined` values will be exported as the empty string, and double quotes will be escaped.

```JavaScript
import createCsvExporter from "csv-exporter";

// create the CSV exporter
const csv = createCsvExporter({
  name: undefined,
  age: undefined,
  created: ({ created }) => created && created.toISOString(),
  description: undefined
});

// some test data
export const data = [
  { name: "Bond, James", age: 30, created: new Date("1953-04-13") },
  {
    name: "Sandokan",
    age: 37,
    created: new Date("1895-01-01"),
    description:
      'Emilio Salgari wrote several novels chronicling the adventures of Sandokan and Yanez, two of his most legendary creations.\n The pirates are introduced in "The Tigers of Mompracem", which portrays their relentless struggle against the Dutch and British powers that seek to wipe them out. '
  },
  { name: "Mortadelo y Filemón", age: 50.56667 },
  null,
  undefined
];

// create a CSV exporting these values
const output = csv.export(data);
```
