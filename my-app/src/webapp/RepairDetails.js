
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { axiosCMMS as axios } from '../config/axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import WebappHeader from './webappHeader';
import { Helmet } from "react-helmet";



function RepairDetails() {

    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [case_detail, setCase_detail] = useState("");
    const [detail, setDetail] = useState("");
    const [pic, setPic] = useState();
    const [dataImg, setDataImg] = useState();
    const [initialValues, setInitialValues] = useState();
    const [save, setSave] = useState(false);
    const [id, setID] = ('')
    const [data, setData] = useState();
    const { Meta } = Card;
    const [employee_name, setEmployee_name] = useState("");

    const location = useLocation()

    console.log('location', location.state);
    console.log('Devicr_id', location.id);





    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const sendNoti = async (values) => {
        console.log('device', location.id);
        try {
            const { data } = await axios.post(`/DB/sendNoti`)
        } catch (error) {

        }


        //console.log('222',defaultValue);

    }




    const onFinish = async (values) => {
        setOpen(false);
        console.log('Received values of form: ', values);
        console.log('id front', location.state);
        console.log('employee', employee_name);
        try {
            console.log('Received values of form: ', values);
            const { data } = await axios.put(`/DB/put/repair/${location.state}}`, {
                case_detail: values.case_detail,
                id: location.state,
                device_id: location.id,
                employee_name: employee_name
            })
            history.push({ pathname: '/webapp/sendRepairFinish' })
            //sendNoti();
        } catch (e) {

        }
    };

    useEffect(() => {
        getDataImage()
    }, [])

    const getDataImage = async (values) => {

        try {
            const { data } = await axios.get(`/DB/gat/tbl_tastimg/${location.state}`)
            console.log('123', data);
            setID(data)
        } catch (error) {

        }


        //console.log('222',defaultValue);

    }

    //   const handleNotification = () => {
    //     setSave(true);
    //     socket.emit("sendNotification", {
    //       senderName: user,
    //       receiverName: post.username,

    //     });
    //   };




    useEffect(() => {
        getImage()
    }, [])

    const getImage = async () => {
        try {
            const { data } = await axios.get(`/DB/getImage/${location.state}`)
            console.log('data', data)
            setPic(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getJoin()
    }, [])

    const getJoin = async () => {
        try {
            const { data } = await axios.get(`/DB/get/get/for/join1/${location.state}`, {

            })

            console.log('JOin', data)
            setEmployee_name(data.employee_name)
        } catch (error) {

        }
    }



    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */



    const hideModal = () => {
        setOpen(false);
    };




    return (
        <>
            <div className="container mr-60">
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


                                                <br></br>

                                                <h3 className="page-title">รายละเอียดการแจ้งซ่อม</h3>




                                                {/* Content Starts */}
                                                <Card>
                                                    {pic && <img alt="" src={pic.image} />}




                                                    <Form
                                                        {...layout}
                                                        name="nest-messages"
                                                        onFinish={onFinish}

                                                        validateMessages={validateMessages}
                                                    >
                                                        <Form.Item name={['case_detail']} label="รายละเอียดการแจ้งซ่อม"
                                                            onChange={(event) => {
                                                                setCase_detail(event.target.value)
                                                            }}
                                                        >
                                                            <Input.TextArea />
                                                        </Form.Item>

                                                        {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                                                    <Button className="btn btn-primary" type="primary" htmlType="submit">
                                                                        Submit
                                                                    </Button>
                                                                </Form.Item>
                                                                */}

                                                        <Form.Item >
                                                            <Link to="/webapp/QR">
                                                                <Button type="primary" className='btn-gray-1000' onClick={hideModal}>Cancle</Button>
                                                            </Link>
                                                            <Button type="primary" className="btn-greensushi" htmlType="submit" >Save</Button>
                                                        </Form.Item>
                                                    </Form>
                                                </Card>

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
        </>
    )
}

export default RepairDetails


