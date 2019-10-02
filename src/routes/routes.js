import { Router } from "express";
import excelRoute from "./excelRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION
  });
});

router.use("/excel", excelRoute);

router.use("*", (req, res) => {
  console.log(`Path/Method Not Supported:: ${req.url} ${req.method}`);
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});

export default router;
