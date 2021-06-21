const { Router } = require('express');
const { weatherByCord, weatherByCityId } = require('../controllers/weather')
const router = Router()

router.get('/', weatherByCord);
router.get('/:city/:id', weatherByCityId);



module.exports = router;
