import React from "react";

const Header = () => {
  return <div className="header">
    <h1><span className='headerFirstLetter'>A</span>stronomy <br></br>
    <span className='headerFirstLetter'>P</span>icture       <br></br>
    <span className='headerFirstLetter'>O</span>f the        <br></br>
    <span className='headerFirstLetter'>D</span>ay</h1>
    <a href="#forms" className='scroll__down'>Scroll Down</a>
  </div>;
}

export default Header;