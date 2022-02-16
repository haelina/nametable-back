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
            reject(error);
          } else {
            resolve(results);
          }
        });
      } else {
        reject(Error);
      }
    });
  },
  findById: (id: number) => {
    return new Promise<Person[]>((resolve, reject) => {
      if (connection) {
        connection.query(
          "SELECT * FROM person WHERE id=?",
          id,
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        reject(`No connection. Could not fetch person with id ${id}`);
      }
    });
  },

  addPerson: (p: Person) => {
    return new Promise<Person>((resolve, reject) => {
      if (connection) {
        connection.query(
          "INSERT INTO * FROM person (firstName, lastName, age) VALUES (?, ?, ?)",
          (p.firstName, p.lastName, p.age),
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.insertId);
            }
          }
        );
      } else {
        reject(`No connection. Could not add new person.`);
      }
    });
  },
  deleteById: (id: number) => {
    return new Promise<string>((resolve, reject) => {
      if (connection) {
        connection.query(
          "DELETE FROM person WHERE id=?",
          id,
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result.affectedRows === 0) {
              reject(`Id ${id} not found. Abort deleting.`);
            } else {
              resolve(`Id ${id} deleted successfully.`);
            }
          }
        );
      } else {
        reject(`No connection. Could not add new person.`);
      }
    });
  },
};

export default connectionFunctions;
