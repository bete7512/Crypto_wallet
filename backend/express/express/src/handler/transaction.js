import { web3 } from '../web3/web3.js'

const address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const handler = async (req, res) => {
  try {
    let sth
    web3.eth
      .getTransactionCount(address)
      .then((res) => (sth = res))
      .catch((err) => console.log(err))
    console.log(sth)
    res.send(sth)
  } catch (error) {
    console.log(error)
  }
}

export { handler }
