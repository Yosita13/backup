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
// import Addcategory from "../_components/modelbox/Addcategory"
// import Editcategory from "../_components/modelbox/Editcategory"
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
import Categorylist from '../Page/categorylist';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"

const { Option } = Select;

const AllCategory = () => {


  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Category, setCategory] = useState([])
  const [Edit, setEdit] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [category_name, setCategory_name] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  
  const [category_id, setCategory_id] = useState("");
  const [dataCategory, setDataCategory] = useState();
  const [initialValues, setInitialValues] = useState();
  //const [newPassword, setNewPassword] = useState();
  const [CategoryID, setCategoryID] = useState(null);
  const [CategoryName, setCategoryName] = useState(null);

  console.log('categoryID', CategoryID);

  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      console.log('Received values of form: ', values);
      const { data } = await axios.post('/DB/tbl_category2', {
        category_id: values.ID,
        category_name: values.Name,
        
      })
      console.log(data);

      alert('success!!')

    } catch (e) {

    }
  };

  const onFinish2 = (value) => {
    console.log(value);

    if (value.name === undefined) {
      console.log('แต๋มสวย')
      const emp = Category.filter((emp) => emp.category_id === value.id)
      setCategory(emp)
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const emp = Category.filter((emp) => emp.category_name.split(" ")[0] === value.name)
      setCategory(emp)
      console.log(emp);
      console.log('แต๋มขี้เหล่')

    }else if(value.name !== undefined && value.id !== undefined){
      const emp1 = Category.filter((emp1) => (emp1.category_id === value.id) && emp1.category_name.split(" ")[0] === value.name)
      // const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setCategory(emp1)
      console.log('1',emp1)
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
    getCategory();
  };
  const Finish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/${values.category_id}`,
        {
          category_id: values.category_id,
          category_name: values.category_name,
          
        })
      // console.log(data.length)
      alert('success!!')

    } catch (error) {

    }
  };




  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const { data } = await axios.get('/DB/tbl_category')
      // console.log(data.length)
      setCategory(data)
    } catch (error) {

    }
  }

  console.log(Category)

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
  //   axios.post('/DB/tbl_admin', {
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

  const deleCategorys = (values) => {
    //console.log(admin_id);
    axios.delete(`/DB/delete/${values.category_id}`).then((response) => {
      setCategory(
        Category.filter((values) => {
          return values.category_id != category_id;
        })
      )
      console.log(response);

      alert('success!!')
    })



  }


  const getCategorys = (values) => {

    //console.log(values);
    axios.get(`/DB/get/employee/${values.category_id}`).then((response) => {
      //console.log('123',response.data.admin_name);

      setDataCategory(response.data);
      const defaultValue = {
        category_id: response.data.category_id,
        category_name: response.data.category_name,
        
        created_timestamp: response.data.created_timestamp,
        updated_timestamp: response.data.updated_timestamp
        
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


//   const handlepassword = (e) => {

//     form.setFieldValue({ admin_password: e.target.value })
//   }

  const handleCategory = () => {


    if (CategoryName === null) {
      const emp = Category.filter((emp) => emp.category_id === CategoryID)
      setCategory(emp)
      console.log('แต๋มสวย')
      console.log(emp);
      console.log(CategoryName);
      console.log('id', CategoryID);
    } else if (CategoryID === null) {
      const emp = Category.filter((emp) => emp.category_name.split(" ")[0] === CategoryName)
      setCategory(emp)
      console.log(emp);
      console.log('แต๋มขี้เหล่')
      console.log(emp);
      console.log(CategoryName);
      console.log('id', CategoryID);

    }
  }

  const handleClear = async () => {
    setCategoryID(null)
    setCategoryName(null)
    getCategory()
  }


  const columns = [

    {
      title: 'ID',
      dataIndex: 'category_id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'name',
      dataIndex: 'category_name',
      sorter: (a, b) => a.category_name.length - b.category_name.length,
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

   // },
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



          <Button type="primary" success onClick={() => getCategorys(text)}
            data-bs-toggle="modal" data-bs-target="#add_category"><i className="fa fa-plus" />
            Edit
          </Button>

          <Button type="primary" danger onClick={() => deleCategorys(text)}
            data-bs-toggle="modal" data-bs-target="#add_category" ><i className="fa fa-plus" />
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

                  name="category_name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your  Name', whitespace: true }]}
                // onChange={(event) => {
                //   setAdmin_name(event.target.value)
                // }}
                >
                  <Input />

                </Form.Item>

                <Form.Item
                  name="category_id"
                  label="ID"
                  rules={[{ required: true, message: 'Please input your ID!' }]}
                  onChange={(event) => {
                    setCategory_id(event.target.value)
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
                </Form.Item>
 */}

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
{/* 
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
                </Form.Item> */}

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
          <title>Category</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Category</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Category</li>
                </ul>
              </div>


              <div className="col-sm-6 col-md-2">

                <Button type="primary" onClick={showModal} shape='round'
                  className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_category"><i className="fa fa-plus" />
                  Add Category
                </Button>

                <Modal
                  width={650}
                  title="Add Category"
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
                        setCategory_name(event.target.value)
                      }}
                    >
                      <Input />

                    </Form.Item>

                    <Form.Item
                      name="ID"
                      label="ID"
                      rules={[{ required: true, message: 'Please input your ID!' }]}
                      onChange={(event) => {
                        setCategory_id(event.target.value)
                      }}
                    >
                      <Input />
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
{/* 
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
{/* 
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
                    </Form.Item> */}

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
                  <input className="form-control floating" placeholder="Category ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Category Name" />
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

          {/* </div> */}

          {/* <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
              <a href="#" className="btn btn-success btn-block w-20" onClick={handleEmployee}> Search </a>
              <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a>
              <div></div>
            </div> */}
        </div>
        {/* /employee */}
        <Categorylist Category={Category} />
        {/* Add Employee Modal */}
        {/* <Addcategory /> */}
        {/* /Add Employee Modal */}


      </div>
    </div>
  );
}

export default AllCategory;
