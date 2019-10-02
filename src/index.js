import "./env";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/routes";
import * as errorHandler from "./middlewares/errorHandler";

const app = express();

const APP_PORT = process.env.PORT || 4000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//API Routes
app.use("/api", routes);

app.use(errorHandler.genericErrorHandler);

app.listen(APP_PORT, () => {
  console.log(`Server Started on:: ${APP_HOST}:${APP_PORT}/api`);
});

export default app;
