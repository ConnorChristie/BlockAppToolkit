# IOTA Transfer Workflow

## 1. Generate Transaction Object(s)
A transaction may serve different purposes depending on the value or data that is being transferred. If there is a monetary vale being transferred from one address to another, 4 transactions are bundled together to create a UTXO like transfer. If there is only data being transferred, then only one transaction is created.

### Transaction Object (2673 trytes)
* __`hash` (string: 81 trytes):__ The hash of the transaction after performing the proof of work and finding the correct nonce.
* __`signatureMessageFragment` (string: 2187 trytes):__ In case there is a spent input, the signature of the private key is stored here. If no signature is required, it is empty (all 9's) or can be used for storing data.
* __`address` (string: 81 trytes):__ Depending on whether this transaction is being used to supply the bundle as an input or is the output, it will contain either the input or output address respectively. Otherwise, if this transaction contains no value transfer, it may be an arbitrary address for the data to be sent to.
* __`value` (int: 27 trytes):__ The value being transferred in this transaction. Otherwise, set to 0 for a data transfer.
* __`obsoleteTag` (string: 27 trytes):__ Used by the bundle hasher ([details below](#Bundle-Hash-Creation)). _This value may be changed when generating the bundle hash._
* __`timestamp` (int: 9 trytes):__ The timestamp of when the transaction was created.
* __`currentIndex` (int: 9 trytes):__ The index of this transaction in the bundle.
* __`lastIndex` (int: 9 trytes):__ The total number of transactions present in the bundle.
* __`bundle` (string: 81 trytes):__ The bundle's hash, used for grouping transactions together. ([Details on how it is calculated below](#Bundle-Hash-Creation)).
* __`trunkTransaction` (string: 81 trytes):__ The hash of the 1st transaction to reference (approve).
* __`branchTransaction` (string: 81 trytes):__ The hash of the 2nd transaction to reference (approve).
* __`tag` (string: 27 trytes):__ An arbitrary user defined tag to distinguish this transaction.
* __`attachmentTimestamp` (int: 9 trytes):__ The timestamp when the PoW is complete.
* __`attachmentTimestampLowerBound` (int: 9 trytes):__ TODO (Future use)
* __`attachmentTimestampUpperBound` (int: 9 trytes):__ TODO (Future use)
* __`nonce` (string: 27 trytes):__ The nonce used to obtain the correct hash of this transaction which satisfies the Minimum Weight Magnitude (details below).

### Bundle Hash Creation
The bundle hash is primarily used for value transfers and is one of the main ingredients for each input's signature. The hash is created by hashing certain parts of each transaction together with the Kerl hash function.

#### Steps
1. Iterate through all the transactions in the bundle
    * __The order that the transactions are hashed in is precise__
    * From transaction index 0 to the last transaction
2. Concatenate the following data of the transaction together
    * Address + value + obsoleteTag + timestamp + currentIndex + lastIndex
3. Absorb each transaction's data into the Kerl function
4. Squeeze out the hash from the Kerl function
5. Set each transaction's bundle value to the generated hash

_The `obsoleteTag` is used by the bundle hasher in cases of an insecure bundle hash being generated. The tag of the first transaction will be incremented when the normalized bundle hash contains any insecure values that may expose parts of the private key._ [More information here](https://github.com/iotaledger/iota.lib.js/blob/v0.4.2/lib/crypto/bundle/bundle.js#L119-L125).

### Data Transaction
Here is an example of a data transaction. The signatureMessageFragment contains the data (in tryte format).
```json
{
    "hash": "PVOPYZMHXPTIFNJNCUIOZYOULO9FBIWIRLBTDUO9PZ9SAI9CWKIBMZWZPEWMITIBNMAXVENXYNCQ99999",
    "signatureMessageFragment": "ODGABDPCADTCGADBGACCTCGDHD9DCDGAQAGAADTCGDGDPCVCTCGADBGARBPC9D9DCDEAHDWCTCFDTCSAEAVAWAXAYAZAGAQD999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "address": "EC9SMJQEROYFZLCTRZGRZHMVEVGEMQQNAFXWFDVERLUGYRGPAEIOUNXAGBCMKFXGRNQHFXUUWHSKQXBXX",
    "value": 0,
    "obsoleteTag": "RLNSPAN99999999999999999999",
    "timestamp": 1523059969,
    "currentIndex": 0,
    "lastIndex": 0,
    "bundle": "XTEKQODEBWFVT9WGPIJBYQCDJCOMHPJLJKQQDZIABTZZLGP9GWFVTDULBNBCJJIWIHSLLPHJBRDPFQFFY",
    "trunkTransaction": "TIYDQHFIQWXAB9CWJERNUFEFKCSW9NSYABAUIDDGPXRHQBBBZDHPKBFQT9QCZHCNUUWTLQCVKQ9H99999",
    "branchTransaction": "RWHPZOTFCYXPLYJOGCGXRVLNRVCKJKU9TCGQORZGTVRLPKMX9MDQEGLDYXSCPIPEIAYSUFWUKWBCZ9999",
    "tag": "DANSPAN99999999999999999999",
    "attachmentTimestamp": 1523059970036,
    "attachmentTimestampLowerBound": 0,
    "attachmentTimestampUpperBound": 12,
    "nonce": "XYHSFIGMLCZTWJOATQEDKFO9FBB"
}
```

#### Raw Trytes
The transaction converted into raw trytes.
```
ODGABDPCADTCGADBGACCTCGDHD9DCDGAQAGAADTCGDGDPCVCTCGADBGARBPC9D9DCDEAHDWCTCFDTCSAEAVAWAXAYAZAGAQD999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999EC9SMJQEROYFZLCTRZGRZHMVEVGEMQQNAFXWFDVERLUGYRGPAEIOUNXAGBCMKFXGRNQHFXUUWHSKQXBXX999999999999999999999999999RLNSPAN99999999999999999999MMLXDYD99999999999999999999XTEKQODEBWFVT9WGPIJBYQCDJCOMHPJLJKQQDZIABTZZLGP9GWFVTDULBNBCJJIWIHSLLPHJBRDPFQFFYTIYDQHFIQWXAB9CWJERNUFEFKCSW9NSYABAUIDDGPXRHQBBBZDHPKBFQT9QCZHCNUUWTLQCVKQ9H99999RWHPZOTFCYXPLYJOGCGXRVLNRVCKJKU9TCGQORZGTVRLPKMX9MDQEGLDYXSCPIPEIAYSUFWUKWBCZ9999DANSPAN99999999999999999999WT9ARHPKE999999999L99999999XYHSFIGMLCZTWJOATQEDKFO9FBB
```

### Value Transfer (Bundle)
IOTA uses an UTXO-like scheme to transfer value from one address (or seed) to another. Inputs are supplied to the bundle along with outputs including an address for the unspent value to be sent to. 



#### For Example
Bob holds 20i in address AA and 40i in address BB (addresses generated from the same seed) and wants to transfer 50i to Alice's address CC.

Prerequisites:
* Bob with seed 'ABCDE'
    * Address AA [index: 0]: 20i
    * Address BB [index 1]: 40i
* Alice with seed 'LMNOP'
    * Address CC [index: 0]: 0i
* Addresses generated with security level 

Bundle:
| Index | Address | Value | Purpose |
| ----- | :-----: | :---: | ------- |
| 0 | CC | 50 | Defines where the tokens of the input are sent to. |
| 1 | AA | -20 | Contributes to one of the inputs for the tokens to send to Alice. The `signatureMessageFragment` in this transaction also contains the first of three parts of the signature for this input's address. |
| 2 | AA | 0 | Contains the second half of address AA's signature. |
| 3 | AA | 0 | Contains the last fragment of address AA's signature. The signature is split into three due to the security level (level 3) when the address was generated. |
| 4 | BB | -40 | Contributes to one of the inputs for the tokens to send to Alice. This transaction also contains the first fragment of adress BB's signature. |
| 5 | BB | 0 | Contains the second half of address BB's signature. |
| 6 | BB | 0 | Contains the last fragment of address BB's signature. |
| 7 | DD | 10 | An output where the remainder of the unspent inputs are sent to. This address is generated from Bob's seed. |

## 2. Perform Proof of Work
