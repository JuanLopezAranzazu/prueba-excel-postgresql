const Joi = require("joi");

const filePath = Joi.string();
const workSheetColumnNames = Joi.array().items(Joi.string());
const workSheetName = Joi.string();

const createExcelSchema = Joi.object({
  filePath: filePath.required(),
  workSheetColumnNames: workSheetColumnNames.required(),
  workSheetName: workSheetName.required(),
});

const getExcelSchema = Joi.object({
  filePath: filePath.required(),
});

module.exports = { createExcelSchema, getExcelSchema };
