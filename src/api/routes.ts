import express, { Router, Request, Response } from "express";
import Person from "../person";
import database from "../database/connection";

let people: Person[] = [
  { id: 1, firstName: "Jukka", lastName: "Virtanen", age: 30 },
  { id: 2, firstName: "Minna", lastName: "Kuula", age: 22 },
  { id: 3, firstName: "Neea", lastName: "Lattu", age: 27 },
];

const routes = Router();
routes.use(express.json());

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
routes.get("/:idNumber(-?[0-9]+)", async (req: Request, res: Response) => {
  try {
    res.send(await database.findById(Number(req.params.idNumber)));
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
});

routes.post("/", async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const result = await database.addPerson({ firstName, lastName, age });
    console.log(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.end();
  }
});

routes.delete("/idNumber(-?[0-9]+)", async (req: Request, res: Response) => {
  try {
    await database.deleteById(Number(req.params.idNumber));
    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
});

export default routes;
