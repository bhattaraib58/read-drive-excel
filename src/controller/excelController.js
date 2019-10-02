import * as ExcelService from "../service/excelService";
import { readExcelFileById } from "../googleDriveExcel";

export function getById(req, res, next) {
  ExcelService.getById(req.params.fileId)
    .then(data => res.json({ data }))
    .catch(err => next({
      name:'Please Check File Id',
      message:err,
    }));
}
