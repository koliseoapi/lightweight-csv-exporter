interface Data {
  name: string;
  age: number;
  description?: string;
  metadata?: { description: string };
  created?: Date;
}

export const config = [
  "name",
  { label: 'Years "old"', property: "age" },
  {
    label: "created",
    property: ({ created }: Data) => created && created.toISOString(),
  },
  { label: "description", property: "metadata.description" },
];

export const data: Data[] = [
  { name: "Bond, James", age: 30, created: new Date("1953-04-13") },
  {
    name: "Sandokan",
    age: -37,
    created: new Date("1895-01-01"),
    metadata: {
      description:
        'Emilio Salgari wrote several novels chronicling the adventures of Sandokan and Yanez, two of his most legendary creations.\n The pirates are introduced in "The Tigers of Mompracem", which portrays their relentless struggle against the Dutch and British powers that seek to wipe them out. ',
    },
  },
  { name: "Mortadelo y Filemón", age: 50.56667, description: "" },
  null,
  undefined,
];
