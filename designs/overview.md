# Parts

## 1. Keystore
Must be accessable across different platforms so a user should be able to access their own wallets from any device / technology.

* Client side
    * Desktop (Java, C++, Python, Node)
    * Browser (Javascript)
    * Mobile (Obj-C, Java)
* Server side
    * Possibly hold it for the user?
    * Probably not secure

## 2. Transactions
Should be able to sign transactions offline and send them to the blockchain through a light client of some sorts.

Support contract calls and large file structures, ex: blob storage for files on IPFS.

## 3. Mine
Some networks require the use of the client machine to submit transactions (PoW aka Iota) so the client must be able to handle mining small blocks.

## 4. View Transactions
Must be able to view the transactions and verify they are legitimate without running a full node.

Have to also be able to retrieve large data such as files and such from IPFS or the likes.