import { Router } from "express";
import * as ExcelController from "../controller/excelController";

const router = Router();

/*
 * GET /api/excel/id
 */
router.get("/:fileId", ExcelController.getById);

export default router;
