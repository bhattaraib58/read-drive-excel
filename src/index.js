import './env';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/routes';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//API Routes
app.use('/api', routes);

app.use('*', (req, res) => {
  console.log(`Path/Method Not Supported:: ${req.url} ${req.method}`);
  res.json({
    error: {
      message: 'Path/Method Not Supported',
    },
  });
});

app.use(errorHandler.genericErrorHandler);

app.listen(PORT, () => {
  console.log(`Server Started on::${PORT}/api`);
});

export default app;
