import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {axiosCMMS as axios} from '../config/axios';
//import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,

} from 'antd';
import Employeeslist from '../Page/employeeslist';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const AllEmployees = () => {


  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
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
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [EmployeeID, setEmployeeID] = useState(null);
  const [EmployeeName, setEmployeeName] = useState(null);
  const location = useLocation()
  const [forsendEmail, setForsendEmail] = useState();
  

  //console.log('employeeID', EmployeeID);

  const getEmployees = (values) => {

    //console.log(values);
    axios.get(`/DB/getEmployee/${values.admin_id}`).then((response) => {
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
   


  }

  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      console.log('Received values of form: ', values);
      const { data } = await axios.post('/DB/tbl_admin2', {
        admin_id: values.ID,
        admin_name: values.Name,
        admin_email: values.email,
        admin_password: values.password,
        admin_phone: values.phone,
        admin_address: values.Address,
        admin_designation: values.role
      })
      console.log(data);
      handleOk();
      alert('success!!')
      window.location.reload();

    } catch (e) {

    }
  };

  

  const onFinish2 = (value) => {
   
    console.log('fillter',value);
    console.log('admin',Admin);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)
    
    if (value.name === undefined) {
      const emp = Admin.filter((emp) =>emp.admin_id === Number(value.id)) 
      setAdmin(emp)
      console.log('emp.adminid',value.id);
      console.log('name_undefine',emp);
      console.log('แต๋มสวย')
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const emp = Admin.filter((emp) => emp.admin_name.split(" ")[0] === value.name||emp.admin_name=== value.name)
      setAdmin(emp)
      console.log('id undefind',emp);
      console.log('แต๋มขี้เหล่')

    }else if(value.name !== undefined && value.id !== undefined){
      const emp1 = Admin.filter((emp1) => (emp1.admin_id === Number(value.id)) && emp1.admin_name.split(" ")[0] === value.name||emp1.admin_name === value.name)
      //const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setAdmin(emp1)
      console.log('1',emp1)
      //console.log('2',emp2);
      
    // if(Admin.filter((Admin) => Admin.admin_id !== value.id) ||  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] !== value.name)){
    //   setAdmin([])
    //   console.log('3');
    // }
    // else if(Admin.filter((Admin) => Admin.admin_id === value.id) &&  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] === value.name)){
    //   setAdmin(emp1)
    //   console.log('4');
    // }

    }
    

  }


  const onReset = () => {
    form2.resetFields();
    getAdmin();
  
  };

  const Finish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/${values.admin_id}`,
        {
          admin_id: values.admin_id,
          admin_name: values.admin_name,
          admin_email: values.admin_email,
          admin_password: values.admin_password,
          admin_phone: values.admin_phone,
          admin_address: values.admin_address,
          admin_designation: values.admin_designation
        })
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
      const { data } = await axios.get('/DB/tbl_admin')
      // console.log(data.length)
      setAdmin(data)
    } catch (error) {

    }
  }
  //console.log(Admin)

//-----------------send email after register------------------------
  const hideModal2 = () => {

    setForsendEmail(false);
    form.resetFields()
    //console.log('111',activity_email)
    form.setFieldValue({ admin_email: admin_email })
  };

  const handleOk = (values) => {
    console.log('va', values);
    //setIsModalOpen(false);
    hideModal2()

    const { data } = axios.post('/DB/sendEmailAdmin', {
        admin_email: admin_email,
        admin_password : admin_password
    })
    console.log(data);
    //form3.resetFields()
  };
  
  //-----------------send email after register------------------------
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
    axios.delete(`/DB/delete/${values.admin_id}`).then((response) => {
      setAdmin(
        Admin.filter((values) => {
          return values.admin_id != admin_id;
        })
      )
      console.log(response);

      alert('success!!')
    })



  }


  

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const handlepassword = (e) => {

    form.setFieldValue({ admin_password: e.target.value })
  }



  const handleClear = async () => {
    setEmployeeID(null)
    setEmployeeName(null)
    getAdmin()
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

          <Button type="primary" success onClick={() => getEmployees(text)}
            data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
            Edit
          </Button>

          {/* <Button type="primary" danger onClick={() => deleEmployees(text)}
            data-bs-toggle="modal" data-bs-target="#add_employee" ><i className="fa fa-plus" />
            delete
          </Button> */}

          <Button type="primary" danger 
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
            {initialValues &&
              <Form
                initialValues={initialValues}
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
                  <Input disabled />
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
                  <Input.Password onChange={handlepassword} />
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
                        if (!value || dataEmployee.admin_password === value || getFieldValue('admin_password') === value) {
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
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Setting</Link></li>
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
                  title="Add Admin"
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
                  <input className="form-control floating"  placeholder="Employee ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Employee Name" />
                </Form.Item>
              </Form.Item>
              
      
              
              
            </div>

            <Form.Item >
             
        
              <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }} >
                <Button type="primary" htmlType="submit" className="btn btn-success btn-block w-20" >
                  Search
                </Button>
                <Button htmlType="button" className="btn btn-danger btn-block w-20 " style={{ marginLeft: '5px' }} onClick={onReset}>
                  Reset
                </Button>
              
                <div></div>
              </div>

            </Form.Item>

           
          </Form>

        
        </div>

        
       
        <Employeeslist Admin={Admin} />
        

      </div>
    </div>
  );
}

export default AllEmployees;