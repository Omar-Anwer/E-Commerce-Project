// health check endpoint

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

export default router;
