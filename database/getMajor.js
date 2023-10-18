import connection from "./db.js";

connection.connect();
 
connection.query('SELECT * from Major', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();