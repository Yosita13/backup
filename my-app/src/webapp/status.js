import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import {axiosCMMS as axios} from '../config/axios'
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png'
import { Button, Form } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Card,Col,Modal } from 'antd';
import { Helmet } from "react-helmet";
import WebappHeader from './webappHeader';
import Repair1 from './imgWebapp/repair1.svg'


function Status() {

    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [case_detail, setCase_detail] = useState("");
    const [detail, setDetail] = useState([]);
    const [id_device,setId_device] = useState("");
    const { Meta } = Card;
    const [forComfirmSatus,setForComfirmSatus] = useState();
    const [form] = Form.useForm();


    const location = useLocation()

    console.log('666', location.state);

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        try {
            
          
          const {data} = await axios.get(`/DB/get/status/device/${location.state}`)
          
            console.log('data', data);
            // console.log(data.length)
            setDetail(data)
            setId_device(data.id)
            console.log('dataId', data.id);
        } catch (error) {

        }
    }
    console.log(detail)

    //edit 17/04/2023
  const onFinish = async (values) => {
    setOpen(false);
    //form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/statusComplete/${id_device}`,
        {
          id:values.id_device,
        
        })
       //console.log(values.Responsible)
      //alert('success!!')
      getStatus()
    } catch (error) {

    }
  };

  const getStatusForConfrim = async () => {
    try {
        const { data } = await axios.get(`/DB/get/status/device/${location.state}`)
        console.log('data', data);
        // console.log(data.length)
        setDetail(data)
        setId_device(data.id)
        console.log('dataId', data.id);
        setForComfirmSatus(true);
    } catch (error) {

    }
}
console.log(detail)

  
  //edit 17/04/2023

  const hideModal2 = () => {
    setForComfirmSatus(false);
  };

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
                                    
                                    {/* //edit 17/04/2023 */}
                                    <div className="page-wrapper-webapp">
                                        <div className="content container-fluid">
                                            <div className="form-header">

                                            {detail.case_detail && detail.status ? (
                                                <>
                                                <h3 >รายละเอียดการซ่อม</h3>


                                                <div className="card">
                                                            <div className="card-body">
                                                        <div className="dash-widget-info">
                                                            <h5>{detail.case_detail}</h5>
                                                            {/* <h5>{detail[0]?.case_detail}</h5> */}
                                                            {/* <h3>{License.length}</h3> */}
                                                            {/* <span>License</span> */}
                                                        </div>
                                                    </div>
                                                </div>



                                                <h3 >สถานะการซ่อม</h3>
                                                {/* <h3 className="page-title">สถานะการซ่อม</h3> */}


                                                <div className="card ">
                                                    <div className="card-body">
                                                        <div className="dash-widget-info">
                                                            <h5>{detail.status}</h5>
                                                            {/* <h3>{License.length}</h3> */}
                                                            {/* <span>License</span> */}

                                                            <Col>
                                                                <Button type="primary" htmlType="submit" className="btn-gray-1000" onClick={getStatusForConfrim}>ยืนยันการรับเครื่อง </Button>
                                                            </Col>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                                ): (
                                                    <>
                                                    <div className="card">
                                                            <div className="card-body">
                                                           
                                                                <img src={Repair1} style={{width:280}}/><br></br><br></br>
                                                                    <p>ไม่มีการแจ้งซ่อม</p>
                                                                    
                                                                    {/* <span>ส่งเรื่องแจ้งซ่อมสำเร็จ</span> */}
                                                                </div>
                                                            </div>
                                                        
                                                        
                                                    
                                                    </>
                                                    
                                                  )}
                                                
                                                {/* {detail.case_detail && detail.status && (
                                                    
                                                    <div className="card ">
                                                        <div className="card-body">
                                                            <div className="dash-widget-info">
                                                            
                                                                <h5>{detail.case_detail}</h5>
                                                             
                                                                <h5>{detail.status}</h5>
                                                                <Col>
                                                                    <Button type="primary" htmlType="submit" onClick={onFinish}>ยืนยันการรับเครื่อง</Button>
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
 */}

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

            {/* model confrim */}

      <div className="modal custom-modal fade" id="delete_approve" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <Modal
                width={650}
                title="ยืนยันการรับเครื่อง"
                open={forComfirmSatus}
                //onOk={hideModal}
                footer={null}
                onCancel={hideModal2}
                okText="submit"
                cancelText="cancle"
              >

                <Form

                  
                  form={form}
                  //name="Delete"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <Form.Item>
                    {/* Delete Leave Modal */}
                    <div className="form-header">
                      <h3>ยืนยันการรับเครื่อง</h3>
                      <p>คุณได้รับอุปกรณ์คืนแล้ว?</p>
                    </div>

                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a className="btn btn-primary-green continue-green-btn" onClick={onFinish}>ยืนยัน</a>
                        </div>
                        <div className="col-6">
                          <a data-bs-dismiss="modal" className="btn btn-primary-green cancel-green-btn" onClick={hideModal2}>ยกเลิก</a>
                        </div>
                      </div>
                    </div>
                    {/* /Delete Leave Modal */}

                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>


        </>
    )
}

export default Status


