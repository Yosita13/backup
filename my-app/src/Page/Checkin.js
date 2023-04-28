import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { axiosCMMS as axios } from '../config/axios';
//import  axios from  'axios';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Form, Input, Select, Row, DatePicker, Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";



const { Option } = Select;


const Checkin = () => {


    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openChek, setOpenChek] = useState(false);
    const [openChekOut, setOpenChekOut] = useState(false);
    // const [Admin, setAdmin] = useState([])
    const [Edit, setEdit] = useState([]);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [formCheck] = Form.useForm();
    const [device_id, setDevice_id] = useState("");
    const [owner_note, setOwner_note] = useState("");
    const [employee_id, setEmployee_id] = useState("");
    const [owner, setOwner] = useState("");
    const [id_device, setId_device] = useState("");
    const [owner_Id, setOwner_Id] = useState("");
    const [data, setData] = useState();
    const [dataDevice, setDataDevice] = useState();
    const [initialValues, setInitialValues] = useState();
    const [forComfirmDelete, setForComfirmDelete] = useState();
    const [tbl_own, setTbl_own] = useState();

    const [Device, setDevice] = useState();
    const [text, setText] = useState("");
    const location = useLocation();
    let history = useHistory();
    const id = location.state;

    console.log("ID", location.state);

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const hideModalEdit = () => {
        setOpenEdit(false);
    };

    const showModalCheck = (values) => {

        form.setFieldsValue({ device_id: values })
        setOpenChek(true);
    };

    const hideModalCheck = () => {
        formCheck.resetFields()
        setOpenChek(false);
    };

    const showModalCheckOut = (values) => {

        form.setFieldsValue({ device_id: values })
        setOpenChekOut(true);
    };

    const hideModalCheckOut = () => {
        formCheck.resetFields()
        setOpenChekOut(false);
    };


    useEffect(() => {
        getDevice();
    }, []);

    const getDevice = async () => {
        try {
            const { data } = await axios.get("/DB/tbl_device");
            console.log(data.device_id)
            setDevice(data);

        } catch (error) { }
    };

    useEffect(() => {
        getOwner();
    }, []);

    const getOwner = async () => {
        try {
            const { data } = await axios.get("/DB/get/employee_name");
            // console.log(data.length)
            setOwner(data);
        } catch (error) { }
    };



    const hideModal = () => {
        setOpen(false);
        setOpen2(false);
    };


    //save

    const onFinish = async (values) => {
        formCheck.resetFields()
        setOpenEdit(false);
        console.log(values);
        console.log(form.getFieldValue('device_id'));

        const device_id = form.getFieldValue('device_id');
        form.resetFields();
        console.log("Received values of form: ", values);
        try {
            const { data } = await axios.post(
                `/DB/update/ownner`,
                {
                    device_id: values.device_id,
                    employee_id: values.employee_id,
                    owner_note: values.owner_note,

                }
            );
            hideModalCheck()
            getOwner()
        } catch (error) { }
    };

    const onFinishCheckOut = async (values) => {
        formCheck.resetFields()

        console.log(owner_Id);
        console.log(form.getFieldValue('device_id'));
        const employee_id = null;
        const note = null;

        const device_id = form.getFieldValue('device_id');
        form.resetFields();
        console.log("Received values of form: ", values.owner_id);
        try {
            const { data } = await axios.put(
                `/DB/updateOwner_id`,
                {

                    device_id: owner_Id.device_id,
                    owner_id: owner_Id.owner_id

                }
            );
            hideModalCheckOut()
            getOwner()
        } catch (error) { }
    };



    const toggleMobileMenu = () => {
        setMenu(!menu);
    };



    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };



    const getID = (values) => {
        console.log("value", values);
        setId_device(values.device_id);
        console.log('id', values.device_id);
        formCheck.setFieldsValue({ device_id: values.device_id })
        showModalCheck(values.device_id)

    };


    const getChekOut = async (values) => {
        console.log("value", values);
        setId_device(values.device_id);
        setOwner_Id(values)
        console.log('id', owner_Id);
        form3.setFieldsValue({ device_id: values.device_id, employee_id: values.employee_id })
        showModalCheckOut(values)

    };

   

    const columns = [
        {
            title: "ID",
            dataIndex: "device_id",

            sorter: (a, b) => a.ID.length - b.ID.length,
        },
        {
            title: "name",
            dataIndex: "device_name",
            sorter: (a, b) => a.device_name.length - b.device_name.length,
        },



        {
            title: "Producer",
            dataIndex: "device_producer",
            sorter: (a, b) => a.device_producer.length - b.device_producer.length,
        },



        {
            title: "Status",
            dataIndex: "device_status",
            render: (text, record) => (
                <div>
                    <span
                        className={
                            text === "Sold out"
                                ? "badge bg-inverse-warning"
                                : text === "Not used"
                                    ? "badge bg-inverse-success"
                                    : "badge bg-inverse-blue"
                        }
                    >
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: "Employee",
            dataIndex: "employee_name",
            sorter: (a, b) => a.employee_name.length - b.employee_name.length,
        },
        {
            title: "Note",
            dataIndex: "device_note",
            sorter: (a, b) => a.device_note.length - b.device_note.length,
        },


        {
            title: "Serial",
            dataIndex: "device_serial",
            sorter: (a, b) => a.device_serial.length - b.device_serial.length,
        },
        {
            title: "Model",
            dataIndex: "device_model",
            sorter: (a, b) => a.device_model.length - b.device_model.length,
        },


        {
            title: "Action",
            render: (text, record) => (
                <div className="dropdown profile-action">


                    <Button
                        type="primary"
                        success
                        onClick={() => getID(text)}
                        data-bs-toggle="modal"
                        data-bs-target="#add_device"
                    >
                        <i className="fa fa-plus" />
                        ChekIn
                    </Button>

                </div>
            ),
        },
        {
            title: "Action",
            render: (data, record) => (
                <div className="dropdown profile-action">


                    <Button
                        type="primary"
                        danger
                        onClick={() => getChekOut(data)}
                        data-bs-toggle="modal"
                        data-bs-target="#add_device"
                    >
                        <i className="fa fa-plus" />
                        CheckOut
                    </Button>



                </div>
            ),
        },

    ];


    return (

        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

            <Header onMenuClick={(value) => toggleMobileMenu()} />
            {/* <Navbar/> */}
            <Sidebar />
            <div className="page-wrapper">
                <Helmet>
                    <title>Activity</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">IT Owner</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">IT Owner</li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-2">
                            </div>
                        </div>
                    </div>
                   
                    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                        <Header onMenuClick={(value) => toggleMobileMenu()} />
                        <Sidebar />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <Table
                                        className="table-striped"
                                        pagination={{
                                            total: owner?.length,
                                            showTotal: (total, range) =>
                                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true,
                                            onShowSizeChange: onShowSizeChange,
                                            itemRender: itemRender,
                                        }}
                                        style={{ overflowX: "auto" }}
                                        columns={columns}
                                        // bordered
                                        dataSource={owner}
                                        rowKey={(record) => record.id}
                                    // onChange={console.log("change")}
                                    />
                                </div>
                            </div>
                        </div>



                        {/* //modal Check */}
                        <Modal
                            width={650}
                            title="CheckIn"
                            open={openChek}
                            // onOk={hideModal}
                            footer={null}
                            onCancel={hideModalCheck}
                            okText="submit"
                            cancelText="cancel"
                        >

                            <Form

                                {...formItemLayout}
                                form={formCheck}
                                name="Save"
                                onFinish={onFinish}

                                scrollToFirstError
                            >
                                <Form.Item
                                    name="device_id"
                                    label="device_id"
                                    rules={[{ required: true, message: 'Please input your ID!' }]}

                                >
                                    <Input value={id_device} placeholder="headproject" />
                                </Form.Item>


                                <Form.Item
                                    name="employee_id"
                                    label="EmployeeID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your EmployeeID!",
                                            whitespace: true,
                                        },
                                    ]}
                                    onChange={(event) => {
                                        setEmployee_id(event.target.value);
                                    }}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="owner_note"
                                    label="OwnerNote"

                                    onChange={(event) => {
                                        setOwner_note(event.target.value);
                                    }}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item {...tailFormItemLayout}>
                                    <Row>
                                        <Col span={12} style={{ textAlign: "left" }}>
                                            <Button type="primary" htmlType="submit">
                                                Save
                                            </Button>
                                        </Col>
                                        <Col span={12} style={{ textAlign: "right" }}>
                                            <Button type="primary" danger onClick={hideModalCheck}>
                                                Cancle
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Modal>
                        {/* -------------------------------------------------EDIT QR 26-04 -------------------------------------------------*/}

                        {/* //modal Checkout */}
                        <Modal
                            width={650}
                            title="CheckOut"
                            open={openChekOut}
                            // onOk={hideModal}
                            footer={null}
                            onCancel={hideModalCheckOut}
                            okText="submit"
                            cancelText="cancel"
                        >

                            <Form

                                {...formItemLayout}
                                form={form3}
                                name="Save"
                                onFinish={onFinishCheckOut}

                                scrollToFirstError
                            >
                                <Form.Item
                                    name="device_id"
                                    label="device_id"
                                    rules={[{ required: true, message: 'Please input your ID!' }]}

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Row>
                                        <Col span={12} style={{ textAlign: "left" }}>
                                            <Button type="primary" htmlType="submit">
                                                Save
                                            </Button>
                                        </Col>
                                        <Col span={12} style={{ textAlign: "right" }}>
                                            <Button type="primary" danger onClick={hideModalCheckOut}>
                                                Cancle
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Modal>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkin;