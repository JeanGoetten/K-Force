var config = require('./config.json')
var setTitle = require('console-title')
var {table} = require('table') 
var colors = require('colors')
var binance = require('node-binance-api')().options({
    APIKEY: config.API_KEY,
    APISECRET: config.SECRET_KEY,
    useServerTime: true
})

setInterval(()=>{
    try {
    binance.prices('TUSDUSDT', (error, ticker)=>{
        setTitle('TUSD/USDT: ' + ticker.TUSDUSDT)
    })
    } catch (e){
        throw e
    }
}, 1000)

setInterval(function () {
    var dateAtual = new Date()
    try {
        binance.balance((error, balances) => {
            if (error) return console.error(error)
            const total = parseFloat(balances.USDT.onOrder) + parseFloat(balances.USDT.available) + parseFloat(balances.TUSD.onOrder) + parseFloat(balances.TUSD.available)
            console.clear()
            console.log("==========================================")
            console.log("SALDO TOTAL..:", total, "USD")
            console.log("SALDO INICIAL:", config.INITIAL_INVESTMENT, "USD")
            console.log("LUCRO........:", total - config.INITIAL_INVESTMENT, "USD")
            dateAtual = new Date()
            console.log("@", dateAtual.getHours() + ':' + dateAtual.getMinutes() + ':' + dateAtual.getSeconds())
            console.log("==========================================")
            var buy = config.BUY_PRICE
            var sell = config.SELL_PRICE
            try {
                binance.prevDay("BTCUSDT", (error, prevDay, symbol) => {
                    if (prevDay.priceChangePercent > 0) {
                        buy = 0.9920
                        sell = 0.9965
                    } else {
                        buy = 0.9965
                        sell = 0.9995
                    }
                    console.log("Cotação BTC/USDT", prevDay.lastPrice)
                    console.log("Definidos: compra " + buy + " e venda " + sell)
                    console.log("==========================================")
                    console.log(' ')

                    if (balances.USDT.available > 20) {
                        console.log("Compra: " + buy)
                        try {
                            binance.buy("TUSDUSDT", ((balances.USDT.available - 0.1) / buy).toFixed(2), buy)
                        } catch (e) {
                            throw e
                        }
                    }
                    if (balances.TUSD.available > 20) {
                        console.log("Venda: " + sell)
                        try {
                            binance.sell("TUSDUSDT", (balances.TUSD.available - 0.1).toFixed(2), sell)
                        } catch (e) {
                            throw e
                        }
                    }
                })
            } catch (e) {
                throw e
            }
        });
    } catch (e) {
        console.log("ERRO : " + e)
    }
}, 20000)

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