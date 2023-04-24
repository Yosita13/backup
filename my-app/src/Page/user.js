import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {axiosCMMS as axios} from '../config/axios';
import $, { event } from "jquery";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../Entryfile/imagepath"
// import Adduser from "../_components/modelbox/Adduser"
// import Edituser from "../_components/modelbox/Edituser"
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
import Userlist from '../Page/userlist';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const AllUser = () => {


  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Employee, setEmployee] = useState([])
  const [Edit, setEdit] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [employee_name, setEmployee_name] = useState("");
  const [employee_email, setEmployee_email] = useState("");
  const [employee_phone, setEmployee_phone] = useState("");
  const [employee_address, setEmployee_address] = useState("");
  const [employee_newphone, setEmployee_newphone] = useState("");
  
  const [employee_id, setEmployee_id] = useState("");
  const [dataUser, setDataUser] = useState();
  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [UserID, setUserID] = useState(null);
  const [UserName, setUserName] = useState(null);
  const location = useLocation()
  const [forsendEmail, setForsendEmail] = useState();
  

  //console.log('employeeID', EmployeeID);

  const getUsers = (values) => {
    debugger
    //console.log(values);
    axios.get(`/DB/getUser/${values.employee_id}`).then((response) => {
      //console.log('123',response.data.admin_name);
      debugger
      setDataUser(response.data);
      const defaultValue = {

        employee_id: response.data.employee_id,
        employee_name: response.data.employee_name,
        employee_email: response.data.employee_email,
        employee_phone: response.data.employee_phone,
        employee_address: response.data.employee_address,
        created_timestamp: response.data.created_timestamp,
        updated_timestamp: response.data.updated_timestamp,


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
      const { data } = await axios.post('/DB/tbl_employee2', {
        employee_id: values.ID,
        employee_name: values.Name,
        employee_email: values.email,
        employee_phone: values.phone,
        employee_address: values.Address

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
    console.log('employee',Employee);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)
    
    if (value.name === undefined) {
      const emp = Employee.filter((emp) =>emp.employee_id === Number(value.id)) 
      setEmployee(emp)
      console.log('emp.employeeid',value.id);
      console.log('name_undefine',emp);
      console.log('แต๋มสวย')
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const emp = Employee.filter((emp) => emp.employee_name.split(" ")[0] === value.name)
      setEmployee(emp)
      console.log('id undefind',emp);
      console.log('แต๋มขี้เหล่')

    }else if(value.name !== undefined && value.id !== undefined){
      const emp1 = Employee.filter((emp1) => (emp1.employee_id === Number(value.id)) && emp1.employee_name.split(" ")[0] === value.name)
      //const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setEmployee(emp1)
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
    getEmployee();
  
  };

  const Finish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/${values.employee_id}`,
        {
          employee_id: values.employee_id,
          employee_name: values.employee_name,
          employee_email: values.employee_email,
          employee_phone: values.employee_phone,
          employee_address: values.employee_address
        })
      // console.log(data.length)
      alert('success!!')

    } catch (error) {

    }
  };




  useEffect(() => {
    getEmployee()
  }, [])

  const getEmployee = async () => {
    try {
      const { data } = await axios.get('/DB/tbl_employee')
      // console.log(data.length)
      setEmployee(data)
    } catch (error) {

    }
  }
  //console.log(Admin)

//-----------------send email after register------------------------
  const hideModal2 = () => {

    setForsendEmail(false);
    form.resetFields()
    //console.log('111',activity_email)
    form.setFieldValue({ employee_email: employee_email })
  };

  const handleOk = (values) => {
    console.log('va', values);
    //setIsModalOpen(false);
    hideModal2()

    // const { data } = axios.post('/DB/sendEmailEmployee', {
    //     employee_email: employee_email,
    //     employee_password : employee_password
    // })
    //console.log(data);
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

  const deleUsers = (values) => {
    debugger
    //console.log(admin_id);
    axios.delete(`/DB/delete/${values.employee_id}`).then((response) => {
      setEmployee(
        Employee.filter((values) => {
          return values.employee_id != employee_id;
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


  // const handlepassword = (e) => {

  //   form.setFieldValue({ employee_password: e.target.value })
  // }



  const handleClear = async () => {
    setUserID(null)
    setUserName(null)
    getEmployee()
  }


  const columns = [

    {
      title: 'ID',
      dataIndex: 'employee_id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'name',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },

    {
      title: 'Email',
      dataIndex: 'employee_email',
      sorter: (a, b) => a.employee_email.length - b.employee_email.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'employee_phone',
      sorter: (a, b) => a.employee_phone.length - b.employee_phone.length,
    },

    // {
    //   title: 'Join Date',
    //   dataIndex: 'created_timestamp',
    //   sorter: (a, b) => a.created_timestamp.length - b.created_timestamp.length,
    // },

    // {
    //   title: 'Role',
    //   dataIndex: 'admin_designation',
    //   render: (text, record) => <Tag>{text}</Tag>
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

    //},
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

          <Button type="primary" success onClick={() => getUsers(text)}
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
            cancelText="cancel"
          >
            {initialValues &&
              <Form
                initialValues={initialValues}
              debugger
                {...formItemLayout}
                form={form}
                name="save"
                onFinish={Finish}
                scrollToFirstError
              >
                <Form.Item

                  name="employee_name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your  Name', whitespace: true }]}
                // onChange={(event) => {
                //   setAdmin_name(event.target.value)
                // }}
                >
                  <Input />

                </Form.Item>

                <Form.Item
                  name="employee_id"
                  label="ID"
                  rules={[{ required: true, message: 'Please input your ID!' }]}
                  onChange={(event) => {
                    setEmployee_id(event.target.value)
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

                {/* <Form.Item
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
                </Form.Item> */}


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
                  name="employee_email"
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
                    setEmployee_email(event.target.value)
                  }}
                >

                  <Input />
                </Form.Item>
{/* 
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
                </Form.Item> */}

                <Form.Item
                  name="employee_phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                  onChange={(event) => {
                    setEmployee_newphone(event.target.value)
                  }}
                >
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="employee_address"
                  label="Address"
                  rules={[{ required: true, message: 'Please input your Address', whitespace: true }]}
                  onChange={(event) => {
                    setEmployee_address(event.target.value)
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
                        Cancel
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
          <title>Users</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Users</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Users</li>
                </ul>
              </div>


              <div className="col-sm-6 col-md-2">

                <Button type="primary" onClick={showModal} shape='round'
                  className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                  Add User
                </Button>

                <Modal
                  width={650}
                  title="Add User"
                  open={open}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModal}
                  okText="submit"
                  cancelText="cancel"
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
                        setEmployee_name(event.target.value)
                      }}
                    >
                      <Input />

                    </Form.Item>

                    {/* <Form.Item
                      name="ID"
                      label="ID"
                      rules={[{ required: true, message: 'Please input your ID!' }]}
                      onChange={(event) => {
                        setAdmin_id(event.target.value)
                      }}
                    >
                      <Input />
                    </Form.Item> */}

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

                    {/* <Form.Item
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
                    </Form.Item> */}


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
                        setEmployee_email(event.target.value)
                      }}
                    >

                      <Input />
                    </Form.Item>

                    {/* <Form.Item
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
                    </Form.Item> */}

                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                      onChange={(event) => {
                        setEmployee_phone(event.target.value)
                      }}
                    >
                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      name="Address"
                      label="Address"
                      rules={[{ required: true, message: 'Please input your Address', whitespace: true }]}
                      onChange={(event) => {
                        setEmployee_address(event.target.value)
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
                            Cancel
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
                  <input className="form-control floating"  placeholder="User ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="User Name" />
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
        
              <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }} >
                <Button type="primary" htmlType="submit" className="btn btn-success btn-block w-20" >
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

          {/* </div> */}

          {/* <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
              <a href="#" className="btn btn-success btn-block w-20" > Search </a>
              <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a>
              
            </div> */}
        </div>

        
        {/* /employee */}
        <Userlist User={Employee} />
        {/* Add Employee Modal */}
        {/* <Adduser /> */}
        {/* /Add Employee Modal */}


      </div>
    </div>
  );
}

export default AllUser;
