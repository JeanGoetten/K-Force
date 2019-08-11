const binance = require('node-binance-api')().options({
    APIKEY: '<key>',
    APISECRET: '<secret>',
    useServerTime: true, 
    test: true
})
var interval = 1 //seconds
var t = 1
var last_trade = [Date.now()]
binance.websockets.trades(['BTCUSDT'], (trades) => {
    var {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades
    
    var time = Date.now()
    if(time != eventTime){
        last_trade.push(eventTime)
        if(last_trade.length > 2){
            last_trade.shift()
        }
    }
    var delta_time = (last_trade[1] - last_trade[0])
    
    var obj = {price: price, qtd: (quantity/1), latency: delta_time/1000}
    console.log(obj)
    
})
// setInterval(() => {
//     console.log(t)
//     t++
// }, interval*1000)
