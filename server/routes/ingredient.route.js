import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
   res.send('GET route on things.');
});

router.get('/:id', function(req, res) {
  res.json({'yum': 'why'});
})

export default router;
