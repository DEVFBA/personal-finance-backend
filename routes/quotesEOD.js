const router = require('express').Router();

const {
    createQuoteEOD, 
    getQuoteEODMarketStack,
    getLastEODInsertDate
} = require('../controllers/quotesEOD.js');

router.get('/lastInsertDate', getLastEODInsertDate);
router.get('/', getQuoteEODMarketStack);
router.post('/insert', createQuoteEOD);

module.exports = router;