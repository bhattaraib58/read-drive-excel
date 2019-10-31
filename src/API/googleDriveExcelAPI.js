import GoogleSpreadsheet from "google-spreadsheet";
import waterfall from "async/waterfall";
import credentials from "../constants/credentials";

/**
 * Read all worksheets data and handle their promise as one.
 *
 * @param {*} worksheets
 * @returns {Worksheet Array or Error}
 */
async function getAllRows(worksheets) {
  function getWorksheetRows(worksheet) {
    // Returns promise object, worksheet.getRows reads the single worksheet at a time
    return new Promise((resolve, reject) => {
      worksheet.getRows(worksheet.id, (worksheetError, dataRows) => {
        if (worksheetError) {
          reject(worksheetError);
        }

        resolve(dataRows);
      });
    });
  }

  async function getWorksheetData(worksheet) {
    // Async await are used for solving map map Promise data.
    return await getWorksheetRows(worksheet);
  }

  // Get all worksheets promise data,
  return await Promise.all(
    worksheets.map(async worksheet => await getWorksheetData(worksheet))
  );
}

export function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  const doc = new GoogleSpreadsheet(fileId);

  const sheetData = {
    title: null,
    data: []
  };

  return new Promise((resolve, reject) => {
    waterfall(
      [
        function setAuth(callback) {
          // check auth if no issue getDoc else throw error
          doc.useServiceAccountAuth(credentials, callback);
        },
        function getDocInfo(callback) {
          // get doc info from google sheet
          doc.getInfo(callback);
        },
        function getWorksheets(docInfo, callback) {
          //set worksheet title and move to next to get all worksheet data
          sheetData.title = docInfo.title;
          callback(null, docInfo.worksheets);
        },
        function getWorksheetsData(worksheets, callback) {
          // read all worksheet rows data
          getAllRows(worksheets)
            .then(worksheetsData => {
              sheetData.data = worksheetsData;
              callback(null, sheetData);
            })
            .catch(err => callback(err));
        }
      ],
      (error, results) => {
        // callback function for handling errors

        if (error) {
          console.log("error:" + error);
          reject(error);
        }

        if (results) {
          resolve(sheetData);
        }
      }
    );
  });
}
