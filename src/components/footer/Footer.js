import React from "react";
import UserSubcribe from "./userSubcribe/UserSubcribe";
import {HiOutlineArrowSmUp} from 'react-icons/hi';
import {FaCanadianMapleLeaf} from 'react-icons/fa';

const Footer = () => {
  return <footer>
    <UserSubcribe />

    <button href="#" className="footer__button"><HiOutlineArrowSmUp className='scroll__to__top'/></button>
    <div className="footer__timestamp">
        <p>Alice {<FaCanadianMapleLeaf className="footer__icon"/>} Vancouver 2022. All rights reserved</p>
    </div>
  </footer>
}

export default Footer;