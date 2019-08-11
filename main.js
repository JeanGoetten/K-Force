var config = require('./config.json')
var setTitle = require('console-title')
var {table} = require('table') 
var colors = require('colors')
var binance = require('node-binance-api')().options({
    APIKEY: <key>,
    APISECRET: <secret>,
    useServerTime: true,
    test: true
})

// var last_trade = [Date.now()]
// var last_price = [1, 1]
//     try{
//         binance.websockets.trades(['BTCUSDT'], (trades) => {
//             var time_chicken = new Date()
//             var {E:eventTime, s:symbol, p:price, q:quantity} = trades
            
            
//             last_price.push(price)

//             if(last_price.length > 2){
//                 last_price.shift()
//             }

//             delta_price = (last_price[1] - last_price[0]) //delta y
//             delta_price = delta_price.toFixed(4)

//             var time = Date.now()
//             if(time != eventTime){
//                 last_trade.push(eventTime)
//                 if(last_trade.length > 2){
//                     last_trade.shift()
//                 }
//             }
//             var delta_time = (last_trade[1] - last_trade[0]) //delta x

//             var timer = (time_chicken.getHours() + ':' 
//             + time_chicken.getMinutes() + ':' 
//             + time_chicken.getSeconds() + ' ')

//             var k_tangle = delta_price/delta_time
//             var percent_change = (delta_price/price)*100
//             // var show, output = []
//             // show = [
//             //     [symbol, 'Price', 'qtd', 'ms', ' Price change ', ' Percent change '],
//             //     [timer, price, quantity/1, delta_time, delta_price, percent_change.toFixed(2)]
//             // ]
//             // output = table(show)
//             // console.log(output)

//             binance.prevDay('BTCUSDT', (error, prevDay, symbol) => {
//                 var U_vol = prevDay.quoteVolume
//                 const U_ms_tot = 86400000 //miliseconds per day
//                 var L = U_vol/U_ms_tot

//                 var real_m_vol = quantity/delta_time
//                 var ppt_crease = (real_m_vol/L)*100

//                 uk_force = (k_tangle*quantity*ppt_crease)*100
                
//                 var show2, output2 = []
//                 show2 = [
//                     [symbol, 'Price'.yellow, 'qtd'.yellow, 'ms'.yellow, 'Change %'.yellow],
//                     [timer, price, quantity, delta_time, percent_change.toFixed(2)],
//                     ['u-Micro Vol'.yellow, 'Real-u-micro Vol'.yellow, ' % '.yellow, 'uK-FORCE'.yellow, ' '],
//                     [L.toFixed(2), real_m_vol.toFixed(4), ppt_crease.toFixed(2), uk_force, ' ']
//                 ]
//                 output2 = table(show2)
//                 console.log(output2)

//                 //Differential Equation for Logistic Growth
//                 //dy/dt = ky*(1-(y/L))
//                 //k_tangle = k*price*(1-(price/L)) 
//                 //var k = k_tangle/(price*(1-(price/L)))
//                 //console.log('k: ' + k)

//                 //General Diff Equation for LG
//                 //b = (L/(1 + e**(-kt)))/p(t)
//                 var b = (L/(1 + 1))/last_trade[0] 
//                 //console.log('b: ' + b)

//                 //p(t) = L/(1 + b*e**(-kt)) => ln(p(t)*1 + b)/L)/-t = k
//                 //k = ln(p(t)*1 + b)/L)/-t
//                 var _k2 = (last_trade[1] * 1 + b)/L
//                 var _t = last_trade[1] * (-1)
//                 var k = Math.log(_k2)/_t

//                 var results = [
//                     ['k: '.yellow, 'b: '.yellow],
//                     [k, b]
//                 ]
//                 var output3 = table(results)
//                 //console.log(output3)

//                 //p(t) = L/(1 + b*e**(-kt))
//                 const t = (last_trade[1] + 3600000)
//                 var coificiente_limite = 1 + b*(Math.E**(-k*t))
//                 var p_10 = L/(coificiente_limite)
//                 console.log(p_10)
//             })
//         })
//     }
//     catch(e){
//         throw e
//     }
