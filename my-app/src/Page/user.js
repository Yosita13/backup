import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { axiosCMMS as axios } from '../config/axios';
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
  

  const getUsers = (values) => {
    
    //console.log(values);
    axios.get(`/DB/getUser/${values.employee_id}`).then((response) => {
      //console.log('123',response.data.admin_name);
     
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
      getEmployee();
      console.log(data);
      handleOk();
 
    } catch (e) {

    }
  };



  const onFinish2 = (value) => {

    console.log('fillter', value);
    console.log('employee', Employee);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)

    if (value.name === undefined) {
      const emp = Employee.filter((emp) => emp.employee_id === Number(value.id))
      setEmployee(emp)
      console.log('emp.employeeid', value.id);
      console.log('name_undefine', emp);
      console.log('แต๋มสวย')
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const emp = Employee.filter((emp) => emp.employee_name.split(" ")[0] === value.name)
      setEmployee(emp)
      console.log('id undefind', emp);
      console.log('แต๋มขี้เหล่')

    } else if (value.name !== undefined && value.id !== undefined) {
      const emp1 = Employee.filter((emp1) => (emp1.employee_id === Number(value.id)) && emp1.employee_name.split(" ")[0] === value.name)
      //const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setEmployee(emp1)
      console.log('1', emp1)
     
    }


  }

  const onReset = () => {
    form2.resetFields();
    getEmployee();

  };


 
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




  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };


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
                      prefix: '66',
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
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}


                >
                  <input className="form-control floating" placeholder="User ID" />
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


        {/* /employee */}
        <Userlist User={Employee} getEmployee={getEmployee} />



      </div>
    </div>
  );
}

export default AllUser;
