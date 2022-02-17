import express, { Application, Request, Response } from "express";
import routes from "./api/routes";
import cors from "cors";
import path from "path";
import database from "./database/connection";
import bodyParser from "body-parser";

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connecting front to backend
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/people", routes);

// define a route handler for the default home page
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// start the Express server
const server = app.listen(port, async () => {
  try {
    await database.connect();
    console.log(`Connection successful, server started on port ${port}`);
  } catch (e) {
    console.log(e);
    server.close();
  }
});
