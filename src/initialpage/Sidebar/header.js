/**
 * App Header
 */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Sidebar/navbar.css'


 import LogoOnlineAssest from '../Sidebar/img/LogoOnlineAssest.png';
// import user from '../Sidebar/img/user.jpg';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import { Avatar, Badge } from 'antd';
import bell from "../Sidebar/img/bell.svg";
import bars from '../Sidebar/img/bars.svg';



const Header = (props) => {

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }
  const onMenuClik = () => {
    props.onMenuClick()
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

  const text = 'Are you sure to delete this task?';
  const description = 'Delete the task';
  const confirm = () => {
    
    message.info('Clicked on Yes.');
    <Link to= "/Page/activity"></Link>

  };
  const cancel = () => {
    message.info('Clicked on no.');
  };


  



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

{/* 
        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="nav-item dropdown has-arrow main-drop">

            <Popconfirm
              title="Activity"
              description="You have new Activity is not update status"
              onConfirm={confirm}
              onCancel={cancel}
              okText="update"
              cancelText="decline" 
            >
              <Button type="link">
                {/* <Badge count={3} size="small"> */}
                {/* <Badge dot>
                  <Avatar shape="circle" size="medium" icon={<BellOutlined />} />

                </Badge></Button>
            </Popconfirm> */}
          {/* </a>

        </li>  */}

{/* navbar */}
      {/* <div className="navbar">
      <div className="icons">
        <div className="icon">
          <img src={bell} className="iconImg" alt="" />
            <div className="counter">2</div>
        </div>
        </div>
    </div> */}
{/* navbar */}


        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="nav-item dropdown has-arrow main-drop">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <span className="user-img me-1"><img src={''} alt="" />
                  <span /></span>
                <span>
                  Click me
                  <DownOutlined />
                </span>
              </a>
            </Dropdown>
          </a>

        </li>



      </ul>
      {/* /Header Menu */}








    </div>


  );
}


export default withRouter(Header);