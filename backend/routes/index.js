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
router.get('/arweave/address', function(req, res, next) {
  let key = req.body;
  console.log(key)
  arweave.wallets.jwkToAddress(key).then((address) => {
    res.send(address);
  });
});





module.exports = router;
