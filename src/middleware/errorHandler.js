import { eventType } from "../utils/eventTypeConstant.js";

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const errorHandler = (ws) => (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  const env = process.env.NODE_ENV;

  const data = {
    type: eventType.Error,
    time: new Date().toISOString(),
    status: err.statusCode,
    method: req.method,
    message: err.message,
    url: req.url,
  };

  const server = ws.getWss("/logger");
  server.clients.forEach((c) => c.send(JSON.stringify(data)));

  if (env === "development") {
    console.error(err);
    sendDevError(err, res);
  } else {
    // sendProdError(err, res);
  }
};
