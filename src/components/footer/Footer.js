import React from "react";
import './footer.css';
import UserSubcribe from "./userSubcribe/UserSubcribe";
import {HiOutlineArrowSmUp} from 'react-icons/hi';
import {FaCanadianMapleLeaf} from 'react-icons/fa';

class Footer extends React.Component {
    render(){
        return <footer>
            <UserSubcribe />
            
            <a href="#"><HiOutlineArrowSmUp className='scroll__to__top'/></a>

            <div className="footer__timestamp">
                <p>Alice {<FaCanadianMapleLeaf className="footer__icon"/>} Vancouver 2022. All rights reserved</p>
            </div>
        </footer>
    }
}

export default Footer;