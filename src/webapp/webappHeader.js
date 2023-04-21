/**
 * App Header
 */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import '../Sidebar/navbar.css'
import CmmsOnline from '../webapp/imgWebapp/CmmsOnline.png'



const webappHeader = (props) => {

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }
  const onMenuClik = () => {
    props.onMenuClick()
  }

  //let pathname = location.pathname

  return (
    <div className="header-webapp" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/webapp/QR" className="logo">
          <img src={CmmsOnline} width={200} height={60} alt="" />
        </Link>
      </div>


      {/* /Logo */}

      <a id="toggle_btn" href="#" onClick={handlesidebar}>
        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      {/* <div className="page-title-box">
        <h3>CMMS-Onlineasset</h3>
      </div> */}
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#" onClick={() => onMenuClik()}></a>
      {/* Header Menu */}
      <ul className="nav user-menu">
      </ul>
    </div>
  );
}


export default withRouter(webappHeader);