import { Router, Request, Response } from "express";
import Person from "../person";

let people: Person[] = [
  { id: 1, firstName: "Jukka", lastName: "Virtanen", age: 30 },
  { id: 2, firstName: "Minna", lastName: "Kuula", age: 22 },
  { id: 3, firstName: "Neea", lastName: "Lattu", age: 27 },
];

const routes = Router();

// Get all people
routes.get("/", (req: Request, res: Response) => {
  res.send(people);
});

// Get one person
routes.get("/:idNumber(-?[0-9]+)", (req: Request, res: Response) => {
  res.send("Person with id: " + req.params.idNumber);
});

routes.delete("/idNumber(-?[0-9]+)", (req: Request, res: Response) => {
  res.send("Removing person with id: " + req.params.idNumber);
});

export default routes;
