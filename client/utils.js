export function USD(price) {
    const intPrice = price/100
    const decPrice = price/10
    const roundPrice = Math.round(price*100)/100

    let stringPrice = String(roundPrice)

    if ( Math.trunc(price)*100 === roundPrice*100) {
        stringPrice += '.00'
    }
    else if ( Math.trunc(price*10) === roundPrice*10) {
        stringPrice += '0'
    }
    return stringPrice
}
