const express = require("express");
const excelRouter = express.Router();

const ExcelService = require("./../services/excel.service");
const excelService = new ExcelService();
const UserService = require("./../services/user.service");
const userService = new UserService();

const validatorHandler = require("./../middlewares/validator.handler");
const {
  createExcelSchema,
  getExcelSchema,
} = require("./../schemas/excel.schema");

const KEYS_HANDLER = {
  Id: "id",
  Nombre: "fullname",
  Correo: "email",
};

function excelDataForExcel(users, workSheetColumnNames) {
  return users.map((user) => {
    const dataForUser = [];
    for (let index = 0; index < workSheetColumnNames.length; index++) {
      const key = KEYS_HANDLER[workSheetColumnNames[index]];
      dataForUser[index] = user[key];
    }
    return dataForUser;
  });
}

excelRouter.post(
  "/",
  validatorHandler(createExcelSchema, "body"),
  async (req, res, next) => {
    try {
      const users = await userService.findAll();
      const { body } = req;
      const { filePath, workSheetColumnNames, workSheetName } = body;
      const data = excelDataForExcel(users, workSheetColumnNames);
      excelService.writeFile(
        data,
        workSheetColumnNames,
        workSheetName,
        filePath
      );
      res.json({ message: "File saved successfully" });
    } catch (error) {
      next(error);
    }
  }
);

excelRouter.get(
  "/",
  validatorHandler(getExcelSchema, "body"),
  (req, res, next) => {
    try {
      const { body } = req;
      const { filePath } = body;
      const data = excelService.readFile(filePath);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = excelRouter;
