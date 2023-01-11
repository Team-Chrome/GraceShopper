import React, {useEffect,useState} from "react"
import { fetchAllProducts } from "./allProductsSlice"
import { useSelector,useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

const AllProducts = props => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[])

    const {items} = useSelector(state=>state.allProducts)
    const [jsxOutput,setJsxOutput] = useState([])


    const  changeRoute = (event, item) => {

        console.log('should be changing route to',item)
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
                        <img src={item.imageUrl}></img>
                        <h3 style={{backgroundColor:'rgb(150,120,80)',fontSize:'1.2em',fontWeight:'bold'}}>{item.name}</h3>
                        <p style={{color:"white",backgroundColor:'rgb(50,30,10)'}}>{item.description}</p>
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
