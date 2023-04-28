
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useLocation,useHistory } from 'react-router-dom';
import { axiosCMMS as axios } from '../../config/axios';
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Dropdown, Button, Col, Modal, Space, Table, Tag, notification } from 'antd';
import { Form, Input, Select, Row, } from 'antd';
import bell from "../Sidebar/img/bell.svg";
import speedometer2 from "../Sidebar/img/speedometer2.svg";
import person from "../Sidebar/img/person.svg";
import file from "../Sidebar/img/file.svg";
import activity from "../Sidebar/img/activity.svg";
import computer from "../Sidebar/img/computer.svg";
import device from "../Sidebar/img/device.svg";
import history from "../Sidebar/img/history.svg";
import license from "../Sidebar/img/license.svg";
import network from "../Sidebar/img/network.svg";
import user from "../Sidebar/img/user.svg";
import pass from "../Sidebar/img/pass.svg"
import set from "../Sidebar/img/set.png"




const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [new_pass, setNew_pass] = useState("");
  const [old_pass, setOld_pass] = useState("");

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false)
  let history = useHistory()

  let pathname = props.location.pathname;
  const adminId = localStorage.getItem('id');


  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  const resetpassdone = () => {
    localStorage.clear()
    history.push('/login')
  }

  const resetpassword = async (values) => {
    setOpen(false);
    form.resetFields();
    try {
      console.log('Received values of form: ', values);
      const { data } = await axios.post('/DB/changepassword', {
        admin_id: adminId,
        old_pass: values.old_pass,
        new_pass: values.New_password,
      })
      localStorage.clear()
      history.push('/Page/login')

      notification.success({
        message: 'เปลี่ยนรหัสผ่านสำเร็จ',
        description:
          'กรุณาเข้าสู่ระบบอีกครั้ง',
      })

    } catch (e) {
      console.log(e);
 
    }
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
  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>

              <li

              >
                <Link to="/Page/admindashboard">
                  <img src={speedometer2} /> <span>Dashboard</span>
                </Link>
              </li>



              <li className={pathname.includes("allusers") ? "active" : ""}>
                <Link to="/Page/user">
                  <img src={person} /> <span>Users</span>
                </Link>
              </li>


              <li className={pathname.includes("Activties") ? "active" : ""}>
                <Link to="/Page/activity">
                  <img src={bell} /> <span>Activties</span>
                </Link>
              </li>

              <li className="menu-title">
                <span>
                  <br />
                  Category
                </span>
              </li>

              <li className={pathname.includes("alldevice") ? "active" : ""}>
                <Link to="/Page/device">
                  <img src={computer} /> <span>IT</span>
                </Link>
              </li>

              <li className={pathname.includes("alldevice") ? "active" : ""}>
                <Link to="/Page/checkin">
                  <img src={computer} /> <span>IT Owner</span>
                </Link>
              </li>

              {/* <li className={pathname.includes("Network") ? "active" : ""}>
                <Link to="/Page/network">
                  <img src={network} /> <span>Network</span>
                </Link>
              </li>

              <li className={pathname.includes("License") ? "active" : ""}>
                <Link to="/Page/license">
                  <img src={license} /> <span>License</span>
                </Link>
              </li> */}

              <li className="menu-title">
                <span>
                  <br />
                  Report
                </span>
              </li>

              <li
                className={pathname.includes("Activityreport") ? "active" : ""}
              >
                <Link to="/Page/activityreport">
                  <img src={activity} /> <span>Activities Report</span>
                </Link>
              </li>

              <li className={pathname.includes("deviceerport") ? "active" : ""}>
                <Link to="/Page/devicereport">
                  <img src={device} /> <span>Devices Report</span>
                </Link>
              </li>



              <li className="menu-title">
                <span>
                  <br />
                  Setting
                </span>
              </li>
              <li className={pathname.includes("allemployees") ? "active" : ""}>

                {localStorage.getItem('Role') === 'admin' ? <Link to="/Page/employee">
                  <img src={user} /> <span>Admins</span>
                </Link> : <Link to="/Page/itsupport">
                  <img src={user} /> <span>Admins</span>
                </Link>}
              </li>

              <li onClick={showModal} style={{ marginTop: '.7em', marginLeft: '.9em' }}>
                <img src={pass}  width={20} height={30} alt="" />
                <span style={{ marginTop: '.7em', marginLeft: '.7em' }}>Reset Password</span>

              </li>

            </ul>
          </div>
        </div>
        <Modal
          width={650}
          title="เปลี่ยนรหัสผ่าน"
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
            onFinish={resetpassword}
            scrollToFirstError
          >
            <Form.Item
              name="Old password"
              label="รหัสผ่านเดิม"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
              onChange={(event) => {
                setOld_pass(event.target.value)
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="New_password"
              label="รหัสผ่านใหม่"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
              onChange={(event) => {
                setNew_pass(event.target.value)
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm_New_password"
              label="ยืนยันรหัสผ่านใหม่"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('New_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}

            >
              <Input.Password />
            </Form.Item>

            <Form.Item  {...tailFormItemLayout}>
              <Row>
                <Col span={12} style={{ textAlign: 'left' }}>
                  <Button type="primary" htmlType="submit">
                    บันทึก
                  </Button></Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Button type="primary" danger onClick={hideModal}>
                    ยกเลิก
                  </Button>
                </Col>
              </Row>

            </Form.Item>
          </Form>
        </Modal>
      </Scrollbars>
    </div>



  );
};

export default withRouter(Sidebar);
