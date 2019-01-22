# CSV Exporter

[![Build Status](https://secure.travis-ci.org/koliseoapi/lightweight-csv-exporter.svg?branch=master)](http://travis-ci.org/koliseoapi/lightweight-csv-exporter)
<a href="https://www.npmjs.com/package/lightweight-csv-exporter"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/lightweight-csv-exporter.svg?maxAge=43200"></a>

This small library will export any list of objects into CSV.

## Use

Receives a config object with a property for each exported value. The following example processes a set of instances with properties named `name`, `age`, `created`, `description`. You can specify a function that will be used to format the property (otherwise the value will be used as is). `null` and `undefined` values will be exported as the empty string, and double quotes will be escaped.

```JavaScript
import { createCsvExporter } from 'lightweight-csv-exporter';

// some test data
const data = [
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

function asCSV() {
  // create the CSV exporter
  const csv = createCsvExporter([
    // you can just specify a property, in which case it will also be used as column label
    'name',

    // in the most common case, column label and property name will be different
    { label: 'Years "old"', property: 'age' },

    // if you want to control the value format, specify a function as property 
    { label: 'created', property: ({ created }) => created && created.toISOString() },

    // nested values are also allowed
    { label: 'description', property: 'metadata.description' }
  ]);

  // create a CSV exporting these values
  return csv.export(data);
}

// download the CSV content from the browser
function downloadAsFile() {
  let csvFile = document.createElement('a');
  csvFile.setAttribute(
    'href',
    `data:text/csv;charset=utf8,${encodeURIComponent(asCSV())}`
  );
  csvFile.download = 'out.txt';
  csvFile.click();
}
```
