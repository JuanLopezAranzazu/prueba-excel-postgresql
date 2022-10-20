const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const excelRouter = require("./routes/excel.router");
const userRouter = require("./routes/user.router");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/excel", excelRouter);

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middlewares/error.handler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const { config } = require("./config/config");
const port = config.port;
app.listen(port, () => console.log(`Server running in port ${port}`));
