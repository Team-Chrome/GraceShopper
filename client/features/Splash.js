import React,{useEffect,useState,useRef} from 'react';
import {createGuestAccount, authenticate} from '../features/auth/authSlice'
import { useDispatch, useSelector} from 'react-redux';
import { v4 } from 'uuid'
import { useNavigate } from "react-router-dom";

const Splash = (props) => {

  const dispatch = useDispatch()

  const Navigate = useNavigate();
  const [counter,setCounter] = useState(0)

  const messageRef = useRef(
    ["Where's","my","COFFEE!!!","I","NEED", "Coffee!"])

  const changeRoute = (event ) => {
      Navigate("/products")
  };

  useEffect(()=>{
    const id=setInterval(()=>{setCounter(x=>(x+1)%6)},1500)
    return () => {
      clearInterval(id);
    };
  })

  let splashOut = [];
  for (let i = 1; i <= 53; i++) {
    const fileName = i + '.jpg';
    splashOut.push(
      <img
        className="splash-item"
        key={'splash-img-' + i}
        src={'/splashPagePictures/' + fileName}
      ></img>
    );
  }
  return ([
    <div key="annoying" id="annoyingMessage">{messageRef.current[counter]}</div>,
    <div onClick={(evt)=>{changeRoute(evt)}} key="splash" className="flexBox01" id="splash">
      {splashOut}
    </div>
    ]
  );
};

export default Splash;
