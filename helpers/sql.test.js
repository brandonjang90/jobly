// Import necessary modules and the function to be tested
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {

  test("works: generates correct SQL for valid input", function () {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("works: uses JS keys when jsToSql not provided", function () {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = {};

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("throws BadRequestError if no data is provided", function () {
    const dataToUpdate = {};
    const jsToSql = { firstName: "first_name" };

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });

  test("works with multiple fields", function () {
    const dataToUpdate = { firstName: "Aliya", age: 32, city: "New York" };
    const jsToSql = { firstName: "first_name", city: "city_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2, "city_name"=$3',
      values: ["Aliya", 32, "New York"],
    });
  });
});
