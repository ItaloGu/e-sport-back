require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express();

const apiVersion = 1

app.use(express.json());
app.use(morgan("dev"));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
app.use(`/api/v${apiVersion}/user`, userRouter);

const establishmentRouter = require("./routes/establishment.routes");
app.use(`/api/v${apiVersion}/establishment`, establishmentRouter);

const fieldRouter = require("./routes/field.routes");
app.use(`/api/v${apiVersion}/field`, fieldRouter);

const groupRouter = require("./routes/group.routes");
app.use(`/api/v${apiVersion}/group`, groupRouter);

const teamRouter = require("./routes/team.routes");
app.use(`/api/v${apiVersion}/team`, teamRouter);

const assessmentUserRouter = require("./routes/assessmentuser.routes");
app.use(`/api/v${apiVersion}/assessmentuser`, assessmentUserRouter);

const matchRouter = require("./routes/ match.routes");
app.use(`/api/v${apiVersion}/ match`,  matchRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
