import express, { Application, Request, Response } from "express";
import routes from "./api/routes";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import database from "./database/connection";

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors());

// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
