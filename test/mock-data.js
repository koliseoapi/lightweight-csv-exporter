export const config = {
  name: undefined,
  age: undefined,
  created: ({ created }) => created && created.toISOString(),
  description: undefined
};

export const data = [
  { name: "Bond, James", age: 30, created: new Date("1953-04-13") },
  {
    name: "Sandokan",
    age: -37,
    created: new Date("1895-01-01"),
    description:
      'Emilio Salgari wrote several novels chronicling the adventures of Sandokan and Yanez, two of his most legendary creations.\n The pirates are introduced in "The Tigers of Mompracem", which portrays their relentless struggle against the Dutch and British powers that seek to wipe them out. '
  },
  { name: "Mortadelo y Filemón", age: 50.56667 },
  null,
  undefined
];
