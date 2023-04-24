
/**
 * Signin Firebase
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14 } from '../Entryfile/imagepath';
import '../Entryfile/imagepath';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import "../Page/index.css"
import { axiosCMMS as axios } from '../config/axios';


import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Form, Input, Select, Row, DatePicker, Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import { MoreOutlined, EditOutlined, MailOutlined ,LaptopOutlined,FileWordOutlined,WifiOutlined,UserOutlined} from '@ant-design/icons';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"



const Network = () => {

  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Admin, setAdmin] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [Status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [editStatus, setEditStatus] = useState();
  const [forsendEmail, setForsendEmail] = useState();
  const [activity_email, setActivity_email] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);



  const barchartdata = [
    { y: '2006', "Total Income" : 100, 'Total Outcome' : 90 },
    { y: '2007', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2008', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2009', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2010', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2011', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2012', "Total Income" : 100, 'Total Outcome' : 90 }
];
const linechartdata = [
    { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
    { y: '2007', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2008', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2009', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2010', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2011', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //      console.log(data.length)
  //     setAdmin(data)
  //   } catch (error) {

  //   }
  // }
  //console.log(IT.length)

  //-------------------------------------------------------------------------------------------------


  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    getAdmin()
  }, [])

  useEffect(() => {
    form3.setFieldValue({ admin_email: activity_email })
  }, [activity_email])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('/DB/get/get/for/join')

      // console.log('help',data.length)
      setData(data)
    } catch (error) {

    }
  }

  const onReset = () => {
    form.resetFields();
    getAdmin();
  };
  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`/DB/update/status/${editStatus}`,
        {

          status: Status,
          employee_email: activity_email
        })
      // console.log(data.length)
      alert('success!!')

    } catch (error) {

    }
  };


  const getActivity = () => {

    console.log('editstatus', editStatus);
    const { data } = axios.get(`/DB/get/status/${editStatus}`).then((response) => {

    })
    showModal()
    setOpen(true);

  }
  //----------------------------------------------------------------------------------------------------------------------


  const getID = (values) => {

    console.log('value', values);
    setEditStatus(values.id)
    setActivity_email(values.employee_email)
    setStatus(values.status)
    console.log('sta', values.status);
    console.log('email', values.employee_email);
    //form3.setFieldValue({admin_email:values.employee_email})


  }
  console.log('from2', form3.getFieldValue('admin_email'));

  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const hideModal2 = () => {

    setForsendEmail(false);
    form3.resetFields()
    //console.log('111',activity_email)
    form3.setFieldValue({ admin_email: activity_email })
  };

  const handleOk = (values) => {
    console.log('va', values);
    //setIsModalOpen(false);
    hideModal2()

    const { data } = axios.post('/DB/sendEmail', {
      status: Status,
      employee_email: values
    })
    console.log(data);
    //form3.resetFields()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleButtonClick = (e) => {

    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {

    console.log('click', e);
  };

  const items = [
    {
      label: <a onClick={getActivity}>edit</a>,
      key: '0',
      icon: <EditOutlined />,


    },
    {
      label: <a onClick={() => setForsendEmail(true)}>send email</a>,
      key: '1',
      icon: <MailOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModalForEmail = () => {
    setForsendEmail(true);
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

  const columns = [

    {
      title: 'ID',
      dataIndex: 'id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'User',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },
    {
      title: 'Email',
      dataIndex: 'employee_email',
      sorter: (a, b) => a.employee_email.length - b.employee_email.length,
    },
    {
      title: 'Device_id',
      dataIndex: 'device_id',
      sorter: (a, b) => a.device_id.length - b.device_id.length,
    },

    {
      title: 'Device_serial',
      dataIndex: 'device_serial',
      sorter: (a, b) => a.admin_email.length - b.admin_email.length,
    },

    {
      title: 'Model',
      dataIndex: 'device_model',
      sorter: (a, b) => a.admin_phone.length - b.admin_phone.length,
    },

    {
      title: 'Note',
      dataIndex: 'case_detail',
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) =>
        <div>
          <span className={text === ":success" ? "badge bg-inverse-success" : "badge bg-inverse-info"}>{text}</span>
        </div>
    },

    {
      title: 'Action',
      render: (value) => (
        <>
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            trigger={['click']}>
            <Button type='text' onClick={() => getID(value)}><MoreOutlined /></Button>
          </Dropdown>
        </>
      )
    },
  ]


  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="page-wrapper">
        <Helmet>
          <title>Network </title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Network</h3>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/Page/admindashboard">Category</Link></li>
                    <li className="breadcrumb-item active">Network</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><LaptopOutlined /></span>
                  <div className="dash-widget-info">
                    <h3>Coming Soon!</h3>
                    <span>Network</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          
          
                
              
                
               
                
              </div>
            </div>
          </div>
    


  );
}

export default withRouter(Network);


