import React, {useEffect,useState} from "react"
import { fetchAllProducts } from "./allProductsSlice"
import { useSelector,useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { USD } from "/client/utils"

console.log(USD(82.234234234234))
console.log(USD(82.1))
console.log(USD(82.0))

const AllProducts = props => {

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[])

    const {items} = useSelector(state=>state.allProducts)
    const [jsxOutput,setJsxOutput] = useState([])


    const  changeRoute = (event, item) => {

        console.log('should be changing route to',item)
        Navigate('/products/'+item.id)
        //navigate('/products/'+item.id)   
        //this is equivalent to static <Link and more
        //straightforward programatically, plus it lets us 
        //make a whole div clickable as href
      }

    //adding touchstart listener will cause the hover effect for mobile devices
    //document.addEventListener("touchstart", function() {}, true);
    useEffect(()=>{
        let newJsxOutput=[]
        if (items.length > 0) {
            for (const item of items) {
                newJsxOutput.push(
                    <div key={item.name} className="splash-item"
                        onClick={(event)=>{changeRoute(event,item) } }
                    >
                        <img src={item.imageUrl} alt={item.roaster+','+item.name}></img>
                        <h3 className="outlined">{item.roaster}</h3>
                        <h4 style={{background:'linear-gradient(rgb(150,120,80),rgb(200,200,100)',fontSize:'1.2em',fontWeight:'bold'}}>{item.name}</h4>
                        <p style={{color:"white",background:'linear-gradient(rgb(50,30,10),rgb(200,200,100)'}}>{item.description}</p>
                        <div className="price">${USD(item.price)}</div>
                    </div>
                )
            }
        }
        setJsxOutput(newJsxOutput)
    },[items])

    return ([
        <div id="allProducts" key="allProducts" className="flexBox01">{jsxOutput}</div>
    ])

}


export default AllProducts
