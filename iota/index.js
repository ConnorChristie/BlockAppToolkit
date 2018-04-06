const Iota = require('iota.lib.js');
const generateSeed = require('iota-generate-seed');

let iota = new Iota({
    provider: 'http://iota.bitfinex.com:80'
});

const seed = generateSeed();

console.log(seed);

iota.api.getNewAddress(seed, { index: 0, checksum: true, security: 3, total: 2 }, (error, address) => {
    console.log('new addr', address);

    iota.api.att

    iota.api.getAccountData(seed, { start: 0, end: 1, security: 3 }, (error, data) => {
        console.log(data);
    });
});
