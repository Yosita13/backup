import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Dropdown, Table, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {axiosCMMS as axios} from '../config/axios';
//import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction";
//import "../../antdstyle.css"
import {
  Avatar_02,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_13,
} from "../Entryfile/imagepath";
//import  Editemployee from "../../../_components/modelbox/Editemployee"
//import  Addemployee from "../../../_components/modelbox/Addemployee"
import "../Page/antdstyle.css";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import $, { data } from "jquery";
import { useLocation } from "react-router-dom";

import { Button, Col, Modal, Space } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";

const { Option } = Select;

const Userlist = ({ User }) => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [employee_name, setEmployee_name] = useState("");
  const [employee_email, setEmployee_email] = useState("");
  const [employee_phone, setEmployee_phone] = useState("");
  const [employee_address, setEmployee_address] = useState("");
  const [employee_newphone, setEmployee_newphone] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [id_employee, setId_employee] = useState("");
  //const [employee_id, seteEmployee_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [forComfirmDelete, setForComfirmDelete] = useState();
  const [newPassword, setNewPassword] = useState();
  const location = useLocation();

  // useEffect(() => {
  //   form.setFieldValue({admin_name:'12345'})
  // }, [dataEmployee])

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  const hideModal = () => {
    setOpen(false);
  };

  //edit user
  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(`/DB/update/user/${values.employee_id}`,
        {
          employee_id : values.employee_id,
          employee_name: values.employee_name,
          employee_email: values.employee_email,
          employee_address: values.employee_address,
          employee_phone: values.employee_phone,
        }
      );
      // console.log(data.length)
      //alert('success!!')
      window.location.reload();
    } catch (error) {}
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

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
  const getUsersForDelete = (values) => {
    //console.log(values);
    axios
      .get(`/DB/getUser/${values.employee_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        console.log(response.data);
        setDataEmployee(response.data);
      });
    // showModal()

    setId_employee(values.employee_id);
    console.log("222", id_employee);
    setForComfirmDelete(true);
    console.log(dataEmployee);
  };

  const deleUsers = (values) => {
    setForComfirmDelete(false);
    //console.log(admin_id);
   
    axios
      .delete(`/DB/deleteUser/${id_employee}`)
      .then((response) => {
        // setAdmin(
        //   Admin.filter((values) => {
        //     return values.admin_id != admin_id;
        //   })
        // )
        console.log(response);

        //alert('success!!')
        window.location.reload();
      });
  };

  const getUsers = (values) => {
    //console.log(values);
    axios
      .get(`/DB/getUser/${values.employee_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        console.log(response.data);
        setDataEmployee(response.data);
        const defaultValue = {
          employee_id: response.data.employee_id,
          employee_name: response.data.employee_name,
          employee_email: response.data.employee_email,
          employee_address: response.data.employee_address,
          employee_phone: response.data.employee_phone,

          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    // showModal()
    setOpen(true);
    console.log(initialValues);
    console.log(dataEmployee);
  };

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
    //console.log('66666',dataEmployee)
    setOpen(true);
  };

  const showModal2 = () => {
    //console.log('66666',dataEmployee)
    setForComfirmDelete(true);
  };

  const hideModal2 = () => {
    setForComfirmDelete(false);
  };

  // const items = [
  //   {
  //     label: <a href="\Page\Delete.js">delete</a>,
  //     key: '0',
  //   },

  // ];

  const getID = (values) => {
    console.log("value", values);

    setId_employee(values.employee_id);
    deleUsers(id_employee);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "employee_id",

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: "name",
      dataIndex: "employee_name",
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },

    {
      title: "Email",
      dataIndex: "employee_email",
      sorter: (a, b) => a.employee_email.length - b.employee_email.length,
    },

    {
      title: "Mobile",
      dataIndex: "employee_phone",
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
      title: "Action",
      render: (text, record) => (
        <div className="dropdown profile-action">
          <Button
            type="primary"
            success
            onClick={() => getUsers(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_employee"
          >
            <i className="fa fa-plus" />
            Edit
          </Button>

          {/* <Button type="primary" danger onClick={() => deleEmployees (text)} 
             data-bs-toggle="modal" data-bs-target="#add_employee" ><i className="fa fa-plus" />
            delete
          </Button> */}

          <Button
            type="primary"
            danger
            onClick={() => getUsersForDelete(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_employee"
          >
            <i className="fa fa-plus" />
            delete
          </Button>
        </div>
      ),
    },
  ];

  //console.log(Admin);

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              pagination={{
                total: User?.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              dataSource={User}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>

      {/* model Edit */}
      <Modal
        width={650}
        title="Edit"
        open={open}
        // onOk={hideModal}
        footer={null}
        onCancel={hideModal}
        // okText="submit"
        // cancelText="cancle"
      >
        {initialValues && (
          <Form
            initialValues={initialValues}
            {...formItemLayout}
            form={form}
            name="Save"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="employee_name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your  Name",
                  whitespace: true,
                },
              ]}
              onChange={(event) => {
                setEmployee_name(event.target.value);
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="employee_id"
              label="ID"
              rules={[{ required: true, message: "Please input your ID!" }]}
              onChange={(event) => {
                setEmployee_id(event.target.value);
              }}
            >
              <Input disabled />
            </Form.Item>

            {/* <Form.Item
                name="employee_designation"
                label="role"
                rules={[{ required: true, message: 'Please select role!' }]}
                onChange={(event) => {
                  setemployee_designation(event.target.value)
                }}
              >
                <Select placeholder="select your role">
                  <Option value="admin">Admin</Option>
                  <Option value="it support">IT Support</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item> */}

            <Form.Item
              name="employee_email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
              onChange={(event) => {
                setEmployee_email(event.target.value);
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
              </Form.Item> */}

            <Form.Item
              name="employee_phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
              onChange={(event) => {
                setEmployee_newphone(event.target.value);
              }}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="employee_address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address",
                  whitespace: true,
                },
              ]}
              onChange={(event) => {
                setEmployee_address(event.target.value);
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
                  <Button type="primary" danger onClick={hideModal}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* model Delete */}

      <div
        className="modal custom-modal fade"
        id="delete_approve"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <Modal
                width={650}
                title="Delete"
                open={forComfirmDelete}
                onOk={hideModal}
                footer={null}
                onCancel={hideModal2}
                okText="submit"
                cancelText="cancle"
              >
                <Form
                  form={form2}
                  //name="Delete"
                  onFinish={deleUsers}
                  scrollToFirstError
                >
                  <Form.Item>
                    {/* Delete Leave Modal */}
                    <div className="form-header">
                      <h3>Delete Leave</h3>
                      <p>Are you sure want to delete this leave?</p>
                    </div>

                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a
                            className="btn btn-primary continue-btn"
                            onClick={deleUsers}
                          >
                            Delete
                          </a>
                        </div>
                        <div className="col-6">
                          <a
                            data-bs-dismiss="modal"
                            className="btn btn-primary cancel-btn"
                            onClick={hideModal2}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* /Delete Leave Modal */}
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
