import React,{useEffect,useState,useRef} from 'react';

const Splash = (props) => {

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
