import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import { Button, Form } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { Helmet } from "react-helmet";
import WebappHeader from './webappHeader';



function DataDevice() {

    let history = useHistory()

    const [detail, setDetail] = useState("");
    const { Meta } = Card;

    const location = useLocation()

    console.log('55555', location.state);

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/DB/getDataDevice/${location.state}`)
            // console.log(data.length)
            setDetail(data)
        } catch (error) {

        }
    }
    //console.log(detail)



    return (
        <>

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

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <h4 className="page-title">ข้อมูลอุปกรณ์</h4><br></br>
                                                    
                                                        <div className="card">
                                                            <div className="card-body">
                                                        <div className="dash-widget-info">
                                                            <h5>ID  :{detail.device_id}</h5>
                                                            <h5>Name : {detail.device_name}</h5>
                                                            <h5>Status : {detail.device_status}</h5>
                                                            <h5>Type : {detail.device_model}</h5>
                                                            <h5>serial : {detail.device_serial}</h5>
                                                            <h5>CPU : {detail.device_warranty}</h5>
                                                            <h5>ram : {detail.device_producer}</h5>
                                                            <h5>HD : {detail.device_asset_tag}</h5>
                                                            {/* <h5>License : {detail[0]?.license}</h5> */}
                                                            {/* <h3>{License.length}</h3> */}
                                                            {/* <span>License</span> */}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content Starts */}

                                                <Form.Item >

                                                    <Link to={{
                                                        pathname: "/webapp/userhome",
                                                        state: location.state
                                                    }}>
                                                        <Button type="primary" className="btn-greensushi" htmlType="submit">กลับ</Button></Link>
                                                </Form.Item>


                                                {/* Account Logo */}
                                                <img src={LogoOnlineAssest} />
                                                {/* /Account Logo */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>



        </>
    )
}

export default DataDevice


