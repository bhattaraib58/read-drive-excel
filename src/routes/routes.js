import { Router } from 'express';
import excelRoute from './excelRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION
  });
});

router.use('/excel', excelRoute);

export default router;
