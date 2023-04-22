
/**
 * Signin Firebase
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14 } from '../Entryfile/imagepath';
import '../Entryfile/imagepath';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import "../Page/index.css"
//import axios from 'axios';
import {axiosCMMS as axios} from '../config/axios';

import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Form, Input, Select, Row, DatePicker, Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import { MoreOutlined, EditOutlined, MailOutlined ,LaptopOutlined,FileWordOutlined,WifiOutlined,UserOutlined} from '@ant-design/icons';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"


const { Option } = Select;
const AdminDashboard = () => {

  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Admin, setAdmin] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [Status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [editStatus, setEditStatus] = useState();
  const [forsendEmail, setForsendEmail] = useState();
  const [activity_email, setActivity_email] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priority, setPriority] = useState();//edit 16/04/2023
  const [responsible, setResponsible] = useState(false)//edit 17/04/2023
  const [options, setOptions] = useState([]);



  const barchartdata = [
    { y: '2006', "Total Income" : 100, 'Total Outcome' : 90 },
    { y: '2007', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2008', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2009', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2010', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2011', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2012', "Total Income" : 100, 'Total Outcome' : 90 }
];
const linechartdata = [
    { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
    { y: '2007', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2008', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2009', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2010', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2011', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });

  //getAdmin 
  useEffect(() => {
    fetch('/DB/tbl_admin')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.log(error));
  }, []);

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //      console.log(data.length)
  //     setAdmin(data)
  //   } catch (error) {

  //   }
  // }
  //console.log(IT.length)

  //-------------------------------------------------------------------------------------------------


  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    getAdmin()
  }, [])

  useEffect(() => {
    form3.setFieldValue({ admin_email: activity_email })
  }, [activity_email])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('/DB/get/get/for/join')

      // console.log('help',data.length)
      setData(data)
    } catch (error) {

    }
  }

  const onReset = () => {
    form.resetFields();
    getAdmin();
  };
  


  //edit 17/04/2023
  const getActivity = (values) => {

    console.log('editstatus', editStatus);
    console.log('editstatus', priority);
    const { data } = axios.get(`/DB/get/status/${editStatus}`).then((response) => {
      const defaultValue = {
        Priority:priority ,
        Status: Status,
        Responsible: responsible,
      }
      console.log('222',defaultValue);
      setInitialValues(defaultValue);
          
    })
    showModal()
    setOpen(true);
  }
   //edit 17/04/2023

   //edit 16/04/2023
   const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/status/${editStatus}`,
        {
          id: values.editStatus,
          status: values.Status,
          priority: values.Priority,
          admin_id: values.Responsible,

        })
      console.log(values.Responsible)
      //alert('success!!')
      window.location.reload();

    } catch (error) {

    }
  };
  //edit 16/04/2023

  //----------------------------------------------------------------------------------------------------------------------


  const getID = (values) => {

    console.log('value', values);
    setEditStatus(values.id)
    setActivity_email(values.employee_email)
    setStatus(values.status)
    setPriority(values.priority)
    setResponsible(values.admin_name)
    console.log('sta', values.status);
    console.log('email', values.employee_email);
    //form.setFieldValue({Satus:values.status })


  }
  console.log('from2', form3.getFieldValue('admin_email'));

  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const hideModal2 = () => {

    setForsendEmail(false);
    form3.resetFields()
    //console.log('111',activity_email)
    form3.setFieldValue({ admin_email: activity_email })
  };

  const handleOk = (values) => {
    console.log('va', values);
    //setIsModalOpen(false);
    hideModal2()

    const { data } = axios.post('/DB/sendEmail', {
      status: Status,
      employee_email: values
    })
    console.log(data);
    //form3.resetFields()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleButtonClick = (e) => {

    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {

    console.log('click', e);
  };

  const items = [
    {
      label: <a onClick={getActivity}>edit</a>,
      key: '0',
      icon: <EditOutlined />,


    },
    {
      label: <a onClick={() => setForsendEmail(true)}>send email</a>,
      key: '1',
      icon: <MailOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModalForEmail = () => {
    setForsendEmail(true);
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

  const columns = [

    {
      title: 'ID',
      dataIndex: 'id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'User',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },
    {
      title: 'Email',
      dataIndex: 'employee_email',
      sorter: (a, b) => a.employee_email.length - b.employee_email.length,
    },
    {
      title: 'Device_id',
      dataIndex: 'device_id',
      sorter: (a, b) => a.device_id.length - b.device_id.length,
    },

    {
      title: 'Device_serial',
      dataIndex: 'device_serial',
      sorter: (a, b) => a.device_serial.length - b.device_serial.length,
    },

    {
      title: 'Model',
      dataIndex: 'device_model',
      sorter: (a, b) => a.device_model.length - b.device_model.length,
    },

    {
      title: 'Note',
      dataIndex: 'case_detail',
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
    },
    //edit 16/04/2023
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (text, record) =>
        <div>
          <span className={text === "Hight" ? "badge bg-inverse-danger" : "badge bg-inverse-warning"}>{text}</span>
        </div>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) =>
        <div>
          <span className={
            text === "In progress" ? "badge bg-inverse-warning" :
              text === "Complete" ? "badge bg-inverse-success" :
                "badge bg-inverse-blue"
          }>{text}</span>
        </div>

    },
    //edit 16/04/2023
    {
      title: 'Responsible',
      dataIndex: 'admin_name',
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
    },



    {
      title: 'Action',
      render: (value) => (
        <>
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            trigger={['click']}>
            <Button type='text' onClick={() => getID(value)}><MoreOutlined /></Button>
          </Dropdown>
        </>
      )
    },
  ]


  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard </title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Admin!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><LaptopOutlined /></span>
                  <div className="dash-widget-info">
                    <h3>{Admin.length}</h3>
                    <span>IT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><FileWordOutlined /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    {/* <h3>{License.length}</h3> */}
                    <span>License</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><WifiOutlined /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>Network</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><UserOutlined /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>User</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Activity</h3>
                      <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table className="table-striped"
                        // pagination={{
                        //   total: data?.length,
                        //   showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        //   showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        // }}
                        style={{ overflowX: 'auto' }}
                        columns={columns}

                        dataSource={data}
                        rowKey={record => record.id}

                      />
                    </div>
                  </div>
                  
                </div>
                
                                           
                    </div>
                    <div className="card-footer">
                  <Link to="/Page/activity">View all Activity</Link>
                </div>
                  </div>
                </div>

                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Asset Categories</h3>
                      <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table className="table-striped"
                        // pagination={{
                        //   total: data?.length,
                        //   showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        //   showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        // }}
                        style={{ overflowX: 'auto' }}
                        columns={columns}

                        dataSource={data}
                        rowKey={record => record.id}

                      />
                    </div>
                  </div>
                  
                </div>
                      {/* <div id="line-charts" /> */}
                    </div>
                    <div className="card-footer">
                  <Link to="/Page/activity">View all Categories</Link>
                </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>

          
                
              
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <div className="modal custom-modal fade" id="delete_approve" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-body">


                            <Modal
            width={650}
            title="Update"
            open={open}
            // onOk={hideModal}
            footer={null}
            onCancel={hideModal}
            okText="submit"
            cancelText="cancle"
          >
            {initialValues&&
            <Form
            initialValues={initialValues }
              {...formItemLayout}
              form={form}
              name="save"
              onFinish={onFinish}
             
              scrollToFirstError
            >
              {/* //edit 16/4/2023 */}
              <Form.Item
                name="Priority"
                label="Priority"
                rules={[{ required: true, message: 'Please select priority!' }]}
                onChange={(event) => {
                  setPriority(event.target.value)
                }}
              >
                <Select placeholder="select select priority">
                  <Option value="Hight">Hight</Option>
                  <Option value="Normal">Normal</Option>
                </Select>
              </Form.Item>
              {/* //edit 16/4/2023 */}

              {/* //edit 16/4/2023 */}
              <Form.Item
                name="Status"
                label="Status"
                rules={[{ required: true, message: 'Please select status!' }]}
                onChange={(event) => {
                  setStatus(event.target.value)
                }}
              >
                <Select placeholder="select status device">
                  <Option value="In progress">In progress</Option>
                  <Option value="Success">Success</Option>
                  <Option value="Complete">Complete</Option>
                </Select>
              </Form.Item>
              {/* //edit 16/4/2023 */}

              <Form.Item
                name="Responsible"
                label="Responsible"
                rules={[{ required: true, message: 'Please select Responsible!' }]}
                onChange={(event) => {
                  setStatus(event.target.value)
                }}
              >
                <Select placeholder="Please select Responsible">
                  {options.map(options => (<option key={options.admin_id} value={options.admin_id}>{options.admin_name}</option>))}
                </Select>
              </Form.Item>

              <Form.Item  {...tailFormItemLayout}>
                <Row>
                  <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" htmlType="submit">
                      save
                    </Button></Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary" danger onClick={hideModal}>
                      Cancle
                    </Button>
                  </Col>
                </Row>

              </Form.Item>
            </Form>}
          </Modal>

          {/* model2 */}

          <div className="modal custom-modal fade" id="delete_approve" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">


                  <Modal

                    open={forsendEmail}
                    // onOk={hideModal}
                    footer={null}
                    //onOk={handleOk}
                    onCancel={hideModal2}
                    okText="submit"
                    cancelText="cancle"
                  >

                    <div className="form-header">
                      <h3>Send Email</h3>
                      <p>Are you sure want to send this email?</p>


                      <Form
                        initialValues={{ admin_email: activity_email }}
                        {...formItemLayout}
                        form={form3}
                        name="save"
                        onFinish={handleOk}


                        scrollToFirstError
                      >
                        <Form.Item
                          name="admin_email"
                          label="E-mail"
                          rules={[
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ]}

                        >

                          <Input />
                        </Form.Item>
                        {/* <Row>
                    <Col span={6} offset={1}>
                        <div className="text-left mt-2">
                            <Button
                                ghost
                                type="primary"
                                className="mr-2"
                                onClick={hideModal2}

                                htmlType="submit"
                                // disabled={disableForm || loadingButton}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Col>
                    <Col span={12} offset={4}>
                        <div className="text-right mt-2">
                            <Button 
                                type="primary"
                                htmlType="submit"
                                // disabled={disableForm || loadingButton}
                            >
                                APPLY
                            </Button>
                        </div>
                    </Col>

                </Row> */}


                      </Form>


                    </div>


                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a className="btn btn-primary continue-btn" onClick={() => handleOk(form3.getFieldValue('admin_email'))}>Confirm</a>
                          {/* <a  type = 'submit' className="btn btn-primary continue-btn"  >Confirm</a> */}
                        </div>
                        <div className="col-6">
                          <a data-bs-dismiss="modal" className="btn btn-primary cancel-btn" onClick={hideModal2} >Cancel</a>
                        </div>
                      </div>
                    </div>

                  </Modal>

                </div>
              </div>
            </div>
          </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </table>
                  </div>
                </div>
               
                
              </div>
            </div>
          </div>
    


  );
}

export default withRouter(AdminDashboard);


