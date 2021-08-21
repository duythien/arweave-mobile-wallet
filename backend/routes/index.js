var express = require('express');
var router = express.Router();
const Arweave = require('arweave');
const arweave = Arweave.init({});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/arweave/key', function(req, res, next) {
    arweave.wallets.generate().then((key) => {
      res.send(key);

    });
});
router.post('/arweave/address', function(req, res, next) {
  try{
    let key = req.body;
    console.log(key);

    arweave.wallets.jwkToAddress(key).then((address) => {
      res.send(address);
    });
  }catch(e) {
    next(e);
    console.log(e);
    res.send(e);

  }
 
});
router.get('/arweave/last_transaction', function(req, res, next) {
  try{
    arweave.wallets.getLastTransactionID(req.body.address).then((id) => {
      res.send(id);
    });
  }catch(e) {
    next(e);
    console.log(e);
    res.send(e);

  }
 
});





module.exports = router;
