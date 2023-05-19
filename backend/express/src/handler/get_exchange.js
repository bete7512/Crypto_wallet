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
    let data3 = await fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=USDT&tsym=USD',
    {
        headers: {     
            'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',         
        },
        method: 'GET',     
    })
    data3 = await data3.json()

    let data4 = await fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=XLM&tsym=USD',
    {
        headers: {  
            'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',        
        },
        method: 'GET',   
    })
    data4 = await data4.json()
    let data5 = await fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ADA&tsym=USD',
    {
        headers: {  
            'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',        
        },
        method: 'GET',    
    })
    data5 = await data5.json() 
    let ETH_exchanges = data.Data.AggregatedData 
    let BTC_exchanges = data2.Data.AggregatedData    
    let USDT_exchanges = data3.Data.AggregatedData   
    let XLM_exchanges = data4.Data.AggregatedData   
    let ADA_exchanges = data5.Data.AggregatedData      
    let exchanges = [{eth:ETH_exchanges}, {btc:BTC_exchanges}, {tether:USDT_exchanges}, {xlm:XLM_exchanges}, {cardano:ADA_exchanges}    ] 
    return res.status(200).json({ exchanges }) 
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = handler
