const Iota = require('iota.lib.js');
const generateSeed = require('iota-generate-seed');

// const Curl = require('iota.lib.js/lib/crypto/curl/curl');
var Converter       =   require("iota.lib.js/lib/crypto/converter/converter");

let iota = new Iota({
    provider: 'http://iota.bitfinex.com:80'
});

// var localAttachToTangle = (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) => {
//     console.log(trunkTransaction, branchTransaction);
//     callback();
// }

// iota.api.attachToTangle = localAttachToTangle;
// iota.api.__proto__.attachToTangle = localAttachToTangle;

// iota.api.findTransactionObjects({
//     addresses: ['JXCESDPOBARLPFRBWXJRMDFGUTDNJEJX9FQXKWVBWMPLYOGDLHTF9N9JDN9IUSXZNDRGVNUKRXTRWZFQD']
// }, (err, tran) => {
//     console.log(tran);
// });

// console.log(iota.utils.transactionTrytes({
//     hash: 'OAIKNHKCLXW9ECWSVPVDE99FBHDPPLCCT9KNTNUZFGIRKIFXRPLJYH9CE9ZMQKCEZNCSNZTUDQTM99999',
//     signatureMessageFragment: 'QGEIUMSJLBH9ZUZXGOEZUQYIELAJSFPB9TNFKVQLEYCPXACMNXTEUGODAJTYQWBIEPZJJFPHWKEWGZDWDESSOANPHFYNQY9KPOJZQDFAVLAFIOWXCHCQRRLCBJKBKRFOTTMYYOCISGEJAHWYMK9HTLJLYNSASITWIDGXFJXTBXVSDJMLVHXNPWXAVWWTCBWBKORAWCMVRFPDLPAAOTNBUWY9UKKEKBDUUKXAJIBEOPRXMWIMEOXBVVGVFJGUWLPQZSUADKIUW9KJTMUPHJXON9DOBBYPH9EFTHLAJYOPHALPLNOOSXVCSWLXJGXLVKWLTTJANKIBGTECBZXPHMMKEEFWBHPHDZQBOQRDRSINTZKZWSGKKNLQBOAMQ9HEEOTKQPZODNBGNDUKHFIZYDRTCXRULLSDHNQOYFKFXIZUFWIHMBWKMFJDVLJBWIGMAGXFFWGJIECJJFZ9ULXA9XIWHIYVCKH9PYTGH9XJJWYQQCUXEPZQIFDEVHPUUEU9MRJFXSMYLZRQQBIERKYMFZLNYSHCTCOYHEMWEXGXHHCAG9WXOQKECBZNZLDKKY99RUXXRWLRSEMZZOPOVE9WPIBBXLA9RPEIIX9FILHJZTXJMPUWKCBWHHTLJI9FBSTHA9RZBVQGQQUBVHXCIGIYKHPPRWKWFOJFDZJORVLXTYJFQGRWCTQTFXPCVHEKUBYMSXZWVGLH9AAEEDMWCYNSOHQZRKLYXRQCNHDNOEONKOAXDCSUW9RUNFJUIXSEJWRYDKPSALQZLFBTYUDUCZAAIKM9MNSUUKBSCCIZIO9DEV9ROXYBCRFUMNOFPQOHXFWYLIKXQYENFYEQERXOLDNWFLPXEVEBMQJBJYMUYMTTNVWKKNMK9WQUEFCHFCOTXAWGDZJFLLMBXJSAWLDSTLBNFIVXRGIGLMWQO9LMOJZZPBWGVXKHCJTX9QNSSGGEM9DTGLTJADKPEWLDGTEDMHQRPVC9OBJCJJQPSHPWEREDEPKIIQTNMPBAFPRWXNLSCNBQDHBCGKEEPITIXAKJLCZ9HZABWERLWYYAYGWQLXJNYFLVV9NEQEF9KEOPAKLTKCLBXMZ9ACIPSEPSYOJRRGPIUSBFSP9NSKGHGVBWZYYOQ9OSXXZCV9GLHUOPWPJDHTKVBILFRKBVC9FKJHUB9ZCAUFDLDNWLWTMANUPCCJYXCOPYJHQNAK9IXJJCOFGMEXSQPSXKSA9EWVJZVZMZJQGODFPPLOZAPQOO9BFJIWCWLGWCAZSEXHF9PYMUQQATMLH9ZC9WYYJDSXVVB9JXFIQWBALBZXFSPTHWREJPDSWYXAEEQDKZYJISVMB9SUZTZTKLUBSEHPLABXWZVZPQFJWINTBWAJDFBBCBOFVMBCKIOUBGFQOQIITGGKLVQFEXIRFBEYKHTUGMAUJBQCFLMSENN9WIGIBIAAKJIVNTSEUELQERW9JREKFIHWTHJFSWYG9FQLIMF9KCXUVKVYIWJWMSUKGTGVNGDMHQICDEKFAQSHRQHVJFJVSDUTYBG9KM9RPYYAIQJKYLXNDXPNRERIXMYZQNNX9UNYSQDFRPFPHFICTVWOWQXVLD9SJEVTWVPU9CNGUHQTRKVKOZUQHKJVDNZMIATCQVXGSYTKCSZDAPIYJLCUETXLJBFDIAJPJPDBXQWRHIQYSQITXEFFOGGYMMPGIBTBNLRYFYY9RCFDPJBDWBWGJUIC9MNQASDGAAD9EAUJTLMWMEXCVXQPEOFJDTVOZXOQQAPLGKNOGVHYEWWMTOAIIGBLETULNRLDOFUJMLCNLQGHBXONT9EKZWP9NRMI9PAYJPPKMCVA99UPIPYGXHIOUDQI9IOTL9CIZZGYQHLVVRHIMUWHZQX9NFGMEAELQBGBHZFQJQKGRDVFKHPDAMZXBWHNROXI9D9PCSFAOUBVLOKPLHYVBBFCLSFHEEBGFLGKGCNPAVELCPZJGQYWFXRTUZOEBVUXH9YYJVUVSFPENBPMATMJUEISKT9VRMGHRXXEPUFOTARYRNAJQC9OEYBICKJUVOZGTDFDQQNAAFTJMNBJKJSVPWMENJHPCMSDR9XUDFONQUN9IOSOXCHNOLEOHNNVOAYBWTHAGAYZPDQUTYXXV9BYJG9PIGLYLWWIZHBREUKZFMECCCMKOJWAFBRSZ9TYP9AOPXWG9FNXJPRBSFJTDZVXZMQFD',
//     address: 'JXCESDPOBARLPFRBWXJRMDFGUTDNJEJX9FQXKWVBWMPLYOGDLHTF9N9JDN9IUSXZNDRGVNUKRXTRWZFQD',
//     value: 0,
//     obsoleteTag: '999999999999999999999999999',
//     timestamp: 1522964936,
//     currentIndex: 2,
//     lastIndex: 3,
//     bundle: 'JVKUXAFJDTKOEZFEGAFTFNRCOC9OHVXIEDPWQTKHGYAQISVFDCFFWTHLELXOJEZLOURPDLZTECUANSAIW',
//     trunkTransaction: 'TQEOPMUWRZKCIWJNNXCXFATANOSWIECZNUYLTIFEOXHKQUZXNPJOSFDDYV9DXQWTTETODRQNGJVX99999',
//     branchTransaction: 'SIDIEGGGM9HOJPXZYLX9GDOTROTGXSDOMMDGFGEHRVC9PRCPQJVUASURYVDIO999HOQUULEOPPAU99999',
//     tag: '999999999999999999999999999',
//     attachmentTimestamp: 1522965028018,
//     attachmentTimestampLowerBound: 0,
//     attachmentTimestampUpperBound: 3812798742493,
//     nonce: '999999999999999999999999999'
// }));

// const seed = generateSeed();

// console.log(seed);

// iota.api.getNewAddress(seed, { index: 0, checksum: true, security: 3, total: 2 }, (error, addresses) => {
//     console.log('new addr', addresses);

//     let transfers = [
//         {
//             address: addresses[1],
//             value: 0,
//             message: iota.utils.toTrytes(JSON.stringify({ msg: 'hello world' }))
//         }
//     ];

//     iota.api.prepareTransfers(seed, transfers, (error, response) => {
//         console.log('transfer', error, response);

//         iota.api.sendTrytes(response, 4, 15, (err, res) => {
//             console.log('send', err, res);
//         });
//     });
// });
