// async function getBalance() {
//     const url = 'https://yemsuatubeg.hasura.app/v1/graphql'
//     const headers = {
//       'Content-Type': 'application/json',
//       'x-hasura-admin-secret':
//         'T66GUFpwRCcjv0ko090BsgY6ibjoZFOifwZHyv0FCWABH8XF3zq90TnIr4M4cWtr',
//     }

//     for (let i = 0; i < 60; i++) {
//       try {
//         const query = `query MyQuery {
//           my_table {
//             col1
//             col10
//             col11
//             col12
//             col13
//             col14
//             col15
//             col16
//             col17
//             col18
//             col19
//             col2
//             col20
//             col21
//             col22
//             col23
//             col24
//             col25
//             col26
//             col27
//             col28
//             col29
//             col3
//             col30
//             col31
//             col32
//             col33
//             col34
//             col35
//             col36
//             col37
//             col38
//             col39
//             col4
//             col40
//             col41
//             col42
//             col43
//             col44
//             col45
//             col46
//             col47
//             col48
//             col49
//             col5
//             col50
//             col6
//             col7
//             col8
//             col9
//             id
//           }
//         }`

//         const variables = {}
//         const body = JSON.stringify({ query, variables })

//         const requestInit = {
//           method: 'POST',
//           headers,
//           body,
//         }

//         const response = await fetch(url, requestInit)
//         const { headers: responseHeaders, status, statusText } = response
//         const responseBody = await response.text()
//         const requestLength = Buffer.byteLength(body, 'utf8')
//         const responseLength = responseHeaders.has('Content-Length')
//           ? parseInt(responseHeaders.get('Content-Length'), 10)
//           : 0
//         totalLength += requestLength + responseLength

//         console.log(`Request Content Length: ${requestLength}`)
//         console.log(`Response Content Length: ${responseLength}`)
//         console.log({ status, statusText, response: responseBody })
//       } catch (error) {
//         console.log(`Error: ${error.message}`)
//         await getBalance()
//       }
//     }
//     console.log(`Total Length: ${totalLength}`)
//   }
//   // Call getBalance immediately and every minute after that
//   let test_myserver= setInterval(getBalance, 60000);
//   setTimeout(() => {
//     clearInterval(test_myserver);
//   }, 1312 * 61000);
"use strict";