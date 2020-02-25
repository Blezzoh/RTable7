import Chance from "chance";

export default num => {
  let arr = [];
  const chance = new Chance();
  for (let i = 0; i < num; i++) {
    arr.push({
      first: chance.name(),
      last: chance.last(),
      birthday: chance.birthday({ string: true }),
      zip: chance.zip()
    });
  }
  return arr;
};

export const headers = [
  {
    Header: "First",
    accessor: "first"
  },
  {
    Header: "Last",
    accessor: "last"
  },
  {
    Header: "Birthday",
    accessor: "birthday",
    filter: "year"
  },
  {
    Header: "Zip",
    accessor: "zip"
  }
];
