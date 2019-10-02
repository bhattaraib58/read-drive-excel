import HttpStatus from "http-status-codes";

export function bodyParser(err, req, res,next) {
  res.status(err.status).json({
    error: {
      code: err.status,
      message: HttpStatus.getStatusText(err.status)
    }
  });
}

export function genericErrorHandler(err, req, res,next) {
  res.status(HttpStatus.BAD_REQUEST).json({
    error: {
      name: err.constraint || err.name,
      message: err.detail || err.message
    }
  });
}
