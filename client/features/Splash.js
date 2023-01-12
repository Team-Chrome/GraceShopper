import React from 'react';

const Splash = (props) => {
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
  return (
    <div key="splash" className="flexBox01" id="splash">
      {splashOut}
    </div>
  );
};

export default Splash;
