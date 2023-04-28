/**
 * App Header
 */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Sidebar/navbar.css'


 import LogoOnlineAssest from '../Sidebar/img/LogoOnlineAssest.png';
// import user from '../Sidebar/img/user.jpg';
import { DownOutlined, BellOutlined ,LogoutOutlined} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import { Avatar, Badge } from 'antd';
import bell from "../Sidebar/img/bell.svg";
import bars from '../Sidebar/img/bars.svg';
import {useLocation, useHistory } from 'react-router-dom';
import LogOut from "../Sidebar/img/LogOut.svg";





const Header = (props) => {
  let history = useHistory()
  const name = localStorage.getItem('name');

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }
  const onMenuClik = () => {
    props.onMenuClick()
  }

  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }

  const items = [
    {
      label: <a href="/app/profile/employee-profile">My Profile</a>,
      key: '0',
    },
    {
      label: <a href="/settings/companysetting">Settings</a>,
      key: '1',
    },
    {
      label: <a href="/login">Logout</a>,
      key: '2',
    },
  ];

  
  



  //let pathname = location.pathname

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={LogoOnlineAssest} width={100} height={50} alt="" />
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
      <div className="page-title-box">
        <h3>CMMS-Onlineasset</h3>
      </div>
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#" onClick={() => onMenuClik()}><img src = {bars} /></a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" > </a>
         
          <Button type="link" className = "text-success"onClick={logout}> <text>{name}</text> 
              <Avatar shape="circle" size="medium"  > <img src={LogOut } /> </Avatar>
          </Button>
        </li>
      </ul>
      {/* /Header Menu */}
     





    </div>


  );
}


export default withRouter(Header);