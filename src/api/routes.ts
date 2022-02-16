import { Router, Request, Response } from "express";

const routes = Router();
routes.route("/people").get((req: Request, res: Response) => {
  res.send("working");
});

export default routes;
