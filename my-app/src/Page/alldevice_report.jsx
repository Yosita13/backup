import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {axiosCMMS as axios} from '../config/axios';
import $, { event } from "jquery";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../Entryfile/imagepath"
// import AddAsset from "../_components/modelbox/AddAsset"
// import EditAsset from "../_components/modelbox/EditAsset"
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
import Devicesreportlist from './devicereportlist';

const { Option } = Select;

const AllDevicesreport = () => {

  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false);
  const [device, setdevice] = useState()
  const [device_id, setdevice_id] = useState("");
  const [device_name, setdevice_name] = useState("");
  const [device_warranty, setdevice_warranty] = useState("");
  const [device_producer, setdevice_producer] = useState("");
  const [device_cost, setdevice_cost] = useState("");
  const [device_image, setdevice_image] = useState("");
  const [device_model, setdevice_model] = useState("");
  const [device_serial, setdevice_serial] = useState("");
  const [device_asset_tag, setdevice_asset_tag] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [device_note, setdevice_note] = useState("");
  const [device_stautus, setdevice_status] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [SearchDevice,setSearchDevice] = useState();


  const onFinish =async  (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      console.log('Received values of form: ', values);
      const {data} = await axios.post('/DB/tbl_device2',{
        device_id: values.ID,
        device_name: values.Name,
        device_warranty: values.warranty,
        device_producer: values.producer,
        device_cost: values.cost,
        //device_image: values.image,
        device_note: values.note,
        device_stautus: values.status,
        device_model: values.model,
        device_serial: values.serial,
        device_asset_tag: values.asset_tag
      })
      console.log(data);

      alert('success!!')

    }catch(e){

    }
  };

  


  useEffect(() => {
    getDevice()
  }, [])

  const getDevice = async () => {
    try {
      const { data } = await axios.get('/DB/tbl_device')
      // console.log(data.length)
      setdevice(data)
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
      const ass = device.filter((ass) => ass.device_id === value.id)
      setdevice(ass)
      // alert(`${Admin}`)

    } else if (value.id === undefined) {
      const ass = device.filter((ass) => ass.device_name.split(" ")[0] === value.name)
      setdevice(ass)
      console.log(ass);
      console.log('Test')

    }else if(value.name !== undefined && value.id !== undefined){
      const ass1 = device.filter((ass1) => (ass1.device_id === value.id) && ass1.device_name.split(" ")[0] === value.name)
      setdevice(ass1)
      console.log('1',ass1)

    }

  }
  const onReset = () => {
    form.resetFields();
    getDevice();
  };


  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Device</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Device</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Device</li>
                </ul>
              </div>


              <div className="col-sm-6 col-md-2">

                <Button type="primary" onClick={showModal} shape='round'
                  className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_device"><i className="fa fa-plus" />
                  Add Device
                </Button>


                <Modal
                  width={650}
                  title="Add device"
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

                  name="device_name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your  Name', whitespace: true }]}
                // onChange={(event) => {
                //   setAdmin_name(event.target.value)
                // }}
                >
                  <Input />

                </Form.Item>

                <Form.Item
                  name="device_id"
                  label="ID"
                  rules={[{ required: true, message: 'Please input your ID!' }]}
                  onChange={(event) => {
                    setdevice_id(event.target.value)
                  }}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name="devive_warranty"
                  label="Device Warranty"
                  rules={[{ required: true, message: 'Please input device warranty!' }]}
                  onChange={(event) => {
                    setdevice_warranty(event.target.value)
                  }}
                >
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="device_producer"
                  label="Producer"
                  rules={[{ required: true, message: 'Please input  Producer' }]}
                  onChange={(event) => {
                    setdevice_producer(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_cost"
                  label="Cost"
                  rules={[{ required: true, message: 'Please input  cost' }]}
                  onChange={(event) => {
                    setdevice_cost(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                {/* <Form.Item
                  name="device_image"
                  label="Image"
                  rules={[{ required: true, message: 'Please input  Image' }]}
                  onChange={(event) => {
                    setdevice_image(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item> */}

                <Form.Item
                  name="device_note"
                  label="NOte"
                  rules={[{ required: true, message: 'Please input  Note' }]}
                  onChange={(event) => {
                    setdevice_note(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_status"
                  label="Status"
                  rules={[{ required: true, message: 'Please input  Status' }]}
                  onChange={(event) => {
                    setdevice_status(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_model"
                  label="Model"
                  rules={[{ required: true, message: 'Please input  Model' }]}
                  onChange={(event) => {
                    setdevice_model(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_serial"
                  label="Serial"
                  rules={[{ required: true, message: 'Please input  Srial' }]}
                  onChange={(event) => {
                    setdevice_serial(event.target.value)
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_asset_tag"
                  label="Asset Tag"
                  rules={[{ required: true, message: 'Please input  Asst Tag' }]}
                  onChange={(event) => {
                    setdevice_asset_tag(event.target.value)
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
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <input className="form-control floating" placeholder="Device ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Device Name" />
                </Form.Item>
              </Form.Item>
              
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
        <Devicesreportlist devicereport={device}/>
        {/* Add Employee Modal */}
        {/* <AddAsset /> */}
        {/* /Add Employee Modal */}
       
        
      </div>
   
  );
}

export default AllDevicesreport;
