var binance = require('node-binance-api')().options({
    APIKEY: "<key>",
    APISECRET: "<secret>",
    useServerTime: true,
    test: true
})
var price_down = 0
var price_up = 0
var up = 0
var down = 0
var log_data

try{
  binance.websockets.prevDay('BTCUSDT', (error, response) => {
    var {quoteVolume: quoteVolume} = response

      var U_vol = quoteVolume //universal volume per day      
      const U_min_tot = 86400 //seconds per day
      var L = U_vol/U_min_tot //universal volume per seconds

      binance.websockets.depth("BTCUSDT", (depth) => {
        var {a: a, b: b} = depth
        var ask_update = a
        var bid_update = b
        var result_ask = []             

        for(var i in ask_update){
          result_ask.push(ask_update [i])
        }

        var amount_ask = []
        var price_ask = []
        var colapse_ask = []
        var acumulate_ask = 0
        for (let i = 0; i < result_ask.length; i++) {
                
          amount_ask.push(result_ask[i][1])
          price_ask.push(result_ask[i][0])
          var multiply = amount_ask[i] * price_ask[i]
          colapse_ask.push(multiply)

          var actual_valor = colapse_ask[i]
          acumulate_ask = actual_valor + acumulate_ask
                
          if(acumulate_ask <= L){
            price_up = price_ask[i]
          }
        }    

        var result_bid = [];
        for(var i in bid_update){
          result_bid.push(bid_update [i])
        }

        var amount_bid = []
        var price_bid = []
        var colapse_bid = []
        var acumulate_bid = 0
        for (let i = 0; i < result_bid.length; i++) {
                
          amount_bid.push(result_bid[i][1])
          price_bid.push(result_bid[i][0])

          var multiply = amount_bid[i] * price_bid[i]
                
          colapse_bid.push(multiply)        
                
          var actual_valor = colapse_bid[i]
          acumulate_bid = actual_valor + acumulate_bid
                
          if(acumulate_bid <= L){
            price_down = price_bid[i]
          }
        }                   
        binance.websockets.trades(['BTCUSDT'], (trades) => {
          var {E:eventTime, s:symbol, p:price, q:quantity} = trades  

          var ideal_price = (Number(price_down) + Number(price_up))/2
          // console.log("Ideal: ", ideal_price.toFixed(8), "SPREAD:", (ideal_price - price).toFixed(8))
          // console.log("Venda: ", price_up)
          // console.log("Preço: ", price)
          // console.log("Compra:", price_down + "\n")

          log_data = {
            "price":        price,
            "ideal_price":  ideal_price,
            "up_price":     price_up,
            "down_price":   price_down
          }
          module.exports.data = log_data
          if((ideal_price - price) > 0){
            up++
          }else if((ideal_price - price) < 0){
            down++
          }
          // console.log("up:   ", up)
          // console.log("down: ", down)
      })
    })
  })
}
catch(e){
    throw e
}
