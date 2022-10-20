const xlsx = require("xlsx");
const path = require("path");

class ExcelService {
  constructor() {}

  readFile(filePath) {
    const workBook = xlsx.readFile(path.resolve(filePath));
    let data = [];
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];

    const results = xlsx.utils.sheet_to_json(workSheet);
    results.forEach((res) => {
      data.push(res);
    });
    return data;
  }

  writeFile(data, workSheetColumnNames, workSheetName, filePath) {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [workSheetColumnNames, ...data];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
  }
}

module.exports = ExcelService;
