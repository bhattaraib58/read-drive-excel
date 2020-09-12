import * as ExcelService from '../service/excelService';

/**
 * Excel Service Controller to Get By ID.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function getById(req, res, next) {
  ExcelService.getById(req.params.fileId)
    .then((data) => res.json(data))
    .catch((err) =>
      next({
        name: 'Please Check File Id',
        message: err
      })
    );
}
