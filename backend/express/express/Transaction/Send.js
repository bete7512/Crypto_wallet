import Tx from 'ethereumjs-tx';
import web3 from '../web3/web3.js';


function sendRaw(rawTx, key) {
	const privateKey = new BufferEncoding(key, 'hex');
	const tx = new Tx(rawTx);
	tx.sign(privateKey);
	const serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, txHash) {
		if (err) {
			console.error('sendRawTransaction failed.');
			console.error(err);
			return;
		}
		console.log(txHash);
		setTimeout(() => {
			const transaction = web3.eth.getTransaction(txHash);
			console.log(transaction);
		}, 5 * 60 * 1000);
	});
};

function sendEther(sender, key, receiver, etherValue) {
	const rawTx = {
		nonce: web3.toHex(web3.eth.getTransactionCount(sender)),
		gasLimit: web3.toHex(21000),
		gasPrice: web3.toHex(web3.eth.gasPrice),
		to: receiver,
		value: 0,
		from: sender,
		chainId: 1
	};
	if (etherValue.toString().toUpperCase() === 'ALL') {
		const gasPrice = web3.eth.gasPrice.toString(10);
		const gasVlaue = 21000 * gasPrice;
		const totalBalance = web3.eth.getBalance(sender).toNumber();
		rawTx.value = web3.toHex(totalBalance - gasVlaue);
	} else {
		rawTx.value = web3.toHex(web3.toWei(etherValue, 'ether'));
	}

	sendRaw(rawTx, key);
}

export { sendEther };