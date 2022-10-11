const express = require("express");

const morgan = require("morgan");

const cors = require("cors");

const helmet = require("helmet");

const routerAPI = require("./routes");

const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require("./middlewares/errorHandler");

const app = express();

const port = process.env.PORT || 3000;

const whitelist = ["http://localhost:3001"];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
};

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.use(cors(corsOptions));

routerAPI(app);

app.use(logErrors);

app.use(ormErrorHandler);

app.use(boomErrorHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log("server listening at 3001");
});
