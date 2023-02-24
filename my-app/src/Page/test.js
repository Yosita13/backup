import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import $, { event } from "jquery";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../Entryfile/imagepath"
import Addemployee from "../_components/modelbox/Addemployee"
import Editemployee from "../_components/modelbox/Editemployee"
import { DownOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Dropdown,Button, Col, Modal, Space ,Table, Tag} from 'antd';
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,

} from 'antd';
import Employeeslist from '../Page/employeeslist';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { AudioOutlined } from '@ant-design/icons';


const { Option } = Select;

const Employees = () => {

 
    const [menu, setMenu] = useState(false)
    const [open, setOpen] = useState(false)
    const [Admin, setAdmin] = useState([])
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
    const [dataEmployee,setDataEmployee] = useState();
    const [initialValues,setInitialValues] = useState();
    const [newPassword,setNewPassword] = useState();

  const onFinish =async  (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      console.log('Received values of form: ', values);
      const {data} = await axios.post('http://localhost:5000/DB/tbl_admin2',{
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

  const Finish = async(values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`http://localhost:5000/DB/update/${values.admin_id}`,
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
  
  const deleEmployees = (values) => {
    //console.log(admin_id);
      axios.delete(`http://localhost:5000/DB/delete/${values.admin_id}`).then((response) => {
        setAdmin(
          Admin.filter((values) => {
            return values.admin_id != admin_id;
          })
        )
        console.log(response);
        
        alert('success!!')
      })
  
      
      
  }


  const getEmployees = (values) => {
    
    //console.log(values);
      axios.get(`http://localhost:5000/DB/get/employee/${values.admin_id}`).then((response) => {
        //console.log('123',response.data.admin_name);
        
        setDataEmployee(response.data);
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
      showModal()
      
    
  }
  
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

 
  const handlepassword = (e) =>{
      
    form.setFieldValue({admin_password:e.target.value})
}

 

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

          <Button type="primary" success onClick={() => getEmployees (text)} 
             data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
            Edit
          </Button>

          <Button type="primary" danger onClick={() => deleEmployees (text)} 
             data-bs-toggle="modal" data-bs-target="#add_employee" ><i className="fa fa-plus" />
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
              onFinish={Finish}
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
                      if (!value ||  dataEmployee.admin_password=== value || getFieldValue('admin_password') === value) {
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

  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  
  const onSearch = (value) => console.log(value);
  
  
    

  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Employee</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div>


              <div className="col-sm-6 col-md-2">

                <Button type="primary" onClick={showModal} shape='round'
                  className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                  Add Employee
                </Button>

                <Modal
                  width={650}
                  title="Add employee"
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

                {/* employeeslist */}

                

               
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
        
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                    <label className="focus-label">Employee ID</label> 

                              {/* <Space >


                                  <Search 
                                      placeholder="Employee ID"
                                      allowClear
                                      
                                      size="large"
                                      onSearch={onSearch}
                                  />

                             </Space> */}
                
              
              
                
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
                              {/* <Space >
                                  <Search 
                                      placeholder="Employee ID"
                                      allowClear
                                      size="large"
                                      onSearch={onSearch}
                                  />

                              </Space> */}


              </div>
            </div>
            
            

            <div className="col-sm-6 col-md-2">
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
            </div>

            <div className="col-sm-6 col-md-4" style={{ textAlign: 'right' }}>
                
              <a href="#" className="btn btn-success btn-block w-50" onClick={onSearch}> Search </a>
            </div>
          </div>
        </div>

       
  
          
        
        {/* /employee */}
        <Employeeslist />
        {/* Add Employee Modal */}
        <Addemployee />
        {/* /Add Employee Modal */}
       
        
      </div>
    </div>
  );
}

export default Employees;
