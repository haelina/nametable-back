import { Router, Request, Response } from "express";
import Person from "../person";
import database from "../database/connection";

let people: Person[] = [
  { id: 1, firstName: "Jukka", lastName: "Virtanen", age: 30 },
  { id: 2, firstName: "Minna", lastName: "Kuula", age: 22 },
  { id: 3, firstName: "Neea", lastName: "Lattu", age: 27 },
];

const routes = Router();

// Get all people
routes.get("/", async (req: Request, res: Response) => {
  try {
    res.send(await database.findAll());
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
});

// Get one person
routes.get("/:idNumber(-?[0-9]+)", (req: Request, res: Response) => {
  res.send("Person with id: " + req.params.idNumber);
});

routes.delete("/idNumber(-?[0-9]+)", (req: Request, res: Response) => {
  res.send("Removing person with id: " + req.params.idNumber);
});

export default routes;
