const binance = require('node-binance-api')().options({
    APIKEY: '<key>',
    APISECRET: '<secret>',
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true
})
var trad 
binance.websockets.trades(['MATICBTC'], (trades) => {
    var {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades
    //console.log(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker)
    trad = trades
    console.log(trad)
})
