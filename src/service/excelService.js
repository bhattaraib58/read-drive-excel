import * as driveExcelService from "../API/googleDriveExcelAPI";

/**
 * Read Excel file By Its ID
 *
 * @export
 * @param {*} fileId
 * @returns
 */
export function getById(fileId) {
  return driveExcelService.readExcelFileById(fileId);
}
