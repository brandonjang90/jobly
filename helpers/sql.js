const { BadRequestError } = require("../expressError");

/**
 * Builds a part of an SQL query for updating data based on the fields and values given.
 * 
 * @param {Object} dataToUpdate - An object with the fields to update (e.g., { firstName: "Aliya", age: 32 }).
 * @param {Object} jsToSql - An object that maps JavaScript-style field names (e.g., "firstName") 
 *        to SQL column names (e.g., "first_name").
 *
 * @returns {Object} An object with:
 *         - `setCols`: A string that lists the columns and placeholders for the SQL query
 *           (e.g., '"first_name"=$1, "age"=$2').
 *         - `values`: An array of the new values to insert into the query (e.g., ['Aliya', 32]).
 *
 * @throws {BadRequestError} If no data is provided to update (e.g., if the object is empty).
 *
 * Example:
 *    const dataToUpdate = { firstName: "Aliya", age: 32 };
 *    const jsToSql = { firstName: "first_name" };
 *    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 *    // result:
 *    // {
 *    //   setCols: '"first_name"=$1, "age"=$2',
 *    //   values: ['Aliya', 32]
 *    // }
 */


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
