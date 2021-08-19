const base = require('base-x');

const BlueElectrum = {
  encode: function () {
    throw new Error('not implemented');
  },

  decode: function (input) {
    const x = base('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$*+-./:');
    return x.decode(input).toString('hex');
  },
  isDisabled: function (input) {
    return true;
  },


};

module.exports = BlueElectrum;
