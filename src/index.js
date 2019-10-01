import "./env";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const APP_PORT = process.env.APP_PORT || 4000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api',(req,res)=>{
  res.json({
    response:{
      message:'hello api'
    }
  });
});

app.use("*", (req, res) => {
  console.log(`Path/Method Not Supported:: ${req.url} ${req.method}`);
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Server Started on:: ${APP_HOST}:${APP_PORT}/api`);
});

export default app;
