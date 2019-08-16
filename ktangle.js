var setTitle = require('console-title')
var {table} = require('table') 
var colors = require('colors')  
var binance = require('node-binance-api')().options({
    APIKEY: "<key>",
    APISECRET: "<secret>",
    useServerTime: true,
    test: true
})

var last_trade = [Date.now()]
var last_price = [1, 1]
    try{
        binance.websockets.trades(['BTCUSDT'], (trades) => {
            // var time_chicken = new Date()
            var {E:eventTime, s:symbol, p:price, q:quantity} = trades
            
            
            // last_price.push(price)

            // if(last_price.length > 2){
            //     last_price.shift()
            // }

            // delta_price = (last_price[1] - last_price[0]) //delta y
            // delta_price = delta_price.toFixed(4)

            // var time = Date.now()
            // if(time != eventTime){
            //     last_trade.push(eventTime)
            //     if(last_trade.length > 2){
            //         last_trade.shift()
            //     }
            // }
            // var delta_time = (last_trade[1] - last_trade[0]) //delta x

            // var timer = (time_chicken.getHours() + ':' 
            // + time_chicken.getMinutes() + ':' 
            // + time_chicken.getSeconds() + ' ')

            // var k_tangle = delta_price/delta_time
            // var percent_change = (delta_price/price)*100
            // var show, output = []
            // show = [
            //     [symbol, 'Price', 'qtd', 'ms', ' Price change ', ' Percent change '],
            //     [timer, price, quantity/1, delta_time, delta_price, percent_change.toFixed(2)]
            // ]
            // output = table(show)
            // console.log(output)

            binance.prevDay('BTCUSDT', (error, prevDay, symbol) => {
                var U_vol = prevDay.quoteVolume //universal volume per day      
                const U_min_tot = 86400 //seconds per day
                var L = U_vol/U_min_tot //universal volume per seconds

                //console.log("Volume total/sec: ", L)

                binance.depth("BTCUSDT", (error, depth, symbol) => {
                  var last_update = depth.lastUpdateId
                  var ask_update = depth.asks
                  var bid_update = depth.bids

                  var result_ask = [];
                  for(var i in ask_update){
                    result_ask.push([i, ask_update [i]])
                  }

                  var amount_ask = []
                  var price_ask = []
                  var colapse_ask = []
                  for (let i = 0; i < result_ask.length; i++) {
                    
                    amount_ask.push(result_ask[i][1])
                    price_ask.push(result_ask[i][0])

                    var multiply = amount_ask[i] * price_ask[i]
                    
                    colapse_ask.push(multiply)


                    var amount_sum_ask = colapse_ask.reduce(function(Acumulador, valorAtual) {return Acumulador + valorAtual})
                  }    
                  //console.log("acúmulo compra total 100:  ", amount_sum_ask)
                  //console.log("volume diário instantâneo: ", L)

                  var result_bid = [];
                  for(var i in bid_update){
                    result_bid.push([i, bid_update [i]])
                  }

                  var amount_bid = []
                  var price_bid = []
                  var colapse_bid = []
                  for (let i = 0; i < result_bid.length; i++) {
                    
                    amount_bid.push(result_bid[i][1])
                    price_bid.push(result_bid[i][0])

                    var multiply = amount_bid[i] * price_bid[i]
                    
                    colapse_bid.push(multiply)


                    var amount_sum_bid = colapse_bid.reduce(function(Acumulador, valorAtual) {return Acumulador + valorAtual})
                  }    
                  console.log("\x1b[34m", "COMPRA USDT: ",  amount_sum_ask)
                  console.log("\x1b[31m", "VENDA  USDT: ",  amount_sum_bid) 
                  console.log("\x1b[33m", "DIFER  USDT: ",  (amount_sum_ask - amount_sum_bid) + "\n") 
                })

                // var real_m_vol = quantity/delta_time
                // var ppt_crease = (real_m_vol/L)*100

                // uk_force = (k_tangle*quantity*ppt_crease)*100
                
                // var show2, output2 = []
                // show2 = [
                //     [symbol, 'Price'.yellow, 'qtd'.yellow, 'ms'.yellow, 'Change %'.yellow],
                //     [timer, price, quantity, delta_time, percent_change.toFixed(2)],
                //     ['u-Micro Vol'.yellow, 'Real-u-micro Vol'.yellow, ' % '.yellow, 'uK-FORCE'.yellow, ' '],
                //     [L.toFixed(2), real_m_vol.toFixed(4), ppt_crease.toFixed(2), uk_force, ' ']
                // ]
                // output2 = table(show2)
                //console.log(output2)

                //Differential Equation for Logistic Growth
                //dy/dt = ky*(1-(y/L))
                //k_tangle = k*price*(1-(price/L)) 
                //var k = k_tangle/(price*(1-(price/L)))
                //console.log('k: ' + k)

                //General Diff Equation for LG
                //b = (L/(1 + e**(-kt)))/p(t)
                //var b = (L/(1 + 1))/last_trade[0] 
                //console.log('b: ' + b)

                //p(t) = L/(1 + b*e**(-kt)) => ln(p(t)*1 + b)/L)/-t = k
                //k = ln(p(t)*1 + b)/L)/-t
                // var _k2 = (last_trade[1] * 1 + b)/L
                // var _t = last_trade[1] * (-1)
                // var k = Math.log(_k2)/_t

                // var results = [
                //     ['k: '.yellow, 'b: '.yellow],
                //     [k, b]
                // ]
                // var output3 = table(results)
                //console.log(output3)

            })
        })
    }
    catch(e){
        throw e
    }
