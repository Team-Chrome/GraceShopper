import  store  from "/client/app/store"
import  React, {useState, useEffect} from "react"

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


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
