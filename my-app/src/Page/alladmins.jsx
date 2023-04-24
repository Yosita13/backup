import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import axios from 'axios';
import {axiosCMMS as axios} from '../config/axios';
import $, { event } from "jquery";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../Entryfile/imagepath"
// import Addadmin from "../_components/modelbox/Addadmin"
// import Editadmin from "../_components/modelbox/Editadmin"
import { DownOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Dropdown,Button, Col, Modal, Space } from 'antd';
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,

} from 'antd';
import Adminslist from '../Page/adminlist';

const { Option } = Select;

const AllAdmins = () => {

  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false);
  const [Admin, setAdmin] = useState()
  const [admin_name, setAdmin_name] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [admin_password, setAdmin_password] = useState("");
  const [admin_phone, setAdmin_phone] = useState("");
  const [admin_designation, setAdmin_designation] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [admin_address, setAdmin_address] = useState("");
  const [admin_id, setAdmin_id] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [SearchAdmin,setSearchAdmin] = useState();


  const onFinish =async  (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      console.log('Received values of form: ', values);
      const {data} = await axios.post('http://localhost:5000/DB/tbl_admin',{
        admin_id:values.ID,
        admin_name : values.Name,
        admin_email : values.email,
        admin_password : values.password,
        admin_phone : values.phone,
        admin_address : values.Address,
        admin_designation : values.role
      })
      console.log(data);

      alert('success!!')

    }catch(e){

    }
  };

  


  useEffect(() => {
    getAdmin()
  }, [])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/DB/tbl_admin')
      // console.log(data.length)
      setAdmin(data)
    } catch (error) {

    }
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



  // const addAdmin = () => {
  //   axios.post('http://localhost:5000/DB/tbl_admin', {
  //     admin_name: admin_name,
  //     admin_designation: admin_designation,
  //     admin_email: admin_email,
  //     admin_password: admin_password,
  //     // confirmpassword: confirmpassword,
  //     admin_phone: admin_phone,
  //     created_timestamp : created_timestamp ,
  //     updated_timestamp : updated_timestamp ,
  //     admin_address: admin_address,
  //     admin_id: admin_id
  //   }).then(() => {
  //     setAdmin([
  //       {
  //         admin_name: admin_name,
  //         admin_designation: admin_designation,
  //         admin_email: admin_email,
  //         admin_password: admin_password,
  //         //confirmpassword: confirmpassword,
  //         admin_phone: admin_phone,
  //         created_timestamp : created_timestamp ,
  //         updated_timestamp : updated_timestamp ,
  //         admin_address: admin_address,
  //         admin_id: admin_id
  //       }
  //     ])
  //   })
  // }


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
        <Option value="87">+87</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
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



  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });  
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onFinish2 = (value) => {
    console.log(value);

    if (value.name === undefined) {
      console.log('Test')
      const adm = Admin.filter((adm) => adm.admin_id === value.id)
      setAdmin(adm)
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const adm = Admin.filter((adm) => adm.admin_name.split(" ")[0] === value.name)
      setAdmin(adm)
      console.log(adm);
      console.log('Test01')

    }else if(value.name !== undefined && value.id !== undefined){
      const adm1 = Admin.filter((adm1) => (adm1.admin_id === value.id) && adm1.admin_name.split(" ")[0] === value.name)
      // const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setAdmin(adm1)
      console.log('1',adm1)
      // console.log('2',emp2);
    // if(Admin.filter((Admin) => Admin.admin_id !== value.id) ||  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] !== value.name)){
    //   setAdmin([])
    // }
    // else if(Admin.filter((Admin) => Admin.admin_id === value.id) &&  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] === value.name)){
    //   setAdmin(emp1)
    // }

    }

  }
  const onReset = () => {
    form.resetFields();
    getAdmin();
  };


  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Admin</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Admin</li>
                </ul>
              </div>


              <div className="col-sm-6 col-md-2">

                <Button type="primary" onClick={showModal} shape='round'
                  className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                  Add Admin
                </Button>


                <Modal
                  width={650}
                  title="Add admin"
                  open={open}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModal}
                  okText="submit"
                  cancelText="cancle"
                >
                  <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                      residence: ['zhejiang', 'hangzhou', 'xihu'],
                      prefix: '86',
                    }}
                    scrollToFirstError
                  >
                    <Form.Item
                      name="Name"
                      label="Name"
                      rules={[{ required: true, message: 'Please input your  Name', whitespace: true }]}
                      onChange={(event) => {
                        setAdmin_name(event.target.value)
                      }}
                    >
                      <Input />

                    </Form.Item>

                    <Form.Item
                      name="ID"
                      label="ID"
                      rules={[{ required: true, message: 'Please input your ID!' }]}
                      onChange={(event) => {
                        setAdmin_id(event.target.value)
                      }}
                    >
                      <Input  />
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
                      name="role"
                      label="role"
                      rules={[{ required: true, message: 'Please select role!' }]}
                      onChange={(event) => {
                        setAdmin_designation(event.target.value)
                      }}
                    >
                      <Select placeholder="select your role">
                        <Option value="admin">Admin</Option>
                        {/* <Option value="it support">IT Support</Option>
                        <Option value="other">Other</Option> */}
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
                      name="email"
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
                      name="password"
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
                      <Input.Password />
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
                            if (!value || getFieldValue('password') === value) {
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
                      name="phone"
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                      onChange={(event) => {
                        setAdmin_phone(event.target.value)
                      }}
                    >
                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      name="Address"
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
                          <Button type="primary" htmlType="submit">
                            Register
                          </Button></Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                          <Button type="primary" danger onClick={hideModal}>
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
          {/* /Page Header */}
          {/* Search Filter */}
          {/* <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option>Select Designation</option>
                  <option>Web Developer</option>
                  <option>Web Designer</option>
                  <option>Android Developer</option>
                  <option>Ios Developer</option>
                </select>
                <label className="focus-label">Designation</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block w-100"> Search </a>
            </div>
          </div> */}

          
          {/* Search Filter */}
          <Form
            // {...layout}

            form={form2}
            name="control-hooks"
            onFinish={onFinish2}
          // style={{
          //   maxWidth: 600,
          // }}
          >
            <div className="row filter-row">
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="id"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <input className="form-control floating" placeholder="Admin ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Admin Name" />
                </Form.Item>
              </Form.Item>
              {/* <Form.Item
        name="id"
       
      >
       
          <div className="col-sm-6 col-md-3"> 
              <div className="form-group form-focus">
        <input className="form-control floating" placeholder="Employee ID"/>
        </div>
        </div>
        </div>
      </Form.Item> */}
              {/* <input type="text" className="form-control floating" onChange={(e) => setEmployeeID(e.target.value)} placeholder="Employee ID"/> */}


              {/* <Form.Item name="name"
              
              >
               <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input className="form-control floating" placeholder="Employee Name" />
                
              </div>
            </div> 
              </Form.Item> */}

              {/* </div>
            </div> */}

              {/* <div className="col-sm-6 col-md-2">
                <section className="form-group form-focus select-focus">
                  <div className="btn-group">
                    <select type="button" className="btn btn-secondary dropdown-toggle me-1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <option>Select Designation</option>
                      <option>Admin</option>
                      <option>IT Support</option>

                    </select>

                    <label className="focus-label">Designation</label>
                  </div>
                </section>
              </div> */}
              
            </div>

            <Form.Item >
              {/* <Button type="primary" htmlType="submit">
        Search
        </Button> */}
              <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
                <Button type="primary" htmlType="submit" className="btn btn-success btn-block w-20">
                  Search
                </Button>
                <Button htmlType="button" className="btn btn-danger btn-block w-20 " style={{ marginLeft: '5px' }} onClick={onReset}>
                  Reset
                </Button>
                {/* <a href="#" className="btn btn-success btn-block w-20" htmlType="submit"> Search </a> */}
                {/* <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a> */}
                <div></div>
              </div>

            </Form.Item>

            {/* <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
              <a href="#" className="btn btn-success btn-block w-20" > Search </a>
              <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a>
              <div></div>
            </div> */}
          </Form>
          
            

            

            
          </div>
        </div>
        {/* /employee */}
        <Adminslist Admin={Admin}/>
        {/* Add Employee Modal */}
        <Addadmin />
        {/* /Add Employee Modal */}
       
        
      </div>
   
  );
}

export default AllAdmins;
