import { web3 } from '../web3/web3.js'

const handler = async (req, res) => {
  try {
    let response = null
    // response = await fetch(
    //   'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    //   {
    //     headers: {
    //       'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',
    //     },
    //     method: 'GET',
    //   },
    // )

    response = await fetch('https://sandbox-api.coinmarketcap.com/v1/exchange/assets',
    {
        headers: {  
            'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',   
        },
        method: 'GET',  
    })
    const data = await response.json()  

    return res.status(200).json({ exchange: data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = handler
