import createCsvExporter from "../src/csv-exporter";
import { config, data } from "./mock-data";

describe("CSV Exporter", () => {
  it("renders CSV", () => {
    const csv = createCsvExporter(config);
    const output = csv.export(data);
    //    console.log(output);
    expect(output).toMatchSnapshot();
  });
});
