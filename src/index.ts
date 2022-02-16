import express, { Application, Request, Response } from "express";
import routes from "./api/routes";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use("/api/people", routes);

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

// start the Express server
const server = app.listen(port, async () => {
  try {
    console.log(`server started at http://localhost:${port}`);
  } catch (e) {
    console.log(e);
  }
});
