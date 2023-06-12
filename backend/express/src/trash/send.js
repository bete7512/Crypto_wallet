function sendErcToken() {

    let txObj = {
 
        gas: Web3js.utils.toHex(100000),
 
        "to": tokenAddress,
 
        "value": "0x00",
 
        "data": data,
 
        "from": fromAddress
 
    }
 
    Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
 
        if (err) {
 
            return callback(err)
 
        } else {
 
            console.log(signedTx)
 
            return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
 
                if (err) {
 
                    console.log(err)
 
                } else {
 
                    console.log(res)
 
                }
 
            })
 
        }
 
    })
 
 }