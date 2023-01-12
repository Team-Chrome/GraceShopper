import React,{useEffect,useState,useRef} from 'react';
import {createGuestAccount, authenticate} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid'

const Splash = (props) => {

  const dispatch = useDispatch()
  useEffect(()=>{
    console.log('testing guest account creation')
    //dispatch(createGuestAccount())

    const guestUser = v4() + "@guest.com"
    const method = 'signup'

    dispatch(authenticate({email:guestUser,password:'junk',method}))

  },[])

  const [counter,setCounter] = useState(0)

  const messageRef = useRef(
    ["Where's","my","COFFEE!!!","I","NEED", "Coffee!"])

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
    <div id="annoyingMessage">{messageRef.current[counter]}</div>,
    <div key="splash" className="flexBox01" id="splash">
      {splashOut}
    </div>
    ]
  );
};

export default Splash;
