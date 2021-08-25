var express = require('express');
var router = express.Router();
const Arweave = require('arweave');
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  logging: false
});

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
    arweave.wallets.jwkToAddress(key).then((address) => {
      console.log('address' + address)
      res.send({'data' : address});
    });
  }catch(e) {
    next(e);
    res.send(e);
  }
 
});
router.post('/arweave/last_transaction', function(req, res, next) {
  try{
    arweave.wallets.getLastTransactionID(req.body.address).then((id) => {
      res.send({'data' : id});
    });
  }catch(e) {
    next(e);
    console.log(e);
    res.send(e);

  }
 
});

router.post('/arweave/balance', function(req, res, next) {
  try{
    arweave.wallets.getBalance(req.body.address).then((balance) => {
      let winston = balance;
      let ar = arweave.ar.winstonToAr(balance);
      res.send({'data' : ar});
    });
  }catch(e) {
    next(e);
    console.log(e);
    res.send(e);

  }
 
});

router.post('/arweave/create_transaction', function(req, res, next) {
  try{
    let transaction = arweave.createTransaction({
      target: req.body.address,
      quantity: arweave.ar.arToWinston(req.body.amount)
    }, req.body.key);
    console.log('succeed');
    console.log(transaction)
    
    res.send({'data' : transaction});

  }catch(e) {
    next(e);
    res.send({'error': '404'});
  }
 
});





module.exports = router;
