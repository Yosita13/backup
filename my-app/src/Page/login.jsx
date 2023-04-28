/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant/index.js";
import { axiosCMMS as axios } from '../config/axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png'
import { useLocation, useHistory } from 'react-router-dom';



const Loginpage = (props) => {

  let history = useHistory()
  const adminId = localStorage.getItem('id');

  const onFinish = async (values) => {
    try {
      console.log('Received values of form: ', values);
      const { data } = await axios.post('/DB/admin/login', {
        admin_email: values.email,
        admin_password: values.password,
      })
      console.log(data);
      if (data) {
        localStorage.setItem('id', data.admin_id)
        localStorage.setItem('Role', data.admin_designation)
        localStorage.setItem('email', data.admin_email)
        localStorage.setItem('name', data.admin_name)
      }
      history.push('/Page/admindashboard')
    } catch (e) {
      console.log(e);
      notification.error({
        message: 'เข้าสู่ระบบไม่สำเร็จ',
        description:
          'กรุณาตรวจสอบอีเมลและรหัสผ่าน',
      })
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="page-header" style={{ marginTop: '10em', marginLeft: '30em' }}>
        <div className="row align-items-center">
          <div className="col">

          </div>
          <div className="col-sm-6 col-md-2">
          </div>
        </div>
      </div>

      <div className="account-content">

        <div className="container">
          {/* Account Logo */}
          <div className="account-logo" style={{ marginTop: '.7em', marginLeft: '30em' }}>
            <Link to="/Page/login">
              <img src={LogoOnlineAssest} />
            </Link>
          </div>
          {/* /Account Logo */}
          <Form 
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              marginTop: '.7em',
              marginLeft: '10em',
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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

            >

              <Input />
            </Form.Item>


            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>



            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" style={{ marginTop: '.7em', marginLeft: '11em' }} >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>


        </div>
      </div>

    </>
  );


};

export default Loginpage;
