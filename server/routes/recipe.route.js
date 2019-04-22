import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
   res.send('GET route on things.');
});

export default router;
