import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import WebappHeader from './webappHeader';

const Userhome = () => {


    const [open, setOpen] = useState(false);
    const location = useLocation()

    console.log(location.state);

    const showModal = () => {
        setOpen(true);
    };

    return (

        <div >
            <WebappHeader />
            <div className="account-content">
                <div className="container">
                    {/* Page Content */}
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <Helmet>
                                    <title>UserHome</title>
                                    {/* <meta name="description" content="Login page" /> */}
                                </Helmet>
                                {/* Page Content */}
                                <div className="page-wrapper-webapp">
                                    <div className="content container-fluid">
                                        <div className="form-header">

                                            <Link to={{
                                                pathname: "/webapp/uploadImage",
                                                state: location.state
                                            }}>
                                                <Button type="primary" onClick={showModal} shape='square'
                                                    className="btn-green01-webapp" ><i className="fa fa-plus" />
                                                    แจ้งซ่อม</Button></Link><br></br><br></br>

                                            <Link to={{
                                                pathname: "/webapp/DataDevice",
                                                state: location.state
                                            }}>
                                                <Button type="primary" onClick={showModal} shape='square'
                                                    className="btn-green02-webapp" ><i className="fa fa-plus" />
                                                    ตรวจสอบข้อมูลอุปกรณ์
                                                </Button></Link><br></br><br></br>


                                            <Link to={{
                                                pathname: "/webapp/status",
                                                state: location.state
                                            }}>
                                                <Button type="primary" onClick={showModal} shape='square'
                                                    className="btn-green03-webapp"><i className="fa fa-plus" />
                                                    ตรวจสอบสถานะการซ่อม
                                                </Button></Link><br></br><br></br>


                                            <Link to="/webapp/QR">
                                                <Button type="primary" onClick={showModal} shape='square'
                                                    className="btn-green04-webapp" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                                                    หน้าหลัก</Button></Link>



                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userhome;
