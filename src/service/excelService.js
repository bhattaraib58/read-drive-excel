import * as driveExcelService from '../API/googleDriveExcelAPI';

/**
 * Read Excel file By Its ID.
 *
 * @param {*} fileId
 * @returns
 */
export function getById(fileId) {
  return driveExcelService.readExcelFileById(fileId);
}
