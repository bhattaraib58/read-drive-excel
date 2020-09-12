import './env';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/routes';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// API Routes
app.use('/api', routes);

app.use('*', (req, res) => {
  console.warn(`Path/Method Not Supported:: ${req.url} ${req.method}`);

  res.json({
    error: {
      message: 'Path/Method Not Supported'
    }
  });
});

app.use(errorHandler.genericErrorHandler);

app.listen(PORT, () => {
  console.warn(`Server started at http://${HOST}:${PORT}/api`);
});

export default app;
