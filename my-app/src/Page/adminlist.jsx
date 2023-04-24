
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Dropdown, Table, Tag } from 'antd';
import { MoreOutlined } from "@ant-design/icons"
// import axios, { Axios } from 'axios';
import {axiosCMMS as axios} from '../config/axios';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { Avatar_02, Avatar_05, Avatar_11, Avatar_12, Avatar_09, Avatar_10, Avatar_13 } from "../Entryfile/imagepath"
import "../Page/antdstyle.css";
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import $, { data } from "jquery";

import { Button, Col, Modal, Space } from 'antd';
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,

} from 'antd';

const { Option } = Select;

const Adminslist = ({Admin}) => {

  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([])
  const [form] = Form.useForm();
  const [admin_name, setAdmin_name] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [admin_password, setAdmin_password] = useState("");
  const [admin_phone, setAdmin_phone] = useState("");
  const [admin_designation, setAdmin_designation] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [admin_address, setAdmin_address] = useState("");
  const [admin_newphone, setAdmin_newphone] = useState("");
  const [admin_id, setAdmin_id] = useState("");
  const [dataAdmin,setDataAdmin] = useState();
  const [initialValues,setInitialValues] = useState();
  const [newPassword,setNewPassword] = useState();
  

  const hideModal = () => {
    setOpen(false);
  };

  //edit admin
  const onFinish = async(values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/${values.admin_id}`,
      { admin_id: values.admin_id,
        admin_name: values.admin_name,
        admin_email: values.admin_email,
        admin_password: values.admin_password,
        admin_phone: values.admin_phone,
        admin_address: values.admin_address,
        admin_designation: values.admin_designation}) 
      // console.log(data.length)
      alert('success!!')

    } catch (error) {

    }
  };





  // const toggleMobileMenu = () => {
  //   setMenu(!menu)
  // }

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // };
  // const tailFormItemLayout = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     },
  //     sm: {
  //       span: 16,
  //       offset: 8,
  //     },
  //   },
  // };


  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });  

  

  
  //-- get data from DB---
  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
  //     console.log(data);
  //   } catch (error) {

  //   }
  // }

  const deleAdmins = (values) => {
    //console.log(admin_id);
      axios.delete(`/DB/delete/${values.admin_id}`).then((response) => {
        // setAdmin(
        //   Admin.filter((values) => {
        //     return values.admin_id != admin_id;
        //   })
        // )
        console.log(response);
        
        alert('success!!')
      })
  
      
      
  }

  const getAdmins = (values) => {
    
    //console.log(values);
      axios.get(`/DB/getAdmin/${values.admin_id}`).then((response) => {
        //console.log('123',response.data.admin_name);
        console.log(response.data);
        setDataAdmin(response.data);
        const defaultValue = {
          admin_id: response.data.admin_id,
          admin_name: response.data.admin_name,
          admin_email: response.data.admin_email,
          admin_password: response.data.admin_password,
          admin_phone: response.data.admin_phone,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
          admin_address: response.data.admin_address,
          admin_designation: response.data.admin_designation
        }
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);

        
      })
      // showModal()
      setOpen(true);
      console.log(initialValues);
      console.log(dataAdmin);
      
    
  }
  console.log(initialValues);

  const handlepassword = (e) =>{
      
      form.setFieldValue({admin_password:e.target.value})
  }

  

  // const items = [
  //   {
  //     key: '1',
  //     label: (
  //       <a target="_blank" >
  //         Edit
  //       </a>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <a href="\Page\Delete.js" >
          
  //         delete
  //       </a>
  //     ),
  //   },

  // ]

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
        <Option value="87">+87</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

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

  const showModal = () => {
    setOpen(true);
    
  };

  // const items = [
  //   {
  //     label: <a href="\Page\Delete.js">delete</a>,
  //     key: '0',
  //   },
    
  // ];

  

  const columns = [

    {
      title: 'ID',
      dataIndex: 'admin_id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'name',
      dataIndex: 'admin_name',
      sorter: (a, b) => a.admin_name.length - b.admin_name.length,
    },

    {
      title: 'Email',
      dataIndex: 'admin_email',
      sorter: (a, b) => a.admin_email.length - b.admin_email.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'admin_phone',
      sorter: (a, b) => a.admin_phone.length - b.admin_phone.length,
    },

    // {
    //   title: 'Join Date',
    //   dataIndex: 'created_timestamp',
    //   sorter: (a, b) => a.created_timestamp.length - b.created_timestamp.length,
    // },

    {
      title: 'Role',
      dataIndex: 'admin_designation',
      render: (text, record) => <Tag>{text}</Tag>
      //console.log(text)

      // <div className="dropdown">
      // <a href="" className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{text} </a>
      // <div className="dropdown-menu">
      //   <a className="dropdown-item" href="#">Software Engineer</a>
      //   <a className="dropdown-item" href="#">Software Tester</a>
      //   <a className="dropdown-item" href="#">Frontend Developer</a>
      //   <a className="dropdown-item" href="#">UI/UX Developer</a>
      // </div>
      // </div>

    },
    // {
    //   title: 'Action',
    //   render: (text, record) =>
    //     <div >

    //       <Dropdown
    //         menu={{
    //           items,
    //         }}
    //         placement="bottomRight"
    //       >
    //         <Button type='text' ><MoreOutlined /></Button>
    //       </Dropdown>

         
    //     </div>

    // },

    {
      title: 'Action',
      render: (text, record) =>
        <div className="dropdown profile-action">
        

          {/* <Col span={12} style={{ textAlign: 'left' }}>
            <Button  type="primary" htmlType="submit"  >Edit  </Button>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" danger onClick={() => {deleteEmployees()}}>Delete</Button>
          </Col> */}

          <Button type="primary" success onClick={() => getAdmins (text)} 
             data-bs-toggle="modal" data-bs-target="#add_admin"><i className="fa fa-plus" />
            Edit
          </Button>

          <Button type="primary" danger onClick={() => deleAdmins (text)} 
             data-bs-toggle="modal" data-bs-target="#add_admin" ><i className="fa fa-plus" />
            delete
          </Button>

          

          

      
        
          <Modal 
            width={650}
            title="Edit"
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
              <Form.Item
                
                name="admin_name"
                label="Name"
                rules={[{ required: true, message: 'Please input your  Name', whitespace: true }]}
                // onChange={(event) => {
                //   setAdmin_name(event.target.value)
                // }}
              >
                <Input />

              </Form.Item>

              <Form.Item
                name="admin_id"
                label="ID"
                rules={[{ required: true, message: 'Please input your ID!' }]}
                onChange={(event) => {
                  setAdmin_id(event.target.value)
                }}
              >
                <Input disabled/>
              </Form.Item>

              {/* <Form.Item
                      name="Last Name"
                      label="Last Name"

                      rules={[{ required: true, message: 'Please input your Last Name', whitespace: true }]}
                    >
                      <Input />
                    </Form.Item> */}

              {/* <Form.Item
                      name="nickname"
                      label="Nickname"
                      rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                      <Input />
                    </Form.Item> */}

              <Form.Item
                name="admin_designation"
                label="role"
                rules={[{ required: true, message: 'Please select role!' }]}
                onChange={(event) => {
                  setAdmin_designation(event.target.value)
                }}
              >
                <Select placeholder="select your role">
                  <Option value="admin">Admin</Option>
                  <Option value="it support">IT Support</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>


              {/* <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                      <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item> */}

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
                onChange={(event) => {
                  setAdmin_email(event.target.value)
                }}
              >

                <Input />
              </Form.Item>

              <Form.Item
                name="admin_password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
                onChange={(event) => {
                  setAdmin_password(event.target.value)
                }}
              >
                <Input.Password onChange={handlepassword}/>
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value ||  dataAdmin.admin_password=== value || getFieldValue('admin_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      
                      
                    },
                  }),
                ]}

              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="admin_phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                onChange={(event) => {
                  setAdmin_newphone(event.target.value)
                }}
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="admin_address"
                label="Address"
                rules={[{ required: true, message: 'Please input your Address', whitespace: true }]}
                onChange={(event) => {
                  setAdmin_address(event.target.value)
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item  {...tailFormItemLayout}>
                <Row>
                  <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" htmlType="submit" >
                      Save
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

        </div>

    },


  ]

  //console.log(Admin);

  return (

    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>


      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />


      
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table className="table-striped"
              pagination={{
                total: Admin?.length,
                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
              }}
              style={{ overflowX: 'auto' }}
              columns={columns}
              // bordered
              dataSource={Admin}
              rowKey={record => record.id}
            // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>

      

      
             
    </div>

  );
}

export default Adminslist;
