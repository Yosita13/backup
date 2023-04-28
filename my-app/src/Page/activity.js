import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
 import {axiosCMMS as axios} from '../config/axios';
//import  axios from  'axios';
import { MoreOutlined, EditOutlined, MailOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Form, Input, Select, Row, DatePicker, Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { useLocation } from 'react-router-dom';


const { Option } = Select;


const Activity = () => {


  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [Admin, setAdmin] = useState([]);
  const [activity, setActivity] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [Status, setStatus] = useState(false);
  const [priority, setPriority] = useState();//edit 16/04/2023
  const [responsible, setResponsible] = useState(false)//edit 17/04/2023
  const [data, setData] = useState([]);
  const [editStatus, setEditStatus] = useState();
  const [forsendEmail, setForsendEmail] = useState();
  const [activity_email, setActivity_email] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const location = useLocation();


  //console.log('data is ', data)

  //getAdmin 
  // useEffect(() => {
  //   fetch('/DB/tbl_admin')
  //     .then(response => response.json())
  //     .then(data => setOptions(data))
  //     .catch(error => console.log(error));
  // }, []);
  

  useEffect(() => {
    getforjoin()
    getAdmin()
  }, [])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('/DB/tbl_admin')

      //console.log('help',data.admin_name)
      setOptions(data)
    } catch (error) {

    }
  }
  console.log('option',options);

  useEffect(() => {
    form3.setFieldValue({ admin_email: activity_email })
  }, [activity_email])

  const getforjoin = async () => {
    try {
      const { data } = await axios.get('/DB/get/get/for/join')

      //console.log('help',data.admin_name)
      setData(data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getActivity2()
  }, [])

  const getActivity2 = async () => {
    try {
      const { data } = await axios.get('/DB/get/get/for/join')

      //console.log('help',data.admin_name)
      setActivity(data)
    } catch (error) {

    }
  }
  const onReset2 = () => {
    form2.resetFields();
    getActivity2();

  };

  const onReset = () => {
    form.resetFields();
    getforjoin();
  };

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
      getActivity2()

    } catch (error) {

    }
  };
  //edit 16/04/2023

  //edit 17/04/2023
  const onFinish2 = (value) => {

    console.log('fillter', value);
    console.log('activity', activity);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)

    if (value.name === undefined) {
      const act = activity.filter((act) => act.id === Number(value.id))
      setActivity(act)
      console.log('emp.activityid', value.id);
      console.log('name_undefine', act);
      console.log('แต๋มสวย')
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const act = activity.filter((act) => act.employee_name && act.employee_name.split(" ")[0] === value.name)
      setActivity(act)
      console.log('id undefind', act);
      console.log('แต๋มขี้เหล่')

    } else if (value.name !== undefined && value.id !== undefined) {
      const act1 = activity.filter((act1) => (act1.id === Number(value.id)) && act1.employee_name.split(" ")[0] === value.name)
      setActivity(act1)
      console.log('1', act1)
    }

  }
  //edit 17/04/2023




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
  //console.log('from2', form3.getFieldValue('admin_email'));

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



  const toggleMobileMenu = () => {
    setMenu(!menu)
  }



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
                <h3 className="page-title">Activity</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Activity</li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-2">
              </div>
            </div>
          </div>

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




          <Form

            form={form2}
            name="control-hooks"
            onFinish={onFinish2}

          >
            <div className="row filter-row">
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="id"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <input className="form-control floating" placeholder="Activity ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Name" />
                </Form.Item>
              </Form.Item>
            </div>

            <Form.Item >

              <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
                <Button type="primary" htmlType="submit" className="btn btn-success btn-block w-20">
                  Search
                </Button>
                <Button htmlType="button" className="btn btn-danger btn-block w-20 " style={{ marginLeft: '5px' }} onClick={onReset2}>
                  Reset
                </Button>

                <div></div>
              </div>

            </Form.Item>

          </Form>


        </div>

        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>


          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table className="table-striped"
                  pagination={{
                    total: activity?.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: 'auto' }}
                  columns={columns}

                  dataSource={activity}
                  rowKey={record => record.id}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;