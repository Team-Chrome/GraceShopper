import  store  from "/client/app/store"

//common function to add to redux slices to add
//another header to axios calls so axios api calls
//can be differentiated from typing a  /api url
//in the browser
export function apiHeader() {
  const {auth} = store.getState()
  const config = {
    headers: {
      "userid": auth.me.id ?? "-1"
    }
  }
  return config
}

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
