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

    response = await fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ETH&tsym=USD',
    {
        headers: {  
            'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',   
        },
        method: 'GET',  
    })
    const data = await response.json()  

    let response2 = null 
    response2 = await fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD',
    {
        headers: { 
             'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',      
        },
        method: 'GET',    
    })
    const data2 = await response2.json()    
    console.log(data2 );

    console.log(data); 

    let exchange = {...data, ...data2}
    return res.status(200).json(exchange)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = handler
