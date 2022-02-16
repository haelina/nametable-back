import mysql from "mysql";
import config from "./config";
import Person from "../person";

var connection = mysql.createPool(config);

const connectionFunctions = {
  connect: () => {
    connection.getConnection((err) => {
      if (err) throw err;
    });
  },
  close: () => {
    connection.end();
  },
  findAll: () => {
    return new Promise<Person[]>((resolve, reject) => {
      if (connection) {
        connection.query("SELECT * FROM person", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  },
};

export default connectionFunctions;
